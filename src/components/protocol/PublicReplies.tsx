import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Check, Copy, Search, MessageSquareQuote, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { publicReplies } from "@/data/publicReplies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const SPECIALTIES = ["Saúde mental", "TDAH no adulto", "Ansiedade", "Insônia", "Depressão", "Burnout"];

const safeText = (max: number) =>
  z.string().trim().max(max).regex(/^[^<>{}]*$/, { message: "Caracteres inválidos" });

type Tokens = {
  nome: string;
  especialidade: string;
  data: Date | undefined;
};

const initial: Tokens = { nome: "", especialidade: "Saúde mental", data: undefined };

const categories = ["Todas", ...Array.from(new Set(publicReplies.map((r) => r.category)))];

function applyTokens(template: string, t: Tokens) {
  const dataFmt = t.data ? format(t.data, "dd/MM/yyyy", { locale: ptBR }) : "";
  const map: Record<string, string> = {
    nome: t.nome.trim(),
    especialidade: t.especialidade.trim(),
    data: dataFmt,
  };
  const missing: string[] = [];
  const tokensInTemplate = Array.from(new Set(Array.from(template.matchAll(/\{\{(\w+)\}\}/g)).map((m) => m[1])));
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

export const PublicReplies = () => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("Todas");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Tokens>(initial);

  const update = <K extends keyof Tokens>(key: K, raw: Tokens[K]) => {
    if (typeof raw === "string") {
      const result = safeText(120).safeParse(raw);
      if (!result.success) {
        toast.error("Caracteres inválidos detectados");
        return;
      }
    }
    setTokens((v) => ({ ...v, [key]: raw }));
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publicReplies.filter((r) => {
      const matchCat = cat === "Todas" || r.category === cat;
      const matchQ =
        !q ||
        r.question.toLowerCase().includes(q) ||
        r.answer.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, cat]);

  const copy = async (id: string, text: string, missing: string[]) => {
    if (missing.length > 0) {
      toast.warning(`Tokens não preenchidos: ${missing.join(", ")}`);
    }
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Resposta copiada — pronta para colar na Doctoralia");
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
    <section id="doctoralia" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Doctoralia • Captação</p>
            <h2 className="mt-3 text-4xl md:text-5xl">
              Respostas públicas que <span className="italic text-primary">convertem</span>.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Templates com campos dinâmicos. Preencha uma vez, copie quantos quiser — todas as
              respostas usam os mesmos tokens.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <MessageSquareQuote className="h-4 w-4 text-primary" />
            {publicReplies.length} respostas prontas
          </div>
        </div>

        {/* Painel de personalização global */}
        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-display text-lg">Personalização global</h3>
            <Button onClick={reset} variant="ghost" size="sm" className="rounded-full">
              <RotateCcw className="mr-2 h-3.5 w-3.5" /> Limpar
            </Button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <Label htmlFor="pr-nome">Nome do paciente</Label>
              <Input
                id="pr-nome"
                value={tokens.nome}
                onChange={(e) => update("nome", e.target.value)}
                placeholder="Maria"
                maxLength={80}
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="pr-esp">Especialidade</Label>
              <Select value={tokens.especialidade} onValueChange={(v) => update("especialidade", v)}>
                <SelectTrigger id="pr-esp" className="mt-1.5">
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
              <Label>Data de referência</Label>
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
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 100))}
              placeholder="Buscar por pergunta, palavra-chave ou categoria..."
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
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((r) => {
            const isCopied = copiedId === r.id;
            const { text, missing, tokensInTemplate } = applyTokens(r.answer, tokens);
            return (
              <article
                key={r.id}
                className="group relative flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-all hover:shadow-soft"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {r.category}
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
                  {r.question}
                </h3>

                <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-2xl bg-secondary/50 p-5 font-sans text-sm leading-relaxed text-foreground/85">
                  {renderHighlighted(text)}
                </pre>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground">{text.length} caracteres</span>
                  <Button
                    onClick={() => copy(r.id, text, missing)}
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
                        <Copy className="mr-2 h-3.5 w-3.5" /> Copiar resposta
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
            Nenhuma resposta encontrada para "{query}".
          </div>
        )}
      </div>
    </section>
  );
};
