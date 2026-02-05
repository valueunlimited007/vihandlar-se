import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SitemapLink {
  name: string;
  url: string;
  description?: string;
  lastModified?: string;
  priority?: 'high' | 'medium' | 'low';
  external?: boolean;
}

interface SitemapSectionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  links: SitemapLink[];
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const SitemapSection = memo(({ title, description, icon, links }: SitemapSectionProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          {links.map((link, linkIndex) => (
            <Link
              key={linkIndex}
              to={link.url}
              className="block p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
              onClick={scrollToTop}
            >
              <div className="font-medium text-primary group-hover:text-primary">
                {link.name}
              </div>
              {link.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {link.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

SitemapSection.displayName = 'SitemapSection';

export default SitemapSection;