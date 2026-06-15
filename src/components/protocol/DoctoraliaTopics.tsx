import { useMemo, useState } from "react";
import { Check, Copy, Filter, Stethoscope } from "lucide-react";
import { toast } from "sonner";

import { doctoraliaTopics, tierLabels, type TopicTier } from "@/data/doctoraliaTopics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FilterValue = "todos" | TopicTier;

const filters: { value: FilterValue; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "ancora", label: tierLabels.ancora.label },
  { value: "conversao", label: tierLabels.conversao.label },
  { value: "cauda", label: tierLabels.cauda.label },
];

const tierStyles: Record<TopicTier, string> = {
  ancora: "border-primary/30 bg-primary/10 text-primary",
  conversao: "border-accent/30 bg-accent/10 text-accent",
  cauda: "border-border bg-secondary text-foreground/70",
};

export const DoctoraliaTopics = () => {
  const [filter, setFilter] = useState<FilterValue>("todos");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      doctoraliaTopics.filter((t) => filter === "todos" || t.tier === filter).sort((a, b) => a.rank - b.rank),
    [filter]
  );

  const copy = async (id: string, text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success(`${label} copiado — cole no Doctoralia`);
    setTimeout(() => setCopiedId(null), 1600);
  };

  return (
    <section id="doctoralia-temas" className="border-t border-border bg-secondary/20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Doctoralia • Temas em que atua</p>
            <h2 className="mt-3 text-4xl md:text-5xl">
              15 temas <span className="italic text-primary">priorizados</span> para SEO.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Cole na ordem listada. Os primeiros são âncoras de tráfego (alto volume de busca);
              os do meio convertem rápido; os finais diferenciam seu perfil. Linguagem simples, sem jargão,
              palavra-chave no início de cada texto.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <Stethoscope className="h-4 w-4 text-primary" />
            {doctoraliaTopics.length} temas
          </div>
        </div>

        {/* Legenda das tiers */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {(Object.keys(tierLabels) as TopicTier[]).map((tier) => (
            <div key={tier} className={cn("rounded-2xl border p-4", tierStyles[tier])}>
              <p className="text-[11px] font-semibold uppercase tracking-wider">{tierLabels[tier].label}</p>
              <p className="mt-1 text-sm text-foreground/80">{tierLabels[tier].description}</p>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                filter === f.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((topic) => {
            const titleId = `${topic.id}-title`;
            const descId = `${topic.id}-desc`;
            return (
              <article
                key={topic.id}
                className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-card transition-all hover:shadow-soft"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                      tierStyles[topic.tier]
                    )}
                  >
                    #{topic.rank} · {tierLabels[topic.tier].short}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {topic.description.length} caracteres
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl text-foreground">{topic.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Palavra-chave: <span className="text-foreground/70">{topic.keyword}</span>
                </p>

                <p className="mt-4 flex-1 whitespace-pre-wrap rounded-2xl bg-background/60 p-4 text-sm leading-relaxed text-foreground/85">
                  {topic.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => copy(titleId, topic.title, "Título")}
                    variant={copiedId === titleId ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                  >
                    {copiedId === titleId ? (
                      <>
                        <Check className="mr-1.5 h-3.5 w-3.5" /> Título
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1.5 h-3.5 w-3.5" /> Título
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => copy(descId, topic.description, "Descrição")}
                    variant={copiedId === descId ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                  >
                    {copiedId === descId ? (
                      <>
                        <Check className="mr-1.5 h-3.5 w-3.5" /> Descrição
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1.5 h-3.5 w-3.5" /> Descrição
                      </>
                    )}
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
