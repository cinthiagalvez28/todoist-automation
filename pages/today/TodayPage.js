const { URLS } = require('../../constants/TestData');

class TodayPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.todayTitle = page.getByText('Today');
  }

  async goto() {
    await this.page.goto(URLS.BASE_URL + URLS.TODAY);
  }
}

module.exports = { TodayPage };