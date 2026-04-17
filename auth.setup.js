const fs = require('fs');
const path = require('path');
const { chromium, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login/LoginPage');
const { ProductsPage } = require('./pages/products/ProductsPage');
const { USER_CREDENTIALS, DEFAULT_TIMEOUT } = require('./constants/TestData');

const authPath = path.resolve(__dirname, './auth.json');

module.exports = async () => {
  if (fs.existsSync(authPath)) {

    console.info('auth.json existe, validando sesión...');
    const browser = await chromium.launch();
    const context = await browser.newContext({storageState: authPath});
    const page = await context.newPage();
    try {
      const productsPage = new ProductsPage(page);
      await productsPage.goto();
      const isLoggedIn = await productsPage.productsTitle.isVisible({timeout: DEFAULT_TIMEOUT});
      if (isLoggedIn) {
        console.info('Sesión válida, reutilizando auth.json');
        await browser.close();
        return;
      }
      console.info('Sesión expirada, regenerando auth...');
      await browser.close();
    } catch (e) {
      console.info('Auth inválido, regenerando...');
      await browser.close();  
      }
  }

  console.info('Creando nueva sesión...');
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
  console.info('Nuevo auth.json generado');
};
