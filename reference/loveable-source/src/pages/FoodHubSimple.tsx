import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ShoppingCTA } from '@/components/ShoppingCTA';
import { AffiliateAdsSection } from '@/components/AffiliateAdsSection';

const ALPHABET_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'];

const FoodHubSimple = () => {
  // Fetch food counts per letter
  const { data: letterCounts } = useQuery({
    queryKey: ['food-letter-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('foods')
        .select('letter')
        .order('letter');
      
      if (error) throw error;
      
      const counts: Record<string, number> = {};
      data?.forEach(food => {
        counts[food.letter] = (counts[food.letter] || 0) + 1;
      });
      return counts;
    }
  });

  return (
    <Layout>
      <Helmet>
        <title>Livsmedel A-Ö - Komplett guide till näringsvärden | ViHandlar</title>
        <meta name="description" content="Upptäck allt om livsmedel från A till Ö. Näringsvärden, förvaring, användning och hållbarhet för över 500 livsmedel. Sök efter bokstav eller kategori." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Livsmedel A-Ö</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upptäck allt om dina favoritlivsmedel. Näringsvärden, förvaringstips, 
            hållbarhet och användning för hundratals livsmedel - sorterat från A till Ö.
          </p>
        </div>

        {/* Hero Ads: Matkomfort + Linas side by side */}
        <AffiliateAdsSection variant="hero" className="mb-10" />

        {/* Alphabet Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bläddra efter bokstav</CardTitle>
            <CardDescription>Välj en bokstav för att se alla livsmedel som börjar på den bokstaven</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-3">
              {ALPHABET_LETTERS.map((letter) => {
                const count = letterCounts?.[letter] || 0;
                return (
                  <Link
                    key={letter}
                    to={`/livsmedel/${letter.toLowerCase()}`}
                    className={`flex flex-col items-center justify-center h-16 w-16 border rounded-lg transition-colors font-semibold ${
                      count > 0 
                        ? 'hover:bg-muted text-foreground' 
                        : 'text-muted-foreground/50 cursor-not-allowed'
                    }`}
                    onClick={count === 0 ? (e) => e.preventDefault() : undefined}
                  >
                    <span className="text-lg">{letter}</span>
                    {count > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Inline Ad: Hemköp */}
        <AffiliateAdsSection variant="inline" className="mb-8" />

        {/* Shopping CTA */}
        <div className="mb-8">
          <ShoppingCTA 
            foodName="livsmedel"
            searchQuery="mat"
          />
        </div>

        {/* CTA Section */}
        <Card className="bg-primary/5 mb-10">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Planera dina inköp smartare</h2>
            <p className="text-muted-foreground mb-6">
              Skapa delade inköpslistor med familj och vänner. Lägg till livsmedel direkt från våra informationssidor.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Skapa inköpslista →
            </Link>
          </CardContent>
        </Card>

        {/* Footer Ad: Factor */}
        <AffiliateAdsSection variant="footer" />
      </div>
    </Layout>
  );
};

export default FoodHubSimple;
