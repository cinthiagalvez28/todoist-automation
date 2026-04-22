const { faker } = require('@faker-js/faker');
const { test, expect } = require('../../lib/fixtures.js');
const { PRODUCT_NAMES, MESSAGES, DEFAULT_TIMEOUT } = require('../../constants/TestData.js');

test.describe('Checkout: Your information tests', () => {
  
  test.beforeEach(async ({ productsPage, shoppingCartPage }) => {
    await productsPage.goto();
    await productsPage.addProductsToCartByName('add', [PRODUCT_NAMES[0]]);  
    await productsPage.navBar.shoppingCartBtn.click();
    await shoppingCartPage.checkoutBtn.click();
  });

  // FILL ALL THE INPUTS AND BE REDIRECTED TO THE OVERVIEW PAGE
  test(`@smoke As a standard user, I should be able fill all the inputs and be redirected to the overview.`, async ({ yourInformationPage, overviewPage }) => {
    await yourInformationPage.submitYourInformationForm(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode('#####'));
    await expect(overviewPage.overviewTitle).toBeVisible({timeout: DEFAULT_TIMEOUT});
  });

  // YOUR INFORMATION FORM
  test(`@smoke As a standard user, I should not be able to leave all the inputs empty.`, async ({ yourInformationPage }) => {
    await yourInformationPage.submitYourInformationForm(null, null, null);
    await expect(yourInformationPage.page.getByRole('heading', { name: MESSAGES.YOUR_INFORMATION.ERROR.FIRST_NAME_IS_REQUIRED, level: 3 })).toBeVisible();
  });

  test(`As a standard user, I should not be able to leave last name and zip inputs empty.`, async ({ yourInformationPage }) => {
    await yourInformationPage.submitYourInformationForm(faker.person.firstName(), null, null);
    await expect(yourInformationPage.page.getByRole('heading', { name: MESSAGES.YOUR_INFORMATION.ERROR.LAST_NAME_IS_REQUIRED, level: 3 })).toBeVisible();
  });

  test(`As a standard user, I should not be able to leave first name and zip inputs empty.`, async ({ yourInformationPage }) => {
    await yourInformationPage.submitYourInformationForm(null, faker.person.lastName(), null);
    await expect(yourInformationPage.page.getByRole('heading', { name: MESSAGES.YOUR_INFORMATION.ERROR.FIRST_NAME_IS_REQUIRED, level: 3 })).toBeVisible();
  });

  test(`As a standard user, I should not be able to leave first name and last name inputs empty.`, async ({ yourInformationPage }) => {
    await yourInformationPage.submitYourInformationForm(null, null, faker.location.zipCode('#####'));
    await expect(yourInformationPage.page.getByRole('heading', { name: MESSAGES.YOUR_INFORMATION.ERROR.FIRST_NAME_IS_REQUIRED, level: 3 })).toBeVisible();
  });

  test(`As a standard user, I should not be able to leave only the first name input empty.`, async ({ yourInformationPage }) => {
    await yourInformationPage.submitYourInformationForm(null, faker.person.lastName(), faker.location.zipCode('#####'));
    await expect(yourInformationPage.page.getByRole('heading', { name: MESSAGES.YOUR_INFORMATION.ERROR.FIRST_NAME_IS_REQUIRED, level: 3 })).toBeVisible();
  });

  test(`As a standard user, I should not be able to leave only the last name input empty.`, async ({ yourInformationPage }) => {
    await yourInformationPage.submitYourInformationForm(faker.person.firstName(), null, faker.location.zipCode('#####'));
    await expect(yourInformationPage.page.getByRole('heading', { name: MESSAGES.YOUR_INFORMATION.ERROR.LAST_NAME_IS_REQUIRED, level: 3 })).toBeVisible();
  });

  test(`As a standard user, I should not be able to leave only the zip input empty.`, async ({ yourInformationPage }) => {
    await yourInformationPage.submitYourInformationForm(faker.person.firstName(), faker.person.lastName(), null);
    await expect(yourInformationPage.page.getByRole('heading', { name: MESSAGES.YOUR_INFORMATION.ERROR.POSTAL_CODE_IS_REQUIRED, level: 3 })).toBeVisible();
  });
});