import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useEAdditiveCache } from '@/hooks/useEAdditiveCache';
import Index from "./pages/Index";
import { HomePage } from "./components/HomePage";
import { ShoppingListView } from "./components/ShoppingListView";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Features from "./pages/Features";
import ShoppingListSEO from "./pages/ShoppingListSEO";
import Privacy from "./pages/Privacy";
import DynamicSitemap from "./pages/DynamicSitemap";
import PublicLists from "./pages/PublicLists";
import PublicListDetail from "./pages/PublicListDetail";
// Food section imports
import FoodHubSimple from "./pages/FoodHubSimple";
import FoodLetterSimple from "./pages/FoodLetterSimple";
import FoodCategory from "./pages/FoodCategory";
import FoodDetailSimple from "./pages/FoodDetailSimple";
import Sources from "./pages/Sources";
import Admin from "./pages/Admin";
import { EAdditiveHub } from "./pages/EAdditiveHub";
import EAdditiveGuide from "./pages/EAdditiveGuide";
import EAdditiveDetail from "./pages/EAdditiveDetail";
import EAdditiveCategory from "./pages/EAdditiveCategory";
import { EAdditiveAllView } from "./pages/EAdditiveAllView";
import EAdditiveLetter from "./pages/EAdditiveLetter";
import EAdditiveScannerPage from '@/pages/EAdditiveScanner';
import EAdditiveHistoryPage from '@/pages/EAdditiveHistory';
import { SharedScan } from '@/pages/SharedScan';
import ShoppingHub from './pages/ShoppingHub';
import StoreShop from './pages/StoreShop';
import ProductDetail from './pages/ProductDetail';
import ProductBrowse from './pages/ProductBrowse';
import DeliteaShop from './pages/DeliteaShop';
import { ProductBrowseByLetter } from '@/pages/ProductBrowseByLetter';
import { ProductCategory } from '@/pages/ProductCategory';
import { ProductCategoryHub } from '@/pages/ProductCategoryHub';
import { useEffect } from "react";
import { GoogleAnalyticsTracker } from "./components/GoogleAnalyticsTracker";
import { ScrollToTop } from "./components/ScrollToTop";

// Create QueryClient with default config
const queryClient = new QueryClient();

const AppContent = () => {
  const { warmCache } = useEAdditiveCache();

  useEffect(() => {
    // Warm up the cache on app start for better performance
    warmCache();
    
    // Temporarily disable Service Worker to avoid Chrome caching issues for .txt/.xml and well-known paths
    // If needed, you can force-unregister existing SWs via /sw-reset.html
  }, [warmCache]);

  return (
    <>
      <GoogleAnalyticsTracker />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/inkopslistor" element={<HomePage />} />
        <Route path="/list/:shareToken" element={<ShoppingListView />} />
        <Route path="/listor" element={<PublicLists />} />
        <Route path="/listor/:slug" element={<PublicListDetail />} />
        <Route path="/livsmedel" element={<FoodHubSimple />} />
        <Route path="/livsmedel/:letter" element={<FoodLetterSimple />} />
        <Route path="/livsmedel/kategori/:categorySlug" element={<FoodCategory />} />
        <Route path="/livsmedel/:letter/:foodSlug" element={<FoodDetailSimple />} />
        <Route path="/kallor" element={<Sources />} />
        <Route path="/om" element={<About />} />
        <Route path="/funktioner" element={<Features />} />
        <Route path="/inkopslista" element={<ShoppingListSEO />} />
        <Route path="/integritet" element={<Privacy />} />
        <Route path="/sajtkarta" element={<DynamicSitemap />} />
        
        {/* E-ämnen Routes */}
        <Route path="/e-amnen" element={<EAdditiveHub />} />
        <Route path="/e-amnen/guide" element={<EAdditiveGuide />} />
        <Route path="/e-amnen/scanner" element={<EAdditiveScannerPage />} />
        <Route path="/scan/:shareToken" element={<SharedScan />} />
        <Route path="/e-amnen/historik" element={<EAdditiveHistoryPage />} />
        <Route path="/e-amnen/alla" element={<EAdditiveAllView />} />
        <Route path="/e-amnen/nummer/:letter" element={<EAdditiveLetter />} />
        <Route path="/e-amnen/:slug" element={<EAdditiveDetail />} />
        <Route path="/e-amnen/kategori/:category" element={<EAdditiveCategory />} />
        
        {/* Shopping Routes */}
        <Route path="/shopping" element={<ShoppingHub />} />
        <Route path="/shopping/delitea" element={<DeliteaShop />} />
        <Route path="/shopping/produkter" element={<ProductBrowse />} />
        <Route path="/shopping/produkter/:letter" element={<ProductBrowseByLetter />} />
        <Route path="/shopping/kategorier" element={<ProductCategoryHub />} />
        <Route path="/shopping/kategori/:categorySlug" element={<ProductCategory />} />
        <Route path="/shopping/:store" element={<StoreShop />} />
        <Route path="/shopping/:store/:slug" element={<ProductDetail />} />
        
        {/* Admin Route - Hidden, not linked in UI */}
        <Route path="/admin" element={<Admin />} />
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
