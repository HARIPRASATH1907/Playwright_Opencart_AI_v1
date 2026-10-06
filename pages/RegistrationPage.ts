import { Locator, Page } from '@playwright/test';

export type CustomerRegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export class RegistrationPage {
    private readonly page: Page;

    // Locators
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly confirmationHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.firstNameField = page.getByLabel('First Name');
        this.lastNameField = page.getByLabel('Last Name');
        this.emailField = page.getByLabel('E-Mail');
        this.passwordField = page.getByLabel('Password', { exact: true });
        this.privacyPolicyCheckbox = page.locator('#form-register input[name="agree"]');
        this.continueButton = page.locator('#form-register').getByRole('button', { name: 'Continue' });
        this.confirmationHeading = page.getByRole('heading', { name: 'Your Account Has Been Created!', exact: true });
    }

    /**
     * Verifies that the registration page is displayed.
     * @returns Promise<boolean> - true if the registration page is displayed
     */
    async isRegistrationPageExists(): Promise<boolean> {
        try {
            return await this.page.getByRole('heading', { name: 'Register Account', exact: true }).isVisible();
        } catch (error) {
            console.log(`Error checking registration page: ${error}`);
            return false;
        }
    }

    /**
     * Registers a customer with the supplied details and accepts the privacy policy.
     * @param customer - Customer registration details
     */
    async registerCustomer(customer: CustomerRegistrationData): Promise<void> {
        try {
            await this.firstNameField.fill(customer.firstName);
            await this.lastNameField.fill(customer.lastName);
            await this.emailField.fill(customer.email);
            await this.passwordField.fill(customer.password);
            await this.privacyPolicyCheckbox.check();
            await this.continueButton.click();
        } catch (error) {
            console.log(`Error completing customer registration: ${error}`);
            throw error;
        }
    }

    /**
     * Verifies that account creation succeeded.
     * @returns Promise<boolean> - true if the account-created confirmation is displayed
     */
    async isRegistrationSuccessful(): Promise<boolean> {
        try {
            return await this.confirmationHeading.isVisible();
        } catch (error) {
            console.log(`Error checking registration confirmation: ${error}`);
            return false;
        }
    }

    /**
     * Continues from the account-created confirmation page.
     */
    async continueAfterRegistration(): Promise<void> {
        await this.page.getByRole('link', { name: 'Continue', exact: true }).click();
    }
}
