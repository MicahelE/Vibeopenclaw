import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface ContentMeta {
  title: string;
  description: string;
  date: string;
  lastModified?: string;
  author: string;
  authorSlug?: string;
  tags: string[];
  category?: string;
  featuredImage?: string;
  faqs?: FAQItem[];
  howTo?: HowToStep[];
  slug: string;
}

export interface ContentItem {
  meta: ContentMeta;
  content: string;
}

function getContentDir(type: "tutorials" | "blog"): string {
  return path.join(process.cwd(), "content", type);
}

export function getAllContent(type: "tutorials" | "blog"): ContentMeta[] {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const items = files.map((filename) => {
    const filePath = path.join(dir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return {
      ...data,
      slug: filename.replace(/\.mdx$/, ""),
    } as ContentMeta;
  });

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getContentBySlug(
  type: "tutorials" | "blog",
  slug: string
): ContentItem | null {
  const filePath = path.join(getContentDir(type), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    meta: { ...data, slug } as ContentMeta,
    content,
  };
}

export function getAllSlugs(type: "tutorials" | "blog"): string[] {
  const dir = getContentDir(type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getRelatedContent(
  type: "tutorials" | "blog",
  slug: string,
  limit = 3
): ContentMeta[] {
  const all = getAllContent(type);
  const current = all.find((p) => p.slug === slug);
  if (!current) return all.filter((p) => p.slug !== slug).slice(0, limit);

  const tokenize = (s: string) =>
    new Set(s.toLowerCase().split(/[\s\-_/]+/).filter((t) => t.length > 2));
  const currentTokens = tokenize(current.slug + " " + (current.tags || []).join(" "));
  const currentTags = new Set((current.tags || []).map((t) => t.toLowerCase()));

  return all
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const pTokens = tokenize(p.slug + " " + (p.tags || []).join(" "));
      const pTags = new Set((p.tags || []).map((t) => t.toLowerCase()));
      const tagOverlap = [...currentTags].filter((t) => pTags.has(t)).length;
      const tokenOverlap = [...currentTokens].filter((t) => pTokens.has(t)).length;
      const score = tagOverlap * 3 + tokenOverlap;
      return { item: p, score };
    })
    .sort((a, b) => b.score - a.score || new Date(b.item.date).getTime() - new Date(a.item.date).getTime())
    .slice(0, limit)
    .map((s) => s.item);
}
