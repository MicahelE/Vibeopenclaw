import type { Metadata } from "next";
import Script from "next/script";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Analytics } from "@/components/analytics";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vibe OpenClaw — OpenClaw Setup Services, Skills & Tutorials",
    template: "%s | Vibe OpenClaw — OpenClaw Resources",
  },
  description:
    "Professional OpenClaw setup services, curated skills directory, and tutorials. Get expert help configuring OpenClaw with security-vetted skills.",
  metadataBase: new URL("https://vibeopenclaw.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vibeopenclaw.com",
    siteName: "Vibe OpenClaw",
    title: "Vibe OpenClaw — OpenClaw Setup Services, Skills & Tutorials",
    description:
      "Professional OpenClaw setup services, curated skills directory, and tutorials.",
    images: [
      {
        url: "https://vibeopenclaw.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vibe OpenClaw — OpenClaw Setup Services, Skills & Tutorials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe OpenClaw — OpenClaw Setup Services",
    description:
      "Professional OpenClaw setup services, curated skills directory, and tutorials.",
    images: ["https://vibeopenclaw.com/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    }),
    ...(process.env.BING_SITE_VERIFICATION && {
      other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION },
    }),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
      <body className="flex min-h-screen flex-col">
        <Analytics />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
