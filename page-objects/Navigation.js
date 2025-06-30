import { expect } from "@playwright/test"
import { isDesktopViewport } from "../utils/isDesktopViewport.js"

    export class Navigation {
        constructor(page) {
            this.page = page;
            this.basketCounter = page.locator('[data-qa="header-basket-count"]')
            this.checkOutLink = this.page.getByRole('link', { name: 'Checkout' })
            this.mobileBurgerButton = page.locator('[data-qa="burger-button"]')
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
            if (!isDesktopViewport(this.page)) {
                await this.mobileBurgerButton.waitFor()
                await this.mobileBurgerButton.click()
            }
            await this.checkOutLink.waitFor()
            await this.checkOutLink.click()
            await this.page.waitForURL("/basket")
        }
    }