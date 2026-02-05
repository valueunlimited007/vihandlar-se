import { useState, useEffect } from 'react';

const HISTORY_KEY = 'e-additive-scan-history';

export interface SavedScan {
  id: string;
  timestamp: Date;
  foundENumbers: string[];
  riskSummary: { low: number; medium: number; high: number };
  overallAssessment: string;
  imageMetadata?: { name: string; size: number };
}

export const useScanningHistory = () => {
  const [savedScans, setSavedScans] = useState<SavedScan[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        const scans = parsed.map((scan: any) => ({
          ...scan,
          timestamp: new Date(scan.timestamp)
        }));
        setSavedScans(scans);
      }
    } catch (error) {
      console.error('Error loading scan history:', error);
    }
  }, []);

  // Save a scan to history
  const saveScan = (scanData: {
    foundENumbers: string[];
    riskSummary: { low: number; medium: number; high: number };
    overallAssessment: string;
    imageMetadata?: { name: string; size: number };
  }) => {
    const newScan: SavedScan = {
      id: `scan-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      ...scanData
    };

    setSavedScans(prev => {
      const newHistory = [newScan, ...prev].slice(0, 50); // Keep max 50 scans
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Error saving scan:', error);
      }
      return newHistory;
    });

    return newScan.id;
  };

  // Remove a scan from history
  const removeScan = (scanId: string) => {
    setSavedScans(prev => {
      const newHistory = prev.filter(scan => scan.id !== scanId);
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Error removing scan:', error);
      }
      return newHistory;
    });
  };

  // Clear all history
  const clearHistory = () => {
    setSavedScans([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  // Check if a scan exists (by comparing foundENumbers)
  const isScanSaved = (foundENumbers: string[]) => {
    return savedScans.some(scan => 
      scan.foundENumbers.length === foundENumbers.length &&
      scan.foundENumbers.every(num => foundENumbers.includes(num))
    );
  };

  return {
    savedScans,
    saveScan,
    removeScan,
    clearHistory,
    isScanSaved,
    scanCount: savedScans.length
  };
};