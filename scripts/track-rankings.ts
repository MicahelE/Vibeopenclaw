#!/usr/bin/env tsx
/**
 * Weekly SerpAPI rank tracker.
 *
 * Setup:
 *   - Set SERPAPI_KEY in env (locally via .env.local; in CI as a GitHub Actions secret).
 *   - Run with: tsx scripts/track-rankings.ts
 *   - Output: writes seo-rankings.json (git-tracked) so you can diff weekly.
 *
 * Cost: 14 keywords × 1 query/run = 14 SerpAPI calls per run.
 *       Free tier is 250/month, so weekly runs use ~56/month.
 */

import fs from "fs";
import path from "path";

const KEYWORDS = [
  "openclaw docker",
  "openclaw mcp",
  "openclaw api",
  "openclaw vs cursor",
  "openclaw setup",
  "openclaw self hosting",
  "openclaw security",
  "best openclaw skills",
  "how to install openclaw",
  "openclaw enterprise",
  "openclaw automation",
  "openclaw workflow",
  "openclaw prompt engineering",
  "openclaw slack bot",
];

const TARGET_DOMAIN = "vibeopenclaw.com";

interface RunResult {
  keyword: string;
  totalResults: string | null;
  vibeopenclawPosition: number | null;
  vibeopenclawUrl: string | null;
  topResults: Array<{ position: number; link: string; title: string }>;
  relatedSearches: string[];
  paaQuestions: string[];
  fetchedAt: string;
}

interface SerpAPIResponse {
  search_information?: { total_results?: string };
  organic_results?: Array<{ position: number; link: string; title: string }>;
  related_searches?: Array<{ query: string }>;
  related_questions?: Array<{ question: string }>;
}

async function checkAccount(apiKey: string) {
  const res = await fetch(`https://serpapi.com/account.json?api_key=${apiKey}`);
  const data = (await res.json()) as { total_searches_left?: number; account_status?: string };
  return data;
}

async function querySerp(apiKey: string, q: string): Promise<SerpAPIResponse> {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google");
  url.searchParams.set("q", q);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("num", "10");
  url.searchParams.set("hl", "en");
  url.searchParams.set("gl", "us");
  const res = await fetch(url);
  if (!res.ok) throw new Error(`SerpAPI ${res.status}: ${await res.text()}`);
  return (await res.json()) as SerpAPIResponse;
}

function findPosition(results: SerpAPIResponse["organic_results"], domain: string) {
  if (!results) return { position: null, url: null };
  for (const r of results) {
    if (r.link?.includes(domain)) return { position: r.position, url: r.link };
  }
  return { position: null, url: null };
}

async function main() {
  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    console.error("SERPAPI_KEY not set in environment.");
    process.exit(1);
  }

  const account = await checkAccount(apiKey);
  console.log(`Account: ${account.account_status}, ${account.total_searches_left} searches left.`);
  if ((account.total_searches_left ?? 0) < KEYWORDS.length) {
    console.error(`Not enough searches remaining (need ${KEYWORDS.length}). Aborting.`);
    process.exit(1);
  }

  const results: RunResult[] = [];
  for (const keyword of KEYWORDS) {
    process.stdout.write(`Checking "${keyword}"... `);
    try {
      const data = await querySerp(apiKey, keyword);
      const { position, url } = findPosition(data.organic_results, TARGET_DOMAIN);
      results.push({
        keyword,
        totalResults: data.search_information?.total_results ?? null,
        vibeopenclawPosition: position,
        vibeopenclawUrl: url,
        topResults: (data.organic_results ?? []).slice(0, 5).map((r) => ({
          position: r.position,
          link: r.link,
          title: r.title,
        })),
        relatedSearches: (data.related_searches ?? []).map((r) => r.query).slice(0, 8),
        paaQuestions: (data.related_questions ?? []).map((q) => q.question).slice(0, 6),
        fetchedAt: new Date().toISOString(),
      });
      console.log(position ? `position #${position}` : "not in top 10");
    } catch (err) {
      console.log(`FAILED: ${(err as Error).message}`);
    }
  }

  const outPath = path.join(process.cwd(), "seo-rankings.json");
  const history: RunResult[][] = fs.existsSync(outPath)
    ? JSON.parse(fs.readFileSync(outPath, "utf-8"))
    : [];
  history.push(results);
  fs.writeFileSync(outPath, JSON.stringify(history.slice(-12), null, 2));

  console.log("\n=== Summary ===");
  for (const r of results) {
    const pos = r.vibeopenclawPosition ? `#${r.vibeopenclawPosition}` : "—";
    console.log(`  ${pos.padStart(4)}  ${r.keyword}`);
  }
  console.log(`\nWrote ${outPath} (${history.length} runs in history)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
