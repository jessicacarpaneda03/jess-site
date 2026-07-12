import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Clock, Heart, Shield, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://doctoralia-care-connect.lovable.app/guia-conversao-whatsapp";
const TITLE = "Como aumentar a conversão de pacientes via WhatsApp na Psiquiatria";
const DESCRIPTION =
  "Guia prático de marketing médico e atendimento ao paciente: velocidade de resposta, tom humanizado e scripts de WhatsApp que aumentam a conversão em clínicas de psiquiatria.";

const sections = [
  {
    id: "por-que-whatsapp",
    icon: MessageCircle,
    title: "Por que o WhatsApp é o canal decisivo",
    body: [
      "No marketing médico atual, a maior parte do paciente que descobre um psiquiatra pelo Google, Doctoralia ou indicação chega primeiro pelo WhatsApp — não pelo telefone e nem pelo formulário do site. É nesse chat que ele decide se você é a pessoa certa para cuidar da saúde mental dele.",
      "O atendimento ao paciente pelo WhatsApp funciona como uma triagem afetiva: em poucas mensagens, ele precisa sentir clareza sobre valores, formato e tom da consulta. Quando isso falha, ele desiste em silêncio e procura outro profissional.",
    ],
  },
  {
    id: "velocidade",
    icon: Clock,
    title: "1. Velocidade de resposta: os primeiros 5 minutos valem por 10 pacientes",
    body: [
      "Estudos de conversão em serviços de saúde mostram que responder um lead em até 5 minutos aumenta em até 9x a chance de converter em consulta agendada, comparado a respostas depois de 1 hora.",
      "Na prática clínica, isso não significa ficar 24h no celular. Significa ter uma mensagem automática de boas-vindas ativa, que já entrega valor (nome do profissional, especialidade, formato de atendimento e link para agenda) enquanto você não pode responder pessoalmente.",
    ],
    checklist: [
      "Auto-resposta de boas-vindas ativa no WhatsApp Business",
      "Link direto de agendamento na primeira mensagem",
      "Aviso claro do próximo horário em que você responde pessoalmente",
      "Mensagem de ausência específica para congressos e finais de semana",
    ],
  },
  {
    id: "tom",
    icon: Heart,
    title: "2. Tom humanizado: escreva como você fala no consultório",
    body: [
      "O paciente que procura psiquiatria já está fragilizado. Mensagens frias, cheias de jargão técnico ou assinadas por 'Equipe' geram desconfiança e afastam.",
      "O padrão que mais converte é a primeira pessoa: 'Eu li sua mensagem', 'vou te responder pessoalmente', 'a gente conversa com calma na primeira consulta'. É o mesmo tom que você usa no consultório, transportado para o texto.",
    ],
    checklist: [
      "Primeira pessoa em todas as respostas (eu, minha agenda, meu site)",
      "Zero jargão psiquiátrico na porta de entrada",
      "Emojis discretos (🌿 💙) sinalizam acolhimento sem infantilizar",
      "Uso do nome do paciente quando ele se identifica",
    ],
  },
  {
    id: "scripts",
    icon: Shield,
    title: "3. Scripts prontos para as 5 situações que mais derrubam conversão",
    body: [
      "As objeções que mais fazem o paciente desistir na psiquiatria são previsíveis: valor, ausência de convênio, medo da primeira consulta, dúvida sobre online e pedido de receita sem consulta. Ter um script ético e humanizado pronto para cada uma delas é o que separa a clínica que converte da clínica que perde paciente no chat.",
      "Os scripts devem viver em uma biblioteca reutilizável (não em bloco de notas solto), permitir variáveis dinâmicas como {{nome}}, {{data}} e {{preço}}, e ser revisados sempre que houver reajuste de valores ou mudança de agenda.",
    ],
    checklist: [
      "Script de valores (primeira consulta, retorno, renovação excepcional)",
      "Script de 'não atendo convênio' com orientação de reembolso",
      "Script de primeira vez em psiquiatria, sem promessas de cura",
      "Script de logística online (link, ambiente, exames)",
      "Script de renovação de receita apenas para pacientes já em acompanhamento",
    ],
  },
  {
    id: "metricas",
    icon: TrendingUp,
    title: "4. O que medir para saber se está funcionando",
    body: [
      "Marketing médico bem feito é mensurável. Não precisa de planilha complexa — bastam 4 números acompanhados a cada mês para você saber se o WhatsApp está trabalhando a seu favor.",
    ],
    checklist: [
      "Tempo médio até a primeira resposta (meta: < 30 min no horário comercial)",
      "Taxa de conversa que vira agendamento (meta saudável: 30-50%)",
      "Origem do contato (Doctoralia, Google, indicação, Instagram)",
      "Motivo de desistência quando o paciente para de responder",
    ],
  },
];

export default function GuiaConversaoWhatsapp() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    author: { "@type": "Person", name: "Dra. Jéssica Carpaneda", jobTitle: "Médica Psiquiatra" },
    mainEntityOfPage: CANONICAL,
    inLanguage: "pt-BR",
    about: ["marketing médico", "atendimento ao paciente", "WhatsApp para clínicas", "psiquiatria"],
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={CANONICAL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao protocolo
        </Link>

        <header className="mb-10">
          <Badge variant="secondary" className="mb-3">
            Guia · Marketing médico e atendimento ao paciente
          </Badge>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-foreground leading-tight mb-4">
            {TITLE}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{DESCRIPTION}</p>
        </header>

        <article className="space-y-10">
          {sections.map(({ id, icon: Icon, title, body, checklist }) => (
            <section key={id} id={id} className="scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-serif font-medium text-foreground">
                  {title}
                </h2>
              </div>
              <div className="space-y-3 text-foreground/80 leading-relaxed">
                {body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {checklist && (
                <Card className="mt-4 p-4 bg-muted/40">
                  <ul className="space-y-2">
                    {checklist.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </section>
          ))}

          <section className="border-t border-border pt-8">
            <h2 className="text-xl md:text-2xl font-serif font-medium text-foreground mb-3">
              Como aplicar isso no seu consultório hoje
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-4">
              Este protocolo já vem construído no app: biblioteca de mensagens com variáveis
              dinâmicas, formulador de respostas com IA, scripts de risco, respostas para opiniões
              públicas e calendário de novidades. Basta ajustar aos seus valores e ao seu tom.
            </p>
            <Button asChild>
              <Link to="/">Abrir protocolo de atendimento</Link>
            </Button>
          </section>
        </article>
      </div>
    </main>
  );
}
