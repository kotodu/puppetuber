import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';

const baseURL = "https://www.youtube.com/watch?v=";
const videoID = "iYFExyAsEYs";
const time = 20;
const videoURL = `${baseURL}${videoID}`;

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

  // 動画の再生ボタンをクリックしてそのまま停止
  await page.keyboard.press("Space", {
    delay: 1000,
  });
  console.log("Video started");
  await page.keyboard.press("Space", {
    delay: 1000,
  });

  // フルスクリーンモードに切り替え
  await page.keyboard.press("f", {
    delay: 2000,
  });
  console.log("Fullscreen activated");

  await page.screenshot({ path: "./screenshots/screenshot1.png" });
  console.log("Screenshot taken");

  for (let i = 10; i < 15; i++) {
    await page.keyboard.press("ArrowRight", { delay: 1000 });
    await page.screenshot({ path: `./screenshots/screenshot${i}.png` });
  }

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
