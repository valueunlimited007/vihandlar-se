import { getAffiliateLinkProps } from '@/utils/affiliateTracking';

interface LinasMatkasseAdProps {
  className?: string;
}

// Main tracking link - IMPORTANT: This is the tracking link, not the ad-specific one
const TRACKING_HREF = 'https://on.linasmatkasse.se/t/t?a=213285747&as=2013245131&t=2&tk=1';

const adConfig = {
  imgSrc: 'https://track.adtraction.com/t/t?a=1015960863&as=2013245131&t=1&tk=1&i=1',
  width: 300,
  height: 250,
};

export const LinasMatkasseAd = ({ className = '' }: LinasMatkasseAdProps) => {
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
          alt="Linas Matkasse - Matkasse med färdiga recept"
          className="max-w-full h-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
};

export default LinasMatkasseAd;
