"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Camera,
  Upload,
  Loader2,
  AlertTriangle,
  CheckCircle,
  Shield,
  RotateCcw,
  X,
  Check,
  Scan,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskGauge } from "@/components/RiskGauge";
import { getRiskLevel } from "@/types/e-additive";

interface ScannedAdditive {
  e_number: string;
  name: string;
  slug: string;
  category: string;
  risk_score: number;
  origin: string | null;
  short_description: string | null;
  children_note: string | null;
}

interface ScanResponse {
  found_e_numbers: string[];
  additives: ScannedAdditive[];
  risk_summary: { low: number; medium: number; high: number };
  overall_assessment: string;
  is_demo: boolean;
  error?: string;
}

type ViewState = "upload" | "camera" | "analyzing" | "results";

export default function SkannerPage() {
  const [view, setView] = useState<ViewState>("upload");
  const [results, setResults] = useState<ScanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // Camera refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));
  }, []);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = async () => {
    try {
      setCameraError(null);

      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("Kamera stöds inte i denna webbläsare.");
        return;
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setView("camera");
    } catch (err) {
      const e = err as DOMException;
      if (e.name === "NotAllowedError") {
        setCameraError("Kameraåtkomst nekad. Ge behörighet i inställningar.");
      } else if (e.name === "NotFoundError") {
        setCameraError("Ingen kamera hittades.");
      } else {
        setCameraError("Kunde inte starta kameran.");
      }
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        setCapturedImage(URL.createObjectURL(blob));
      }
    }, "image/jpeg", 0.85);
  };

  const confirmCapture = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          stopCamera();
          analyzeImage(file);
        }
      },
      "image/jpeg",
      0.85
    );
  };

  const retakePhoto = () => {
    if (capturedImage) {
      URL.revokeObjectURL(capturedImage);
      setCapturedImage(null);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await analyzeImage(file);
    }
    // Reset input so the same file can be selected again
    e.target.value = "";
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = Array.from(e.dataTransfer.files).find((f) =>
      f.type.startsWith("image/")
    );
    if (file) {
      await analyzeImage(file);
    } else {
      setError("Dra en bildfil (JPG, PNG, WEBP)");
    }
  };

  const analyzeImage = async (file: File) => {
    setView("analyzing");
    setError(null);
    setProgress(10);
    setResults(null);

    try {
      // Compress large images client-side
      let processedFile = file;
      if (file.size > 2 * 1024 * 1024) {
        setProgress(20);
        processedFile = await compressImage(file);
      }

      setProgress(40);
      const formData = new FormData();
      formData.append("image", processedFile);

      const response = await fetch("/api/scan", {
        method: "POST",
        body: formData,
      });

      setProgress(80);

      const data: ScanResponse = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Skanningen misslyckades");
      }

      setProgress(100);
      setResults(data);
      setView("results");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Ett oväntat fel uppstod";
      setError(message);
      setView("upload");
    }
  };

  const resetScanner = () => {
    setView("upload");
    setResults(null);
    setError(null);
    setProgress(0);
    setCapturedImage(null);
    stopCamera();
  };

  // --- Render views ---

  if (view === "camera") {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="relative w-full h-full">
          {capturedImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={capturedImage}
              alt="Tagen bild"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              {/* Guide overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-4 border-2 border-white/50 rounded-lg">
                  <div className="absolute top-4 left-4 right-4 text-center">
                    <p className="text-white text-sm bg-black/50 rounded px-3 py-1.5">
                      Rikta kameran mot ingredienslistan
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* Camera controls */}
        <div
          className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4 bg-gradient-to-t from-black via-black/80 to-transparent"
          style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
            {capturedImage ? (
              <>
                <button
                  onClick={retakePhoto}
                  className="px-5 py-3 rounded-xl bg-black/50 border border-white/50 text-white font-medium flex items-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Ta om
                </button>
                <button
                  onClick={confirmCapture}
                  className="px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Använd foto
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    stopCamera();
                    setView("upload");
                  }}
                  className="px-5 py-3 rounded-xl bg-black/50 border border-white/50 text-white font-medium flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Avbryt
                </button>
                <button
                  onClick={capturePhoto}
                  className="px-5 py-3 rounded-xl bg-white text-black font-semibold flex items-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Ta foto
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === "analyzing") {
    return (
      <div className="container mx-auto px-4 py-20 max-w-lg">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-lg font-semibold mb-2">Analyserar bild...</h2>
          <p className="text-sm text-muted-foreground mb-6">
            OCR-scanning och e-nummersökning
          </p>
          {progress > 0 && (
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (view === "results" && results) {
    return <ScanResults results={results} onNewScan={resetScanner} />;
  }

  // --- Default: Upload view ---
  return (
    <div className="min-h-[80vh]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Scan className="w-3.5 h-3.5 mr-1" />
              E-nummerskanner
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Skanna ingredienslistor
            </h1>
            <p className="text-muted-foreground mb-8">
              Ta en bild eller ladda upp foto av en ingredienslista.
              Vi identifierar alla E-nummer och visar riskbedömning.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto space-y-4">
          {/* Error display */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-700 dark:text-red-400">
                  {error}
                </p>
              </div>
            </div>
          )}

          {cameraError && (
            <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 flex items-start gap-3">
              <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                {cameraError}
              </p>
            </div>
          )}

          {/* Camera button (mobile) */}
          {isMobile && (
            <button
              onClick={startCamera}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-white font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-3 text-lg"
            >
              <Camera className="w-6 h-6" />
              Använd kamera
            </button>
          )}

          {/* Upload area */}
          <div
            className="relative border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              ref={fileInputRef}
              className="hidden"
            />
            <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="font-medium text-sm mb-1">
              {isMobile ? "Ladda upp bild" : "Ladda upp bild eller dra och släpp"}
            </p>
            <p className="text-xs text-muted-foreground">
              JPEG, PNG, WEBP (max 15MB)
            </p>
          </div>

          {/* How it works */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">
                Så fungerar det
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Step num={1} text="Ta en bild av ingredienslistan" />
                <Step num={2} text="Vi läser texten med OCR" />
                <Step num={3} text="E-nummer identifieras automatiskt" />
                <Step
                  num={4}
                  text="Se riskbedömning för varje tillsats"
                />
              </div>
            </CardContent>
          </Card>

          {/* Link to E-ämnen */}
          <div className="text-center pt-2">
            <Link
              href="/e-amnen"
              className="text-sm text-primary hover:underline"
            >
              Sök bland alla E-ämnen manuellt →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Step({ num, text }: { num: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
        {num}
      </div>
      <p className="text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function ScanResults({
  results,
  onNewScan,
}: {
  results: ScanResponse;
  onNewScan: () => void;
}) {
  const { additives, risk_summary, overall_assessment, is_demo } = results;
  const total = risk_summary.low + risk_summary.medium + risk_summary.high;

  // Determine overall color
  const overallColor =
    risk_summary.high > 0
      ? "red"
      : risk_summary.medium > risk_summary.low
        ? "yellow"
        : "green";

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-2xl">
      {/* Demo banner */}
      {is_demo && (
        <div className="mb-4 p-3 rounded-xl bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 text-center">
          <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">
            Demo-läge: Verklig OCR kräver GOOGLE_CLOUD_API_KEY
          </p>
        </div>
      )}

      {/* Overall assessment */}
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                overallColor === "red"
                  ? "bg-red-100 dark:bg-red-950/30"
                  : overallColor === "yellow"
                    ? "bg-yellow-100 dark:bg-yellow-950/30"
                    : "bg-green-100 dark:bg-green-950/30"
              }`}
            >
              {overallColor === "red" ? (
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              ) : overallColor === "yellow" ? (
                <Shield className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              ) : (
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1">Resultat</h2>
              <p className="text-sm text-muted-foreground">
                {overall_assessment}
              </p>
            </div>
          </div>

          {/* Risk summary */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
              <div className="text-xl font-bold text-green-700 dark:text-green-400">
                {risk_summary.low}
              </div>
              <div className="text-[10px] text-green-600 dark:text-green-500">
                Låg risk
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
              <div className="text-xl font-bold text-yellow-700 dark:text-yellow-400">
                {risk_summary.medium}
              </div>
              <div className="text-[10px] text-yellow-600 dark:text-yellow-500">
                Medel risk
              </div>
            </div>
            <div className="text-center p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
              <div className="text-xl font-bold text-red-700 dark:text-red-400">
                {risk_summary.high}
              </div>
              <div className="text-[10px] text-red-600 dark:text-red-500">
                Hög risk
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Found additives */}
      <div className="space-y-2 mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground px-1">
          Hittade {total} E-ämnen
        </h3>
        {additives.map((additive) => {
          const risk = getRiskLevel(additive.risk_score);
          return (
            <Link
              key={additive.e_number}
              href={`/e-amnen/${additive.slug}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-card border hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <RiskGauge score={additive.risk_score} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {additive.e_number}
                  </span>
                  <span className="text-sm text-muted-foreground truncate">
                    {additive.name}
                  </span>
                </div>
                {additive.short_description && (
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {additive.short_description}
                  </p>
                )}
              </div>
              <Badge
                variant={
                  risk.color === "red"
                    ? "destructive"
                    : risk.color === "yellow"
                      ? "secondary"
                      : "outline"
                }
                className="text-[10px] shrink-0"
              >
                {risk.label}
              </Badge>
            </Link>
          );
        })}
      </div>

      {/* New scan button */}
      <button
        onClick={onNewScan}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-white font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
      >
        <Scan className="w-4 h-4" />
        Skanna ny produkt
      </button>
    </div>
  );
}

function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;
      const maxSize = 1920;

      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(
              new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
            );
          } else {
            resolve(file);
          }
        },
        "image/jpeg",
        0.8
      );
    };

    img.onerror = () => resolve(file);
    img.src = URL.createObjectURL(file);
  });
}
