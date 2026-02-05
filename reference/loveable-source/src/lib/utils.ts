import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/\s+-\s+/g, '-')        // Ersätt " - " med "-" först
    .replace(/[\s&\/]+/g, '-')        // Ersätt mellanslag, & och / med "-"
    .replace(/å/g, 'a')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/-+/g, '-')              // Ersätt multipla bindestreck med ett
    .replace(/^-|-$/g, '')            // Ta bort bindestreck i början/slutet
}
