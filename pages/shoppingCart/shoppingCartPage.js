const { NavBar } = require('../component/NavBar')
const { SideBar } = require('../component/SideBar')
const { URLS } = require('../../constants/TestData');

class ShoppingCartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sideBar = new SideBar(page);
    this.navBar = new NavBar(page);
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemsDiv = page.locator('.cart_item');
  }

  async goto() {
    await this.page.goto(URLS.BASE_URL + URLS.SHOOPING_CART);
  }

  async getCartItemNames() {
    return await this.itemNames.allTextContents();
  }

  getProductByName(name) {
    return this.itemsDiv.filter({ hasText: name });
  }

  async removeProductByIndex(index) {
    const product = this.itemsDiv.nth(index);
    await this.getRemoveProductButton(product).click();
  }

  getRemoveProductButton(product) {
    return product.getByRole('button', { name: 'Remove' });
  }
}

module.exports = { ShoppingCartPage };