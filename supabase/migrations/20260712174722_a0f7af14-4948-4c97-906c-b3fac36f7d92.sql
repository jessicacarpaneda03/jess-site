CREATE TABLE public.quick_reply_overrides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reply_id TEXT NOT NULL,
  label TEXT,
  text TEXT NOT NULL,
  tag TEXT,
  active BOOLEAN,
  expires_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, reply_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quick_reply_overrides TO authenticated;
GRANT ALL ON public.quick_reply_overrides TO service_role;
ALTER TABLE public.quick_reply_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own quick reply overrides" ON public.quick_reply_overrides FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE OR REPLACE FUNCTION public.tg_set_updated_at() RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER quick_reply_overrides_set_updated_at BEFORE UPDATE ON public.quick_reply_overrides FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();