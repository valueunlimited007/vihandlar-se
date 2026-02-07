"use client";

import { useState, useCallback, useEffect, useRef } from "react";

const STORAGE_KEY = "vihandlar-sound-enabled";

// Tone definitions matching the original
const TONES = {
  added: { frequency: 800, duration: 0.2, volume: 0.08 },
  completed: { frequency: 600, duration: 0.15, volume: 0.08 },
  removed: { frequency: 400, duration: 0.1, volume: 0.06 },
} as const;

type ToneType = keyof typeof TONES;

let audioContext: AudioContext | null = null;
let initialized = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioContext) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    audioContext = new Ctx();
  }

  // Resume if suspended (iOS requirement)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function initOnInteraction() {
  if (initialized) return;

  const handler = () => {
    getAudioContext();
    initialized = true;
    document.removeEventListener("click", handler);
    document.removeEventListener("touchstart", handler);
  };

  document.addEventListener("click", handler, { once: true });
  document.addEventListener("touchstart", handler, { once: true });
}

function playTone(type: ToneType): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const { frequency, duration, volume } = TONES[type];
  const now = ctx.currentTime;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  // Attack: ramp up in 10ms
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + 0.01);
  // Decay: exponential to silence
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(now);
  oscillator.stop(now + duration);
}

export function useAudioFeedback() {
  const [isEnabled, setIsEnabled] = useState(true);
  const enabledRef = useRef(true);

  // Sync ref for use in callbacks
  useEffect(() => {
    enabledRef.current = isEnabled;
  }, [isEnabled]);

  // Load setting from localStorage and init audio context
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "false") {
      setIsEnabled(false);
    }
    initOnInteraction();
  }, []);

  const setEnabled = useCallback((value: boolean) => {
    setIsEnabled(value);
    localStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  const playItemAdded = useCallback(() => {
    if (enabledRef.current) playTone("added");
  }, []);

  const playItemCompleted = useCallback(() => {
    if (enabledRef.current) playTone("completed");
  }, []);

  const playItemRemoved = useCallback(() => {
    if (enabledRef.current) playTone("removed");
  }, []);

  return {
    isEnabled,
    setEnabled,
    playItemAdded,
    playItemCompleted,
    playItemRemoved,
  };
}
