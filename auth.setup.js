const fs = require('fs');
const path = require('path');
const { chromium, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login/LoginPage');
const { ProductsPage } = require('./pages/products/ProductsPage');
const { USER_CREDENTIALS, DEFAULT_TIMEOUT } = require('./constants/TestData');

// NEEDS IMPROVEMENT
// if (auth.json existe && sigue válido) return;
module.exports = async () => {
  const authPath = path.resolve(__dirname, './auth.json');
  if (fs.existsSync(authPath)) {
    console.log('auth.json ya existe, se reutiliza');
    return;
  }
  console.log('Creando nueva sesión...');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.submitLoginForm(USER_CREDENTIALS.VALID_USER.USERNAME, USER_CREDENTIALS.VALID_USER.PASSWORD);
  const productsPage = new ProductsPage(page);
  await expect(productsPage.productsTitle).toBeVisible({timeout: DEFAULT_TIMEOUT});
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: authPath });
  await browser.close();
};