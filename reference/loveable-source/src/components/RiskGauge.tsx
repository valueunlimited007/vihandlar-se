import { cn } from '@/lib/utils';

interface RiskGaugeProps {
  score: number; // 1-10
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const RiskGauge = ({ score, size = 'md', showLabel = true }: RiskGaugeProps) => {
  const getRiskColor = (score: number) => {
    if (score <= 3) return 'text-success bg-success/10';
    if (score <= 6) return 'text-warning bg-warning/10';
    return 'text-destructive bg-destructive/10';
  };

  const getRiskLabel = (score: number) => {
    if (score <= 3) return 'Låg risk';
    if (score <= 6) return 'Måttlig risk';
    return 'Hög risk';
  };

  const sizeClasses = {
    sm: 'w-12 h-12 text-xs',
    md: 'w-16 h-16 text-sm',
    lg: 'w-20 h-20 text-base'
  };

  const percentage = (score / 10) * 100;
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className={cn(
        "relative rounded-full flex items-center justify-center font-bold border-4",
        getRiskColor(score),
        sizeClasses[size]
      )}>
        <div className="text-center">
          <div>{score}</div>
          <div className="text-xs opacity-75">/10</div>
        </div>
        <div 
          className="absolute inset-0 rounded-full border-4 border-current opacity-20"
          style={{
            background: `conic-gradient(currentColor 0deg, currentColor ${percentage * 3.6}deg, transparent ${percentage * 3.6}deg)`
          }}
        />
      </div>
      {showLabel && (
        <span className={cn("text-xs font-medium", getRiskColor(score).split(' ')[0])}>
          {getRiskLabel(score)}
        </span>
      )}
    </div>
  );
};