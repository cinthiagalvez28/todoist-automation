const { NavBar } = require('../component/NavBar')
const { SideBar } = require('../component/SideBar')
const { URLS } = require('../../constants/TestData');

class YourInformationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.sideBar = new SideBar(page);
    this.navBar = new NavBar(page);
    this.firstNameInput = page.locator('data-test=firstName');
    this.lastNameInput = page.locator('data-test=lastName');
    this.postalCodeInput = page.locator('data-test=postalCode');
    this.continueBtn = page.locator('data-test=continue');
  }
  
  async goto() {
    await this.page.goto(URLS.BASE_URL + URLS.YOUR_INFORMATION);
  }

  async submitYourInformationForm(firstName, lastName, zip) {
    if (firstName != null){
      await this.firstNameInput.fill(firstName);
    }
    if (lastName != null){
      await this.lastNameInput.fill(lastName);
    }
    if (zip != null){
      await this.postalCodeInput.fill(zip);
    }
    await this.continueBtn.click();
  }

}

module.exports = { YourInformationPage };