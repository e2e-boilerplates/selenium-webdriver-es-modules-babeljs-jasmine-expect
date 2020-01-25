import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

import "chromedriver";

const options = new chrome.Options();
const chromeOptions = process.env.GITHUB_ACTIONS ? options.headless() : options;

describe("Sandbox", () => {
  let browser;
  let originalTimeout;

  beforeAll(async () => {
    browser = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
    browser.get("https://e2e-boilerplates.github.io/sandbox/");
  });

  afterAll(() => {
    browser.quit();
  });

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
  });

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it("should be on Sandbox", async () => {
    const title = await browser.getTitle();
    const header = await browser.findElement(By.css("h1"));

    expect(title).toEqual("Sandbox");
    header.getText().then(text => {
      expect(text).toEqual("Sandbox");
    });
  });
});