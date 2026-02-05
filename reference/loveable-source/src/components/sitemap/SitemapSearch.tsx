import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Command } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SitemapLink {
  name: string;
  url: string;
  description?: string;
  category: string;
}

interface SitemapSearchProps {
  allLinks: SitemapLink[];
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export const SitemapSearch: React.FC<SitemapSearchProps> = ({ allLinks }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Keyboard shortcut: Cmd/Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('sitemap-search')?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return allLinks.filter(link =>
      link.name.toLowerCase().includes(query) ||
      link.description?.toLowerCase().includes(query) ||
      link.category.toLowerCase().includes(query)
    );
  }, [searchQuery, allLinks]);

  return (
    <div className="mb-8">
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            id="sitemap-search"
            type="text"
            placeholder="Sök i sajtkarta... (Ctrl+K)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="pl-10 pr-20 h-12 text-base"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </div>

        {/* Search Results Dropdown */}
        {(isFocused || searchQuery) && searchQuery.trim() && (
          <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50 shadow-lg">
            <CardContent className="p-0">
              {filteredLinks.length > 0 ? (
                <div className="py-2">
                  <div className="px-4 py-2 text-sm text-muted-foreground border-b">
                    {filteredLinks.length} {filteredLinks.length === 1 ? 'resultat' : 'resultat'}
                  </div>
                  {filteredLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.url}
                      onClick={() => {
                        setSearchQuery('');
                        scrollToTop();
                      }}
                      className="block px-4 py-3 hover:bg-accent transition-colors border-b last:border-0"
                    >
                      <div className="font-medium text-primary mb-1">{link.name}</div>
                      {link.description && (
                        <div className="text-sm text-muted-foreground mb-1">{link.description}</div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {link.category}
                      </Badge>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-muted-foreground">
                  Inga resultat för "{searchQuery}"
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
