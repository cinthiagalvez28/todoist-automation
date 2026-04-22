const { NavBar } = require('../component/NavBar')
const { SideBar } = require('../component/SideBar')
const { URLS } = require('../../constants/TestData');

class CompletePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sideBar = new SideBar(page);
    this.navBar = new NavBar(page);
    this.completeTitle = page.locator('data-test=title')
    this.completeHeader = page.locator('data-test=complete-header');
    this.completeText = page.locator('data-test=complete-text');
    this.backToProductsBtn = page.locator('data-test=back-to-products');
  }

  async goto() {
    await this.page.goto(URLS.BASE_URL + URLS.COMPLETE);
  }

}

module.exports = { CompletePage };