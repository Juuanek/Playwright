import { test, expect } from "@playwright/test"
import { ProductsPage } from "../page-objects/ProductsPage"
import { Navigation } from "../page-objects/Navigation"
import { Checkout } from "../page-objects/Checkout"



test("New user full e2e test journey", async ({ page }) => {
    const productsPage = new ProductsPage(page)

    await productsPage.visit()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)

    const navigation = new Navigation(page)
    await navigation.goToCheckout()

    const checkout = new Checkout(page)
    const before = await checkout.countOfProductsInBasketBefore();

    await checkout.removeCheapestProduct();
    await checkout.checkIfProductRemoved();
    const after = await checkout.countOfProductsInBasketAfter();
    
    console.log("before= " + before)
    console.log("after= " + after)
    expect(before).not.toEqual(after);
    })

    test("dropdowns", async ({ page }) => {
        const productsPage = new ProductsPage(page)
        await productsPage.visit()
        await productsPage.sortByCheapest();
    })
    test.only("continoue to checkout", async ({ page }) => {
        const productsPage = new ProductsPage(page)
        await productsPage.visit()
        const navigation = new Navigation(page)
        await navigation.goToCheckout()
        const checkout = new Checkout(page)
        await checkout.continueToCheckout()
        await loginPage.register()
        

    })