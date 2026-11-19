import { test, expect } from "@playwright/test";
import { verifyLoginPage, login, verifyErrorMessage } from "../pages/Login";
import { URLS } from "../test-data/url";
import { USERS, ERROR_MESSAGES } from "../test-data/users";

test.describe("Sauce Demo Login", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URLS.login);
    });

    test("Verify login page", async ({ page }) => {
        await verifyLoginPage(page);
    });

    test("Verify login with valid credentials", async ({ page }) => {
        await login(page, USERS.validUser.username, USERS.validUser.password);
        await expect(page).toHaveURL(new RegExp(URLS.inventory));
    });

    test("Verify login with invalid credentials", async ({ page }) => {
        await login(page, USERS.invalidUser.username, USERS.invalidUser.password);
        await verifyErrorMessage(page, ERROR_MESSAGES.invalidCredentials);
    });

    test("Verify login with a locked-out user", async ({ page }) => {
        await login(page, USERS.lockedOutUser.username, USERS.lockedOutUser.password);
        await verifyErrorMessage(page, ERROR_MESSAGES.lockedOutUser);
    });
});
