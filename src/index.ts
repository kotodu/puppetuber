import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';
import { hideYouTubeGradient, shotYouTube } from "./controlYouTube";

const baseURL = "https://www.youtube.com/watch?v=";
const videoID = "iYFExyAsEYs";
const videoURL = `${baseURL}${videoID}`;

// 動画の再生時間（秒）
// ここでは577秒（9分37秒）を指定。今後YouTubeのAPIを使って取得する予定。
const videoDuration = "00:09:37";
const [videoHours, videoMinutes, videoSeconds] = videoDuration
  .split(":")
  .map(Number);
const videoTime = videoHours * 3600 + videoMinutes * 60 + videoSeconds;

const timeToDuratioinUnderBar = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor((time % 3600) % 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const formattedTime = `${formattedHours}_${formattedMinutes}_${formattedSeconds}`;
  return formattedTime;
};

const browseYouTube = async () => {
  // ヘッドレスモードを無効化してブラウザを表示
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });

  // YouTubeの動画ページに移動
  await page.goto(videoURL);

  // フルスクリーンモードに切り替え
  await shotYouTube(page, "screenshot00");
  await page.waitForSelector(".ytp-large-play-button");
  await page.keyboard.press("f", {
    delay: 2000,
  });
  await shotYouTube(page, "screenshot01");
  console.log("Fullscreen activated");

  // 動画の再生ボタンをクリックしてそのまま停止
  await page.keyboard.press("Space");
  console.log("Video started");
  await page.keyboard.press("Space");

  await hideYouTubeGradient(page);

  // ここまでの準備で動画が再生されているので、動画の再生位置を調整
  await page.keyboard.press("ArrowLeft");

  // 12秒間隔でスクリーンショットを撮影
  for (let currentTime = 1; currentTime < videoTime; currentTime += 12) {
    await page.keyboard.press("ArrowRight", {
      delay: 1000,
    });
    await page.keyboard.press("ArrowRight", {
      delay: 1000,
    });

    const pauseButtonSelector = ".ytp-play-button";
    await page.click(pauseButtonSelector);

    const formattedTime = timeToDuratioinUnderBar(currentTime);
    const shotName = `screenshot_${formattedTime}`;
    await shotYouTube(page, shotName);

    await page.click(pauseButtonSelector);
  }

  // 動画を一時停止
  const pauseButtonSelector = ".ytp-play-button";
  await page.click(pauseButtonSelector);
  console.log("Video paused");

  // ブラウザを閉じる
  await browser.close();
};

browseYouTube().catch((error) => {
  console.error("Error occurred:", error);
});
