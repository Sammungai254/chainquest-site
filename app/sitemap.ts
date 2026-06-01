import type { MetadataRoute } from "next";

const SITE_URL = "https://chainquest.co.ke";

/**
 * NOTE: Search engines generally treat URL fragments (#section) as the same
 * page as the base URL, so they don't add ranking value. The anchor entries
 * below are included for completeness as requested, but the homepage itself
 * is what gets indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/#about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#services`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#pricing`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#portfolio`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/#contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/#booking`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
