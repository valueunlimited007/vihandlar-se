import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ShoppingCTAProps {
  foodName: string;
  searchQuery?: string;
}

export const ShoppingCTA = ({ foodName, searchQuery }: ShoppingCTAProps) => {
  const query = searchQuery || foodName;
  const searchUrl = `/shopping?q=${encodeURIComponent(query)}`;

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50"></div>
      
      <div className="relative p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex-1 space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Handla {foodName} Online
            </h3>
            <p className="text-muted-foreground">
              Jämför priser från flera butiker och hitta bästa erbjudandet på {foodName}. 
              Snabb leverans direkt hem till dörren.
            </p>
            
            <Button asChild size="lg" className="group">
              <Link to={searchUrl}>
                Se produkter
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
