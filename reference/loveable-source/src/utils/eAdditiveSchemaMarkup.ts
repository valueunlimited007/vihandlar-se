// E-additive specific schema markup functions

export const createEAdditiveSchema = (additive: any) => ({
  "@context": "https://schema.org",
  "@type": ["ChemicalSubstance", "Product", "Thing"],
  "name": `${additive.e_number} - ${additive.name}`,
  "alternateName": [
    additive.e_number,
    additive.common_name,
    ...(additive.alternative_names || [])
  ].filter(Boolean),
  "description": additive.short_description,
  "disambiguatingDescription": additive.long_description,
  "url": `https://vihandlar.se/e-amnen/${additive.slug}`,
  "sameAs": [
    `https://en.wikipedia.org/wiki/${additive.e_number}`,
    `https://www.efsa.europa.eu/en/topics/topic/food-additives`
  ],
  "identifier": [
    {
      "@type": "PropertyValue",
      "name": "E-nummer",
      "value": additive.e_number
    },
    {
      "@type": "PropertyValue", 
      "name": "CAS-nummer",
      "value": additive.cas_number
    }
  ].filter(Boolean),
  "category": additive.category,
  "hasApplication": additive.applications || [],
  "manufacturer": {
    "@type": "Organization",
    "name": "Kemisk industri"
  },
  "potentialAction": additive.adi_value ? {
    "@type": "ConsumeAction",
    "name": "ADI-beräkning",
    "description": `Säkert dagligt intag: ${additive.adi_value} mg/kg kroppsvikt`,
    "target": `https://vihandlar.se/e-amnen/${additive.slug}#adi-calculator`
  } : undefined,
  "additionalProperty": [
    {
      "@type": "PropertyValue", 
      "name": "Risknivå",
      "value": `${additive.risk_score}/10`,
      "description": "Vetenskapligt baserad riskbedömning (1=låg risk, 10=hög risk)",
      "minValue": 1,
      "maxValue": 10
    },
    additive.adi_value ? {
      "@type": "PropertyValue",
      "name": "ADI-värde", 
      "value": `${additive.adi_value} mg/kg`,
      "description": "Acceptabelt dagligt intag per kg kroppsvikt",
      "unitText": "mg/kg"
    } : undefined,
    additive.origin ? {
      "@type": "PropertyValue",
      "name": "Ursprung",
      "value": additive.origin,
      "description": "Naturligt eller syntetiskt ursprung"
    } : undefined,
    additive.longevity_impact ? {
      "@type": "PropertyValue", 
      "name": "Longevity-påverkan",
      "value": additive.longevity_impact,
      "description": "Potentiell påverkan på livslängd"
    } : undefined,
    {
      "@type": "PropertyValue",
      "name": "Kategori",
      "value": additive.category,
      "description": "Funktionell kategori för livsmedelstillsats"
    },
    additive.approval_status ? {
      "@type": "PropertyValue",
      "name": "Godkännandestatus",
      "value": additive.approval_status,
      "description": "Regulatorisk godkännandestatus"
    } : undefined
  ].filter(Boolean),
  "aggregateRating": additive.risk_score ? {
    "@type": "AggregateRating",
    "ratingValue": (11 - (additive.risk_score || 5)), // Invert score (higher score = lower safety)
    "bestRating": 10,
    "worstRating": 1,
    "ratingCount": 1,
    "reviewCount": 1,
    "ratingExplanation": "Säkerhetsbetyg baserat på vetenskaplig forskning"
  } : undefined,
  "review": additive.health_effects ? {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": (11 - (additive.risk_score || 5)),
      "bestRating": 10,
      "worstRating": 1
    },
    "name": `Säkerhetsbedömning av ${additive.e_number}`,
    "reviewBody": `Risknivå: ${additive.risk_score}/10. ${additive.short_description}`,
    "author": {
      "@type": "Organization",
      "name": "ViHandlar Expertpanel"
    }
  } : undefined
});

export const createEAdditiveArticleSchema = (additive: any) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": `${additive.e_number} ${additive.name} - Hälsoeffekter och säkerhet`,
  "alternativeHeadline": `Allt om ${additive.e_number} (${additive.name}) - Risker och användning`,
  "description": additive.meta_description || additive.short_description,
  "url": `https://vihandlar.se/e-amnen/${additive.slug}`,
  "mainEntityOfPage": `https://vihandlar.se/e-amnen/${additive.slug}`,
  "datePublished": "2024-01-01T00:00:00+01:00",
  "dateModified": new Date().toISOString(),
  "author": {
    "@type": "Organization",
    "name": "ViHandlar",
    "url": "https://vihandlar.se",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vihandlar.se/lovable-uploads/293b822e-308d-4be1-9e1e-661b1a9c0a9d.png"
    }
  },
  "publisher": {
    "@type": "Organization", 
    "name": "ViHandlar",
    "url": "https://vihandlar.se",
    "logo": {
      "@type": "ImageObject",
      "url": "https://vihandlar.se/lovable-uploads/293b822e-308d-4be1-9e1e-661b1a9c0a9d.png",
      "width": 400,
      "height": 400
    }
  },
  "about": {
    "@type": "ChemicalSubstance",
    "name": additive.name,
    "identifier": additive.e_number,
    "category": additive.category
  },
  "mentions": [
    {
      "@type": "Thing",
      "name": "Livsmedelstillsatser"
    },
    {
      "@type": "Thing", 
      "name": "E-ämnen"
    },
    {
      "@type": "Thing",
      "name": additive.category
    }
  ],
  "keywords": [
    additive.e_number,
    additive.name,
    additive.category,
    "livsmedelstillsats",
    "e-ämne",
    "säkerhet",
    "hälsoeffekter",
    "ADI-värde",
    "risknivå",
    "biverkningar"
  ].filter(Boolean).join(", "),
  "articleSection": "E-ämnen Guide",
  "wordCount": additive.long_description ? additive.long_description.length : additive.short_description.length,
  "inLanguage": "sv-SE",
  "isAccessibleForFree": true,
  "genre": "Informationsartikel",
  "educationalLevel": "Allmänheten",
  "audience": {
    "@type": "Audience",
    "audienceType": "Konsumenter och hälsointresserade"
  }
});

export const createHealthEffectsFAQSchema = (additive: any) => {
  const healthEffects = additive.health_effects as any || {};
  const faqs = [];

  // Create FAQ items based on available health effects data
  if (healthEffects.documented?.length > 0) {
    faqs.push({
      question: `Vilka dokumenterade biverkningar har ${additive.e_number}?`,
      answer: `Dokumenterade biverkningar av ${additive.e_number} inkluderar: ${healthEffects.documented.join(', ')}.`
    });
  }

  if (healthEffects.suspected?.length > 0) {
    faqs.push({
      question: `Finns det misstänkta hälsoeffekter av ${additive.e_number}?`,
      answer: `Misstänkta effekter inkluderar: ${healthEffects.suspected.join(', ')}.`
    });
  }

  if (additive.adi_value) {
    faqs.push({
      question: `Vad är det säkra dagliga intaget (ADI) för ${additive.e_number}?`,
      answer: `Det acceptabla dagliga intaget (ADI) för ${additive.e_number} är ${additive.adi_value} mg per kg kroppsvikt per dag.`
    });
  }

  if (additive.children_note) {
    faqs.push({
      question: `Är ${additive.e_number} säkert för barn?`,
      answer: additive.children_note
    });
  }

  if (additive.avoidance_tips?.length > 0) {
    faqs.push({
      question: `Hur kan jag undvika ${additive.e_number}?`,
      answer: `För att undvika ${additive.e_number}: ${additive.avoidance_tips.join(', ')}.`
    });
  }
  
  // Add sulfite-specific FAQs for E220-E228
  if (additive.e_number.match(/^E22[0-8]$/)) {
    faqs.push({
      question: `Är ${additive.e_number} farligt för astmatiker?`,
      answer: `Ja, ${additive.e_number} kan vara mycket farligt för astmatiker och personer med sulfitöverkänslighet. Det kan utlösa allvarliga astmaanfall och allergiska reaktioner. Astmatiker bör undvika produkter med sulfiter helt eller konsultera läkare innan konsumtion.`
    });
    
    faqs.push({
      question: `Vilka produkter innehåller mest ${additive.e_number}?`,
      answer: `${additive.e_number} förekommer främst i vin (10-350 mg/l), torkad frukt (500-3000 mg/kg), potatisprodukter (50-400 mg/kg), juice och fruktdrycker (10-200 mg/l) samt skaldjur (30-100 mg/kg).`
    });
  }

  return faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage", 
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;
};

export const createEAdditiveBreadcrumbSchema = (additive: any) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Hem",
      "item": "https://vihandlar.se"
    },
    {
      "@type": "ListItem", 
      "position": 2,
      "name": "E-ämnen",
      "item": "https://vihandlar.se/e-amnen"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": `${additive.e_number} ${additive.name}`,
      "item": `https://vihandlar.se/e-amnen/${additive.slug}`
    }
  ]
});