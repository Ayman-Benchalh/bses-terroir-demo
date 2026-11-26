import { test, expect } from '@playwright/test';

test.describe('TERROIR Cart, Checkout Simulation & Tracking Flow', () => {
  test('customer can add item, complete Moroccan checkout, and track the order', async ({ page }) => {
    // 1. Visit high-value basket product page to satisfy Moroccan minimum order threshold
    await page.goto('/fr/product/coffret-prestige-or-vert-or-rouge');
    await page.waitForSelector('body[data-hydrated="true"]');
    const addBtn = page.getByRole('button', { name: 'Ajouter au panier' }).first();
    await addBtn.dispatchEvent('click');

    // Wait for cart badge to reflect item
    await expect(page.locator('button[aria-label*="Panier (1)"]')).toBeVisible();

    // 2. Open cart page
    await page.goto('/fr/cart');
    await page.waitForSelector('body[data-hydrated="true"]');
    await expect(page.locator('text=Sous-total produits')).toBeVisible();

    // 3. Proceed to checkout
    const checkoutLink = page.getByRole('link', { name: 'Passer la commande simulée' });
    await checkoutLink.dispatchEvent('click');
    await expect(page).toHaveURL(/\/fr\/checkout/);
    await page.waitForSelector('body[data-hydrated="true"]');

    // 4. Fill Moroccan checkout form
    await page.fill('input[placeholder="Ex: Yassine El Mansouri"]', 'Othmane Alami');
    await page.fill('input[placeholder="0612345678"]', '0661998877');
    await page.fill('input[placeholder*="Rue, Numéro"]', '12 Avenue des FAR, Étage 3');

    // 5. Submit simulated order
    const confirmBtn = page.getByRole('button', { name: 'Valider la commande de démonstration' });
    await confirmBtn.dispatchEvent('click');

    // 6. Verify confirmation view
    await expect(page.locator('text=Commande Simulée Enregistrée !')).toBeVisible();
    await expect(page.locator('text=CMD-2026-')).toBeVisible();

    // 7. Track the order
    const trackBtn = page.getByRole('link', { name: 'Suivre ma commande en direct' });
    await trackBtn.dispatchEvent('click');
    await expect(page).toHaveURL(/\/fr\/order-tracking/);
    await expect(page.locator('text=Statut :')).toBeVisible();
  });
});
