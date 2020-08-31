## 什麼是 Ajax？

Ajax，全名是 Asynchronous JavaScript and XML，一種非同步傳送資料的方式。

通常在網頁中可能會有機會與Server端接資料，在一般邏輯中程式是由上往下一行一行執行。
然而交換資料執行時間長短不一，我們不能讓整個程式在交換資料時動彈不得。

於是這個時候有了 Ajax ，就可以讓我們在交換資料的時候持續跑動程式

實際在 XMLHttpRequest 的用法如下
```
const request = new XMLHttpRequest();
request.open('GET', apiurl, true); //初始化一個請求。
request.setRequestHeader(header,value); //設定 HTTP 請求標頭（request header）值
request.onload = function(){ // callback function
  
  //內文
};
request.send(); //發送請求
```

而這裡的 onload 就是非同步處理，意思是當 request 拿到 response 之後就可以去執行 onload 裡面的程式。

## 用 Ajax 與我們用表單送出資料的差別在哪？

```
<form method="GET" action="https://google.com">
  username:<input name="username">
  <input type="summit" />
</form>
```

用表單送出資料的話，瀏覽器會直接渲染出 response 的資料，但會跳到另外一頁，
比起 Ajax，表單更像是先換頁，然後把 response 丟到另外一頁，
而 Ajax 則是在同一頁交換資料。

## JSONP 是什麼？

JSONP, 全名是 JSON with padding ，透過某些東西不受同源政策的影響，進而去傳送（偷渡?）資料
的方式。

常見的形式利用 <script> 標籤放資料，再透過指定好的 function 把資料給帶回來。

缺點是只能透過 GET 方式得到資料不能用 POST。

## 要如何存取跨網域的 API？

這個時候就要認識 CORS，全名為 Cross-Origin Resource Sharing，跨來源資源共享。
如果我們想開啟跨來源 HTTP 請求的話，Server 必須在 Response 的 Header 裡面加上
Access-Control-Allow-Origin。

而在 request 這端也會有所謂的 Preflight request，先透過一個 OPTION 的 method 去驗證
Preflight request 是否有能收到 response 的許可。如果這個 Preflight Request 沒有過的話，
真的 Request 也就不會發送了。

簡單來說，先用一個 OPTIONS 的請求去確認之後的 Request 能不能送出，這就是
Preflight Request 的目的。

而在程式裡面也就是 setRequestHeader 的部分。

```
const request = new XMLHttpRequest();
request.open('GET', apiurl, true); //初始化一個請求。
request.setRequestHeader(header,value); //設定 HTTP 請求標頭（request header）值
request.onload = function(){ // callback function
  
  //內文
};
request.send(); //發送請求
```

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

原因是第四周我們使用的是 Node.js，是由本機端的 OS 去發請求跟回覆。
但這周是透過瀏覽器的方式去發請求，請求仍舊有發出去，是在response的時候，
瀏覽器會因為安全性的考量，加上 Same origin policy 的標準，去決定是否可以收到 response。
