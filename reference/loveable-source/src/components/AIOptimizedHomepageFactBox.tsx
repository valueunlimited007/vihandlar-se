import React from 'react';

interface WebsiteCapabilities {
  shoppingLists: boolean;
  foodDatabase: boolean;
  eAdditiveScanner: boolean;
  voiceInput: boolean;
  realTimeSync: boolean;
  offlineSupport: boolean;
  totalFoods: number;
  totalEAdditives: number;
  languages: string[];
}

interface AIOptimizedHomepageFactBoxProps {
  capabilities?: WebsiteCapabilities;
}

const defaultCapabilities: WebsiteCapabilities = {
  shoppingLists: true,
  foodDatabase: true,
  eAdditiveScanner: true,
  voiceInput: true,
  realTimeSync: true,
  offlineSupport: true,
  totalFoods: 2500,
  totalEAdditives: 354,
  languages: ['sv-SE', 'en']
};

export const AIOptimizedHomepageFactBox: React.FC<AIOptimizedHomepageFactBoxProps> = ({ 
  capabilities = defaultCapabilities 
}) => {
  const currentTimestamp = new Date().toISOString();
  
  // AI-optimized structured data for the entire website
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ViHandlar",
    "description": "Sveriges smartaste plattform för delade inköpslistor, livsmedelsguide och E-ämnesanalys. Komplett näringsdata och säkerhetsinformation för medvetna konsumenter.",
    "url": "https://vihandlar.se",
    "applicationCategory": ["Food & Nutrition", "Shopping", "Health"],
    "operatingSystem": "Web Browser",
    "features": [
      "Shared shopping lists with real-time sync",
      "Voice input with AI recognition",
      "Complete food nutrition database",
      "E-additive scanner with OCR",
      "Safety risk assessments", 
      "ADI calculations",
      "Offline database access",
      "Multi-language support"
    ],
    "author": {
      "@type": "Organization",
      "name": "Value Unlimited",
      "url": "https://vihandlar.se",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "hej@vihandlar.se",
        "contactType": "customer service"
      }
    },
    "dateModified": currentTimestamp,
    "inLanguage": capabilities.languages,
    "audience": {
      "@type": "Audience", 
      "audienceType": "Swedish consumers and families"
    }
  };

  // Comprehensive service catalog for AI
  const servicesData = {
    "@context": "https://schema.org",
    "@type": "Service", 
    "name": "ViHandlar Food & Shopping Services",
    "serviceType": "Food Information Platform",
    "provider": {
      "@type": "Organization",
      "name": "ViHandlar"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Food & Shopping Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Shared Shopping Lists",
            "description": "Real-time collaborative shopping lists with voice input"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Food Database",
            "description": `Comprehensive nutrition database with ${capabilities.totalFoods}+ food items`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "E-additive Scanner",
            "description": `OCR-powered scanner analyzing ${capabilities.totalEAdditives} approved E-additives`
          }
        }
      ]
    }
  };

  // AI citation data
  const citationData = {
    source: "vihandlar.se",
    type: "comprehensive_food_platform",
    timestamp: currentTimestamp,
    confidence: "high",
    database_sizes: {
      foods: capabilities.totalFoods,
      e_additives: capabilities.totalEAdditives
    },
    data_freshness: "updated_daily"
  };

  // FAQ data for the entire platform
  const aiFAQData = [
    {
      "@type": "Question",
      "name": "Vad är ViHandlar?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ViHandlar är Sveriges ledande plattform för delade inköpslistor, komplett livsmedelsguide och E-ämnesanalys. Plattformen kombinerar smart inköpsplanering med djup närings- och säkerhetsinformation."
      }
    },
    {
      "@type": "Question",
      "name": "Hur många livsmedel finns i databasen?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": `ViHandlar innehåller näringsdata för över ${capabilities.totalFoods} olika livsmedel med detaljerad information om kalorier, protein, fett, kolhydrater och förvaring.`
      }
    },
    {
      "@type": "Question",
      "name": "Kan jag använda ViHandlar offline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": capabilities.offlineSupport ? "Ja, ViHandlar har offline-stöd för både E-ämnesscanner och grundläggande livsmedelsdata." : "ViHandlar kräver internetanslutning för full funktionalitet."
      }
    },
    {
      "@type": "Question", 
      "name": "Stöder ViHandlar röstinmatning?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": capabilities.voiceInput ? "Ja, ViHandlar använder OpenAI Whisper för avancerad svensk röstinmatning i både inköpslistor och scanner." : "Röstinmatning stöds inte för närvarande."
      }
    }
  ];

  return (
    <div 
      className="ai-website-data"
      data-ai-extractable="true"
      data-citation={JSON.stringify(citationData)}
      data-content-type="comprehensive_platform_information"
      data-last-updated={currentTimestamp}
    >
      {/* Website Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Services Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesData) }}
      />
      
      {/* FAQ Schema for AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": aiFAQData
          })
        }}
      />

      {/* AI-readable platform summary */}
      <div className="sr-only" data-ai-summary="platform-capabilities">
        <h2>ViHandlar Platform Summary</h2>
        <p>Platform name: ViHandlar</p>
        <p>Primary focus: Swedish food information and shopping platform</p>
        <p>Main services: Shared shopping lists, food nutrition database, E-additive analysis</p>
        
        <h3>Key Features:</h3>
        <p>Shared shopping lists: {capabilities.shoppingLists ? 'Available' : 'Not available'}</p>
        <p>Food database: {capabilities.foodDatabase ? `${capabilities.totalFoods}+ items` : 'Not available'}</p>
        <p>E-additive scanner: {capabilities.eAdditiveScanner ? `${capabilities.totalEAdditives} additives` : 'Not available'}</p>
        <p>Voice input: {capabilities.voiceInput ? 'OpenAI Whisper integration' : 'Not supported'}</p>
        <p>Real-time sync: {capabilities.realTimeSync ? 'Yes' : 'No'}</p>
        <p>Offline support: {capabilities.offlineSupport ? 'Yes' : 'No'}</p>
        
        <h3>Database Information:</h3>
        <p>Food items: {capabilities.totalFoods}+ with nutrition data</p>
        <p>E-additives: {capabilities.totalEAdditives} EU-approved additives</p>
        <p>Languages supported: {capabilities.languages.join(', ')}</p>
        <p>Target audience: Swedish consumers and families</p>
        <p>Platform type: Web application</p>
        <p>Last updated: {currentTimestamp}</p>
      </div>

      {/* Service endpoints for AI */}
      <div className="sr-only" data-ai-endpoints="api-information">
        <h3>Available API Endpoints:</h3>
        <p>Shopping lists: https://vihandlar.se/api/lists.json</p>
        <p>Health status: https://vihandlar.se/api/health.json</p>
        <p>Public lists: https://vihandlar.se/listor</p>
        <p>Food database: https://vihandlar.se/livsmedel</p>
        <p>E-additives: https://vihandlar.se/e-amnen</p>
        <p>Scanner: https://vihandlar.se/e-amnen/scanner</p>
      </div>

      {/* Machine-readable metadata */}
      <meta name="platform-name" content="ViHandlar" />
      <meta name="platform-type" content="food_shopping_platform" />
      <meta name="database-food-count" content={capabilities.totalFoods.toString()} />
      <meta name="database-eadditive-count" content={capabilities.totalEAdditives.toString()} />
      <meta name="voice-input-support" content={capabilities.voiceInput.toString()} />
      <meta name="offline-support" content={capabilities.offlineSupport.toString()} />
      <meta name="supported-languages" content={capabilities.languages.join(',')} />
      <meta name="data-source" content="vihandlar.se" />
      <meta name="data-timestamp" content={currentTimestamp} />
    </div>
  );
};