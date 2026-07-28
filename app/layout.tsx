import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import LoadingScreen from "@/components/LoadingScreen";
import ToastProvider from "@/components/Toast";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import StickyMobileCTA from "@/components/StickyMobileCTA";

// Not needed for first paint — deferring keeps them out of the initial JS bundle.
// ChatWidget also pulls in framer-motion, so this is the single biggest bundle-size win available here.
const ChatWidget = dynamic(() => import("@/components/ChatWidget"), {
  ssr: false,
});
const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
  ssr: false,
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = "https://solvix.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Solvix Solutions — AI Websites & Automation for Growing Businesses",
    template: "%s | Solvix Solutions",
  },
  description:
    "Solvix Solutions builds premium websites, AI chatbots, and business automation that turn visitors into customers — without adding to your workload.",
  keywords: [
    "AI automation agency",
    "AI chatbot for business",
    "custom business website",
    "appointment booking automation",
    "workflow automation",
  ],
  openGraph: {
    title: "Solvix Solutions — AI Websites & Automation for Growing Businesses",
    description:
      "Premium websites, AI chatbots, and automation that generate leads and save you time.",
    url: siteUrl,
    siteName: "Solvix Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solvix Solutions — AI Websites & Automation for Growing Businesses",
    description:
      "Premium websites, AI chatbots, and automation that generate leads and save you time.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Solvix Solutions",
  alternateName: "Solvix",
  url: siteUrl,
  description:
    "Solvix Solutions builds premium websites, AI chatbots, and business automation for growing companies.",
  founder: {
    "@type": "Person",
    name: "Umair",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  areaServed: {
    "@type": "Place",
    name: "Worldwide",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${siteUrl}/contact`,
  },
  // TODO: populate once real profiles exist (LinkedIn, Clutch, G2, X, etc.)
  // An empty array is fine; placeholder/fake URLs would hurt entity trust more than help.
  sameAs: [],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-void text-paper font-body antialiased">
        <LoadingScreen />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ToastProvider>
            <ScrollProgress />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ChatWidget />
            <CommandPalette />
            <BackToTop />
            <StickyMobileCTA />
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
