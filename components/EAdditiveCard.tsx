import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { RiskGauge } from "@/components/RiskGauge";
import type { EAdditive } from "@/types/e-additive";

interface EAdditiveCardProps {
  additive: EAdditive;
  variant?: "default" | "compact";
}

function getRiskBorderColor(score: number) {
  if (score <= 3) return "hover:border-green-400/60";
  if (score <= 6) return "hover:border-yellow-400/60";
  return "hover:border-red-400/60";
}

function getRiskTopStripe(score: number) {
  if (score <= 3) return "bg-green-500";
  if (score <= 6) return "bg-yellow-500";
  return "bg-red-500";
}

export function EAdditiveCard({
  additive,
  variant = "default",
}: EAdditiveCardProps) {
  const isHighRisk = additive.risk_score >= 7;

  return (
    <Link
      href={`/e-amnen/${additive.slug}`}
      className={cn(
        "group relative block rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden",
        "transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
        getRiskBorderColor(additive.risk_score)
      )}
    >
      {/* Risk color top stripe */}
      <div
        className={cn(
          "h-1 w-full opacity-60 group-hover:opacity-100 transition-opacity",
          getRiskTopStripe(additive.risk_score)
        )}
      />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3
                className={cn(
                  "font-bold",
                  additive.risk_score <= 3 && "text-green-700 dark:text-green-400",
                  additive.risk_score >= 4 &&
                    additive.risk_score <= 6 &&
                    "text-yellow-700 dark:text-yellow-400",
                  additive.risk_score >= 7 && "text-red-700 dark:text-red-400"
                )}
              >
                {additive.e_number}
              </h3>
              {isHighRisk && (
                <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
              )}
            </div>
            <p className="font-semibold text-sm truncate">{additive.name}</p>
            {additive.common_name && (
              <p className="text-xs text-muted-foreground truncate">
                {additive.common_name}
              </p>
            )}
          </div>
          <RiskGauge score={additive.risk_score} size="sm" />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          <Badge variant="secondary" className="text-xs">
            {additive.category}
          </Badge>
          {additive.origin && (
            <Badge variant="outline" className="text-xs">
              {additive.origin}
            </Badge>
          )}
        </div>

        {/* Description (non-compact only) */}
        {variant === "default" && additive.short_description && (
          <p className="text-xs text-muted-foreground mt-3 line-clamp-2">
            {additive.short_description}
          </p>
        )}

        {/* High risk warning */}
        {variant === "default" && isHighRisk && (
          <div className="mt-3 p-2 rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
            <p className="text-xs text-red-700 dark:text-red-400 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 shrink-0" />
              Hög risknivå — bör undvikas
            </p>
          </div>
        )}

        {/* Read more hint */}
        <div className="mt-3 pt-2 border-t">
          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
            Läs mer →
          </span>
        </div>
      </div>
    </Link>
  );
}
