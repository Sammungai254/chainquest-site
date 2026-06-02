import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import WhatsAppFloat from "@/components/ui/WhatsAppFloat";

const SITE_URL = "https://chainquest.co.ke";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ChainQuest Ke — Blockchain, AI & Web Development in Kenya",
    template: "%s | ChainQuest Ke — Crypto & Web3 Education Kenya",
  },
  description:
    "Kenya's leading crypto educator and Web3 consultant. Learn blockchain trading, DeFi, NFTs and get expert web & AI solutions in Nairobi. 50+ clients served across East Africa.",
  keywords: [
    "crypto education Kenya",
    "blockchain training Nairobi",
    "Web3 consultant Kenya",
    "DeFi Kenya",
    "NFT Kenya",
    "AI solutions Nairobi",
    "web developer Nairobi",
    "cryptocurrency trading Kenya",
    "blockchain educator East Africa",
  ],
  authors: [{ name: "Samuel Mungai Owino", url: SITE_URL }],
  creator: "Samuel Mungai",
  publisher: "ChainQuest Ke",
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [{ url: "/vercel.svg", type: "image/svg+xml" }],
    shortcut: "/vercel.svg",
    apple: "/vercel.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: SITE_URL,
    siteName: "ChainQuest Ke",
    title: "ChainQuest Ke — Blockchain, AI & Web Development in Kenya",
    description:
      "Kenya's leading crypto educator and Web3 consultant. Learn blockchain trading, DeFi, NFTs and get expert web & AI solutions in Nairobi. 50+ clients served across East Africa.",
    images: [
      {
        url: "/images/trainer.jpg",
        width: 1200,
        height: 630,
        alt: "ChainQuest Ke — Crypto, AI & Web Development in Kenya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ChainQuestKe",
    creator: "@ChainQuestKe",
    title: "ChainQuest Ke — Blockchain, AI & Web Development in Kenya",
    description:
      "Kenya's leading crypto educator and Web3 consultant. Blockchain trading, DeFi, NFTs, web & AI solutions in Nairobi.",
    images: ["/images/trainer.jpg"],
  },
  category: "technology",
  other: {
    "google-site-verification": process.env.NEXT_PUBLIC_GSC_VERIFICATION || "",
  },
};

export const viewport: Viewport = {
  themeColor: "#080e1e",
  width: "device-width",
  initialScale: 1,
};

// --- Structured Data (JSON-LD) -------------------------------------------------

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Samuel Mungai",
  url: SITE_URL,
  image: `${SITE_URL}/images/trainer.jpg`,
  jobTitle: "Crypto Educator, Blockchain Analyst & Web Developer",
  description:
    "Crypto educator, blockchain analyst, and web developer based in Nairobi, Kenya. Founder of ChainQuest Ke.",
  worksFor: {
    "@type": "Organization",
    name: "ChainQuest Ke",
    url: SITE_URL,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  knowsAbout: [
    "Cryptocurrency",
    "Blockchain",
    "DeFi",
    "NFTs",
    "Web3",
    "Web Development",
    "AI Solutions",
  ],
  sameAs: [
    "https://twitter.com/chainquestke",
    "https://linkedin.com/company/chainquestke",
    "https://github.com/sammungai254",
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}#business`,
  name: "ChainQuest Ke",
  url: SITE_URL,
  image: `${SITE_URL}/images/trainer.jpg`,
  logo: `${SITE_URL}/images/trainer.jpg`,
  description:
    "Kenya's leading crypto educator and Web3 consultant. Blockchain training, DeFi, NFT education, AI solutions, and web development in Nairobi.",
  email: "mungai.owino@chainquest.co.ke",
  telephone: "+254745381960",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressRegion: "Nairobi County",
    addressCountry: "KE",
  },
  areaServed: [
    { "@type": "Country", name: "Kenya" },
    { "@type": "Place", name: "East Africa" },
  ],
  founder: {
    "@type": "Person",
    name: "Samuel Mungai",
  },
  sameAs: [
    "https://twitter.com/chainquestke",
    "https://linkedin.com/company/chainquestke",
    "https://github.com/sammungai254",
    "https://wa.me/254745381960",
  ],
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Crypto Education & Strategy",
      serviceType: "Cryptocurrency Education",
      provider: { "@id": `${SITE_URL}#business` },
      areaServed: { "@type": "Country", name: "Kenya" },
      description:
        "Beginner-to-advanced training on cryptocurrency trading, DeFi, NFTs, and portfolio strategy.",
    },
    {
      "@type": "Service",
      name: "Web3 Consulting",
      serviceType: "Blockchain Consulting",
      provider: { "@id": `${SITE_URL}#business` },
      areaServed: { "@type": "Country", name: "Kenya" },
      description:
        "Web3 advisory and blockchain integration for businesses looking to enter the decentralised economy.",
    },
    {
      "@type": "Service",
      name: "AI Solutions & Automation",
      serviceType: "Artificial Intelligence",
      provider: { "@id": `${SITE_URL}#business` },
      areaServed: { "@type": "Country", name: "Kenya" },
      description:
        "Custom AI-powered automation, chatbots, and workflow tools for African businesses.",
    },
    {
      "@type": "Service",
      name: "Web Development",
      serviceType: "Web Development",
      provider: { "@id": `${SITE_URL}#business` },
      areaServed: { "@type": "Country", name: "Kenya" },
      description:
        "Modern, fast, SEO-friendly websites built with Next.js, React, and Tailwind CSS.",
    },
  ],
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ENABLE_GA = process.env.NODE_ENV === "production" && Boolean(GA_ID);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body
        className="min-h-screen bg-[#080e1e] text-[#f0f4ff]"
        // Browser extensions (Grammarly, wallet extensions, etc.) inject
        // attributes on <body> before React hydrates. Suppressing the
        // hydration warning here is the React-team-recommended fix.
        suppressHydrationWarning
      >
        {children}
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          // JSON.stringify safely escapes the schema; no user input is injected here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        />
      </body>
      {/* Only load GA4 in production with a configured Measurement ID,
          so dev requests don't pollute analytics. */}
      {ENABLE_GA && <GoogleAnalytics gaId={GA_ID!} />}
    </html>
  );
}
