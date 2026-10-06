import { Locator, Page } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly productHeading: Locator;
    private readonly availability: Locator;
    private readonly unitPrice: Locator;
    private readonly quantityField: Locator;
    private readonly addToCartButton: Locator;
    private readonly cartSummary: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.productHeading = page.locator('#content').getByRole('heading', { level: 1 });
        this.availability = page.getByText('Availability: In Stock', { exact: true });
        this.unitPrice = page.locator('#content h2').first();
        this.quantityField = page.getByLabel('Qty');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart', exact: true });
        this.cartSummary = page.getByRole('button').filter({ hasText: /item\(s\)/ });
    }

    /**
     * Opens a product from the search results.
     * @param productName - Product name to open
     */
    async openProduct(productName: string): Promise<void> {
        await this.page.getByRole('link', { name: productName, exact: true }).first().click();
    }

    /**
     * Verifies that the requested product details are displayed.
     * @param productName - Expected product name
     * @returns Promise<boolean> - true if the product heading is displayed
     */
    async isProductDetailsDisplayed(productName: string): Promise<boolean> {
        try {
            return await this.productHeading.getByText(productName, { exact: true }).isVisible();
        } catch (error) {
            console.log(`Error checking product details: ${error}`);
            return false;
        }
    }

    /**
     * Verifies that the product is currently available.
     * @returns Promise<boolean> - true if the product is in stock
     */
    async isProductInStock(): Promise<boolean> {
        try {
            return await this.availability.isVisible();
        } catch (error) {
            console.log(`Error checking product availability: ${error}`);
            return false;
        }
    }

    /**
     * Reads the displayed product price.
     * @returns Promise<string> - The displayed product price
     */
    async getProductPrice(): Promise<string> {
        return (await this.unitPrice.innerText()).trim();
    }

    /**
     * Adds the requested quantity of the product to the cart.
     * @param quantity - Quantity to add
     */
    async addToCart(quantity: string): Promise<void> {
        try {
            await this.quantityField.fill(quantity);
            await this.addToCartButton.click();
        } catch (error) {
            console.log(`Error adding product to cart: ${error}`);
            throw error;
        }
    }

    /**
     * Reads the updated cart summary displayed in the page header.
     * @returns Promise<string> - Cart item count and total
     */
    async getCartSummary(): Promise<string> {
        return (await this.cartSummary.innerText()).trim();
    }
}
