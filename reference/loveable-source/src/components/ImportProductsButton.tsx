import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, ShoppingCart, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

type ChunkResult = {
  chunk: number;
  offset: number;
  imported: number;
  updated: number;
  errors: number;
  processed: number;
};

export const ImportProductsButton = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [totalChunks] = useState(20); // Max 20 chunks = 300k products
  const [chunkResults, setChunkResults] = useState<ChunkResult[]>([]);
  const [totalImported, setTotalImported] = useState(0);
  const [totalUpdated, setTotalUpdated] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);

  const handleImport = async () => {
    setIsImporting(true);
    setIsCompleted(false);
    setCurrentChunk(0);
    setChunkResults([]);
    setTotalImported(0);
    setTotalUpdated(0);
    setTotalErrors(0);
    
    const CHUNK_SIZE = 15000;
    
    try {
      toast.info('Produktimport från Delitea påbörjad...', {
        description: 'Importerar i chunks om 15,000 produkter åt gången'
      });

      for (let i = 0; i < totalChunks; i++) {
        const offset = i * CHUNK_SIZE;
        setCurrentChunk(i + 1);
        
        console.log(`Starting chunk ${i + 1}/${totalChunks}, offset: ${offset}`);
        
        toast.info(`Chunk ${i + 1}/${totalChunks}`, {
          description: `Importerar produkter ${offset + 1} - ${offset + CHUNK_SIZE}...`
        });

        const { data, error } = await supabase.functions.invoke('import-csv-products', {
          body: { 
            storeSlug: 'delitea',
            offset: offset,
            limit: CHUNK_SIZE
          }
        });
        
        if (error) {
          console.error(`Chunk ${i + 1} error:`, error);
          toast.error(`Chunk ${i + 1} misslyckades`, {
            description: error.message
          });
          break;
        }

        if (data && data.success) {
          const chunkResult: ChunkResult = {
            chunk: i + 1,
            offset,
            imported: data.imported || 0,
            updated: data.updated || 0,
            errors: data.errors || 0,
            processed: data.processed || 0
          };
          
          setChunkResults(prev => [...prev, chunkResult]);
          setTotalImported(prev => prev + (data.imported || 0));
          setTotalUpdated(prev => prev + (data.updated || 0));
          setTotalErrors(prev => prev + (data.errors || 0));
          
          toast.success(`Chunk ${i + 1} klar!`, {
            description: `${data.imported} importerade, ${data.errors} fel`
          });
          
          // Break if no products were processed (end of feed)
          if (data.processed === 0 || (data.imported === 0 && data.updated === 0)) {
            console.log('No more products to import, stopping...');
            break;
          }
        } else {
          console.error(`Chunk ${i + 1} failed:`, data);
          break;
        }
      }
      
      setIsCompleted(true);
      toast.success('Import slutförd!', {
        description: `Totalt: ${totalImported} importerade, ${totalUpdated} uppdaterade, ${totalErrors} fel`
      });
      
    } catch (error) {
      console.error('Error importing products:', error);
      toast.error('Fel vid produktimport', {
        description: error.message || 'Något gick fel vid import från Delitea feed'
      });
    } finally {
      setIsImporting(false);
    }
  };

  const progressPercentage = totalChunks > 0 ? (currentChunk / totalChunks) * 100 : 0;

  return (
    <div className="space-y-4 w-full">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Delitea Produktimport (CSV)
          </CardTitle>
          <CardDescription>
            Importera produkter från Delitea via Adtraction CSV-feed. Max 300,000 produkter i 20 chunks.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={handleImport}
              disabled={isImporting}
              className="gap-2"
            >
              {isImporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Importerar chunk {currentChunk}/{totalChunks}...
                </>
              ) : isCompleted ? (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Import slutförd
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  Starta CSV-import
                </>
              )}
            </Button>
            
            {isCompleted && (
              <Button 
                variant="outline"
                onClick={() => {
                  setIsCompleted(false);
                  setChunkResults([]);
                  setCurrentChunk(0);
                  setTotalImported(0);
                  setTotalUpdated(0);
                  setTotalErrors(0);
                }}
              >
                Rensa resultat
              </Button>
            )}
          </div>

          {isImporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Chunk {currentChunk} av {totalChunks}</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </div>
          )}

          {(isImporting || isCompleted) && (
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalImported}</div>
                <div className="text-sm text-muted-foreground">Importerade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{totalUpdated}</div>
                <div className="text-sm text-muted-foreground">Uppdaterade</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{totalErrors}</div>
                <div className="text-sm text-muted-foreground">Fel</div>
              </div>
            </div>
          )}

          {chunkResults.length > 0 && (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Chunk</TableHead>
                    <TableHead>Offset</TableHead>
                    <TableHead>Processade</TableHead>
                    <TableHead>Importerade</TableHead>
                    <TableHead>Uppdaterade</TableHead>
                    <TableHead>Fel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chunkResults.map((result) => (
                    <TableRow key={result.chunk}>
                      <TableCell>#{result.chunk}</TableCell>
                      <TableCell>{result.offset.toLocaleString()}</TableCell>
                      <TableCell>{result.processed}</TableCell>
                      <TableCell className="text-green-600 font-medium">{result.imported}</TableCell>
                      <TableCell className="text-blue-600">{result.updated}</TableCell>
                      <TableCell className="text-red-600">{result.errors}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
