// POST /api/lists — Create a new shopping list
import { NextRequest, NextResponse } from "next/server";
import { createList, saveUserList } from "@/lib/kv";
import { MAX_LIST_NAME_LENGTH } from "@/types/shopping-list";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, userId } = body as { name?: string; userId?: string };

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Listnamn krävs" },
        { status: 400 }
      );
    }

    if (name.trim().length > MAX_LIST_NAME_LENGTH) {
      return NextResponse.json(
        { error: `Listnamn max ${MAX_LIST_NAME_LENGTH} tecken` },
        { status: 400 }
      );
    }

    const list = await createList(name.trim());

    // Associate list with user if userId provided
    if (userId && typeof userId === "string") {
      await saveUserList(userId, list.id);
    }

    return NextResponse.json(list, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Kunde inte skapa lista" },
      { status: 500 }
    );
  }
}
