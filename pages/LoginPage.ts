import { Locator, Page } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly accountHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.emailField = page.getByLabel('E-Mail Address');
        this.passwordField = page.getByLabel('Password', { exact: true });
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
        this.accountHeading = page.getByRole('heading', { name: 'My Account', exact: true });
    }

    /**
     * Logs in with the supplied customer credentials.
     * @param email - Customer email address
     * @param password - Customer password
     */
    async login(email: string, password: string): Promise<void> {
        try {
            await this.emailField.fill(email);
            await this.passwordField.fill(password);
            await this.loginButton.click();
        } catch (error) {
            console.log(`Error logging in: ${error}`);
            throw error;
        }
    }

    /**
     * Verifies that the authenticated account page is displayed.
     * @returns Promise<boolean> - true if the account page is displayed
     */
    async isAccountPageExists(): Promise<boolean> {
        try {
            return await this.accountHeading.isVisible();
        } catch (error) {
            console.log(`Error checking authenticated account page: ${error}`);
            return false;
        }
    }
}
