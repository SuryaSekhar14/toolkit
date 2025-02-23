import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://toolkit.surya.dev/', lastModified: new Date().toISOString() },
  ];
}