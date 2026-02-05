import { getAffiliateLinkProps } from '@/utils/affiliateTracking';

interface HemkopAdProps {
  className?: string;
}

// Main tracking link - IMPORTANT: This is the tracking link, not the ad-specific one
const TRACKING_HREF = 'https://go.adt228.com/t/t?a=1479128955&as=2013245131&t=2&tk=1';

const adConfig = {
  imgSrc: 'https://track.adtraction.com/t/t?a=1515835895&as=2013245131&t=1&tk=1&i=1',
  width: 980,
  height: 120,
};

export const HemkopAd = ({ className = '' }: HemkopAdProps) => {
  const linkProps = getAffiliateLinkProps();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="text-xs text-muted-foreground mb-1">Annons</span>
      <a
        href={TRACKING_HREF}
        {...linkProps}
        className="block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
      >
        <img
          src={adConfig.imgSrc}
          width={adConfig.width}
          height={adConfig.height}
          alt="Hemköp - Handla mat online"
          className="max-w-full h-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
};

export default HemkopAd;
