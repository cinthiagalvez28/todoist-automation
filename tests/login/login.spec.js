// const { test, expect } = require('@playwright/test');
const { test, expect } = require('../../lib/fixtures');
const { loginPage } = require('../../pages/login/LoginPage');
const { todayPage } = require('../../pages/today/TodayPage');
const { USER_CREDENTIALS } = require('../../constants/TestData.js');

test('As a standard user, I should be able to successful login', async ({ loginPage, todayPage }) => {  
  await loginPage.goto();
  await loginPage.login(USER_CREDENTIALS.EMAIL, USER_CREDENTIALS.PASSWORD);
  await expect(todayPage.todayTitle).toBeVisible();
});