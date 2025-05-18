export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailPlaceholder = page.getByPlaceholder('e-mail')
        this.passwordPlaceholder = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', {name: 'Register'})
    }

    signUpAsNewUser = async (email, password) => {
        await this.emailPlaceholder.waitFor()
        await this.emailPlaceholder.fill(email)
        await this.passwordPlaceholder.waitFor()
        await this.passwordPlaceholder.fill(password)
        await this.registerButton.waitFor()
        await this.registerButton.click()
    }
}