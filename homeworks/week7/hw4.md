## 什麼是 DOM？

DOM：Document object model

是一個把 HTML 文件內的各個標籤全部定義成物件，並且以樹狀結構加以表示之。
最上層級是 Window	
第二層級就有很多，如 history / document / screen

而我們常見的就是由 document 再根據 HTML 內容往下延伸

常見的
```
<!DOCTYPE html>
<html lang="en">
  <head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
  </head>
  <body>
	
  </body>
</html>
```

如果讓 HTML 當第一層
第二層就有<head> 跟 <body>
第三層有 <head> 底下的 <meta>、<meta>以及<title>

而在這樣的分野地下，我們把每一層標籤稱為 node，而 node 之間只有兩種關係，如果是同層級就是 slbling、上級就是 Parent、下級則是 Child，其實就有點像祖譜的感覺。

如此清楚的分界下，我們就更容易在 Javascript 中選擇我們要的 HTML 位置新增/刪除事件，

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

從 DOM 往下談到事件傳遞機制。
當我們在某一層的物件下了 eventLisenter 後，事件會從最上層的 window 層層傳遞到物件，再從物件層層傳遞回 Window。 而這中間分成三塊區域
一：從 Window 到 Target 的路徑，稱作捕獲階段
二：到了 Target 之後執行觸發事件
三：從 Target 再層層回到 Window 的路徑，稱作冒泡階段

## 什麼是 event delegation，為什麼我們需要它？

即便我們在下層的物件新增事件，因為有了冒泡階段，上層的物件都可以觸發事件。
而在這樣的情況下，我們就不需要在很多個下層的物件新增事件，只要統一在上層觸發事件即可。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

event.preventDefault() 的意思是不會執行原本預設的行為，但事件仍會往下傳遞。
event.stopPropagation() 則是取消往下一層後面的事件傳遞路徑，但同一層仍會執行。

```
<ul>
 <li><a></a></li>
 <li><a></a></li>
 <li><a></a></li>
</ul>
```

如果在這個 <ul> 下了 event.stopPropagation()，則底下的事件不會執行，連結仍可正常使用，
但如果是下了 event.preventDefault() 的話，後面的連結會因為捕獲往下傳遞導致無法連結出去（執行原本的預設行為，譬如跳出網頁）。

