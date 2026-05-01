import { useMemo, useState } from "react";
import { Check, ClipboardCopy, ListChecks, Sparkles, Workflow } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type Scale = {
  id: string;
  name: string;
  full: string;
  description: string;
  options: { label: string; value: number }[];
  questions: string[];
  interpret: (score: number) => { label: string; tone: "ok" | "mild" | "mod" | "high" | "severe"; note: string };
};

const freq4 = [
  { label: "Nunca (0)", value: 0 },
  { label: "Vários dias (1)", value: 1 },
  { label: "Mais da metade dos dias (2)", value: 2 },
  { label: "Quase todos os dias (3)", value: 3 },
];

const asrs6 = [
  { label: "Nunca (0)", value: 0 },
  { label: "Raramente (1)", value: 1 },
  { label: "Às vezes (2)", value: 2 },
  { label: "Frequentemente (3)", value: 3 },
  { label: "Muito frequentemente (4)", value: 4 },
];

const SCALES: Scale[] = [
  {
    id: "phq9",
    name: "PHQ-9",
    full: "Patient Health Questionnaire — Depressão",
    description: "Nas últimas 2 semanas, com que frequência você foi incomodado(a) por:",
    options: freq4,
    questions: [
      "Pouco interesse ou prazer em fazer as coisas",
      "Sentir-se para baixo, deprimido(a) ou sem esperança",
      "Dificuldade para pegar no sono, manter o sono ou dormir demais",
      "Sentir-se cansado(a) ou com pouca energia",
      "Falta de apetite ou comer demais",
      "Sentir-se mal consigo mesmo(a) — ou que você é um fracasso",
      "Dificuldade de concentração",
      "Lentidão para se mover/falar — ou agitação",
      "Pensamentos de que estaria melhor morto(a) ou de se machucar",
    ],
    interpret: (s) => {
      if (s <= 4) return { label: "Mínimo (0-4)", tone: "ok", note: "Sem indicação clínica de depressão." };
      if (s <= 9) return { label: "Leve (5-9)", tone: "mild", note: "Sintomas leves — observação e psicoeducação." };
      if (s <= 14) return { label: "Moderado (10-14)", tone: "mod", note: "Considerar tratamento ativo." };
      if (s <= 19) return { label: "Moderadamente grave (15-19)", tone: "high", note: "Tratamento ativo recomendado." };
      return { label: "Grave (20-27)", tone: "severe", note: "Tratamento intensivo — avaliar risco." };
    },
  },
  {
    id: "gad7",
    name: "GAD-7",
    full: "Generalized Anxiety Disorder — Ansiedade",
    description: "Nas últimas 2 semanas, com que frequência você foi incomodado(a) por:",
    options: freq4,
    questions: [
      "Sentir-se nervoso(a), ansioso(a) ou no limite",
      "Não conseguir parar ou controlar as preocupações",
      "Preocupar-se demais com diferentes coisas",
      "Dificuldade para relaxar",
      "Inquietação a ponto de não conseguir ficar parado(a)",
      "Ficar facilmente aborrecido(a) ou irritado(a)",
      "Sentir medo, como se algo terrível fosse acontecer",
    ],
    interpret: (s) => {
      if (s <= 4) return { label: "Mínima (0-4)", tone: "ok", note: "Sem ansiedade clínica." };
      if (s <= 9) return { label: "Leve (5-9)", tone: "mild", note: "Monitorar — psicoeducação." };
      if (s <= 14) return { label: "Moderada (10-14)", tone: "mod", note: "Considerar tratamento." };
      return { label: "Grave (15-21)", tone: "severe", note: "Tratamento ativo recomendado." };
    },
  },
  {
    id: "asrs",
    name: "ASRS-6",
    full: "Adult ADHD Self-Report Scale — Parte A (rastreio TDAH)",
    description: "Como você se sentiu/comportou nos últimos 6 meses:",
    options: asrs6,
    questions: [
      "Dificuldade em concluir os detalhes finais de um projeto",
      "Dificuldade em colocar as coisas em ordem ao fazer tarefa que requer organização",
      "Dificuldade em lembrar de compromissos ou obrigações",
      "Evita ou adia o início de tarefas que exigem muito raciocínio",
      "Mexer ou se contorcer com as mãos ou pés ao ficar sentado(a) por muito tempo",
      "Sentir-se acelerado(a), como se estivesse impulsionado(a) por um motor",
    ],
    interpret: (s) => {
      // Q1-3 ≥2 ou Q4 ≥2 ou Q5-6 ≥3 são positivas — aqui usamos soma simples como aproximação
      if (s >= 14) return { label: `Rastreio positivo (${s})`, tone: "high", note: "Indicação forte de avaliação clínica para TDAH." };
      if (s >= 10) return { label: `Sugestivo (${s})`, tone: "mod", note: "Sintomas relevantes — investigar." };
      return { label: `Negativo (${s})`, tone: "ok", note: "Sem indicação de rastreio positivo." };
    },
  },
  {
    id: "audit",
    name: "AUDIT-C",
    full: "Alcohol Use Disorders Identification Test (curto)",
    description: "Sobre seu uso de álcool no último ano:",
    options: [
      { label: "Nunca (0)", value: 0 },
      { label: "Mensal ou menos (1)", value: 1 },
      { label: "2-4× por mês (2)", value: 2 },
      { label: "2-3× por semana (3)", value: 3 },
      { label: "4× por semana ou mais (4)", value: 4 },
    ],
    questions: [
      "Com que frequência você consome bebidas alcoólicas?",
      "Quantas doses costuma tomar num dia típico em que bebe?",
      "Com que frequência toma 6 ou mais doses numa única ocasião?",
    ],
    interpret: (s) => {
      if (s >= 4) return { label: `Uso de risco (${s})`, tone: "high", note: "Investigar uso problemático/AUD." };
      return { label: `Uso de baixo risco (${s})`, tone: "ok", note: "Sem indício de uso problemático." };
    },
  },
];

const toneClass: Record<string, string> = {
  ok: "border-primary/40 bg-primary/10 text-primary",
  mild: "border-accent/40 bg-accent/10 text-accent-foreground",
  mod: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  high: "border-orange-500/40 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  severe: "border-destructive/40 bg-destructive/10 text-destructive",
};

const TRIAGEM_STEPS = [
  { n: 1, title: "Saudação + permissão", body: "Apresento-me, peço autorização pra 3 perguntas rápidas." },
  { n: 2, title: "Queixa principal", body: "O que te trouxe aqui hoje? (1 frase)" },
  { n: 3, title: "Tempo de evolução", body: "Há quanto tempo? (dias, semanas, meses, anos)" },
  { n: 4, title: "Histórico + medicações", body: "Já se tratou antes? Usa alguma medicação?" },
  { n: 5, title: "Sondagem de risco", body: "Pensamentos de se machucar ou de não querer estar aqui?" },
  { n: 6, title: "Perfil + cidade", body: "Idade e cidade/estado (atendo a partir de 16 anos)." },
  { n: 7, title: "Melhor horário", body: "Manhã / tarde / noite / fim de semana." },
  { n: 8, title: "Classificação de gravidade", body: "🟢 leve · 🟡 moderado · 🔴 risco agudo (encaminhamento PS)." },
  { n: 9, title: "Encaixe + escalas", body: "Sugestão de horário + envio de escalas (PHQ-9, GAD-7, ASRS, AUDIT)." },
  { n: 10, title: "Pagamento + ficha", body: "Link Doctoralia → ficha de acolhimento → confirmação." },
];

const Score = ({ scale }: { scale: Scale }) => {
  const [answers, setAnswers] = useState<Record<number, number | undefined>>({});
  const [copied, setCopied] = useState(false);

  const score = useMemo(
    () => scale.questions.reduce((acc, _q, i) => acc + (answers[i] ?? 0), 0),
    [answers, scale.questions],
  );
  const answered = Object.values(answers).filter((v) => v !== undefined).length;
  const complete = answered === scale.questions.length;
  const interp = scale.interpret(score);

  const copy = async () => {
    const text = `${scale.name} — ${scale.full}
Pontuação: ${score} (${answered}/${scale.questions.length} respondidas)
Resultado: ${interp.label}
Interpretação: ${interp.note}
Data: ${new Date().toLocaleDateString("pt-BR")}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Resultado copiado");
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-display text-lg">{scale.name} — <span className="text-muted-foreground text-sm">{scale.full}</span></h4>
        <p className="mt-1 text-sm text-muted-foreground">{scale.description}</p>
      </div>

      <div className="space-y-3">
        {scale.questions.map((q, i) => (
          <div key={i} className="rounded-xl border border-border/60 bg-card/60 p-3">
            <p className="mb-2 text-sm font-medium">{i + 1}. {q}</p>
            <div className="flex flex-wrap gap-1.5">
              {scale.options.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [i]: o.value }))}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs transition",
                    answers[i] === o.value
                      ? "border-primary bg-primary/15 text-primary font-medium"
                      : "border-border/60 hover:border-primary/40",
                  )}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={cn("rounded-2xl border p-4", toneClass[interp.tone])}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-80">Pontuação atual</p>
            <p className="font-display text-2xl">{score} <span className="text-sm opacity-70">({answered}/{scale.questions.length})</span></p>
            <p className="mt-1 text-sm font-medium">{interp.label}</p>
            <p className="text-xs opacity-90">{interp.note}</p>
          </div>
          <Button onClick={copy} variant="secondary" size="sm" disabled={!complete}>
            {copied ? <><Check className="mr-1 h-3.5 w-3.5" /> Copiado</> : <><ClipboardCopy className="mr-1 h-3.5 w-3.5" /> Copiar laudo</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Scales = () => {
  const [active, setActive] = useState(SCALES[0].id);

  return (
    <section id="escalas-fluxo" className="border-t border-border/60 bg-gradient-to-b from-muted/20 to-background py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3" /> Escalas + Fluxo de Triagem
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            Aplicação de escalas validadas e fluxo passo-a-passo.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Escalas auto-pontuadas (PHQ-9, GAD-7, ASRS-6, AUDIT-C) com cópia do laudo, e o fluxo de triagem
            ideal pra qualificar o paciente no WhatsApp antes de agendar.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.6fr,1fr]">
          {/* Escalas */}
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Escalas clínicas</Label>
            </div>
            <Tabs value={active} onValueChange={setActive}>
              <TabsList className="mb-5 grid w-full grid-cols-4">
                {SCALES.map((s) => (
                  <TabsTrigger key={s.id} value={s.id}>{s.name}</TabsTrigger>
                ))}
              </TabsList>
              {SCALES.map((s) => (
                <TabsContent key={s.id} value={s.id}>
                  <Score scale={s} />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Fluxo de triagem */}
          <div className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Workflow className="h-4 w-4 text-primary" />
              <Label className="text-sm font-medium">Fluxo de triagem (WhatsApp)</Label>
            </div>
            <ol className="space-y-3">
              {TRIAGEM_STEPS.map((s) => (
                <li key={s.n} className="flex gap-3 rounded-xl border border-border/60 bg-muted/30 p-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {s.n}
                  </span>
                  <div>
                    <p className="text-sm font-medium leading-tight">{s.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">
              ⚠ Em qualquer etapa, sinal de risco agudo → pular para protocolo Risco (sondagem r-01 → conduta).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
