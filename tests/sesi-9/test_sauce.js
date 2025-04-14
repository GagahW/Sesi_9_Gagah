const {Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver');

describe('Test Sesi 9', function () {
    let driver;

    it ('Visit SauceDemo dan Login', async function (){
        driver = await new Builder ().forBrowser('chrome').build();
        
        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle()

        assert.strictEqual(title, 'Swag Labs');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inpuPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inpuPassword.sendKeys('secret_sauce')
        await buttonLogin.click()

        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.strictEqual(logotext, 'Swag Labs')
        await driver.quit();
        
    });

    it ('Cek Produk Filter Z-A', async function (){
        driver = await new Builder ().forBrowser('chrome').build();
        
        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle()

        assert.strictEqual(title, 'Swag Labs');

        let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
        let inpuPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
        let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
        await inputUsername.sendKeys('standard_user')
        await inpuPassword.sendKeys('secret_sauce')
        await buttonLogin.click()

        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.strictEqual(logotext, 'Swag Labs')

        let logoSortAZ = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="product-sort-container"]')),
            10000
        );

        await logoSortAZ.isDisplayed()

        let buttonSort = await driver.findElement(By.xpath('//*[@data-test="product-sort-container"]'))
        let buttonZA = await driver.findElement(By.xpath('//*[@id="header_container"]/div[2]/div/span/select/option[2]'))
        await buttonSort.click()
        await buttonZA.click()

        let logoSortZA = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="header_container"]/div[2]/div/span/select/option[2]')),
            10000
        );

        await logoSortZA.isDisplayed()

        await driver.quit();

    });

}); 