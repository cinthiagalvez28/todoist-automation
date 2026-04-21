class NavBar {
  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.burgerMenuBtn = page.locator('#react-burger-menu-btn');
    this.shoppingCartBtn = page.locator('data-test=shopping-cart-link');
    this.shoppingCartBadgeSpan = page.locator('data-test=shopping-cart-badge');
  }
}

module.exports = { NavBar };