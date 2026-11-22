import { test, expect } from '@playwright/test';

test.describe('TERROIR Admin Demo & Operations Sandbox', () => {
  test('admin dashboard displays consistent KPIs and operational tabs function', async ({ page }) => {
    await page.goto('/fr/admin-demo');
    await page.waitForSelector('body[data-hydrated="true"]');

    // Overview KPIs check
    await expect(page.locator('text=Chiffre d’Affaires Simulé').or(page.locator('text=Chiffre d\'Affaires Simulé'))).toBeVisible();
    await expect(page.locator('text=Commandes Passées')).toBeVisible();
    await expect(page.locator('text=Panier Moyen')).toBeVisible();

    // Tab 1: Products
    const productsTab = page.getByRole('button', { name: 'Gestion Produits' });
    await productsTab.dispatchEvent('click');
    await expect(page.getByRole('button', { name: 'Ajouter un Produit' })).toBeVisible();

    // Tab 2: Inventory
    const inventoryTab = page.getByRole('button', { name: 'Gestion Stocks' });
    await inventoryTab.dispatchEvent('click');
    await expect(page.locator('text=Stock Actuel')).toBeVisible();

    // Tab 3: Delivery Zones
    const deliveryTab = page.getByRole('button', { name: 'Zones de Livraison' });
    await deliveryTab.dispatchEvent('click');
    await expect(page.locator('text=Casablanca').first()).toBeVisible();

    // Tab 4: Orders
    const ordersTab = page.getByRole('button', { name: 'Commandes Client' });
    await ordersTab.dispatchEvent('click');
    await expect(page.locator('text=CMD-2026-').first()).toBeVisible();

    // Reset button
    const resetBtn = page.getByRole('button', { name: 'Réinitialiser aux Données d’Origine' }).or(
      page.getByRole('button', { name: 'Réinitialiser aux Données d\'Origine' })
    );
    await expect(resetBtn).toBeVisible();
  });
});
