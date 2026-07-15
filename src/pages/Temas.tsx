import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { doctoraliaTopics, tierLabels, type TopicTier } from "@/data/doctoraliaTopics";

const SITE_URL = "https://doctoralia-care-connect.lovable.app";
const TIER_ORDER: TopicTier[] = ["ancora", "conversao", "cauda"];

export default function Temas() {
  const url = `${SITE_URL}/temas`;
  const title = "Temas de saúde mental | Dra. Jéssica Carpaneda";
  const description =
    "Ansiedade, depressão, TDAH em adultos, insônia, burnout e mais. Conheça os temas que atendo como médica em saúde mental.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
          <h1 className="mb-3 text-3xl font-bold md:text-4xl">Temas que atendo</h1>
          <p className="mb-10 text-muted-foreground">
            Sou Dra. Jéssica Carpaneda, médica em saúde mental (CRM GO 31189).
          </p>

          {TIER_ORDER.map((tier) => {
            const items = doctoraliaTopics
              .filter((t) => t.tier === tier)
              .sort((a, b) => a.rank - b.rank);
            if (!items.length) return null;
            return (
              <section key={tier} className="mb-10">
                <h2 className="mb-4 text-2xl font-semibold">{tierLabels[tier].label}</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {items.map((t) => (
                    <li key={t.id}>
                      <Link
                        to={`/tema/${t.id}`}
                        className="block rounded-lg border p-4 hover:bg-accent"
                      >
                        <div className="font-medium">{t.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground line-clamp-2">
                          {t.description}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}
