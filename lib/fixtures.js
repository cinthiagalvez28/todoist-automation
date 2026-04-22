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
    const { YourInformationPage } = require('../pages/checkout/YourInformationPage');
    await use(new YourInformationPage(page));
  },

  overviewPage: async ({ page }, use) => {
    const { OverviewPage } = require('../pages/checkout/OverviewPage');
    await use(new OverviewPage(page));
  },

  completePage: async ({ page }, use) => {
    const { CompletePage } = require('../pages/checkout/CompletePage');
    await use(new CompletePage(page));
  }
});

exports.expect = base.expect;