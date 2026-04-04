import Link from "next/link";
import Image from "next/image";
import { E_CATEGORIES } from "@/types/e-additive";

const ALPHABET_SV = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-b from-muted/30 to-muted/60">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/vihandlar-logo.png"
                alt="ViHandlar - Delad inköpslista online"
                width={160}
                height={40}
                className="h-[32px] w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Din smarta matassistent — inköpslistor, E-ämnen och produkter.
            </p>
          </div>

          {/* Produkt */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground/80">
              Produkt
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/inkopslista" className="text-muted-foreground hover:text-primary transition-colors">
                  Inköpslista
                </Link>
              </li>
              <li>
                <Link href="/skanner" className="text-muted-foreground hover:text-primary transition-colors">
                  E-nummerskanner
                </Link>
              </li>
              <li>
                <Link href="/livsmedel" className="text-muted-foreground hover:text-primary transition-colors">
                  Livsmedelsguide
                </Link>
              </li>
              <li>
                <Link href="/handla" className="text-muted-foreground hover:text-primary transition-colors">
                  Handla Mat
                </Link>
              </li>
            </ul>
          </div>

          {/* Företag */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground/80">
              Företag
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/om" className="text-muted-foreground hover:text-primary transition-colors">
                  Om ViHandlar
                </Link>
              </li>
              <li>
                <Link href="/funktioner" className="text-muted-foreground hover:text-primary transition-colors">
                  Funktioner
                </Link>
              </li>
              <li>
                <Link href="/kallor" className="text-muted-foreground hover:text-primary transition-colors">
                  Källor
                </Link>
              </li>
              <li>
                <Link href="/partnerskap" className="text-muted-foreground hover:text-primary transition-colors">
                  Partnerskap
                </Link>
              </li>
              <li>
                <a href="mailto:hej@vihandlar.se" className="text-muted-foreground hover:text-primary transition-colors">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          {/* Juridiskt */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground/80">
              Juridiskt
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/integritet" className="text-muted-foreground hover:text-primary transition-colors">
                  Integritetspolicy
                </Link>
              </li>
              <li>
                <Link href="/villkor" className="text-muted-foreground hover:text-primary transition-colors">
                  Allmänna villkor
                </Link>
              </li>
              <li>
                <Link href="/sajtkarta" className="text-muted-foreground hover:text-primary transition-colors">
                  Sajtkarta
                </Link>
              </li>
            </ul>
          </div>

          {/* Internationellt */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground/80">
              Internationellt
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://listacumparaturi.ro"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  hrefLang="ro"
                  title="Lista de Cumpărături online"
                >
                  Rumänien
                </a>
              </li>
              <li>
                <span className="text-muted-foreground">Sverige (Live)</span>
              </li>
              <li>
                <span className="text-muted-foreground/60">Spanien – 2026</span>
              </li>
              <li>
                <span className="text-muted-foreground/60">Globalt (.com) – 2026</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SEO Link Sections — compact grid */}
        <div className="border-t mt-10 pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Livsmedel A-Ö */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-3">
              Livsmedel A-Ö
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {ALPHABET_SV.map((letter) => (
                <Link
                  key={`food-${letter}`}
                  href={`/livsmedel/${letter.toLowerCase()}`}
                  className="text-xs text-muted-foreground/70 hover:text-primary transition-colors w-5 text-center"
                >
                  {letter}
                </Link>
              ))}
            </div>
            <div className="flex gap-x-3 mt-2">
              <Link href="/livsmedel" className="text-xs text-primary/70 hover:text-primary transition-colors inline-block">
                Alla livsmedel →
              </Link>
              <Link href="/livsmedel/naringsamne" className="text-xs text-primary/70 hover:text-primary transition-colors inline-block">
                Näringsämnen →
              </Link>
            </div>
          </div>

          {/* Produkter A-Ö */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-3">
              Produkter A-Ö
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {ALPHABET_SV.map((letter) => (
                <Link
                  key={`prod-${letter}`}
                  href={`/handla/produkter/${letter.toLowerCase()}`}
                  className="text-xs text-muted-foreground/70 hover:text-primary transition-colors w-5 text-center"
                >
                  {letter}
                </Link>
              ))}
            </div>
            <Link href="/handla" className="text-xs text-primary/70 hover:text-primary transition-colors mt-2 inline-block">
              Alla produkter →
            </Link>
          </div>

          {/* Produktkategorier */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-3">
              Kategorier
            </h4>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {["Dryck", "Pasta", "Godis", "Choklad", "Bakning", "Fika"].map((cat) => (
                <Link
                  key={cat}
                  href={`/handla/kategori/${cat.toLowerCase()}`}
                  className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                >
                  {cat}
                </Link>
              ))}
            </div>
            <Link href="/handla" className="text-xs text-primary/70 hover:text-primary transition-colors mt-2 inline-block">
              Alla kategorier →
            </Link>
          </div>

          {/* E-ämnen */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60 mb-3">
              E-ämnen
            </h4>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {[1, 2, 3, 4, 5, 6, 9].map((n) => (
                <Link
                  key={n}
                  href={`/e-amnen/nummer/${n}`}
                  className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                >
                  E{n}XX
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1.5">
              {E_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/e-amnen/kategori/${cat.slug}`}
                  className="text-xs text-muted-foreground/70 hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <Link href="/e-amnen" className="text-xs text-primary/70 hover:text-primary transition-colors mt-2 inline-block">
              Alla E-ämnen →
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/60 flex items-center gap-2 flex-wrap">
            <span>&copy; {year} ViHandlar &middot; En del av{" "}
            <a href="https://valueunlimited.io" target="_blank" rel="noopener" className="hover:text-muted-foreground/80 transition-colors" title="Value Unlimited - Digital Innovation">
              Value Unlimited
            </a></span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-medium">
              Säkerhet A+ · GDPR
            </span>
          </p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground/40">
            <a href="/llms-full.txt" className="hover:text-muted-foreground/60 transition-colors" title="AI-information för språkmodeller">
              AI-info
            </a>
            <span>&middot;</span>
            <a href="https://savri.io" target="_blank" rel="noopener" className="hover:text-muted-foreground/60 transition-colors" title="Savri - Privacy-friendly web analytics">
              Analytics av Savri
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
