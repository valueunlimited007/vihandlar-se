import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AIOptimizedListFactBox } from "@/components/AIOptimizedListFactBox";
import { useShoppingList } from "@/hooks/useShoppingList";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface PublicItem {
  name: string;
  quantity?: string | null;
  category?: string | null;
  checked: boolean;
  position: number;
}

interface PublicListDetail {
  slug: string;
  title: string;
  description?: string | null;
  lang: string;
  updated_at: string;
  items: PublicItem[];
}

const PROJECT_REF = "giznqbjxcxllmgamxgaa";

const PublicListDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<PublicListDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);
  const { createList, addItem } = useShoppingList();
  const { toast } = useToast();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`https://${PROJECT_REF}.supabase.co/functions/v1/lists/${slug}`, {
          headers: { accept: "application/json" },
        });
        if (res.status === 404) {
          setDetail(null);
        } else {
          const data = await res.json();
          setDetail(data);
        }
      } catch (_) {
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) load();
  }, [slug]);

  const handleCopyList = async () => {
    if (!detail) return;
    
    setCopying(true);
    try {
      // Create new list with the same title
      const newList = await createList(detail.title);
      
      if (!newList) {
        throw new Error("Kunde inte skapa listan");
      }

      // Add all items to the new list
      const itemsToInsert = detail.items.map(item => ({
        list_id: newList.id,
        name: item.name,
        quantity: item.quantity || "1",
        unit: "st",
        completed: false
      }));

      if (itemsToInsert.length > 0) {
        const { error: itemsError } = await supabase
          .from('items')
          .insert(itemsToInsert);
          
        if (itemsError) {
          console.error("Failed to add items:", itemsError);
          throw new Error("Kunde inte lägga till alla varor");
        }
      }

      toast({
        title: "Lista kopierad!",
        description: `${detail.items.length} varor har lagts till i din inköpslista.`,
      });

      // Navigate to the new list
      navigate(`/list/${newList.share_token}`);
    } catch (error) {
      console.error("Error copying list:", error);
      toast({
        title: "Något gick fel",
        description: "Kunde inte kopiera listan. Försök igen.",
        variant: "destructive",
      });
    } finally {
      setCopying(false);
    }
  };

  const title = detail ? `${detail.title} – inköpslista` : "Lista";
  const description = detail?.description || "Detaljerad inköpslista.";
  const url = typeof window !== "undefined" ? window.location.href : `https://vihandlar.se/listor/${slug}`;

  return (
    <Layout>
      <SEO
        title={title}
        description={description}
        canonical={url}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: title,
          description,
          itemListElement: (detail?.items || []).map((it, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: it.name,
          })),
        }}
      />
      <main className="container mx-auto px-4 py-8">
        {detail && (
          <AIOptimizedListFactBox
            title={detail.title}
            description={detail.description}
            items={detail.items}
            slug={detail.slug}
            lang={detail.lang}
            updatedAt={detail.updated_at}
          />
        )}
        {loading ? (
          <p>Laddar...</p>
        ) : !detail ? (
          <p>Listan hittades inte.</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-2">{detail.title}</h1>
            <p className="text-muted-foreground mb-6">{detail.description}</p>

            <Button 
              onClick={handleCopyList} 
              disabled={copying || detail.items.length === 0}
              size="lg"
              className="mb-6 w-full sm:w-auto"
            >
              {copying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Kopierar...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Använd denna lista
                </>
              )}
            </Button>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Artiklar</span>
                  <Badge variant="secondary">{detail.items.length} st</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {detail.items.map((it) => (
                    <li key={it.position} className="flex items-center justify-between">
                      <span>
                        {it.name}
                        {it.quantity ? <span className="text-muted-foreground"> — {it.quantity}</span> : null}
                      </span>
                      {it.category ? <span className="text-xs text-muted-foreground">{it.category}</span> : null}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </Layout>
  );
};

export default PublicListDetail;
