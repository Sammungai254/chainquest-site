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
      "ChainQuest Ke — Digital Solutions & Systems Development in Nairobi | Software, GIS & AI",
    template: "%s | ChainQuest Ke",
  },
  // Kept under ~155 chars so WhatsApp / iMessage / Google previews show
  // the full sentence without an ellipsis. Leads with the core offering.
  description:
    "Nairobi digital solutions firm building software, business systems, GIS & AI integrations — plus Web3 education. 50+ clients served across East Africa.",
  keywords: [
    "software development Nairobi",
    "digital solutions Kenya",
    "business systems Kenya",
    "GIS solutions Nairobi",
    "spatial data Kenya",
    "AI integration Nairobi",
    "web developer Nairobi",
    "custom software East Africa",
    "blockchain & crypto education Kenya",
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
      "ChainQuest Ke — Digital Solutions & Systems Development in Nairobi",
    description:
      "Software, business systems, GIS & AI integration — built in Nairobi, plus Web3 education. 50+ clients served across East Africa.",
    // Image is auto-wired from app/opengraph-image.tsx. Don't redeclare
    // `images` here or a static image would override the dynamic
    // 1200×630 share card.
  },
  twitter: {
    card: "summary_large_image",
    site: "@ChainQuestKe",
    creator: "@ChainQuestKe",
    title:
      "ChainQuest Ke — Digital Solutions & Systems Development in Nairobi",
    description:
      "Software · GIS · AI Integration · Web3 Education — Nairobi, Kenya. 50+ clients across East Africa.",
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
  jobTitle: "Software & GIS Developer, Founder of ChainQuest Ke",
  description:
    "Software and GIS developer based in Nairobi, Kenya. Founder and lead engineer of ChainQuest Ke, building production business systems, GIS solutions, and AI integrations.",
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
    "Software Development",
    "Business Systems",
    "GIS & Spatial Data",
    "AI Integration",
    "Web Development",
    "Blockchain",
    "Web3 Education",
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
  image: `${SITE_URL}/opengraph-image`,
  logo: `${SITE_URL}/opengraph-image`,
  description:
    "Nairobi-based digital solutions firm delivering software, business systems, GIS & spatial data, and AI integration — plus Web3 and crypto education.",
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
      name: "Software & Web Development",
      serviceType: "Software Development",
      provider: { "@id": `${SITE_URL}#business` },
      areaServed: { "@type": "Country", name: "Kenya" },
      description:
        "Production web platforms, business systems, and APIs built with Django, Next.js, React, and PostgreSQL.",
    },
    {
      "@type": "Service",
      name: "AI Solutions & Automation",
      serviceType: "Artificial Intelligence",
      provider: { "@id": `${SITE_URL}#business` },
      areaServed: { "@type": "Country", name: "Kenya" },
      description:
        "Custom AI-powered automation, chatbots, and workflow tools integrated into existing business systems.",
    },
    {
      "@type": "Service",
      name: "GIS & Spatial Data Solutions",
      serviceType: "Geographic Information Systems",
      provider: { "@id": `${SITE_URL}#business` },
      areaServed: { "@type": "Country", name: "Kenya" },
      description:
        "Geospatial processing, mapping, and spatial analysis for land, infrastructure, and business use cases.",
    },
    {
      "@type": "Service",
      name: "Crypto & Web3 Education",
      serviceType: "Cryptocurrency Education",
      provider: { "@id": `${SITE_URL}#business` },
      areaServed: { "@type": "Country", name: "Kenya" },
      description:
        "Practical blockchain and trading education for individuals and teams — beginner to advanced.",
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
