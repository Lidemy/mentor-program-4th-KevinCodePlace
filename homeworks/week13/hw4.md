## Webpack 是做什麼用的？可以不用它嗎？

### Webpack 是什麼？
```
Webpack 是一個「打包工具」。將眾多模組與資源打包成一包檔案，並編譯我們需要預先處理的內容，變成瀏覽器看得懂的東西，讓我們可以上傳到伺服器。
```

一般我們的專案會有兩個很重要的資料夾 src 與 dist，
src : 專門放我們 Preprocess 的檔案，包括 es6、 sass、 vue、 jsx 等檔案，這個資料夾不會丟上去 server 部署。
dist : 經過 webpack 編譯打包後，產生出瀏覽器看得懂的 html、 css、 js，要部署也是這個資料夾去部署。

並且通常有一個資料夾與三個檔案：node_modules 、package.json、package-lock.json、webpack.config.js
node_modules：透過 npm 下載套件會放在這個資料夾
package.json：關於這整包專案所有的資訊，包含我們安裝的套件版本，專案版本等等
package-lock.json：package-lock.json是npm5版本新增的，是專門紀錄package.json裡面更細節的內容，例如安裝的套件的詳細版本。

再來就是最重要的 webpack 的設定檔了，通常名稱為 webpack.config.js
最重要的就是 entry 跟 output
譬如我們在 src 資料夾裡面有個「輸入」 index.js（input）
在編譯完成之後，我們設定 path 會跑到 dist 並且名稱變成 main.js，而我們就可以在 index.html 裡面載入 main.js。

```
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'commentPlugin'
  },
};
```
### 可以不用 Webpack 嗎？

當然可以，只是事情會變得複雜。以剛剛的例子 index.html 是我們的主體，裡面可能會有許多 CSS、JS 等檔案，於是我們透過 webpack 把那些 CSS、JS 檔案全部包成 main.js，並且讓 index.html 匯入一個檔案即可。既方便管理又容易維護。

用手機為例，假設 index.html 手機的包裝。在拆開包裝以後，我們預期是看到一台手機（main.js），而手機又可以拆分成鏡頭、電池等等（CSS、JS）的部分。
以胡立老師的例子，我們就可以在 index.js（input） 寫下以下內容
```
import 相機
import 螢幕
import BB 電池
import sim卡

Phone.start(相機, 螢幕, BB 電池, sim卡)
```
最後透過 npm run build 生成一個叫做 main.js 的 output。

### 那這樣把全部拆分有甚麼好處呢？
簡單說，用 Webpack VS 不用 Webpack 就像 組裝式的手機 VS 一體成形的手機，這樣就好懂許多了。
當今天用 Webpack ，我們可以個別修復譬如上述相機、螢幕、電池的部分。節省了打掉重練的成本，也方便個別測試。
所以說當然可以不用 Webpack，但使用 Webpack 肯定帶來許多好處 :)

參考資料：
[Webpack教學 (一) ：什麼是Webpack? 能吃嗎？](https://medium.com/i-am-mike/%E4%BB%80%E9%BA%BC%E6%98%AFwebpack-%E4%BD%A0%E9%9C%80%E8%A6%81webpack%E5%97%8E-2d8f9658241d)
[webpack 新手教學之淺談模組化與 snowpack](https://blog.techbridge.cc/2020/01/22/webpack-%E6%96%B0%E6%89%8B%E6%95%99%E5%AD%B8%E4%B9%8B%E6%B7%BA%E8%AB%87%E6%A8%A1%E7%B5%84%E5%8C%96%E8%88%87-snowpack/)

## gulp 跟 webpack 有什麼不一樣？
簡言之 gulp 是個功能管理員；webpack 是個打包工具
假設我們先寫好了 執行程序一、執行程序二、執行程序三、執行程序四，

則我們可以用 gulp 決定當跑完執行程序一後執行執行程序三
但 Webpack 則是我們可以將執行程序一到四全部打包起來並且 export 出去，讓網頁上的 JS 可以 require。

所以說 gulp 基本上可以說什麼都能做也什麼都不能做，原因是 Gulp 就是功能管理員，當沒有預先寫好的功能的時候 Gulp 就形同虛設，
但假若手上已經有數個功能，則 Gulp 可以透過執行每個功能來達到各種事情

但 Webpack 就只能打包，並且能打包的內容要看有沒有支援的 loader 去決定。

所以問題應該要變成說，
### gulp 跟 webpack 有什麼一樣，導致這兩樣工具被搞混？
如同前面所說，只要有功能存在，Gulp 就可以執行功能。於是乎我們如果把 Webpack 這樣的打包功能變成一個功能，則 Gulp 就可以用這個遇寫好的 「打包」
功能做到跟 Webpack 一樣的效果，而這也是為什麼這兩樣工具常會被混淆的原因。


## CSS Selector 權重的計算方式為何？

所謂的權重就是指 css 的優先權，例如:

1. 相同權重但是後寫的 css 可以覆蓋先寫的 css
2. 當兩個選擇器同時作用在一個元素，權重高的優先生效

基本來說權重的大小如下
```
!important > inline style > ID > Class/psuedo-class(偽類)/attribute（屬性選擇器） > Element
```

很常用到的全站預設值，為 0-0-0-0，所以只要權重超過就可以覆蓋過它的預設。
所有的 Element 的權重都是 0-0-0-1，如
```
（div, p, ul, ol, li, em, header, footer, article....）
```
每一個 class 的權重都是 0-0-1-0。
每一個 id 的權重都是 0-1-0-0。
inline style attribute 的權重為 1-0-0-0 ，如
```
<div style="color:red">
    CSS Specificity
</div>
```
psuedo-class(偽類)是 0-0-1-0 ，如：
```
:nth-child() 、 :link 、 :hover 、 :focus 等
:only-of-type 、 :nth-of-type
```
attribute（屬性選擇器）是 0-0-1-0 ，如：
```
[type:checkbox]、[attr]
```

 !important ：1-0-0-0-0