const { test, expect } = require('../../lib/fixtures');

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
    await productsPage.addProductToCart(3);  
    await expect(productsPage.shoppingCartBadge).toContainText('3');
  });

  test('Remove Product in Cart: As a standard user, I should be able to remove a product to cart.', async ({ productsPage }) => {
    await productsPage.addProductToCart(1);
    await expect(productsPage.shoppingCartBadge).toContainText('1');
    
    await productsPage.removeProductFromCart(1);
    await expect(productsPage.shoppingCartBadge).not.toBeVisible();
  });

  test('Sort Products by price: As a standard user, I should be able to sort by price (Low to High).', async ({ productsPage }) => {
    await productsPage.sortBy('lohi');
    const priceUI = await productsPage.getPricesList();
    const expectedPrice = [...priceUI].sort((a, b) => a - b);
    expect(priceUI).toEqual(expectedPrice);
  });

  test('Sort Products by Name: As a standard user, I should be able to sort by Name     .', async ({ productsPage }) => {
    await productsPage.sortBy('za');
    const namesUI = await productsPage.getNamesList();
    const expectedName = [...namesUI].sort((a, b) => a - b);
    expect(namesUI).toEqual(expectedName);
  });
});