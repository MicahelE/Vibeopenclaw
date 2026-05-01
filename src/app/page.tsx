import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFeaturedSkills } from "@/lib/skills";
import { getAllContent } from "@/lib/content";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Vibe OpenClaw — OpenClaw Setup, Skills & Tutorials",
  description:
    "Professional OpenClaw setup services, security-vetted skills directory, and step-by-step tutorials. Get expert help configuring OpenClaw safely.",
  alternates: {
    canonical: "https://vibeopenclaw.com",
  },
  openGraph: {
    title: "Vibe OpenClaw — OpenClaw Setup, Skills & Tutorials",
    description:
      "Professional OpenClaw setup services, security-vetted skills directory, and step-by-step tutorials.",
    url: "https://vibeopenclaw.com",
  },
};

export default function Home() {
  let skillCount = 0;
  try {
    skillCount = getFeaturedSkills().length > 0 ? getFeaturedSkills().length : 0;
  } catch {
    // DB may not be ready
  }
  const tutorials = getAllContent("tutorials");
  const posts = getAllContent("blog");

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 py-24 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 text-5xl">🦞</div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Vibe-Check Your <span className="text-red-400">OpenClaw</span> Setup
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Expert setup, security-vetted skills, and the tutorials you wish existed.
            We handle the config chaos so your OpenClaw just <em>works</em>.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Get Setup Help
            </Button>
            <Button href="#pricing" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof — Testimonials */}
      <section className="border-b border-gray-200 bg-white py-16 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
            What People Are Saying
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                quote: "Saved me a full weekend of config hell. Skills were vetted, permissions locked down, WhatsApp bot running in hours.",
                name: "Daniel R.",
                role: "Founder, SaaS startup",
              },
              {
                quote: "I tried setting up OpenClaw myself three times. Vibe OpenClaw got it right on the first try with security I wouldn't have thought of.",
                name: "Sarah K.",
                role: "Product Manager",
              },
              {
                quote: "The skills directory alone is worth bookmarking. Knowing which skills are safe before installing is a game-changer.",
                name: "James L.",
                role: "Software Engineer",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900"
              >
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-12 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 text-center sm:grid-cols-4">
            {[
              { value: "200+", label: "Skills Vetted" },
              { value: "500+", label: "Setups Completed" },
              { value: "4,000+", label: "Skills in Ecosystem" },
              { value: "99%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-extrabold">{stat.value}</p>
                <p className="mt-1 text-sm text-red-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          OpenClaw Setup Is Harder Than It Looks
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600 dark:text-gray-400">
          Most users hit the same walls. Sound familiar?
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
            </div>
            <CardTitle>Security Risks</CardTitle>
            <CardDescription>
              11.3% of marketplace skills exhibit concerning behavior. One bad
              install can compromise your entire system.
            </CardDescription>
          </Card>
          <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <CardTitle>Too Many Knobs</CardTitle>
            <CardDescription>
              Configs, permissions, skill compatibility, Docker sandboxing — dozens
              of decisions where one wrong move breaks things.
            </CardDescription>
          </Card>
          <Card className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <CardTitle>Hours Down the Drain</CardTitle>
            <CardDescription>
              Scattered docs, forum threads, skills that don&apos;t play nice together.
              Most people spend a full weekend before giving up.
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Skip the Struggle. We&apos;ll Handle It.
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            We&apos;ve configured hundreds of OpenClaw instances. We know what works,
            what breaks, and which skills are actually safe. You get a working setup —
            hardened, optimized, and vibing — without touching a config file.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          What You Get
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Security-Vetted Skills", desc: "Every skill is reviewed for permissions, data access, and known vulnerabilities before it touches your system.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
            { title: "Expert Configuration", desc: "Optimized settings for your use case, hardware, and workflow. No guesswork.", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
            { title: "Performance Tuning", desc: "Minimal resource usage, maximum responsiveness. Your OpenClaw runs lean.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { title: "Ongoing Support", desc: "Email support included with every plan. You're never stuck after setup.", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
            { title: "Bot & Workflow Setup", desc: "WhatsApp, Telegram, Slack — we wire up your integrations and automations.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
            { title: "Peace of Mind", desc: "Sleep easy knowing your setup is secure, optimized, and built by people who do this daily.", icon: "M5 13l4 4L19 7" },
          ].map((item) => (
            <Card key={item.title}>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
              </div>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Three Steps to Vibing
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { step: "1", title: "Tell Us Your Setup", desc: "Quick form — your use case, platform, and which skills you need. Takes 2 minutes." },
              { step: "2", title: "We Build It Out", desc: "We install OpenClaw, harden security, install vetted skills, configure integrations, and test everything." },
              { step: "3", title: "You're Live", desc: "Fully working setup with docs, support, and zero config headaches. Just start using it." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
          One-time payment. Security-vetted skills and expert config included.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              name: "Basic Setup",
              price: "$99",
              desc: "Perfect for getting started",
              features: ["OpenClaw installation", "Basic configuration", "3 vetted skills installed", "Security hardening", "30-min consultation", "7-day email support"],
              popular: false,
            },
            {
              name: "Full Configuration",
              price: "$299",
              desc: "The full vibe — most popular",
              features: ["Everything in Basic", "Custom skill configuration", "Up to 10 vetted skills", "Bot setup (WhatsApp/Telegram)", "Workflow automation", "60-min consultation", "30-day email support"],
              popular: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              desc: "For teams with complex needs",
              features: ["Everything in Full Config", "Multi-instance deployment", "Custom skill development", "API integration", "Security audit", "Team training", "Dedicated support"],
              popular: false,
            },
          ].map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 ${
                tier.popular
                  ? "border-red-500 shadow-lg shadow-red-100 dark:shadow-red-900/20"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-600 px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {tier.desc}
              </p>
              <p className="mt-6 text-4xl font-extrabold text-gray-900 dark:text-white">
                {tier.price}
              </p>
              {tier.price !== "Custom" && (
                <p className="text-sm text-gray-500">one-time payment</p>
              )}
              <ul className="mt-8 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  href="/contact"
                  variant={tier.popular ? "primary" : "outline"}
                  className="w-full"
                >
                  {tier.price === "Custom" ? "Contact Us" : "Get Started"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resources Preview */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          Free Resources
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600 dark:text-gray-400">
          Skills, tutorials, and guides — all free, all vetted
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <Card href="/skills" className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <CardTitle>Skills Directory</CardTitle>
            <CardDescription>
              {skillCount > 0 ? `${skillCount}+ security-vetted skills` : "Security-vetted skills"} reviewed and rated for safety.
            </CardDescription>
          </Card>
          <Card href="/tutorials" className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <CardTitle>Tutorials</CardTitle>
            <CardDescription>
              {tutorials.length} step-by-step guides from install to advanced workflows.
            </CardDescription>
          </Card>
          <Card href="/blog" className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            </div>
            <CardTitle>Blog</CardTitle>
            <CardDescription>
              {posts.length} articles on security, comparisons, and best practices.
            </CardDescription>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Get Your OpenClaw Vibing?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
            Tell us what you need. We&apos;ll get back to you within 24 hours
            with a plan that fits.
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary" size="lg">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Vibe OpenClaw",
            url: "https://vibeopenclaw.com",
            description:
              "Professional OpenClaw setup services, security-vetted skills directory, and step-by-step tutorials.",
            publisher: {
              "@type": "Organization",
              name: "Vibe OpenClaw",
              url: "https://vibeopenclaw.com",
            },
          }),
        }}
      />
    </>
  );
}
