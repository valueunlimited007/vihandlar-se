// Most common E-additives for offline functionality
export interface OfflineEAdditive {
  e_number: string;
  name: string;
  risk_score: number;
  short_description: string;
  category: string;
  is_cached: boolean;
}

export const OFFLINE_E_ADDITIVES: OfflineEAdditive[] = [
  // High-priority common additives
  { e_number: "E100", name: "Kurkumin", risk_score: 2, short_description: "Gul naturlig färg från gurkmeja", category: "Färgämne", is_cached: true },
  { e_number: "E101", name: "Riboflavin", risk_score: 1, short_description: "Vitamin B2, gul färg", category: "Färgämne", is_cached: true },
  { e_number: "E102", name: "Tartrazin", risk_score: 7, short_description: "Syntetisk gul färg, kan orsaka allergier", category: "Färgämne", is_cached: true },
  { e_number: "E110", name: "Solnedgångsgult", risk_score: 6, short_description: "Orange syntetisk färg", category: "Färgämne", is_cached: true },
  { e_number: "E120", name: "Karmin", risk_score: 4, short_description: "Röd färg från sköldlöss", category: "Färgämne", is_cached: true },
  
  // Preservatives
  { e_number: "E200", name: "Sorbinsyra", risk_score: 2, short_description: "Naturligt konserveringsmedel", category: "Konserveringsmedel", is_cached: true },
  { e_number: "E202", name: "Kaliumsorbat", risk_score: 2, short_description: "Salt av sorbinsyra", category: "Konserveringsmedel", is_cached: true },
  { e_number: "E210", name: "Bensoesyra", risk_score: 4, short_description: "Konserveringsmedel, kan orsaka allergier", category: "Konserveringsmedel", is_cached: true },
  { e_number: "E211", name: "Natriumbensoat", risk_score: 4, short_description: "Salt av bensoesyra", category: "Konserveringsmedel", is_cached: true },
  { e_number: "E220", name: "Svaveldioxid", risk_score: 5, short_description: "Konserveringsmedel, astmatiker bör undvika", category: "Konserveringsmedel", is_cached: true },
  
  // Antioxidants
  { e_number: "E300", name: "Askorbinsyra", risk_score: 1, short_description: "Vitamin C, naturligt antioxidant", category: "Antioxidationsmedel", is_cached: true },
  { e_number: "E301", name: "Natriumaskorbat", risk_score: 1, short_description: "Salt av vitamin C", category: "Antioxidationsmedel", is_cached: true },
  { e_number: "E306", name: "Tokoferol", risk_score: 1, short_description: "Vitamin E, naturligt antioxidant", category: "Antioxidationsmedel", is_cached: true },
  { e_number: "E320", name: "BHA", risk_score: 7, short_description: "Syntetiskt antioxidant, misstänkt cancerframkallande", category: "Antioxidationsmedel", is_cached: true },
  { e_number: "E321", name: "BHT", risk_score: 6, short_description: "Syntetiskt antioxidant", category: "Antioxidationsmedel", is_cached: true },
  
  // Sweeteners
  { e_number: "E420", name: "Sorbitol", risk_score: 3, short_description: "Sockeralkohol, kan ha laxerande effekt", category: "Sötningsmedel", is_cached: true },
  { e_number: "E421", name: "Mannitol", risk_score: 3, short_description: "Sockeralkohol", category: "Sötningsmedel", is_cached: true },
  { e_number: "E950", name: "Acesulfam-K", risk_score: 4, short_description: "Intensivt sötningsmedel", category: "Sötningsmedel", is_cached: true },
  { e_number: "E951", name: "Aspartam", risk_score: 5, short_description: "Omtvistat sötningsmedel", category: "Sötningsmedel", is_cached: true },
  { e_number: "E952", name: "Cyklamat", risk_score: 4, short_description: "Intensivt sötningsmedel", category: "Sötningsmedel", is_cached: true },
  
  // Thickeners and stabilizers
  { e_number: "E400", name: "Alginsyra", risk_score: 1, short_description: "Naturlig förtjockningsmedel från alger", category: "Förtjockningsmedel", is_cached: true },
  { e_number: "E401", name: "Natriumalginat", risk_score: 1, short_description: "Salt av alginsyra", category: "Förtjockningsmedel", is_cached: true },
  { e_number: "E410", name: "Johannesbrödsgelé", risk_score: 1, short_description: "Naturlig förtjockningsmedel", category: "Förtjockningsmedel", is_cached: true },
  { e_number: "E412", name: "Guargummi", risk_score: 2, short_description: "Naturlig förtjockningsmedel", category: "Förtjockningsmedel", is_cached: true },
  { e_number: "E414", name: "Gummi arabicum", risk_score: 1, short_description: "Naturlig stabiliseringsmedel", category: "Förtjockningsmedel", is_cached: true },
  
  // Emulsifiers
  { e_number: "E322", name: "Lecitin", risk_score: 1, short_description: "Naturlig emulgeringsmedel", category: "Emulgeringsmedel", is_cached: true },
  { e_number: "E471", name: "Mono- och diglycerider", risk_score: 2, short_description: "Emulgeringsmedel", category: "Emulgeringsmedel", is_cached: true },
  { e_number: "E472e", name: "Mono- och diacetylvinsyreestrar", risk_score: 2, short_description: "Emulgeringsmedel", category: "Emulgeringsmedel", is_cached: true },
  { e_number: "E475", name: "Polyglycerolestrar", risk_score: 3, short_description: "Emulgeringsmedel", category: "Emulgeringsmedel", is_cached: true },
  
  // Flavor enhancers
  { e_number: "E621", name: "Mononatriumglutamat", risk_score: 4, short_description: "Smakförstärkare, kan orsaka huvudvärk", category: "Smakförstärkare", is_cached: true },
  { e_number: "E622", name: "Monokaliumglutamat", risk_score: 4, short_description: "Smakförstärkare", category: "Smakförstärkare", is_cached: true },
  
  // Acids and bases
  { e_number: "E330", name: "Citronsyra", risk_score: 1, short_description: "Naturlig syra från citrusfrukter", category: "Syror", is_cached: true },
  { e_number: "E331", name: "Natriumcitrat", risk_score: 1, short_description: "Salt av citronsyra", category: "Syror", is_cached: true },
  { e_number: "E334", name: "Vinsyra", risk_score: 1, short_description: "Naturlig syra från vindruvor", category: "Syror", is_cached: true },
  
  // Common colorings
  { e_number: "E160a", name: "Beta-karoten", risk_score: 1, short_description: "Orange naturlig färg, provitamin A", category: "Färgämne", is_cached: true },
  { e_number: "E160c", name: "Paprikaextrakt", risk_score: 1, short_description: "Naturlig röd färg från paprika", category: "Färgämne", is_cached: true },
  { e_number: "E163", name: "Antocyaniner", risk_score: 1, short_description: "Naturliga färger från bär och frukter", category: "Färgämne", is_cached: true },
  
  // Gases
  { e_number: "E290", name: "Koldioxid", risk_score: 1, short_description: "Gas för kolsyra", category: "Packgas", is_cached: true },
  { e_number: "E941", name: "Kväve", risk_score: 1, short_description: "Inert packgas", category: "Packgas", is_cached: true },
  
  // Anti-caking agents
  { e_number: "E551", name: "Kiseldioxid", risk_score: 2, short_description: "Antiklumpningsmedel", category: "Antiklumpningsmedel", is_cached: true },
  { e_number: "E552", name: "Kalciumsilikat", risk_score: 2, short_description: "Antiklumpningsmedel", category: "Antiklumpningsmedel", is_cached: true },
  
  // Commonly problematic ones to watch
  { e_number: "E104", name: "Kinolongult", risk_score: 6, short_description: "Syntetisk gul färg", category: "Färgämne", is_cached: true },
  { e_number: "E124", name: "Ponceau 4R", risk_score: 7, short_description: "Syntetisk röd färg", category: "Färgämne", is_cached: true },
  { e_number: "E129", name: "Allura röd", risk_score: 6, short_description: "Syntetisk röd färg", category: "Färgämne", is_cached: true },
  { e_number: "E133", name: "Briljantblå", risk_score: 5, short_description: "Syntetisk blå färg", category: "Färgämne", is_cached: true },
  { e_number: "E150d", name: "Karamellklass IV", risk_score: 4, short_description: "Karamellsirap med ammoniak", category: "Färgämne", is_cached: true },
  
  // Natural alternatives people look for
  { e_number: "E170", name: "Kalciumkarbonat", risk_score: 1, short_description: "Naturlig vit färg, kalktillskott", category: "Färgämne", is_cached: true },
  { e_number: "E500", name: "Natriumkarbonat", risk_score: 1, short_description: "Bakpulver", category: "Syrareglerande medel", is_cached: true }
];

// Common E-number patterns for OCR recognition
export const E_NUMBER_PATTERNS = [
  /E\d{3,4}[a-z]?/gi,  // Standard E-numbers like E100, E471a
  /E-\d{3,4}[a-z]?/gi, // With dash E-100
  /E \d{3,4}[a-z]?/gi, // With space E 100
];

export const getOfflineEAdditive = (eNumber: string): OfflineEAdditive | null => {
  const normalizedENumber = eNumber.toUpperCase().replace(/[^E\d]/g, '');
  return OFFLINE_E_ADDITIVES.find(additive => 
    additive.e_number.replace(/[^E\d]/g, '') === normalizedENumber
  ) || null;
};

export const extractENumbersFromText = (text: string): string[] => {
  const eNumbers: string[] = [];
  
  E_NUMBER_PATTERNS.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const normalized = match.toUpperCase().replace(/[^E\d]/g, '');
        if (!eNumbers.includes(normalized)) {
          eNumbers.push(normalized);
        }
      });
    }
  });
  
  return eNumbers;
};

export const getOfflineAnalysis = (eNumbers: string[]) => {
  const foundAdditives = eNumbers
    .map(getOfflineEAdditive)
    .filter(Boolean) as OfflineEAdditive[];
  
  const riskSummary = {
    low: foundAdditives.filter(a => a.risk_score <= 3).length,
    medium: foundAdditives.filter(a => a.risk_score >= 4 && a.risk_score <= 6).length,
    high: foundAdditives.filter(a => a.risk_score >= 7).length
  };
  
  let overallAssessment = "Låg risk";
  if (riskSummary.high > 0) {
    overallAssessment = "Hög risk";
  } else if (riskSummary.medium > riskSummary.low) {
    overallAssessment = "Medel risk";
  }
  
  return {
    foundAdditives,
    riskSummary,
    overallAssessment,
    isOfflineAnalysis: true
  };
};