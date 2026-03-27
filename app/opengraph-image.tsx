import { ImageResponse } from "next/og";

export const alt = "vihandlar.se - Din smarta matassistent";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "linear-gradient(135deg, #FF8000 0%, #FF9933 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 800,
              color: "white",
            }}
          >
            V
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 0,
            }}
          >
            <span style={{ fontSize: 48, fontWeight: 700, color: "#FF8000" }}>
              vi
            </span>
            <span style={{ fontSize: 48, fontWeight: 700, color: "white" }}>
              handlar
            </span>
            <span style={{ fontSize: 48, fontWeight: 700, color: "#FF8000" }}>
              .se
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: "white",
            marginBottom: 16,
          }}
        >
          Din smarta matassistent
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#94a3b8",
            marginBottom: 48,
          }}
        >
          allt p&aring; ett st&auml;lle
        </div>

        {/* Feature badges */}
        <div
          style={{
            display: "flex",
            gap: 24,
          }}
        >
          {[
            { label: "Ink\u00f6pslistor", value: "10 000+" },
            { label: "Produkter", value: "10 521" },
            { label: "E-\u00e4mnen", value: "353+" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px 32px",
                borderRadius: 12,
                background: "rgba(255, 128, 0, 0.15)",
                border: "1px solid rgba(255, 128, 0, 0.3)",
              }}
            >
              <span
                style={{ fontSize: 28, fontWeight: 700, color: "#FF8000" }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: 16, color: "#94a3b8" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
