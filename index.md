# puppetuber

- 他人の youtube 動画の場面を取得するサンプル

# 経緯

- 他人の youtube 動画について AI で分析しようと考えた
- 1 秒ごとの大まかな様子さえわかればそれで良いが、代わりに大量で長時間の動画を処理したい
- 意外なことに YoutubeDataAPI では、秒数を指定したサムネイルの取得ができない
- 動画をダウンロードし手元で解析するのは、大量で長時間の動画を処理したい今回は不向き
  - 法の面でも怪しいが、それは AI で分析するのも似たようなものか
- ということで puppeter で YouTube にログインして 1 秒ごとにサムネイルを取得できないか概念実証

# 開発記録

- typescipt と puppeter はインストールした

# (参考)動画について

- https://qiita.com/miyawa-tarou/items/511ec3ea44daef8e7338
- Chromium ではうまくいかない場合がある
  - 今回はそうではない模様

# YouTube 仕様の確認

- ヘッドレスモードの無効化
  - `headless:false`
- Bot 検出回避

```
args: ["--no-sandbox", "--disable-setuid-sandbox"],
```
