import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import publicListsData from "@/data/public-lists.json";
import type { Metadata } from "next";

type PublicListData = {
  slug: string;
  title: string;
  description: string;
  items: Array<{ name: string }>;
};

const publicLists = publicListsData as PublicListData[];

export const metadata: Metadata = {
  title: "Inköpsmallar - Färdiga inköpslistor | vihandlar.se",
  description:
    "Välj bland färdiga inköpsmallar för vardag, högtider och speciella tillfällen. Kopiera till din egen lista och börja handla direkt.",
  alternates: {
    canonical: "https://vihandlar.se/inkopslista/mallar",
  },
  openGraph: {
    title: "Inköpsmallar - Färdiga inköpslistor | vihandlar.se",
    description:
      "Välj bland färdiga inköpsmallar för vardag, högtider och speciella tillfällen.",
    url: "https://vihandlar.se/inkopslista/mallar",
  },
};

export default function MallarPage() {
  return (
    <div className="min-h-[80vh]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <Link
              href="/inkopslista"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Tillbaka till inköpslistor
            </Link>
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              {publicLists.length} färdiga mallar
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Färdiga inköpsmallar
            </h1>
            <p className="text-muted-foreground">
              Välj en färdig mall och anpassa efter dina behov. Spara tid och
              handla smartare.
            </p>
          </div>
        </div>
      </section>

      {/* Templates grid */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          {publicLists.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-muted-foreground">
                Inga mallar tillgängliga just nu.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {publicLists.map((pl) => (
                <Link
                  key={pl.slug}
                  href={`/inkopslista/mallar/${pl.slug}`}
                  className="p-4 rounded-xl bg-card border hover:border-primary/30 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                        {pl.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {pl.description}
                      </p>
                      <Badge
                        variant="secondary"
                        className="mt-2 text-[10px]"
                      >
                        {pl.items.length} varor
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
