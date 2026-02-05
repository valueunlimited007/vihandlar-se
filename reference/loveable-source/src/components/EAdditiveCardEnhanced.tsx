import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RiskGauge } from '@/components/RiskGauge';
import { EAdditiveFavoriteButton } from '@/components/EAdditiveFavoriteButton';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Heart, 
  Leaf, 
  Shield, 
  ArrowRight,
  Info
} from 'lucide-react';
import { type EAdditive } from '@/hooks/useEAdditives';
import { cn } from '@/lib/utils';

interface EAdditiveCardEnhancedProps {
  additive: EAdditive;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  interactive?: boolean;
}

export const EAdditiveCardEnhanced = ({ 
  additive, 
  size = 'md',
  showDetails = true,
  interactive = true
}: EAdditiveCardEnhancedProps) => {
  const riskScore = additive.risk_score || 0;
  const isHighRisk = riskScore >= 7;
  const isMediumRisk = riskScore >= 4 && riskScore < 7;
  const isLowRisk = riskScore < 4;

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const cardElement = (
    <Card className={cn(
      "group relative overflow-hidden transition-all duration-300",
      "border-2 border-transparent",
      interactive && [
        "hover:shadow-xl hover:scale-[1.02] cursor-pointer",
        "hover:border-primary/30"
      ],
      isHighRisk && "bg-gradient-to-br from-destructive/5 via-background to-background",
      isMediumRisk && "bg-gradient-to-br from-warning/5 via-background to-background",
      isLowRisk && "bg-gradient-to-br from-success/5 via-background to-background"
    )}>
      {/* Animated risk indicator */}
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1.5 transition-all duration-300",
        isHighRisk && "bg-gradient-to-r from-destructive to-destructive/60",
        isMediumRisk && "bg-gradient-to-r from-warning to-warning/60",
        isLowRisk && "bg-gradient-to-r from-success to-success/60",
        interactive && "group-hover:h-2"
      )} />

      <CardHeader className={sizeClasses[size]}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* E-number with animated emphasis */}
            <div className="flex items-center gap-3 mb-3">
              <h3 className={cn(
                "text-2xl font-bold tracking-tight",
                isHighRisk && "text-destructive",
                isMediumRisk && "text-warning",
                isLowRisk && "text-success",
                interactive && "group-hover:scale-105 transition-transform duration-200"
              )}>
                {additive.e_number}
              </h3>
              
              {isHighRisk && (
                <div className="flex items-center gap-1">
                  <AlertTriangle className="w-5 h-5 text-destructive animate-pulse" />
                  <Badge variant="destructive" className="text-xs font-medium">
                    HÖG RISK
                  </Badge>
                </div>
              )}
            </div>

            {/* Name and common name */}
            <div className="space-y-1 mb-4">
              <h4 className="font-semibold text-lg text-foreground truncate">
                {additive.name}
              </h4>
              {additive.common_name && (
                <p className="text-muted-foreground truncate">
                  {additive.common_name}
                </p>
              )}
            </div>

            {/* Category and attributes */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                {additive.category}
              </Badge>
              
              {additive.origin && (
                <Badge variant="outline" className="border-success/30 text-success">
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
                  className="font-medium"
                >
                  <Heart className="w-3 h-3 mr-1" />
                  {additive.longevity_impact}
                </Badge>
              )}
            </div>
          </div>

          {/* Risk gauge and favorite */}
          <div className="flex flex-col items-center gap-3">
            <RiskGauge score={riskScore} size={size === 'lg' ? 'lg' : 'md'} />
            <EAdditiveFavoriteButton additive={additive} />
          </div>
        </div>
      </CardHeader>

      {showDetails && (
        <CardContent className={cn(sizeClasses[size], "pt-0")}>
          {/* Description */}
          <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
            {additive.short_description}
          </p>

          {/* Key information cards */}
          <div className="space-y-3">
            {/* ADI Information */}
            {additive.adi_value && (
              <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    ADI: {additive.adi_value} mg/kg
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Acceptabelt dagligt intag per kg kroppsvikt
                  </p>
                </div>
              </div>
            )}

            {/* High risk warning */}
            {isHighRisk && additive.children_note && (
              <div className="flex items-start gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-destructive mb-1">
                    Säkerhetsvarning
                  </p>
                  <p className="text-xs text-destructive/80 line-clamp-2">
                    {additive.children_note}
                  </p>
                </div>
              </div>
            )}

            {/* Action bar */}
            {interactive && (
              <div className="flex items-center justify-between pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="w-4 h-4" />
                  <span>Klicka för mer information</span>
                </div>
                <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-sm font-medium">Läs mer</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      )}

      {/* Hover effect overlay */}
      {interactive && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* Pulse effect for high risk items */}
      {isHighRisk && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-destructive/20 to-destructive/10 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10" />
      )}
    </Card>
  );

  return interactive ? (
    <Link to={`/e-amnen/${additive.slug}`} className="block">
      {cardElement}
    </Link>
  ) : cardElement;
};