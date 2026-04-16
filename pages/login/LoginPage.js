const { URLS } = require('../../constants/TestData');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#element-0');
    this.passwordInput = page.locator('#element-2');
    this.loginButton = page.getByText('Log in');
  }

  async goto() {
    await this.page.goto(URLS.BASE_URL);
  }

  async login(user, pass) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };