"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";

interface ToastData {
  id: number;
  title: string;
  description?: string;
  duration?: number;
}

let toastId = 0;
const listeners = new Set<(toast: ToastData) => void>();

export function showToast(title: string, description?: string, duration = 3000) {
  const toast: ToastData = { id: ++toastId, title, description, duration };
  listeners.forEach((fn) => fn(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  useEffect(() => {
    const handler = (toast: ToastData) => {
      setToasts((prev) => [...prev.slice(-2), toast]); // Keep max 3

      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration || 3000);
      timersRef.current.set(toast.id, timer);
    };

    listeners.add(handler);
    const timers = timersRef.current;
    return () => {
      listeners.delete(handler);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-card border border-border rounded-lg shadow-lg px-4 py-3 flex items-start gap-3 animate-slide-up"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{toast.title}</p>
            {toast.description && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-muted-foreground hover:text-foreground shrink-0 p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
