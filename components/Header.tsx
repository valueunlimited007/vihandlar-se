"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Handla Mat", href: "/handla" },
  { name: "E-ämnen", href: "/e-amnen" },
  { name: "Livsmedel", href: "/livsmedel" },
  { name: "Inköpslistor", href: "/inkopslistor" },
  { name: "Om oss", href: "/om" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-gradient-to-r from-background via-background/95 to-background border-b border-border/40 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
              <ShoppingCart className="h-7 w-7 text-primary" />
              <span className="text-2xl font-bold italic tracking-tight">
                <span className="text-primary">Vi</span>
                <span className="text-foreground">Handlar</span>
                <span className="text-muted-foreground text-base font-normal">.se</span>
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-all duration-300 hover:text-primary group",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            MENY
          </span>
          <button
            className="bg-accent hover:bg-accent/80 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 text-accent-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Stäng meny" : "Öppna meny"}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-5 h-5">
              <span
                className={cn(
                  "absolute block w-5 h-0.5 bg-current transition-all duration-300",
                  isMenuOpen ? "rotate-45 top-2" : "top-1"
                )}
              />
              <span
                className={cn(
                  "absolute block w-5 h-0.5 bg-current transition-all duration-300 top-2",
                  isMenuOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <span
                className={cn(
                  "absolute block w-5 h-0.5 bg-current transition-all duration-300",
                  isMenuOpen ? "-rotate-45 top-2" : "top-3"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-lg animate-fade-in">
          <nav className="container mx-auto py-6 px-4 space-y-1">
            {navigation.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block py-3 px-4 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-accent/50",
                    isActive
                      ? "text-primary bg-accent/30"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
