import { expect } from "@playwright/test";

const SignUp_Locator = {
    "SignupEmai": "//input[@id='user-name']",
    "SignupPaasword": "//input[@id='password']",
    "SignUpSubmitButton": "//input[@id='login-button']",
    "ErrorMessage": "[data-test='error']"
};

const verifyLoginPage = async (page) => {
    await expect(page.locator(SignUp_Locator.SignupEmai)).toBeVisible();
    await expect(page.locator(SignUp_Locator.SignupPaasword)).toBeVisible();
    await expect(page.locator(SignUp_Locator.SignUpSubmitButton)).toBeVisible();
};

const login = async (page, username, password) => {
    if (username) {
        await page.locator(SignUp_Locator.SignupEmai).fill(username);
    }
    if (password) {
        await page.locator(SignUp_Locator.SignupPaasword).fill(password);
    }
    await page.locator(SignUp_Locator.SignUpSubmitButton).click();
};

const verifyErrorMessage = async (page, expectedMessage) => {
    const errorLocator = page.locator(SignUp_Locator.ErrorMessage);
    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toHaveText(expectedMessage);
};

export { verifyLoginPage, login, verifyErrorMessage, SignUp_Locator };
