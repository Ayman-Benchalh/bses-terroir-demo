import { test, expect } from '@playwright/test';

// Critical Quality Gate: Mobile navigation viewports
const MOBILE_VIEWPORTS = [
  { width: 320, height: 568, name: '320px (iPhone SE 1st gen)' },
  { width: 360, height: 800, name: '360px (Galaxy S20)' },
  { width: 375, height: 667, name: '375px (iPhone 8 / SE)' },
  { width: 390, height: 844, name: '390px (iPhone 14 / 13)' },
  { width: 414, height: 896, name: '414px (iPhone 11 / XR)' },
  { width: 430, height: 932, name: '430px (iPhone 14 Pro Max)' },
];

test.describe('TERROIR Mobile Navigation Quality Gate (Regression Prevention)', () => {
  for (const vp of MOBILE_VIEWPORTS) {
    test(`mobile drawer opens and displays all interactive links clearly at ${vp.name}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/fr');
      await page.waitForSelector('body[data-hydrated="true"]');

      // 1. Locate hamburger button
      const hamburger = page.locator('button[aria-label="Menu"]');
      await expect(hamburger).toBeVisible();

      // 2. Open drawer
      await hamburger.dispatchEvent('click');

      // 3. Drawer dialog must be visible
      const drawer = page.locator('div[role="dialog"][aria-label="Menu"]');
      await expect(drawer).toBeVisible();

      // 4. Critical check: All links must be visible, NOT hidden by overflow or stacking
      const boutiqueLink = drawer.getByRole('link', { name: 'Boutique', exact: true });
      await expect(boutiqueLink).toBeVisible();

      const panierLink = drawer.getByRole('link', { name: 'Créer mon Panier' });
      await expect(panierLink).toBeVisible();

      const listLink = drawer.getByRole('link', { name: 'Ma Liste de Courses' });
      await expect(listLink).toBeVisible();

      const trackingLink = drawer.getByRole('link', { name: 'Suivi de Commande' });
      await expect(trackingLink).toBeVisible();

      // 5. Close button test
      const closeBtn = drawer.locator('button[aria-label="Fermer"]');
      await expect(closeBtn).toBeVisible();
      await closeBtn.dispatchEvent('click');
      await expect(drawer).not.toBeVisible();

      // 6. Re-open and test Escape key closing
      await hamburger.dispatchEvent('click');
      await expect(drawer).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(drawer).not.toBeVisible();
    });
  }
});
