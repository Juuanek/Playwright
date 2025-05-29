import { DeliveryDetailsData } from "../data/DeliveryDetailsData"
import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstName = page.getByPlaceholder('First name')
        this.lastName = page.getByRole('textbox', { name: 'Last name' })
        this.street = page.getByRole('textbox', { name: 'Street' })
        this.postCode = page.getByRole('textbox', { name: 'Post code' })
        this.city = page.getByRole('textbox', { name: 'City' })
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.savedAdressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.savedAdressData = page.getByText('JohnyDeepCabeza42-550ZurichPoland')
    }

    fillDetails = async () =>  {
        await this.firstName.waitFor()
        await this.firstName.fill(DeliveryDetailsData.firstName)

        await this.lastName.waitFor()
        await this.lastName.fill(DeliveryDetailsData.lastName)

        await this.street.waitFor()
        await this.street.fill(DeliveryDetailsData.street)

        await this.postCode.waitFor()
        await this.postCode.fill(DeliveryDetailsData.postCode)
        
        await this.city.waitFor()
        await this.city.fill(DeliveryDetailsData.city)

        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption(DeliveryDetailsData.countryDropdown)
    }

    saveAdress = async () => {
        await this.savedAdressButton.waitFor()
        await this.savedAdressButton.click()
        const savedAdressText = this.savedAdressData
        await expect(this.savedAdressData).toEqual(savedAdressText)
    }
}