import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Food } from '@/hooks/useFoods';

interface LongevitySynergiesProps {
  food: Food;
}

interface FoodSynergy {
  combineWith: string;
  benefit: string;
  icon: string;
  reason: string;
}

const getFoodSynergies = (food: Food): FoodSynergy[] => {
  const synergies: FoodSynergy[] = [];
  const foodName = food.name.toLowerCase();
  
  // Parmesan-specific synergies
  if (foodName.includes('parmesan') || foodName.includes('parmigiano')) {
    synergies.push(
      {
        combineWith: 'Tomater',
        benefit: 'Lycopene-absorption +300%',
        icon: '🍅',
        reason: 'Fett i osten hjälper kroppen att ta upp lycopene från tomater'
      },
      {
        combineWith: 'Spenat',
        benefit: 'Optimal benhälsa',
        icon: '🥬',
        reason: 'Kalcium + K-vitamin = perfekt kombination för starka ben'
      }
    );
  }
  
  // Iron-rich foods
  if (food.key_minerals?.['järn'] || food.key_minerals?.['iron']) {
    synergies.push({
      combineWith: 'Citrusfrukter',
      benefit: 'Järnupptag +400%',
      icon: '🍊',
      reason: 'C-vitamin förbättrar järnabsorptionen dramatiskt'
    });
  }
  
  // High-fat foods (good for fat-soluble vitamins)
  if (food.fat && food.fat > 10) {
    synergies.push({
      combineWith: 'Grönsaker',
      benefit: 'Vitaminabsorption +200%',
      icon: '🥗',
      reason: 'Fett hjälper kroppen att ta upp A, D, E och K-vitaminer'
    });
  }
  
  // Calcium-rich foods
  if (food.key_minerals?.['kalcium'] || food.key_minerals?.['calcium']) {
    synergies.push({
      combineWith: 'D-vitaminrika livsmedel',
      benefit: 'Kalciumabsorption +150%',
      icon: '🐟',
      reason: 'D-vitamin krävs för att kroppen ska kunna ta upp kalcium'
    });
  }
  
  // Fiber-rich foods
  if (food.fiber && food.fiber > 5) {
    synergies.push({
      combineWith: 'Probiotika',
      benefit: 'Tarmhälsa boost',
      icon: '🥛',
      reason: 'Fiber när de nyttiga bakterierna i tarmen'
    });
  }
  
  // Antioxidant-rich foods (based on vitamins A, C, E)
  if (food.key_vitamins?.['C'] || food.key_vitamins?.['A'] || food.key_vitamins?.['E']) {
    synergies.push({
      combineWith: 'Andra antioxidanter',
      benefit: 'Antioxidant-synergi',
      icon: '🫐',
      reason: 'Olika antioxidanter förstärker varandra och ger bättre skydd'
    });
  }
  
  // Protein-rich foods
  if (food.protein && food.protein > 15) {
    synergies.push({
      combineWith: 'Kolhydrater',
      benefit: 'Optimal muskeluppbyggnad',
      icon: '🍠',
      reason: 'Kolhydrater hjälper proteinet att komma fram till musklerna'
    });
  }
  
  return synergies.slice(0, 3); // Max 3 synergies to keep it clean
};

const getBlueZonesFacts = (food: Food): string[] => {
  const facts: string[] = [];
  const foodName = food.name.toLowerCase();
  
  // Mediterranean foods
  if (foodName.includes('olive') || foodName.includes('oliv')) {
    facts.push('Grundpelare i medelhavsdieten - används dagligen i Sardinien och Ikaria');
  }
  
  if (foodName.includes('tomat')) {
    facts.push('Central ingrediens i Blue Zones - rik på lycopene som skyddar mot åldrande');
  }
  
  // Nuts and legumes
  if (food.subcategory?.toLowerCase().includes('nötter') || foodName.includes('nöt')) {
    facts.push('Äts dagligen i alla Blue Zones - kopplat till längre livslängd');
  }
  
  if (food.subcategory?.toLowerCase().includes('bönor') || foodName.includes('böna')) {
    facts.push('Proteinbasen i Blue Zones - ersätter ofta kött i långlivade kulturer');
  }
  
  // Fish
  if (food.subcategory?.toLowerCase().includes('fisk')) {
    facts.push('Omega-3 källa i Okinawa och medelhavet - anti-inflammatorisk effekt');
  }
  
  // Vegetables
  if (food.subcategory?.toLowerCase().includes('grönt') || food.subcategory?.toLowerCase().includes('grönsak')) {
    facts.push('Utgör 50%+ av måltiderna i Blue Zones - maximerar antioxidantintag');
  }
  
  // Dairy (specific types)
  if (foodName.includes('parmesan') || foodName.includes('parmigiano')) {
    facts.push('Traditionell ost i Sardinien - fermenterad för tarmhälsa och probiotika');
  }
  
  // Fruits
  if (food.subcategory?.toLowerCase().includes('frukt')) {
    facts.push('Naturlig dessert i Blue Zones - ger antioxidanter utan tillsatt socker');
  }
  
  return facts.slice(0, 2); // Max 2 facts
};

export const LongevitySynergies = ({ food }: LongevitySynergiesProps) => {
  const synergies = getFoodSynergies(food);
  const blueZonesFacts = getBlueZonesFacts(food);
  
  if (synergies.length === 0 && blueZonesFacts.length === 0) {
    return null; // Don't render if no data
  }
  
  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">🔬</span>
          Smarta kombinationer & Longevity-tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Food Synergies */}
          {synergies.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                Optimala kombinationer
              </h4>
              <div className="space-y-3">
                {synergies.map((synergy, index) => (
                  <div key={index} className="flex gap-3 p-3 rounded-lg border bg-muted/30 hover-scale">
                    <div className="text-2xl flex-shrink-0">{synergy.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {food.name} + {synergy.combineWith}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {synergy.benefit}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {synergy.reason}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Blue Zones Facts */}
          {blueZonesFacts.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <span className="text-blue-500">🌍</span>
                Blue Zones Insights
              </h4>
              <div className="space-y-2">
                {blueZonesFacts.map((fact, index) => (
                  <div key={index} className="flex gap-2 text-sm">
                    <span className="text-blue-500 flex-shrink-0 mt-0.5">•</span>
                    <span className="text-muted-foreground">{fact}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* General Longevity Tip */}
          <div className="border-t pt-4">
            <div className="flex gap-2 text-xs text-muted-foreground">
              <span className="text-amber-500">💡</span>
              <p>
                <strong>Longevity-tips:</strong> Äta regnbågsfärgat, kombinera makronäringsämnen, 
                och fokusera på minimalt bearbetade livsmedel för maximal hälsoeffekt.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};