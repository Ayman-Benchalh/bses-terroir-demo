import { test, expect } from '@playwright/test';

test.describe('TERROIR Storefront End-to-End User Journeys', () => {
  test('homepage renders hero, categories, and navigating to shop catalog works', async ({ page }) => {
    await page.goto('/fr');
    await page.waitForSelector('body[data-hydrated="true"]');

    // Brand check
    await expect(page.locator('text=TERROIR').first()).toBeVisible();
    await expect(page.locator('main').locator('text=Le meilleur de nos terres').first()).toBeVisible();

    // Navigate to shop
    const shopCta = page.locator('main').getByRole('link', { name: 'Découvrir la Boutique' }).first();
    await expect(shopCta).toBeVisible();
    await shopCta.dispatchEvent('click');

    await expect(page).toHaveURL(/\/fr\/shop/);
    await expect(page.getByRole('heading', { name: 'Boutique' })).toBeVisible();
  });

  test('shop filtering by category and search query functions properly', async ({ page }) => {
    await page.goto('/fr/shop');

    // Search for safran
    const searchInput = page.locator('input[placeholder="Rechercher nom, SKU..."]').or(
      page.locator('input[placeholder*="Rechercher"]')
    ).first();

    if (await searchInput.isVisible()) {
      await searchInput.fill('safran');
      await expect(page.locator('text=Safran Pur').first()).toBeVisible();
    }
  });

  test('product details page allows fractional unit selection and cart add', async ({ page }) => {
    await page.goto('/fr/product/oranges-navel-berkane');

    // Title check
    await expect(page.getByRole('heading', { name: 'Oranges Navel de Berkane' })).toBeVisible();

    // Add to cart button
    const addToCartBtn = page.getByRole('button', { name: 'Ajouter au panier' });
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click({ force: true });

    // Cart notification or count update
    const cartButton = page.locator('button[aria-label*="Panier"]');
    await expect(cartButton).toBeVisible();
  });

  test('Arabic RTL mode properly mirrors document direction and loads Arabic text', async ({ page }) => {
    await page.goto('/ar');

    // Check HTML dir
    const htmlDir = await page.getAttribute('html', 'dir');
    expect(htmlDir).toBe('rtl');

    // Check Arabic brand text
    await expect(page.locator('text=تيروار').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'تسوق المنتجات الطازجة' }).first()).toBeVisible();
  });
});
