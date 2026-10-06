/**
 * Test Case: End-to-end OpenCart customer shopping flow
 *
 * Tags: @master @sanity @regression @web @end-to-end
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-end shopping flow @master @sanity @regression @web @end-to-end', async ({
    homePage,
    registrationPage,
    loginPage,
    accountPage,
    productPage,
    cartPage,
}) => {
    const customer = {
        firstName: RandomDataUtil.getFirstName(),
        lastName: RandomDataUtil.getLastName(),
        email: RandomDataUtil.getEmail(),
        password: RandomDataUtil.getPassword(14),
    };
    const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

    await test.step('1) Register a new customer with unique generated data', async () => {
        await homePage.openRegistration();
        expect(await registrationPage.isRegistrationPageExists()).toBeTruthy();

        await registrationPage.registerCustomer(customer);
        expect(await registrationPage.isRegistrationSuccessful()).toBeTruthy();
    });

    await test.step('2) Log out and continue to the storefront', async () => {
        await registrationPage.continueAfterRegistration();
        await homePage.openLogout();
        expect(await accountPage.isLogoutPageExists()).toBeTruthy();
        await accountPage.continueAfterLogout();
    });

    await test.step('3) Log in again with the newly created credentials', async () => {
        await homePage.openLogin();
        await loginPage.login(customer.email, customer.password);
        expect(await loginPage.isAccountPageExists()).toBeTruthy();
    });

    await test.step('4) Search for an in-stock known product and open its details', async () => {
        await homePage.searchProduct(productName);
        await productPage.openProduct(productName);
        expect(await productPage.isProductDetailsDisplayed(productName)).toBeTruthy();
        expect(await productPage.isProductInStock()).toBeTruthy();
        expect(await productPage.getProductPrice()).toBe(totalPrice);
    });

    await test.step('5) Add the product to the cart and verify the header confirmation', async () => {
        await productPage.addToCart(productQuantity);
        await expect.poll(() => productPage.getCartSummary()).toContain('1 item(s)');
        await expect.poll(() => productPage.getCartSummary()).toContain(totalPrice);
    });

    await test.step('6) Verify the cart product, quantity, price, and applicable total', async () => {
        await homePage.openShoppingCart();
        expect(await cartPage.isCartPageExists()).toBeTruthy();
        expect(await cartPage.isProductInCart(productName)).toBeTruthy();
        await expect.poll(() => cartPage.getProductQuantity(productName)).toBe(productQuantity);
        expect(await cartPage.getProductPrice(productName)).toBe(totalPrice);
        await expect.poll(() => cartPage.getCartTotal()).toContain(totalPrice);
    });

    console.log('✅ End-to-end customer shopping flow completed successfully.');
});
