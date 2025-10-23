import type { MetadataRoute } from 'next';

const BASE = 'https://qrkit.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  return [
    { url: `${BASE}/`, lastModified: now },
    { url: `${BASE}/guides`, lastModified: now },
    { url: `${BASE}/guides/wifi-qr-codes`, lastModified: now },
    { url: `${BASE}/guides/event-checkin`, lastModified: now },
    { url: `${BASE}/guides/brand-safe-qr-design`, lastModified: now },
    { url: `${BASE}/faq`, lastModified: now },
    { url: `${BASE}/about`, lastModified: now },
    { url: `${BASE}/privacy`, lastModified: now },
    { url: `${BASE}/terms`, lastModified: now },
    { url: `${BASE}/contact`, lastModified: now },
  ];
}