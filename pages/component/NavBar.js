class NavBar {
  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.burgerMenuBtn = page.locator('#react-burger-menu-btn');
  }

  // async logout() {
  //   await this.logoutButton.click();
  // }
}

module.exports = { NavBar };