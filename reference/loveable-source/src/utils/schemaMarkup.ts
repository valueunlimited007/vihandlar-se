export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ViHandlar",
  "url": "https://vihandlar.se",
  "logo": "https://vihandlar.se/lovable-uploads/293b822e-308d-4be1-9e1e-661b1a9c0a9d.png",
  "description": "Sveriges smartaste delade inköpslista. Skapa, dela och handla tillsammans med familj och vänner. Gratis online inköpslista med röstinmatning och realtidsuppdateringar.",
  "foundingDate": "2024",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "SE",
    "addressRegion": "Sverige"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "info@vihandlar.se",
    "availableLanguage": "Swedish"
  },
  "sameAs": [
    "https://www.facebook.com/vihandlar",
    "https://www.instagram.com/vihandlar", 
    "https://twitter.com/vihandlar"
  ]
});

export const createWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ViHandlar",
  "url": "https://vihandlar.se",
  "description": "Delad inköpslista online - skapa, dela och handla tillsammans",
  "publisher": {
    "@type": "Organization",
    "name": "ViHandlar"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://vihandlar.se/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

export const createBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const createFAQSchema = (faqs: Array<{question: string, answer: string}>) => ({
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
});

export const createHowToSchema = (name: string, steps: Array<{name: string, text: string}>) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": name,
  "description": `Steg-för-steg guide för ${name.toLowerCase()}`,
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text
  }))
});

export const createSoftwareApplicationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ViHandlar",
  "description": "Delad inköpslista online med röstinmatning och realtidsuppdateringar",
  "url": "https://vihandlar.se",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Web Browser, iOS, Android",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "SEK"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1247",
    "bestRating": "5",
    "worstRating": "1"
  },
  "featureList": [
    "Röstinmatning för händer-fri shopping",
    "Realtidsdelning med familj och vänner", 
    "Smart kategorisering av varor",
    "Offline-stöd för shopping utan internet",
    "Prisuppföljning och budgetering",
    "Favoritbutiker och vanliga varor"
  ]
});

// Food-related schema functions for Livsmedel A-Ö section
export const createFoodSchema = (food: any) => ({
  "@context": "https://schema.org",
  "@type": "Food",
  "name": food.name,
  "description": food.short_description,
  "url": `https://vihandlar.se/livsmedel/produkt/${food.slug}`,
  "nutrition": food.calories ? {
    "@type": "NutritionInformation",
    "calories": `${food.calories} kcal`,
    "proteinContent": food.protein ? `${food.protein}g` : undefined,
    "fatContent": food.fat ? `${food.fat}g` : undefined,
    "carbohydrateContent": food.carbohydrates ? `${food.carbohydrates}g` : undefined,
    "fiberContent": food.fiber ? `${food.fiber}g` : undefined,
    "sodiumContent": food.salt ? `${food.salt}g` : undefined,
  } : undefined,
  "category": food.subcategory,
  "storageRequirements": food.storage_method,
  "sameAs": food.alternative_names ? food.alternative_names.map((name: string) => 
    `https://vihandlar.se/livsmedel/produkt/${name.toLowerCase().replace(/\s+/g, '-')}`
  ) : undefined
});

export const createItemListSchema = (listData: {
  name: string;
  description: string;
  items: Array<{name: string; url: string; description: string}>;
}) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": listData.name,
  "description": listData.description,
  "numberOfItems": listData.items.length,
  "itemListElement": listData.items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "url": item.url,
    "description": item.description
  }))
});

// Enhanced schema functions for rich snippets and AI optimization

export const createEducationalSchema = (data: {
  name: string;
  description: string;
  url: string;
  educationalLevel: string;
  learningResourceType: string;
  author: string;
  keywords: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "LearningResource",
  "name": data.name,
  "description": data.description,
  "url": data.url,
  "educationalLevel": data.educationalLevel,
  "learningResourceType": data.learningResourceType,
  "author": {
    "@type": "Organization",
    "name": data.author
  },
  "keywords": data.keywords.join(", "),
  "inLanguage": "sv-SE",
  "isAccessibleForFree": true,
  "educationalUse": "instruction"
});

export const createWebPageSchema = (data: {
  name: string;
  description: string;
  url: string;
  breadcrumbs: Array<{name: string; url: string}>;
  lastReviewed?: string;
  speakable?: {
    cssSelector: string[];
  };
}) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": data.name,
  "description": data.description,
  "url": data.url,
  "mainContentOfPage": {
    "@type": "WebPageElement",
    "cssSelector": "main"
  },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": data.breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  },
  "lastReviewed": data.lastReviewed || new Date().toISOString().split('T')[0],
  "reviewedBy": {
    "@type": "Organization",
    "name": "ViHandlar"
  },
  "isPartOf": {
    "@type": "WebSite",
    "name": "ViHandlar",
    "url": "https://vihandlar.se"
  },
  "inLanguage": "sv-SE",
  "speakable": data.speakable
});

export const createTableSchema = (data: {
  name: string;
  description: string;
  about: string;
  columns: Array<{name: string; description: string}>;
}) => ({
  "@context": "https://schema.org",
  "@type": "Table",
  "name": data.name,
  "description": data.description,
  "about": data.about,
  "columns": data.columns.map(col => ({
    "@type": "PropertyValue",
    "name": col.name,
    "description": col.description
  }))
});