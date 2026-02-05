import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RiskGauge } from '@/components/RiskGauge';
import { EAdditiveFavoriteButton } from '@/components/EAdditiveFavoriteButton';
import { Link } from 'react-router-dom';
import { AlertTriangle, Heart, Leaf, Shield } from 'lucide-react';
import { type EAdditive } from '@/hooks/useEAdditives';
import { cn } from '@/lib/utils';

interface EAdditiveCardProps {
  additive: EAdditive;
  variant?: 'default' | 'compact' | 'detailed';
  showFavorite?: boolean;
  className?: string;
}

export const EAdditiveCard = ({ 
  additive, 
  variant = 'default', 
  showFavorite = true,
  className 
}: EAdditiveCardProps) => {
  const isHighRisk = (additive.risk_score || 0) >= 7;
  const isMediumRisk = (additive.risk_score || 0) >= 4 && (additive.risk_score || 0) < 7;
  const isLowRisk = (additive.risk_score || 0) < 4;

  const cardContent = (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
      "hover:scale-[1.02] hover:border-primary/40",
      isHighRisk && "border-destructive/20 hover:border-destructive/40",
      isMediumRisk && "border-warning/20 hover:border-warning/40",
      isLowRisk && "border-success/20 hover:border-success/40",
      className
    )}>
      {/* Risk indicator stripe */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1 transition-opacity duration-300",
        isHighRisk && "bg-destructive",
        isMediumRisk && "bg-warning",
        isLowRisk && "bg-success",
        "opacity-60 group-hover:opacity-100"
      )} />

      <CardHeader className="relative pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle className={cn(
                "text-lg font-bold",
                isHighRisk && "text-destructive",
                isMediumRisk && "text-warning",
                isLowRisk && "text-success"
              )}>
                {additive.e_number}
              </CardTitle>
              {isHighRisk && (
                <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />
              )}
            </div>
            
            <div className="space-y-1">
              <h3 className="font-semibold text-foreground line-clamp-1">
                {additive.name}
              </h3>
              {additive.common_name && (
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {additive.common_name}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Badge 
                variant="secondary" 
                className="text-xs bg-muted/50 hover:bg-muted"
              >
                {additive.category}
              </Badge>
              
              {additive.origin && (
                <Badge variant="outline" className="text-xs">
                  <Leaf className="w-3 h-3 mr-1" />
                  {additive.origin}
                </Badge>
              )}
              
              {additive.longevity_impact && (
                <Badge 
                  variant={
                    additive.longevity_impact === 'Positiv' ? 'default' :
                    additive.longevity_impact === 'Negativ' ? 'destructive' : 'secondary'
                  }
                  className="text-xs"
                >
                  <Heart className="w-3 h-3 mr-1" />
                  {additive.longevity_impact}
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <RiskGauge score={additive.risk_score || 0} size="sm" showLabel={false} />
            {showFavorite && (
              <EAdditiveFavoriteButton additive={additive} />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {variant !== 'compact' && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {additive.short_description}
            </p>
            
            {additive.adi_value && (
              <div className="flex items-center gap-2 p-2 bg-muted/30 rounded-md">
                <Shield className="w-4 h-4 text-primary" />
                <div className="flex-1">
                  <p className="text-xs font-medium">ADI: {additive.adi_value} mg/kg</p>
                  <p className="text-xs text-muted-foreground">Säkert dagligt intag</p>
                </div>
              </div>
            )}

            {isHighRisk && additive.children_note && (
              <div className="flex items-start gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded-md">
                <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-destructive">Varning</p>
                  <p className="text-xs text-destructive/80 line-clamp-2">
                    {additive.children_note}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {variant === 'detailed' && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Läs mer →</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                Detaljerad info
              </span>
            </div>
          </div>
        )}
      </CardContent>

      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );

  return (
    <Link 
      to={`/e-amnen/${additive.slug}`}
      className="block animate-fade-in"
    >
      {cardContent}
    </Link>
  );
};

export const EAdditiveCardGrid = ({ 
  additives, 
  variant = 'default',
  showFavorite = true 
}: { 
  additives: EAdditive[];
  variant?: 'default' | 'compact' | 'detailed';
  showFavorite?: boolean;
}) => {
  return (
    <div className={cn(
      "grid gap-6 animate-slide-up",
      variant === 'compact' 
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    )}>
      {additives.map((additive, index) => (
        <EAdditiveCard
          key={additive.id}
          additive={additive}
          variant={variant}
          showFavorite={showFavorite}
          className={`animation-delay-${Math.min(index * 100, 500)}`}
        />
      ))}
    </div>
  );
};