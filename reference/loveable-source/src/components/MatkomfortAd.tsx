import { getAffiliateLinkProps } from '@/utils/affiliateTracking';

type AdSize = 'vertical' | 'square' | 'banner';

interface MatkomfortAdProps {
  size?: AdSize;
  className?: string;
}

const adConfig = {
  vertical: {
    href: 'https://pin.matkomfort.se/t/t?a=925412215&as=2013245131&t=2&tk=1',
    imgSrc: 'https://track.adtraction.com/t/t?a=1689581550&as=2013245131&t=1&tk=1&i=1',
    width: 250,
    height: 360,
  },
  square: {
    href: 'https://pin.matkomfort.se/t/t?a=925412215&as=2013245131&t=2&tk=1',
    imgSrc: 'https://track.adtraction.com/t/t?a=1689581552&as=2013245131&t=1&tk=1&i=1',
    width: 400,
    height: 400,
  },
  banner: {
    href: 'https://pin.matkomfort.se/t/t?a=925412215&as=2013245131&t=2&tk=1',
    imgSrc: 'https://track.adtraction.com/t/t?a=1689581558&as=2013245131&t=1&tk=1&i=1',
    width: 980,
    height: 120,
  },
};

export const MatkomfortAd = ({ size = 'banner', className = '' }: MatkomfortAdProps) => {
  const config = adConfig[size];
  const linkProps = getAffiliateLinkProps();

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <span className="text-xs text-muted-foreground mb-1">Annons</span>
      <a
        href={config.href}
        {...linkProps}
        className="block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
      >
        <img
          src={config.imgSrc}
          width={config.width}
          height={config.height}
          alt="Matkomfort - Matkasse med färdiga recept"
          className="max-w-full h-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
};

// Responsive ad that shows banner on desktop, square on mobile
export const MatkomfortAdResponsive = ({ className = '' }: { className?: string }) => {
  return (
    <div className={className}>
      <div className="hidden lg:block">
        <MatkomfortAd size="banner" />
      </div>
      <div className="lg:hidden flex justify-center">
        <MatkomfortAd size="square" />
      </div>
    </div>
  );
};

export default MatkomfortAd;
