import { useState } from "react";
import { Copy, Check, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";

import { outreachVersions } from "@/data/psychOutreach";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const PsychOutreach = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
      toast.success("Copiado!", { description: "Cole no grupo ou no privado." });
    } catch {
      toast.error("Não foi possível copiar.");
    }
  };

  return (
    <section id="divulgacao-psicologos" className="border-t border-border/60 bg-gradient-to-b from-background to-muted/20 py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mb-10 max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <Users className="h-3 w-3" /> Divulgação para Psicólogas(os)
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            Textos prontos para se apresentar em grupos de psicologia.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Três versões de tom — curta, média e sofisticada — para você copiar e colar em grupos de colegas,
            construir parcerias e receber encaminhamentos. Sem jargões, com calor humano.
          </p>
        </header>

        <Tabs defaultValue="curta" className="w-full">
          <TabsList className="mb-6 h-auto w-full grid-cols-3 gap-1 bg-muted/50 p-1 sm:grid-cols-3">
            {outreachVersions.map((v) => (
              <TabsTrigger key={v.id} value={v.id} className="py-2 text-sm font-medium">
                {v.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {outreachVersions.map((v) => {
            const isCopied = copiedId === v.id;
            return (
              <TabsContent key={v.id} value={v.id} className="mt-1">
                <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition hover:shadow-md">
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      <h3 className="text-sm font-semibold">{v.label}</h3>
                    </div>
                    <Button
                      size="sm"
                      variant={isCopied ? "secondary" : "default"}
                      onClick={() => handleCopy(v.id, v.text)}
                      className="h-8"
                    >
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

                  <div className="whitespace-pre-wrap rounded-lg bg-muted/40 p-4 text-sm leading-relaxed text-foreground/90">
                    {v.text}
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};
