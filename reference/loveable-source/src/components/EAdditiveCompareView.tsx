import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RiskGauge } from '@/components/RiskGauge';
import { Separator } from '@/components/ui/separator';
import { EAdditive } from '@/hooks/useEAdditives';
import { Plus, Minus, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EAdditiveCompareViewProps {
  additives: EAdditive[];
  onRemove: (id: string) => void;
  onAdd?: () => void;
  maxItems?: number;
}

export const EAdditiveCompareView = ({ 
  additives, 
  onRemove, 
  onAdd, 
  maxItems = 3 
}: EAdditiveCompareViewProps) => {
  if (additives.length === 0) {
    return (
      <Card>
        <CardContent className="py-16 text-center">
          <Scale className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Jämför E-ämnen</h3>
          <p className="text-muted-foreground mb-4">
            Lägg till E-ämnen för att jämföra deras egenskaper sida vid sida.
          </p>
          {onAdd && (
            <Button onClick={onAdd} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Lägg till E-ämne
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  const ComparisonRow = ({ label, getValue, className = "" }: {
    label: string;
    getValue: (additive: EAdditive) => React.ReactNode;
    className?: string;
  }) => (
    <div className={`grid grid-cols-${additives.length + 1} gap-4 py-2 ${className}`}>
      <div className="font-medium text-sm">{label}</div>
      {additives.map((additive) => (
        <div key={additive.id} className="text-sm">
          {getValue(additive)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-${additives.length} gap-4`}>
        {additives.map((additive) => (
          <Card key={additive.id} className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(additive.id)}
              className="absolute top-2 right-2 h-8 w-8 p-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{additive.e_number}</CardTitle>
              <CardDescription>{additive.name}</CardDescription>
              {additive.common_name && (
                <p className="text-sm text-muted-foreground">
                  ({additive.common_name})
                </p>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <RiskGauge score={additive.risk_score || 0} size="sm" />
                <Badge variant="secondary">{additive.category}</Badge>
              </div>
              <Link 
                to={`/e-amnen/${additive.slug}`}
                className="text-sm text-primary hover:underline"
              >
                Visa detaljer →
              </Link>
            </CardContent>
          </Card>
        ))}
        
        {additives.length < maxItems && onAdd && (
          <Card className="border-dashed border-2 border-muted-foreground/25">
            <CardContent className="flex items-center justify-center h-full min-h-48">
              <Button onClick={onAdd} variant="outline" className="h-auto py-4">
                <Plus className="w-6 h-6 mr-2" />
                Lägg till E-ämne
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detailed Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Detaljerad jämförelse</CardTitle>
          <CardDescription>
            Jämför egenskaper och säkerhetsdata sida vid sida
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <ComparisonRow
            label="Risknivå"
            getValue={(additive) => (
              <div className="flex items-center gap-2">
                <RiskGauge score={additive.risk_score || 0} size="sm" showLabel={false} />
                <span>{additive.risk_score || 0}/10</span>
              </div>
            )}
          />
          
          <Separator />
          
          <ComparisonRow
            label="Kategori"
            getValue={(additive) => (
              <Badge variant="outline" className="text-xs">
                {additive.category}
              </Badge>
            )}
          />
          
          <ComparisonRow
            label="Ursprung"
            getValue={(additive) => additive.origin || 'Ej specificerat'}
          />
          
          <ComparisonRow
            label="ADI-värde"
            getValue={(additive) => 
              additive.adi_value 
                ? `${additive.adi_value} mg/kg`
                : 'Ej fastställt'
            }
          />
          
          <Separator />
          
          <ComparisonRow
            label="Longevity-påverkan"
            getValue={(additive) => additive.longevity_impact || 'Ej utvärderat'}
          />
          
          <ComparisonRow
            label="Beskrivning"
            getValue={(additive) => (
              <p className="text-xs line-clamp-3">
                {additive.short_description}
              </p>
            )}
          />
          
          {/* Health Effects Comparison */}
          <Separator />
          
          <ComparisonRow
            label="Dokumenterade effekter"
            getValue={(additive) => {
              const effects = additive.health_effects as any;
              if (!effects?.documented?.length) return 'Inga rapporterade';
              
              return (
                <ul className="text-xs space-y-1">
                  {effects.documented.slice(0, 3).map((effect: string, i: number) => (
                    <li key={i} className="text-red-600">• {effect}</li>
                  ))}
                  {effects.documented.length > 3 && (
                    <li className="text-muted-foreground">
                      +{effects.documented.length - 3} fler
                    </li>
                  )}
                </ul>
              );
            }}
          />
          
          <ComparisonRow
            label="Misstänkta effekter"
            getValue={(additive) => {
              const effects = additive.health_effects as any;
              if (!effects?.suspected?.length) return 'Inga rapporterade';
              
              return (
                <ul className="text-xs space-y-1">
                  {effects.suspected.slice(0, 2).map((effect: string, i: number) => (
                    <li key={i} className="text-orange-600">• {effect}</li>
                  ))}
                  {effects.suspected.length > 2 && (
                    <li className="text-muted-foreground">
                      +{effects.suspected.length - 2} fler
                    </li>
                  )}
                </ul>
              );
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};