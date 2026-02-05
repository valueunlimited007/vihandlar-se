import { useCallback } from 'react';

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

export const useScannerAnalytics = () => {
  const trackScanInitiated = useCallback((method: 'camera' | 'upload') => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'scan_initiated', {
        event_category: 'scanner',
        event_label: method,
        value: 1
      });
    }
  }, []);

  const trackScanCompleted = useCallback((eNumbersFound: number, overallRisk: string) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'scan_completed', {
        event_category: 'scanner',
        event_label: overallRisk,
        value: eNumbersFound
      });
    }
  }, []);

  const trackScanSaved = useCallback((eNumbersCount: number) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'scan_saved', {
        event_category: 'scanner',
        event_label: 'history',
        value: eNumbersCount
      });
    }
  }, []);

  const trackHistoryViewed = useCallback(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'history_viewed', {
        event_category: 'scanner',
        event_label: 'history_page'
      });
    }
  }, []);

  const trackEAdditiveClicked = useCallback((eNumber: string, source: 'scanner_results' | 'history') => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'e_additive_clicked', {
        event_category: 'scanner',
        event_label: source,
        custom_parameter_1: eNumber
      });
    }
  }, []);

  const trackScannerNavigation = useCallback((source: 'hub' | 'menu' | 'direct') => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'scanner_navigation', {
        event_category: 'navigation',
        event_label: source
      });
    }
  }, []);

  const trackOfflineFallback = useCallback((eNumbersDetected: number) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'offline_scan', {
        event_category: 'scanner',
        event_label: 'offline_mode',
        value: eNumbersDetected
      });
    }
  }, []);

  return {
    trackScanInitiated,
    trackScanCompleted,
    trackScanSaved,
    trackHistoryViewed,
    trackEAdditiveClicked,
    trackScannerNavigation,
    trackOfflineFallback
  };
};