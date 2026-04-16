const base = require('@playwright/test');
const { LoginPage } = require('../pages/login/LoginPage.js');
const { TodayPage } = require('../pages/today/TodayPage.js');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  
  todayPage: async ({ page }, use) => {
    const todayPage = new TodayPage(page);
    await use(todayPage);
  }
});

exports.expect = base.expect;