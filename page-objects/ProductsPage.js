import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"

const isDesktopViewport = (page) => {
    const size = page.viewportSize()
    return size.width >= 600
}

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.productTitles = page.locator('[data-qa="product-title"]')
    }
 
    visit = async () => {
        await this.page.goto("/")
    }

   

    addProductToBasket = async (index) => {
        const specificButton = this.addButtons.nth(index)
        
        await specificButton.waitFor()
        await expect (specificButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        let basketCountBeforeAdding
        if (isDesktopViewport(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCount()
        }
        
        await specificButton.click()
        await expect (specificButton).toHaveText("Remove from Basket")

        if (isDesktopViewport(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect (basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
        

    }
    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitles.first().waitFor()
        const allProductsBeforeSorting = await this.productTitles.allInnerTexts() 
        await this.sortDropdown.selectOption("price-asc")
        const allProductTitlesAfterSorting = await this.productTitles.allInnerTexts()
        expect (allProductsBeforeSorting).not.toEqual(allProductTitlesAfterSorting)
    }
}