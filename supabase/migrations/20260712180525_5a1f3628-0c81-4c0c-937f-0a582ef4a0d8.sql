
-- 1. Add version column to overrides
ALTER TABLE public.quick_reply_overrides
  ADD COLUMN IF NOT EXISTS version integer NOT NULL DEFAULT 1;

-- 2. Audit table
CREATE TABLE public.quick_reply_override_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  override_id uuid NOT NULL,
  user_id uuid NOT NULL,
  changed_by uuid,
  action text NOT NULL CHECK (action IN ('INSERT','UPDATE','DELETE')),
  version integer NOT NULL,
  reply_id text NOT NULL,
  old_data jsonb,
  new_data jsonb,
  changed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_qr_audit_user ON public.quick_reply_override_audit (user_id, changed_at DESC);
CREATE INDEX idx_qr_audit_override ON public.quick_reply_override_audit (override_id, version DESC);

GRANT SELECT ON public.quick_reply_override_audit TO authenticated;
GRANT ALL ON public.quick_reply_override_audit TO service_role;

ALTER TABLE public.quick_reply_override_audit ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own audit"
  ON public.quick_reply_override_audit
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 3. Trigger function: bump version + write audit row
CREATE OR REPLACE FUNCTION public.tg_quick_reply_audit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_version integer;
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.version := 1;
    INSERT INTO public.quick_reply_override_audit
      (override_id, user_id, changed_by, action, version, reply_id, old_data, new_data)
    VALUES
      (NEW.id, NEW.user_id, auth.uid(), 'INSERT', NEW.version, NEW.reply_id, NULL, to_jsonb(NEW));
    RETURN NEW;

  ELSIF TG_OP = 'UPDATE' THEN
    NEW.version := COALESCE(OLD.version, 1) + 1;
    NEW.updated_at := now();
    INSERT INTO public.quick_reply_override_audit
      (override_id, user_id, changed_by, action, version, reply_id, old_data, new_data)
    VALUES
      (NEW.id, NEW.user_id, auth.uid(), 'UPDATE', NEW.version, NEW.reply_id, to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;

  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO public.quick_reply_override_audit
      (override_id, user_id, changed_by, action, version, reply_id, old_data, new_data)
    VALUES
      (OLD.id, OLD.user_id, auth.uid(), 'DELETE', COALESCE(OLD.version,1) + 1, OLD.reply_id, to_jsonb(OLD), NULL);
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_quick_reply_audit_ins ON public.quick_reply_overrides;
DROP TRIGGER IF EXISTS trg_quick_reply_audit_upd ON public.quick_reply_overrides;
DROP TRIGGER IF EXISTS trg_quick_reply_audit_del ON public.quick_reply_overrides;

CREATE TRIGGER trg_quick_reply_audit_ins
  BEFORE INSERT ON public.quick_reply_overrides
  FOR EACH ROW EXECUTE FUNCTION public.tg_quick_reply_audit();

CREATE TRIGGER trg_quick_reply_audit_upd
  BEFORE UPDATE ON public.quick_reply_overrides
  FOR EACH ROW EXECUTE FUNCTION public.tg_quick_reply_audit();

CREATE TRIGGER trg_quick_reply_audit_del
  AFTER DELETE ON public.quick_reply_overrides
  FOR EACH ROW EXECUTE FUNCTION public.tg_quick_reply_audit();
