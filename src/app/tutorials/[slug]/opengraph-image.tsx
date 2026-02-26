import { ImageResponse } from "next/og";
import { getContentBySlug, getAllSlugs } from "@/lib/content";

export const alt = "Tutorial";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs("tutorials").map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getContentBySlug("tutorials", slug);
  const title = item?.meta.title ?? "Tutorial";
  const author = item?.meta.author ?? "Vibe OpenClaw Team";
  const date = item?.meta.date
    ? new Date(item.meta.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 40%, #450a0a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                background: "#10b981",
                borderRadius: "8px",
                padding: "6px 14px",
                fontSize: "18px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              TUTORIAL
            </div>
            <span style={{ fontSize: "22px", color: "#fca5a5" }}>Vibe OpenClaw</span>
          </div>
          <div
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <span style={{ fontSize: "20px", color: "#fca5a5" }}>{author}</span>
            <span style={{ fontSize: "18px", color: "#f87171" }}>{date}</span>
          </div>
          <span style={{ fontSize: "18px", color: "#f87171" }}>vibeopenclaw.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
