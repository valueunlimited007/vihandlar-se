"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  ShoppingCart,
  ListChecks,
  Users,
  Share2,
  Sparkles,
  Trash2,
  ChevronRight,
  Clock,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useShoppingList } from "@/hooks/useShoppingList";
import type { ShoppingList } from "@/types/shopping-list";

// Public list data (imported at build time won't work in client component, so we fetch)
import publicListsData from "@/data/public-lists.json";

const publicLists = publicListsData as Array<{
  slug: string;
  title: string;
  description: string;
  items: Array<{ name: string }>;
}>;

export default function InkopslistaPage() {
  const router = useRouter();
  const { createList, getMyLists } = useShoppingList();
  const [listName, setListName] = useState("");
  const [myLists, setMyLists] = useState<ShoppingList[]>([]);
  const [creating, setCreating] = useState(false);
  const [loadingLists, setLoadingLists] = useState(true);

  useEffect(() => {
    getMyLists().then((lists) => {
      setMyLists(lists);
      setLoadingLists(false);
    });
  }, [getMyLists]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!listName.trim() || creating) return;

    setCreating(true);
    const list = await createList(listName.trim());
    setCreating(false);

    if (list) {
      router.push(`/inkopslista/dela/${list.shareToken}`);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just nu";
    if (diffMins < 60) return `${diffMins} min sedan`;
    if (diffHours < 24) return `${diffHours} tim sedan`;
    if (diffDays < 7) return `${diffDays} dagar sedan`;
    return date.toLocaleDateString("sv-SE");
  };

  return (
    <div className="min-h-[80vh]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <ShoppingCart className="w-3.5 h-3.5 mr-1" />
              Delad inköpslista online
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Skapa din inköpslista
            </h1>
            <p className="text-muted-foreground mb-8">
              Skapa, dela och handla tillsammans i realtid. Inga konton krävs.
            </p>

            {/* Create Form */}
            <form
              onSubmit={handleCreate}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Namnge din lista..."
                maxLength={50}
                className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-center sm:text-left text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                autoFocus
              />
              <button
                type="submit"
                disabled={!listName.trim() || creating}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-glow text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {creating ? (
                  <span className="animate-spin">⟳</span>
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Skapa lista
              </button>
            </form>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-10">
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Dela via länk</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <p className="text-xs text-muted-foreground">Realtids-sync</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-2">
                <ListChecks className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-xs text-muted-foreground">Inga konton</p>
            </div>
          </div>
        </div>
      </section>

      {/* My Lists */}
      <section className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Mina listor
          </h2>

          {loadingLists ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-lg bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : myLists.length > 0 ? (
            <div className="space-y-2">
              {myLists.map((list) => {
                const pending = list.items.filter((i) => !i.completed).length;
                const total = list.items.length;
                return (
                  <Link
                    key={list.id}
                    href={`/inkopslista/dela/${list.shareToken}`}
                    className="flex items-center gap-3 p-4 rounded-xl bg-card border hover:border-primary/30 hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                        {list.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {pending > 0
                          ? `${pending} av ${total} kvar`
                          : total > 0
                            ? "Alla avklarade!"
                            : "Tom lista"}
                        {" · "}
                        {formatDate(list.updatedAt)}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <ShoppingCart className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-30" />
                <p className="text-sm text-muted-foreground">
                  Inga listor ännu. Skapa din första lista ovan!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Public Templates */}
      <section className="bg-gradient-to-br from-muted/50 to-background py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Färdiga mallistor
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Börja med en färdig mall och anpassa efter behov
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {publicLists.slice(0, 6).map((pl) => (
                <Link
                  key={pl.slug}
                  href={`/inkopslista/mallar/${pl.slug}`}
                  className="p-4 rounded-xl bg-card border hover:border-primary/30 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                        {pl.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {pl.description}
                      </p>
                      <Badge
                        variant="secondary"
                        className="mt-2 text-[10px]"
                      >
                        {pl.items.length} varor
                      </Badge>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {publicLists.length > 6 && (
              <div className="text-center mt-4">
                <Link
                  href="/inkopslista/mallar"
                  className="text-sm text-primary hover:underline"
                >
                  Se alla {publicLists.length} mallar →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
