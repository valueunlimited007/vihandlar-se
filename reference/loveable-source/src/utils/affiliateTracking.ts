import type { Tables } from '@/integrations/supabase/types'

type Store = Tables<'stores'>
type AffiliateConfig = {
  programId?: string
  programAdId?: string
  channelId?: string
  trackingBase?: string
  cookieDays?: number
  [key: string]: any
}

/**
 * Generate affiliate tracking link based on store's affiliate network
 */
export const generateAffiliateLink = (productUrl: string, store: Store): string => {
  const config = store.affiliate_config as AffiliateConfig
  
  switch (store.affiliate_network) {
    case 'adtraction':
      return generateAdtractionLink(productUrl, config)
    
    case 'tradedoubler':
      return generateTradedoublerLink(productUrl, config)
    
    case 'awin':
      return generateAwinLink(productUrl, config)
    
    default:
      // Fallback: return direct link
      console.warn(`Unknown affiliate network: ${store.affiliate_network}`)
      return productUrl
  }
}

/**
 * Generate Adtraction tracking link
 */
const generateAdtractionLink = (productUrl: string, config: AffiliateConfig): string => {
  const trackingBase = config.trackingBase || 
    `https://go.adt242.com/t/t?a=${config.programAdId}&as=${config.channelId}&t=2&tk=1`
  
  return `${trackingBase}&url=${encodeURIComponent(productUrl)}`
}

/**
 * Generate Tradedoubler tracking link
 */
const generateTradedoublerLink = (productUrl: string, config: AffiliateConfig): string => {
  const trackingBase = config.trackingBase || 
    `https://clk.tradedoubler.com/click?p=${config.programId}`
  
  return `${trackingBase}&url=${encodeURIComponent(productUrl)}`
}

/**
 * Generate Awin tracking link
 */
const generateAwinLink = (productUrl: string, config: AffiliateConfig): string => {
  const trackingBase = config.trackingBase || 
    `https://www.awin1.com/cread.php?awinmid=${config.programId}&awinaffid=${config.channelId}`
  
  return `${trackingBase}&clickref=vihandlar&ued=${encodeURIComponent(productUrl)}`
}

/**
 * Get affiliate disclaimer text for a store
 */
export const getAffiliateDisclaimer = (store: Store): string => {
  return `Du kommer nu till ${store.name} för att slutföra ditt köp. Vihandlar.se kan erhålla provision på försäljning.`
}

/**
 * Get affiliate link attributes (rel, target)
 */
export const getAffiliateLinkProps = () => {
  return {
    rel: "nofollow sponsored noopener noreferrer",
    target: "_blank"
  }
}
