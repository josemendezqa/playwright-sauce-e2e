import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartSection: Locator;
  readonly totalSection: Locator;
  readonly firstCartRow: Locator;
  readonly quantityInput: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartSection = page.locator('#cart');
    this.totalSection = page.locator('.cart.total h2');
    this.firstCartRow = this.cartSection.locator('.row').first();
    this.quantityInput = this.firstCartRow.locator('input[name="updates[]"]');
    this.removeButton = this.firstCartRow.locator('a[href*="quantity=0"]');  
}

  async expectToBeLoaded() {
    await expect(this.cartSection).toBeVisible();
  }

  async expectProductName(name: string) {
    await expect(this.firstCartRow).toContainText(name);
  }

  async expectProductPrice(price: string) {
    await expect(this.firstCartRow).toContainText(price);
  }

  async expectTotal(price: string) {
    await expect(this.totalSection).toContainText(price);
  }

  async expectQuantity(quantity: string) {
    await expect(this.quantityInput).toHaveValue(quantity);
  }

  async removeProduct() {
  await this.removeButton.click();
  }

  async expectCartToBeEmpty() {
  await expect(this.cartSection).not.toContainText('£');
  }
}