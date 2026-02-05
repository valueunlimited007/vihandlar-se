import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { ScanResult } from './EAdditiveScanner';

interface ShareScanButtonProps {
  scanResults: ScanResult;
}

export const ShareScanButton = ({ scanResults }: ShareScanButtonProps) => {
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const createShareableScan = async () => {
    setSharing(true);
    
    try {
      const { data, error } = await supabase
        .from('shared_scans')
        .insert({
          scan_data: {
            found_e_numbers: scanResults.found_e_numbers,
            risk_summary: scanResults.risk_summary,
            overall_assessment: scanResults.overall_assessment,
            e_additives_data: scanResults.e_additives_data
          }
        })
        .select('share_token')
        .single();

      if (error) throw error;

      return data.share_token;
    } catch (error) {
      console.error('Error creating shareable scan:', error);
      throw error;
    } finally {
      setSharing(false);
    }
  };

  const handleShare = async () => {
    try {
      const shareToken = await createShareableScan();
      const shareUrl = `${window.location.origin}/scan/${shareToken}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'E-ämnen Skanningsresultat',
            text: 'Kolla in detta skanningsresultat från E-ämnen appen:',
            url: shareUrl,
          });
          
          toast({
            title: "Skanning delad!",
            description: "Skanningen har delats framgångsrikt.",
          });
          return;
        } catch (err) {
          // User canceled sharing, fall back to copying
        }
      }
      
      // Fallback to copying link
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Länk kopierad!",
        description: "Dela länken för att visa ditt skanningsresultat.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Kunde inte dela",
        description: "Försök igen senare.",
      });
    }
  };

  return (
    <Button 
      onClick={handleShare} 
      variant="default"
      disabled={sharing}
      className="gap-2"
    >
      {sharing ? (
        <>
          <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Delar...
        </>
      ) : copied ? (
        <>
          <Check className="w-4 h-4" />
          Kopierad!
        </>
      ) : navigator.share ? (
        <>
          <Share2 className="w-4 h-4" />
          Dela skanning
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Kopiera länk
        </>
      )}
    </Button>
  );
};