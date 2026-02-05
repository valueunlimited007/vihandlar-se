// POST /api/lists/[token]/items — Add item(s) to a list
import { NextRequest, NextResponse } from "next/server";
import { getListByToken, addItem } from "@/lib/kv";
import {
  ITEM_NAME_REGEX,
  MAX_ITEM_NAME_LENGTH,
} from "@/types/shopping-list";
import type { ShoppingListItem } from "@/types/shopping-list";

interface RouteParams {
  params: Promise<{ token: string }>;
}

function validateItemName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length === 0) return "Varunamn krävs";
  if (trimmed.length > MAX_ITEM_NAME_LENGTH)
    return `Varunamn max ${MAX_ITEM_NAME_LENGTH} tecken`;
  if (!ITEM_NAME_REGEX.test(trimmed))
    return "Varunamnet innehåller otillåtna tecken";
  return null;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { token } = await params;

  const list = await getListByToken(token);
  if (!list) {
    return NextResponse.json(
      { error: "Lista hittades inte" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();

    // Support single item or array of items
    const itemsToAdd: Array<{
      name: string;
      quantity?: string;
      unit?: string;
      category?: string;
    }> = Array.isArray(body) ? body : [body];

    const addedItems: ShoppingListItem[] = [];
    const errors: string[] = [];

    for (const itemData of itemsToAdd) {
      const nameError = validateItemName(itemData.name ?? "");
      if (nameError) {
        errors.push(`${itemData.name}: ${nameError}`);
        continue;
      }

      const item = await addItem(
        list.id,
        itemData.name,
        itemData.quantity,
        itemData.unit,
        itemData.category
      );

      if (item) {
        addedItems.push(item);
      }
    }

    if (addedItems.length === 0 && errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json(
      { items: addedItems, errors },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Kunde inte lägga till vara" },
      { status: 500 }
    );
  }
}
