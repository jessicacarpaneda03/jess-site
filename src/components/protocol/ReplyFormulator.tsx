import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles, Copy, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

type Tipo = "mensagem" | "opiniao" | "novidade";

const TEMAS_NOVIDADE = [
  "TDAH adulto",
  "Burnout",
  "Insônia",
  "TDPM",
  "Como funciona a telemedicina",
  "Ansiedade no trabalho",
];

export const ReplyFormulator = () => {
  const [tipo, setTipo] = useState<Tipo>("mensagem");
  const [mensagem, setMensagem] = useState("");
  const [contexto, setContexto] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const gerar = async () => {
    if (!mensagem.trim()) {
      toast({
        title:
          tipo === "novidade"
            ? "Escolha ou escreva o tema da Novidade."
            : "Cole a mensagem para gerar a resposta.",
      });
      return;
    }
    setLoading(true);
    setResposta("");
    try {
      const { data, error } = await supabase.functions.invoke("formulador-resposta", {
        body: { mensagem: mensagem.trim(), contexto: contexto.trim() || undefined, tipo },
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

  const labelMensagem =
    tipo === "opiniao"
      ? "Opinião / avaliação recebida"
      : tipo === "novidade"
      ? "Tema da Novidade"
      : "Mensagem do paciente";

  const placeholder =
    tipo === "opiniao"
      ? "Ex.: Atendimento excelente, me senti acolhida desde o primeiro contato."
      : tipo === "novidade"
      ? "Ex.: TDAH adulto — sinais que costumam aparecer no trabalho."
      : "Ex.: Oi, gostaria de saber valores e como funciona a primeira consulta…";

  const ajuda =
    tipo === "opiniao"
      ? "Resposta pública (Doctoralia/Google) em 1ª pessoa — sem citar dados clínicos, respeitando sigilo."
      : tipo === "novidade"
      ? "Post de Novidade do perfil Doctoralia em 1ª pessoa. Rotacione temas a cada 2–4 semanas para manter o ranqueamento."
      : "Resposta privada (WhatsApp/Doctoralia) em 1ª pessoa — pode informar valores, durações e próximos passos.";

  return (
    <section id="formulador" className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-sm font-medium text-primary mb-3">
            <Sparkles className="h-4 w-4" /> Formulador de Resposta com IA
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Mensagem, opinião ou Novidade do perfil — pronto para copiar
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            Tudo em 1ª pessoa (você, Dra. Jéssica). Segue o protocolo: tom, valores (R$ 400 / R$ 205),
            70/60 min, particular sem convênio, limites éticos do CFM e sigilo nas respostas públicas.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nova resposta</CardTitle>
            <CardDescription>Texto gerado para copiar e colar no WhatsApp ou Doctoralia.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={tipo === "mensagem" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTipo("mensagem")}
                >
                  Mensagem privada
                </Button>
                <Button
                  type="button"
                  variant={tipo === "opiniao" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTipo("opiniao")}
                >
                  Opinião pública
                </Button>
                <Button
                  type="button"
                  variant={tipo === "novidade" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTipo("novidade")}
                >
                  Novidade Doctoralia
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">{ajuda}</p>
            </div>

            {tipo === "novidade" && (
              <div className="space-y-2">
                <Label>Sugestões de tema (clique para usar)</Label>
                <div className="flex flex-wrap gap-2">
                  {TEMAS_NOVIDADE.map((t) => (
                    <Button
                      key={t}
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setMensagem(t)}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Dica: rotacione 1 tema a cada 2–4 semanas. Consistência &gt; criatividade.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="mensagem">{labelMensagem}</Label>
              <Textarea
                id="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value.slice(0, 4000))}
                placeholder={placeholder}
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
                placeholder={
                  tipo === "novidade"
                    ? "Ex.: ângulo do post, público (mulheres 30+), época do ano…"
                    : "Ex.: paciente já é de retorno; canal: WhatsApp; etapa: pré-consulta."
                }
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
