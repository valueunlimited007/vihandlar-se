import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface PopularSearchesProps {
  onSearchClick: (query: string) => void;
}

const POPULAR_SEARCHES = [
  'Mjölk',
  'Bröd',
  'Kaffe',
  'Yoghurt',
  'Pasta',
  'Kyckling',
  'Ost',
  'Ägg',
  'Smör',
  'Juice',
];

export const PopularSearches = ({ onSearchClick }: PopularSearchesProps) => {
  return (
    <div className="flex flex-col gap-3 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <TrendingUp className="h-4 w-4" />
        <span>Populära sökningar</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {POPULAR_SEARCHES.map((query) => (
          <Badge
            key={query}
            variant="secondary"
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm"
            onClick={() => onSearchClick(query)}
          >
            {query}
          </Badge>
        ))}
      </div>
    </div>
  );
};
