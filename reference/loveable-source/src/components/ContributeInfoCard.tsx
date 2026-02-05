import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Send } from 'lucide-react';

interface ContributeInfoCardProps {
  additive: {
    e_number: string;
    name: string;
    slug: string;
  };
}

export function ContributeInfoCard({ additive }: ContributeInfoCardProps) {
  const mailtoUrl = `mailto:hej@vihandlar.se?subject=Förbättra information för ${additive.e_number} - ${additive.name}&body=Hej!%0A%0AJag skulle vilja förbättra informationen om ${additive.e_number} - ${additive.name}.%0A%0AHär är mina förslag:%0A%0A[Beskriv här vad som skulle kunna förbättras eller kompletteras]%0A%0AMvh,%0A[Ditt namn]%0A%0A---%0AReferens: https://vihandlar.se/e-amnen/${additive.slug}`;

  return (
    <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          Förbättra informationen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Har du mer information om {additive.e_number} eller upptäckt något som borde uppdateras? 
          Vi uppskattar ditt bidrag!
        </p>
        
        <div className="bg-blue-100/50 dark:bg-blue-900/20 p-3 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            All information granskas av vårt expertteam innan publicering.
          </p>
        </div>
        
        <Button 
          asChild 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <a href={mailtoUrl}>
            <Send className="w-4 h-4 mr-2" />
            Skicka förbättringsförslag
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}