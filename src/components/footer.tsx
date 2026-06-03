import Link from "next/link";
import { OpenClawLogo } from "./openclaw-logo";
import { PLATFORM_URL } from "@/lib/site";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { href: "/managed", label: "Managed Platform" },
      { href: PLATFORM_URL, label: "Launch App", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/skills", label: "Skills Directory" },
      { href: "/tutorials", label: "Tutorials" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/setup-service", label: "Setup Service" },
      { href: "/contact", label: "Contact Us" },
      { href: "/about", label: "About" },
    ],
  },
  {
    title: "Community",
    links: [
      { href: "https://github.com/openclaw", label: "GitHub" },
      { href: "https://discord.gg/openclaw", label: "Discord" },
      { href: "https://clawhub.ai", label: "ClawHub" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-xl font-bold text-red-600 dark:text-red-400"
            >
              <OpenClawLogo size={28} />
              Vibe <span className="text-red-500">OpenClaw</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
              Professional OpenClaw setup services, curated skills, and
              tutorials.
            </p>
          </div>
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h4>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-sm text-gray-500 dark:border-gray-800">
          &copy; {new Date().getFullYear()} Vibe OpenClaw. All rights reserved.
          Not affiliated with the OpenClaw project.
        </div>
      </div>
    </footer>
  );
}
