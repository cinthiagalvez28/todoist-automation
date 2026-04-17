const base = require('@playwright/test');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const { LoginPage } = require('../pages/login/LoginPage');
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    const { ProductsPage } = require('../pages/products/ProductsPage');
    await use(new ProductsPage(page));
  }
});

exports.expect = base.expect;