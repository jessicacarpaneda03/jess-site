import { useMemo, useState } from "react";
import { Check, Copy, MessageSquareHeart, Search, Sparkles, User } from "lucide-react";
import { toast } from "sonner";

import { reviewTemplates, toneOptions } from "@/data/doctoraliaReviews";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const DoctoraliaReviewReplies = () => {
  const [query, setQuery] = useState("");
  const [nome, setNome] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(reviewTemplates[0].id);
  const [selectedTones, setSelectedTones] = useState<Set<string>>(new Set(["formal", "acolhedor", "curto"]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reviewTemplates.filter(
      (t) =>
        !q ||
        t.category.toLowerCase().includes(q) ||
        t.patientReviewHint.toLowerCase().includes(q) ||
        t.variations.some((v) => v.toneLabel.toLowerCase().includes(q))
    );
  }, [query]);

  const applyNome = (text: string) => text.replace(/\{\{nome\}\}/g, nome.trim() || "Paciente");

  const copy = async (id: string, text: string) => {
    const final = applyNome(text);
    await navigator.clipboard.writeText(final);
    setCopiedId(id);
    toast.success("Copiado — cole direto na Doctoralia");
    setTimeout(() => setCopiedId(null), 1800);
  };

  const toggleTone = (tone: string) => {
    setSelectedTones((prev) => {
      const next = new Set(prev);
      if (next.has(tone)) {
        if (next.size > 1) next.delete(tone);
      } else {
        next.add(tone);
      }
      return next;
    });
  };

  const renderHighlighted = (text: string) =>
    text.split(/(\{\{nome\}\})/g).map((part, i) =>
      /^\{\{nome\}\}$/.test(part) ? (
        <mark key={i} className="rounded bg-accent/20 px-1 text-accent">
          {nome.trim() || "Paciente"}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );

  return (
    <section id="doctoralia-reviews" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        {/* Header */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Doctoralia • Reviews</p>
            <h2 className="mt-3 text-4xl md:text-5xl">
              Respostas a avaliações em <span className="italic text-primary">3 tons</span>.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Escolha o tipo de avaliação do paciente, preencha o nome e copie a variação de tom que mais
              combina — formal, acolhedor ou curto.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <MessageSquareHeart className="h-4 w-4 text-primary" />
            {reviewTemplates.length} modelos
          </div>
        </div>

        {/* Painel de personalização */}
        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg">Personalização</h3>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-foreground">Nome do paciente</label>
              <div className="relative mt-1.5">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={nome}
                  onChange={(e) => setNome(e.target.value.slice(0, 80))}
                  placeholder="Ex: Maria Silva"
                  maxLength={80}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Filtrar por tons</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {toneOptions.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => toggleTone(t.value)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                      selectedTones.has(t.value)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-muted-foreground hover:bg-secondary"
                    )}
                    title={t.description}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Busca */}
        <div className="mt-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 100))}
              placeholder="Buscar por tipo de avaliação... (ex: 'elogio', 'melhora', 'telemedicina')"
              maxLength={100}
              className="h-12 rounded-full border-border bg-card pl-11"
            />
          </div>
        </div>

        {/* Templates */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((template) => {
            const isExpanded = expandedId === template.id;
            const visibleVars = template.variations.filter((v) => selectedTones.has(v.tone));

            return (
              <article
                key={template.id}
                className={cn(
                  "group relative flex flex-col rounded-3xl border border-border bg-card shadow-card transition-all hover:shadow-soft",
                  isExpanded && "ring-1 ring-primary/20"
                )}
              >
                {/* Header do card */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : template.id)}
                  className="flex w-full flex-col p-6 text-left"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {template.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {visibleVars.length} variação{visibleVars.length !== 1 ? "ões" : ""}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start gap-3">
                    <MessageSquareHeart className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm italic text-muted-foreground">
                      "{template.patientReviewHint}"
                    </p>
                  </div>
                </button>

                {/* Variações expandíveis */}
                {isExpanded && (
                  <div className="flex flex-col gap-4 border-t border-border px-6 pb-6 pt-4">
                    {visibleVars.length === 0 && (
                      <p className="text-center text-sm text-muted-foreground">
                        Selecione pelo menos um tom acima para ver as variações.
                      </p>
                    )}
                    {visibleVars.map((v) => {
                      const copyId = `${template.id}-${v.tone}`;
                      const isCopied = copiedId === copyId;
                      const text = applyNome(v.text);

                      return (
                        <div
                          key={v.tone}
                          className={cn(
                            "rounded-2xl border p-4",
                            v.tone === "formal" && "border-border bg-secondary/30",
                            v.tone === "acolhedor" && "border-accent/20 bg-accent/5",
                            v.tone === "curto" && "border-primary/20 bg-primary/5"
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-foreground">
                              <span>
                                {toneOptions.find((t) => t.value === v.tone)?.icon}
                              </span>
                              {v.toneLabel}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {text.length} caracteres
                            </span>
                          </div>

                          <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-background/60 p-3 font-sans text-sm leading-relaxed text-foreground/85">
                            {renderHighlighted(v.text)}
                          </pre>

                          <Button
                            onClick={() => copy(copyId, v.text)}
                            variant={isCopied ? "default" : "outline"}
                            size="sm"
                            className="mt-3 w-full rounded-full"
                          >
                            {isCopied ? (
                              <>
                                <Check className="mr-2 h-3.5 w-3.5" /> Copiado
                              </>
                            ) : (
                              <>
                                <Copy className="mr-2 h-3.5 w-3.5" /> Copiar ({v.toneLabel})
                              </>
                            )}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-border bg-card/40 p-12 text-center text-muted-foreground">
            Nenhum modelo encontrado para "{query}".
          </div>
        )}
      </div>
    </section>
  );
};
