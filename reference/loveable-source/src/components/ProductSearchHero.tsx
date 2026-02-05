import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useStores } from "@/hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const ProductSearchHero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { data: stores } = useStores();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shopping?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/shopping');
    }
  };

  const activeStores = stores?.filter(s => s.is_active) || [];

  // Fetch dynamic product count
  const { data: productCount } = useQuery({
    queryKey: ['total-product-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('in_stock', true);
      return count || 0;
    },
    staleTime: 1000 * 60 * 60, // 1 hour cache
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Handla Mat Online</h2>
        <p className="text-lg text-muted-foreground">
          Sök bland{" "}
          <span className="font-semibold text-primary">
            {productCount ? `${productCount.toLocaleString('sv-SE')}+` : '10,000+'} produkter
          </span>{" "}
          från{" "}
          <span className="font-semibold text-accent">
            {activeStores.length} svenska matbutiker
          </span>
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Sök efter produkter... (t.ex. mjölk, bröd, kaffe)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoComplete="off"
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="px-8">
              Sök
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/shopping/browse')}
              className="gap-2"
            >
              <Store className="w-4 h-4" />
              Bläddra A-Ö
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/shopping')}
            >
              Se alla produkter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Store Logos */}
      {activeStores.length > 0 && (
        <div className="mt-8">
          <p className="text-sm text-muted-foreground text-center mb-4">
            Handla från dessa butiker:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {activeStores.map((store) => (
              <div
                key={store.id}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={() => navigate(`/shopping?store=${store.slug}`)}
              >
                {store.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
