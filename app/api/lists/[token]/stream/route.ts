// GET /api/lists/[token]/stream — SSE endpoint for realtime updates
import { NextRequest } from "next/server";
import { getListByToken } from "@/lib/kv";

interface RouteParams {
  params: Promise<{ token: string }>;
}

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { token } = await params;

  const list = await getListByToken(token);
  if (!list) {
    return new Response("Lista hittades inte", { status: 404 });
  }

  // SSE stream: poll for changes every 2 seconds
  const encoder = new TextEncoder();
  let lastUpdate = list.updatedAt;
  let closed = false;

  const stream = new ReadableStream({
    async start(controller) {
      // Send initial state
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: "connected", list })}\n\n`
        )
      );

      // Poll for updates
      const interval = setInterval(async () => {
        if (closed) {
          clearInterval(interval);
          return;
        }

        try {
          const current = await getListByToken(token);
          if (!current) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "deleted" })}\n\n`
              )
            );
            clearInterval(interval);
            controller.close();
            return;
          }

          if (current.updatedAt !== lastUpdate) {
            lastUpdate = current.updatedAt;
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({ type: "update", list: current })}\n\n`
              )
            );
          }

          // Heartbeat
          controller.enqueue(encoder.encode(": heartbeat\n\n"));
        } catch {
          // Ignore polling errors
        }
      }, 2000);

      // Cleanup when client disconnects
      _request.signal.addEventListener("abort", () => {
        closed = true;
        clearInterval(interval);
        try {
          controller.close();
        } catch {
          // Already closed
        }
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
