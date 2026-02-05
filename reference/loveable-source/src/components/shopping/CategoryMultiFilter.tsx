import { useEffect, useState } from 'react';
import { useTopCategories } from '@/hooks/useProductCategories';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { X, Filter } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface CategoryMultiFilterProps {
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  limit?: number;
}

export const CategoryMultiFilter = ({
  selectedCategories,
  onCategoriesChange,
  limit = 20,
}: CategoryMultiFilterProps) => {
  const { data: categories, isLoading } = useTopCategories(limit);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleCategory = (categoryPath: string) => {
    if (selectedCategories.includes(categoryPath)) {
      onCategoriesChange(selectedCategories.filter(c => c !== categoryPath));
    } else {
      onCategoriesChange([...selectedCategories, categoryPath]);
    }
  };

  const handleClearAll = () => {
    onCategoriesChange([]);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtrera efter kategori
              {selectedCategories.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedCategories.length}
                </Badge>
              )}
            </div>
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="mt-4">
        <div className="rounded-lg border border-border bg-background p-4 space-y-4">
          {selectedCategories.length > 0 && (
            <div className="flex items-center justify-between pb-3 border-b">
              <span className="text-sm font-medium">
                {selectedCategories.length} valda
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="h-8 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Rensa alla
              </Button>
            </div>
          )}

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.category_path || '');
                
                return (
                  <div
                    key={category.id}
                    className="flex items-start space-x-3 hover:bg-muted/50 p-2 rounded-md transition-colors"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={isSelected}
                      onCheckedChange={() => handleToggleCategory(category.category_path || '')}
                      className="mt-1"
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {category.product_count?.toLocaleString('sv-SE') || 0} produkter
                      </div>
                    </Label>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {selectedCategories.length > 0 && (
            <div className="pt-3 border-t">
              <div className="text-xs text-muted-foreground mb-2">Valda kategorier:</div>
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((catPath) => {
                  const category = categories.find(c => c.category_path === catPath);
                  if (!category) return null;
                  
                  return (
                    <Badge
                      key={catPath}
                      variant="secondary"
                      className="cursor-pointer hover:bg-secondary/80"
                      onClick={() => handleToggleCategory(catPath)}
                    >
                      {category.name}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
