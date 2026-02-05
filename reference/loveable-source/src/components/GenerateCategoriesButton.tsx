import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, FolderTree } from 'lucide-react';
import { toast } from 'sonner';

export const GenerateCategoriesButton = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Visa loading toast
    toast.info('Genererar kategorier...', {
      description: 'Detta kan ta några sekunder. Kategorierna kommer att behålla å, ä, ö.',
    });
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-categories');
      
      if (error) throw error;
      
      toast.success(`✅ ${data.categories} kategorier genererade!`, {
        description: 'Alla kategorier har skapats med korrekta tecken och produktmatchning.',
      });
      
      console.log('Category generation result:', data);
    } catch (error) {
      console.error('Error generating categories:', error);
      toast.error('❌ Kategori-generering misslyckades', {
        description: error.message || 'Ett fel uppstod vid generering av kategorier. Försök igen.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleGenerate}
      disabled={isGenerating}
      variant="default"
      size="lg"
      className="w-full sm:w-auto"
    >
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Genererar kategorier...
        </>
      ) : (
        <>
          <FolderTree className="mr-2 h-4 w-4" />
          Generera Produktkategorier
        </>
      )}
    </Button>
  );
};
