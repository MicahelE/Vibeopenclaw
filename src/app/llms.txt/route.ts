import { getAllContent } from "@/lib/content";

export const revalidate = 86400;

export async function GET() {
  const tutorials = getAllContent("tutorials");
  const blog = getAllContent("blog");

  const lines: string[] = [];
  lines.push("# Vibe OpenClaw");
  lines.push("");
  lines.push(
    "> Independent resource hub for OpenClaw — the open-source personal AI agent. Professional setup services, a security-vetted skills directory, and step-by-step tutorials covering Docker, MCP, the OpenClaw API, self-hosting, and integrations."
  );
  lines.push("");
  lines.push("## Tutorials");
  for (const t of tutorials) {
    lines.push(`- [${t.title}](https://vibeopenclaw.com/tutorials/${t.slug}): ${t.description}`);
  }
  lines.push("");
  lines.push("## Blog");
  for (const b of blog) {
    lines.push(`- [${b.title}](https://vibeopenclaw.com/blog/${b.slug}): ${b.description}`);
  }
  lines.push("");
  lines.push("## Optional");
  lines.push("- [Skills Directory](https://vibeopenclaw.com/skills): Security-vetted OpenClaw skills with permissions and ratings.");
  lines.push("- [Setup Service](https://vibeopenclaw.com/setup-service): Done-for-you OpenClaw configuration with security hardening.");
  lines.push("- [About](https://vibeopenclaw.com/about): How this resource hub is run and our editorial standards.");
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
