import { test, expect } from "@playwright/test";
import { login } from "../pages/Login";
import {
    verifyInventoryPage,
    getProductCount,
    getAllProductNames,
    getAllProductPrices,
    selectSortOption,
    addBackpackToCart,
    removeBackpackFromCart,
    verifyCartBadgeCount,
    verifyCartBadgeNotVisible,
    verifyRemoveBackpackButtonVisible,
    verifyAddToCartBackpackButtonVisible
} from "../pages/Inventory";
import { URLS } from "../test-data/url";
import { USERS } from "../test-data/users";
import { INVENTORY_DATA } from "../test-data/inventoryData";

test.describe("Sauce Demo Inventory", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(URLS.login);
        await login(page, USERS.validUser.username, USERS.validUser.password);
        await expect(page).toHaveURL(new RegExp(URLS.inventory));
    });

    test("Verify inventory page visibility after successful login", async ({ page }) => {
        await verifyInventoryPage(page, INVENTORY_DATA.pageTitle);
    });

    test("Verify product listings", async ({ page }) => {
        const productCount = await getProductCount(page);
        expect(productCount).toBe(INVENTORY_DATA.expectedTotalProducts);

        const productNames = await getAllProductNames(page);
        expect(productNames.length).toBe(INVENTORY_DATA.expectedTotalProducts);
        productNames.forEach(name => {
            expect(name.trim().length).toBeGreaterThan(0);
        });

        const productPrices = await getAllProductPrices(page);
        expect(productPrices.length).toBe(INVENTORY_DATA.expectedTotalProducts);
        productPrices.forEach(price => {
            expect(price).toBeGreaterThan(0);
        });
    });

    test("Verify product sorting functionality", async ({ page }) => {
        // Sort by Price (low to high)
        await selectSortOption(page, INVENTORY_DATA.sortOptions.priceLowToHigh);
        const pricesLowToHigh = await getAllProductPrices(page);
        const expectedSortedPrices = [...pricesLowToHigh].sort((a, b) => a - b);
        expect(pricesLowToHigh).toEqual(expectedSortedPrices);

        // Sort by Name (Z to A)
        await selectSortOption(page, INVENTORY_DATA.sortOptions.nameZtoA);
        const namesZtoA = await getAllProductNames(page);
        const expectedSortedNames = [...namesZtoA].sort().reverse();
        expect(namesZtoA).toEqual(expectedSortedNames);
    });

    test("Verify Add to Cart functionality", async ({ page }) => {
        // Initial state: cart badge should not be visible
        await verifyCartBadgeNotVisible(page);

        // Add item to cart
        await addBackpackToCart(page);
        await verifyCartBadgeCount(page, 1);
        await verifyRemoveBackpackButtonVisible(page);

        // Remove item from cart
        await removeBackpackFromCart(page);
        await verifyCartBadgeNotVisible(page);
        await verifyAddToCartBackpackButtonVisible(page);
    });
});
