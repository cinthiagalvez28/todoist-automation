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
    this.inventoryItemPrice = page.locator('.inventory_item_price');
    this.inventoryItemName = page.locator('.inventory_item_name');
    this.productSortContainer = page.locator('data-test=product-sort-container');
  }

  async goto() {
    await this.page.goto(URLS.BASE_URL + URLS.PRODUCTS);
  }
  
  getSortedIndexes(array) {
    return [...array].sort((a, b) => b - a);
  }

  handleButtonAction(action, context = this.page) {
    const buttonNames = {
        add: /add to cart/i,
        remove: /remove/i
    };
    return context.getByRole('button', { name: buttonNames[action] });
  }

  async removeProductFromCart(indexes) {
    const sortedIndexes = this.getSortedIndexes(indexes);
    const removeButton = this.handleButtonAction('remove');
    for (const index of sortedIndexes) {
      await removeButton.nth(index).click();
    }
  }

  async addProductToCartByIndex(indexes) {
    const sortedIndexes = this.getSortedIndexes(indexes);
    const addButton = this.handleButtonAction('add');       
    for (const index of sortedIndexes) {
      await addButton.nth(index).click();
    }
  }
  
  async addProductsToCartByName(action, productNames) {  
    for (const name of productNames) {
      const productContainer = this.inventoryItems.filter({ hasText: name });
      const addButton = this.handleButtonAction('add', productContainer);
      await addButton.click();
    }
  }

  async getPricesList() {
    const texts = await this.inventoryItemPrice.allTextContents();
    // Convertimos ["$7.99", "$9.99"] -> [7.99, 9.99]
    return texts.map(price => parseFloat(price.replace('$', '')));
  }

  async getNamesList() {
    return await this.inventoryItemName.allTextContents();
  }

  /**
   * @param {string} option - El valor del select ('lohi', 'hilo', 'az', 'za')
   */
  async sortBy(option) {
    await this.productSortContainer.selectOption(option);
  }
}

module.exports = { ProductsPage };