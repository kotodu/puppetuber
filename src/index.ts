import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';

const baseURL = "https://www.youtube.com/watch?v=";
const videoID = "iYFExyAsEYs";
const time = 2;
const videoURL = `${baseURL}${videoID}&t=${time}`;

const browseTest = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto(videoURL);

  // Set screen size.
  await page.setViewport({ width: 1280, height: 720 });

  page.screenshot({
    path: "./screenshots/screenshot.png",
  });

  // Type into search box.
  //   await page.locator(".devsite-search-field").fill("automate beyond recorder");

  // Wait and click on first result.
  //   await page.locator(".devsite-result-item-link").click();

  // Locate the full title with a unique string.
  //   const textSelector = await page
  //     .locator("text/Customize and automate")
  //     .waitHandle();
  //   const fullTitle = await textSelector?.evaluate((el) => el.textContent);

  // Print the full title.
  //   console.log('The title of this blog post is "%s".', fullTitle);

  await browser.close();
};

browseTest();
