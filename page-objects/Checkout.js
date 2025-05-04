import { expect } from "@playwright/test"

export class Checkout {
    constructor(page) {
        this.page = page;
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')

    }

    removeCheapestProduct = async () => {
       await this.basketCards.first().waitFor()
       await this.basketItemPrice.first().waitFor()
       const allPriceTexts = await this.basketItemPrice.allInnerTexts()

       const justNumbers = allPriceTexts.map((element) => {
        const withoutDollarSign = element.replace("$","")
        return parseInt(withoutDollarSign, 10)

       })
       const smallestPrice = Math.min(...justNumbers)
       console.log("smallest price is" + smallestPrice)
       const indexOfSmallestPrice = justNumbers.indexOf(smallestPrice)
       console.log("Inex of smallest pirce is" + indexOfSmallestPrice)
       const removingLowest = this.page.getByRole('button', { name: 'Remove from basket' }).nth(indexOfSmallestPrice)
       removingLowest.waitFor()
       await removingLowest.click()
       console.log("The remove button was clicked on the lowest price item")
    
    }

    countOfProductsInBasket = async () => {
        const itemsBeforeRemoval = await this.basketCards.count()

       console.log("Products in basket = " + itemsBeforeRemoval)

    
    }
}