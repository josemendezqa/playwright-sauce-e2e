import { Page, Locator, expect } from '@playwright/test'

export class ProductPage {
    readonly page: Page
    readonly addToCartButton: Locator
    readonly cartCount: Locator
    readonly checkoutLink: Locator

    
    constructor(page: Page){
        this.page = page
        this.addToCartButton = page.locator('input[value="Add to Cart"]')
        this.cartCount = page.locator('#cart-target-desktop')    
        this.checkoutLink = page.getByRole('link', { name: /check out/i })        
    }

    async expectToBeLoaded() {
    await expect(this.page).toHaveURL(/\/products\//);
    await expect(this.addToCartButton).toBeVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async expectCartCountToBe(count: number) {
    await expect(this.cartCount).toHaveText(`(${count})`);
  }

  async clickCheckout() {
    await this.checkoutLink.click();
  }
}