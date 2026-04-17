const { test, expect } = require('../../lib/fixtures');
// const { test, expect } = require('@playwright/test');
// const { LoginPage } = require('../../pages/login/LoginPage.js');
// const { TodayPage } = require('../../pages/today/TodayPage.js');
const { USER_CREDENTIALS, MESSAGES, DEFAULT_TIMEOUT} = require('../../constants/TestData.js');

test.describe('Logout tests', () => {

  // SUCCESFUL LOGOUT TEST
  test('Successful logout: As a standard user, I should be able to log out.', async ({ productsPage,  loginPage }) => {
    // console.log(await page.context().cookies());
    // const todayPage = new TodayPage(page);
    await productsPage.goto();
    await productsPage.navBar.burgerMenuBtn.click();
    await productsPage.sideBar.logoutBtn.click();
    // const loginPage = new LoginPage(page);
    await expect(loginPage.loginButton).toBeVisible({timeout: DEFAULT_TIMEOUT});
  });
});