"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="container max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>

      <h1 className="text-3xl font-bold mb-4">Något gick fel</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Ett oväntat fel inträffade. Prova att ladda om sidan eller gå tillbaka
        till startsidan.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity"
        >
          <RefreshCw className="w-4 h-4" />
          Försök igen
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
        >
          <Home className="w-4 h-4" />
          Startsidan
        </Link>
      </div>

      {error.digest && (
        <p className="text-xs text-muted-foreground mt-8">
          Felkod: {error.digest}
        </p>
      )}
    </div>
  );
}
