import Link from "next/link";
import type { Metadata } from "next";
import { Home, Search, ShoppingCart, Scan } from "lucide-react";

export const metadata: Metadata = {
  title: "Sidan hittades inte (404)",
  description: "Sidan du letar efter finns inte. Gå tillbaka till startsidan.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
      <h1 className="text-3xl font-bold mb-4">Sidan hittades inte</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Sidan du letar efter kan ha flyttats, tagits bort eller så blev det fel
        i adressen.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8">
        <Link
          href="/"
          className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all"
        >
          <Home className="w-5 h-5 text-primary" />
          <div className="text-left">
            <div className="font-medium text-sm">Startsidan</div>
            <div className="text-xs text-muted-foreground">Gå till start</div>
          </div>
        </Link>

        <Link
          href="/inkopslista"
          className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all"
        >
          <ShoppingCart className="w-5 h-5 text-primary" />
          <div className="text-left">
            <div className="font-medium text-sm">Inköpslista</div>
            <div className="text-xs text-muted-foreground">Skapa lista</div>
          </div>
        </Link>

        <Link
          href="/e-amnen"
          className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all"
        >
          <Search className="w-5 h-5 text-primary" />
          <div className="text-left">
            <div className="font-medium text-sm">E-ämnen</div>
            <div className="text-xs text-muted-foreground">Sök E-nummer</div>
          </div>
        </Link>

        <Link
          href="/skanner"
          className="flex items-center gap-3 p-4 rounded-xl border bg-card hover:shadow-md hover:border-primary/50 transition-all"
        >
          <Scan className="w-5 h-5 text-primary" />
          <div className="text-left">
            <div className="font-medium text-sm">Skanner</div>
            <div className="text-xs text-muted-foreground">Scanna ingredienser</div>
          </div>
        </Link>
      </div>

      <p className="text-sm text-muted-foreground">
        Om du tror att detta är ett fel, kontakta oss på{" "}
        <a href="mailto:hej@vihandlar.se" className="text-primary hover:underline">
          hej@vihandlar.se
        </a>
      </p>
    </div>
  );
}
