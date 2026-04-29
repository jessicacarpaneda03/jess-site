import { stages } from "@/data/protocol";
import { Check } from "lucide-react";

export const Stages = () => (
  <section id="fluxo" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.2em] text-accent">O fluxo</p>
      <h2 className="mt-3 text-4xl md:text-5xl">Cinco etapas, um único cuidado.</h2>
      <p className="mt-5 text-muted-foreground">
        Toda jornada do paciente passa por estes cinco momentos. Cada um tem seu
        ritual — checklist, tom e tempo de resposta.
      </p>
    </div>

    <ol className="mt-16 space-y-4">
      {stages.map((s, i) => (
        <li
          key={s.id}
          className="group relative grid grid-cols-1 gap-6 rounded-3xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-soft md:grid-cols-[auto_1fr_1.2fr] md:gap-12 md:p-10"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="font-display text-6xl leading-none text-primary/20 md:text-7xl">
            {s.number}
          </div>

          <div>
            <h3 className="font-display text-2xl text-foreground md:text-3xl">{s.title}</h3>
            <p className="mt-3 text-muted-foreground">{s.subtitle}</p>
          </div>

          <ul className="space-y-3">
            {s.checklist.map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-secondary">
                  <Check className="h-3 w-3 text-primary" />
                </span>
                <span className="text-foreground/85">{c}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  </section>
);
