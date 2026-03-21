import { Page, Locator, expect } from '@playwright/test'

export class HomePage {
    readonly page: Page
    readonly products: Locator

    constructor(page: Page) {
        this.page = page
        this.products = page.locator('a[href*="/collections/frontpage/products/"]')
    }

    async goto() {
        await this.page.goto('/')
    }

    async expectToBeLoaded() {
        await expect(this.page).toHaveURL(/sauce-demo\.myshopify\.com/)
        await expect(this.products.first()).toBeVisible()
    }

    firstProduct(): Locator {
        return this.products.first()
    }

    async getFirstProductName(): Promise<string> {
        const productName = (await this.firstProduct().locator('h3').textContent())?.trim()
        if (!productName) {
            throw new Error("First product name was not found on Home Page")
        }
        return productName
    }

    async getFirstProductPrice(): Promise<string> {
        const productPrice = (await this.firstProduct().locator('h4').textContent())?.trim()
        if (!productPrice) {
            throw new Error("First product price was not found on Home Page")
        }
        return productPrice
    }

    async getFirstProductInfo(): Promise<{ name: string; price: string }> {
        const name = await this.getFirstProductName();
        const price = await this.getFirstProductPrice();

        return { name, price }
    }

    async clickFirstProduct() {
        await this.firstProduct().click()
    }

    async open() {
        await this.goto();
        await this.expectToBeLoaded();
    }
}