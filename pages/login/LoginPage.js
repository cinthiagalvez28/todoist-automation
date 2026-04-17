const { URLS, MESSAGES } = require('../../constants/TestData');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('data-test=username');
    this.passwordInput = page.locator('data-test=password');
    this.loginButton = page.locator('data-test=login-button');
    this.passwordIsRequired = page.getByText(MESSAGES.LOGIN.ERROR.PASSWORD_IS_REQUIRED);
    this.usernameIsRequired = page.getByText(MESSAGES.LOGIN.ERROR.USERNAME_IS_REQUIRED);
    this.usernameAndPasswordDoesNotMatch = page.getByText(MESSAGES.LOGIN.ERROR.USERNAME_AND_PASSWORD_DOES_NOT_MATCH);
  }

  async goto() {
    await this.page.goto(URLS.BASE_URL);
  }

  async submitLoginForm(username, password) {
    if (username != null){
      await this.usernameInput.fill(username);
    }
    if (password != null){
      await this.passwordInput.fill(password);
    }
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };