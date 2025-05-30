const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Test Sesi 10 with Hooks', function () {
    let driver;

    // Hook: Setup before each test
    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com');

        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'));
        let inputPassword = await driver.findElement(By.css('[data-test="password"]'));
        let buttonLogin = await driver.findElement(By.css('[data-test="login-button"]'));

        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click();

        let textAppLogo = await driver.findElement(By.className('app_logo'));
        let logotext = await textAppLogo.getText();
        assert.strictEqual(logotext, 'Swag Labs');
    });

    // Hook: Teardown after each test
    afterEach(async function () {
        await driver.quit();
    });

    it('Visit SauceDemo dan Login', async function () {
        // Test passed if setup works and app logo is verified
    });

    it('Cek Produk Filter Z-A', async function () {
        // Wait for the sort dropdown
        let sortDropdown = await driver.wait(
            until.elementLocated(By.css('[data-test="product-sort-container"]')),
            10000
        );

        await sortDropdown.isDisplayed();

        // Click for sort Z-A
        await sortDropdown.click();
        let optionZA = await driver.findElement(By.xpath('//option[@value="za"]'));
        await optionZA.click();

        // Verify Z-A option
        let selectedOption = await driver.findElement(By.css('[data-test="product-sort-container"] option:checked'));
        let selectedValue = await selectedOption.getAttribute('value');
        assert.strictEqual(selectedValue, 'za');
    });
});