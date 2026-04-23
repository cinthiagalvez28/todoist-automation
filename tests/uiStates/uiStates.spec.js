const { test, expect } = require("../../lib/fixtures");

test.describe("UI state tests", () => {
  const productsToTest = [1, 4, 5];
  const expectedCount = String(productsToTest.length);
  
  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
    await productsPage.addProductToCartByIndex(productsToTest);
  });

  test.afterEach(async ({ productsPage }) => {
    await productsPage.removeProductFromCart();
  }); 

  //BUTTON STATE - ADD TO CART BUTTON CHANGES TO REMOVE
  test("As a standard user, I should be able to see the Remove button after adding a products.", async ({ productsPage }) => {
    for (const index of productsToTest) {
      const removeButton = productsPage.getProductButtonState(index, "remove");
      await expect(removeButton).toBeVisible();
      await expect(removeButton).toHaveText(/remove/i);
    }
  });

  //BUTTON STATE - REMOVE BUTTON CHANGES TO ADD TO CART
  test("As a standard user, I should be able see the Add to cart button after removing a product.", async ({ productsPage }) => {
    await productsPage.removeProductFromCart();
    await expect(productsPage.navBar.shoppingCartBadgeSpan).not.toBeVisible();
    for (const index of productsToTest) {
      const addButton = productsPage.getProductButtonState(index, "add");
      await expect(addButton).toBeVisible();
      await expect(addButton).toHaveText(/add to cart/i);
    }
  });

  //CART BADGE SHOULD BE VISIBLE WHILE NAVIGATING BETWEEN PAGES 
  test("As a standard user, I should be able to see the cart badge and the added products when navigating to different pages.", async ({ productsPage, shoppingCartPage, yourInformationPage }) => {
    await expect(productsPage.navBar.shoppingCartBadgeSpan).toBeVisible();
    await expect(productsPage.navBar.shoppingCartBadgeSpan).toHaveText(expectedCount);
    await productsPage.navBar.shoppingCartBtn.click();
    await expect(shoppingCartPage.navBar.shoppingCartBadgeSpan).toHaveText(expectedCount);
    await shoppingCartPage.checkoutBtn.click();
    await expect(yourInformationPage.navBar.shoppingCartBadgeSpan).toHaveText(expectedCount);
    await yourInformationPage.navigateToAllItems();
    await expect(productsPage.navBar.shoppingCartBadgeSpan).toHaveText(expectedCount);
  });

  //CART BADGE SHOULD BE VISIBLE AFTER RELOADING PAGE
  test("As a standard user, I should be able to see the cart badge and the added products after reloading the page.", async ({ productsPage }) => {
    await productsPage.page.reload();
    await expect(productsPage.navBar.shoppingCartBadgeSpan).toBeVisible();
    await expect(productsPage.navBar.shoppingCartBadgeSpan).toHaveText(expectedCount);
  });
});
