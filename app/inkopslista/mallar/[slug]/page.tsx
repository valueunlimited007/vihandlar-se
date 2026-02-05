"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  ShoppingCart,
  ListChecks,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useShoppingList } from "@/hooks/useShoppingList";
import publicListsData from "@/data/public-lists.json";

type PublicListData = {
  slug: string;
  title: string;
  description: string;
  items: Array<{
    name: string;
    quantity: string | null;
    category: string | null;
  }>;
};

const publicLists = publicListsData as PublicListData[];

export default function PublicListDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const { createList, addItem } = useShoppingList();
  const [creating, setCreating] = useState(false);

  const publicList = publicLists.find((l) => l.slug === slug);

  if (!publicList) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-30" />
        <p className="text-lg font-medium mb-2">Mall hittades inte</p>
        <Link
          href="/inkopslista"
          className="text-sm text-primary hover:underline"
        >
          Tillbaka till inköpslistor
        </Link>
      </div>
    );
  }

  const handleUseTemplate = async () => {
    if (creating) return;
    setCreating(true);

    const list = await createList(publicList.title);
    if (list) {
      // Add all items from the template
      for (const item of publicList.items) {
        await addItem(item.name, item.quantity ?? undefined, undefined, item.category ?? undefined);
      }
      router.push(`/inkopslista/dela/${list.shareToken}`);
    }

    setCreating(false);
  };

  // Group items by category
  const categories = new Map<string, typeof publicList.items>();
  for (const item of publicList.items) {
    const cat = item.category || "Övrigt";
    const existing = categories.get(cat) ?? [];
    existing.push(item);
    categories.set(cat, existing);
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-2xl">
      {/* Back link */}
      <Link
        href="/inkopslista"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Tillbaka
      </Link>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          {publicList.title}
        </h1>
        <p className="text-muted-foreground">{publicList.description}</p>
        <Badge variant="secondary" className="mt-2">
          {publicList.items.length} varor
        </Badge>
      </div>

      {/* Use template button */}
      <button
        onClick={handleUseTemplate}
        disabled={creating}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-white font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mb-8"
      >
        {creating ? (
          <span className="animate-spin">⟳</span>
        ) : (
          <Copy className="w-4 h-4" />
        )}
        {creating ? "Skapar lista..." : "Använd denna mall"}
      </button>

      {/* Items grouped by category */}
      <div className="space-y-4">
        {Array.from(categories.entries()).map(([category, items]) => (
          <Card key={category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-primary" />
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-sm py-1"
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-transparent" />
                    </div>
                    <span>{item.name}</span>
                    {item.quantity && (
                      <span className="text-xs text-muted-foreground ml-auto">
                        {item.quantity}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
