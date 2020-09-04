## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼？

比較 char / varchar / text / blob 。

char：固定長度（0 - 255，預設是 1）的字串，在儲存長度不足會自左邊補足空白
varchar：可變長度（0 - 65,535） 的字串，最大的有效長度視資料列大小限制而定

```
VARCHAR/CHAR 可以給預設值；TEXT 沒辦法給預設值
VARCHAR/CHAR 建索引可不指定索引長度，但 TEXT 一定要指定長度
CHAR 是固定長度，長度不足會補空白在右邊，VARCHAR、TEXT不會。
```

TEXT 與 BLOB
```
BLOB 的全名是「binary large object」，與 TEXT 一樣，都是用來儲存長度較長的字串或是二元資料。兩者大同小異，唯一的差別在於，TEXT 是有區分大小寫的，而 BLOB 不分。
```

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

Cookie 是什麼？
```
Cookie 是伺服器（Server）傳送給瀏覽器（Client）的一小片段資料，並請瀏覽器保存起來，以便往後向相同的伺服器發送請求時，附上這 Cookie 的資料。
常見的應用如購物車系統，或是現在的無論是 FB 或 Google 的登入狀態，都可以維持到結帳才清空或關閉瀏覽器才登出。
```

在 HTTP 這一層要怎麼設定 Cookie？
```
當收到 HTTP Request 時，Server 會傳送 Set-Cookie 的 Response Header 讓瀏覽器設置 Cookie，瀏覽器會將 Cookie 暫存於瀏覽器內。
```

瀏覽器又是怎麼把 Cookie 帶去 Server 的？
```
當再次瀏覽網頁，再次發出 HTTP Request 至 Server 時，瀏覽器會自動比對符合條件的 Cookie（未過期且符合 Domain ），符合的 Cookie 會帶入至 HTTP Request Header 中。
```

在 HTTP 這一層要怎麼設定 Cookie？

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 沒有防範特殊字元
在輸入時會員資料或留言內容時，沒有將特殊字元另外處理，若使用者以 JS 語言或 HTML 標籤插入惡意程式碼，可能導致網頁結構被竄改、網站癱瘓、資料庫被竊取等後果。

2. 使用者密碼驗證
在註冊會員時，缺少驗證兩次密碼的機制，或是測試密碼的安全度。

3. 密碼以明碼存取
由於密碼是以明碼儲存在資料庫，若資料庫被破解入侵，有可能導致會員資料被竊取。

