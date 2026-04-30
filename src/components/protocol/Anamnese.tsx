import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Check, Copy, FileText, RotateCcw, Search } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { anamneseTemplates } from "@/data/anamnese";
import { AnamneseSummary } from "@/components/protocol/AnamneseSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const safeText = (max: number) =>
  z.string().trim().max(max).regex(/^[^<>]*$/, { message: "Caracteres inválidos" });

type Tokens = {
  nome: string;
  idade: string;
  profissional: string;
  conduta: string;
  retorno: string;
  data: Date | undefined;
};

const initial: Tokens = {
  nome: "",
  idade: "",
  profissional: "",
  conduta: "",
  retorno: "",
  data: undefined,
};

const categories = ["Todos", ...Array.from(new Set(anamneseTemplates.map((t) => t.category)))];

function applyTokens(template: string, t: Tokens) {
  const map: Record<string, string> = {
    nome: t.nome.trim(),
    idade: t.idade.trim(),
    profissional: t.profissional.trim(),
    conduta: t.conduta.trim(),
    retorno: t.retorno.trim(),
    data: t.data ? format(t.data, "dd/MM/yyyy", { locale: ptBR }) : "",
  };
  const missing: string[] = [];
  const tokensInTemplate = Array.from(
    new Set(Array.from(template.matchAll(/\{\{(\w+)\}\}/g)).map((m) => m[1]))
  );
  const text = template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const v = map[key] ?? "";
    if (!v) {
      if (!missing.includes(key)) missing.push(key);
      return `{{${key}}}`;
    }
    return v;
  });
  return { text, missing, tokensInTemplate };
}

export const Anamnese = () => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("Todos");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Tokens>(initial);

  const update = <K extends keyof Tokens>(key: K, raw: Tokens[K]) => {
    if (typeof raw === "string") {
      const max = key === "conduta" || key === "retorno" ? 240 : 80;
      const result = safeText(max).safeParse(raw);
      if (!result.success) {
        toast.error("Caracteres inválidos detectados");
        return;
      }
    }
    setTokens((v) => ({ ...v, [key]: raw }));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return anamneseTemplates.filter((t) => {
      const matchCat = cat === "Todos" || t.category === cat;
      const matchQ =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.template.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, cat]);

  const copy = async (id: string, text: string, missing: string[]) => {
    if (missing.length > 0) {
      toast.warning(`Tokens não preenchidos: ${missing.join(", ")}`);
    }
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Anamnese copiada — pronta para colar no prontuário");
    setTimeout(() => setCopiedId(null), 1800);
  };

  const reset = () => setTokens(initial);

  const renderHighlighted = (text: string) =>
    text.split(/(\{\{\w+\}\})/g).map((part, i) =>
      /^\{\{\w+\}\}$/.test(part) ? (
        <mark key={i} className="rounded bg-accent/20 px-1 text-accent">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );

  return (
    <section id="anamnese" className="border-t border-border bg-secondary/20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Prontuário • Anamnese</p>
            <h2 className="mt-3 text-4xl md:text-5xl">
              Modelos de <span className="italic text-primary">anamnese</span> prontos.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Estruturas validadas para diferentes quadros. Preencha os campos comuns uma vez e
              copie o modelo já personalizado.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4 text-primary" />
            {anamneseTemplates.length} modelos
          </div>
        </div>

        {/* Painel de personalização */}
        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-display text-lg">Dados da consulta</h3>
            <Button onClick={reset} variant="ghost" size="sm" className="rounded-full">
              <RotateCcw className="mr-2 h-3.5 w-3.5" /> Limpar
            </Button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <Label htmlFor="an-nome">Nome do paciente</Label>
              <Input
                id="an-nome"
                value={tokens.nome}
                onChange={(e) => update("nome", e.target.value)}
                placeholder="Maria Silva"
                maxLength={80}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="an-idade">Idade</Label>
              <Input
                id="an-idade"
                value={tokens.idade}
                onChange={(e) => update("idade", e.target.value.replace(/\D/g, "").slice(0, 3))}
                placeholder="34"
                inputMode="numeric"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label>Data da consulta</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "mt-1.5 w-full justify-start text-left font-normal",
                      !tokens.data && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tokens.data
                      ? format(tokens.data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                      : "Selecionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-popover" align="start">
                  <Calendar
                    mode="single"
                    selected={tokens.data}
                    onSelect={(d) => update("data", d as Date)}
                    locale={ptBR}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="an-prof">Profissional</Label>
              <Input
                id="an-prof"
                value={tokens.profissional}
                onChange={(e) => update("profissional", e.target.value)}
                placeholder="Nome do médico"
                maxLength={80}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="an-conduta">Conduta resumida</Label>
              <Input
                id="an-conduta"
                value={tokens.conduta}
                onChange={(e) => update("conduta", e.target.value)}
                placeholder="Ex.: Iniciar sertralina 50mg…"
                maxLength={240}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="an-retorno">Retorno</Label>
              <Input
                id="an-retorno"
                value={tokens.retorno}
                onChange={(e) => update("retorno", e.target.value)}
                placeholder="Ex.: 30 dias"
                maxLength={80}
                className="mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 100))}
              placeholder="Buscar por modelo, sintoma ou categoria..."
              maxLength={100}
              className="h-12 rounded-full border-border bg-card pl-11"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-all",
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-secondary"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {filtered.map((m) => {
            const isCopied = copiedId === m.id;
            const { text, missing, tokensInTemplate } = applyTokens(m.template, tokens);
            return (
              <article
                key={m.id}
                className="group relative flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-all hover:shadow-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {m.category}
                  </span>
                  {tokensInTemplate.length > 0 && (
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {tokensInTemplate.map((t) => (
                        <span
                          key={t}
                          className={cn(
                            "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                            missing.includes(t)
                              ? "border-accent/40 bg-accent/10 text-accent"
                              : "border-primary/20 bg-primary/5 text-primary"
                          )}
                        >
                          {missing.includes(t) ? "⚠ " : "✓ "}
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="mt-4 font-display text-xl leading-snug text-foreground">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{m.description}</p>

                <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl bg-secondary/50 p-5 font-sans text-[13px] leading-relaxed text-foreground/85">
                  {renderHighlighted(text)}
                </pre>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground">{text.length} caracteres</span>
                  <Button
                    onClick={() => copy(m.id, text, missing)}
                    variant={isCopied ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                  >
                    {isCopied ? (
                      <>
                        <Check className="mr-2 h-3.5 w-3.5" /> Copiado
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-3.5 w-3.5" /> Copiar modelo
                      </>
                    )}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center text-muted-foreground">
            Nenhum modelo encontrado para "{query}".
          </div>
        )}

        <AnamneseSummary />
      </div>
    </section>
  );
};
