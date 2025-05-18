// import puppeteer from "puppeteer";
import type { Page } from "puppeteer";

const hideYouTubeControls = async (page: Page) => {
  const selectorTitle = ".ytp-chrome-top";
  const selectorBottom = ".ytp-chrome-bottom";
  await page.evaluate((sel) => {
    console.log(sel);
    const el = document.querySelector(sel);
    if (el) {
      el.hidden = true;
    }
  }, selectorTitle);
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.hidden = true;
    }
  }, selectorBottom);
};

const showYouTubeControls = async (page: Page) => {
  const selectorTitleTop = ".ytp-chrome-top";
  const selectorTitleBottom = ".ytp-chrome-bottom";
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.hidden = false;
    }
  }, selectorTitleTop);
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.hidden = false;
    }
  }, selectorTitleBottom);
};

const hideYouTubeGradient = async (page: Page) => {
  const selectorGradientTop = ".ytp-gradient-top";
  const selectorGradientBottom = ".ytp-gradient-bottom";
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.hidden = true;
    }
  }, selectorGradientTop);

  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.hidden = true;
    }
  }, selectorGradientBottom);
};

const shotYouTube = async (page: Page, shotName: string) => {
  await hideYouTubeControls(page);
  await page.screenshot({ path: `./screenshots/${shotName}.png` });
  await showYouTubeControls(page);
  console.log(`Screenshot taken ${shotName}.png`);
};

export {
  hideYouTubeControls,
  showYouTubeControls,
  hideYouTubeGradient,
  shotYouTube,
};
