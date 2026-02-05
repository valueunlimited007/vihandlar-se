import { useEffect, useState } from "react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PublicList {
  slug: string;
  title: string;
  description?: string | null;
  lang: string;
  updated_at: string;
  items_count: number;
}

const PROJECT_REF = "giznqbjxcxllmgamxgaa";

const PublicLists = () => {
  const [lists, setLists] = useState<PublicList[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`https://${PROJECT_REF}.supabase.co/functions/v1/lists`, {
          headers: { accept: "application/json" },
        });
        const data = await res.json();
        setLists(data);
      } catch (_) {
        setLists([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const title = "Offentliga inköpslistor";
  const description = "Utforska våra öppna inköpslistor. Snabb start – använd som mall och anpassa.";
  const url = typeof window !== "undefined" ? window.location.href : "https://vihandlar.se/listor";

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        canonical={url}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url,
          hasPart: (lists || []).map((l, i) => ({
            "@type": "ItemList",
            name: l.title,
            url: `https://vihandlar.se/listor/${l.slug}`,
            position: i + 1,
          })),
        }}
      />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <p className="text-muted-foreground mb-8">{description}</p>

        {loading ? (
          <p>Laddar...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(lists || []).map((l) => (
              <a key={l.slug} href={`/listor/${l.slug}`} className="block">
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{l.title}</span>
                      <Badge variant="secondary">{l.items_count} st</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">{l.description}</p>
                    <p className="text-xs text-muted-foreground">Uppdaterad: {new Date(l.updated_at).toLocaleDateString("sv-SE")}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        )}
      </main>
    </Layout>
  );
};

export default PublicLists;
