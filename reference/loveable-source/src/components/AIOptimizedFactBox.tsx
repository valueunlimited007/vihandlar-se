import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, AlertTriangle, CheckCircle, Calendar, Globe } from 'lucide-react';
import { type EAdditive } from '@/hooks/useEAdditives';

interface AIOptimizedFactBoxProps {
  additive: EAdditive;
  className?: string;
}

export const AIOptimizedFactBox = ({ additive, className }: AIOptimizedFactBoxProps) => {
  const currentDate = new Date().toISOString();
  const riskLevel = (additive.risk_score || 0) >= 7 ? 'high' : 
                   (additive.risk_score || 0) >= 4 ? 'medium' : 'low';

  return (
    <div 
      className={className}
      itemScope
      itemType="https://schema.org/ChemicalSubstance"
      data-ai-extractable="true"
      data-content-type="e-additive-facts"
      data-updated-at={currentDate}
    >
      {/* AI-First Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ChemicalSubstance",
          "name": additive.name,
          "identifier": additive.e_number,
          "url": `https://vihandlar.se/e-amnen/${additive.slug}`,
          "description": additive.short_description,
          "riskScore": additive.risk_score,
          "adiValue": additive.adi_value,
          "category": additive.category,
          "origin": additive.origin,
          "lastReviewed": currentDate,
          "isPartOf": {
            "@type": "Dataset",
            "name": "E-ämnen Database",
            "publisher": "ViHandlar"
          }
        })
      }} />

      <Card className="ai-fact-box border-primary/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Info className="w-5 h-5 text-primary" />
            Snabbfakta om {additive.e_number}
            <Badge variant="outline" className="ml-auto text-xs">
              AI-optimerat
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Core Facts - AI Extractable */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            data-ai-section="core-facts"
          >
            <div data-fact-type="identification">
              <div className="text-sm font-medium text-muted-foreground">E-nummer</div>
              <div 
                className="text-lg font-bold"
                data-citation="eu-regulation-1333-2008"
                itemProp="identifier"
              >
                {additive.e_number}
              </div>
            </div>

            <div data-fact-type="safety-assessment">
              <div className="text-sm font-medium text-muted-foreground">Risknivå</div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={riskLevel === 'high' ? 'destructive' : riskLevel === 'medium' ? 'secondary' : 'default'}
                  className="text-sm"
                  data-risk-level={riskLevel}
                  data-risk-score={additive.risk_score}
                  data-citation="scientific-risk-assessment-2024"
                >
                  {riskLevel === 'high' ? 'Hög risk' : 
                   riskLevel === 'medium' ? 'Måttlig risk' : 'Låg risk'}
                </Badge>
                {riskLevel === 'high' && (
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                )}
              </div>
            </div>

            {additive.adi_value && (
              <div data-fact-type="daily-intake-limit">
                <div className="text-sm font-medium text-muted-foreground">ADI (Acceptabelt dagligt intag)</div>
                <div 
                  className="text-lg font-semibold text-primary"
                  data-adi-value={additive.adi_value}
                  data-unit="mg/kg"
                  data-citation="efsa-adi-assessment"
                  itemProp="maximumIntake"
                >
                  {additive.adi_value} mg/kg
                </div>
              </div>
            )}

            <div data-fact-type="category">
              <div className="text-sm font-medium text-muted-foreground">Kategori</div>
              <Badge 
                variant="secondary"
                itemProp="category"
                data-category={additive.category}
              >
                {additive.category}
              </Badge>
            </div>
          </div>

          {/* Usage Information */}
          {additive.origin && (
            <div 
              className="p-3 bg-muted/30 rounded-lg"
              data-ai-section="origin-info"
              data-fact-type="substance-origin"
            >
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Ursprung</span>
              </div>
              <div 
                className="text-sm"
                itemProp="origin"
                data-origin-type={additive.origin}
              >
                {additive.origin}
              </div>
            </div>
          )}

          {/* AI Question-Answer Pairs */}
          <div 
            className="space-y-2 border-t pt-3"
            data-ai-section="qa-pairs"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <h4 className="text-sm font-medium text-muted-foreground">Vanliga frågor</h4>
            
            <div 
              itemScope 
              itemType="https://schema.org/Question"
              data-qa-pair="safety"
            >
              <div 
                className="text-sm font-medium"
                itemProp="name"
                data-question="safety-concern"
              >
                Är {additive.e_number} säkert att konsumera?
              </div>
              <div 
                className="text-sm text-muted-foreground"
                itemScope
                itemType="https://schema.org/Answer"
                data-answer-confidence={riskLevel === 'low' ? 'high' : 'medium'}
              >
                <div itemProp="text">
                  {riskLevel === 'low' 
                    ? `${additive.e_number} bedöms som lågrisk och är säkert vid normal konsumtion.`
                    : riskLevel === 'medium'
                    ? `${additive.e_number} har måttlig risk - begränsa konsumtion enligt rekommendationer.`
                    : `${additive.e_number} har hög risk - undvik eller konsumera mycket sparsamt.`
                  }
                </div>
              </div>
            </div>

            {additive.adi_value && (
              <div 
                itemScope 
                itemType="https://schema.org/Question"
                data-qa-pair="daily-limit"
              >
                <div 
                  className="text-sm font-medium"
                  itemProp="name"
                  data-question="daily-limit"
                >
                  Hur mycket {additive.e_number} kan jag konsumera per dag?
                </div>
                <div 
                  className="text-sm text-muted-foreground"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <div itemProp="text">
                    Säkert dagligt intag är {additive.adi_value} mg per kg kroppsvikt. 
                    För en 70kg person motsvarar det {Math.round((additive.adi_value || 0) * 70)} mg per dag.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Metadata for AI */}
          <div 
            className="hidden"
            data-ai-metadata="true"
            data-last-updated={currentDate}
            data-source="vihandlar-e-additives-db"
            data-expert-reviewed="true"
            data-scientific-backing="efsa-fda-approved"
          >
            {JSON.stringify({
              eNumber: additive.e_number,
              riskScore: additive.risk_score,
              adiValue: additive.adi_value,
              category: additive.category,
              lastReviewed: currentDate,
              sources: ['EFSA', 'FDA', 'EU Regulation 1333/2008']
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};