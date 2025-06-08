import { expect } from "@playwright/test"
export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountCodeInput = page.locator('[data-qa="discount-code-input"]')
        this.discountButton = page.locator('[data-qa="submit-discount-button"]')
        this.discountInfo = page.locator('[data-qa="discount-active-message"]')
        this.totalIncludingDiscountLocator = page.locator('[data-qa="total-with-discount-value"]')
        this.total = page.locator('[data-qa="total-value"]')
    }
    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        console.log(code)
        await this.discountCodeInput.waitFor()
        await this.discountCodeInput.fill(code)
        await expect(this.discountCodeInput).toHaveValue(code)

        expect(await this.discountInfo.isVisible()).toBe(false)
        await this.discountButton.waitFor()
        await this.discountButton.click()
        await this.discountInfo.isVisible()

        const totalIncludingDiscount = await this.totalIncludingDiscountLocator.innerText()
        const totalIncludingDiscountString = totalIncludingDiscount.replace("$", "")
        const totalIncludingDiscountNumber = parseInt(totalIncludingDiscountString, 10)
        console.log(totalIncludingDiscountNumber)

        const total = await this.total.innerText()
        const totalString = total.replace("$", "")
        const totalNumber = parseInt(totalString, 10)
        console.log(totalNumber)
        

        await expect(totalIncludingDiscountNumber).toBeLessThan(totalNumber)
    }

    }
