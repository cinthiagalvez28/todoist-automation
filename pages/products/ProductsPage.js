const { NavBar } = require('../component/NavBar')
const { SideBar } = require('../component/SideBar')
const { URLS } = require('../../constants/TestData');

class ProductsPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sideBar = new SideBar(page);
    this.navBar = new NavBar(page);
    this.productsTitle = page.locator('span', { hasText: 'Products' })
  }

  async goto() {
    await this.page.goto(URLS.BASE_URL + URLS.PRODUCTS);
  }
}

module.exports = { ProductsPage };