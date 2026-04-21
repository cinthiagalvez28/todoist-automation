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
    this.productsTitle = page.locator('span', { hasText: 'Products' });
    this.inventoryItems = page.locator('.inventory_item');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
  }

  async goto() {
    await this.page.goto(URLS.BASE_URL + URLS.PRODUCTS);
  }

  async getRandomProductIndex() {
    const count = await this.inventoryItems.count();
    return Math.floor(Math.random() * count);
  }

  async getInventoryItemNames() {
    return await this.inventoryItemNames.allTextContents();
  }

  getProductByName(name) {
    return this.inventoryItems.filter({ hasText: name });
  }

  async addProductByName(name) {
    const product = this.getProductByName(name);
    await this.getAddToCartButton(product).click();
  }

  async addToCartByIndex(index) {
    const product = this.inventoryItems.nth(index);
    await this.getAddToCartButton(product).click();
  }

  getAddToCartButton(product) {
    return product.getByRole('button', { name: /add to cart/i });
  }
}

module.exports = { ProductsPage };