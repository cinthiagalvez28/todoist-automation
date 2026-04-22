const { test, expect } = require('../../lib/fixtures');
const { PRODUCT_NAMES } = require('../../constants/TestData.js');

test.describe('Products tests', () => {

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  }); 
 
  test('@smoke Load Products: As a standard user, I should be able to see the products loaded.', async ({ productsPage }) => {
    const items = productsPage.inventoryItems;
    await expect(items).toHaveCount(6);
    await expect(items.first()).not.toBeEmpty();
    await expect(items.last()).toBeVisible();
  });
 
  test('Add Products to Cart by index: As a standard user, I should be able to add 1 or more products to cart.', async ({ productsPage }) => {
    const productsToAdd = [1, 3, 4];
    await productsPage.addProductToCartByIndex(productsToAdd);  
    await expect(productsPage.navBar.shoppingCartBadgeSpan).toContainText('3');
  });

  test('@smoke Add Products to Cart by name: As a standard user, I should be able to add 1 or more products to cart.', async ({ productsPage, shoppingCartPage}) => {
    await productsPage.addProductsToCartByName('add',PRODUCT_NAMES); 
    const shoppingCartNames = await shoppingCartPage.getCartItemNames();
    expect(shoppingCartNames).toEqual(expect.arrayContaining(PRODUCT_NAMES));
  });

  test('@smoke Remove Product in Cart: As a standard user, I should be able to remove a product to cart.', async ({ productsPage }) => {
    const productsToAdd = [2];
    await productsPage.addProductToCartByIndex(productsToAdd);
    await expect(productsPage.navBar.shoppingCartBadgeSpan).toContainText('1');
    
    await productsPage.removeProductFromCart([0]);
    await expect(productsPage.navBar.shoppingCartBadgeSpan).not.toBeVisible();
  });

  test('Sort Products by price: As a standard user, I should be able to sort by price (Low to High).', async ({ productsPage }) => {
    await productsPage.sortBy('lohi');
    const priceUI = await productsPage.getPricesList();
    const expectedPrice = [...priceUI].sort((a, b) => a - b);
    expect(priceUI).toEqual(expectedPrice);
  });

  test('Sort Products by Name: As a standard user, I should be able to sort by Name (Z to A).', async ({ productsPage }) => {
    await productsPage.sortBy('za');
    const namesUI = await productsPage.getNamesList();
    const expectedName = [...namesUI].sort((a, b) => a - b);
    expect(namesUI).toEqual(expectedName);
  });
});