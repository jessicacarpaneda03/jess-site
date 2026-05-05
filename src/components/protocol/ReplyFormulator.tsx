import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const ReplyFormulator = () => {
  const [mensagem, setMensagem] = useState("");
  const [contexto, setContexto] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const gerar = async () => {
    if (!mensagem.trim()) {
      toast({ title: "Cole a mensagem do paciente para gerar a resposta." });
      return;
    }
    setLoading(true);
    setResposta("");
    try {
      const { data, error } = await supabase.functions.invoke("formulador-resposta", {
        body: { mensagem: mensagem.trim(), contexto: contexto.trim() || undefined },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResposta((data as any)?.resposta ?? "");
    } catch (e: any) {
      toast({
        title: "Não foi possível gerar a resposta",
        description: e?.message ?? "Tente novamente em instantes.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copiar = async () => {
    if (!resposta) return;
    await navigator.clipboard.writeText(resposta);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="formulador" className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-3">
            <Sparkles className="h-4 w-4" /> Formulador de Resposta com IA
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Cole a mensagem do paciente, receba a resposta pronta
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A IA segue as regras do protocolo: tom, valores (R$ 320 / R$ 210), 70/60 min, particular sem convênio,
            limites éticos do CFM e canais de emergência.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nova resposta</CardTitle>
            <CardDescription>Texto gerado para copiar e colar no WhatsApp ou Doctoralia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mensagem">Mensagem do paciente</Label>
              <Textarea
                id="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value.slice(0, 4000))}
                placeholder="Ex.: Oi, gostaria de saber valores e como funciona a primeira consulta…"
                rows={5}
              />
              <p className="text-xs text-muted-foreground text-right">{mensagem.length}/4000</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contexto">Contexto (opcional)</Label>
              <Textarea
                id="contexto"
                value={contexto}
                onChange={(e) => setContexto(e.target.value.slice(0, 600))}
                placeholder="Ex.: paciente já é de retorno; canal: WhatsApp; etapa: pré-consulta."
                rows={2}
              />
            </div>

            <Button onClick={gerar} disabled={loading} className="w-full sm:w-auto">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Gerando…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Gerar resposta
                </>
              )}
            </Button>

            {resposta && (
              <div className="mt-4 rounded-lg border bg-background p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Resposta sugerida</span>
                  <Button variant="outline" size="sm" onClick={copiar}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copiado" : "Copiar"}
                  </Button>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{resposta}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
