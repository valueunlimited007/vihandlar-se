import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/Layout';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProductCard } from '@/components/shopping/ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { createBreadcrumbSchema } from '@/utils/schemaMarkup';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const SWEDISH_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ'.split('');

export const ProductBrowseByLetter = () => {
  const { letter } = useParams<{ letter: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  const upperLetter = letter?.toUpperCase() || '';

  const { data, isLoading } = useQuery({
    queryKey: ['products-by-letter', upperLetter, currentPage],
    queryFn: async () => {
      const offset = (currentPage - 1) * itemsPerPage;

      const { data, error, count } = await supabase
        .from('products')
        .select('*, stores!inner(*)', { count: 'exact' })
        .eq('in_stock', true)
        .ilike('name', `${upperLetter}%`)
        .order('name')
        .range(offset, offset + itemsPerPage - 1);

      if (error) throw error;

      return {
        products: data,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / itemsPerPage),
      };
    },
    enabled: !!upperLetter,
  });

  const products = data?.products || [];
  const totalPages = data?.totalPages || 1;

  const breadcrumbItems = [
    { name: 'Hem', url: '/' },
    { name: 'Shopping', url: '/shopping' },
    { name: 'Produkter A-Ö', url: '/shopping/produkter' },
    { name: upperLetter, url: `/shopping/produkter/${letter}` },
  ];

  const breadcrumbSchema = createBreadcrumbSchema(breadcrumbItems);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded w-2/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Produkter på {upperLetter} - Handla Online | Vihandlar.se</title>
        <meta
          name="description"
          content={`Bläddra bland produkter som börjar på ${upperLetter}. Jämför priser från flera butiker och handla smart online.`}
        />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero */}
        <div className="mb-8 mt-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Produkter på {upperLetter}
          </h1>
          <p className="text-lg text-muted-foreground">
            {data?.total || 0} produkter hittade
          </p>
        </div>

        {/* Alfabetisk navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SWEDISH_ALPHABET.map((l) => (
            <Link
              key={l}
              to={`/shopping/produkter/${l.toLowerCase()}`}
              className={`px-3 py-2 rounded-lg transition-all ${
                l === upperLetter
                  ? 'bg-primary text-primary-foreground font-bold'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {l}
            </Link>
          ))}
        </div>

        {/* Produkter */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Inga produkter hittades som börjar på {upperLetter}.
            </p>
            <Button asChild>
              <Link to="/shopping/produkter">Tillbaka till A-Ö</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Föregående
                </Button>
                <span className="text-sm text-muted-foreground px-4">
                  Sida {currentPage} av {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Nästa
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};
