// types/e-additive.ts

export interface HealthEffects {
  documented: string[];
  suspected: string[];
  benefits: string[];
  risk_groups: string[];
}

export interface CommonProduct {
  category: string;
  products: string[];
  average_amount: string;
}

export interface EAdditive {
  id: string;
  e_number: string;
  name: string;
  common_name: string | null;
  slug: string;
  category: string;
  origin: 'Naturlig' | 'Syntetisk' | 'Naturlig/Syntetisk';
  risk_score: number; // 1-10
  longevity_impact: 'Positiv' | 'Neutral' | 'Negativ';
  adi_value: number | null; // mg/kg kroppsvikt/dag
  adi_source: string | null;
  children_note: string | null;
  short_description: string;
  long_description: string | null;
  health_effects: HealthEffects;
  common_products: CommonProduct[];
  avoidance_tips: string[];
  natural_alternatives: string[];
  meta_title: string;
  meta_description: string;
  created_at?: string;
  updated_at?: string;
}

export interface EAdditiveCategory {
  name: string;
  slug: string;
  count: number;
}

export interface RiskSummary {
  low: number;    // risk_score 1-3
  medium: number; // risk_score 4-6
  high: number;   // risk_score 7-10
}

export interface ScanResult {
  found_e_numbers: string[];
  additives: EAdditive[];
  risk_summary: RiskSummary;
  overall_assessment: string;
  scanned_at: string;
}

// E-nummer kategorier
export const E_CATEGORIES = [
  { name: 'Färgämnen', range: '100-199', slug: 'fargamnen' },
  { name: 'Konserveringsmedel', range: '200-299', slug: 'konserveringsmedel' },
  { name: 'Antioxidationsmedel', range: '300-399', slug: 'antioxidationsmedel' },
  { name: 'Förtjockningsmedel', range: '400-499', slug: 'fortjockningsmedel' },
  { name: 'Surhetsreglerande medel', range: '500-599', slug: 'surhetsreglerande' },
  { name: 'Smakförstärkare', range: '600-699', slug: 'smakforstarkare' },
  { name: 'Sötningsmedel', range: '900-999', slug: 'sotningsmedel' },
] as const;

// Risk levels
export const RISK_LEVELS = {
  LOW: { min: 1, max: 3, label: 'Låg risk', color: 'green' },
  MEDIUM: { min: 4, max: 6, label: 'Medel risk', color: 'yellow' },
  HIGH: { min: 7, max: 10, label: 'Hög risk', color: 'red' },
} as const;

export function getRiskLevel(score: number): typeof RISK_LEVELS[keyof typeof RISK_LEVELS] {
  if (score <= 3) return RISK_LEVELS.LOW;
  if (score <= 6) return RISK_LEVELS.MEDIUM;
  return RISK_LEVELS.HIGH;
}
