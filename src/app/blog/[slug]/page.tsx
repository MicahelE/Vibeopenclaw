import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs, getAllContent } from "@/lib/content";
import { MdxContent } from "@/components/mdx-content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return getAllSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug("blog", slug);
  if (!item) return {};

  return {
    title: item.meta.title,
    description: item.meta.description,
    alternates: {
      canonical: `https://vibeopenclaw.com/blog/${slug}`,
    },
    openGraph: {
      title: item.meta.title,
      description: item.meta.description,
      type: "article",
      publishedTime: item.meta.date,
      authors: [item.meta.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getContentBySlug("blog", slug);
  if (!item) notFound();

  const allPosts = getAllContent("blog");
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.meta.title,
    description: item.meta.description,
    author: { "@type": "Person", name: item.meta.author },
    datePublished: item.meta.date,
    dateModified: item.meta.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vibeopenclaw.com/blog/${slug}`,
    },
    image: `https://vibeopenclaw.com/blog/${slug}/opengraph-image`,
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
          { label: "Blog", href: "/blog" },
          { label: item.meta.title, href: `/blog/${slug}` },
        ]}
      />

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {item.meta.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>By {item.meta.author}</span>
          <span>&middot;</span>
          <time>
            {new Date(item.meta.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
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

      {relatedPosts.length > 0 && (
        <section className="mt-16 border-t border-gray-200 pt-10 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Related Posts
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((post) => (
              <Card key={post.slug} href={`/blog/${post.slug}`}>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </Card>
            ))}
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </article>
  );
}
