import { ImageResponse } from "next/og";
import { getSkillBySlug, getCategoryBySlug, getAllSkills } from "@/lib/skills";

export const alt = "OpenClaw Skill";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  try {
    return getAllSkills().map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkillBySlug(slug);
  const name = skill?.name ?? "OpenClaw Skill";
  const desc = skill?.shortDescription || skill?.description?.slice(0, 120) || "";
  const rating = skill?.securityRating ?? "caution";
  const category = skill ? getCategoryBySlug(skill.categorySlug) : null;

  const ratingColors: Record<string, { bg: string; text: string }> = {
    safe: { bg: "#065f46", text: "#6ee7b7" },
    caution: { bg: "#78350f", text: "#fcd34d" },
    unsafe: { bg: "#7f1d1d", text: "#fca5a5" },
  };
  const rc = ratingColors[rating] ?? ratingColors.caution;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #581c87 0%, #6b21a8 40%, #312e81 100%)",
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
                background: "#7c3aed",
                borderRadius: "8px",
                padding: "6px 14px",
                fontSize: "18px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              SKILL
            </div>
            <span style={{ fontSize: "22px", color: "#d8b4fe" }}>Vibe OpenClaw</span>
            {category && (
              <div
                style={{
                  background: "rgba(139,92,246,0.3)",
                  borderRadius: "6px",
                  padding: "4px 12px",
                  fontSize: "16px",
                  color: "#c4b5fd",
                }}
              >
                {category.name}
              </div>
            )}
          </div>
          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#d8b4fe",
              marginTop: "16px",
              maxWidth: "900px",
            }}
          >
            {desc}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              background: rc.bg,
              borderRadius: "8px",
              padding: "8px 20px",
              fontSize: "20px",
              fontWeight: 700,
              color: rc.text,
              textTransform: "uppercase",
            }}
          >
            {rating}
          </div>
          <span style={{ fontSize: "18px", color: "#a78bfa" }}>vibeopenclaw.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
