import React from 'react';
import { Helmet } from 'react-helmet-async';
import { createScannerAppSchema, createScannerBreadcrumbSchema } from '@/utils/scannerSEO';

interface ScannerSEOProps {
  pageType: 'scanner' | 'history';
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

export const ScannerSEO: React.FC<ScannerSEOProps> = ({
  pageType,
  title,
  description,
  keywords,
  canonical
}) => {
  const scannerAppSchema = createScannerAppSchema();
  const breadcrumbSchema = createScannerBreadcrumbSchema(pageType);

  const defaultSEO = {
    scanner: {
      title: "E-ämnen Scanner - Skanna ingredienslistor för E-ämnen analys | ViHandlar",
      description: "✅ Skanna ingredienslistor med kameran och få direktanalys av E-ämnen. Upptäck risknivåer, ADI-värden och säkerhetsinformation för livsmedelstillsatser.",
      keywords: "e-ämnen scanner, ingredienslista analys, livsmedelstillsatser skanning, e-nummer detektor, mat säkerhet scanner, OCR ingredienser",
      canonical: "https://vihandlar.se/e-amnen/scanner"
    },
    history: {
      title: "Skanning Historik - Tidigare E-ämnen skanningar | ViHandlar",
      description: "Se din historik av E-ämnen skanningar. Återbesök tidigare analyser av ingredienslistor och spåra dina livsmedelstillsatser över tid.",
      keywords: "skanning historik, e-ämnen historia, ingrediens analys historik, livsmedelstillsatser spårning",
      canonical: "https://vihandlar.se/e-amnen/historik"
    }
  };

  const seoData = {
    title: title || defaultSEO[pageType].title,
    description: description || defaultSEO[pageType].description,
    keywords: keywords || defaultSEO[pageType].keywords,
    canonical: canonical || defaultSEO[pageType].canonical
  };

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <link rel="canonical" href={seoData.canonical} />
      
      {/* Enhanced meta tags for AI and rich snippets */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="author" content="ViHandlar - E-ämnen experter" />
      <meta name="subject" content="E-ämnen scanner och analys" />
      <meta name="rating" content="General" />
      <meta name="language" content="sv-SE" />
      
      {/* Open Graph */}
      <meta property="og:title" content={pageType === 'scanner' ? "📱 E-ämnen Scanner - Skanna ingredienslistor" : "📋 Skanning Historik - Dina E-ämnen analyser"} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:site_name" content="ViHandlar" />
      <meta property="og:image" content="https://vihandlar.se/og-image.png" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageType === 'scanner' ? "📱 E-ämnen Scanner" : "📋 Skanning Historik"} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:creator" content="@vihandlar" />
      <meta name="twitter:image" content="https://vihandlar.se/og-image.png" />

      {/* App-specific meta tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="theme-color" content="#10b981" />

      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify(scannerAppSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      {/* Preload critical resources for scanner */}
      {pageType === 'scanner' && (
        <>
          <link rel="preload" as="script" href="/src/hooks/useWhisperVoiceInput.tsx" />
          <link rel="prefetch" href="/e-amnen/alla" />
        </>
      )}
    </Helmet>
  );
};