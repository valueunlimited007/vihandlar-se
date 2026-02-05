import { getAffiliateLinkProps } from '@/utils/affiliateTracking';
import { Badge } from '@/components/ui/badge';
import { Gift } from 'lucide-react';

interface FactorAdProps {
  className?: string;
  showDiscountCode?: boolean;
}

// Main tracking link - IMPORTANT: This is the tracking link, not the ad-specific one
const TRACKING_HREF = 'https://go.adt267.com/t/t?a=1875371350&as=2013245131&t=2&tk=1';
const DISCOUNT_CODE = 'GENERIC30';

const adConfig = {
  imgSrc: 'https://track.adtraction.com/t/t?a=2010866209&as=2013245131&t=1&tk=1&i=1',
  width: 930,
  height: 180,
};

export const FactorAd = ({ className = '', showDiscountCode = true }: FactorAdProps) => {
  const linkProps = getAffiliateLinkProps();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="text-xs text-muted-foreground mb-1">Annons</span>
      
      {/* Discount code badge */}
      {showDiscountCode && (
        <div className="mb-2 flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg px-4 py-2">
          <Gift className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-foreground">Rabattkod:</span>
          <Badge 
            variant="outline" 
            className="bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-400 font-bold text-base px-3 py-1 select-all cursor-pointer hover:bg-green-500/30 transition-colors"
            title="Klicka för att markera koden"
          >
            {DISCOUNT_CODE}
          </Badge>
        </div>
      )}
      
      <a
        href={TRACKING_HREF}
        {...linkProps}
        className="block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
      >
        <img
          src={adConfig.imgSrc}
          width={adConfig.width}
          height={adConfig.height}
          alt="Factor - Färdiglagade måltider levererade hem"
          className="max-w-full h-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
};

export default FactorAd;
