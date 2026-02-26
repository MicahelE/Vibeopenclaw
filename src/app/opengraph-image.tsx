import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Vibe OpenClaw — OpenClaw Setup Services, Skills & Tutorials";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 40%, #450a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#dc2626",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
            }}
          >
            🦞
          </div>
          <span style={{ fontSize: "32px", fontWeight: 700, color: "#fca5a5" }}>
            Vibe OpenClaw
          </span>
        </div>
        <div
          style={{
            fontSize: "56px",
            fontWeight: 800,
            color: "#ffffff",
            textAlign: "center",
            lineHeight: 1.2,
            maxWidth: "900px",
          }}
        >
          OpenClaw Setup Services, Skills & Tutorials
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "#fca5a5",
            textAlign: "center",
            marginTop: "24px",
            maxWidth: "700px",
          }}
        >
          Security-vetted skills, expert configuration, and step-by-step guides
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            marginTop: "40px",
          }}
        >
          {["Skills Directory", "Tutorials", "Setup Service"].map((item) => (
            <div
              key={item}
              style={{
                background: "rgba(220,38,38,0.3)",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "18px",
                color: "#fca5a5",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
