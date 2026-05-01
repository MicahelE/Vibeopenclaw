import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs, getRelatedContent } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import type { Metadata } from "next";

export const revalidate = 86400;

export async function generateStaticParams() {
  return getAllSlugs("tutorials").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug("tutorials", slug);
  if (!item) return {};

  return {
    title: item.meta.title,
    description: item.meta.description,
    alternates: {
      canonical: `https://vibeopenclaw.com/tutorials/${slug}`,
    },
    openGraph: {
      title: item.meta.title,
      description: item.meta.description,
      type: "article",
      publishedTime: item.meta.date,
      modifiedTime: item.meta.lastModified || item.meta.date,
      authors: [item.meta.author],
    },
  };
}

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getContentBySlug("tutorials", slug);
  if (!item) notFound();

  const relatedTutorials = getRelatedContent("tutorials", slug, 3);
  const lastModified = item.meta.lastModified || item.meta.date;
  const wasUpdated = item.meta.lastModified && item.meta.lastModified !== item.meta.date;

  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: item.meta.title,
    description: item.meta.description,
    author: {
      "@type": "Person",
      name: item.meta.author,
      ...(item.meta.authorSlug && { url: `https://vibeopenclaw.com/authors/${item.meta.authorSlug}` }),
    },
    datePublished: item.meta.date,
    dateModified: lastModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vibeopenclaw.com/tutorials/${slug}`,
    },
    image: `https://vibeopenclaw.com/tutorials/${slug}/opengraph-image`,
    publisher: {
      "@type": "Organization",
      name: "Vibe OpenClaw",
      url: "https://vibeopenclaw.com",
      logo: {
        "@type": "ImageObject",
        url: "https://vibeopenclaw.com/icon.svg",
      },
    },
  };

  const howToJsonLd =
    item.meta.howTo && item.meta.howTo.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: item.meta.title,
          description: item.meta.description,
          image: `https://vibeopenclaw.com/tutorials/${slug}/opengraph-image`,
          step: item.meta.howTo.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
        }
      : null;

  const faqJsonLd =
    item.meta.faqs && item.meta.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: item.meta.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Tutorials", href: "/tutorials" },
          { label: item.meta.title, href: `/tutorials/${slug}` },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {item.meta.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>By {item.meta.author}</span>
          <span>&middot;</span>
          <time dateTime={item.meta.date}>
            Published {new Date(item.meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {wasUpdated && (
            <>
              <span>&middot;</span>
              <time dateTime={lastModified}>
                Updated {new Date(lastModified).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </>
          )}
        </div>
        {item.meta.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.meta.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}
      </header>

      <MdxContent source={item.content} />

      {relatedTutorials.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-10 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Related Tutorials
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTutorials.map((tutorial) => (
              <Card key={tutorial.slug} href={`/tutorials/${tutorial.slug}`}>
                <CardTitle>{tutorial.title}</CardTitle>
                <CardDescription>{tutorial.description}</CardDescription>
              </Card>
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </article>
  );
}
