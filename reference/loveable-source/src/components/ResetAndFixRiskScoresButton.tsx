import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, RotateCcw, CheckCircle, AlertTriangle } from 'lucide-react';

export const ResetAndFixRiskScoresButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleResetAndFix = async () => {
    setIsLoading(true);
    try {
      toast.info('Återställer och fixar E-ämnes risk scores...', {
        description: 'Steg 1: Återställer alla till normala scores, Steg 2: Applicerar höga scores på endast 6 specifika E-ämnen'
      });

      const { data, error } = await supabase.functions.invoke('reset-and-fix-risk-scores');
      
      if (error) throw error;

      if (data.success) {
        const isCorrect = data.actualHighRisk === 6;
        
        if (isCorrect) {
          toast.success(`🎯 PERFEKT! Risk scores fixade korrekt`, {
            description: `${data.normalUpdatedCount} E-ämnen återställda till normala scores, exakt 6 E-ämnen med höga risk scores`
          });
        } else {
          toast.warning(`⚠️ Delvis klart men kontrollera resultatet`, {
            description: `${data.normalUpdatedCount} återställda, ${data.actualHighRisk} högrisk (förväntade 6)`
          });
        }
        setIsCompleted(true);
      } else {
        throw new Error(data.error || 'Okänt fel');
      }
    } catch (error) {
      console.error('Error resetting and fixing risk scores:', error);
      toast.error('Fel vid återställning och fixning', {
        description: error.message || 'Något gick fel'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isCompleted) {
    return (
      <Button variant="outline" disabled className="gap-2">
        <CheckCircle className="h-4 w-4 text-green-600" />
        Risk scores återställda och fixade
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleResetAndFix}
      disabled={isLoading}
      variant="destructive"
      className="gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Återställer och fixar...
        </>
      ) : (
        <>
          <RotateCcw className="h-4 w-4" />
          <AlertTriangle className="h-4 w-4" />
          Återställ och fixa risk scores
        </>
      )}
    </Button>
  );
};