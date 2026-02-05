import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scan } from 'lucide-react';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

// Pre-defined E-additive categories to avoid recreation
const E_ADDITIVE_CATEGORIES = [
  {
    name: "E-ämnen E1XX (Färgämnen)",
    url: "/e-amnen/nummer/1",
    description: "Färgämnen - E100-E199"
  },
  {
    name: "E-ämnen E2XX (Konserveringsmedel)", 
    url: "/e-amnen/nummer/2",
    description: "Konserveringsmedel - E200-E299"
  },
  {
    name: "E-ämnen E3XX (Antioxidationsmedel)",
    url: "/e-amnen/nummer/3", 
    description: "Antioxidationsmedel - E300-E399"
  },
  {
    name: "E-ämnen E4XX (Förtjockningsmedel)",
    url: "/e-amnen/nummer/4",
    description: "Förtjockningsmedel - E400-E499"
  },
  {
    name: "E-ämnen E5XX (Surhetsreglerare)",
    url: "/e-amnen/nummer/5",
    description: "Surhetsreglerare - E500-E599"
  },
  {
    name: "E-ämnen E6XX (Smakförstärkare)",
    url: "/e-amnen/nummer/6", 
    description: "Smakförstärkare - E600-E699"
  },
  {
    name: "E-ämnen E9XX (Sötningsmedel)",
    url: "/e-amnen/nummer/9",
    description: "Sötningsmedel - E900-E999"
  }
];

const EAdditiveGrid = memo(() => {
  return (
    <Card className="border-2 hover:border-primary/30 transition-all">
      <CardHeader className="bg-gradient-to-br from-accent/5 to-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5 text-primary" />
          E-ämnen per Kategori
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Utforska 354 godkända livsmedelstillsatser organiserade efter funktion
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-2">
          {E_ADDITIVE_CATEGORIES.map((category, index) => (
            <Link
              key={index}
              to={category.url}
              className="group block p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all hover:scale-[1.02] hover:shadow-md"
              onClick={scrollToTop}
            >
              <div className="font-semibold text-primary group-hover:text-primary transition-colors">
                {category.name}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{category.description}</div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

EAdditiveGrid.displayName = 'EAdditiveGrid';

export default EAdditiveGrid;