import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://toolkit.surya.dev/', lastModified: new Date().toISOString() },
    { url: 'https://toolkit.surya.dev/image-to-pdf', lastModified: new Date().toISOString() },
    { url: 'https://toolkit.surya.dev/pypi-stats', lastModified: new Date().toISOString() },
    { url: 'https://toolkit.surya.dev/dig', lastModified: new Date().toISOString() },
    { url: 'https://toolkit.surya.dev/clipboard-image-download', lastModified: new Date().toISOString()},
  ];
}