import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { AccountPage } from '../pages/AccountPage';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { RegistrationPage } from '../pages/RegistrationPage';

dotenv.config();

const APP_URL = process.env.WEB_APP_URL || 'https://demo.opencart.com/';

type PageFixtures = {
    homePage: HomePage;
    registrationPage: RegistrationPage;
    loginPage: LoginPage;
    accountPage: AccountPage;
    productPage: ProductPage;
    cartPage: CartPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
});

test.afterEach(async ({ page, context }) => {
    if (!page.isClosed()) {
        await page.close();
    }
    await context.close();
});

export { expect } from '@playwright/test';
