const { test, expect } = require('../../lib/fixtures');
const { USER_CREDENTIALS, DEFAULT_TIMEOUT} = require('../../constants/TestData.js');

test.describe('Login tests', () => {
  
  test.use({ storageState: undefined }); // These tests must start without an authenticated session

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });


  // SUCCESFUL LOGIN TESTS
  test('@smoke Successful login: As a standard user, I should be able to log in when I provide valid credentials.', async ({ loginPage, productsPage }) => {  
    await loginPage.submitLoginForm(USER_CREDENTIALS.VALID_USER.USERNAME, USER_CREDENTIALS.VALID_USER.PASSWORD);
    await expect(productsPage.productsTitle).toBeVisible({timeout: DEFAULT_TIMEOUT});
  });


  // UNSUCCESFUL LOGIN TESTS
  test('@smoke Unsuccessful login: As a standard user, I should not be able to log in when I don\'t provide a valid username.', async ({ loginPage }) => {
    await loginPage.submitLoginForm(USER_CREDENTIALS.INVALID_USER.USERNAME, USER_CREDENTIALS.VALID_USER.PASSWORD);
    await expect(loginPage.usernameAndPasswordDoesNotMatch).toBeVisible();
  });


  test('@smoke Unsuccessful login: As a standard user, I should not be able to log in when I don\'t provide a valid password.', async ({ loginPage }) => {
    await loginPage.submitLoginForm(USER_CREDENTIALS.VALID_USER.USERNAME, USER_CREDENTIALS.INVALID_USER.PASSWORD);
    await expect(loginPage.usernameAndPasswordDoesNotMatch).toBeVisible();
  });


  test('Unsuccessful login: As a standard user, I should not be able to log in when I don\'t provide an username.', async ({ loginPage }) => {  
    await loginPage.submitLoginForm(null, USER_CREDENTIALS.VALID_USER.PASSWORD);
    await expect(loginPage.usernameIsRequired).toBeVisible();
  });


  test('Unsuccessful login: As a standard user, I should not be able to log in when I don\'t provide a password.', async ({ loginPage }) => {
    await loginPage.submitLoginForm(USER_CREDENTIALS.VALID_USER.USERNAME, null);
    await expect(loginPage.passwordIsRequired).toBeVisible();
  });
});
