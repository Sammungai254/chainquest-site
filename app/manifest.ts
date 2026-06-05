import type { MetadataRoute } from "next";

/**
 * Web App Manifest — controls the install card on Android (and the
 * "Add to Home Screen" / standalone behaviour on Chrome desktop).
 *
 * Next.js serves this at /manifest.webmanifest and auto-emits the
 * <link rel="manifest"> tag in <head>. Theme/background colours match
 * the site shell so there's no white flash on launch.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ChainQuest Ke — Crypto, Web3, AI & Web Dev in Kenya",
    short_name: "ChainQuest Ke",
    description:
      "Kenya's #1 crypto educator and Web3 consultant. Blockchain training, DeFi, AI solutions & modern websites — built in Nairobi.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#080e1e",
    theme_color: "#080e1e",
    categories: ["education", "business", "finance", "productivity"],
    lang: "en-KE",
    icons: [
      // Points at the dynamic apple-icon route (180×180 PNG). Android
      // accepts any size that's >= 192 in practice, and Lighthouse
      // checks for at least one icon — so we declare both 180 and 512.
      // Next 16 typing only allows a single `purpose` per entry, so we
      // list the maskable variant separately rather than as "any maskable".
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
