import { NextRequest, NextResponse } from "next/server";
import {
  extractENumbersFromText,
  lookupEAdditives,
} from "@/lib/data/e-additives";

const DEMO_OCR_TEXT = `Ingredienser: Socker, palmfett, kakao,
emulgeringsmedel (E322, E476), arom, färgämne (E171, E100),
konserveringsmedel (E211), antioxidationsmedel (E320),
surhetsreglerande medel (E330)`;

/**
 * POST /api/scan
 * Accepts multipart form data with an image file.
 * Uses Google Cloud Vision API for OCR, then extracts E-numbers.
 * Falls back to demo mode if GOOGLE_CLOUD_API_KEY is not set.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get("image") as File | null;

    if (!imageFile || !(imageFile instanceof File)) {
      return NextResponse.json(
        { error: "Ingen bildfil skickad" },
        { status: 400 }
      );
    }

    // Validate file
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    if (!validTypes.includes(imageFile.type.toLowerCase())) {
      return NextResponse.json(
        { error: "Felaktig filtyp. Stödda format: JPEG, PNG, WEBP" },
        { status: 400 }
      );
    }

    if (imageFile.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Bilden är för stor. Maximal storlek är 15MB" },
        { status: 400 }
      );
    }

    if (imageFile.size === 0) {
      return NextResponse.json(
        { error: "Bildfilen verkar vara tom" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GOOGLE_CLOUD_API_KEY;

    let extractedText: string;

    if (apiKey) {
      // Real OCR via Google Cloud Vision
      extractedText = await performOCR(imageFile, apiKey);
    } else {
      // Demo mode - return mock results
      extractedText = DEMO_OCR_TEXT;
    }

    // Extract E-numbers from text
    const eNumbers = extractENumbersFromText(extractedText);

    if (eNumbers.length === 0) {
      return NextResponse.json({
        found_e_numbers: [],
        additives: [],
        risk_summary: { low: 0, medium: 0, high: 0 },
        overall_assessment:
          "Inga E-ämnen hittades i bilden. Försök med en tydligare bild.",
        is_demo: !apiKey,
        extracted_text: extractedText.substring(0, 200),
      });
    }

    // Look up E-additives
    const { additives, riskSummary, overallAssessment } =
      lookupEAdditives(eNumbers);

    return NextResponse.json({
      found_e_numbers: eNumbers,
      additives: additives.map((a) => ({
        e_number: a.e_number,
        name: a.name,
        slug: a.slug,
        category: a.category,
        risk_score: a.risk_score,
        origin: a.origin,
        short_description: a.short_description,
        children_note: a.children_note,
      })),
      risk_summary: riskSummary,
      overall_assessment: overallAssessment,
      is_demo: !apiKey,
    });
  } catch (error) {
    console.error("Scan error:", error);

    const message =
      error instanceof Error ? error.message : "Ett oväntat fel uppstod";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function performOCR(file: File, apiKey: string): Promise<string> {
  // Convert file to base64
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);
  let binary = "";
  const chunkSize = 8192;
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.slice(i, Math.min(i + chunkSize, uint8Array.length));
    binary += String.fromCharCode(...chunk);
  }
  const base64Image = btoa(binary);

  const response = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: "TEXT_DETECTION", maxResults: 1 }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Vision API error:", response.status, errorText);

    if (response.status === 403) {
      throw new Error(
        "Vision API åtkomst nekad. Kontrollera API-nyckeln."
      );
    }
    if (response.status === 429) {
      throw new Error("För många förfrågningar. Försök igen om en stund.");
    }
    throw new Error("OCR-tjänsten svarade med fel. Försök igen.");
  }

  const data = await response.json();

  const text =
    data.responses?.[0]?.textAnnotations?.[0]?.description || "";

  if (!text) {
    return "";
  }

  return text;
}
