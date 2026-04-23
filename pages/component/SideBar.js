class SideBar {
  /**
  * @param {import('@playwright/test').Page} page
  */

  constructor(page) {
    this.page = page;
    this.logoutBtn = page.locator('data-test=logout-sidebar-link');
    this.allItemsBtn = page.locator('data-test=inventory-sidebar-link');
    
  }
}

module.exports = { SideBar };