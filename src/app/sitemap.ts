import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://grysics.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-04-06'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/demo`,
      lastModified: new Date('2026-04-06'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
