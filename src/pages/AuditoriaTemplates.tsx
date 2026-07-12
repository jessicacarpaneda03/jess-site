import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AuditRow = {
  id: string;
  override_id: string;
  user_id: string;
  changed_by: string | null;
  action: "INSERT" | "UPDATE" | "DELETE";
  version: number;
  reply_id: string;
  old_data: any;
  new_data: any;
  changed_at: string;
};

const actionColor: Record<AuditRow["action"], string> = {
  INSERT: "bg-emerald-100 text-emerald-800",
  UPDATE: "bg-amber-100 text-amber-800",
  DELETE: "bg-rose-100 text-rose-800",
};

export default function AuditoriaTemplates() {
  const [rows, setRows] = useState<AuditRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data: auth } = await supabase.auth.getUser();
    setUserEmail(auth.user?.email ?? null);
    const { data, error } = await supabase
      .from("quick_reply_override_audit")
      .select("*")
      .order("changed_at", { ascending: false })
      .limit(200);
    if (!error && data) setRows(data as AuditRow[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container max-w-4xl py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Auditoria de Templates</h1>
          <p className="text-sm text-muted-foreground">
            Histórico de alterações dos meus templates de resposta rápida.
            {userEmail ? ` Sessão: ${userEmail}` : ""}
          </p>
        </div>
        <Button onClick={load} disabled={loading}>
          {loading ? "Carregando..." : "Atualizar"}
        </Button>
      </div>

      {!loading && rows.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Nenhuma alteração registrada ainda. Edite um template para gerar histórico.
        </p>
      )}

      <div className="space-y-3">
        {rows.map((r) => {
          const prevText = r.old_data?.text as string | undefined;
          const newText = r.new_data?.text as string | undefined;
          return (
            <Card key={r.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Badge className={actionColor[r.action]}>{r.action}</Badge>
                    <span className="font-mono text-xs">{r.reply_id}</span>
                    <Badge variant="outline">v{r.version}</Badge>
                  </CardTitle>
                  <span className="text-xs text-muted-foreground">
                    {new Date(r.changed_at).toLocaleString("pt-BR")}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {r.action === "UPDATE" && (
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Antes</p>
                      <pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">
                        {prevText ?? "—"}
                      </pre>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">Depois</p>
                      <pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">
                        {newText ?? "—"}
                      </pre>
                    </div>
                  </div>
                )}
                {r.action === "INSERT" && (
                  <pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">
                    {newText ?? JSON.stringify(r.new_data, null, 2)}
                  </pre>
                )}
                {r.action === "DELETE" && (
                  <pre className="bg-muted p-2 rounded text-xs whitespace-pre-wrap">
                    {prevText ?? JSON.stringify(r.old_data, null, 2)}
                  </pre>
                )}
                <p className="text-xs text-muted-foreground">
                  Alterado por: <span className="font-mono">{r.changed_by ?? "sistema"}</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
