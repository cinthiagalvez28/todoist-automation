const { test, expect } = require('../../lib/fixtures');
const { USER_CREDENTIALS, MESSAGES, DEFAULT_TIMEOUT} = require('../../constants/TestData.js');

test.describe('Products tests', () => {

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  }); 
 
  test('Load Products: As a standard user, I should be able to see the products loaded.', async ({ productsPage }) => {
    const items = productsPage.inventoryItems;
    await expect(items).toHaveCount(6);
    await expect(items.first()).not.toBeEmpty();
    await expect(items.last()).toBeVisible();
  });
 
  test('Add Products to Cart: As a standard user, I should be able to add 1 or more products to cart.', async ({ productsPage }) => {
    const productsToAdd = [0, 1, 2];
    await productsPage.addProductsToCart(productsToAdd);
    
    const actualCount = await productsPage.getCartCount();
    expect(actualCount).toBe(productsToAdd.length);

    for (const index of productsToAdd) {
        const button = productsPage.inventoryItems.nth(index).getByRole('button');
        await expect(button).toHaveText('Remove');       
    }
  });

test('Remove Product in Cart: As a standard user, I should be able to remove a product to cart.', async ({ productsPage }) => {
    await productsPage.inventoryItems.nth(0).getByRole('button', { name: /add to cart/i }).click();
    
    const initialCount = await productsPage.getCartCount();
    expect(initialCount).toBe(1);
    await productsPage.removeItemFromCart(0);

    const finalCount = await productsPage.getCartCount();
    expect(finalCount).toBe(initialCount - 1);
    await expect(productsPage.shoppingCartBadge).toBeHidden();
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