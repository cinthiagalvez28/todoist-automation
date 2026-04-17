class NavBar {
  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.burgerMenuBtn = page.locator('#react-burger-menu-btn');
  }
}

module.exports = { NavBar };