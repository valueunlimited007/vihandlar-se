import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const EAdditiveCardSkeleton = ({ variant = 'default' }: { variant?: 'default' | 'compact' | 'enhanced' }) => {
  return (
    <Card className="h-full animate-pulse">
      {/* Risk indicator stripe */}
      <div className="h-1 bg-muted rounded-t-lg" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            {/* E-number with emphasis */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-20" />
              {variant === 'enhanced' && <Skeleton className="h-5 w-16 rounded-full" />}
            </div>
            
            {/* Names */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-4 w-28" />
            </div>
            
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              {variant === 'enhanced' && <Skeleton className="h-6 w-28 rounded-full" />}
            </div>
          </div>
          
          {/* Risk gauge and favorite */}
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-14 w-14 rounded-full" />
            <Skeleton className="h-6 w-6 rounded" />
          </div>
        </div>
      </CardHeader>
      
      {variant !== 'compact' && (
        <CardContent className="pt-0">
          {/* Description */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          
          {/* Info cards */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <Skeleton className="h-5 w-5" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
            
            {variant === 'enhanced' && (
              <div className="flex items-center justify-between pt-2 border-t border-muted">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export const EAdditiveGridSkeleton = ({ 
  count = 9, 
  variant = 'default',
  columns = 'lg:grid-cols-3'
}: { 
  count?: number;
  variant?: 'default' | 'compact' | 'enhanced';
  columns?: string;
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${columns} gap-6 animate-pulse`}>
      {Array.from({ length: count }).map((_, i) => (
        <EAdditiveCardSkeleton 
          key={i} 
          variant={variant}
        />
      ))}
    </div>
  );
};

export const EAdditiveListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};