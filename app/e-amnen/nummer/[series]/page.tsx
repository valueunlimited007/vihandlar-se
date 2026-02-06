import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EAdditiveCard } from "@/components/EAdditiveCard";
import { getAllEAdditives } from "@/lib/data/e-additives";

interface Props {
  params: Promise<{ series: string }>;
}

const VALID_SERIES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const SERIES_NAMES: Record<string, string> = {
  "1": "Färgämnen (E100-E199)",
  "2": "Konserveringsmedel (E200-E299)",
  "3": "Antioxidationsmedel (E300-E399)",
  "4": "Förtjockningsmedel (E400-E499)",
  "5": "Surhetsreglerande medel (E500-E599)",
  "6": "Smakförstärkare (E600-E699)",
  "7": "Diverse (E700-E799)",
  "8": "Diverse (E800-E899)",
  "9": "Sötningsmedel (E900-E999)",
};

export function generateStaticParams() {
  return VALID_SERIES.map((series) => ({ series }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { series } = await params;
  const name = SERIES_NAMES[series] || `E${series}XX-serien`;
  return {
    title: `E${series}XX – ${name} | ViHandlar`,
    description: `Alla E-ämnen i ${series}00-serien (${name}). Detaljerad information om risker, ADI-värden och hälsoeffekter.`,
    alternates: {
      canonical: `https://vihandlar.se/e-amnen/nummer/${series}`,
    },
  };
}

export default async function EAmnenSeriesPage({ params }: Props) {
  const { series } = await params;

  if (!VALID_SERIES.includes(series)) {
    notFound();
  }

  const allAdditives = getAllEAdditives();
  const filtered = allAdditives.filter((a) =>
    a.e_number.replace("E", "").startsWith(series)
  );

  const name = SERIES_NAMES[series] || `E${series}XX`;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Hem</Link>
        <span className="mx-2">›</span>
        <Link href="/e-amnen" className="hover:text-foreground">E-ämnen</Link>
        <span className="mx-2">›</span>
        <span>E{series}XX</span>
      </nav>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          E{series}XX – {name}
        </h1>
        <p className="text-muted-foreground mb-8">
          {filtered.length} E-ämnen i denna serie
        </p>

        {/* Series navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {VALID_SERIES.map((s) => (
            <Link
              key={s}
              href={`/e-amnen/nummer/${s}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                s === series
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-primary/10"
              }`}
            >
              E{s}XX
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            Inga E-ämnen hittades i denna serie.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((additive) => (
              <EAdditiveCard key={additive.id} additive={additive} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
