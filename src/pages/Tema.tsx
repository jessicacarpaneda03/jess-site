import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { doctoraliaTopics, tierLabels } from "@/data/doctoraliaTopics";
import { Button } from "@/components/ui/button";
import NotFound from "./NotFound";

const SITE_URL = "https://doctoralia-care-connect.lovable.app";

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  return `${slice.slice(0, lastSpace > 0 ? lastSpace : slice.length)}…`;
}

export default function Tema() {
  const { slug } = useParams<{ slug: string }>();
  const topic = doctoraliaTopics.find((t) => t.id === slug);

  if (!topic) return <NotFound />;

  const tier = tierLabels[topic.tier];
  const url = `${SITE_URL}/tema/${topic.id}`;
  const metaTitle = `${topic.title} | Dra. Jéssica Carpaneda — Médica em Saúde Mental`;
  const metaDescription = truncate(topic.description, 158);

  // Split description into paragraphs for readable H2 blocks
  const sentences = topic.description
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 0);
  const mid = Math.ceil(sentences.length / 2);
  const paraComoAtendo = sentences.slice(0, mid).join(" ");
  const paraPlano = sentences.slice(mid).join(" ");

  const related = doctoraliaTopics
    .filter((t) => t.id !== topic.id && t.tier === topic.tier)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: topic.title,
    description: metaDescription,
    url,
    inLanguage: "pt-BR",
    about: {
      "@type": "MedicalCondition",
      name: topic.title,
    },
    author: {
      "@type": "Physician",
      name: "Dra. Jéssica Carpaneda",
      medicalSpecialty: "Mental",
      identifier: "CRM GO 31189",
      url: "https://drajessicacarpaneda.com.br",
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Temas", item: `${SITE_URL}/temas` },
      { "@type": "ListItem", position: 3, name: topic.title, item: url },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-3xl px-4 py-10 md:py-16">
          <nav className="mb-6 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-foreground">Início</Link>
            <span className="mx-2">/</span>
            <Link to="/temas" className="hover:text-foreground">Temas</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{topic.title}</span>
          </nav>

          <div className="mb-4 flex items-center gap-2 text-xs">
            <span className="rounded-full border px-2 py-1 font-medium">
              {tier.short}
            </span>
            <span className="text-muted-foreground">
              Palavra-chave: {topic.keyword}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            {topic.title}
          </h1>

          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            {truncate(topic.description, 220)}
          </p>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">Como atendo {topic.title.toLowerCase()}</h2>
            <p className="leading-relaxed">{paraComoAtendo}</p>
          </section>

          {paraPlano && (
            <section className="mb-8">
              <h2 className="mb-3 text-xl font-semibold">Plano de tratamento</h2>
              <p className="leading-relaxed">{paraPlano}</p>
            </section>
          )}

          <section className="mb-10 rounded-lg border bg-card p-6">
            <h2 className="mb-2 text-xl font-semibold">Agendar consulta</h2>
            <p className="mb-4 text-muted-foreground">
              Sou Dra. Jéssica Carpaneda, médica em saúde mental (CRM GO 31189).
              Atendimento presencial e online.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a
                  href="https://drajessicacarpaneda.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar consulta
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/temas">Ver todos os temas</Link>
              </Button>
            </div>
          </section>

          {related.length > 0 && (
            <section>
              <h2 className="mb-3 text-xl font-semibold">Temas relacionados</h2>
              <ul className="grid gap-2 sm:grid-cols-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      to={`/tema/${r.id}`}
                      className="block rounded-md border p-3 hover:bg-accent"
                    >
                      <div className="font-medium">{r.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {tierLabels[r.tier].short}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
