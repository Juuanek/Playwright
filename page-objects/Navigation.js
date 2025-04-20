import { expect } from "@playwright/test"

    export class Navigation {
        constructor(page) {
            this.page = page;
            this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        }
        
        getBasketCount = async () => {
            await this.basketCounter.waitFor()
            //return a number
            const text = await this.basketCounter.innerText()
            // "0" -> 0
            const asNumber = parseInt(text, 10)
            return asNumber
            } 
    }