import { useState } from "react";
import { scripts } from "@/data/protocol";
import { Button } from "@/components/ui/button";
import { Copy, Check, MessageCircle, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const channelIcon = {
  WhatsApp: MessageCircle,
  "E-mail": Mail,
  Telefone: Phone,
};

export const Scripts = () => {
  const [active, setActive] = useState(scripts[0].id);
  const [copied, setCopied] = useState(false);
  const current = scripts.find((s) => s.id === active)!;
  const Icon = channelIcon[current.channel];

  const copy = async () => {
    await navigator.clipboard.writeText(current.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="scripts" className="bg-gradient-warm">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Scripts prontos</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Palavras que acolhem.</h2>
          <p className="mt-5 text-muted-foreground">
            Modelos validados para os contatos mais frequentes. Substitua os campos{" "}
            <code className="rounded bg-card px-1.5 py-0.5 text-xs">{`{{nome}}`}</code> antes
            de enviar.
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
                  active === s.id
                    ? "border-border bg-card shadow-card"
                    : "hover:bg-card/60"
                )}
              >
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.channel}
                </div>
                <div className="mt-1 font-medium text-foreground">{s.title}</div>
              </button>
            ))}
          </nav>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {current.channel}
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
              {current.body}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
