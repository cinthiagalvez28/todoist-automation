const { test, expect } = require('../../lib/fixtures');
const { PRODUCT_NAMES } = require('../../constants/TestData.js');

test.describe('Shopping cart tests', () => {
  
  test.beforeEach(async ({ productsPage, shoppingCartPage }) => {
    await shoppingCartPage.goto();
    if (await shoppingCartPage.navBar.shoppingCartBadgeSpan.isVisible()) {
      const items = Number(await shoppingCartPage.navBar.shoppingCartBadgeSpan.textContent());
      for (let i = 0; i < items; i++) {
        await shoppingCartPage.removeProductByIndex(0); 
      }
    }
    await productsPage.goto();
  });


  // ADD MULTIPLE PRODUCTS TO THE SHOPPING CART AND VERIFY ALL WERE ADDED CORRECTLY
  test(`As a standard user, I should be able to add multiple products to the shopping cart and verify they were added.`, async ({ productsPage, shoppingCartPage }) => {
    for (const productName of PRODUCT_NAMES) {
      await productsPage.addProductByName(productName);
    }
    await productsPage.navBar.shoppingCartBtn.click();
    const shoppingCartNames = await shoppingCartPage.getCartItemNames();
    await expect(shoppingCartNames.sort()).toEqual([...PRODUCT_NAMES].sort());
  });


  // ADD A SINGLE PRODUCT TO THE SHOPPING CART AND VERIFY IT WAS ADDED CORRECTLY
  test(`As a standard user, I should be able to add the product ${PRODUCT_NAMES[0]} to the shopping cart and verify that it was added.`, async ({ productsPage, shoppingCartPage }) => {
    const productName = PRODUCT_NAMES[0];  
    await productsPage.addProductByName(productName);
    await productsPage.navBar.shoppingCartBtn.click();
    const shoppingCartNames = await shoppingCartPage.getCartItemNames();
    await expect(shoppingCartNames).toEqual([productName]);
  });


  // ADD MULTIPLE PRODUCTS TO THE SHOPPING CART AND VERIFY THE SHOPPING CART BADGE IS UPDATED
  test('As a standard user, I should be able to add multiple products to the shopping cart and verify that the shopping cart badge is updated.', async ({ productsPage, shoppingCartPage }) => {
    for (const productName of PRODUCT_NAMES) {
      await productsPage.addProductByName(productName);
    }
    const badgeProductPageNumberOfProducts = Number(await productsPage.navBar.shoppingCartBadgeSpan.textContent());
    await productsPage.navBar.shoppingCartBtn.click();
    const badgeShoppingCartPageNumberOfProducts = Number(await shoppingCartPage.navBar.shoppingCartBadgeSpan.textContent());
    await expect(badgeShoppingCartPageNumberOfProducts).toEqual(badgeProductPageNumberOfProducts);
  });


  // ADD MULTIPLE TO THE SHOPPING CART AND DELETED THEM
  test('As a standard user, I should be able to add multiple products to the shopping cart and delete them.', async ({ productsPage, shoppingCartPage }) => {
    for (const productName of PRODUCT_NAMES) {
      await productsPage.addProductByName(productName);
    }
    await productsPage.navBar.shoppingCartBtn.click();
    for (let i = 0; i < PRODUCT_NAMES.length; i++) {
      await shoppingCartPage.removeProductByIndex(0);
    }
    await expect(shoppingCartPage.itemsDiv).toHaveCount(0);
    await expect(shoppingCartPage.navBar.shoppingCartBadgeSpan).toHaveCount(0);
  });
});