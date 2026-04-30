import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Check, Copy, MessageCircle, RotateCcw, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { quickReplies, quickReplyTabs, type QuickReplyTab } from "@/data/quickReplies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const safeText = (max: number) =>
  z.string().trim().max(max).regex(/^[^<>{}]*$/, { message: "Caracteres inválidos" });

type Tokens = { nome: string; data: Date | undefined };
const initial: Tokens = { nome: "", data: undefined };

function applyTokens(template: string, t: Tokens) {
  const dataFmt = t.data ? format(t.data, "dd/MM/yyyy", { locale: ptBR }) : "";
  const map: Record<string, string> = { nome: t.nome.trim(), data: dataFmt };
  const missing: string[] = [];
  const text = template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const v = map[key] ?? "";
    if (!v) {
      if (!missing.includes(key)) missing.push(key);
      return `{{${key}}}`;
    }
    return v;
  });
  return { text, missing };
}

function renderHighlighted(template: string, t: Tokens) {
  const parts = template.split(/(\{\{\w+\}\})/g);
  return parts.map((p, i) => {
    const m = p.match(/^\{\{(\w+)\}\}$/);
    if (!m) return <span key={i}>{p}</span>;
    const key = m[1];
    const value =
      key === "nome" ? t.nome.trim() : key === "data" && t.data ? format(t.data, "dd/MM/yyyy", { locale: ptBR }) : "";
    if (value) return <span key={i} className="rounded bg-primary/15 px-1 font-medium text-primary">{value}</span>;
    return <span key={i} className="rounded bg-destructive/15 px-1 text-destructive">{p}</span>;
  });
}

export const QuickReplies = () => {
  const [tab, setTab] = useState<QuickReplyTab>("fillers");
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [tokens, setTokens] = useState<Tokens>(initial);

  const update = <K extends keyof Tokens>(key: K, raw: Tokens[K]) => {
    if (typeof raw === "string") {
      const result = safeText(120).safeParse(raw);
      if (!result.success) return;
      setTokens((prev) => ({ ...prev, [key]: result.data as Tokens[K] }));
    } else {
      setTokens((prev) => ({ ...prev, [key]: raw }));
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return quickReplies.filter((r) => {
      if (r.tab !== tab) return false;
      if (!q) return true;
      return (
        r.label.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q) ||
        (r.tag?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [tab, query]);

  const handleCopy = async (id: string, template: string) => {
    const { text, missing } = applyTokens(template, tokens);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
      if (missing.length === 0) {
        toast.success("Copiado!", { description: "Cole no WhatsApp ou Doctoralia." });
      } else {
        toast.warning("Copiado com lacunas", {
          description: `Tokens vazios: ${missing.join(", ")}`,
        });
      }
    } catch {
      toast.error("Não foi possível copiar.");
    }
  };

  return (
    <section id="respostas-rapidas" className="border-t border-border/60 bg-gradient-to-b from-background to-muted/20 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3" /> Respostas Rápidas
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            Para WhatsApp e mensagens diretas, com tom humano.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Coringas para ganhar tempo, frases de acolhimento, atalhos por tema e respostas para escorregar objeções —
            todas com tokens dinâmicos prontos para colar.
          </p>
        </header>

        {/* Painel de tokens */}
        <div className="mb-8 rounded-2xl border border-border/60 bg-card/60 p-5 shadow-sm backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-medium">Personalização global</p>
            <Button variant="ghost" size="sm" onClick={() => setTokens(initial)} className="h-8 text-xs">
              <RotateCcw className="mr-1 h-3 w-3" /> Limpar
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="qr-nome" className="text-xs uppercase tracking-wide text-muted-foreground">
                Nome do paciente
              </Label>
              <Input
                id="qr-nome"
                placeholder="Ex.: Mariana"
                value={tokens.nome}
                onChange={(e) => update("nome", e.target.value)}
                maxLength={120}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Data de referência</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !tokens.data && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {tokens.data ? format(tokens.data, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={tokens.data} onSelect={(d) => update("data", d)} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Busca */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por palavra, tema ou frase…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <span className="text-xs text-muted-foreground">{filtered.length} resposta(s)</span>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={(v) => setTab(v as QuickReplyTab)}>
          <TabsList className="mb-6 grid h-auto w-full grid-cols-2 gap-1 bg-muted/50 p-1 sm:grid-cols-3 lg:grid-cols-7">
            {quickReplyTabs.map((t) => (
              <TabsTrigger key={t.id} value={t.id} className="flex-col gap-0.5 py-2">
                <span className="text-sm font-medium">{t.label}</span>
                <span className="hidden text-[10px] font-normal text-muted-foreground xl:block">{t.description}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {quickReplyTabs.map((t) => (
            <TabsContent key={t.id} value={t.id} className="mt-0">
              {filtered.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/60 p-10 text-center text-sm text-muted-foreground">
                  Nenhuma resposta encontrada para essa busca.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filtered.map((r) => {
                    const { missing } = applyTokens(r.text, tokens);
                    const isCopied = copiedId === r.id;
                    return (
                      <article
                        key={r.id}
                        className="group flex flex-col rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md"
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <MessageCircle className="h-4 w-4 text-primary" />
                            <h3 className="text-sm font-semibold leading-tight">{r.label}</h3>
                          </div>
                          {r.tag && (
                            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary-foreground">
                              {r.tag}
                            </span>
                          )}
                        </div>

                        <div className="mb-4 flex-1 whitespace-pre-wrap rounded-lg bg-muted/40 p-3 text-sm leading-relaxed text-foreground/90">
                          {renderHighlighted(r.text, tokens)}
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1">
                            {missing.length === 0 ? (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
                                ✓ pronto
                              </span>
                            ) : (
                              missing.map((m) => (
                                <span key={m} className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] text-destructive">
                                  ⚠ {m}
                                </span>
                              ))
                            )}
                          </div>
                          <Button size="sm" variant={isCopied ? "secondary" : "default"} onClick={() => handleCopy(r.id, r.text)} className="h-8">
                            {isCopied ? (
                              <>
                                <Check className="mr-1 h-3.5 w-3.5" /> Copiado
                              </>
                            ) : (
                              <>
                                <Copy className="mr-1 h-3.5 w-3.5" /> Copiar
                              </>
                            )}
                          </Button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
