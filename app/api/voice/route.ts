import { NextRequest, NextResponse } from "next/server";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Demo responses for when no API key is configured
const DEMO_RESPONSES = [
  "mjölk, bröd, ägg",
  "ost, smör, yoghurt",
  "bananer, äpplen, apelsiner",
  "pasta, ris, potatis",
  "kyckling, lax, köttfärs",
  "tomat, gurka, paprika",
  "kaffe, te, juice",
  "tvål, tandkräm, schampo",
];

// Hallucination patterns to filter out (Whisper sometimes returns these)
const HALLUCINATION_PATTERNS = [
  /^(tack för att|thanks for|thank you)/i,
  /^(prenumerera|subscribe|like)/i,
  /^(musik|music)$/i,
  /^(\.+|,+|\s+)$/,
  /youtube|video|kanal/i,
  /^(hej|hello|hi)$/i,
];

function isHallucination(text: string): boolean {
  return HALLUCINATION_PATTERNS.some((pattern) => pattern.test(text.trim()));
}

function sanitizeTranscript(text: string): string {
  // Remove HTML tags and dangerous characters
  let clean = text.replace(/<[^>]*>/g, "").trim();

  // Limit length
  if (clean.length > 200) {
    clean = clean.substring(0, 200);
  }

  return clean;
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    // Handle JSON body (demo mode request)
    if (contentType.includes("application/json")) {
      const body = await request.json();

      if (body.demo === true) {
        const randomResponse =
          DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
        return NextResponse.json({
          text: randomResponse,
          demo: true,
        });
      }

      return NextResponse.json(
        { error: "Ogiltig förfrågan" },
        { status: 400 }
      );
    }

    // Handle audio upload (multipart/form-data)
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Ogiltig content-type. Skicka audio som multipart/form-data." },
        { status: 400 }
      );
    }

    // If no API key, return demo response
    if (!OPENAI_API_KEY) {
      const randomResponse =
        DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
      return NextResponse.json({
        text: randomResponse,
        demo: true,
        message: "Demo-läge: OPENAI_API_KEY ej konfigurerad",
      });
    }

    const formData = await request.formData();
    const audioFile = formData.get("audio") as File | null;

    if (!audioFile) {
      return NextResponse.json(
        { error: "Ingen ljudfil hittades i förfrågan." },
        { status: 400 }
      );
    }

    // Validate file size (max 4MB)
    if (audioFile.size > 4 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ljudfilen är för stor. Max 4MB." },
        { status: 400 }
      );
    }

    // Validate minimum size (avoid empty recordings)
    if (audioFile.size < 500) {
      return NextResponse.json(
        { error: "Inspelningen var för kort. Försök igen." },
        { status: 400 }
      );
    }

    // Determine correct file extension from MIME type
    const mimeType = audioFile.type || "audio/webm";
    let ext = "webm";
    if (mimeType.includes("mp4") || mimeType.includes("m4a")) ext = "mp4";
    else if (mimeType.includes("ogg")) ext = "ogg";
    else if (mimeType.includes("wav")) ext = "wav";
    else if (mimeType.includes("mpeg") || mimeType.includes("mp3")) ext = "mp3";

    // Call OpenAI Whisper API
    const whisperForm = new FormData();
    whisperForm.append("file", audioFile, `audio.${ext}`);
    whisperForm.append("model", "whisper-1");
    whisperForm.append("language", "sv");
    whisperForm.append("response_format", "json");
    whisperForm.append("prompt", "Transkribera svenska matvarunamn som mjölk, bröd, äpplen, ost, smör, kyckling, pasta, ris, tomat, gurka, bananer");

    const whisperResponse = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: whisperForm,
      }
    );

    if (!whisperResponse.ok) {
      const errorData = await whisperResponse.text();
      console.error("Whisper API error:", whisperResponse.status, errorData, "MIME:", mimeType, "Ext:", ext, "Size:", audioFile.size);

      if (whisperResponse.status === 401) {
        return NextResponse.json(
          { error: "API-nyckel saknas eller är ogiltig." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Kunde inte bearbeta ljudet. Försök igen." },
        { status: 500 }
      );
    }

    const result = await whisperResponse.json();
    const rawText = result.text || "";

    // Filter hallucinations
    if (isHallucination(rawText)) {
      return NextResponse.json(
        { error: "Ingen relevant text hördes. Försök igen." },
        { status: 422 }
      );
    }

    // Sanitize
    const text = sanitizeTranscript(rawText);

    if (!text) {
      return NextResponse.json(
        { error: "Ingen text kunde tolkas från inspelningen." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      text,
      demo: false,
    });
  } catch (error) {
    console.error("Voice API error:", error);
    return NextResponse.json(
      { error: "Ett oväntat fel inträffade. Försök igen." },
      { status: 500 }
    );
  }
}
