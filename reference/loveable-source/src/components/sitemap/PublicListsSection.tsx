import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShoppingCart, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

interface PublicList {
  slug: string;
  title: string;
  description?: string;
  updated_at: string;
}

interface FetchState {
  loading: boolean;
  error: string | null;
  data: PublicList[];
}

interface PublicListsSectionProps {
  fetchState: FetchState;
  onRetry: () => void;
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const PublicListsSection = memo(({ fetchState, onRetry }: PublicListsSectionProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Populära Inköpslistor
          {fetchState.loading && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          De senaste och mest populära offentliga inköpslistorna
        </p>
      </CardHeader>
      <CardContent>
        {fetchState.loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Laddar listor från API...
          </div>
        ) : fetchState.error ? (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Fel vid laddning av listor: {fetchState.error}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={onRetry}
                className="ml-2"
              >
                Försök igen
              </Button>
            </AlertDescription>
          </Alert>
        ) : fetchState.data.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fetchState.data.map((list) => (
              <div key={list.slug} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                <Link
                  to={`/listor/${list.slug}`}
                  className="font-medium text-primary hover:underline block mb-2"
                  onClick={scrollToTop}
                >
                  {list.title}
                </Link>
                {list.description && (
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{list.description}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Uppdaterad: {new Date(list.updated_at).toLocaleDateString('sv-SE')}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground p-4 text-center bg-muted/30 rounded-lg">
            Inga offentliga listor är tillgängliga för tillfället.
          </div>
        )}
        <div className="mt-4">
          <Link
            to="/listor"
            className="text-primary hover:underline text-sm font-medium inline-flex items-center gap-1"
            onClick={scrollToTop}
          >
            Se alla offentliga listor <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
});

PublicListsSection.displayName = 'PublicListsSection';

export default PublicListsSection;