import Link from "next/link";
import { E_CATEGORIES } from "@/types/e-additive";

const ALPHABET_SV = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ".split("");

const footerLinks = {
  produkt: [
    { href: "/inkopslistor", label: "Inköpslista" },
    { href: "/e-amnen", label: "E-ämnen Scanner" },
    { href: "/livsmedel", label: "Livsmedelsguide" },
    { href: "/handla", label: "Handla Mat" },
  ],
  foretag: [
    { href: "/om", label: "Om ViHandlar" },
    { href: "mailto:hej@vihandlar.se", label: "Kontakt" },
  ],
  juridiskt: [
    { href: "/integritetspolicy", label: "Integritetspolicy" },
    { href: "/sitemap.xml", label: "Sajtkarta" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <span className="text-xl font-bold">
                <span className="text-primary">vi</span>handlar
                <span className="text-muted-foreground text-sm">.se</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Smart inköpslista online med röstinmatning och realtidsdelning.
              Komplett guide till E-nummer och svenska livsmedel.
            </p>
          </div>

          {/* Produkt */}
          <div>
            <h3 className="font-medium mb-3">Produkt</h3>
            <ul className="space-y-2">
              {footerLinks.produkt.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Företag */}
          <div>
            <h3 className="font-medium mb-3">Företag</h3>
            <ul className="space-y-2">
              {footerLinks.foretag.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Juridiskt */}
          <div>
            <h3 className="font-medium mb-3">Juridiskt</h3>
            <ul className="space-y-2">
              {footerLinks.juridiskt.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* SEO sections */}
        <div className="space-y-6 border-t border-border/40 pt-8 mb-8">
          {/* Livsmedel A-Ö */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              Livsmedel A-Ö
            </h4>
            <div className="flex flex-wrap gap-1">
              {ALPHABET_SV.map((letter) => (
                <Link
                  key={`food-${letter}`}
                  href={`/livsmedel?bokstav=${letter.toLowerCase()}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline px-1"
                >
                  {letter}
                </Link>
              ))}
            </div>
          </div>

          {/* E-ämnen by category */}
          <div>
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              E-ämnen per kategori
            </h4>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {E_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/e-amnen/kategori/${cat.slug}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  {cat.name} ({cat.range})
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {year} ViHandlar. Smart inköpslista online med röstinmatning
            och realtidsdelning.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            En del av Value Unlimited
          </p>
        </div>
      </div>
    </footer>
  );
}
