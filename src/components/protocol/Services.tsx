import { services, principles } from "@/data/protocol";

export const Services = () => (
  <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
    <div className="grid gap-16 lg:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Serviços e valores</p>
        <h2 className="mt-3 text-4xl md:text-5xl">Valores que pratico.</h2>
        <p className="mt-5 text-muted-foreground">
          Estes são os valores oficiais dos meus atendimentos em Saúde mental. Pagamento exclusivamente pela
          plataforma Doctoralia, com reembolso integral em cancelamentos com mais de 24h de antecedência.
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

        <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
          <h3 className="font-display text-lg text-accent">Renovação de receita — caso excepcional</h3>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            A renovação de receita (R$ 150) é oferecida <strong className="text-foreground">exclusivamente para pacientes já acompanhados</strong> em casos pontuais e excepcionais, como quando não consigo atender no prazo ideal para o retorno.
          </p>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Receitas de medicamentos controlados e psicotrópicos exigem, por norma do CFM, avaliação clínica presencial ou por telemedicina em consulta regular. A renovação sem consulta é uma <strong className="text-foreground">facilidade excepcional</strong> para quem já está sob meu acompanhamento, e não se aplica a novos pacientes.
          </p>
          <p className="mt-3 text-xs uppercase tracking-wider text-accent">
            Disponível apenas para pacientes em acompanhamento ativo.
          </p>
        </div>
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
