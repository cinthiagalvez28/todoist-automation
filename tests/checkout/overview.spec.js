const { faker } = require('@faker-js/faker');
const { test, expect } = require('../../lib/fixtures.js');
const { PRODUCT_NAMES, DEFAULT_TIMEOUT } = require('../../constants/TestData.js');

test.describe('Checkout: Overview tests', () => {

  test.beforeEach(async ({ productsPage }) => {
    await productsPage.goto();
  });

  // VALIDATION OF THE SUBTOTAL, TAX AND TOTAL AMOUNT FOR 1 PRODUCT AND BE REDIRECTED TO THE COMPLETE PAGE
  test(`As a standard user, I should be able to see the checkout overview and get the subtotal,tax and total of 1 product.`, async ({ productsPage, shoppingCartPage, yourInformationPage, overviewPage }) => {
    await productsPage.addProductsToCartByName('add', [PRODUCT_NAMES[0]]);  
    await productsPage.navBar.shoppingCartBtn.click();
    await shoppingCartPage.checkoutBtn.click();
    await yourInformationPage.submitYourInformationForm(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode('#####'));
    await expect(overviewPage.overviewTitle).toBeVisible({timeout: DEFAULT_TIMEOUT});
    const subTotal = await overviewPage.getSubtotalPrice();
    await expect(overviewPage.subtotalLbl).toHaveText(new RegExp(subTotal.toString()));
    await expect(overviewPage.taxLbl).toBeVisible({timeout: DEFAULT_TIMEOUT});
    const total = await overviewPage.getTotalAmount();
    await expect(overviewPage.totalLbl).toHaveText(new RegExp(total.toString()));
    await overviewPage.finishBtn.click();
  });

  // VALIDATION OF THE SUBTOTAL, TAX AND TOTAL AMOUNT FOR 3 PRODUCTS AND BE REDIRECTED TO THE COMPLETE PAGE
  test(`As a standard user, I should be able to see the checkout overview and get the subtotal,tax and total of 3 products.`, async ({ productsPage, shoppingCartPage, yourInformationPage, overviewPage }) => { 
    await productsPage.addProductsToCartByName('add', PRODUCT_NAMES); 
    await productsPage.navBar.shoppingCartBtn.click();
    await shoppingCartPage.checkoutBtn.click();
    await yourInformationPage.submitYourInformationForm(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode('#####'));
    await expect(overviewPage.overviewTitle).toBeVisible({timeout: DEFAULT_TIMEOUT});
    const subTotal = await overviewPage.getSubtotalPrice();
    await expect(overviewPage.subtotalLbl).toHaveText(new RegExp(subTotal.toString()));
    await expect(overviewPage.taxLbl).toBeVisible({timeout: DEFAULT_TIMEOUT});
    const total = await overviewPage.getTotalAmount();
    await expect(overviewPage.totalLbl).toHaveText(new RegExp(total.toString()));
    await overviewPage.finishBtn.click();
  });
});