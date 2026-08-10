寶寶托嬰準備任務 Web App

檔案：
- index.html：主程式
- manifest.webmanifest：PWA 設定
- sw.js：離線快取
- icon-192.png / icon-512.png / apple-touch-icon.png：App 圖示

重要：
iPhone 要真正「加入主畫面」並像 App 一樣使用，必須把整個資料夾放到 HTTPS 網站上。
不能直接用 iPhone 的「檔案 App」開本機 HTML 來安裝 PWA。

最簡單部署方式：
1. 將整個資料夾上傳到支援 HTTPS 的靜態網站空間。
2. 用 iPhone Safari 打開 index.html 的網址。
3. Safari → 分享 → 加入主畫面。
