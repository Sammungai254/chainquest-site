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
    default:
      "ChainQuest Ke — Kenya's #1 Crypto Educator & Web3 Consultant | Blockchain, AI & Web Dev",
    template: "%s | ChainQuest Ke",
  },
  // Kept under ~155 chars so WhatsApp / iMessage / Google previews show
  // the full sentence without an ellipsis. Leads with authority + proof.
  description:
    "Kenya's #1 crypto educator and Web3 consultant. Blockchain training, DeFi, AI solutions & modern websites — built in Nairobi. 50+ clients across East Africa.",
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
  // Icons are auto-wired from app/icon.tsx + app/apple-icon.tsx (Next.js
  // file convention). Don't declare them here or the manual entries will
  // collide with the generated <link> tags.
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
    title:
      "ChainQuest Ke — Kenya's #1 Crypto Educator & Web3 Consultant",
    description:
      "Blockchain training, DeFi, AI solutions & modern websites — built in Nairobi. 50+ clients served across East Africa.",
    // Image is auto-wired from app/opengraph-image.tsx. Don't redeclare
    // `images` here or the static trainer.jpg will override the dynamic
    // 1200×630 share card.
  },
  twitter: {
    card: "summary_large_image",
    site: "@ChainQuestKe",
    creator: "@ChainQuestKe",
    title:
      "ChainQuest Ke — Kenya's #1 Crypto Educator & Web3 Consultant",
    description:
      "Blockchain · DeFi · AI · Web Dev — Nairobi, Kenya. 50+ clients across East Africa.",
    // Image is auto-wired from app/twitter-image.tsx (which re-exports
    // the OG card). Same reason as above — no manual `images` here.
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
      // Next.js 16 no longer suppresses CSS smooth-scrolling during route
      // transitions unless this attribute is present. Without it, navigating
      // from /blog/* back to a /#section anchor mis-scrolls. See the v16
      // upgrade guide ("Scroll Behavior Override").
      data-scroll-behavior="smooth"
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
