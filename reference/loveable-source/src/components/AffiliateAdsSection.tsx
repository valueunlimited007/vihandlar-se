import { MatkomfortAdResponsive, MatkomfortAd } from '@/components/MatkomfortAd';
import { LinasMatkasseAd } from '@/components/LinasMatkasseAd';
import { HemkopAd } from '@/components/HemkopAd';
import { FactorAd } from '@/components/FactorAd';

type AdsSectionVariant = 'hero' | 'inline' | 'sidebar' | 'footer';

interface AffiliateAdsSectionProps {
  variant?: AdsSectionVariant;
  className?: string;
}

/**
 * Hero variant: Matkomfort banner + Linas (side by side on desktop)
 * Used at the top of content pages for maximum visibility
 */
const HeroAdsSection = ({ className = '' }: { className?: string }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-items-center ${className}`}>
    <MatkomfortAdResponsive />
    <LinasMatkasseAd />
  </div>
);

/**
 * Inline variant: Single Hemköp banner
 * Used between content sections
 */
const InlineAdsSection = ({ className = '' }: { className?: string }) => (
  <div className={`flex justify-center ${className}`}>
    <HemkopAd />
  </div>
);

/**
 * Footer variant: Factor ad with discount code
 * Used at the bottom of content pages
 */
const FooterAdsSection = ({ className = '' }: { className?: string }) => (
  <div className={`flex justify-center ${className}`}>
    <FactorAd showDiscountCode={true} />
  </div>
);

/**
 * Sidebar variant: Stacked vertical ads for sidebars
 * Used in sidebar layouts (e.g., detail pages)
 */
const SidebarAdsSection = ({ className = '' }: { className?: string }) => (
  <div className={`space-y-6 ${className}`}>
    <MatkomfortAd size="square" />
    <LinasMatkasseAd />
    <HemkopAd />
    <FactorAd showDiscountCode={false} />
  </div>
);

/**
 * AffiliateAdsSection - Reusable component for displaying affiliate ads
 * with different layouts based on page context
 * 
 * Variants:
 * - hero: Two ads side by side (Matkomfort + Linas) - for page tops
 * - inline: Single Hemköp banner - for between content sections
 * - footer: Factor ad with discount code - for page bottoms
 * - sidebar: Stacked vertical ads - for sidebar layouts
 */
export const AffiliateAdsSection = ({ 
  variant = 'hero', 
  className = '' 
}: AffiliateAdsSectionProps) => {
  switch (variant) {
    case 'hero':
      return <HeroAdsSection className={className} />;
    case 'inline':
      return <InlineAdsSection className={className} />;
    case 'footer':
      return <FooterAdsSection className={className} />;
    case 'sidebar':
      return <SidebarAdsSection className={className} />;
    default:
      return <HeroAdsSection className={className} />;
  }
};

export default AffiliateAdsSection;
