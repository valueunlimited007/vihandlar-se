// GET /api/lists/[token] — Get list by share token
// DELETE /api/lists/[token] — Delete list
import { NextRequest, NextResponse } from "next/server";
import { getListByToken, deleteList } from "@/lib/kv";

interface RouteParams {
  params: Promise<{ token: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { token } = await params;

  const list = await getListByToken(token);
  if (!list) {
    return NextResponse.json(
      { error: "Lista hittades inte" },
      { status: 404 }
    );
  }

  return NextResponse.json(list);
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { token } = await params;

  const list = await getListByToken(token);
  if (!list) {
    return NextResponse.json(
      { error: "Lista hittades inte" },
      { status: 404 }
    );
  }

  await deleteList(list.id);
  return NextResponse.json({ ok: true });
}
