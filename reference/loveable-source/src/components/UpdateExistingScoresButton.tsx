import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, RefreshCw, CheckCircle } from 'lucide-react';

export const UpdateExistingScoresButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      toast.info('Uppdatering av E-ämnes risk scores påbörjad...', {
        description: 'Detta kan ta några sekunder'
      });

      const { data, error } = await supabase.functions.invoke('update-existing-scores');
      
      if (error) throw error;

      if (data.success) {
        toast.success(`Klart! ${data.updated_count} E-ämnen uppdaterade`, {
          description: `Risk scores har uppdaterats med nya algoritmen`
        });
        setIsCompleted(true);
      } else {
        throw new Error(data.error || 'Okänt fel');
      }
    } catch (error) {
      console.error('Error updating existing scores:', error);
      toast.error('Fel vid uppdatering', {
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
        Risk scores uppdaterade
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleUpdate}
      disabled={isLoading}
      variant="secondary"
      className="gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Uppdaterar risk scores...
        </>
      ) : (
        <>
          <RefreshCw className="h-4 w-4" />
          Uppdatera befintliga risk scores
        </>
      )}
    </Button>
  );
};