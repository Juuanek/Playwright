import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addButtons = page.locator('[data-qa="product-button"]')
    }
 
    visit = async () => {
        await this.page.goto("/")
    }

   

    addProductToBasket = async (index) => {
        const specificButton = this.addButtons.nth(index)
        
        await specificButton.waitFor()
        await expect (specificButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        const basketCountBeforeAdding = await navigation.getBasketCount()
        await specificButton.click()
        await expect (specificButton).toHaveText("Remove from Basket")
        const basketCountAfterAdding = await navigation.getBasketCount()
        expect (basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)

    }
}