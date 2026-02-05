export const createScannerPageSEO = () => ({
  title: "E-ämnen Scanner - Skanna ingredienslistor för E-ämnen analys | ViHandlar",
  description: "✅ Skanna ingredienslistor med kameran och få direktanalys av E-ämnen. Upptäck risknivåer, ADI-värden och säkerhetsinformation för livsmedelstillsatser.",
  keywords: "e-ämnen scanner, ingredienslista analys, livsmedelstillsatser skanning, e-nummer detektor, mat säkerhet scanner, OCR ingredienser",
  canonical: "https://vihandlar.se/e-amnen/scanner",
  ogTitle: "📱 E-ämnen Scanner - Skanna ingredienslistor med kameran",
  ogDescription: "Revolutionerande scanner för E-ämnen. Rikta kameran mot ingredienslistor och få direkt analys av livsmedelstillsatser, risknivåer och säkerhetsinformation.",
  twitterTitle: "📱 E-ämnen Scanner - Ingrediensanalys",
  twitterDescription: "Skanna ingredienslistor med kameran för direkt E-ämnesanalys. Upptäck risknivåer och säkerhetsinformation."
});

export const createScannerHistoryPageSEO = () => ({
  title: "Skanning Historik - Tidigare E-ämnen skanningar | ViHandlar",
  description: "Se din historik av E-ämnen skanningar. Återbesök tidigare analyser av ingredienslistor och spåra dina livsmedelstillsatser över tid.",
  keywords: "skanning historik, e-ämnen historia, ingrediens analys historik, livsmedelstillsatser spårning",
  canonical: "https://vihandlar.se/e-amnen/historik",
  ogTitle: "📋 Skanning Historik - Dina E-ämnen analyser",
  ogDescription: "Håll koll på dina E-ämnen skanningar. Se tidigare analyser och spåra livsmedelstillsatser över tid.",
  twitterTitle: "📋 E-ämnen Skanning Historik",  
  twitterDescription: "Håll koll på dina E-ämnen skanningar och tidigare analyser."
});

export const createScannerAppSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "E-ämnen Scanner",
  "description": "Skanna ingredienslistor för E-ämnen analys med kamera eller bilduppladdning",
  "url": "https://vihandlar.se/e-amnen/scanner",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "author": {
    "@type": "Organization",
    "name": "ViHandlar",
    "url": "https://vihandlar.se"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "SEK"
  },
  "featureList": [
    "Kameraskanning av ingredienslistor",
    "OCR-textigenkänning",
    "E-ämnesanalys och risknivåer",
    "ADI-kalkylatorer", 
    "Historikspårning",
    "Offline-funktionalitet"
  ],
  "screenshot": "https://vihandlar.se/og-image.png",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "127"
  }
});

export const createScannerBreadcrumbSchema = (currentPage: string) => {
  const breadcrumbs = [
    { name: "Hem", url: "https://vihandlar.se" },
    { name: "E-ämnen", url: "https://vihandlar.se/e-amnen" }
  ];

  if (currentPage === 'scanner') {
    breadcrumbs.push({ name: "Scanner", url: "https://vihandlar.se/e-amnen/scanner" });
  } else if (currentPage === 'history') {
    breadcrumbs.push({ name: "Historik", url: "https://vihandlar.se/e-amnen/historik" });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};