// PATCH /api/lists/[token]/items/[itemId] — Update/toggle item
// DELETE /api/lists/[token]/items/[itemId] — Delete item
import { NextRequest, NextResponse } from "next/server";
import { getListByToken, toggleItem, updateItem, deleteItem } from "@/lib/kv";

interface RouteParams {
  params: Promise<{ token: string; itemId: string }>;
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { token, itemId } = await params;

  const list = await getListByToken(token);
  if (!list) {
    return NextResponse.json(
      { error: "Lista hittades inte" },
      { status: 404 }
    );
  }

  try {
    const body = await request.json();
    const { action, ...updates } = body as {
      action?: "toggle";
      name?: string;
      quantity?: string;
      unit?: string;
      completed?: boolean;
    };

    let item;
    if (action === "toggle") {
      item = await toggleItem(list.id, itemId);
    } else {
      item = await updateItem(list.id, itemId, updates);
    }

    if (!item) {
      return NextResponse.json(
        { error: "Vara hittades inte" },
        { status: 404 }
      );
    }

    return NextResponse.json(item);
  } catch {
    return NextResponse.json(
      { error: "Kunde inte uppdatera vara" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { token, itemId } = await params;

  const list = await getListByToken(token);
  if (!list) {
    return NextResponse.json(
      { error: "Lista hittades inte" },
      { status: 404 }
    );
  }

  const deleted = await deleteItem(list.id, itemId);
  if (!deleted) {
    return NextResponse.json(
      { error: "Vara hittades inte" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}
