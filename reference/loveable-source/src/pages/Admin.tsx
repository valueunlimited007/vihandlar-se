import { Layout } from '@/components/Layout';
import { DataValidation } from '@/components/admin/DataValidation';
import SitemapGenerator from '@/components/admin/SitemapGenerator';
import { UpdateExistingScoresButton } from '@/components/UpdateExistingScoresButton';
import { ResetAndFixRiskScoresButton } from '@/components/ResetAndFixRiskScoresButton';
import { ImportProductsButton } from '@/components/ImportProductsButton';
import { GenerateCategoriesButton } from '@/components/GenerateCategoriesButton';
import { SEO } from '@/components/SEO';
import { Shield, Database, Settings, ShoppingCart, FolderTree, Map } from 'lucide-react';

/**
 * ADMIN PAGE - HIDDEN ROUTE
 * 
 * This page provides access to development and administrative tools
 * that are not meant for end users. Access via direct URL: /admin
 * 
 * TOOLS INCLUDED:
 * - DataValidation: E-additives database validation and fixing
 * 
 * SECURITY: Not linked anywhere in the UI, requires direct URL access
 */

const Admin = () => {
  return (
    <Layout>
      <SEO 
        title="Admin - Utvecklarverktyg" 
        description="Administrativ panel för utvecklarverktyg och datahantering"
        noindex={true}
      />
      <div className="container max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
              Admin Panel
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Utvecklarverktyg och administrativa funktioner för datahantering och systemunderhåll.
          </p>
        </div>

        {/* Tools Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 border rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Database className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Datavalidering</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              Kontrollera och åtgärda kvalitetsproblem i E-ämnes databasen.
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Validera E-nummer format</li>
              <li>• Kontrollera ADI-värden</li>
              <li>• Generera saknad SEO-data</li>
              <li>• Automatisk problemlösning</li>
            </ul>
          </div>
          
          <div className="p-6 border rounded-lg opacity-50">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="h-6 w-6 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-muted-foreground">Framtida verktyg</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Ytterligare administrativa verktyg kan läggas till här vid behov.
            </p>
          </div>
        </div>

        {/* Sitemap Generation Section */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-8 text-center flex items-center justify-center gap-3">
            <Map className="h-6 w-6 text-primary" />
            Sitemap Generering
          </h2>
          <SitemapGenerator />
        </div>

        {/* Data Validation Section */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-8 text-center">
            Datavalidering System
          </h2>
          <DataValidation />
        </div>

        {/* Risk Score Update Section */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-8 text-center">
            Risk Score Uppdatering
          </h2>
          <div className="bg-card rounded-2xl p-8 border">
            <p className="text-muted-foreground mb-6 text-center">
              Uppdatera befintliga E-ämnen med nya risk scoring algoritmen
            </p>
            <div className="flex justify-center gap-4">
            <UpdateExistingScoresButton />
            <ResetAndFixRiskScoresButton />
            </div>
          </div>
        </div>

        {/* Product Import Section */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-8 text-center">
            Produktimport
          </h2>
          <div className="bg-card rounded-2xl p-8 border">
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Delitea Produktkatalog</h3>
            </div>
            <p className="text-muted-foreground mb-6 text-center">
              Importera eller uppdatera produkter från Delitea via Adtraction feed
            </p>
            <div className="flex justify-center">
              <ImportProductsButton />
            </div>
          </div>
        </div>

        {/* Category Generation Section */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-semibold mb-8 text-center">
            Kategorigenerering
          </h2>
          <div className="bg-card rounded-2xl p-8 border">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FolderTree className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold">Produktkategorier</h3>
            </div>
            <p className="text-muted-foreground mb-6 text-center">
              Generera produktkategorier automatiskt från befintlig produktdata. 
              Detta skapar kategorisidor för SEO och enklare navigering.
            </p>
            <div className="flex justify-center">
              <GenerateCategoriesButton />
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-muted/30 rounded-2xl p-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Dokumentation
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong>URL:</strong> /admin (endast direktåtkomst, ej länkad)
            </p>
            <p>
              <strong>Syfte:</strong> Utvecklarverktyg och administrativ funktionalitet
            </p>
            <p>
              <strong>Säkerhet:</strong> Sidan är inte länkad från användargränssnittet och kräver direkt URL-åtkomst
            </p>
            <p>
              <strong>Komponent-arkiv:</strong> src/components/admin/ innehåller arkiverade utvecklarkomponenter
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;