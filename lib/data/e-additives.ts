// lib/data/e-additives.ts
import eAdditivesData from '@/data/e-additives.json';
import type { EAdditive, EAdditiveCategory, RiskSummary } from '@/types/e-additive';

const eAdditives: EAdditive[] = eAdditivesData as EAdditive[];

/**
 * Hämta alla E-ämnen
 */
export function getAllEAdditives(): EAdditive[] {
  return eAdditives;
}

/**
 * Hämta E-ämne via slug
 */
export function getEAdditiveBySlug(slug: string): EAdditive | undefined {
  return eAdditives.find(e => e.slug === slug);
}

/**
 * Hämta E-ämne via E-nummer (t.ex. "E100")
 */
export function getEAdditiveByNumber(eNumber: string): EAdditive | undefined {
  const normalized = eNumber.toUpperCase().replace(/[^E\d]/g, '');
  return eAdditives.find(e => 
    e.e_number.replace(/[^E\d]/g, '') === normalized
  );
}

/**
 * Hämta E-ämnen per kategori
 */
export function getEAdditivesByCategory(category: string): EAdditive[] {
  return eAdditives.filter(e => 
    e.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Hämta E-ämnen per första siffra (t.ex. "1" för E100-E199)
 */
export function getEAdditivesByLetter(letter: string): EAdditive[] {
  return eAdditives.filter(e => {
    const num = e.e_number.replace('E', '');
    return num.charAt(0) === letter;
  });
}

/**
 * Sök E-ämnen
 */
export function searchEAdditives(query: string): EAdditive[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  
  return eAdditives.filter(e => 
    e.name.toLowerCase().includes(q) ||
    e.e_number.toLowerCase().includes(q) ||
    e.common_name?.toLowerCase().includes(q) ||
    e.short_description?.toLowerCase().includes(q)
  );
}

/**
 * Hämta alla kategorier med antal
 */
export function getEAdditiveCategories(): EAdditiveCategory[] {
  const categories = new Map<string, number>();
  
  eAdditives.forEach(e => {
    const count = categories.get(e.category) || 0;
    categories.set(e.category, count + 1);
  });
  
  return Array.from(categories.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, '-').replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/å/g, 'a'),
    count,
  }));
}

/**
 * Slå upp flera E-nummer och beräkna risk
 */
export function lookupEAdditives(eNumbers: string[]): {
  additives: EAdditive[];
  riskSummary: RiskSummary;
  overallAssessment: string;
} {
  const additives = eNumbers
    .map(getEAdditiveByNumber)
    .filter((a): a is EAdditive => a !== undefined);
  
  const riskSummary: RiskSummary = {
    low: additives.filter(a => a.risk_score <= 3).length,
    medium: additives.filter(a => a.risk_score >= 4 && a.risk_score <= 6).length,
    high: additives.filter(a => a.risk_score >= 7).length,
  };
  
  let overallAssessment = 'Låg risk';
  if (riskSummary.high > 0) {
    overallAssessment = 'Hög risk - innehåller problematiska tillsatser';
  } else if (riskSummary.medium > riskSummary.low) {
    overallAssessment = 'Medel risk - vissa tillsatser bör begränsas';
  }
  
  return { additives, riskSummary, overallAssessment };
}

/**
 * Extrahera E-nummer från text (OCR-resultat)
 */
export function extractENumbersFromText(text: string): string[] {
  const patterns = [
    /E\d{3,4}[a-z]?/gi,  // E100, E471a
    /E-\d{3,4}[a-z]?/gi, // E-100
    /E\s\d{3,4}[a-z]?/gi, // E 100
  ];
  
  const eNumbers = new Set<string>();
  
  patterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const normalized = match.toUpperCase().replace(/[^E\d]/g, '');
        eNumbers.add(normalized);
      });
    }
  });
  
  return Array.from(eNumbers).sort();
}

/**
 * Hämta E-ämnen med hög risk
 */
export function getHighRiskAdditives(): EAdditive[] {
  return eAdditives.filter(e => e.risk_score >= 7);
}

/**
 * Hämta säkra E-ämnen (naturliga med låg risk)
 */
export function getSafeAdditives(): EAdditive[] {
  return eAdditives.filter(e => 
    e.risk_score <= 2 && e.origin === 'Naturlig'
  );
}
