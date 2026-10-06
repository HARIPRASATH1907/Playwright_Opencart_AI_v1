import { Locator, Page } from '@playwright/test';

export class CartPage {
    // Locators
    private readonly cartHeading: Locator;
    private readonly cartRows: Locator;
    private readonly totalRow: Locator;

    constructor(page: Page) {
        // Initialize locators with CSS selectors
        this.cartHeading = page.getByRole('heading', { name: /Shopping Cart/ });
        this.cartRows = page.getByRole('row');
        this.totalRow = page.getByRole('row').filter({ hasText: /^Total/ });
    }

    /**
     * Verifies that the shopping cart page is displayed.
     * @returns Promise<boolean> - true if the shopping cart heading is visible
     */
    async isCartPageExists(): Promise<boolean> {
        try {
            return await this.cartHeading.isVisible();
        } catch (error) {
            console.log(`Error checking shopping cart page: ${error}`);
            return false;
        }
    }

    /**
     * Verifies that the expected product appears in the cart.
     * @param productName - Expected product name
     * @returns Promise<boolean> - true if the product row is visible
     */
    async isProductInCart(productName: string): Promise<boolean> {
        try {
            return await this.getProductRow(productName).isVisible();
        } catch (error) {
            console.log(`Error checking cart product: ${error}`);
            return false;
        }
    }

    /**
     * Reads the quantity for the cart row.
     * @param productName - Expected product name
     * @returns Promise<string> - The cart quantity
     */
    async getProductQuantity(productName: string): Promise<string> {
        return this.getProductRow(productName).locator('input[name="quantity"]').inputValue();
    }

    /**
     * Reads the unit price shown in the cart row.
     * @param productName - Expected product name
     * @returns Promise<string> - The displayed unit price
     */
    async getProductPrice(productName: string): Promise<string> {
        return (await this.getProductRow(productName).locator('td').nth(4).innerText()).trim();
    }

    /**
     * Reads the final total shown in the cart totals table.
     * @returns Promise<string> - The displayed cart total
     */
    async getCartTotal(): Promise<string> {
        return (await this.totalRow.innerText()).replace(/\s+/g, ' ').trim();
    }

    private getProductRow(productName: string): Locator {
        return this.cartRows.filter({ hasText: productName });
    }
}
