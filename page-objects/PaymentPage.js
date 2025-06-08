import { expect } from "@playwright/test"
import { PaymentPageData } from "../data/PaymentPageData"
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
        this.cardOwnerInput = page.locator('[data-qa="credit-card-owner"]')
        this.cardNumberIntup = page.locator('[data-qa="credit-card-number"]')
        this.validUntilInput = page.locator('[data-qa="valid-until"]')
        this.cvcInput = page.locator('[data-qa="credit-card-cvc"]')

    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        // console.log(code) // Debug
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
        // console.log(totalIncludingDiscountNumber) // Debug

        const total = await this.total.innerText()
        const totalString = total.replace("$", "")
        const totalNumber = parseInt(totalString, 10)
        // console.log(totalNumber) // Debug
        await expect(totalIncludingDiscountNumber).toBeLessThan(totalNumber)
    }

    fillPaymentDetails = async () => {
        await this.cardOwnerInput.waitFor()
        await this.cardOwnerInput.fill(PaymentPageData.cardOwner)

        await this.cardNumberIntup.waitFor()
        await this.cardNumberIntup.fill(PaymentPageData.cardNumber)

        await this.validUntilInput.waitFor()
        await this.validUntilInput.fill(PaymentPageData.validUntill)

        await this.cvcInput.waitFor()
        await this.cvcInput.fill(PaymentPageData.cvc)

    }

    }
