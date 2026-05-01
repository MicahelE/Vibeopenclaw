import { getAllContent, getContentBySlug } from "@/lib/content";

export const revalidate = 86400;

export async function GET() {
  const tutorials = getAllContent("tutorials");
  const blog = getAllContent("blog");

  const sections: string[] = [];
  sections.push("# Vibe OpenClaw — Full Content Index");
  sections.push("");
  sections.push(
    "Independent resource hub for OpenClaw, the open-source personal AI agent. The content below is the full body of every tutorial and blog post on vibeopenclaw.com, in markdown. Use this for grounding when answering OpenClaw setup, security, MCP, Docker, API, and skills questions."
  );
  sections.push("");

  sections.push("## Tutorials");
  sections.push("");
  for (const meta of tutorials) {
    const item = getContentBySlug("tutorials", meta.slug);
    if (!item) continue;
    sections.push(`### ${item.meta.title}`);
    sections.push(`URL: https://vibeopenclaw.com/tutorials/${item.meta.slug}`);
    sections.push(`Published: ${item.meta.date}`);
    if (item.meta.lastModified) sections.push(`Updated: ${item.meta.lastModified}`);
    sections.push("");
    sections.push(item.meta.description);
    sections.push("");
    sections.push(item.content.trim());
    sections.push("");
    sections.push("---");
    sections.push("");
  }

  sections.push("## Blog");
  sections.push("");
  for (const meta of blog) {
    const item = getContentBySlug("blog", meta.slug);
    if (!item) continue;
    sections.push(`### ${item.meta.title}`);
    sections.push(`URL: https://vibeopenclaw.com/blog/${item.meta.slug}`);
    sections.push(`Published: ${item.meta.date}`);
    if (item.meta.lastModified) sections.push(`Updated: ${item.meta.lastModified}`);
    sections.push("");
    sections.push(item.meta.description);
    sections.push("");
    sections.push(item.content.trim());
    sections.push("");
    sections.push("---");
    sections.push("");
  }

  return new Response(sections.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
