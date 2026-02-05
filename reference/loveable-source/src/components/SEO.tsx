import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schemaData?: any | any[]; // Support both single schema and array
  noindex?: boolean;
  focusKeyword?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  alternateLanguages?: Array<{
    hreflang: string;
    href: string;
  }>;
}

export const SEO = ({ 
  title, 
  description, 
  keywords,
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  schemaData,
  noindex = false,
  focusKeyword,
  article,
  twitterCard = 'summary_large_image',
  alternateLanguages
}: SEOProps) => {
  const fullTitle = title.includes('ViHandlar') ? title : `${title} | ViHandlar`;
  const currentUrl = canonical || (typeof window !== 'undefined' ? window.location.href : '');
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const ogImageUrl = ogImage?.startsWith('http') ? ogImage : `https://vihandlar.se${ogImage}`;
  
  // Optimize description length for better SEO (150-160 characters)
  const optimizedDescription = description.length > 160 
    ? description.substring(0, 157) + '...'
    : description;

  // Generate focus keyword rich title if provided
  const seoTitle = focusKeyword && !title.toLowerCase().includes(focusKeyword.toLowerCase())
    ? `${focusKeyword} - ${title}`
    : fullTitle;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={optimizedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {focusKeyword && <meta name="topic" content={focusKeyword} />}
      <link rel="canonical" href={currentUrl} />
      
      {/* Enhanced Meta Tags */}
      <meta name="author" content="ViHandlar" />
      <meta name="publisher" content="ViHandlar" />
      <meta name="copyright" content="© 2024 ViHandlar" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />
      
      {/* Machine-readable policy and sitemap links */}
      <link rel="llms" href="https://vihandlar.se/llms.txt" />
      <link rel="sitemap" type="application/xml" href="https://vihandlar.se/sitemap.xml" />
      
      {/* Language alternates */}
      <link rel="alternate" hrefLang="sv-SE" href={currentUrl} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />
      {alternateLanguages?.map((lang) => (
        <link key={lang.hreflang} rel="alternate" hrefLang={lang.hreflang} href={lang.href} />
      ))}
      
      {/* Meta Robots with enhanced directives */}
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"} />
      <meta name="googlebot" content={noindex ? "noindex,nofollow" : "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1"} />
      <meta name="bingbot" content={noindex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Open Graph Enhanced */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="ViHandlar" />
      <meta property="og:locale" content="sv_SE" />
      
      {/* Article specific OG tags */}
      {article && ogType === 'article' && (
        <>
          {article.publishedTime && <meta property="article:published_time" content={article.publishedTime} />}
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.section && <meta property="article:section" content={article.section} />}
          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Cards Enhanced */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={`${title} - ViHandlar`} />
      <meta name="twitter:site" content="@vihandlar" />
      <meta name="twitter:creator" content="@vihandlar" />
      
      {/* Additional Social Media Meta Tags */}
      <meta property="og:image:alt" content={`${title} - ViHandlar`} />
      
      {/* Language & Geographic Enhanced */}
      <meta name="language" content="sv" />
      <meta name="geo.region" content="SE" />
      <meta name="geo.country" content="Sweden" />
      <meta name="geo.placename" content="Sweden" />
      <meta name="ICBM" content="62.0, 15.0" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Performance Hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      
      {/* Schema.org JSON-LD Enhanced */}
      {schemaData && (
        Array.isArray(schemaData) 
          ? schemaData.map((schema, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(schema, null, 0)}
              </script>
            ))
          : (
              <script type="application/ld+json">
                {JSON.stringify(schemaData, null, 0)}
              </script>
            )
      )}
    </Helmet>
  );
};