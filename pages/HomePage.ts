import { Locator, Page } from '@playwright/test';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly accountMenu: Locator;
    private readonly searchField: Locator;
    private readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.accountMenu = page.getByRole('link', { name: 'My Account', exact: true }).first();
        this.searchField = page.getByPlaceholder('Search');
        this.shoppingCartLink = page.getByRole('link', { name: 'Shopping Cart', exact: true });
    }

    /**
     * Opens the My Account menu.
     */
    async openAccountMenu(): Promise<void> {
        await this.accountMenu.click();
    }

    /**
     * Opens the customer registration page.
     */
    async openRegistration(): Promise<void> {
        await this.openAccountMenu();
        await this.page.getByRole('link', { name: 'Register', exact: true }).click();
    }

    /**
     * Opens the customer login page.
     */
    async openLogin(): Promise<void> {
        await this.openAccountMenu();
        await this.page.getByRole('link', { name: 'Login', exact: true }).click();
    }

    /**
     * Opens the customer logout page.
     */
    async openLogout(): Promise<void> {
        await this.openAccountMenu();
        await this.page.getByRole('link', { name: 'Logout', exact: true }).click();
    }

    /**
     * Searches for a product by name.
     * @param productName - Product name to search for
     */
    async searchProduct(productName: string): Promise<void> {
        await this.searchField.fill(productName);
        await this.searchField.press('Enter');
    }

    /**
     * Opens the shopping cart.
     */
    async openShoppingCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }
}
