import { v4 as uuidv4} from 'uuid';
export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailPlaceholder = page.getByPlaceholder('e-mail')
        this.passwordPlaceholder = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', {name: 'Register'})
    }

    signUpAsNewUser = async () => {
        await this.emailPlaceholder.waitFor()
        const emailId = uuidv4()
        const email = emailId + "@gmail.com"
        await this.emailPlaceholder.fill(email)
        await this.passwordPlaceholder.waitFor()
        const passwordId = uuidv4()
        await this.passwordPlaceholder.fill(passwordId)
        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.pause()
    }
}