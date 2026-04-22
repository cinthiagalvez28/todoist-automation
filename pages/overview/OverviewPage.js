const { NavBar } = require('../component/NavBar')
const { SideBar } = require('../component/SideBar')
const { URLS } = require('../../constants/TestData');

class OverviewPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sideBar = new SideBar(page);
    this.navBar = new NavBar(page);
    this.overviewTitle = page.locator('data-test=title');
  }
  
  async goto() {
    await this.page.goto(URLS.BASE_URL + URLS.OVERVIEW);
  }
}

module.exports = { OverviewPage };