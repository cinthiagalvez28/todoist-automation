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
 
    /**
     * @param {number[]} indexes - Ejemplo: [0, 2, 4]
     */
    async addProductsToCart(indexes) {
        for (const index of indexes) {
            const product = this.inventoryItems.nth(index);
            await product.getByRole('button', { name: /add to cart/i }).click();
        }
    }
    
    async getCartCount() {
        if (await this.shoppingCartBadge.isVisible()) {
            const count = await this.shoppingCartBadge.textContent();
            return parseInt(count);
        }
        return 0;
    }

    async removeItemFromCart(index) {
        const button = this.inventoryItems.nth(index).getByRole('button', { name: /remove/i });
        await button.click();
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