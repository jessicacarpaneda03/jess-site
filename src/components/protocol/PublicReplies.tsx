import { useMemo, useState } from "react";
import { Check, Copy, Search, MessageSquareQuote } from "lucide-react";
import { toast } from "sonner";

import { publicReplies } from "@/data/publicReplies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories = ["Todas", ...Array.from(new Set(publicReplies.map((r) => r.category)))];

export const PublicReplies = () => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("Todas");
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  const copy = async (id: string, text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Resposta copiada — pronta para colar na Doctoralia");
    setTimeout(() => setCopiedId(null), 1800);
  };

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
              Templates para responder dúvidas de pacientes em potencial diretamente nos comentários
              e mensagens da Doctoralia. Tom acolhedor, informação clara e CTA para agendamento.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
            <MessageSquareQuote className="h-4 w-4 text-primary" />
            {publicReplies.length} respostas prontas
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
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
            return (
              <article
                key={r.id}
                className="group relative flex flex-col rounded-3xl border border-border bg-card p-7 shadow-card transition-all hover:shadow-soft"
              >
                <span className="self-start rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                  {r.category}
                </span>

                <h3 className="mt-4 font-display text-xl leading-snug text-foreground">
                  {r.question}
                </h3>

                <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-2xl bg-secondary/50 p-5 font-sans text-sm leading-relaxed text-foreground/85">
                  {r.answer}
                </pre>

                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground">
                    {r.answer.length} caracteres
                  </span>
                  <Button
                    onClick={() => copy(r.id, r.answer)}
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
