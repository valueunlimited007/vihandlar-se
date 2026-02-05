import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Info, ExternalLink } from 'lucide-react';
import { Food } from '@/hooks/useFoods';

interface LongevityNutritionChartProps {
  food: Food;
}

// DRI values for adults (per 100g calculations)
const DRI_VALUES = {
  protein: 50, // 50g daily
  fiber: 25,   // 25g daily  
  calcium: 1000, // 1000mg daily
  iron: 18,    // 18mg daily
  magnesium: 400, // 400mg daily
  zinc: 8,     // 8mg daily
  vitaminA: 900, // 900mcg daily
  vitaminC: 90,  // 90mg daily
  vitaminD: 20,  // 20mcg daily
  vitaminE: 15,  // 15mg daily
};

// Longevity Score Algorithm - Based on Blue Zones Research & Harvard Healthy Eating Plate
const calculateLongevityScore = (food: Food) => {
  const scoreBreakdown = {
    nutrientDensity: 0,
    blueZonesFactor: 0,
    antiInflammatory: 0,
    processingLevel: 0,
    protectiveCompounds: 0
  };

  // 1. Nutrient Density (NRF Score inspired) - Max 3 points
  let nrfScore = 0;
  if (food.protein) nrfScore += Math.min(food.protein / 20, 1); // Protein quality
  if (food.fiber) nrfScore += Math.min(food.fiber / 10, 1.5); // Fiber benefit (Harvard emphasis)
  if (food.key_vitamins) nrfScore += Math.min(Object.keys(food.key_vitamins).length * 0.3, 1);
  if (food.key_minerals) nrfScore += Math.min(Object.keys(food.key_minerals).length * 0.2, 0.8);
  
  // Calorie density penalty (anti-nutrient)
  if (food.calories && food.calories > 400) nrfScore -= 0.5;
  if (food.fat && food.fat > 15) nrfScore -= 0.3; // High fat penalty
  
  scoreBreakdown.nutrientDensity = Math.max(0, Math.min(nrfScore, 3));

  // 2. Blue Zones Factor - Foods commonly eaten in longevity hotspots - Max 2.5 points  
  const blueZonesFoods = {
    'bönor': 2.5, 'linser': 2.5, 'kikärtor': 2.5, // Legumes (staple in all Blue Zones)
    'nötter': 2, 'mandel': 2, 'valnöt': 2, // Tree nuts (Adventists, Mediterranean)
    'olivolja': 2, 'extra virgin': 2, // Olive oil (Mediterranean, Ikaria)
    'fisk': 1.8, 'sardiner': 2, 'makrill': 2, // Fish (Okinawa, Mediterranean)
    'tofu': 1.5, 'soja': 1.5, // Soy (Okinawa)
    'sötpotatis': 1.5, 'potatis': 1.2, // Purple sweet potatoes (Okinawa)
    'fullkorn': 1.5, 'havre': 1.5, 'quinoa': 1.5, // Whole grains
    'grönsaker': 1.2, 'bladgrönsaker': 1.5, 'broccoli': 1.5,
    'frukt': 1, 'bär': 1.3 // Berries higher antioxidants
  };

  let blueZonesMatch = 0;
  const foodName = food.name?.toLowerCase() || '';
  const subcategory = food.subcategory?.toLowerCase() || '';
  
  Object.entries(blueZonesFoods).forEach(([keyword, points]) => {
    if (foodName.includes(keyword) || subcategory.includes(keyword)) {
      blueZonesMatch = Math.max(blueZonesMatch, points);
    }
  });
  
  scoreBreakdown.blueZonesFactor = blueZonesMatch;

  // 3. Anti-inflammatory potential (DII inspired) - Max 2 points
  let antiInflamScore = 0;
  
  // Omega-3 rich foods
  const omega3Foods = ['fisk', 'lax', 'makrill', 'sardiner', 'valnöt', 'linfröolja'];
  if (omega3Foods.some(food => foodName.includes(food))) antiInflamScore += 1.5;
  
  // Antioxidant rich (colorful vegetables, berries)
  if (food.key_vitamins?.['C'] || food.key_vitamins?.['E']) antiInflamScore += 0.8;
  if (foodName.includes('bär') || foodName.includes('blå') || subcategory.includes('bär')) antiInflamScore += 1;
  
  // Polyphenol rich
  const polyphenolFoods = ['te', 'kaffe', 'kakao', 'rödvin', 'oliver', 'rödbeta'];
  if (polyphenolFoods.some(food => foodName.includes(food))) antiInflamScore += 0.7;
  
  scoreBreakdown.antiInflammatory = Math.min(antiInflamScore, 2);

  // 4. Processing Level (NOVA classification) - Max 1.5 points (unprocessed gets full points)
  let processingScore = 1.5; // Start with full points for whole foods
  
  // Deduct for processing indicators
  const processedIndicators = ['konserverat', 'rökt', 'saltad', 'torkad', 'fryst'];
  const highlyProcessedIndicators = ['tillsatt', 'artificiell', 'konservering', 'tillsats'];
  
  if (processedIndicators.some(indicator => foodName.includes(indicator))) {
    processingScore = 1; // Minimally processed
  }
  if (highlyProcessedIndicators.some(indicator => foodName.includes(indicator))) {
    processingScore = 0.3; // Ultra-processed
  }
  
  scoreBreakdown.processingLevel = processingScore;

  // 5. Protective Compounds - Max 1 point
  let protectiveScore = 0;
  if (food.fiber && food.fiber > 5) protectiveScore += 0.4; // Gut health
  if (food.protein && food.protein > 15) protectiveScore += 0.3; // Muscle preservation
  if (food.key_minerals?.['kalcium'] || food.key_minerals?.['magnesium']) protectiveScore += 0.3; // Bone health
  
  scoreBreakdown.protectiveCompounds = Math.min(protectiveScore, 1);

  const totalScore = Object.values(scoreBreakdown).reduce((sum, score) => sum + score, 0);
  
  return {
    score: Math.min(Math.max(Math.round(totalScore), 1), 10),
    breakdown: scoreBreakdown,
    maxPossible: 10
  };
};

const prepareChartData = (food: Food) => {
  const data = [];
  
  // Add macronutrients
  if (food.protein) {
    data.push({
      nutrient: 'Protein',
      value: Math.min((food.protein / DRI_VALUES.protein) * 100, 100),
      actualValue: `${food.protein}g`,
      category: 'Makronäringsämne'
    });
  }
  
  if (food.fiber) {
    data.push({
      nutrient: 'Fiber',
      value: Math.min((food.fiber / DRI_VALUES.fiber) * 100, 100),
      actualValue: `${food.fiber}g`,
      category: 'Makronäringsämne'
    });
  }
  
  // Add vitamins from key_vitamins
  if (food.key_vitamins) {
    Object.entries(food.key_vitamins).forEach(([vitamin, amount]) => {
      const numericAmount = parseFloat(amount.replace(/[^\d.]/g, ''));
      if (!isNaN(numericAmount)) {
        let percentage = 0;
        let displayAmount = amount;
        
        // Rough estimates for common vitamins
        switch (vitamin.toLowerCase()) {
          case 'a':
          case 'vitamin a':
            percentage = Math.min((numericAmount / DRI_VALUES.vitaminA) * 100, 100);
            break;
          case 'c':
          case 'vitamin c':
            percentage = Math.min((numericAmount / DRI_VALUES.vitaminC) * 100, 100);
            break;
          case 'd':
          case 'vitamin d':
            percentage = Math.min((numericAmount / DRI_VALUES.vitaminD) * 100, 100);
            break;
          case 'e':
          case 'vitamin e':
            percentage = Math.min((numericAmount / DRI_VALUES.vitaminE) * 100, 100);
            break;
          default:
            percentage = Math.min(numericAmount * 2, 100); // Fallback estimation
        }
        
        data.push({
          nutrient: `Vitamin ${vitamin.toUpperCase()}`,
          value: percentage,
          actualValue: displayAmount,
          category: 'Vitamin'
        });
      }
    });
  }
  
  // Add minerals from key_minerals
  if (food.key_minerals) {
    Object.entries(food.key_minerals).forEach(([mineral, amount]) => {
      const numericAmount = parseFloat(amount.replace(/[^\d.]/g, ''));
      if (!isNaN(numericAmount)) {
        let percentage = 0;
        
        switch (mineral.toLowerCase()) {
          case 'kalcium':
          case 'calcium':
            percentage = Math.min((numericAmount / DRI_VALUES.calcium) * 100, 100);
            break;
          case 'järn':
          case 'iron':
            percentage = Math.min((numericAmount / DRI_VALUES.iron) * 100, 100);
            break;
          case 'magnesium':
            percentage = Math.min((numericAmount / DRI_VALUES.magnesium) * 100, 100);
            break;
          case 'zink':
          case 'zinc':
            percentage = Math.min((numericAmount / DRI_VALUES.zinc) * 100, 100);
            break;
          default:
            percentage = Math.min(numericAmount / 10, 100); // Fallback
        }
        
        data.push({
          nutrient: mineral.charAt(0).toUpperCase() + mineral.slice(1),
          value: percentage,
          actualValue: amount,
          category: 'Mineral'
        });
      }
    });
  }
  
  return data;
};

const getLongevityBadges = (food: Food, scoreData: any) => {
  const badges = [];
  const score = scoreData.score;
  
  // Science-based badges
  if (score >= 8) badges.push({ text: 'Blue Zones Superfood', variant: 'default' as const });
  if (scoreData.breakdown.blueZonesFactor >= 2) badges.push({ text: 'Hundraårsingrediens', variant: 'default' as const });
  if (scoreData.breakdown.antiInflammatory >= 1.5) badges.push({ text: 'Anti-inflammatorisk', variant: 'secondary' as const });
  if (food.fiber && food.fiber > 8) badges.push({ text: 'Tarmmikrobiom+', variant: 'secondary' as const });
  if (scoreData.breakdown.processingLevel >= 1.4) badges.push({ text: 'Minimal bearbetning', variant: 'outline' as const });
  if (scoreData.breakdown.nutrientDensity >= 2.5) badges.push({ text: 'Näringstät', variant: 'outline' as const });
  
  return badges;
};

const ScoreExplanationDialog = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
        <Info className="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Longevity Score - Vetenskaplig metodologi</DialogTitle>
        <DialogDescription>
          Hur vi beräknar longevity score baserat på etablerad forskning
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 text-sm">
        <div>
          <h4 className="font-semibold mb-2">Poängsystem (max 10 poäng)</h4>
          <div className="space-y-2">
            <div><strong>1. Näringstäthet (0-3p):</strong> Baserat på NRF-index (Nutrient Rich Food), proteinkvalitet, fiber, vitaminer och mineraler per kalori.</div>
            <div><strong>2. Blue Zones-faktor (0-2.5p):</strong> Hur vanligt livsmedlet är i världens 5 "Blue Zones" - områden med exceptionellt lång livslängd.</div>
            <div><strong>3. Anti-inflammatorisk potential (0-2p):</strong> Inspirerat av DII (Dietary Inflammatory Index), fokus på omega-3, antioxidanter och polyfenolinnehåll.</div>
            <div><strong>4. Bearbetningsnivå (0-1.5p):</strong> NOVA-klassificering - helmat får högst poäng, ultrabearbetade livsmedel lägst.</div>
            <div><strong>5. Skyddande ämnen (0-1p):</strong> Specifika komponenter för tarm-, muskel- och benhälsa.</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Blue Zones-forskning</h4>
          <p>Baserat på Dan Buettners 20-åriga forskning om världens längst levande befolkningar i Okinawa (Japan), Sardinien (Italien), Nicoya (Costa Rica), Ikaria (Grekland) och Loma Linda (Kalifornien).</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Vetenskapliga källor</h4>
          <div className="space-y-1 text-xs">
            <div>• Buettner, D. (2012). "Blue Zones: 9 Power Foods" - American Journal of Lifestyle Medicine</div>
            <div>• Fulgoni, V. L. (2009). "Nutrients Rich Food Index" - Nutrition Journal</div>  
            <div>• Shivappa, N. (2014). "Dietary Inflammatory Index" - Public Health Nutrition</div>
            <div>• Monteiro, C. A. (2019). "NOVA food classification" - World Nutrition</div>
            <div>• Harvard T.H. Chan School - "The Healthy Eating Plate" guidelines</div>
          </div>
        </div>

        <div className="bg-muted p-3 rounded-lg">
          <p className="text-xs"><strong>Disclaimer:</strong> Detta är en förenklad modell för utbildningssyfte. Konsultera alltid läkare för personlig kostrådgivning. Poängen reflekterar allmänna hälsofördelar, inte individuella behov.</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
);

export const LongevityNutritionChart = ({ food }: LongevityNutritionChartProps) => {
  const chartData = prepareChartData(food);
  const longevityScoreData = calculateLongevityScore(food);
  const badges = getLongevityBadges(food, longevityScoreData);
  
  if (chartData.length === 0) {
    return null; // Don't render if no data
  }
  
  const chartConfig = {
    value: {
      label: '% av DRI',
      color: 'hsl(var(--primary))',
    },
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600'; 
    return 'text-orange-600';
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🧬</span>
            Longevity & Näringsanalys
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Longevity Score:</span>
            <Badge variant={longevityScoreData.score >= 7 ? 'default' : 'secondary'} className="text-lg px-3 py-1">
              {longevityScoreData.score}/10
            </Badge>
            <ScoreExplanationDialog />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Score Breakdown */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              Poäng-uppdelning 
              <span className={`font-bold ${getScoreColor(longevityScoreData.score)}`}>
                ({longevityScoreData.score}/10)
              </span>
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Näringstäthet</span>
                <div className="flex items-center gap-2">
                  <Progress value={(longevityScoreData.breakdown.nutrientDensity / 3) * 100} className="w-20 h-2" />
                  <span className="text-xs font-mono w-12">{longevityScoreData.breakdown.nutrientDensity.toFixed(1)}/3</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Blue Zones-faktor</span>
                <div className="flex items-center gap-2">
                  <Progress value={(longevityScoreData.breakdown.blueZonesFactor / 2.5) * 100} className="w-20 h-2" />
                  <span className="text-xs font-mono w-12">{longevityScoreData.breakdown.blueZonesFactor.toFixed(1)}/2.5</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Anti-inflammatorisk</span>
                <div className="flex items-center gap-2">
                  <Progress value={(longevityScoreData.breakdown.antiInflammatory / 2) * 100} className="w-20 h-2" />
                  <span className="text-xs font-mono w-12">{longevityScoreData.breakdown.antiInflammatory.toFixed(1)}/2</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Bearbetningsnivå</span>
                <div className="flex items-center gap-2">
                  <Progress value={(longevityScoreData.breakdown.processingLevel / 1.5) * 100} className="w-20 h-2" />
                  <span className="text-xs font-mono w-12">{longevityScoreData.breakdown.processingLevel.toFixed(1)}/1.5</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Skyddande ämnen</span>
                <div className="flex items-center gap-2">
                  <Progress value={(longevityScoreData.breakdown.protectiveCompounds / 1) * 100} className="w-20 h-2" />
                  <span className="text-xs font-mono w-12">{longevityScoreData.breakdown.protectiveCompounds.toFixed(1)}/1</span>
                </div>
              </div>
            </div>
          </div>

          {/* Longevity Badges */}
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant={badge.variant}>
                {badge.text}
              </Badge>
            ))}
          </div>
          
          {/* Nutrition Radar Chart */}
          <div className="h-80">
            <ChartContainer config={chartConfig}>
              <RadarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <PolarGrid className="fill-muted stroke-muted" />
                <PolarAngleAxis 
                  dataKey="nutrient" 
                  className="fill-foreground text-xs"
                  tick={{ fontSize: 12 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  className="fill-muted-foreground text-xs"
                  tick={false}
                />
                <Radar
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={0.2}
                  className="animate-scale-in"
                />
                <ChartTooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="rounded-lg border bg-background p-3 shadow-md">
                          <p className="font-semibold">{data.nutrient}</p>
                          <p className="text-sm text-muted-foreground">
                            {data.actualValue} ({Math.round(data.value)}% av DRI)
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {data.category}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </RadarChart>
            </ChartContainer>
          </div>
          
          {/* Chart Legend & Scientific References */}
          <div className="border-t pt-8 mt-8 space-y-6">
            {/* Color Legend */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h5 className="text-xs font-medium text-foreground mb-3">Färgkodning för näringsämnen</h5>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2">
                  <span className="text-green-500 text-sm">●</span> 
                  <span className="text-xs text-muted-foreground">Högt (&gt;30% DRI)</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-yellow-500 text-sm">●</span> 
                  <span className="text-xs text-muted-foreground">Medel (10-30%)</span>
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-muted text-sm">●</span> 
                  <span className="text-xs text-muted-foreground">Lågt (&lt;10%)</span>
                </span>
              </div>
            </div>
            
            {/* Scientific Sources */}
            <div className="bg-muted/20 rounded-lg p-4 space-y-4">
              <div>
                <h5 className="text-xs font-medium text-foreground mb-2">Vetenskapliga källor:</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Blue Zones-forskning (Dan Buettner), NRF-index, DII (Dietary Inflammatory Index), NOVA-klassificering
                </p>
              </div>
              <div className="border-t border-muted pt-3">
                <h5 className="text-xs font-medium text-foreground mb-2">Referensvärden:</h5>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  DRI = Dagligt Referensintag för vuxna. Källa: Livsmedelsverket
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};