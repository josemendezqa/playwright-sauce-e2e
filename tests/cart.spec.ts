import { test, expect } from '../fixtures/test-fixtures';


test.describe('Cart E2E', () => {


    test('should display products on home page', async ({ homePage }) => {
        await test.step('Land on home page', async () => {
            await homePage.open()

        })

        await test.step('Valid first product is displayed', async () => {
            const productName = await homePage.getFirstProductName();
            expect(productName).toBeTruthy();
        })
    });


    test('should add a product to cart and show it in the cart page', async ({ homePage, productPage, cartPage }) => {

        let productName: string;
        let productPrice: string;

        await test.step('Land on home page and get product info', async () => {
            await homePage.open()


            productName = await homePage.getFirstProductName()
            productPrice = await homePage.getFirstProductPrice()
        })

        await test.step('Open first product', async () => {
            await homePage.clickFirstProduct()
            await productPage.expectToBeLoaded()
        })

        await test.step('Add product to cart', async () => {

            await productPage.addToCart()
            await productPage.expectCartCountToBe(1)
        })

        await test.step('Go to checkout', async () => {
            await productPage.clickCheckout()
            await cartPage.expectToBeLoaded()

        })

        await test.step('Validate cart', async () => {
            await cartPage.expectProductName(productName)
            await cartPage.expectProductPrice(productPrice)
            await cartPage.expectTotal(productPrice)
            await cartPage.expectQuantity('1')
        })
    })

    test('should remove product from cart', async ({ homePage, productPage, cartPage }) => {

        await test.step('Land on home page', async () => {
            await homePage.open()

        })

        await test.step('Open first product', async () => {
            await homePage.clickFirstProduct()
            await productPage.expectToBeLoaded()
        })

        await test.step('Add product to cart', async () => {

            await productPage.addToCart()
            await productPage.expectCartCountToBe(1)
        })

        await test.step('Go to checkout', async () => {
            await productPage.clickCheckout()
            await cartPage.expectToBeLoaded();
        })

        await test.step('Remove product', async () => {
            await cartPage.removeProduct();
        })

        await test.step('Validate product was correctly removed', async () => {
            await cartPage.expectCartToBeEmpty();
        })
    });

})