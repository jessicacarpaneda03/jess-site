import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs, doctor } from "@/data/protocol";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const Faqs = () => (
  <section className="bg-primary text-primary-foreground">
    <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:py-32 lg:grid-cols-[1fr_1.4fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/60">
          Perguntas frequentes
        </p>
        <h2 className="mt-3 text-4xl md:text-5xl">Respostas que a equipe precisa saber de cor.</h2>
        <p className="mt-6 text-primary-foreground/70">
          Em caso de dúvida que fuja do protocolo, sinalize internamente antes de
          improvisar uma resposta.
        </p>

        <Button asChild size="lg" variant="secondary" className="mt-8 rounded-full">
          <a href={doctor.bookingUrl} target="_blank" rel="noreferrer noopener">
            Abrir perfil Doctoralia
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 px-6"
          >
            <AccordionTrigger className="text-left font-display text-lg hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-primary-foreground/75">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
