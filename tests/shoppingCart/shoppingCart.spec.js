const { test, expect } = require('../../lib/fixtures');

test.describe('Shopping cart tests', () => {
  
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  // ADD RANDOM PRODUCTS TO THE SHOPPING CART AND VERIFY ALL WERE ADDED CORRECTLY
  test('Add random products: As a standard user, I should be able to add random products to the shopping cart and verify that they are all added.', async ({ productsPage, shoppingCartPage }) => {
    const allNames = await productsPage.getInventoryItemNames();
    const randomCount = Math.floor(Math.random() * allNames.length) + 1;
    const selectedNames = [...allNames].sort(() => 0.5 - Math.random()).slice(0, randomCount);
    for (const name of selectedNames) {
      await productsPage.addProductByName(name);
    }
    await productsPage.navBar.shoppingCartBtn.click();
    const shoppingCartNames = await shoppingCartPage.getCartItemNames();
    expect(shoppingCartNames.sort()).toEqual(selectedNames.sort());
  });


  // ADD A SINGLE RANDOM PRODUCT TO THE SHOPPING CART AND VERIFY IT WAS ADDED CORRECTLY
  test('Add a single random product: As a standard user, I should be able to add a single random product to the shopping cart and verify that it was added.', async ({ productsPage, shoppingCartPage }) => {
    const allNames = await productsPage.getInventoryItemNames();
    const randomIndex = Math.floor(Math.random() * allNames.length);
    const selectedName = allNames[randomIndex];
    await productsPage.addToCartByIndex(randomIndex);
    await productsPage.navBar.shoppingCartBtn.click();
    const cartNames = await shoppingCartPage.getCartItemNames();
    expect(cartNames).toContain(selectedName);
  });


  // ADD RANDOM PRODUCTS TO THE SHOPPING CART AND VERIFY THE SHOPPING CART BADGE IS UPDATED
  test('Shopping cart badge: As a standard user, I should be able to add random products to the shopping cart and verify that the shopping cart badge is updated.', async ({ productsPage, shoppingCartPage }) => {
    const allNames = await productsPage.getInventoryItemNames();
    const randomCount = Math.floor(Math.random() * allNames.length) + 1;
    const selectedNames = [...allNames].sort(() => 0.5 - Math.random()).slice(0, randomCount);
    for (const name of selectedNames) {
      await productsPage.addProductByName(name);
    }
    const badgeProductPageNumberOfProducts = await productsPage.navBar.shoppingCartBadgeSpan.textContent();
    await productsPage.navBar.shoppingCartBtn.click();
    const badgeShoppingCartPageNumberOfProducts = await shoppingCartPage.navBar.shoppingCartBadgeSpan.textContent();
    expect(badgeShoppingCartPageNumberOfProducts).toEqual(badgeProductPageNumberOfProducts);
  });


  // ADD RANDOM PRODUCTS TO THE SHOPPING CART AND DELETED THEM
  test('Delete products: As a standard user, I should be able to add random products to the shopping cart and delete them.', async ({ productsPage, shoppingCartPage }) => {
    const allNames = await productsPage.getInventoryItemNames();
    const randomCount = Math.floor(Math.random() * allNames.length) + 1;
    const selectedNames = [...allNames].sort(() => 0.5 - Math.random()).slice(0, randomCount);
    for (const name of selectedNames) {
      await productsPage.addProductByName(name);
    }
    await productsPage.navBar.shoppingCartBtn.click();
    for (let i = 0; i < randomCount; i++) {
      await shoppingCartPage.removeProductByIndex(0);
    }
    expect(shoppingCartPage.itemsDiv).toHaveCount(0);
    expect(shoppingCartPage.navBar.shoppingCartBadgeSpan).toHaveCount(0);
  });
});