import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface EAdditiveUpdate {
  id: string;
  risk_score: number;
  short_description: string;
  long_description: string;
  adi_value?: number;
  adi_source?: string;
  meta_title: string;
  meta_description: string;
  avoidance_tips: string[];
  natural_alternatives: string[];
  longevity_impact: string;
  origin: string;
  common_name?: string;
  children_note?: string;
}

// Specific high-risk E-numbers based on research and international bans
const getSpecificENumberRisk = (e_number: string, name: string) => {
  const specificRisks = {
    'E171': {
      risk_score: 7,
      longevity_impact: 'Hög risk - Nanopartiklar kan penetrera organ och celler',
      origin: 'Syntetisk (titanhaltiga mineraler)',
      common_avoidance: [
        'Undvik vit färgad konfektyr och bakverk',
        'Läs ingrediensförteckningar på tuggummi och glass',
        'Välj naturligt färgade alternativ'
      ],
      common_alternatives: [
        'Kalciumkarbonat för vit färg',
        'Rismjöl som vitgörande medel',
        'Naturligt vita ingredienser som kokosmjöl'
      ],
      ban_info: 'Förbjuden i EU sedan 2022 som färgämne i mat'
    },
    'E102': {
      risk_score: 7,
      longevity_impact: 'Hög risk - Kan orsaka hyperaktivitet hos barn och allergiska reaktioner',
      origin: 'Syntetisk azofärgämne',
      common_avoidance: [
        'Särskilt viktigt att undvika för barn',
        'Undvik gul färgad läsk och godis',
        'Kontrollera ingredienser i senap och såser'
      ],
      common_alternatives: [
        'Kurkumin från gurkmeja',
        'Saffran för gul färg', 
        'Gul paprika extrakt'
      ],
      ban_info: 'Var begränsat i Sverige före EU-medlemskap'
    },
    'E122': {
      risk_score: 8,
      longevity_impact: 'Mycket hög risk - Azofärgämne förbjudet i flera länder',
      origin: 'Syntetisk azofärgämne',
      common_avoidance: [
        'Undvik rött färgad konfektyr och läsk',
        'Särskilt viktigt för barn och astmatiker',
        'Kontrollera ingredienser i bakverk och såser'
      ],
      common_alternatives: [
        'Betanin från rödbetor',
        'Antocyaniner från blåbär och körsbär',
        'Paprikaextrakt för röd färg'
      ],
      ban_info: 'Förbjuden i USA och Kanada, var förbjuden i Sverige före EU'
    },
    'E220': {
      risk_score: 6,
      longevity_impact: 'Måttlig till hög risk - Särskilt farligt för astmatiker',
      origin: 'Syntetisk (förbränning av svavel)',
      common_avoidance: [
        'Astmatiker bör helt undvika',
        'Skölj torkad frukt innan konsumtion',
        'Begränsa vin och öl med sulfiter'
      ],
      common_alternatives: [
        'Färsk frukt istället för torkad',
        'Naturlig torkning utan tillsatser',
        'Vakuumförpackning för konservering'
      ],
      ban_info: 'Reglerat med varningstexter i många länder'
    },
    'E321': {
      risk_score: 7,
      longevity_impact: 'Hög risk - Särskilt farligt för småbarn',
      origin: 'Syntetisk antioxidant',
      common_avoidance: [
        'Undvik helt för gravida och småbarn',
        'Kontrollera ingredienser i tuggummi',
        'Välj naturliga kosttillskott utan BHT'
      ],
      common_alternatives: [
        'Vitamin E (tokoferol)',
        'Askorbinsyra (vitamin C)',
        'Rosmarin extrakt som antioxidant'
      ],
      ban_info: 'Begränsat i många länder för barnprodukter'
    },
    'E431': {
      risk_score: 9,
      longevity_impact: 'Extremt hög risk - Cancerframkallande i djurförsök',
      origin: 'Syntetisk (etylenoxid och stearinsyra - kan vara från gris)',
      common_avoidance: [
        'Undvik helt - ingen säker konsumtionsnivå',
        'Kontrollera ingredienser i vin',
        'Välj ekologiska och naturliga produkter'
      ],
      common_alternatives: [
        'Lecitin från solrosor eller ägg',
        'Naturliga emulgerare från växter',
        'Enkla ingredienser utan tillsatser'
      ],
      ban_info: 'Förbjuden i USA sedan 1952 pga cancerrisker'
    }
  };

  return specificRisks[e_number] || null;
};

// Enhanced risk scores and safety data based on category and chemical properties
const getCategoryRiskData = (category: string, name: string, e_number: string) => {
  // First check for specific high-risk E-numbers
  const specificRisk = getSpecificENumberRisk(e_number, name);
  if (specificRisk) {
    return specificRisk;
  }

  const lowerName = name.toLowerCase();
  const isStarch = lowerName.includes('stärkelse') || lowerName.includes('starch');
  const isPolymer = lowerName.includes('polymer') || lowerName.includes('polyvinyl');
  const isMethacrylate = lowerName.includes('metakrylat');
  
  // Check for high-risk categories and patterns
  let risk_score = 3;
  let longevity_impact = 'Neutral';
  let origin = 'Synthetic';
  let common_avoidance = ['Läs ingrediensförteckningar noga'];
  let common_alternatives = ['Naturliga alternativ när möjligt'];
  
  // Check for azo dyes (automatically high risk)
  if (lowerName.includes('azo') || 
      ['E102', 'E110', 'E122', 'E123', 'E124', 'E129'].includes(e_number)) {
    risk_score = Math.max(risk_score, 7);
    longevity_impact = 'Hög risk - Azofärgämnen kan orsaka allergier och hyperaktivitet';
    common_avoidance = [
      'Särskilt viktigt för barn att undvika',
      'Undvik starkt färgade processat mat',
      'Kontrollera ingredienser i godis och läsk'
    ];
    common_alternatives = [
      'Naturliga färgämnen från frukt och grönsaker',
      'Betanin från rödbetor',
      'Kurkumin från gurkmeja'
    ];
  }

  // Check for nanoparticles
  if (lowerName.includes('titanium') || lowerName.includes('nano') || e_number === 'E171') {
    risk_score = Math.max(risk_score, 7);
    longevity_impact = 'Hög risk - Nanopartiklar kan penetrera kroppens celler';
  }

  // Enhanced category-based risk assessment
  if (category === 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel') {
    if (isStarch) {
      return {
        risk_score: 2,
        longevity_impact: 'Neutral',
        origin: 'Natural',
        common_avoidance: ['Läs ingrediensförteckningar noga'],
        common_alternatives: ['Naturlig stärkelse', 'Agar-agar', 'Xantangummi']
      };
    }
    return {
      risk_score: Math.max(risk_score, 3),
      longevity_impact: risk_score >= 7 ? longevity_impact : 'Neutral',
      origin,
      common_avoidance: risk_score >= 7 ? common_avoidance : ['Välj produkter med naturliga förtjockningsmedel'],
      common_alternatives: risk_score >= 7 ? common_alternatives : ['Agar-agar', 'Guarkärnmjöl', 'Xantangummi']
    };
  }
  
  if (category === 'Färgämnen' || category.toLowerCase().includes('färg') || category.toLowerCase().includes('color')) {
    risk_score = Math.max(risk_score, 5);
    longevity_impact = risk_score >= 7 ? longevity_impact : 'Kan påverka hälsan negativt vid regelbunden konsumtion';
    common_avoidance = risk_score >= 7 ? common_avoidance : [
      'Välj färgfria alternativ när möjligt',
      'Begränsa intag av starkt färgade processat mat',
      'Särskilt viktigt för barn att undvika artificiella färgämnen'
    ];
    common_alternatives = risk_score >= 7 ? common_alternatives : [
      'Betanin från rödbetor för röd färg',
      'Kurkumin från gurkmeja för gul färg',
      'Klorofyll för grön färg',
      'Antocyaniner från bär för blå/lila färg'
    ];
  }

  if (category.toLowerCase().includes('konservering') || category.toLowerCase().includes('preserv')) {
    risk_score = Math.max(risk_score, 4);
    longevity_impact = risk_score >= 7 ? longevity_impact : 'Kan störa tarmfloran vid höga doser';
    common_avoidance = risk_score >= 7 ? common_avoidance : [
      'Välj färska produkter när möjligt',
      'Begränsa processat mat med långa hållbarhetstider',
      'Astmatiker bör vara extra försiktiga med sulfiter'
    ];
    common_alternatives = risk_score >= 7 ? common_alternatives : [
      'Salt och socker för konservering',
      'Torkad frukt istället för konserverad',
      'Färska kryddor med antibakteriella egenskaper'
    ];
  }

  if (category.toLowerCase().includes('antioxidant')) {
    risk_score = Math.max(risk_score, 5);
    longevity_impact = risk_score >= 7 ? longevity_impact : 'Kan ha negativa effekter i syntetisk form';
    common_avoidance = risk_score >= 7 ? common_avoidance : [
      'Välj mat rik på naturliga antioxidanter',
      'Begränsa processat mat med tillsatta antioxidanter',
      'Undvik BHT och BHA helt för barn'
    ];
    common_alternatives = risk_score >= 7 ? common_alternatives : [
      'Vitamin E från nötter och frön',
      'Vitamin C från färsk frukt',
      'Naturliga antioxidanter från bär och gröna blad',
      'Rosmarin extrakt som naturlig antioxidant'
    ];
  }
  
  if (category === 'Övriga tillsatser') {
    if (isPolymer || isMethacrylate) {
      return {
        risk_score: Math.max(risk_score, 4),
        longevity_impact: risk_score >= 7 ? longevity_impact : 'Negativ',
        origin,
        common_avoidance: risk_score >= 7 ? common_avoidance : ['Undvik bearbetade livsmedel', 'Välj ekologiska alternativ'],
        common_alternatives: risk_score >= 7 ? common_alternatives : ['Naturliga beläggningsmedel', 'Bivax', 'Shellack']
      };
    }
    if (lowerName.includes('lysozym')) {
      return {
        risk_score: 2,
        longevity_impact: 'Neutral',
        origin: 'Natural',
        common_avoidance: ['Undvik vid äggallergi'],
        common_alternatives: ['Naturliga konserveringsmetoder', 'Kylförvaring']
      };
    }
    return {
      risk_score: Math.max(risk_score, 3),
      longevity_impact: risk_score >= 7 ? longevity_impact : 'Neutral',
      origin,
      common_avoidance: risk_score >= 7 ? common_avoidance : ['Begränsa konsumtion av bearbetade livsmedel'],
      common_alternatives: risk_score >= 7 ? common_alternatives : ['Naturliga alternativ när möjligt']
    };
  }
  
  // Default for unknown categories
  return {
    risk_score,
    longevity_impact,
    origin,
    common_avoidance,
    common_alternatives
  };
};

// Generate comprehensive descriptions with specific health and ban information
const generateDescriptions = (name: string, e_number: string, category: string) => {
  const lowerName = name.toLowerCase();
  
  // Specific cases for high-risk E-numbers
  if (e_number === 'E171' || lowerName.includes('titandioxid')) {
    return {
      short_description: 'VARNING: Syntetiskt färgämne som ger vit kulör. Förbjuden i EU sedan 2022 pga hälsorisker från nanopartiklar.',
      long_description: `${name} (${e_number}) är ett syntetiskt färgämne som utvinns ur titanhaltiga mineraler och ger vit kulör till livsmedel. Användes tidigare i tuggummi, godis, bakverk, soppor, såser och glass. Tillsatsämnet består delvis av nanopartiklar som misstänks kunna penetrera kroppens organ och celler och enligt forskning kan skada dessa. EU förbjöd E171 som färgämne i mat från och med augusti 2022 på grund av säkerhetsproblem. Nanopartiklarna är så små att de kan passera genom tarmväggen och spridas i kroppen, vilket väcker stora frågor om långsiktiga hälsoeffekter. Forskningsstudier har visat att titandioxid kan ackumuleras i olika organ och potentiellt orsaka inflammation och cellskador.`
    };
  }

  if (e_number === 'E102' || lowerName.includes('tartrazin')) {
    return {
      short_description: 'VARNING: Syntetiskt gult azofärgämne som kan orsaka hyperaktivitet hos barn och allergiska reaktioner.',
      long_description: `${name} (${e_number}) är ett syntetiskt framställt azofärgämne som ger gul färg och används i läsk, såser, smaksatta mjölkprodukter, senap, soppor och fiskrom. Detta azofärgämne kan orsaka allvarliga överkänslighetsreaktioner som astmaanfall, hudutslag och rinnande ögon och näsa. Särskilt problematiskt är att E102 misstänks kunna orsaka hyperaktivitet och uppmärksamhetsproblem hos barn (ADHD-liknande symtom). Innan Sverige gick med i EU fick E102 endast användas i ett fåtal produkter som cocktailbär, sprit och drinkmixer. Många länder kräver nu varningsetiketter på produkter som innehåller E102, särskilt om de riktar sig till barn. Azofärgämnen som E102 bryts ner i kroppen till potentiellt skadliga ämnen som kan påverka nervsystemet.`
    };
  }

  if (e_number === 'E122' || lowerName.includes('azorubin') || lowerName.includes('karmosin')) {
    return {
      short_description: 'VARNING: Syntetiskt rött azofärgämne förbjudet i USA och Kanada. Mycket hög risk för allergier och hyperaktivitet.',
      long_description: `${name} (${e_number}) är ett syntetiskt framställt rött azofärgämne som används i godis, läsk, bakverk, soppor, såser, senap och fiskrom. Detta azofärgämne är förbjudet i både USA och Kanada på grund av dokumenterade hälsorisker. Precis som andra azofärgämnen kan E122 ge upphov till samma allvarliga hälsorisker som E102, inklusive astmaanfall, allergiska reaktioner och misstänkt koppling till hyperaktivitet hos barn. E122 var förbjudet i Sverige före EU-inträdet men fick godkännande genom EU-harmoniseringen. Forskning tyder på att azofärgämnen som E122 kan vara särskilt skadliga för barn med ADHD eller befintliga allergier. Det faktum att både USA och Kanada förbjudit detta ämne talar för betydande säkerhetsproblem.`
    };
  }

  if (e_number === 'E220' || lowerName.includes('svaveldioxid')) {
    return {
      short_description: 'VARNING: Konserveringsmedel som är särskilt farligt för astmatiker och kan orsaka allvarliga andningsproblem.',
      long_description: `${name} (${e_number}) är ett konserveringsmedel som motverkar bakterier och har utvunnits ur förbränning av svavel. I vattenlösning bildar det en syra vars salter kallas sulfiter. Används i torkad frukt, frukt- och grönsaksberedningar, potatismospulver, fiskvaror, öl, vin och spritdrycker. E220 kan orsaka allvarliga överkänslighetsreaktioner, särskilt hos astmatiker där det kan utlösa livhotande astmaanfall. Även personer utan tidigare andningsproblem kan utveckla luftvägsirritation, huvudvärk och magproblem. Sulfiter som E220 förstör viktiga B-vitaminer i maten, särskilt vitamin B1 (tiamin). Många länder kräver nu tydlig märkning av sulfiter på grund av deras allergeniska potential. Astmatiker rekommenderas att helt undvika produkter som innehåller E220.`
    };
  }

  if (e_number === 'E321' || lowerName.includes('butylhydroxitoluen') || lowerName.includes('bht')) {
    return {
      short_description: 'VARNING: Syntetisk antioxidant särskilt farlig för småbarn. Kan orsaka utslag och hormonstörningar.',
      long_description: `${name} (${e_number}) är ett syntetiskt framställt antioxidationsmedel som används i tuggummi och kosttillskott. BHT kan ge utslag hos vissa personer och innebära särskilda hälsorisker för småbarn. Forskningsstudier har visat att BHT kan fungera som hormonförstörande ämne och påverka sköldkörtelfunktionen. Det finns också indikationer på att BHT kan ackumuleras i fettvävnad och påverka immunsystemet negativt. Många länder har begränsat användningen av BHT i produkter riktade till barn på grund av dessa säkerhetsproblem. Ämnet misstänks också kunna påverka leverfunktionen vid långvarig exponering. Gravida kvinnor och småbarn rekommenderas att helt undvika produkter som innehåller E321. Naturliga antioxidanter som vitamin E är mycket säkrare alternativ.`
    };
  }

  if (e_number === 'E431' || lowerName.includes('polyoxietylen')) {
    return {
      short_description: 'EXTREMT FARLIGT: Förbjuden i USA sedan 1952 pga cancerframkallande egenskaper i djurförsök. Undvik helt.',
      long_description: `${name} (${e_number}) är ett stabiliserings- och emulgeringsmedel som används i vin och framställs syntetiskt av etylenoxid och stearinsyra (kan vara från gris). Detta ämne förbjöds i USA redan 1952 efter att djurförsök visat att det är cancerframkallande. E431 har visat sig orsaka tumörer i djurstudier och kan innehålla ohälsosamma biprodukter från tillverkningsprocessen, inklusive etylenoxidrester som är kända carcinogener. Det faktum att USA förbjöd detta ämne för över 70 år sedan medan det fortfarande är tillåtet i vissa andra jurisdiktioner är mycket oroväckande. Ingen säker konsumtionsnivå har kunnat fastställas för E431. Utöver cancerrisken kan ämnet också orsaka allergiska reaktioner och magproblem. Alla konsumenter, särskilt gravida kvinnor och barn, bör helt undvika produkter som innehåller E431.`
    };
  }
  
  // Special cases for existing additives
  if (lowerName.includes('lysozym')) {
    return {
      short_description: 'Naturligt enzym från äggvita som används som konserveringsmedel i vissa ostar och viner.',
      long_description: `${name} (${e_number}) är ett naturligt enzym som främst utvinns från äggvita, men kan även produceras med hjälp av bakterier. Det används som konserveringsmedel i livsmedelsindustrin, särskilt i ostproduktion och vinframställning. Lysozymet bryter ner bakteriecellväggar och hjälper därmed till att förlänga hållbarheten hos produkter. Som ett naturligt ämne anses det generellt säkert, men personer med äggallergi bör vara försiktiga eftersom det oftast utvinns från äggvita. Enzymet har antimikrobiella egenskaper och är därför effektivt för att förhindra bakterietillväxt i livsmedel.`
    };
  }
  
  if (lowerName.includes('stärkelse')) {
    return {
      short_description: 'Modifierad stärkelse som används som förtjocknings- och stabiliseringsmedel i livsmedel.',
      long_description: `${name} (${e_number}) är en kemiskt modifierad form av naturlig stärkelse som används för att förbättra konsistens och hållbarhet i livsmedel. Stärkelsen behandlas för att ge den särskilda egenskaper som gör den mer användbar i livsmedelsindustrin. Den fungerar som förtjockningsmedel, stabiliseringsmedel och kan hjälpa till att bibehålla produkters textur under olika temperatur- och pH-förhållanden. Även om den är baserad på naturlig stärkelse, har den kemiska modifieringen förändrat dess ursprungliga struktur. Den används vanligt i såser, dressingar, bakverk och halvfabrikat.`
    };
  }
  
  if (lowerName.includes('polyvinyl') || lowerName.includes('polymer')) {
    return {
      short_description: 'Syntetisk polymer som används som beläggningsmedel och stabiliserare i läkemedel och vissa livsmedel.',
      long_description: `${name} (${e_number}) är en syntetisk polymer som används inom livsmedelsindustrin och läkemedelsindustrin. Som beläggningsmedel hjälper det till att skydda aktiva ingredienser och förbättra produkters hållbarhet. I livsmedelssammanhang används det främst i tabletter och kapslar för kosttillskott. Även om det anses säkert i små mängder, är det en plastliknande substans som kroppen inte kan bryta ner på samma sätt som naturliga ämnen. Långtidseffekterna av konsumtion av sådana polymerer är fortfarande föremål för forskning, och många föredrar att undvika syntetiska polymerer i sin kost.`
    };
  }
  
  if (lowerName.includes('metakrylat')) {
    return {
      short_description: 'Syntetisk metakrylatpolymer som används som beläggningsmedel i farmaceutiska produkter.',
      long_description: `${name} (${e_number}) är en syntetisk polymer baserad på metakrylat som används som beläggningsmedel, främst i läkemedel och kosttillskott. Den hjälper till att kontrollera frisättningen av aktiva ingredienser och skydda känsliga substanser från miljöpåverkan. I livsmedelsindustrin används den sporadiskt för att belägga tabletter och kapslar. Som en plastliknande substans kan den passera genom kroppen utan att brytas ner, vilket väcker frågor om dess långsiktiga påverkan på hälsan. Många experter rekommenderar att begränsa exponeringen för sådana syntetiska polymerer när naturliga alternativ finns tillgängliga.`
    };
  }
  
  // Enhanced generic descriptions based on category
  if (category.toLowerCase().includes('färgämne') || category.toLowerCase().includes('color')) {
    return {
      short_description: `${name} är ett ${category.toLowerCase()} som kan orsaka allergiska reaktioner och bör undvikas av barn.`,
      long_description: `${name} (${e_number}) är ett artificiellt ${category.toLowerCase()} som används för att ge färg åt olika livsmedelsprodukter. Artificiella färgämnen har kopplats till allergiska reaktioner, hyperaktivitet hos barn och andra hälsoproblem. Många färgämnen i denna kategori kräver särskild försiktighet, särskilt för barn som kan vara mer känsliga för dessa tillsatser. EU kräver nu varningsetiketter på många produkter som innehåller artificiella färgämnen. Det rekommenderas att välja produkter med naturliga färgämnen eller helt undvika starkt färgade processat livsmedel för att minimera hälsoriskerna.`
    };
  }

  if (category.toLowerCase().includes('konservering') || category.toLowerCase().includes('preserv')) {
    return {
      short_description: `${name} är ett konserveringsmedel som kan orsaka allergiska reaktioner och störa tarmfloran.`,
      long_description: `${name} (${e_number}) används som konserveringsmedel för att förhindra bakterietillväxt och förlänga hållbarheten hos livsmedel. Konserveringsmedel kan störa den naturliga tarmfloran och orsaka allergiska reaktioner hos känsliga personer. Vissa konserveringsmedel har också kopplats till astma och andra andningsproblem. För att minimera riskerna rekommenderas att välja färska produkter när det är möjligt och begränsa konsumtionen av hårt processat mat med långa hållbarhetstider.`
    };
  }

  if (category.toLowerCase().includes('antioxidant')) {
    return {
      short_description: `${name} är en syntetisk antioxidant som kan ha negativa hälsoeffekter till skillnad från naturliga antioxidanter.`,
      long_description: `${name} (${e_number}) är en syntetisk antioxidant som används för att förhindra att fetter och oljor blir härsket i livsmedel. Till skillnad från naturliga antioxidanter kan syntetiska varianter ha oönskade bieffekter och ackumuleras i kroppen. Vissa syntetiska antioxidanter har kopplats till hormonförstörande effekter och potentiella cancer risker. Det är säkrare att välja produkter som innehåller naturliga antioxidanter från källor som vitamin E, vitamin C och naturliga växtextrakt.`
    };
  }
  
  if (category === 'Emulgerings-, stabiliserings-, förtjocknings- och geleringsmedel') {
    return {
      short_description: `${name} är ett ${category.toLowerCase()} som används för att förbättra konsistens och hållbarhet i livsmedel.`,
      long_description: `${name} (${e_number}) används som ${category.toLowerCase()} i livsmedelsindustrin. Det hjälper till att stabilisera emulsioner, förtjocka vätskor och förbättra den övergripande texturen hos livsmedelprodukter. Detta tillsatsämne kan hittas i en mängd olika produkter som såser, dressingar, glass och bakverk. Som med många industriella tillsatsämnen rekommenderas måttlig konsumtion, och det är viktigt att vara medveten om dess närvaro i bearbetade livsmedel. Naturliga alternativ finns ofta tillgängliga för de som föredrar att undvika syntetiska tillsatser.`
    };
  }
  
  // Default generic description
  return {
    short_description: `${name} är ett tillsatsämne inom kategorin ${category.toLowerCase()} som används i livsmedelsindustrin.`,
    long_description: `${name} (${e_number}) är ett industriellt tillsatsämne som tillhör kategorin ${category.toLowerCase()}. Det används för att förbättra olika aspekter av livsmedelsprodukter såsom hållbarhet, utseende eller textur. Informationen om detta specifika tillsatsämne är begränsad, men som med alla E-ämnen rekommenderas en medveten konsumtion. Konsumenter som föredrar att undvika industriella tillsatser bör läsa ingrediensförteckningar noga och välja minimalt bearbetade produkter när det är möjligt.`
  };
};

// Generate SEO optimized meta content
const generateSEOMeta = (name: string, e_number: string, category: string, risk_score: number) => {
  const riskLevel = risk_score >= 6 ? 'Hög Risk' : risk_score >= 4 ? 'Måttlig Risk' : 'Låg Risk';
  
  const title = risk_score >= 6 
    ? `${e_number} ${name} - VARNING: ${riskLevel} | Hälsoeffekter & Säkerhet`
    : `${e_number} ${name} - ${riskLevel} | ${category} Guide`;
    
  const description = `${e_number} (${name}) är en ${category.toLowerCase()} med ${riskLevel.toLowerCase()} för hälsoproblem. Läs om användning, biverkningar och naturliga alternativ.`;
  
  return {
    meta_title: title.length > 60 ? title.substring(0, 57) + '...' : title,
    meta_description: description.length > 160 ? description.substring(0, 157) + '...' : description
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting E-additive completion process...');

    // Fetch all unpublished E-additives
    const { data: unpublishedAdditives, error: fetchError } = await supabase
      .from('e_additives')
      .select('*')
      .eq('is_published', false);

    if (fetchError) {
      throw new Error(`Failed to fetch unpublished additives: ${fetchError.message}`);
    }

    console.log(`Found ${unpublishedAdditives?.length || 0} unpublished E-additives`);

    if (!unpublishedAdditives || unpublishedAdditives.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'No unpublished E-additives found',
          updated_count: 0 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Process each additive
    const updates: EAdditiveUpdate[] = [];
    
    for (const additive of unpublishedAdditives) {
      const riskData = getCategoryRiskData(additive.category, additive.name, additive.e_number);
      const descriptions = generateDescriptions(additive.name, additive.e_number, additive.category);
      const seoMeta = generateSEOMeta(additive.name, additive.e_number, additive.category, riskData.risk_score);
      
      // Set ADI value for low-risk additives (typically starch-based)
      let adi_value = null;
      let adi_source = null;
      if (riskData.risk_score <= 2 && additive.name.toLowerCase().includes('stärkelse')) {
        adi_value = 0; // ADI not specified (generally safe)
        adi_source = 'EFSA - Ej specificerat ADI (allmänt säker)';
      }
      
      // Add children note for higher risk additives
      let children_note = null;
      if (riskData.risk_score >= 4) {
        children_note = 'Barn kan vara mer känsliga för syntetiska tillsatsämnen. Konsultera barnläkare vid frågor.';
      }

      updates.push({
        id: additive.id,
        risk_score: riskData.risk_score,
        short_description: descriptions.short_description,
        long_description: descriptions.long_description,
        adi_value,
        adi_source,
        meta_title: seoMeta.meta_title,
        meta_description: seoMeta.meta_description,
        avoidance_tips: riskData.common_avoidance,
        natural_alternatives: riskData.common_alternatives,
        longevity_impact: riskData.longevity_impact,
        origin: riskData.origin,
        children_note
      });
    }

    console.log(`Prepared updates for ${updates.length} E-additives`);

    // Batch update all additives
    const updatePromises = updates.map(async (update) => {
      const { error } = await supabase
        .from('e_additives')
        .update({
          risk_score: update.risk_score,
          short_description: update.short_description,
          long_description: update.long_description,
          adi_value: update.adi_value,
          adi_source: update.adi_source,
          meta_title: update.meta_title,
          meta_description: update.meta_description,
          avoidance_tips: update.avoidance_tips,
          natural_alternatives: update.natural_alternatives,
          longevity_impact: update.longevity_impact,
          origin: update.origin,
          children_note: update.children_note,
          is_published: true, // Publish the additive
          updated_at: new Date().toISOString()
        })
        .eq('id', update.id);

      if (error) {
        console.error(`Failed to update ${update.id}:`, error);
        throw error;
      }
      
      return update.id;
    });

    const updatedIds = await Promise.all(updatePromises);
    
    console.log(`Successfully updated and published ${updatedIds.length} E-additives`);

    // Verify the update
    const { data: publishedCount } = await supabase
      .from('e_additives')
      .select('id', { count: 'exact' })
      .eq('is_published', true);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully completed and published ${updatedIds.length} E-additives`,
        updated_count: updatedIds.length,
        total_published: publishedCount?.length || 0,
        updated_ids: updatedIds
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error completing E-additives:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});