"use client";

import { useState, useCallback, useRef } from "react";

interface UseVoiceInputReturn {
  isRecording: boolean;
  isProcessing: boolean;
  error: string | null;
  isSupported: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}

// Max recording duration in ms
const MAX_RECORDING_MS = 4000;

// Check if MediaRecorder is supported
function getMediaRecorderSupport(): boolean {
  if (typeof window === "undefined") return false;
  return typeof navigator.mediaDevices?.getUserMedia === "function" && typeof window.MediaRecorder !== "undefined";
}

// Get best supported MIME type
function getSupportedMimeType(): string {
  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
  ];
  for (const type of types) {
    if (MediaRecorder.isTypeSupported(type)) return type;
  }
  return "audio/webm";
}

export function useVoiceInput(
  onResult: (text: string) => void
): UseVoiceInputReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    mediaRecorderRef.current = null;
    chunksRef.current = [];
  }, []);

  const processAudio = useCallback(
    async (audioBlob: Blob) => {
      setIsProcessing(true);
      setError(null);

      try {
        // If the recording is too short, skip API call
        if (audioBlob.size < 8000) {
          // Try demo mode instead
          const res = await fetch("/api/voice", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ demo: true }),
          });
          const data = await res.json();
          if (data.text) {
            onResult(data.text);
          } else {
            setError("Inspelningen var för kort. Försök igen.");
          }
          return;
        }

        const formData = new FormData();
        formData.append(
          "audio",
          audioBlob,
          `recording.${audioBlob.type.includes("mp4") ? "mp4" : "webm"}`
        );

        const response = await fetch("/api/voice", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Kunde inte bearbeta rösten.");
          return;
        }

        if (data.text) {
          onResult(data.text);
          if (data.demo) {
            setError(null); // Clear any previous error on demo success
          }
        } else {
          setError("Ingen text hördes. Försök igen.");
        }
      } catch {
        setError("Nätverksfel. Kontrollera din anslutning.");
      } finally {
        setIsProcessing(false);
      }
    },
    [onResult]
  );

  const startRecording = useCallback(async () => {
    setError(null);

    if (!getMediaRecorderSupport()) {
      // Fall back to demo mode if no MediaRecorder support
      setIsProcessing(true);
      try {
        const res = await fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ demo: true }),
        });
        const data = await res.json();
        if (data.text) {
          onResult(data.text);
        }
      } catch {
        setError("Röstinmatning stöds inte i din webbläsare.");
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
          channelCount: 1,
        },
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const mimeType = getSupportedMimeType();
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: mimeType });
        cleanup();
        processAudio(audioBlob);
      };

      recorder.onerror = () => {
        setError("Inspelningsfel. Försök igen.");
        setIsRecording(false);
        cleanup();
      };

      recorder.start(100); // Collect data every 100ms
      setIsRecording(true);

      // Auto-stop after MAX_RECORDING_MS
      timerRef.current = setTimeout(() => {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === "recording"
        ) {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
        }
      }, MAX_RECORDING_MS);
    } catch (err) {
      cleanup();

      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError") {
          setError("Mikrofonåtkomst nekad. Aktivera i webbläsarinställningar.");
        } else if (err.name === "NotFoundError") {
          setError("Ingen mikrofon hittades.");
        } else {
          setError("Kunde inte starta inspelning.");
        }
      } else {
        setError("Kunde inte starta inspelning.");
      }
    }
  }, [cleanup, processAudio, onResult]);

  const stopRecording = useCallback(() => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  return {
    isRecording,
    isProcessing,
    error,
    isSupported: getMediaRecorderSupport(),
    startRecording,
    stopRecording,
  };
}
