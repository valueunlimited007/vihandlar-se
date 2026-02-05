import { Layout } from '@/components/Layout';
import { ShoppingCart, Users, Smartphone, Clock, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useState } from 'react';
import { SEO } from '@/components/SEO';
import { createOrganizationSchema, createFAQSchema, createBreadcrumbSchema, createHowToSchema } from '@/utils/schemaMarkup';

const ShoppingListSEO = () => {
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();
  const { createList } = useShoppingList();

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
  const schemaData = [
    createOrganizationSchema(),
    createBreadcrumbSchema([
      { name: "Hem", url: "https://vihandlar.se/" },
      { name: "Inköpslista Online", url: "https://vihandlar.se/inkopslista" }
    ]),
    createFAQSchema([
      {
        question: "Vad är en delad inköpslista online?",
        answer: "En delad inköpslista online är en digital lista som flera personer kan redigera samtidigt. Med ViHandlar kan familjer och vänner lägga till varor, bocka av köpt och se uppdateringar i realtid."
      },
      {
        question: "Kostar det att använda ViHandlar?",
        answer: "Nej, ViHandlar är helt gratis att använda. Du behöver inte ens registrera dig för att skapa och dela inköpslistor."
      },
      {
        question: "Kan jag använda röstinmatning?",
        answer: "Ja! ViHandlar har avancerad AI-röstinmatning som använder OpenAI Whisper för perfekt svensk förståelse. Säg bara namnet på varan så läggs den till automatiskt med intelligent parsning av kvantitet och enhet."
      }
    ]),
    createHowToSchema(
      "Använda delad inköpslista online",
      [
        { name: "Skapa lista", text: "Besök vihandlar.se och klicka 'Skapa lista'" },
        { name: "Dela länken", text: "Kopiera den unika länken och dela med familj/vänner" },
        { name: "Lägg till varor", text: "Alla kan nu lägga till varor med text eller röst" },
        { name: "Handla", text: "Bocka av varor medan du handlar i butiken" }
      ]
    )
  ];

  return (
    <Layout>
      <SEO 
        title="Inköpslista Online - Gratis Delad Handlingslista för Familjen"
        description="Skapa gratis inköpslista online och dela med familjen. Smart handlingslista med röstinmatning och realtidsuppdateringar. Börja handla tillsammans idag!"
        keywords="inköpslista online, gratis handlingslista, delad inköpslista, familjens inköpslista, handlingsapp, smart inköpslista, digitala handlingslistor"
        canonical="https://vihandlar.se/inkopslista"
        focusKeyword="inköpslista online"
        schemaData={schemaData}
      />
      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* SEO Hero */}
        <div className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
            Inköpslista Online - Dela i Realtid
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Skapa smarta inköpslistor med AI-assisterad röstinmatning som hela familjen kan använda samtidigt. 
            ViHandlar är den moderna inköpslistan online som synkroniseras i realtid mellan alla enheter.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold mb-8 text-center">
            Varför välja ViHandlar som din digitala inköpslista?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Dela utan krångel</h3>
                  <p className="text-muted-foreground text-sm">
                    Skicka en beständig länk till familjen som aldrig slutar fungera. Alla kan direkt börja lägga till varor 
                    utan app-installation eller registrering. Länken fungerar även om ursprungsskaparen "tappar bort" listan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Spara tid i butiken</h3>
                  <p className="text-muted-foreground text-sm">
                    Se i realtid vad andra familjemedlemmar lägger till. 
                    Bocka av varor medan du handlar så andra ser vad som är kvar.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Smart & Intelligent</h3>
                  <p className="text-muted-foreground text-sm">
                    AI-driven röstinmatning, automatisk smart sortering efter kategorier, 
                    och haptisk feedback för en perfekt shoppingupplevelse.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">PWA-upplevelse</h3>
                  <p className="text-muted-foreground text-sm">
                    Installera som app på hemskärmen för snabb åtkomst. 
                    Fungerar offline och ger en app-liknande användarupplevelse.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Perfekt för:</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Familjer som handlar tillsammans</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Par som delar hushållsansvar</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Kompisar som planerar fest eller middag</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Alla som vill slippa glömma varor</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">De som uppskattar enkelhet</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">Alla som vill ha beständiga länkar som aldrig "dör"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to use Section */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold mb-8">
            Så använder du ViHandlar inköpslista online
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-2">Skapa din inköpslista</h3>
                <p className="text-muted-foreground">
                  Gå till ViHandlar.se och ge din lista ett namn. Till exempel "ICA Maxi" eller "Veckohandling". 
                  Du kan börja lägga till varor direkt.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-2">Dela med familjen</h3>
                <p className="text-muted-foreground">
                  Tryck på delningsknappen och skicka länken via SMS, WhatsApp eller mejl. 
                  Den som får länken kan börja använda listan direkt utan att registrera sig.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-2">Handla smidigt</h3>
                <p className="text-muted-foreground">
                  Alla kan lägga till varor hemma innan handlingen. I butiken bockar ni av varor 
                  och ser direkt vad som är kvar att köpa. Använd AI-assisterad röstinmatning när händerna är fulla. 
                  Smart sortering ordnar varorna logiskt för effektivare shopping. Ingen risk för dubbelköp!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-semibold mb-8">
            Vanliga frågor om inköpslistor
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Kan flera personer använda samma inköpslista?</h3>
              <p className="text-muted-foreground">
                Ja! Det är precis det som gör ViHandlar så användbart. Alla som har länken kan lägga till varor, 
                redigera och bocka av saker i realtid. Perfect för familjer och hushåll.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Behöver jag ladda ner en app för inköpslistan?</h3>
              <p className="text-muted-foreground">
                Nej, ViHandlar fungerar direkt i webbläsaren på alla enheter. Du kan skapa en genväg 
                på hemskärmen om du vill, men ingen app behöver laddas ner.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Kostar det något att använda ViHandlar?</h3>
              <p className="text-muted-foreground">
                ViHandlar är helt gratis att använda. Vi har inga annonser eller dolda kostnader.
                Vårt mål är att göra mathandlingen enklare för alla familjer.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Fungerar inköpslistan utan internet?</h3>
              <p className="text-muted-foreground">
                Grundfunktionerna fungerar även utan internet. Du kan se din lista och bocka av varor. 
                Ändringarna synkroniseras när du får internetuppkoppling igen.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Kan jag använda röstinmatning för att lägga till varor?</h3>
              <p className="text-muted-foreground">
                Ja! ViHandlar har avancerad AI-röstinmatning som använder OpenAI Whisper för perfekt svensk förståelse. 
                Säg bara "2 kg potatis" eller "en liter mjölk" så parsas kvantitet och enhet automatiskt.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Sorteras varorna automatiskt?</h3>
              <p className="text-muted-foreground">
                Ja! ViHandlar använder smart sortering som automatiskt kategoriserar varor (frukt, grönt, mejeri, etc.) 
                och organiserar listan för effektivare shopping som följer butikens layout.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Slutar länken att fungera om jag tappar bort den?</h3>
              <p className="text-muted-foreground">
                Nej! ViHandlars delningslänkar är permanenta och "dör" aldrig. Även om du som skapade listan tappar bort den, 
                så fortsätter länken att fungera för alla andra som har den. Detta gör våra listor särskilt pålitliga för familjer.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
          <ShoppingCart className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="font-display text-2xl font-semibold mb-4">
            Skapa din första delade inköpslista nu
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Prova ViHandlar idag och upplev hur enkelt det kan vara att handla tillsammans. 
            Ingen registrering krävs för att komma igång.
          </p>
          <Button size="lg" className="text-lg px-8" onClick={handleCreateList} disabled={creating}>
            {creating ? 'Skapar lista...' : 'Skapa lista →'}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingListSEO;