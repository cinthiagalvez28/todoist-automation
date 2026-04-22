const base = require('@playwright/test');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const { LoginPage } = require('../pages/login/LoginPage');
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    const { ProductsPage } = require('../pages/products/ProductsPage');
    await use(new ProductsPage(page));
  },

  shoppingCartPage: async ({ page }, use) => {
    const { ShoppingCartPage } = require('../pages/shoppingCart/ShoppingCartPage');
    await use(new ShoppingCartPage(page));
  },

  yourInformationPage: async ({ page }, use) => {
    const { YourInformationPage } = require('../pages/yourInformation/YourInformationPage');
    await use(new YourInformationPage(page));
  },

  overviewPage: async ({ page }, use) => {
    const { OverviewPage } = require('../pages/overview/OverviewPage');
    await use(new OverviewPage(page));
  }
});

exports.expect = base.expect;