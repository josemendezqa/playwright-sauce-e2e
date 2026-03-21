import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display products on homepage', async ({ page }) => {
    
    await page.goto('/');

    await expect(page).toHaveURL(/sauce-demo\.myshopify\.com/);

    const products = page.locator('a[href*="/collections/frontpage/products/"]');
    await expect(products.first()).toBeVisible();
    await expect(products).not.toHaveCount(0);

    const cartLink = page.getByRole('link', { name: /my cart/i });    
    await expect(cartLink).toBeVisible();
  });
});