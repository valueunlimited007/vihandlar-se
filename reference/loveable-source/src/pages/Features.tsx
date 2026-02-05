import { Layout } from '@/components/Layout';
import { Mic, Users, Zap, Smartphone, Shield, Clock, Link2, Check, ArrowUpDown, Vibrate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useShoppingList } from '@/hooks/useShoppingList';
import { SEO } from '@/components/SEO';
import { createOrganizationSchema, createBreadcrumbSchema, createSoftwareApplicationSchema } from '@/utils/schemaMarkup';

const Features = () => {
  const [tipSubmitted, setTipSubmitted] = useState(false);
  const [tipText, setTipText] = useState('');
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const {
    createList
  } = useShoppingList();
  const handleTipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tipText.trim()) {
      // Simulate tip submission
      const mailtoLink = `mailto:hej@vihandlar.se?subject=Tips för ViHandlar&body=${encodeURIComponent(tipText)}`;
      window.location.href = mailtoLink;
      setTipSubmitted(true);
      setTipText('');
    }
  };
  const handleCreateList = async () => {
    if (creating) return;
    setCreating(true);
    try {
      const list = await createList('Min lista');
      if (list) {
        navigate(`/list/${list.share_token}`);
      }
    } finally {
      setCreating(false);
    }
  };

  // SEO Schema Data
  const schemaData = [createOrganizationSchema(), createBreadcrumbSchema([{
    name: "Hem",
    url: "https://vihandlar.se/"
  }, {
    name: "Funktioner",
    url: "https://vihandlar.se/funktioner"
  }]), createSoftwareApplicationSchema()];
  const features = [{
    icon: Mic,
    title: 'Röstinmatning med AI',
    description: 'Säg namnet på varan så läggs den till automatiskt. Använder OpenAI Whisper för perfekt svensk igenkänning.',
    details: ['Optimerad för svenska med Whisper AI', 'Smart filtrering av irrelevant innehåll', 'Fungerar även i bullriga miljöer']
  }, {
    icon: Users,
    title: 'Delning utan registrering',
    description: 'Beständiga länkar som aldrig "dör". Den som får länken kan direkt börja lägga till varor utan att skapa konto.',
    details: ['Permanenta länkar som fungerar för alltid', 'Ingen registrering behövs för mottagaren', 'Fungerar även om skaparen "tappar bort" listan']
  }, {
    icon: Zap,
    title: 'Realtidsuppdatering',
    description: 'Alla ändringar syns direkt för alla som har listan. Bocka av medan du handlar!',
    details: ['Ser ändringar inom sekunder', 'Undvik dubbelköp', 'Följ framstegen i butiken']
  }, {
    icon: Smartphone,
    title: 'Mobiloptimerad',
    description: 'Designad för telefonen först, men fungerar lika bra på surfplatta och dator.',
    details: ['Snabb och responsiv', 'Stor text som är lätt att läsa', 'Fungerar offline grundläggande']
  }, {
    icon: Shield,
    title: 'Säker och privat',
    description: 'Din data behandlas säkert och vi spårar inte vad du handlar.',
    details: ['Krypterad dataöverföring', 'Ingen reklam eller spårning', 'Du äger din data']
  }, {
    icon: Clock,
    title: 'Alltid tillgänglig',
    description: 'Fungerar 24/7 utan nedtid. Listor sparas säkert i molnet.',
    details: ['99.9% tillgänglighet', 'Automatisk backup', 'Snabb global åtkomst']
  }, {
    icon: Smartphone,
    title: 'PWA-funktionalitet',
    description: 'Installera ViHandlar som app på hemskärmen. Fungerar offline och ger appliknande upplevelse.',
    details: ['Installera direkt från webbläsaren', 'Fungerar offline för grundläggande funktioner', 'Snabb start utan appbutik']
  }, {
    icon: Vibrate,
    title: 'Haptisk Feedback',
    description: 'Känslomässig återkoppling genom vibration på mobil för bättre användarupplevelse.',
    details: ['Vibrerar vid knapptryck', 'Bekräftar åtgärder tydligt', 'Förbättrar tillgänglighet']
  }, {
    icon: ArrowUpDown,
    title: 'Smart Sortering',
    description: 'Automatisk organisering av varor efter kategorier för effektivare shopping.',
    details: ['Kategoriserar automatiskt', 'Lär sig dina vanor', 'Optimerar handlingsrutten']
  }];
  return <Layout>
      <SEO title="Funktioner - Allt du behöver veta om ViHandlars inköpslista" description="Upptäck alla funktioner i ViHandlar: röstinmatning med AI, realtidsdelning, smart sortering, haptisk feedback och mycket mer. Perfekt för moderna familjer." keywords="inköpslista funktioner, röstinmatning shopping, realtidsdelning, smart sortering, haptisk feedback, mobiloptimerad handlingslista, säker inköpslista" canonical="https://vihandlar.se/funktioner" focusKeyword="inköpslista funktioner" schemaData={schemaData} />
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">Funktioner som förenklar inköpen</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ViHandlar är byggt för att göra mathandeln smidigare för hela familjen. 
            Upptäck alla sätt som ViHandlar kan förbättra er vardag.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{detail}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>)}
        </div>

        {/* How it Works Section */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold text-center mb-12">
            Så här enkelt fungerar det
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="font-semibold mb-2">Skapa lista</h3>
              <p className="text-muted-foreground text-sm">
                Gå till ViHandlar.se och skapa en ny inköpslista online med ett namn som passar er.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="font-semibold mb-2">Dela länken</h3>
              <p className="text-muted-foreground text-sm">
                Skicka beständiga delningslänken som fungerar för alltid. Även om familjen "tappar bort" listan kan alla med länken fortfarande använda den.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="font-semibold mb-2">Handla tillsammans</h3>
              <p className="text-muted-foreground text-sm">
                Alla kan lägga till varor och bocka av när de är inhandlade. Allt synkas i realtid!
              </p>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-muted/30 rounded-2xl p-8 mb-16">
          <h2 className="font-display text-2xl font-semibold mb-4 text-center">
            Har du tips på funktioner?
          </h2>
          <p className="text-muted-foreground text-center mb-6">
            Vi utvecklar ständigt ViHandlar baserat på användarfeedback. Dela dina idéer med oss!
          </p>
          
          {!tipSubmitted ? <form onSubmit={handleTipSubmit} className="max-w-md mx-auto">
              <div className="space-y-4">
                <textarea value={tipText} onChange={e => setTipText(e.target.value)} placeholder="Berätta om din idé eller funktion du skulle vilja se..." className="w-full p-3 rounded-lg border bg-background min-h-[100px] resize-none" required />
                <Button type="submit" className="w-full">
                  Skicka tips till hej@vihandlar.se
                </Button>
              </div>
            </form> : <div className="text-center">
              <Check className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-primary font-medium">Tack för ditt tips!</p>
              <p className="text-muted-foreground text-sm">Vi har öppnat din e-postapp så du kan skicka meddelandet.</p>
            </div>}
        </div>

         {/* CTA Section */}
         <div className="text-center">
           <h2 className="font-display text-2xl font-semibold mb-4">
             Redo att börja handla tillsammans?
           </h2>
          <p className="text-muted-foreground mb-6">
            Skapa din första delade inköpslista online på mindre än 30 sekunder.
          </p>
          <Button size="lg" onClick={handleCreateList} disabled={creating}>
            {creating ? 'Skapar lista...' : 'Skapa lista →'}
          </Button>
        </div>

      </div>
    </Layout>;
};
export default Features;