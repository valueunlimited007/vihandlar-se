import React from 'react';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ScannerSEO } from '@/components/ScannerSEO';
import ScanningHistory from '@/components/ScanningHistory';
import { Link } from 'react-router-dom';
import { History } from 'lucide-react';

const EAdditiveHistoryPage = () => {
  return (
    <ErrorBoundary>
      <Layout>
        <ScannerSEO pageType="history" />
        
        <div className="container mx-auto py-8 max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Hem</Link>
            <span>›</span>
            <Link to="/e-amnen" className="hover:text-primary">E-ämnen</Link>
            <span>›</span>
            <span>Historik</span>
          </div>

          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <History className="h-10 w-10 text-primary" />
              Skanning Historik
            </h1>
            <p className="text-xl text-muted-foreground">
              Håll koll på dina E-ämnen skanningar och återbesök tidigare analyser
            </p>
          </header>

          {/* History Component */}
          <ScanningHistory />
        </div>
      </Layout>
    </ErrorBoundary>
  );
};

export default EAdditiveHistoryPage;