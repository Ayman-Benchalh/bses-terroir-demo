import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const AUDIT_VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop-1440px' },
  { width: 768, height: 1024, name: 'tablet-768px' },
  { width: 390, height: 844, name: 'mobile-390px' },
  { width: 320, height: 568, name: 'small-mobile-320px' },
];

test.describe('TERROIR Visual Regression & Responsive Audit', () => {
  test.setTimeout(60000);

  test.beforeAll(async () => {
    const dir = path.join(process.cwd(), 'tests', 'evidence');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  for (const vp of AUDIT_VIEWPORTS) {
    test(`capture responsive visual evidence at ${vp.name}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // 1. Homepage
      await page.goto('/fr');
      await page.waitForSelector('body[data-hydrated="true"]');
      await page.screenshot({
        path: `tests/evidence/homepage-${vp.name}.png`,
        fullPage: false,
      });

      // 2. Shop Catalog
      await page.goto('/fr/shop');
      await page.waitForSelector('body[data-hydrated="true"]');
      await page.screenshot({
        path: `tests/evidence/shop-${vp.name}.png`,
        fullPage: false,
      });

      // 3. Basket Builder Flagship
      await page.goto('/fr/build-a-basket');
      await page.waitForSelector('body[data-hydrated="true"]');
      await page.screenshot({
        path: `tests/evidence/basket-builder-${vp.name}.png`,
        fullPage: false,
      });

      // 4. Admin Demo Sandbox
      await page.goto('/fr/admin-demo');
      await page.waitForSelector('body[data-hydrated="true"]');
      await page.screenshot({
        path: `tests/evidence/admin-demo-${vp.name}.png`,
        fullPage: false,
      });

      // 5. Arabic RTL Mode
      await page.goto('/ar');
      await page.waitForSelector('body[data-hydrated="true"]');
      await page.screenshot({
        path: `tests/evidence/arabic-rtl-${vp.name}.png`,
        fullPage: false,
      });
    });
  }
});
