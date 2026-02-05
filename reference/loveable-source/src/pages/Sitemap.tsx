import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Home, ShoppingCart, Beaker, Apple, List, Settings } from 'lucide-react';
import { Layout } from '@/components/Layout';
import SitemapSection from '@/components/sitemap/SitemapSection';

const Sitemap = () => {
  // Fetch E-additive categories
  const { data: eAdditives } = useQuery({
    queryKey: ['e-additives-sitemap'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('e_additives')
        .select('category, e_number')
        .order('e_number');
      if (error) throw error;
      return data;
    },
  });

  // Fetch food letters
  const { data: foods } = useQuery({
    queryKey: ['foods-sitemap'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('foods')
        .select('letter')
        .order('letter');
      if (error) throw error;
      return data;
    },
  });

  // Fetch product categories
  const { data: productCategories } = useQuery({
    queryKey: ['product-categories-sitemap'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_categories')
        .select('name, slug, product_count')
        .order('product_count', { ascending: false })
        .limit(20);
      if (error) throw error;
      return data;
    },
  });

  // Fetch stores
  const { data: stores } = useQuery({
    queryKey: ['stores-sitemap'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stores')
        .select('name, slug, description')
        .eq('is_active', true);
      if (error) throw error;
      return data;
    },
  });

  // Fetch top public lists
  const { data: publicLists } = useQuery({
    queryKey: ['public-lists-sitemap'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('public_lists')
        .select('title, slug, description')
        .eq('is_public', true)
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

  const isLoading = !eAdditives || !foods || !productCategories || !stores || !publicLists;

  // Get unique E-additive categories
  const eAdditiveCategories = eAdditives 
    ? [...new Set(eAdditives.map(e => e.category))].sort()
    : [];

  // Get unique food letters
  const foodLetters = foods
    ? [...new Set(foods.map(f => f.letter))].sort()
    : [];

  // Swedish alphabet for products
  const productLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'];

  const mainPages = [
    { name: 'Startsida', url: '/', description: 'Skapa och dela inköpslistor', priority: 'high' as const },
    { name: 'Shopping Hub', url: '/shopping', description: '7000+ produkter från Delitea', priority: 'high' as const },
    { name: 'Funktioner', url: '/funktioner', description: 'Alla features och möjligheter', priority: 'medium' as const },
    { name: 'Inköpslista Online', url: '/inkopslista', description: 'SEO-sida om inköpslistor', priority: 'high' as const },
    { name: 'Om ViHandlar', url: '/om', description: 'Om tjänsten och teamet', priority: 'medium' as const },
    { name: 'Integritetspolicy', url: '/integritet', description: 'Hur vi hanterar dina data', priority: 'low' as const },
    { name: 'Källor', url: '/kallor', description: 'Referenser och datakällor', priority: 'low' as const },
  ];

  const shoppingPages = [
    { name: 'Shopping Hub', url: '/shopping', description: 'Jämför priser och handla smart', priority: 'high' as const },
    { name: 'Bläddra produkter A-Ö', url: '/shopping/bokstav', description: 'Alla produkter alfabetiskt', priority: 'medium' as const },
    { name: 'Produktkategorier', url: '/shopping/kategorier', description: 'Shoppa efter kategori', priority: 'medium' as const },
    ...(stores?.slice(0, 3).map(store => ({
      name: store.name,
      url: `/shopping/butik/${store.slug}`,
      description: store.description || 'Matbutik online',
      priority: 'high' as const,
    })) || []),
    ...(productCategories?.slice(0, 6).map(cat => ({
      name: cat.name,
      url: `/shopping/kategori/${cat.slug}`,
      description: `${cat.product_count || 0} produkter`,
      priority: 'medium' as const,
    })) || []),
  ];

  const eAmnenPages = [
    { name: 'E-ämnen Hub', url: '/e-amnen', description: 'Översikt över alla E-ämnen', priority: 'high' as const },
    { name: 'E-ämnen Scanner', url: '/e-amnen/scanner', description: 'Skanna ingredienslistor med OCR', priority: 'high' as const },
    { name: 'E-ämnen Guide', url: '/e-amnen/guide', description: 'Allt om E-ämnen', priority: 'high' as const },
    { name: 'Alla E-ämnen A-Ö', url: '/e-amnen/a-o', description: '354 godkända E-ämnen', priority: 'high' as const },
    { name: 'E-ämnen Kategorier', url: '/e-amnen/kategorier', description: 'E-ämnen grupperade efter typ', priority: 'medium' as const },
    ...eAdditiveCategories.slice(0, 5).map(cat => ({
      name: cat,
      url: `/e-amnen/kategori/${cat.toLowerCase().replace(/\s+/g, '-')}`,
      description: `E-ämnen i kategorin ${cat}`,
      priority: 'medium' as const,
    })),
  ];

  const livsmeddelPages = [
    { name: 'Livsmedel Hub', url: '/livsmedel', description: '2500+ livsmedel med näringsdata', priority: 'high' as const },
    ...foodLetters.slice(0, 10).map(letter => ({
      name: `Livsmedel börjar på ${letter}`,
      url: `/livsmedel/${letter.toLowerCase()}`,
      description: `Alla livsmedel som börjar på ${letter}`,
      priority: 'medium' as const,
    })),
  ];

  const listPages = [
    { name: 'Publika Listor', url: '/listor', description: 'Mallar och förslag på inköpslistor', priority: 'high' as const },
    ...(publicLists?.map(list => ({
      name: list.title,
      url: `/listor/${list.slug}`,
      description: list.description || 'Inköpslista',
      priority: 'medium' as const,
    })) || []),
  ];

  const technicalPages = [
    { name: 'XML Sitemap', url: '/sitemap.xml', description: 'Maskinläsbar sitemap', priority: 'low' as const, external: true },
    { name: 'Robots.txt', url: '/robots.txt', description: 'Instruktioner för sökmotorer', priority: 'low' as const, external: true },
    { name: 'LLMs.txt', url: '/llms.txt', description: 'AI-vänlig information', priority: 'low' as const, external: true },
    { name: 'Humans.txt', url: '/humans.txt', description: 'Team och teknologi', priority: 'low' as const, external: true },
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>Sajtkarta - ViHandlar.se</title>
        <meta 
          name="description" 
          content="Komplett översikt över alla sidor på ViHandlar.se: Shopping med 7000+ produkter, E-ämnesguide för 354 tillsatser, Livsmedelsdata för 2500+ produkter, och delade inköpslistor." 
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://vihandlar.se/sajtkarta" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Sajtkarta</h1>
        <p className="text-muted-foreground mb-8">
          Komplett översikt över alla sidor och funktioner på ViHandlar.se
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <SitemapSection
            title="Huvudsidor"
            description="De viktigaste sidorna på ViHandlar"
            icon={<Home className="h-5 w-5" />}
            links={mainPages}
          />

          <SitemapSection
            title="Shopping & Produkter"
            description="Hitta bäst pris på 7000+ produkter från svenska butiker"
            icon={<ShoppingCart className="h-5 w-5" />}
            links={shoppingPages}
          />

          <SitemapSection
            title="E-ämnen & Säkerhet"
            description="Detaljerad information om 354 livsmedelstillsatser"
            icon={<Beaker className="h-5 w-5" />}
            links={eAmnenPages}
          />

          <SitemapSection
            title="Livsmedel & Näring"
            description="Näringsdata och hälsoeffekter för 2500+ livsmedel"
            icon={<Apple className="h-5 w-5" />}
            links={livsmeddelPages}
          />

          <SitemapSection
            title="Inköpslistor"
            description="Använd färdiga mallar för vanliga inköp"
            icon={<List className="h-5 w-5" />}
            links={listPages}
          />

          <SitemapSection
            title="Tekniska Sidor"
            description="Använd färdiga mallar för vanliga inköp"
            icon={<Settings className="h-5 w-5" />}
            links={technicalPages}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Sitemap;
