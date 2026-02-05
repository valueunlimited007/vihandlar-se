import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database, Loader2 } from 'lucide-react';
import { useFoodCountsByLetter } from '@/hooks/useFoodCountsByLetter';

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const AlphabetGrid = memo(() => {
  const { data: foodCounts = [], isLoading, error } = useFoodCountsByLetter();

  // Separate regular letters from Swedish letters
  const regularLetters = foodCounts.filter(item => 
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].includes(item.letter)
  );
  const swedishLetters = foodCounts.filter(item => 
    ['Å', 'Ä', 'Ö'].includes(item.letter)
  );

  return (
    <Card className="border-2 hover:border-primary/30 transition-all">
      <CardHeader className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          Livsmedel A-Ö
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Upptäck näringsinnehåll och hälsoeffekter för 2500+ livsmedel
        </p>
      </CardHeader>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="ml-2 text-sm text-muted-foreground">Laddar livsmedel...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Kunde inte ladda livsmedelsdata</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4">
              {regularLetters.map((item) => (
                <Link
                  key={item.letter}
                  to={`/livsmedel/${item.letter.toLowerCase()}`}
                  className="group relative flex flex-col items-center p-3 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 hover:shadow-md"
                  onClick={scrollToTop}
                >
                  <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.letter}
                  </span>
                  <Badge variant="secondary" className="text-xs mt-1 group-hover:bg-primary/10">
                    {item.count}
                  </Badge>
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3 pt-2 border-t">
              {swedishLetters.map((item) => (
                <Link
                  key={item.letter}
                  to={`/livsmedel/${item.letter.toLowerCase()}`}
                  className="group flex flex-col items-center p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all hover:scale-105 hover:shadow-md"
                  onClick={scrollToTop}
                >
                  <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.letter}
                  </span>
                  <Badge variant="secondary" className="text-xs mt-1 group-hover:bg-primary/10">
                    {item.count}
                  </Badge>
                </Link>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
});

AlphabetGrid.displayName = 'AlphabetGrid';

export default AlphabetGrid;