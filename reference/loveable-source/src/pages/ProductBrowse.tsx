import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { createBreadcrumbSchema } from '@/utils/schemaMarkup';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const SWEDISH_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'.split('');

export default function ProductBrowse() {
  const { data: letterCounts } = useQuery({
    queryKey: ['product-letter-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('name')
        .eq('in_stock', true);

      if (error) throw error;

      const counts: Record<string, number> = {};
      
      data.forEach(product => {
        const firstLetter = product.name.charAt(0).toUpperCase();
        counts[firstLetter] = (counts[firstLetter] || 0) + 1;
      });

      return counts;
    },
  });

  const breadcrumbs = [
    { name: 'Hem', url: '/' },
    { name: 'Shopping', url: '/shopping' },
    { name: 'Produkter A-Ö', url: '/shopping/produkter' },
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbs);

  return (
    <Layout>
      <Helmet>
        <title>Produkter A-Ö - Bläddra Alfabetiskt | Vihandlar.se</title>
        <meta
          name="description"
          content="Bläddra genom tusentals produkter alfabetiskt. Hitta exakt vad du söker sorterat från A till Ö. Jämför priser från flera butiker."
        />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <div className="text-center mb-12 mt-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Bläddra Produkter A-Ö
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Välj en bokstav nedan för att se alla produkter som börjar på den bokstaven
          </p>
        </div>

        {/* Alfabetisk grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-13 gap-3 max-w-6xl mx-auto">
          {SWEDISH_ALPHABET.map((letter) => {
            const count = letterCounts?.[letter] || 0;
            const hasProducts = count > 0;

            if (!hasProducts) {
              return (
                <div
                  key={letter}
                  className="aspect-square flex flex-col items-center justify-center bg-muted/30 rounded-lg border border-border/50 opacity-50"
                >
                  <span className="text-2xl font-bold text-muted-foreground/50">
                    {letter}
                  </span>
                  <span className="text-xs text-muted-foreground/50 mt-1">0</span>
                </div>
              );
            }

            return (
              <Link
                key={letter}
                to={`/shopping/produkter/${letter.toLowerCase()}`}
                className="group"
              >
                <Card className="aspect-square hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/50">
                  <CardContent className="h-full flex flex-col items-center justify-center p-2">
                    <span className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {letter}
                    </span>
                    <span className="text-xs text-muted-foreground mt-1">
                      {count} st
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Info sektion */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Hitta produkter snabbt</h2>
          <p className="text-muted-foreground">
            Genom att bläddra alfabetiskt kan du enkelt hitta specifika produkter. 
            Varje bokstav visar antal tillgängliga produkter. Klicka på en bokstav 
            för att se alla produkter som börjar på den bokstaven.
          </p>
        </div>
      </div>
    </Layout>
  );
}
