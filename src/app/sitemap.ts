import type { MetadataRoute } from "next";
import { getAllSkills } from "@/lib/skills";
import { getAllContent } from "@/lib/content";

const TIER1_TUTORIAL_SLUGS = new Set([
  "openclaw-docker-setup",
  "openclaw-mcp-server-guide",
  "openclaw-api-tutorial",
  "openclaw-self-hosting-guide",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vibeopenclaw.com";
  const now = new Date();

  const allTutorials = getAllContent("tutorials");
  const allBlogPosts = getAllContent("blog");

  const latestTutorialDate = allTutorials[0]?.date ? new Date(allTutorials[0].date) : now;
  const latestBlogDate = allBlogPosts[0]?.date ? new Date(allBlogPosts[0].date) : now;

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/skills`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/tutorials`, lastModified: latestTutorialDate, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: latestBlogDate, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/setup-service`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/agent-skills`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  let skills: MetadataRoute.Sitemap = [];
  try {
    skills = getAllSkills().map((skill) => ({
      url: `${baseUrl}/skills/${skill.slug}`,
      lastModified: new Date(skill.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // DB not available at build time — skills will appear at runtime
  }

  const tutorials = allTutorials.map((tutorial) => ({
    url: `${baseUrl}/tutorials/${tutorial.slug}`,
    lastModified: new Date(tutorial.lastModified || tutorial.date),
    changeFrequency: "monthly" as const,
    priority: TIER1_TUTORIAL_SLUGS.has(tutorial.slug) ? 0.9 : 0.7,
  }));

  const blogPosts = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.lastModified || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...skills, ...tutorials, ...blogPosts];
}
