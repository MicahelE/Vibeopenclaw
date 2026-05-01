"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

import { GA_MEASUREMENT_ID, trackEvent } from "@/lib/analytics";

const SEARCH_ENGINE_HOSTS = [
  "google.",
  "bing.",
  "duckduckgo.",
  "yahoo.",
  "yandex.",
  "baidu.",
  "ecosia.",
  "brave.",
  "kagi.",
  "qwant.",
  "naver.",
  "seznam.",
  "startpage.",
];

const AI_ENGINE_HOSTS = [
  "chat.openai.com",
  "chatgpt.com",
  "perplexity.ai",
  "claude.ai",
  "gemini.google.com",
  "copilot.microsoft.com",
  "you.com",
  "phind.com",
];

function classifyReferrer(referrer: string): "organic" | "ai" | null {
  if (!referrer) return null;
  let host: string;
  try {
    host = new URL(referrer).host.toLowerCase();
  } catch {
    return null;
  }
  if (host.includes(typeof window !== "undefined" ? window.location.host : "")) return null;
  if (AI_ENGINE_HOSTS.some((h) => host.includes(h))) return "ai";
  if (SEARCH_ENGINE_HOSTS.some((h) => host.includes(h))) return "organic";
  return null;
}

function AnalyticsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ""),
      });
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("vc_landing_tracked")) return;
    const referrer = document.referrer;
    const kind = classifyReferrer(referrer);
    if (!kind) return;
    let referrerHost = "";
    try {
      referrerHost = new URL(referrer).host;
    } catch {
      // ignore
    }
    trackEvent(kind === "ai" ? "ai_landing" : "organic_landing", {
      referrer_host: referrerHost,
      landing_path: window.location.pathname,
    });
    sessionStorage.setItem("vc_landing_tracked", "1");
  }, []);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <AnalyticsInner />
    </Suspense>
  );
}
