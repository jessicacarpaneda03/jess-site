import { services, principles } from "@/data/protocol";

export const Services = () => (
  <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
    <div className="grid gap-16 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Serviços e valores</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Tabela vigente.</h2>
        <p className="mt-5 text-muted-foreground">
          Valores oficiais para informar pacientes. Pagamento exclusivamente pela
          plataforma Doctoralia, com reembolso integral em cancelamentos &gt; 24h.
        </p>

        <ul className="mt-10 divide-y divide-border border-y border-border">
          {services.map((s) => (
            <li key={s.name} className="flex items-baseline justify-between gap-6 py-5">
              <div>
                <div className="font-medium text-foreground">{s.name}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.duration}
                </div>
              </div>
              <div className="font-display text-2xl text-primary">{s.price}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:pl-8">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Princípios</p>
        <h2 className="mt-3 text-4xl md:text-5xl">O que nos guia.</h2>
        <p className="mt-5 text-muted-foreground">
          Quatro pilares não-negociáveis. Em qualquer dúvida, volte para eles.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-transform hover:-translate-y-1"
            >
              <div className="font-display text-xs text-accent">0{i + 1}</div>
              <h3 className="mt-2 font-display text-xl">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
