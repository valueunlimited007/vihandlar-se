import { cn } from "@/lib/utils";

interface RiskGaugeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

function getRiskConfig(score: number) {
  if (score <= 3) {
    return {
      label: "Låg risk",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-100 dark:bg-green-900/30",
      ring: "border-green-300 dark:border-green-700",
      gradient: "from-green-400 to-green-600",
    };
  }
  if (score <= 6) {
    return {
      label: "Måttlig risk",
      color: "text-yellow-600 dark:text-yellow-400",
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      ring: "border-yellow-300 dark:border-yellow-700",
      gradient: "from-yellow-400 to-orange-500",
    };
  }
  return {
    label: "Hög risk",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-100 dark:bg-red-900/30",
    ring: "border-red-300 dark:border-red-700",
    gradient: "from-red-400 to-red-600",
  };
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
};

const scoreSizes = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-2xl",
};

const labelSizes = {
  sm: "text-[10px]",
  md: "text-xs",
  lg: "text-xs",
};

export function RiskGauge({ score, size = "md", showLabel = false }: RiskGaugeProps) {
  const config = getRiskConfig(score);
  const percentage = (score / 10) * 100;
  const rotation = (percentage / 100) * 360;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center border-2",
          sizeClasses[size],
          config.bg,
          config.ring
        )}
        style={{
          background: `conic-gradient(
            hsl(var(--${score <= 3 ? "risk-low" : score <= 6 ? "risk-medium" : "risk-high"})) ${rotation}deg,
            hsl(var(--muted)) ${rotation}deg
          )`,
        }}
      >
        {/* Inner circle */}
        <div
          className={cn(
            "absolute rounded-full bg-background flex items-center justify-center flex-col",
            size === "sm" && "w-9 h-9",
            size === "md" && "w-12 h-12",
            size === "lg" && "w-16 h-16"
          )}
        >
          <span className={cn("font-bold leading-none", scoreSizes[size], config.color)}>
            {score}
          </span>
          <span className={cn("leading-none text-muted-foreground", labelSizes[size])}>
            /10
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={cn("text-xs font-medium", config.color)}>
          {config.label}
        </span>
      )}
    </div>
  );
}
