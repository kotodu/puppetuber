import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';

const baseURL = "https://www.youtube.com/watch?v=";
const videoID = "iYFExyAsEYs";
const time = 20;
const videoURL = `${baseURL}${videoID}&t=${time}`;

const browseYouTube = async () => {
  // ヘッドレスモードを無効化してブラウザを表示
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  // YouTubeの動画ページに移動
  await page.goto(videoURL);

  await page.screenshot({ path: "./screenshots/screenshot0.png" });
  console.log("Screenshot taken");

  // 動画の再生ボタンをクリック
  const playButtonSelector = ".ytp-large-play-button";
  await page.waitForSelector(playButtonSelector);
  await page.click(playButtonSelector);
  console.log("Video started");

  // フルスクリーンボタンをクリック
  const fullScreenButtonSelector = ".ytp-fullscreen-button";
  await page.click(fullScreenButtonSelector);
  console.log("Fullscreen activated");

  await page.screenshot({ path: "./screenshots/screenshot1.png" });
  console.log("Screenshot taken");

  await page.screenshot({ path: "./screenshots/screenshot2.png" });
  console.log("Screenshot taken");

  // 動画を一時停止
  const pauseButtonSelector = ".ytp-play-button";
  await page.click(pauseButtonSelector);
  console.log("Video paused");

  // スクリーンショットを撮影
  await page.screenshot({ path: "./screenshots/screenshot3.png" });
  console.log("Screenshot taken");

  // ブラウザを閉じる
  await browser.close();
};

browseYouTube().catch((error) => {
  console.error("Error occurred:", error);
});
