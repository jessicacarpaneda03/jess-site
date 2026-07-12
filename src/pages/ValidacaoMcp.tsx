import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Result = {
  name: string;
  message?: string;
  best_id?: string | null;
  pass: boolean;
  failures: string[];
  text: string;
};

type Report = { total: number; passed: number; failed: number; results: Result[] };

const ValidacaoMcp = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Report | null>(null);

  const rodar = async () => {
    setLoading(true);
    setReport(null);
    try {
      const { data, error } = await supabase.functions.invoke("validar-suggest-quick-reply", {
        body: {},
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setReport(data as Report);
    } catch (e: any) {
      toast({ title: "Falha ao rodar validação", description: e?.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen py-16 px-6 bg-muted/20">
      <div className="max-w-4xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">Validação do suggest_quick_reply</h1>
          <p className="text-muted-foreground mt-2">
            Roda vários exemplos de mensagens e checa se a resposta usa 1ª pessoa, mantém a
            especialidade correta (médica em saúde mental) e os valores atuais (R$ 400 / R$ 250 / R$ 150).
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Executar bateria de testes</CardTitle>
            <CardDescription>
              Chama a mesma configuração da ferramenta MCP contra 8 cenários. Cada rodada usa créditos
              da IA Lovable.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={rodar} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {loading ? "Rodando…" : "Rodar validação"}
            </Button>
          </CardContent>
        </Card>

        {report && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                Resultado
                <Badge variant={report.failed === 0 ? "default" : "destructive"}>
                  {report.passed}/{report.total} passaram
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.results.map((r, i) => (
                <div key={i} className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {r.pass ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                      <span className="font-medium">{r.name}</span>
                      {r.best_id && (
                        <Badge variant="secondary" className="text-xs">
                          {r.best_id}
                        </Badge>
                      )}
                    </div>
                  </div>
                  {r.message && (
                    <p className="text-xs text-muted-foreground italic">"{r.message}"</p>
                  )}
                  {r.failures.length > 0 && (
                    <ul className="text-xs text-destructive list-disc pl-5 space-y-0.5">
                      {r.failures.map((f, j) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                  )}
                  <p className="whitespace-pre-wrap text-sm leading-relaxed bg-muted/40 rounded p-2">
                    {r.text || "(vazio)"}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default ValidacaoMcp;
