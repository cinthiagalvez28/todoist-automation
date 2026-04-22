const { test, expect } = require('../../lib/fixtures');
const { PRODUCT_NAMES } = require('../../constants/TestData.js');

test.describe('Shopping cart tests', () => {
  
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  // ADD MULTIPLE PRODUCTS TO THE SHOPPING CART AND VERIFY ALL WERE ADDED CORRECTLY
  test(`As a standard user, I should be able to add multiple products to the shopping cart and verify they were added.`, async ({ productsPage, shoppingCartPage }) => {
    await productsPage.addProductsToCartByName('add', PRODUCT_NAMES);  
    await productsPage.navBar.shoppingCartBtn.click();
    const shoppingCartNames = await shoppingCartPage.getCartItemNames();
    expect(shoppingCartNames).toEqual(expect.arrayContaining(PRODUCT_NAMES));
  });

  // ADD A SINGLE PRODUCT TO THE SHOPPING CART AND VERIFY IT WAS ADDED CORRECTLY
  test(`@smoke As a standard user, I should be able to add the product ${PRODUCT_NAMES[0]} to the shopping cart and verify that it was added.`, async ({ productsPage, shoppingCartPage }) => {
    await productsPage.addProductsToCartByName('add', [PRODUCT_NAMES[0]]); 
    await productsPage.navBar.shoppingCartBtn.click();
    const shoppingCartNames = await shoppingCartPage.getCartItemNames();
    await expect(shoppingCartNames).toEqual([PRODUCT_NAMES[0]]);
  });

  // ADD MULTIPLE PRODUCTS TO THE SHOPPING CART AND VERIFY THE SHOPPING CART BADGE IS UPDATED
  test('As a standard user, I should be able to add multiple products to the shopping cart and verify that the shopping cart badge is updated.', async ({ productsPage, shoppingCartPage }) => {
    await productsPage.addProductsToCartByName('add', PRODUCT_NAMES); 
    const badgeProductPageNumberOfProducts = Number(await productsPage.navBar.shoppingCartBadgeSpan.textContent());
    await productsPage.navBar.shoppingCartBtn.click();
    const badgeShoppingCartPageNumberOfProducts = Number(await shoppingCartPage.navBar.shoppingCartBadgeSpan.textContent());
    await expect(badgeShoppingCartPageNumberOfProducts).toEqual(badgeProductPageNumberOfProducts);
  });

  // ADD MULTIPLE TO THE SHOPPING CART AND DELETED THEM
  test('@smoke As a standard user, I should be able to add multiple products to the shopping cart and delete them.', async ({ productsPage, shoppingCartPage }) => {
    await productsPage.addProductsToCartByName('add', PRODUCT_NAMES); 
    await productsPage.navBar.shoppingCartBtn.click();
    for (let i = 0; i < PRODUCT_NAMES.length; i++) {
      await shoppingCartPage.removeProductByIndex(0);
    }
    await expect(shoppingCartPage.itemsDiv).toHaveCount(0);
    await expect(shoppingCartPage.navBar.shoppingCartBadgeSpan).toHaveCount(0);
  });
});