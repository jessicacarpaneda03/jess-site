import heroBg from "@/assets/hero-bg.jpg";
import { doctor } from "@/data/protocol";
import { Button } from "@/components/ui/button";
import { ArrowDown, Stethoscope } from "lucide-react";

export const Hero = () => (
  <header className="relative overflow-hidden">
    <img
      src={heroBg}
      alt=""
      width={1920}
      height={1024}
      className="absolute inset-0 h-full w-full object-cover opacity-70"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />

    <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-28 md:pt-32 md:pb-40">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
        <Stethoscope className="h-3.5 w-3.5 text-primary" />
        Protocolo interno de atendimento — v1.0
      </div>

      <h1 className="mt-8 max-w-4xl text-5xl leading-[0.95] md:text-7xl lg:text-[5.5rem]">
        Cuidar bem <span className="italic text-primary">também</span> é<br />
        responder bem.
      </h1>

      <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
        Manual operacional para a equipe de atendimento da {doctor.name}. Fluxos,
        scripts prontos e princípios para que cada contato — do primeiro WhatsApp
        ao pós-consulta — carregue a mesma escuta humana e técnica.
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Button asChild size="lg" className="rounded-full px-7 shadow-soft">
          <a href="#fluxo">
            Ver o fluxo completo
            <ArrowDown className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button asChild variant="outline" size="lg" className="rounded-full px-7">
          <a href={doctor.bookingUrl} target="_blank" rel="noreferrer noopener">
            Perfil na Doctoralia
          </a>
        </Button>
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-6 border-t border-border/60 pt-8 md:grid-cols-4">
        {[
          ["Especialidade", "Saúde mental"],
          ["Modalidade", "100% online"],
          ["Registro", doctor.crm],
          ["Cobertura", "Brasil"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">{k}</dt>
            <dd className="mt-1 font-display text-lg text-foreground">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  </header>
);
