import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CheckCircle } from 'lucide-react';

export const CompleteEAdditivesButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      toast.info('Komplettering av E-ämnen påbörjad...', {
        description: 'Detta kan ta några sekunder'
      });

      const { data, error } = await supabase.functions.invoke('complete-eadditives');
      
      if (error) throw error;

      if (data.success) {
        toast.success(`Klart! ${data.updated_count} E-ämnen kompletterade`, {
          description: `Nu visas ${data.total_published} E-ämnen i katalogen`
        });
        setIsCompleted(true);
      } else {
        throw new Error(data.error || 'Okänt fel');
      }
    } catch (error) {
      console.error('Error completing E-additives:', error);
      toast.error('Fel vid komplettering', {
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
        Alla E-ämnen kompletterade
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleComplete}
      disabled={isLoading}
      className="gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Kompleterar E-ämnen...
        </>
      ) : (
        'Komplettera alla 87 E-ämnen'
      )}
    </Button>
  );
};