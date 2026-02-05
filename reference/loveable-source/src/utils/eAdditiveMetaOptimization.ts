import { type EAdditive } from '@/hooks/useEAdditives';

// Generate SEO-optimized titles for E-additives
export const generateOptimizedTitle = (additive: EAdditive): string => {
  const { e_number, name, category, risk_score } = additive;
  
  // High risk additives get warning in title
  if ((risk_score || 0) >= 7) {
    return `${e_number} ${name} - VARNING: Hög Risk | Hälsoeffekter & Säkerhet`;
  }
  
  // Medium risk additives
  if ((risk_score || 0) >= 4) {
    return `${e_number} ${name} - Måttlig Risk | Biverkningar & ADI-värde`;
  }
  
  // Low risk additives
  return `${e_number} ${name} - ${category} | Säkert E-ämne Guide`;
};

// Generate SEO-optimized meta descriptions
export const generateOptimizedDescription = (additive: EAdditive): string => {
  const { e_number, name, category, risk_score, adi_value, short_description } = additive;
  
  let description = `${e_number} (${name}) är en ${category.toLowerCase()}`;
  
  // Add risk information
  if ((risk_score || 0) >= 7) {
    description += ` med HÖG RISK för hälsoproblem`;
  } else if ((risk_score || 0) >= 4) {
    description += ` med måttlig hälsorisk`;
  } else {
    description += ` som anses säker`;
  }
  
  // Add ADI information if available
  if (adi_value) {
    description += `. ADI: ${adi_value} mg/kg.`;
  } else {
    description += `.`;
  }
  
  // Add brief description and CTA
  const briefDesc = short_description.length > 60 
    ? short_description.substring(0, 60) + '...'
    : short_description;
    
  description += ` ${briefDesc} Läs mer om biverkningar och var det finns.`;
  
  // Ensure optimal length (150-160 characters)
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return description;
};

// Generate focus keywords for E-additives
export const generateFocusKeywords = (additive: EAdditive): string => {
  const { e_number, name, category } = additive;
  
  const keywords = [
    e_number,
    name.toLowerCase(),
    category.toLowerCase(),
    `${e_number.toLowerCase()} biverkningar`,
    `${e_number.toLowerCase()} hälsoeffekter`,
    `${e_number.toLowerCase()} säkerhet`,
    'livsmedelstillsats',
    'e-ämne'
  ];
  
  return keywords.join(', ');
};

// Generate category-specific titles
export const generateCategoryTitle = (category: string, count: number): string => {
  const categoryTitles: Record<string, string> = {
    'Färgämnen': `${category} (E100-E199) - Alla ${count} Färgämnen | Risker & Biverkningar`,
    'Konserveringsmedel': `${category} (E200-E299) - Guide till ${count} Konserveringsmedel | Säkerhet`,
    'Antioxidanter': `${category} (E300-E399) - Komplett Lista med ${count} Antioxidanter`,
    'Emulgeringsmedel': `${category} (E400-E499) - ${count} Emulgeringsmedel & Stabiliseringsmedel`,
    'Sötningsmedel': `${category} (E950-E999) - Alla ${count} Sötningsmedel | Säkerhet & Biverkningar`
  };
  
  return categoryTitles[category] || `${category} - ${count} E-ämnen | Komplett Guide`;
};

// Generate category descriptions
export const generateCategoryDescription = (category: string, count: number): string => {
  const descriptions: Record<string, string> = {
    'Färgämnen': `Upptäck alla ${count} godkända färgämnen (E100-E199). Lär dig om risker, biverkningar och naturliga alternativ till konstgjorda färgämnen.`,
    'Konserveringsmedel': `Komplett guide till ${count} konserveringsmedel (E200-E299). Säkerhetsinformation, ADI-värden och hur du undviker de farligaste.`,
    'Antioxidanter': `Allt om ${count} antioxidanter som livsmedelstillsatser (E300-E399). Naturliga vs syntetiska, hälsoeffekter och rekommendationer.`,
    'Emulgeringsmedel': `Guide till ${count} emulgeringsmedel och stabiliseringsmedel (E400-E499). Funktion, säkerhet och allergirisker.`,
    'Sötningsmedel': `Fullständig översikt av ${count} artificiella sötningsmedel (E950-E999). Säkerhet, biverkningar och bästa alternativ.`
  };
  
  return descriptions[category] || 
    `Utforska alla ${count} E-ämnen inom kategorin ${category.toLowerCase()}. Detaljerad information om säkerhet, användning och hälsoeffekter.`;
};

// Generate letter-based titles
export const generateLetterTitle = (letter: string, count: number): string => {
  return `E${letter}XX E-ämnen - Alla ${count} E-ämnen som börjar på ${letter} | Komplett Guide`;
};

// Generate letter descriptions  
export const generateLetterDescription = (letter: string, count: number): string => {
  const letterDescriptions: Record<string, string> = {
    '1': `Upptäck alla ${count} färgämnen (E1XX). Från naturliga till syntetiska färgämnen - lär dig om säkerhet och biverkningar.`,
    '2': `Komplett guide till ${count} konserveringsmedel (E2XX). Funktion, säkerhet och vilka du bör undvika för bästa hälsa.`,
    '3': `Allt om ${count} antioxidanter (E3XX). Naturliga och syntetiska antioxidanter som används i livsmedel.`,
    '4': `Guide till ${count} emulgeringsmedel och förtjockningsmedel (E4XX). Funktion och säkerhetsinformation.`,
    '5': `Översikt av ${count} surhetsreglerande medel (E5XX). pH-kontroll i livsmedel och säkerhet.`,
    '6': `Information om ${count} smakförstärkare (E6XX). MSG och andra smakförstärkare - risker och alternativ.`,
    '7': `Guide till ${count} antibiotika och enzymhämmare (E7XX). Säkerhet och användning i livsmedelsindustrin.`,
    '8': `Översikt av ${count} olika livsmedelstillsatser (E8XX). Blandade funktioner och säkerhetsinformation.`,
    '9': `Komplett guide till ${count} sötningsmedel och glasyrmedel (E9XX). Artificiella sötare och ytbehandlingsmedel.`
  };
  
  return letterDescriptions[letter] || 
    `Utforska alla ${count} E-ämnen som börjar med E${letter}XX. Detaljerad säkerhetsinformation och användningsområden.`;
};