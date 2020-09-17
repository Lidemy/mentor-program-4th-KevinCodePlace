## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

### 加密與雜湊相同之處

我們可以把加密 / 雜湊這個過程拆成三個部分：明碼 => 加密過程（某種演算法）=> 密碼。
假如我用明碼為 3 以及（演算法）函數 y = f(x) = x^3 + 2 及為例，經過加密後的密碼即是 3^3 + 2 = 29
從這裡我們也可以嗅到一些加密不安全的地方。

即是我們假如破解了資料庫，發現有人的密碼是 29，又加密是屬於一對一的過程，因此駭客可以用反推的方式知道原來的明碼為 3。


### 加密與雜湊相異之處
我們由上述可知加密是一對一且可逆，然而雜湊則是單向且不可逆。
於是相對起來，雜湊又更具安全性，因此在選擇加密與雜湊的情況下，我們更傾向選擇使用雜湊

### 為什麼密碼需經過雜湊過才存入資料庫
如同上述提及的情況，假如駭客破解資料庫時直接看到明碼，那此時正是意義上的「資料外洩」，駭客不用任何其他手段即可登入並存取使用者帳戶。
這也是為什麼密碼需經過雜湊過才存入資料庫。

## `include`、`require`、`include_once`、`require_once` 的差別

### include vs require
在引入成功的情況下，include 跟 require 是無差別的。然而當發生錯誤的時候，include 會接著執行接下來的程式，而 require 則會在錯誤處停止執行後面程式。


```
<?php
include("file22.php"); // 無此檔案
echo("還是會執行")
?>

結果：
XXXXXXX 錯誤訊息
還是會執行
```
```
<?php
include("file22.php");
echo("file2.php")
?>

結果：
XXXXXXX 錯誤訊息
```


### include_once vs require_once 
基於以上差異，include_once 與 require_once 的 once 是一樣的功能，當今天檔案被 import 過，則不會再次 import，以 require_once 代表舉例

file1.php
```
<?php
	echo "this is file1";//1-1、3
?>
```
fil2.php
```
<?php
   require('file1.php'); //1
   echo "this is file2"; //2
?>
```
file3-1.php（使用 require）
```
<?php
   require('file2.php');
   require('file1.php');
?>
結果：
this is file1 //1-1
this is file2 //2
this is file1 //3
```
file3-1.php（使用 require_once）
```
<?php
   require_once('file2.php');
   require_once('file1.php'); // 已經在 file2.php 裡面 require 過 file1.php，此處不會重複 require
?>
結果：
this is file1 //1-1
this is file2 //2
```

## 請說明 SQL Injection 的攻擊原理以及防範方法

SQL 指令可以透過不正當輸入竄改結果，譬如原先讓使用者輸入帳號 XXX
而預設的指令可能是 ```insert into db(username) values(XXX)``` ，有心人士可以用相關的指令讓 SQL 指令做其他事情，
常見的如加入 # 字號註解掉原先的指令，透過前半部竄改指令。

而防範方法則是不直接下 query，而是改以 prepare 補入變數的方式防止惡意輸入，詳細的操作如下。

未考量 SQL injection
```
$sql = "INSERT INTO db(nickname) VALUES("nick1")";
$result = $conn->query($sql);
```
考量 SQL injection
```
$sql = "INSERT INTO db(nickname) VALUES(?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s","nick1");
$result = $stmt->execute();
```

##  請說明 XSS 的攻擊原理以及防範方法
XSS 是指當網頁有開放使用者輸入相關內容，有心人士可直接引入不當程式，觸發出對使用者不利的流程。
如留言板的留言區域，可以新增 <script></script>，惡意導流有害網址，造成使用者的損失。

而防範方式只需要將特殊字元判定為字串輸出即可，JS 有內建函示 escape() 可以防範 XSS。

## 請說明 CSRF 的攻擊原理以及防範方法

CSRF 是一種常見的網路攻擊手法，全名是 Cross Site Request Forgery(跨站請求偽造)。意思是當我們登入時，網站會存有已登入的 cookie 或 session。
此時我們即便在其他網域的網站發送惡意 request ，例如在轉帳或輸入帳號密碼時，偷偷發送 request 到惡意網站或相關網址。導致使用者的損失。

防範方法
1. 檢查 referer 欄位
request 的 header 裡面會帶一個欄位叫做 referer，代表這個 request 是從哪個地方過來的，可以檢查這個欄位看是不是合法的 domain，不是的話直接 reject 掉即可。

2. 加入驗證 token
只要使用者能提出一個唯一且保密的序號，攻擊者拿不到這個序號，自然就不能偽裝成使用者，而這個序號，就是我們稱的 CSRF Token，這個 Token 是由 server 產生，並且加密存在 session 中的，其他人無法仿造，只有透過 server 給使用者，並在一定時間內刷新。當使用者想做任何交易的時候， server 就會請使用者提供CSRF Token，如果不能提供，就代表這次的請求就是攻擊者，那 server 就不予理會。

3. 加上圖形驗證碼、簡訊驗證碼
需要收簡訊驗證碼，多了這一道檢查就可以確保不會被 CSRF 攻擊。
圖形驗證碼也是，攻擊者並不知道圖形驗證碼的答案是什麼，所以就不可能攻擊了。

4. browser 本身的防禦
Google 在 Chrome 51 版的時候正式加入了這個功能：SameSite cookie

當你加上 SameSite 這個關鍵字之後，就代表說「我這個 cookie 只允許 same site 使用，不應該在任何的 cross site request 被加上去」。

只要加上去之後，我們上面所講的<a href="">, <form>, new XMLHttpRequest，只要是瀏覽器驗證不是在同一個 site 底下發出的 request，全部都不會帶上這個 cookie。