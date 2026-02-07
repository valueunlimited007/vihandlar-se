// POST /api/lists/[token]/presence — Register/heartbeat presence
// DELETE /api/lists/[token]/presence — Leave
import { NextRequest, NextResponse } from "next/server";
import { getListByToken, setPresence, removePresence, getPresenceCount } from "@/lib/kv";

interface RouteParams {
  params: Promise<{ token: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  const { token } = await params;

  const list = await getListByToken(token);
  if (!list) {
    return NextResponse.json({ error: "Lista hittades inte" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const { sessionId, deviceType } = body as {
      sessionId: string;
      deviceType: string;
    };

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "sessionId krävs" }, { status: 400 });
    }

    // Check if this is a new join (session not present before)
    const before = await getPresenceCount(list.id);
    const isNew = !before.entries.some((e) => e.sessionId === sessionId);

    const entry = await setPresence(list.id, sessionId, deviceType || "Unknown");

    const after = await getPresenceCount(list.id);

    return NextResponse.json({
      entry,
      count: after.count,
      isNewJoin: isNew,
    });
  } catch {
    return NextResponse.json(
      { error: "Kunde inte registrera närvaro" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { token } = await params;

  const list = await getListByToken(token);
  if (!list) {
    return NextResponse.json({ error: "Lista hittades inte" }, { status: 404 });
  }

  try {
    const body = await request.json();
    const { sessionId } = body as { sessionId: string };

    if (sessionId) {
      await removePresence(list.id, sessionId);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Kunde inte ta bort närvaro" },
      { status: 500 }
    );
  }
}
