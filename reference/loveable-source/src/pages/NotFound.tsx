import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, ShoppingCart, Info, Settings } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Hoppsan! Sidan hittades inte</h2>
            <p className="text-muted-foreground mb-8">
              Den här sidan verkar ha gått vilse, precis som mjölken i affären. 
              Men oroa dig inte - vi hjälper dig hitta rätt!
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="default" className="w-full">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Hem
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/inkopslista">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Skapa lista
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="w-full">
                <Link to="/funktioner">
                  <Settings className="w-4 h-4 mr-2" />
                  Funktioner
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/om">
                  <Info className="w-4 h-4 mr-2" />
                  Om oss
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
