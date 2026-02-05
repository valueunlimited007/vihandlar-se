import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
const vihandlarLogo = '/lovable-uploads/293b822e-308d-4be1-9e1e-661b1a9c0a9d.png';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Handla Mat', href: '/shopping' },
    { name: 'E-ämnen', href: '/e-amnen' },
    { name: 'Livsmedel', href: '/livsmedel' },
    { name: 'Inköpslistor', href: '/inkopslistor' },
    { name: 'Om oss', href: '/om' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-background via-background/95 to-background border-b border-border/40 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 shadow-sm">
        <div className="container flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center bg-transparent group">
            <div className="relative">
              <img src={vihandlarLogo} alt="ViHandlar - Delad inköpslista online" className="h-[30px] sm:h-[20px] md:h-[50px] w-auto bg-transparent transition-transform duration-300 group-hover:scale-105" style={{background: 'transparent !important', display: 'block'}} />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
                 <Link
                   key={item.name}
                   to={item.href}
                   className={`relative text-sm font-medium transition-all duration-300 hover:text-primary group ${
                     location.pathname === item.href 
                       ? 'text-primary' 
                       : 'text-muted-foreground hover:text-foreground'
                   }`}
                   onClick={() => window.scrollTo(0, 0)}
                 >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    location.pathname === item.href 
                      ? 'w-full' 
                      : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground">
              MENY
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="bg-accent hover:bg-accent/80 rounded-full transition-all duration-300 text-accent-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"}
            >
              <div className="relative w-5 h-5">
                <span className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-2' : 'top-1'
                }`}></span>
                <span className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 top-2 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></span>
                <span className={`absolute block w-5 h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 top-2' : 'top-3'
                }`}></span>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-lg">
            <nav className="container py-6 space-y-4">
              {navigation.map((item) => (
                 <Link
                   key={item.name}
                   to={item.href}
                   className={`block py-3 px-4 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-accent/50 ${
                     location.pathname === item.href 
                       ? 'text-primary bg-accent/30' 
                       : 'text-muted-foreground hover:text-foreground'
                   }`}
                   onClick={() => {
                     setIsMenuOpen(false);
                     window.scrollTo(0, 0);
                   }}
                 >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="space-y-3">
              <div className="flex items-center bg-transparent">
                <img src={vihandlarLogo} alt="ViHandlar - Delad inköpslista online" className="h-[30px] sm:h-[20px] md:h-[50px] w-auto bg-transparent" style={{background: 'transparent !important', display: 'block'}} />
              </div>
              <p className="text-sm text-muted-foreground">
                Delad inköpslista online för familjen
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Produkt</h4>
              <ul className="space-y-2 text-sm">
                 <li>
                   <Link 
                     to="/funktioner" 
                     className="text-muted-foreground hover:text-primary transition-colors"
                     onClick={() => window.scrollTo(0, 0)}
                   >
                     Funktioner
                   </Link>
                 </li>
                 <li>
                   <Link 
                     to="/inkopslista" 
                     className="text-muted-foreground hover:text-primary transition-colors"
                     onClick={() => window.scrollTo(0, 0)}
                   >
                     Inköpslista
                   </Link>
                 </li>
                 <li>
                   <Link 
                     to="/e-amnen/scanner" 
                     className="text-muted-foreground hover:text-primary transition-colors"
                     title="E-ämnen Scanner - Skanna ingredienslistor för E-ämnen analys"
                     onClick={() => window.scrollTo(0, 0)}
                   >
                     E-ämnen Scanner
                   </Link>
                 </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Företag</h4>
              <ul className="space-y-2 text-sm">
                  <li>
                    <Link 
                      to="/om" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      Om ViHandlar
                    </Link>
                  </li>
                 <li>
                   <a href="mailto:hej@vihandlar.se" className="text-muted-foreground hover:text-primary transition-colors">
                     Kontakt
                   </a>
                 </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Juridiskt</h4>
              <ul className="space-y-2 text-sm">
                 <li>
                   <Link 
                     to="/integritet" 
                     className="text-muted-foreground hover:text-primary transition-colors"
                     onClick={() => window.scrollTo(0, 0)}
                   >
                     Integritetspolicy
                   </Link>
                 </li>
                 <li>
                   <Link 
                     to="/sajtkarta" 
                     className="text-muted-foreground hover:text-primary transition-colors"
                     onClick={() => window.scrollTo(0, 0)}
                   >
                     Sajtkarta
                   </Link>
                 </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Internationellt</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://listacumparaturi.ro" 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    target="_blank"
                    hrefLang="ro"
                    title="Lista de Cumpărături online - Delad inköpslista i Rumänien"
                  >
                    🇷🇴 Rumänien - Lista de Cumpărături
                  </a>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    🇸🇪 Sverige (Live)
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground/70">
                    🇪🇸 Spanien - Lansering 2025
                  </span>
                </li>
                <li>
                  <span className="text-muted-foreground/70">
                    🌍 Globalt (.com) - Lansering 2025
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* SEO Food & E-Additives A-Ö Section */}
          <div className="border-t mt-8 pt-6 space-y-6">
            {/* Livsmedel A-Ö */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Livsmedel A-Ö</h4>
              <div className="flex flex-wrap gap-2">
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'].map((letter) => (
                  <Link
                    key={letter}
                    to={`/livsmedel/${letter.toLowerCase()}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {letter}
                  </Link>
                ))}
              </div>
              <Link 
                to="/livsmedel" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block mt-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                Se alla livsmedel →
              </Link>
            </div>

            {/* Produkter A-Ö */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Produkter A-Ö</h4>
              <div className="flex flex-wrap gap-2">
                {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Å', 'Ä', 'Ö'].map((letter) => (
                  <Link
                    key={letter}
                    to={`/shopping/produkter/${letter.toLowerCase()}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {letter}
                  </Link>
                ))}
              </div>
              <Link 
                to="/shopping/produkter" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block mt-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                Bläddra alla produkter →
              </Link>
            </div>

            {/* Produktkategorier */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Produktkategorier</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <Link to="/shopping/kategori/dryck-lask-stilldrink-lask-stilldrink" className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Dryck
                </Link>
                <Link to="/shopping/kategori/pasta-pastasas-pasta-pasta" className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Pasta
                </Link>
                <Link to="/shopping/kategori/dessert-konfektyr-snacks-godis-godis-karameller" className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Godis
                </Link>
                <Link to="/shopping/kategori/dessert-konfektyr-snacks-choklad-och-chokladstycksaker-choklad" className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Choklad
                </Link>
                <Link to="/shopping/kategori/bakning-mjol-och-gryn-mjol-mjol" className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Bakning
                </Link>
                <Link to="/shopping/kategori/hart-brod-och-fika-fikabrod-och-kakor-kakor-sota-kex-fika" className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline" onClick={() => window.scrollTo(0, 0)}>
                  Fika
                </Link>
              </div>
              <Link 
                to="/shopping/kategorier" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block mt-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                Se alla kategorier →
              </Link>
            </div>

            {/* E-ämnen A-Ö */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">E-ämnen A-Ö</h4>
              <div className="flex flex-wrap gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number) => (
                  <Link
                    key={number}
                    to={`/e-amnen/nummer/${number}`}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    E{number}XX
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Link
                  to={`/e-amnen/kategori/${encodeURIComponent('färgämne')}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Färgämnen
                </Link>
                <Link
                  to={`/e-amnen/kategori/${encodeURIComponent('konserveringsmedel')}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Konserveringsmedel
                </Link>
                <Link
                  to={`/e-amnen/kategori/${encodeURIComponent('antioxidationsmedel')}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Antioxidationsmedel
                </Link>
                <Link
                  to={`/e-amnen/kategori/${encodeURIComponent('sötningsmedel')}`}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Sötningsmedel
                </Link>
              </div>
              <Link 
                to="/e-amnen/alla" 
                className="text-xs text-muted-foreground hover:text-primary transition-colors inline-block mt-2"
                onClick={() => window.scrollTo(0, 0)}
              >
                Se alla E-ämnen A-Ö →
              </Link>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} ViHandlar. Smart inköpslista online med röstinmatning och realtidsdelning.
            </p>
            <p className="text-xs text-muted-foreground/70">
              En del av Value Unlimited
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};