import { expect } from "@playwright/test"

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
    }
 
    visit = async () => {
        await this.page.goto("/")
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        //return a number
        const text = await this.basketCounter.innerText()
        // "0" -> 0
        const asNumber = parseInt(text, 10)
        return asNumber
        } 

    addProductToBasket = async (index) => {
        const specificButton = this.addButtons.nth(index)
        
        await specificButton.waitFor()
        await expect (specificButton).toHaveText("Add to Basket")
        const basketCountBeforeAdding = await this.getBasketCount()
        await specificButton.click()
        await expect (specificButton).toHaveText("Remove from Basket")
        const basketCountAfterAdding = await this.getBasketCount()
        expect (basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)

    }
}