import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  name: string;
  url?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: 'default' | 'minimal' | 'enhanced';
}

export const Breadcrumbs = ({ items, className, variant = 'default' }: BreadcrumbsProps) => {
  if (variant === 'minimal') {
    return (
      <nav className={cn("text-sm text-muted-foreground", className)} aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/60" />}
              {item.url && !item.current ? (
                <Link 
                  to={item.url} 
                  className="hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ) : (
                <span className={cn(
                  item.current && "text-foreground font-medium"
                )}>
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  if (variant === 'enhanced') {
    return (
      <nav className={cn("", className)} aria-label="Breadcrumb">
        <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg p-4 border border-border/50">
          <ol className="flex items-center space-x-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                {index === 0 && (
                  <Home className="w-4 h-4 mr-2 text-muted-foreground" />
                )}
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 mx-3 text-muted-foreground/60" />
                )}
                {item.url && !item.current ? (
                  <Link 
                    to={item.url} 
                    className="px-3 py-1 rounded-md text-sm hover:bg-primary/10 hover:text-primary transition-all duration-200 font-medium"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="px-3 py-1 rounded-md text-sm bg-primary/10 text-primary font-semibold">
                    {item.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    );
  }

  // Default variant
  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />
            )}
            {item.url && !item.current ? (
              <Link 
                to={item.url} 
                className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {index === 0 && <Home className="w-4 h-4 mr-2" />}
                {item.name}
              </Link>
            ) : (
              <span className="inline-flex items-center text-sm font-medium text-foreground">
                {index === 0 && <Home className="w-4 h-4 mr-2" />}
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};