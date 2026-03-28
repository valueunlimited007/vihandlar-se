import Link from "next/link";
import Image from "next/image";
import { E_CATEGORIES } from "@/types/e-additive";

const ALPHABET_SV = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center bg-transparent">
              <Image
                src="/vihandlar-logo.png"
                alt="ViHandlar - Delad inköpslista online"
                width={160}
                height={40}
                className="h-[30px] md:h-[40px] w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Delad inköpslista online för familjen
            </p>
          </div>

          {/* Produkt */}
          <div className="space-y-3">
            <h4 className="font-medium">Produkt</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/inkopslista"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Inköpslista
                </Link>
              </li>
              <li>
                <Link
                  href="/e-amnen"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="E-ämnen Scanner - Skanna ingredienslistor för E-ämnen analys"
                >
                  E-ämnen Scanner
                </Link>
              </li>
              <li>
                <Link
                  href="/livsmedel"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Livsmedelsguide
                </Link>
              </li>
              <li>
                <Link
                  href="/handla"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Handla Mat
                </Link>
              </li>
            </ul>
          </div>

          {/* Företag */}
          <div className="space-y-3">
            <h4 className="font-medium">Företag</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/om"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Om ViHandlar
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hej@vihandlar.se"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Juridiskt */}
          <div className="space-y-3">
            <h4 className="font-medium">Juridiskt</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/integritet"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Integritetspolicy
                </Link>
              </li>
              <li>
                <Link
                  href="/sajtkarta"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sajtkarta
                </Link>
              </li>
            </ul>
          </div>

          {/* Internationellt */}
          <div className="space-y-3">
            <h4 className="font-medium">Internationellt</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://listacumparaturi.ro"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  hrefLang="ro"
                  title="Lista de Cumpărături online - Delad inköpslista i Rumänien"
                >
                  🇷🇴 Rumänien
                </a>
              </li>
              <li>
                <span className="text-muted-foreground">🇸🇪 Sverige (Live)</span>
              </li>
              <li>
                <span className="text-muted-foreground/70">
                  🇪🇸 Spanien – 2026
                </span>
              </li>
              <li>
                <span className="text-muted-foreground/70">
                  🌍 Globalt (.com) – 2026
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Sections */}
        <div className="border-t mt-8 pt-6 space-y-6">
          {/* Livsmedel A-Ö */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Livsmedel A-Ö
            </h4>
            <div className="flex flex-wrap gap-2">
              {ALPHABET_SV.map((letter) => (
                <Link
                  key={`food-${letter}`}
                  href={`/livsmedel/${letter.toLowerCase()}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  {letter}
                </Link>
              ))}
            </div>
            <Link
              href="/livsmedel"
              className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block mt-2"
            >
              Se alla livsmedel →
            </Link>
          </div>

          {/* Produkter A-Ö */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Produkter A-Ö
            </h4>
            <div className="flex flex-wrap gap-2">
              {ALPHABET_SV.map((letter) => (
                <Link
                  key={`prod-${letter}`}
                  href={`/handla/produkter/${letter.toLowerCase()}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  {letter}
                </Link>
              ))}
            </div>
            <Link
              href="/handla"
              className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block mt-2"
            >
              Bläddra alla produkter →
            </Link>
          </div>

          {/* Produktkategorier */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Produktkategorier
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <Link
                href="/handla/kategori/dryck"
                className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
              >
                Dryck
              </Link>
              <Link
                href="/handla/kategori/pasta"
                className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
              >
                Pasta
              </Link>
              <Link
                href="/handla/kategori/godis"
                className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
              >
                Godis
              </Link>
              <Link
                href="/handla/kategori/choklad"
                className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
              >
                Choklad
              </Link>
              <Link
                href="/handla/kategori/bakning"
                className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
              >
                Bakning
              </Link>
              <Link
                href="/handla/kategori/fika"
                className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
              >
                Fika
              </Link>
            </div>
            <Link
              href="/handla/kategorier"
              className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block mt-2"
            >
              Se alla kategorier →
            </Link>
          </div>

          {/* E-ämnen */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              E-ämnen A-Ö
            </h4>
            <div className="flex flex-wrap gap-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((number) => (
                <Link
                  key={`enum-${number}`}
                  href={`/e-amnen/nummer/${number}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  E{number}XX
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {E_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/e-amnen/kategori/${cat.slug}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <Link
              href="/e-amnen"
              className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block mt-2"
            >
              Se alla E-ämnen A-Ö →
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            &copy; {year} ViHandlar. Smart inköpslista online med röstinmatning
            och realtidsdelning.
          </p>
          <p className="text-xs text-muted-foreground/70">
            En del av Value Unlimited
          </p>
          <p className="text-xs text-muted-foreground/40 mt-2">
            <a href="/llms-full.txt" className="hover:text-muted-foreground/60 transition-colors">LLM</a>
            {" · "}
            <a href="https://besokskollen.se" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground/60 transition-colors">Analytics av Savri</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
