import { expect } from "@playwright/test"

    export class Navigation {
        constructor(page) {
            this.page = page;
            this.basketCounter = page.locator('[data-qa="header-basket-count"]')
            this.checkOutLink = this.page.getByRole('link', { name: 'Checkout' })
        }
        
        getBasketCount = async () => {
            await this.basketCounter.waitFor()
            //return a number
            const text = await this.basketCounter.innerText()
            // "0" -> 0
            const asNumber = parseInt(text, 10)
            return asNumber
            } 

        goToCheckout = async () => {
            
            await this.checkOutLink.waitFor()
            await this.checkOutLink.click()
            await this.page.waitForURL("/basket")
        }
    }