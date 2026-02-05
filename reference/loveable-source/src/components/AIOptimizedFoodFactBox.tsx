import React from 'react';
import { Food } from '@/hooks/useFoods';

interface AIOptimizedFoodFactBoxProps {
  food: Food;
}

export const AIOptimizedFoodFactBox: React.FC<AIOptimizedFoodFactBoxProps> = ({ food }) => {
  const currentTimestamp = new Date().toISOString();
  
  // AI-optimized structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Food",
    "name": food.name,
    "description": food.short_description || food.long_description,
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": food.calories ? `${food.calories} kcal` : undefined,
      "proteinContent": food.protein ? `${food.protein}g` : undefined,
      "fatContent": food.fat ? `${food.fat}g` : undefined,
      "carbohydrateContent": food.carbohydrates ? `${food.carbohydrates}g` : undefined,
      "fiberContent": food.fiber ? `${food.fiber}g` : undefined,
      "sodiumContent": food.salt ? `${food.salt}g` : undefined
    },
    "category": food.subcategory,
    "storageRequirements": food.storage_method,
    "shelfLife": food.shelf_life_unopened,
    "identifier": food.slug,
    "url": `https://vihandlar.se/livsmedel/produkt/${food.slug}`,
    "dateModified": food.updated_at || currentTimestamp,
    "author": {
      "@type": "Organization", 
      "name": "ViHandlar"
    }
  };

  // AI citation data
  const citationData = {
    source: "vihandlar.se",
    type: "food_database",
    timestamp: currentTimestamp,
    confidence: "high",
    last_verified: food.updated_at || currentTimestamp,
    data_freshness: "updated_daily"
  };

  // FAQ data optimized for AI
  const aiFAQData = [
    {
      "@type": "Question",
      "name": `Hur många kalorier har ${food.name}?`,
      "acceptedAnswer": {
        "@type": "Answer", 
        "text": food.calories ? `${food.name} innehåller ${food.calories} kalorier per 100 gram.` : `Kaloriinformation för ${food.name} finns inte tillgänglig i databasen.`
      }
    },
    {
      "@type": "Question",
      "name": `Hur ska jag förvara ${food.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": food.storage_method ? `${food.name} ska förvaras ${food.storage_method}.` : `Förvaringsanvisningar för ${food.name} varierar beroende på typ och förpackning.`
      }
    },
    {
      "@type": "Question", 
      "name": `Kan jag frysa ${food.name}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": food.can_freeze ? `Ja, ${food.name} kan frysas utan problem.` : `${food.name} rekommenderas inte att frysas.`
      }
    }
  ];

  return (
    <div 
      className="ai-food-data" 
      data-ai-extractable="true"
      data-citation={JSON.stringify(citationData)}
      data-content-type="nutrition_food_information"
      data-last-updated={food.updated_at || currentTimestamp}
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

      {/* AI-readable fact summary */}
      <div className="sr-only" data-ai-summary="nutrition-facts">
        <h2>Nutritional Summary for {food.name}</h2>
        <p>Food name: {food.name}</p>
        {food.calories && <p>Calories per 100g: {food.calories} kcal</p>}
        {food.protein && <p>Protein content: {food.protein}g per 100g</p>}
        {food.fat && <p>Fat content: {food.fat}g per 100g</p>}
        {food.carbohydrates && <p>Carbohydrate content: {food.carbohydrates}g per 100g</p>}
        {food.fiber && <p>Fiber content: {food.fiber}g per 100g</p>}
        {food.salt && <p>Salt content: {food.salt}g per 100g</p>}
        <p>Storage method: {food.storage_method || 'Not specified'}</p>
        <p>Can be frozen: {food.can_freeze ? 'Yes' : 'No'}</p>
        <p>Category: {food.subcategory || 'General food item'}</p>
        <p>Last updated: {food.updated_at || currentTimestamp}</p>
      </div>

      {/* Machine-readable metadata */}
      <meta name="food-name" content={food.name} />
      <meta name="food-category" content={food.subcategory || 'food'} />
      {food.calories && <meta name="food-calories" content={food.calories.toString()} />}
      {food.protein && <meta name="food-protein" content={food.protein.toString()} />}
      {food.can_freeze && <meta name="food-freezable" content={food.can_freeze.toString()} />}
      <meta name="data-source" content="vihandlar.se" />
      <meta name="data-timestamp" content={currentTimestamp} />
    </div>
  );
};