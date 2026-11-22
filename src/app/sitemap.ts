import { MetadataRoute } from 'next';
import { PRODUCTS_SEED } from '@/data/products.seed';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bses-terroir-demo.vercel.app';
  const locales = ['fr', 'en', 'ar'];
  const routes = [
    '',
    '/shop',
    '/build-a-basket',
    '/shopping-list',
    '/cart',
    '/checkout',
    '/order-tracking',
    '/admin-demo',
    '/design-system',
  ];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach((route) => {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1.0 : 0.8,
      });
    });

    PRODUCTS_SEED.forEach((product) => {
      entries.push({
        url: `${baseUrl}/${locale}/product/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  return entries;
}
