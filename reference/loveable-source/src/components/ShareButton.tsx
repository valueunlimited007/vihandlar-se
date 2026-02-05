import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  shareToken: string;
  listName: string;
}

export const ShareButton = ({ shareToken, listName }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareUrl = `${window.location.origin}/list/${shareToken}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `ViHandlar - ${listName}`,
          text: `Hjälp mig handla! Öppna vår delade inköpslista:`,
          url: shareUrl,
        });
        // Sharing succeeded - don't show any error
        toast({
          title: "Delning genomförd!",
          description: "Listan är nu delad.",
        });
      } catch (err) {
        // User canceled sharing, copy to clipboard instead
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Länk kopierad!",
        description: "Dela länken med familj eller vänner så kan ni handla tillsammans.",
      });
    } catch (err) {
      // Fallback for when clipboard API doesn't work
      toast({
        title: "Länken är redo att delas",
        description: "Du kan nu dela länken manuellt med andra.",
      });
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="default"
      size="sm"
      className="gap-2 bg-green-600 hover:bg-green-700 text-white border-0 shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
    >
      {copied ? (
        <Check className="w-4 h-4 text-accent" />
      ) : navigator.share ? (
        <Share2 className="w-4 h-4" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
      
      {copied ? 'Kopierad!' : 'Dela med familj'}
    </Button>
  );
};