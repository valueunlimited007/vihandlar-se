import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Calculator, AlertTriangle, CheckCircle, Users } from 'lucide-react';
import { EAdditive } from '@/hooks/useEAdditives';

interface ADICalculatorProps {
  additive: EAdditive;
}

interface FamilyMember {
  id: string;
  name: string;
  weight: number;
  age: number;
}

export const ADICalculator = ({ additive }: ADICalculatorProps) => {
  const [weight, setWeight] = useState<number>(70);
  const [dailyIntake, setDailyIntake] = useState<number>(0);
  const [familyMode, setFamilyMode] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: '1', name: 'Vuxen', weight: 70, age: 35 }
  ]);

  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: `Familjemedlem ${familyMembers.length + 1}`,
      weight: 30,
      age: 10
    };
    setFamilyMembers([...familyMembers, newMember]);
  };

  const updateFamilyMember = (id: string, field: keyof FamilyMember, value: string | number) => {
    setFamilyMembers(prev => 
      prev.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const removeFamilyMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id));
  };

  const calculations = useMemo(() => {
    if (!additive.adi_value) return null;

    const results = familyMode ? familyMembers.map(member => {
      const maxDaily = (additive.adi_value * member.weight).toFixed(2);
      const currentIntake = dailyIntake;
      const percentage = ((currentIntake / parseFloat(maxDaily)) * 100).toFixed(1);
      const isExceeded = currentIntake > parseFloat(maxDaily);
      const safetyMargin = ((parseFloat(maxDaily) - currentIntake) / parseFloat(maxDaily) * 100).toFixed(1);

      return {
        member,
        maxDaily: parseFloat(maxDaily),
        currentIntake,
        percentage: parseFloat(percentage),
        isExceeded,
        safetyMargin: parseFloat(safetyMargin)
      };
    }) : [{
      member: { name: 'Du', weight, age: 0 } as FamilyMember,
      maxDaily: parseFloat((additive.adi_value * weight).toFixed(2)),
      currentIntake: dailyIntake,
      percentage: parseFloat(((dailyIntake / (additive.adi_value * weight)) * 100).toFixed(1)),
      isExceeded: dailyIntake > (additive.adi_value * weight),
      safetyMargin: parseFloat((((additive.adi_value * weight) - dailyIntake) / (additive.adi_value * weight) * 100).toFixed(1))
    }];

    return results;
  }, [additive.adi_value, weight, dailyIntake, familyMode, familyMembers]);

  if (!additive.adi_value) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            ADI-kalkylator
          </CardTitle>
          <CardDescription>
            Beräkna säker daglig dos (ADI - Acceptable Daily Intake)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              ADI-värde saknas för {additive.name}. Detta kan betyda att ämnet antingen inte har ett fastställt ADI-värde eller att det anses säkert utan begränsning.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          ADI-kalkylator för {additive.e_number}
        </CardTitle>
        <CardDescription>
          Beräkna säker daglig dos. ADI: {additive.adi_value} mg per kg kroppsvikt ({additive.adi_source})
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Mode Selection */}
        <div className="flex gap-2">
          <Button
            variant={!familyMode ? "default" : "outline"}
            size="sm"
            onClick={() => setFamilyMode(false)}
          >
            Individuell
          </Button>
          <Button
            variant={familyMode ? "default" : "outline"}
            size="sm"
            onClick={() => setFamilyMode(true)}
          >
            <Users className="h-4 w-4 mr-2" />
            Familj
          </Button>
        </div>

        {/* Family Mode */}
        {familyMode ? (
          <div className="space-y-4">
            {familyMembers.map((member) => (
              <div key={member.id} className="border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <Label htmlFor={`name-${member.id}`}>Namn</Label>
                    <Input
                      id={`name-${member.id}`}
                      value={member.name}
                      onChange={(e) => updateFamilyMember(member.id, 'name', e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`weight-${member.id}`}>Vikt (kg)</Label>
                    <Input
                      id={`weight-${member.id}`}
                      type="number"
                      value={member.weight}
                      onChange={(e) => updateFamilyMember(member.id, 'weight', parseInt(e.target.value) || 0)}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`age-${member.id}`}>Ålder</Label>
                    <Input
                      id={`age-${member.id}`}
                      type="number"
                      value={member.age}
                      onChange={(e) => updateFamilyMember(member.id, 'age', parseInt(e.target.value) || 0)}
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    {familyMembers.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFamilyMember(member.id)}
                      >
                        Ta bort
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            <Button variant="outline" onClick={addFamilyMember}>
              Lägg till familjemedlem
            </Button>
          </div>
        ) : (
          /* Individual Mode */
          <div>
            <Label htmlFor="weight">Din vikt (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value) || 70)}
              autoComplete="off"
              className="mt-1"
            />
          </div>
        )}

        {/* Daily Intake Input */}
        <div>
          <Label htmlFor="intake">Ditt dagliga intag (mg)</Label>
          <Input
            id="intake"
            type="number"
            step="0.1"
            value={dailyIntake}
            onChange={(e) => setDailyIntake(parseFloat(e.target.value) || 0)}
            autoComplete="off"
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Ange hur många mg av {additive.name} du konsumerar per dag
          </p>
        </div>

        {/* Results */}
        {calculations && (
          <div className="space-y-4">
            <h4 className="font-medium">Beräkningsresultat:</h4>
            
            {calculations.map((result, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium">{result.member.name}</h5>
                  <Badge variant={result.isExceeded ? "destructive" : "default"}>
                    {result.percentage}% av ADI
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Max daglig dos</p>
                    <p className="font-medium">{result.maxDaily.toFixed(2)} mg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ditt intag</p>
                    <p className="font-medium">{result.currentIntake} mg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Säkerhetsmarginal</p>
                    <p className="font-medium">{result.safetyMargin.toFixed(1)}%</p>
                  </div>
                </div>

                {result.isExceeded ? (
                  <Alert className="mt-3">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Intaget överstiger ADI-värdet för {result.member.name}. Minska konsumtionen.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="mt-3">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      Intaget är inom säkra gränser för {result.member.name}.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Example Products */}
        {additive.common_products && Array.isArray(additive.common_products) && additive.common_products.length > 0 && (
          <div>
            <h4 className="font-medium mb-3">Exempel på vanliga produkter:</h4>
            <div className="space-y-2">
              {(additive.common_products as any[]).slice(0, 3).map((product: any, index: number) => (
                <div key={index} className="text-sm border rounded p-3">
                  <p className="font-medium">{product.category}</p>
                  <p className="text-muted-foreground">
                    Genomsnitt: {product.average_amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Produkter: {product.products?.slice(0, 3).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};