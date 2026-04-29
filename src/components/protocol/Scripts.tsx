import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Check, Copy, Mail, MessageCircle, Phone, RotateCcw } from "lucide-react";
import { z } from "zod";

import { scripts, doctor } from "@/data/protocol";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const channelIcon = {
  WhatsApp: MessageCircle,
  "E-mail": Mail,
  Telefone: Phone,
} as const;

const SPECIALTIES = ["Psiquiatria", "TDAH no adulto", "Ansiedade", "Insônia", "Depressão", "Burnout"];
const CHANNELS = ["WhatsApp", "E-mail", "Telefone"] as const;

// Schema de validação — limita tamanhos e remove caracteres potencialmente perigosos
const safeText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .regex(/^[^<>{}]*$/, { message: "Caracteres inválidos" });

const formSchema = z.object({
  nome: safeText(80),
  especialidade: safeText(60),
  canal: z.enum(CHANNELS),
  data: z.date().optional(),
  hora: z
    .string()
    .trim()
    .max(5)
    .regex(/^([01]?\d|2[0-3]):[0-5]\d$|^$/, { message: "Use HH:mm" }),
  opcao_1: safeText(60),
  opcao_2: safeText(60),
  opcao_3: safeText(60),
});

type FormValues = z.infer<typeof formSchema>;

const initial: FormValues = {
  nome: "",
  especialidade: "Psiquiatria",
  canal: "WhatsApp",
  data: undefined,
  hora: "",
  opcao_1: "",
  opcao_2: "",
  opcao_3: "",
};

function applyTokens(template: string, values: FormValues): { text: string; missing: string[] } {
  const tokensInTemplate = Array.from(template.matchAll(/\{\{(\w+)\}\}/g)).map((m) => m[1]);
  const missing: string[] = [];

  const dataFmt = values.data ? format(values.data, "dd/MM/yyyy", { locale: ptBR }) : "";

  const map: Record<string, string> = {
    nome: values.nome,
    especialidade: values.especialidade,
    canal: values.canal,
    data: dataFmt,
    hora: values.hora,
    opcao_1: values.opcao_1,
    opcao_2: values.opcao_2,
    opcao_3: values.opcao_3,
  };

  const text = template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const v = (map[key] ?? "").trim();
    if (!v) {
      if (!missing.includes(key)) missing.push(key);
      return `{{${key}}}`;
    }
    return v;
  });

  // Avisa apenas para tokens que existem no template atual
  const filteredMissing = missing.filter((k) => tokensInTemplate.includes(k));
  return { text, missing: filteredMissing };
}

export const Scripts = () => {
  const [active, setActive] = useState(scripts[0].id);
  const [values, setValues] = useState<FormValues>(initial);
  const [copied, setCopied] = useState(false);

  const current = scripts.find((s) => s.id === active)!;
  const Icon = channelIcon[current.channel];

  const tokensInTemplate = useMemo(
    () => Array.from(new Set(Array.from(current.body.matchAll(/\{\{(\w+)\}\}/g)).map((m) => m[1]))),
    [current.body]
  );

  const { text: rendered, missing } = useMemo(() => applyTokens(current.body, values), [current.body, values]);

  const update = <K extends keyof FormValues>(key: K, raw: FormValues[K]) => {
    // Validação leve campo-a-campo (string fields)
    if (typeof raw === "string") {
      const result = safeText(120).safeParse(raw);
      if (!result.success) {
        toast.error("Caracteres inválidos detectados");
        return;
      }
    }
    setValues((v) => ({ ...v, [key]: raw }));
  };

  const copy = async () => {
    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      toast.error("Revise os campos do formulário.");
      return;
    }
    if (missing.length > 0) {
      toast.warning(`Campos não preenchidos: ${missing.join(", ")}`);
    }
    await navigator.clipboard.writeText(rendered);
    setCopied(true);
    toast.success("Script copiado para a área de transferência");
    setTimeout(() => setCopied(false), 1800);
  };

  const reset = () => setValues(initial);

  // Highlight tokens no preview
  const highlighted = rendered.split(/(\{\{\w+\}\})/g).map((part, i) =>
    /^\{\{\w+\}\}$/.test(part) ? (
      <mark key={i} className="rounded bg-accent/20 px-1 text-accent">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );

  const showField = (name: string) => tokensInTemplate.includes(name);

  return (
    <section id="scripts" className="bg-gradient-warm">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Scripts personalizáveis</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Palavras que acolhem.</h2>
          <p className="mt-5 text-muted-foreground">
            Preencha os campos abaixo e o script é atualizado em tempo real. Tokens não preenchidos
            aparecem destacados — copie só quando estiver tudo certo.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
          <nav className="flex flex-col gap-2">
            {scripts.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "rounded-2xl border border-transparent px-5 py-4 text-left transition-all",
                  active === s.id ? "border-border bg-card shadow-card" : "hover:bg-card/60"
                )}
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.channel}</div>
                <div className="mt-1 font-medium text-foreground">{s.title}</div>
              </button>
            ))}
          </nav>

          <div className="space-y-6">
            {/* Painel de personalização */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-lg">Personalização</h3>
                <Button onClick={reset} variant="ghost" size="sm" className="rounded-full">
                  <RotateCcw className="mr-2 h-3.5 w-3.5" /> Limpar
                </Button>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="sm:col-span-2 lg:col-span-1">
                  <Label htmlFor="nome">Nome do paciente</Label>
                  <Input
                    id="nome"
                    value={values.nome}
                    onChange={(e) => update("nome", e.target.value)}
                    placeholder="Maria"
                    maxLength={80}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="especialidade">Especialidade</Label>
                  <Select value={values.especialidade} onValueChange={(v) => update("especialidade", v)}>
                    <SelectTrigger id="especialidade" className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {SPECIALTIES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="canal">Canal</Label>
                  <Select
                    value={values.canal}
                    onValueChange={(v) => update("canal", v as FormValues["canal"])}
                  >
                    <SelectTrigger id="canal" className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {CHANNELS.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {showField("data") && (
                  <div>
                    <Label>Data da consulta</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "mt-1.5 w-full justify-start text-left font-normal",
                            !values.data && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {values.data
                            ? format(values.data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                            : "Selecionar"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover" align="start">
                        <Calendar
                          mode="single"
                          selected={values.data}
                          onSelect={(d) => update("data", d as Date)}
                          locale={ptBR}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}

                {showField("hora") && (
                  <div>
                    <Label htmlFor="hora">Horário</Label>
                    <Input
                      id="hora"
                      type="time"
                      value={values.hora}
                      onChange={(e) => update("hora", e.target.value)}
                      className="mt-1.5"
                    />
                  </div>
                )}

                {(["opcao_1", "opcao_2", "opcao_3"] as const).map(
                  (k) =>
                    showField(k) && (
                      <div key={k}>
                        <Label htmlFor={k}>Opção {k.slice(-1)}</Label>
                        <Input
                          id={k}
                          value={values[k]}
                          onChange={(e) => update(k, e.target.value)}
                          placeholder="Ex.: Quarta, 14h"
                          maxLength={60}
                          className="mt-1.5"
                        />
                      </div>
                    )
                )}
              </div>

              {tokensInTemplate.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2 text-xs">
                  {tokensInTemplate.map((t) => (
                    <span
                      key={t}
                      className={cn(
                        "rounded-full border px-2.5 py-1",
                        missing.includes(t)
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : "border-primary/20 bg-primary/5 text-primary"
                      )}
                    >
                      {missing.includes(t) ? "⚠ " : "✓ "}
                      {`{{${t}}}`}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Preview */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {current.channel} • Preview ao vivo
                    </div>
                    <h3 className="font-display text-xl">{current.title}</h3>
                  </div>
                </div>
                <Button onClick={copy} variant={copied ? "default" : "outline"} className="rounded-full">
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" /> Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" /> Copiar texto
                    </>
                  )}
                </Button>
              </div>

              <pre className="mt-6 whitespace-pre-wrap rounded-2xl bg-secondary/60 p-6 font-sans text-sm leading-relaxed text-foreground/90">
                {highlighted}
              </pre>

              <p className="mt-4 text-xs text-muted-foreground">
                Validação automática: até 80 caracteres no nome, sem HTML/{"<>"}{"{}"}. Profissional:{" "}
                {doctor.name}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
