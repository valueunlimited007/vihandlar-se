import React from 'react';

interface ListItem {
  name: string;
  quantity?: string | null;
  category?: string | null;
  checked: boolean;
  position: number;
}

interface AIOptimizedListFactBoxProps {
  title: string;
  description?: string | null;
  items: ListItem[];
  slug: string;
  lang: string;
  updatedAt: string;
}

export const AIOptimizedListFactBox: React.FC<AIOptimizedListFactBoxProps> = ({ 
  title, 
  description, 
  items, 
  slug, 
  lang, 
  updatedAt 
}) => {
  const currentTimestamp = new Date().toISOString();
  
  // AI-optimized structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": title,
    "description": description || `Inköpslista: ${title}`,
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "quantity": item.quantity || "1",
      "category": item.category || "Allmänt",
      "status": item.checked ? "completed" : "pending"
    })),
    "url": `https://vihandlar.se/listor/${slug}`,
    "dateModified": updatedAt,
    "inLanguage": lang,
    "author": {
      "@type": "Organization",
      "name": "ViHandlar"
    }
  };

  // AI citation data
  const citationData = {
    source: "vihandlar.se", 
    type: "shopping_list",
    timestamp: currentTimestamp,
    confidence: "high",
    last_verified: updatedAt,
    data_freshness: "realtime_updates"
  };

  // FAQ data for shopping lists
  const aiFAQData = [
    {
      "@type": "Question",
      "name": `Hur många varor finns i listan ${title}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Listan ${title} innehåller ${items.length} varor.`
      }
    },
    {
      "@type": "Question", 
      "name": `Kan jag dela inköpslistan ${title}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `Ja, ${title} är en delad inköpslista som kan användas av flera personer samtidigt via länken.`
      }
    },
    {
      "@type": "Question",
      "name": `Vilka kategorier av varor finns i ${title}?`,
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": `Listan innehåller varor från kategorier som: ${[...new Set(items.map(item => item.category).filter(Boolean))].join(', ') || 'Allmänna varor'}.`
      }
    }
  ];

  // Category analysis for AI
  const categoryStats = items.reduce((acc, item) => {
    const category = item.category || 'Okategoriserat';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div 
      className="ai-list-data"
      data-ai-extractable="true"
      data-citation={JSON.stringify(citationData)}
      data-content-type="shopping_list_information"
      data-last-updated={updatedAt}
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

      {/* AI-readable list summary */}
      <div className="sr-only" data-ai-summary="shopping-list-facts">
        <h2>Shopping List Summary: {title}</h2>
        <p>List title: {title}</p>
        <p>Description: {description || 'No description provided'}</p>
        <p>Total items: {items.length}</p>
        <p>Completed items: {items.filter(item => item.checked).length}</p>
        <p>Pending items: {items.filter(item => !item.checked).length}</p>
        <p>Language: {lang}</p>
        <p>Last updated: {updatedAt}</p>
        
        <h3>Category breakdown:</h3>
        {Object.entries(categoryStats).map(([category, count]) => (
          <p key={category}>{category}: {count} items</p>
        ))}
        
        <h3>All items:</h3>
        {items.map((item, index) => (
          <p key={index}>
            {item.name}
            {item.quantity && ` (${item.quantity})`}
            {item.category && ` - Category: ${item.category}`}
            - Status: {item.checked ? 'Completed' : 'Pending'}
          </p>
        ))}
      </div>

      {/* Machine-readable metadata */}
      <meta name="list-title" content={title} />
      <meta name="list-items-count" content={items.length.toString()} />
      <meta name="list-language" content={lang} />
      <meta name="list-categories" content={Object.keys(categoryStats).join(',')} />
      <meta name="data-source" content="vihandlar.se" />
      <meta name="data-timestamp" content={currentTimestamp} />
      <meta name="list-type" content="shared_shopping_list" />
    </div>
  );
};