import { Locator, Page } from '@playwright/test';

export class AccountPage {
    private readonly page: Page;

    // Locators
    private readonly logoutHeading: Locator;
    private readonly continueLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.logoutHeading = page.getByRole('heading', { name: 'Account Logout', exact: true });
        this.continueLink = page.getByRole('link', { name: 'Continue', exact: true });
    }

    /**
     * Verifies that the logout confirmation page is displayed.
     * @returns Promise<boolean> - true if the logout confirmation is displayed
     */
    async isLogoutPageExists(): Promise<boolean> {
        try {
            return await this.logoutHeading.isVisible();
        } catch (error) {
            console.log(`Error checking logout confirmation page: ${error}`);
            return false;
        }
    }

    /**
     * Continues to the storefront after logout.
     */
    async continueAfterLogout(): Promise<void> {
        await this.continueLink.click();
    }
}
