import { expect } from "@playwright/test";

const Inventory_Locator = {
    pageTitle: "[data-test='title']",
    inventoryContainer: "[data-test='inventory-container']",
    inventoryItems: "[data-test='inventory-item']",
    itemNames: "[data-test='inventory-item-name']",
    itemPrices: "[data-test='inventory-item-price']",
    sortDropdown: "[data-test='product-sort-container']",
    addToCartBackpack: "[data-test='add-to-cart-sauce-labs-backpack']",
    removeBackpack: "[data-test='remove-sauce-labs-backpack']",
    cartLink: "[data-test='shopping-cart-link']",
    cartBadge: "[data-test='shopping-cart-badge']"
};

const verifyInventoryPage = async (page, expectedTitle) => {
    const titleLocator = page.locator(Inventory_Locator.pageTitle);
    await expect(titleLocator).toBeVisible();
    if (expectedTitle) {
        await expect(titleLocator).toHaveText(expectedTitle);
    }
    await expect(page.locator(Inventory_Locator.inventoryItems).first()).toBeVisible();
};

const getProductCount = async (page) => {
    await page.locator(Inventory_Locator.inventoryItems).first().waitFor({ state: 'visible' });
    return await page.locator(Inventory_Locator.inventoryItems).count();
};

const getAllProductNames = async (page) => {
    await page.locator(Inventory_Locator.itemNames).first().waitFor({ state: 'visible' });
    return await page.locator(Inventory_Locator.itemNames).allInnerTexts();
};

const getAllProductPrices = async (page) => {
    await page.locator(Inventory_Locator.itemPrices).first().waitFor({ state: 'visible' });
    const priceTexts = await page.locator(Inventory_Locator.itemPrices).allInnerTexts();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
};

const selectSortOption = async (page, sortOption) => {
    await page.locator(Inventory_Locator.sortDropdown).selectOption(sortOption);
};

const addBackpackToCart = async (page) => {
    await page.locator(Inventory_Locator.addToCartBackpack).click();
};

const removeBackpackFromCart = async (page) => {
    await page.locator(Inventory_Locator.removeBackpack).click();
};

const verifyCartBadgeCount = async (page, expectedCount) => {
    const badge = page.locator(Inventory_Locator.cartBadge);
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText(String(expectedCount));
};

const verifyCartBadgeNotVisible = async (page) => {
    await expect(page.locator(Inventory_Locator.cartBadge)).not.toBeVisible();
};

const verifyRemoveBackpackButtonVisible = async (page) => {
    await expect(page.locator(Inventory_Locator.removeBackpack)).toBeVisible();
};

const verifyAddToCartBackpackButtonVisible = async (page) => {
    await expect(page.locator(Inventory_Locator.addToCartBackpack)).toBeVisible();
};

export {
    Inventory_Locator,
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
};
