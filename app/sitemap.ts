
import { MetadataRoute } from 'next';
import posts from '@/data/posts.json';

export default function sitemap(): MetadataRoute.Sitemap {
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: baseUrl,
    lastModified: new Date(),
    priority: 1,
  });

  posts.forEach((post) => {
    entries.push({
      url: `${baseUrl}/${post.slug}`,
      lastModified: post.date,
      alternates: {
        languages: {
          en: `${baseUrl}/${post.slug}`,
          hi: `${baseUrl}/hi/${post.slug}`,
        },
      },
    });
    entries.push({
      url: `${baseUrl}/hi/${post.slug}`,
      lastModified: post.date,
      alternates: {
        languages: {
          en: `${baseUrl}/${post.slug}`,
          hi: `${baseUrl}/hi/${post.slug}`,
        },
      },
    });
  });

  return entries;
}