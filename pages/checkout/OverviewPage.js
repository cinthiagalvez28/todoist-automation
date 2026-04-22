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
    this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    this.subtotalLbl = page.locator('data-test=subtotal-label');
    this.taxLbl = page.locator('data-test=tax-label');
    this.totalLbl = page.locator('data-test=total-label');
    this.finishBtn = page.locator('data-test=finish');
  }
  
  async goto() {
    await this.page.goto(URLS.BASE_URL + URLS.OVERVIEW);
  }
  
  async getPricesList() {
    const priceString = await this.itemPrice.allTextContents();
    // Convertimos ["$7.99", "$9.99"] -> [7.99, 9.99]
    return priceString.map(price => parseFloat(price.replace(/[^0-9.]/g, '')));
  }

  async getSubtotalPrice() {
    const prices = await this.getPricesList();
    const total = prices.reduce((sum, actualPrice) => sum + actualPrice, 0);
    return Number(total.toFixed(2));
  }

  async getTaxValue(){
    const text = await this.taxLbl.textContent();
    if (!text) return 0;
    
    const taxAmount = text.replace(/[^0-9.]/g, '');
    return parseFloat(taxAmount);
  }

  async getTotalAmount(){
    const subtotal = await this.getSubtotalPrice();
    const tax = await this.getTaxValue();
    return Number((subtotal + tax).toFixed(2));
  }
}

module.exports = { OverviewPage };