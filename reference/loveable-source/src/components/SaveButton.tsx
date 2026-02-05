import { useState } from 'react';
import { Save, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/hooks/useHapticFeedback';

interface SaveButtonProps {
  shareToken: string;
  listName: string;
}

export const SaveButton = ({ shareToken, listName }: SaveButtonProps) => {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();
  const { mediumTap } = useHapticFeedback();

  const shareUrl = `${window.location.origin}/list/${shareToken}`;

  const handleSave = async () => {
    try {
      // Haptic feedback for interaction
      mediumTap();
      
      await navigator.clipboard.writeText(shareUrl);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      
      toast({
        title: "Inköpslista sparad! 🛒",
        description: "Länken är nu kopierad och redo att delas. Du kan skicka den till familj eller vänner så de kan hjälpa till att handla.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Kunde inte spara",
        description: "Försök igen eller kopiera URL:en manuellt.",
      });
    }
  };

  return (
    <Button
      onClick={handleSave}
      variant={saved ? "default" : "outline"}
      size="sm"
      className={`gap-2 transition-all duration-300 ${
        saved 
          ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg scale-105' 
          : 'hover:scale-105 active:scale-95'
      }`}
    >
      {saved ? (
        <Check className="w-4 h-4 animate-bounce" />
      ) : (
        <Save className="w-4 h-4" />
      )}
      
      {saved ? 'Sparad!' : 'Spara inköpslista'}
    </Button>
  );
};