// versi baru support ES
import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';
import page_login from '../../pages/page_login.js';
import sort_drop from '../../pages/sort_drop.js';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

describe('Test Sesi 11', function () {
    let driver;

    // Hook: Setup before each test
    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://www.saucedemo.com');

        // full screenshot
        let ss_full = await driver.takeScreenshot();
        fs.writeFileSync('ss_full.png', ss_full, 'base64');

        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');

        let inputUsername = await driver.findElement(page_login.inputUsername);
        let inputPassword = await driver.findElement(page_login.inputPassword);
        let buttonLogin = await driver.findElement(page_login.buttonLogin);

        // partial screenshot
        let ss_partial = await inputUsername.takeScreenshot();
        fs.writeFileSync('ss_partial.png', ss_partial, 'base64');

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
    
    it('Cek Visual halaman login', async function () {
        // visit page
        await driver.get('https://www.saucedemo.com');

        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');

        // screenshot keadaan login page sekarang, current.png
        let screenshot = await driver.takeScreenshot();
        let imgBuffer = Buffer.from(screenshot, "base64");
        fs.writeFileSync("current.png", imgBuffer);

        // ambil baseline untuk komparasi
        // jika belum ada baseline, jadikan current.png sebagai baseline
        if (!fs.existsSync("baseline.png")) {
            fs.copyFileSync("current.png", "baseline.png");
            console.log("Baseline image saved.");
        }

        // Compare baseline.png dan current.png apakah sama
        const img1 = PNG.sync.read(fs.readFileSync("baseline.png"));
        const img2 = PNG.sync.read(fs.readFileSync("current.png"));
        const { width, height } = img1;
        const diff = new PNG({ width, height });

        const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

        fs.writeFileSync("diff.png", PNG.sync.write(diff));

        if (numDiffPixels > 0) {
            console.log(`Visual differences found! Pixels different: ${numDiffPixels}`);
        } else {
            console.log("No visual differences found.");
        }
    });

    it('Cek Visual partial login form', async function () {
        // visit page
        await driver.get('https://www.saucedemo.com');

        const title = await driver.getTitle();
        assert.strictEqual(title, 'Swag Labs');

        // Find the login form element
        const loginForm = await driver.findElement(By.className('login-box'));
        
        // Take partial screenshot of the login form
        let screenshot = await loginForm.takeScreenshot();
        let imgBuffer = Buffer.from(screenshot, "base64");
        fs.writeFileSync("current_partial.png", imgBuffer);

        // ambil baseline untuk komparasi
        // jika belum ada baseline, jadikan current.png sebagai baseline
        if (!fs.existsSync("baseline_partial.png")) {
            fs.copyFileSync("current_partial.png", "baseline_partial.png");
            console.log("Baseline partial image saved.");
        }

        // Compare baseline.png dan current.png apakah sama
        const img1 = PNG.sync.read(fs.readFileSync("baseline_partial.png"));
        const img2 = PNG.sync.read(fs.readFileSync("current_partial.png"));
        const { width, height } = img1;
        const diff = new PNG({ width, height });

        const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

        fs.writeFileSync("diff_partial.png", PNG.sync.write(diff));

        if (numDiffPixels > 0) {
            console.log(`Visual differences found in partial screenshot! Pixels different: ${numDiffPixels}`);
        } else {
            console.log("No visual differences found in partial screenshot.");
        }
    });

    it('Cek Produk Filter Z-A', async function () {
        // Wait for the sort dropdown
        let sortDropdown = await driver.wait(
            until.elementLocated(sort_drop.sortDropdown),
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