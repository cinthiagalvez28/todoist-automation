const { faker } = require('@faker-js/faker');
const { test, expect } = require('../../lib/fixtures.js');
const { PRODUCT_NAMES, MESSAGES, DEFAULT_TIMEOUT } = require('../../constants/TestData.js');

test.describe('Checkout: Complete tests', () => {

  test.beforeEach(async ({ productsPage, shoppingCartPage, yourInformationPage, overviewPage }) => {
    await productsPage.goto();

    await productsPage.addProductsToCartByName('add', [PRODUCT_NAMES[0]]);  
    await productsPage.navBar.shoppingCartBtn.click();
    await shoppingCartPage.checkoutBtn.click();
    await yourInformationPage.submitYourInformationForm(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode('#####'));
    await expect(overviewPage.overviewTitle).toBeVisible({timeout: DEFAULT_TIMEOUT});
  });

  // COMPLETE FlOW TO ADD PRODUCST, GO TO CART, CHECKOUT AND BE REDIRECTED TO THE COMPLETE PAGE
  test(`As a standard user, I should be able to complete the checkout flow and get the order confirmation of 1 product.`, async ({ overviewPage, completePage }) => {
    const subTotal = await overviewPage.getSubtotalPrice();
    await expect(overviewPage.subtotalLbl).toHaveText(new RegExp(subTotal.toString()));
    const total = await overviewPage.getTotalAmount();
    await expect(overviewPage.totalLbl).toHaveText(new RegExp(total.toString()));
    await overviewPage.finishBtn.click();
    await expect(completePage.completeHeader).toBeVisible({timeout: DEFAULT_TIMEOUT});
    await expect(completePage.completeHeader).toContainText(MESSAGES.COMPLETE.HEADER);
    await expect(completePage.completeText).toBeVisible({timeout: DEFAULT_TIMEOUT});
    await expect(completePage.completeText).toContainText(MESSAGES.COMPLETE.TEXT);
  });

  // COMPLETE FlOW TO ADD PRODUCST, GO TO CART, CHECKOUT AND BE REDIRECTED TO THE PRODUCTS PAGE
  test(`As a standard user, I should be able to complete the checkout flow and get the order confirmation and go back to home.`, async ({ productsPage, overviewPage, completePage }) => { 
    const total = await overviewPage.getTotalAmount();
    await expect(overviewPage.totalLbl).toHaveText(new RegExp(total.toString()));
    await overviewPage.finishBtn.click();
    await expect(completePage.completeHeader).toBeVisible({timeout: DEFAULT_TIMEOUT});
    await expect(completePage.completeHeader).toContainText(MESSAGES.COMPLETE.HEADER);
    await expect(completePage.completeText).toBeVisible({timeout: DEFAULT_TIMEOUT});
    await expect(completePage.completeText).toContainText(MESSAGES.COMPLETE.TEXT);
    await completePage.backToProductsBtn.click();
    await expect(productsPage.productsTitle).toBeVisible({timeout: DEFAULT_TIMEOUT});
  });
});