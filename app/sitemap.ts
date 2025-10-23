import type { MetadataRoute } from 'next'

const BASE = 'https://qrkit.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return [
    { url: `${BASE}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/guides`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/guides/event-checkin`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/guides/brand-safe-qr-design`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];
}