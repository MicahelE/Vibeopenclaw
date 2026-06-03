import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PLATFORM_URL } from "@/lib/site";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Managed OpenClaw & Agents Platform",
  description:
    "Fully managed OpenClaw hosting. We run, monitor, secure, and update your OpenClaw and agents so you don't have to. Log in, manage your agents, and let us handle the infrastructure.",
  alternates: {
    canonical: "https://vibeopenclaw.com/managed",
  },
  openGraph: {
    title: "Managed OpenClaw & Agents Platform",
    description:
      "Fully managed OpenClaw hosting. We run, monitor, secure, and update your OpenClaw and agents so you don't have to.",
    url: "https://vibeopenclaw.com/managed",
  },
};

const features = [
  {
    title: "Zero Infrastructure",
    desc: "No servers to provision, no Docker to babysit, no config files to edit. Your OpenClaw runs on our hardened infrastructure from the moment you log in.",
  },
  {
    title: "Agents on Autopilot",
    desc: "Create, deploy, and manage every agent from a single dashboard. Health checks, restarts, and alerts are built in — you see status at a glance.",
  },
  {
    title: "Always Up to Date",
    desc: "Security patches and version upgrades roll out automatically. You're never running a stale, vulnerable build.",
  },
  {
    title: "Security Baked In",
    desc: "Sandboxed execution, scoped permissions, and only security-vetted skills. The hardening we'd hand-configure is the default.",
  },
  {
    title: "Monitoring & Alerts",
    desc: "Real-time visibility into uptime, usage, and errors. If something needs attention, you know before your users do.",
  },
  {
    title: "Scale on Demand",
    desc: "Run one agent or a fleet. Add capacity when you need it and scale back when you don't — no migrations, no downtime.",
  },
];

const comparison = [
  { label: "Installation & hosting", diy: "You set it up", managed: "Done for you" },
  { label: "Security hardening", diy: "Your responsibility", managed: "Built in by default" },
  { label: "Updates & patches", diy: "Manual, ongoing", managed: "Automatic" },
  { label: "Monitoring & alerts", diy: "DIY tooling", managed: "Included dashboard" },
  { label: "Scaling agents", diy: "Re-architect", managed: "One click" },
  { label: "Time to running", diy: "A weekend (or three)", managed: "Minutes" },
];

const steps = [
  { step: "1", title: "Create Your Account", desc: "Sign up at app.vibeopenclaw.com — no credit card to start exploring." },
  { step: "2", title: "Launch Your Agents", desc: "Deploy OpenClaw and your agents from the dashboard. Vetted skills are one click away." },
  { step: "3", title: "We Keep It Running", desc: "Monitoring, patching, and hardening happen automatically. You focus on what your agents do." },
];

const faqs = [
  {
    q: "How is this different from the Setup Service?",
    a: "The Setup Service is a one-time, hands-on configuration of OpenClaw on your own machine. The managed platform hosts and runs everything for you on an ongoing basis — no install, no maintenance, no infrastructure to own.",
  },
  {
    q: "Do I need to manage servers or Docker?",
    a: "No. The platform runs OpenClaw and your agents on managed infrastructure. There's nothing to provision, patch, or babysit.",
  },
  {
    q: "Is it secure?",
    a: "Yes. Execution is sandboxed, permissions are scoped, and only security-vetted skills are available. Security patches roll out automatically.",
  },
  {
    q: "Can I still use my own skills?",
    a: "Yes. You can run vetted skills from our directory and configure agents to fit your workflow from the dashboard.",
  },
];

export default function ManagedPlatformPage() {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-6 pt-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Managed Platform", href: "/managed" },
          ]}
        />
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 py-20 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="inline-block rounded-full bg-red-600/20 px-4 py-1 text-sm font-semibold text-red-300">
            Now live — app.vibeopenclaw.com
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Managed OpenClaw &amp; Agents Platform
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Stop fighting installs, configs, and updates. We host, secure, and run your
            OpenClaw and agents — you log in, manage them from one dashboard, and we
            handle the rest.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              Launch App
            </Button>
            <Button
              href="#how-it-works"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          Everything Managed, Nothing to Maintain
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600 dark:text-gray-400">
          The platform handles the parts of OpenClaw that eat your time, so you can
          focus on what your agents actually do.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => (
            <Card key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.desc}</CardDescription>
            </Card>
          ))}
        </div>
      </section>

      {/* DIY vs Managed */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Self-Hosted vs. Managed
          </h2>
          <p className="mt-3 text-center text-gray-600 dark:text-gray-400">
            The same OpenClaw — without the operational overhead.
          </p>
          <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 bg-gray-100 text-sm font-semibold text-gray-900 dark:bg-gray-800 dark:text-white">
              <div className="px-4 py-3"></div>
              <div className="px-4 py-3 text-center">Self-Hosted</div>
              <div className="px-4 py-3 text-center text-red-600 dark:text-red-400">Managed</div>
            </div>
            {comparison.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 text-sm ${
                  i % 2 === 0
                    ? "bg-white dark:bg-gray-950"
                    : "bg-gray-50 dark:bg-gray-900"
                }`}
              >
                <div className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                  {row.label}
                </div>
                <div className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">
                  {row.diy}
                </div>
                <div className="px-4 py-3 text-center font-medium text-gray-900 dark:text-white">
                  {row.managed}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
          Up and Running in Minutes
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-xl font-bold text-white">
                {item.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-950"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-red-950 via-gray-900 to-gray-950 py-20 text-white">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Let Us Run Your OpenClaw
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">
            Skip the setup and the upkeep. Launch the app, deploy your agents, and let
            the platform keep everything secure, monitored, and up to date.
          </p>
          <div className="mt-8">
            <Button
              href={PLATFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
            >
              Launch App
            </Button>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Managed OpenClaw & Agents Platform",
            serviceType: "Managed hosting",
            description:
              "Fully managed OpenClaw hosting. We run, monitor, secure, and update your OpenClaw and agents.",
            url: PLATFORM_URL,
            provider: {
              "@type": "Organization",
              name: "Vibe OpenClaw",
              url: "https://vibeopenclaw.com",
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
