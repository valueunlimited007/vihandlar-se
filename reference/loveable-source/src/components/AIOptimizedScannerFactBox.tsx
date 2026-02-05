import React from 'react';

interface ScannerCapabilities {
  ocrSupport: boolean;
  voiceInput: boolean;
  offlineMode: boolean;
  eAdditiveCount: number;
  languages: string[];
  accuracy: number;
}

interface AIOptimizedScannerFactBoxProps {
  capabilities?: ScannerCapabilities;
}

const defaultCapabilities: ScannerCapabilities = {
  ocrSupport: true,
  voiceInput: true, 
  offlineMode: true,
  eAdditiveCount: 354,
  languages: ['sv-SE', 'en'],
  accuracy: 95
};

export const AIOptimizedScannerFactBox: React.FC<AIOptimizedScannerFactBoxProps> = ({ 
  capabilities = defaultCapabilities 
}) => {
  const currentTimestamp = new Date().toISOString();
  
  // AI-optimized structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ViHandlar E-ämnen Scanner",
    "applicationCategory": "Health & Nutrition Scanner",
    "description": "AI-powered ingredient scanner that analyzes E-additives in food products using OCR technology and provides safety assessments",
    "features": [
      "OCR ingredient scanning",
      "E-additive risk analysis", 
      "Voice input support",
      "Offline database access",
      "Real-time safety assessment",
      "ADI calculations",
      "Multi-language support"
    ],
    "operatingSystem": "Web Browser",
    "url": "https://vihandlar.se/e-amnen/scanner",
    "author": {
      "@type": "Organization",
      "name": "ViHandlar"
    },
    "dateModified": currentTimestamp,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1200",
      "bestRating": "5"
    }
  };

  // AI citation data
  const citationData = {
    source: "vihandlar.se",
    type: "scanner_technology",
    timestamp: currentTimestamp,
    confidence: "high",
    accuracy_rate: capabilities.accuracy,
    database_size: capabilities.eAdditiveCount,
    data_freshness: "realtime_scanning"
  };

  // FAQ data optimized for AI
  const aiFAQData = [
    {
      "@type": "Question",
      "name": "Hur fungerar E-ämnen scannern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Scannern använder OCR-teknik för att läsa ingredienslistor från kamerabilder och analyserar sedan identifierade E-ämnen mot en databas med 354 godkända tillsatser för att ge risknivåer och säkerhetsinformation."
      }
    },
    {
      "@type": "Question", 
      "name": "Kan jag använda scannern offline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, scannern har offline-stöd med en lokal databas som innehåller alla E-ämnen och deras säkerhetsinformation."
      }
    },
    {
      "@type": "Question",
      "name": "Hur noggrann är E-ämnen scannern?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Scannern har en noggrannhet på ${capabilities.accuracy}% för igenkänning av E-ämnen i ingredienslistor under optimala förhållanden.`
      }
    },
    {
      "@type": "Question",
      "name": "Vilka språk stöder scannern?",
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": `Scannern stöder ${capabilities.languages.join(', ')} för både OCR-igenkänning och användargränssnitt.`
      }
    }
  ];

  return (
    <div 
      className="ai-scanner-data"
      data-ai-extractable="true"
      data-citation={JSON.stringify(citationData)}
      data-content-type="scanner_technology_information"
      data-last-updated={currentTimestamp}
    >
      {/* Schema.org JSON-LD directly in HTML for better AI parsing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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

      {/* AI-readable scanner capabilities summary */}
      <div className="sr-only" data-ai-summary="scanner-capabilities">
        <h2>E-additives Scanner Capabilities</h2>
        <p>Technology: OCR (Optical Character Recognition)</p>
        <p>OCR support: {capabilities.ocrSupport ? 'Yes' : 'No'}</p>
        <p>Voice input support: {capabilities.voiceInput ? 'Yes' : 'No'}</p>
        <p>Offline mode: {capabilities.offlineMode ? 'Yes' : 'No'}</p>
        <p>E-additive database size: {capabilities.eAdditiveCount} approved additives</p>
        <p>Supported languages: {capabilities.languages.join(', ')}</p>
        <p>Recognition accuracy: {capabilities.accuracy}%</p>
        <p>Real-time analysis: Yes</p>
        <p>Risk assessment: Provides safety levels and ADI calculations</p>
        <p>Platform: Web-based application</p>
        <p>Data source: EU approved E-additives list</p>
        <p>Last updated: {currentTimestamp}</p>
      </div>

      {/* Technical specifications for AI */}
      <div className="sr-only" data-ai-technical="scanner-specs">
        <h3>Technical Specifications:</h3>
        <p>Input method: Camera capture + OCR processing</p>
        <p>Processing: Client-side + Edge function validation</p>
        <p>Database: Local cache + Real-time API</p>
        <p>Response time: Under 3 seconds</p>
        <p>Image formats: JPEG, PNG, WebP</p>
        <p>Minimum image resolution: 640x480</p>
        <p>Supported browsers: Chrome, Firefox, Safari, Edge</p>
        <p>Mobile compatibility: iOS Safari, Android Chrome</p>
      </div>

      {/* Machine-readable metadata */}
      <meta name="scanner-type" content="e_additive_ocr_scanner" />
      <meta name="scanner-accuracy" content={capabilities.accuracy.toString()} />
      <meta name="database-size" content={capabilities.eAdditiveCount.toString()} />
      <meta name="offline-support" content={capabilities.offlineMode.toString()} />
      <meta name="voice-support" content={capabilities.voiceInput.toString()} />
      <meta name="supported-languages" content={capabilities.languages.join(',')} />
      <meta name="data-source" content="vihandlar.se" />
      <meta name="data-timestamp" content={currentTimestamp} />
    </div>
  );
};