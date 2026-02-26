import type { MetadataRoute } from "next";
import { getAllSkills } from "@/lib/skills";
import { getAllContent } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vibeopenclaw.com";

  const allTutorials = getAllContent("tutorials");
  const allBlogPosts = getAllContent("blog");

  const latestTutorialDate = allTutorials[0]?.date
    ? new Date(allTutorials[0].date)
    : new Date("2026-02-15");
  const latestBlogDate = allBlogPosts[0]?.date
    ? new Date(allBlogPosts[0].date)
    : new Date("2026-02-20");

  const staticPages = [
    { url: baseUrl, lastModified: new Date("2026-02-20"), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/skills`, lastModified: new Date("2026-02-18"), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${baseUrl}/tutorials`, lastModified: latestTutorialDate, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: latestBlogDate, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/setup-service`, lastModified: new Date("2026-02-01"), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date("2026-02-01"), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date("2026-02-01"), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${baseUrl}/agent-skills`, lastModified: new Date("2026-02-18"), changeFrequency: "weekly" as const, priority: 0.7 },
  ];

  let skills: MetadataRoute.Sitemap = [];
  try {
    skills = getAllSkills().map((skill) => ({
      url: `${baseUrl}/skills/${skill.slug}`,
      lastModified: new Date(skill.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // DB not available at build time — skills will appear at runtime
  }

  const tutorials = allTutorials.map((tutorial) => ({
    url: `${baseUrl}/tutorials/${tutorial.slug}`,
    lastModified: new Date(tutorial.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPosts = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...skills, ...tutorials, ...blogPosts];
}
