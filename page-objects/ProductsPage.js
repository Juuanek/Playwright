import { expect } from "@playwright/test"

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
        await specificButton.click()
        await expect (specificButton).toHaveText("Remove from Basket")

    }
}