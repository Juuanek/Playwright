export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstName = page.getByPlaceholder('First name')
        this.lastName = page.getByRole('textbox', { name: 'Last name' })
        this.street = page.getByRole('textbox', { name: 'Street' })
        this.postCode = page.getByRole('textbox', { name: 'Post code' })
        this.city = page.getByRole('textbox', { name: 'City' })
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
    }

    fillDetails = async () =>  {
        await this.firstName.waitFor()
        await this.firstName.fill('Johny')

        await this.lastName.waitFor()
        await this.lastName.fill('Deep')

        await this.street.waitFor()
        await this.street.fill('Cabeza')

        await this.postCode.waitFor()
        await this.postCode.fill('12345')
        
        await this.city.waitFor()
        await this.city.fill('Zurich')

        await this.countryDropdown.waitFor()
        await this.countryDropdown.selectOption('Poland')
    }
}