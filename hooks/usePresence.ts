"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { detectDeviceType, getDeviceEmoji, getDeviceLabel } from "@/lib/device-detection";
import { showToast } from "@/components/Toast";

const SESSION_KEY = "vihandlar_session_id";
const HEARTBEAT_INTERVAL = 30_000; // 30 seconds

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = `sess_${crypto.randomUUID()}`;
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function usePresence(shareToken: string) {
  const [presenceCount, setPresenceCount] = useState(1);
  const sessionIdRef = useRef<string>("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const joinedRef = useRef(false);

  const sendHeartbeat = useCallback(async () => {
    if (!shareToken || !sessionIdRef.current) return;

    try {
      const res = await fetch(`/api/lists/${shareToken}/presence`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          deviceType: detectDeviceType(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPresenceCount(Math.max(data.count, 1));

        // Show toast when someone new joins (not our own first join)
        if (data.isNewJoin && joinedRef.current) {
          // Another user joined — the server tells us
        }
      }
    } catch {
      // Ignore heartbeat failures
    }
  }, [shareToken]);

  const leave = useCallback(async () => {
    if (!shareToken || !sessionIdRef.current) return;

    try {
      // Use sendBeacon for reliability on page unload
      const body = JSON.stringify({ sessionId: sessionIdRef.current });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          `/api/lists/${shareToken}/presence`,
          new Blob([body], { type: "application/json" })
        );
      } else {
        await fetch(`/api/lists/${shareToken}/presence`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body,
        });
      }
    } catch {
      // Best effort
    }
  }, [shareToken]);

  // Handle SSE presence events
  const handlePresenceEvent = useCallback(
    (data: { count: number; entries?: Array<{ deviceType: string; sessionId: string }>; increased: boolean }) => {
      setPresenceCount(Math.max(data.count, 1));

      // Show toast if someone new joined (not us)
      if (data.increased && data.entries) {
        const otherNew = data.entries.find(
          (e) => e.sessionId !== sessionIdRef.current
        );
        if (otherNew) {
          const emoji = getDeviceEmoji(otherNew.deviceType as Parameters<typeof getDeviceEmoji>[0]);
          const label = getDeviceLabel(otherNew.deviceType as Parameters<typeof getDeviceLabel>[0]);
          const title = label
            ? `${emoji} Någon gick med från ${label}!`
            : `\u{1F389} Någon gick med!`;
          showToast(title, "En person till handlar nu med dig");
        }
      }
    },
    []
  );

  useEffect(() => {
    sessionIdRef.current = getSessionId();

    // Initial join
    sendHeartbeat().then(() => {
      joinedRef.current = true;
    });

    // Heartbeat every 30s
    intervalRef.current = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);

    // Leave on unload
    const handleUnload = () => leave();
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("beforeunload", handleUnload);
      leave();
    };
  }, [sendHeartbeat, leave]);

  return {
    presenceCount,
    handlePresenceEvent,
  };
}
