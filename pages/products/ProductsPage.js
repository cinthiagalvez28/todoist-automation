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
    this.shoppingCartBadge = page.locator('.shopping_cart_badge')
  }

    async goto() {
      
      await this.page.goto(URLS.BASE_URL + URLS.PRODUCTS);
    }
    
    async getRandomProducts(button, quantity) {
    const count = await button.count();
    const selectedIndices = Array.from({ length: count }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(quantity, count));

      for (const index of selectedIndices) {
        await button.nth(index).click();
      }
    }

    async removeProductFromCart(quantity = 1) {
        const removeButton = this.page.getByRole('button', { name: /remove/i });
        await this.getRandomProducts(removeButton, quantity)
    }

    async addProductToCart(quantity = 1) {
        const addButton = this.page.getByRole('button', { name: /add to cart/i });
        await this.getRandomProducts(addButton, quantity)
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