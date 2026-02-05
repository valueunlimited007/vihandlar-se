"use client";

import { ShoppingList } from "@/components/ShoppingList";
import { useParams } from "next/navigation";

export default function SharedListPage() {
  const params = useParams();
  const token = params.token as string;

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <ShoppingList shareToken={token} />
    </div>
  );
}
