import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Download, RefreshCw, FileDown } from 'lucide-react';

export default function SitemapGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<string[]>([]);

  const generateSitemaps = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-static-sitemaps');

      if (error) throw error;

      toast.success('Sitemaps genererade!', {
        description: `${data.files.length} filer skapades i Supabase Storage`
      });

      setLastGenerated(data.timestamp);
      setGeneratedFiles(data.files);
    } catch (error) {
      console.error('Error generating sitemaps:', error);
      toast.error('Fel vid generering av sitemaps', {
        description: error.message
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAllSitemaps = async () => {
    setIsDownloading(true);
    const projectId = 'giznqbjxcxllmgamxgaa';
    
    const files = [
      'sitemap.xml',
      'sitemap-main.xml',
      ...Array.from({ length: 8 }, (_, i) => `sitemap-products-${i + 1}.xml`)
    ];

    try {
      // Download each file
      for (const filename of files) {
        const url = `https://${projectId}.supabase.co/storage/v1/object/public/sitemaps/${filename}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to download ${filename}`);
        }

        const content = await response.text();
        const blob = new Blob([content], { type: 'application/xml' });
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(downloadUrl);

        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      toast.success('Alla sitemap-filer nedladdade!', {
        description: 'Kopiera nu filerna till public/ mappen i Dev Mode'
      });
    } catch (error) {
      console.error('Error downloading sitemaps:', error);
      toast.error('Fel vid nedladdning', {
        description: error.message
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statiska Sitemaps</CardTitle>
        <CardDescription>
          Genererar XML sitemap-filer och sparar dem i Supabase Storage för snabb åtkomst
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            onClick={generateSitemaps} 
            disabled={isGenerating}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Genererar...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Generera Sitemaps
              </>
            )}
          </Button>

          {generatedFiles.length > 0 && (
            <Button 
              onClick={downloadAllSitemaps}
              variant="outline"
              className="gap-2"
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Laddar ner...
                </>
              ) : (
                <>
                  <FileDown className="h-4 w-4" />
                  Ladda ner alla XML-filer
                </>
              )}
            </Button>
          )}
        </div>

        {lastGenerated && (
          <div className="text-sm text-muted-foreground">
            <p>Senast genererad: {new Date(lastGenerated).toLocaleString('sv-SE')}</p>
            <p className="mt-2">
              Genererade filer: {generatedFiles.join(', ')}
            </p>
            <p className="mt-2 font-medium">
              Storage URL: https://giznqbjxcxllmgamxgaa.supabase.co/storage/v1/object/public/sitemaps/sitemap.xml
            </p>
          </div>
        )}

        <div className="p-4 bg-muted rounded-lg space-y-3 text-sm">
          <div>
            <p className="font-medium mb-2">📥 Steg 1: Ladda ner XML-filer</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Klicka på "Ladda ner alla XML-filer" ovan</li>
              <li>Alla 10 sitemap-filer kommer laddas ner till din dator</li>
            </ol>
          </div>
          
          <div>
            <p className="font-medium mb-2">📂 Steg 2: Kopiera till public/</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Aktivera Dev Mode (toggle i övre vänstra hörnet)</li>
              <li>Navigera till public/ mappen</li>
              <li>Kopiera alla nedladdade XML-filer till public/ mappen</li>
              <li>Bekräfta att alla 10 filer finns i public/</li>
            </ol>
          </div>

          <div>
            <p className="font-medium mb-2">✅ Steg 3: Verifiera</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Besök <a href="https://vihandlar.se/sitemap.xml" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vihandlar.se/sitemap.xml</a></li>
              <li>Kontrollera att du får XML (inte HTML)</li>
              <li>Lägg till sitemap i Google Search Console</li>
            </ol>
          </div>

          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
            <p className="text-xs text-yellow-700 dark:text-yellow-400">
              ⚠️ <strong>OBS:</strong> Du måste manuellt kopiera filerna till public/ eftersom Lovable inte tillåter automatisk filskrivning.
              Detta behöver bara göras en gång eller när du vill uppdatera sitemaps.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
