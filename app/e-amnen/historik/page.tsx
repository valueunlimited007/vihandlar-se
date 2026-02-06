"use client";

import Link from "next/link";
import { Clock, Trash2, Scan } from "lucide-react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RiskGauge } from "@/components/RiskGauge";

interface ScanHistoryEntry {
  id: string;
  timestamp: string;
  eNumbers: string[];
  riskSummary: { low: number; medium: number; high: number };
}

export default function EAmnenHistorikPage() {
  const [history, setHistory] = useState<ScanHistoryEntry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vihandlar_scan_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("vihandlar_scan_history");
    setHistory([]);
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Hem</Link>
        <span className="mx-2">›</span>
        <Link href="/e-amnen" className="hover:text-foreground">E-ämnen</Link>
        <span className="mx-2">›</span>
        <span>Skanningshistorik</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Skanningshistorik
          </h1>
          <p className="text-muted-foreground mt-2">
            Dina tidigare E-ämnesskannningar sparas lokalt i din webbläsare.
          </p>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Rensa
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center py-16">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Ingen historik ännu</h2>
            <p className="text-muted-foreground mb-6">
              Använd vår E-ämnesscanner för att analysera ingredienslistor. Dina
              skanningar sparas här automatiskt.
            </p>
            <Link
              href="/skanner"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
            >
              <Scan className="w-4 h-4" />
              Scanna ingredienser
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <Card key={entry.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <time className="text-sm text-muted-foreground">
                    {new Date(entry.timestamp).toLocaleDateString("sv-SE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  <div className="flex gap-2 text-xs">
                    {entry.riskSummary.high > 0 && (
                      <span className="px-2 py-1 rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        {entry.riskSummary.high} hög
                      </span>
                    )}
                    {entry.riskSummary.medium > 0 && (
                      <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                        {entry.riskSummary.medium} medel
                      </span>
                    )}
                    {entry.riskSummary.low > 0 && (
                      <span className="px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        {entry.riskSummary.low} låg
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.eNumbers.map((eNum) => (
                    <Link
                      key={eNum}
                      href={`/e-amnen/${eNum.toLowerCase()}`}
                      className="px-2 py-1 rounded text-sm bg-muted hover:bg-primary/10 transition-colors"
                    >
                      {eNum}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
