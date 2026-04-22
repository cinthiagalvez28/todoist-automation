const { test, expect } = require('../../lib/fixtures');
const { DEFAULT_TIMEOUT } = require('../../constants/TestData.js');

test.describe('Logout tests', () => {

  // SUCCESFUL LOGOUT TEST
  test('@smoke Successful logout: As a standard user, I should be able to log out.', async ({ productsPage,  loginPage }) => {
    await productsPage.goto();
    await productsPage.navBar.burgerMenuBtn.click();
    await expect(productsPage.sideBar.logoutBtn).toBeVisible({timeout: DEFAULT_TIMEOUT});
    await productsPage.sideBar.logoutBtn.click();
    await expect(loginPage.loginButton).toBeVisible({timeout: DEFAULT_TIMEOUT});
  });
});