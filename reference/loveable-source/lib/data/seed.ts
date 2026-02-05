export type PublicList = {
  slug: string;
  title: string;
  description?: string | null;
  lang: string;
  is_public?: boolean;
  updated_at: string;
  created_at?: string;
};

export type PublicItem = {
  name: string;
  quantity?: string | null;
  category?: string | null;
  checked: boolean;
  position: number;
};

export const SEED_LISTS: PublicList[] = [
  {
    slug: "basinkop",
    title: "Basinköp",
    description: "Enkel vardagslista för basvaror.",
    lang: "sv-SE",
    updated_at: new Date().toISOString(),
  },
  {
    slug: "storhandling",
    title: "Storhandling",
    description: "Veckovis storhandel med allt som behövs.",
    lang: "sv-SE",
    updated_at: new Date().toISOString(),
  },
  {
    slug: "bbq-helg",
    title: "BBQ-helg",
    description: "Grillfestens inköp för en perfekt helg.",
    lang: "sv-SE",
    updated_at: new Date().toISOString(),
  },
];

export const SEED_ITEMS: Record<string, PublicItem[]> = {
  basinkop: [
    { name: "Mjölk", quantity: "1 l", category: "Mejeri", checked: false, position: 0 },
    { name: "Bröd", quantity: "1", category: "Bageri", checked: false, position: 1 },
    { name: "Ägg", quantity: "12", category: "Mejeri", checked: false, position: 2 },
  ],
  storhandling: [
    { name: "Pasta", quantity: "2", category: "Torrvaror", checked: false, position: 0 },
    { name: "Krossade tomater", quantity: "4", category: "Konserver", checked: false, position: 1 },
    { name: "Kaffe", quantity: "1", category: "Dryck", checked: false, position: 2 },
  ],
  "bbq-helg": [
    { name: "Grillkol", quantity: "1 säck", category: "Övrigt", checked: false, position: 0 },
    { name: "Entrecôte", quantity: "1 kg", category: "Kött", checked: false, position: 1 },
    { name: "Majskolvar", quantity: "4", category: "Grönt", checked: false, position: 2 },
  ],
};
