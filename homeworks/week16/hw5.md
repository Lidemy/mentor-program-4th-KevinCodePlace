## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

想了一下怎麼回答這一題，決定用回答自我檢測來確定是否了解新名詞

### 你知道 Event Loop 的運作方式

- 為什麼需要 Event Loop？

1. Event Loop 協助了非同步請求的實現，並產生連貫的畫面呈現（influent UI）
2. Event Loop 將 「費時較久」 或 「須等待事件才能啟動」 的任務往後安排，因而能打造流暢的使用者體驗（Outstanding UX）

- 在認識 Event Loop 前，先認識相關好朋友

1. Call stack
一個後進先出的執行堆疊，從全域的主程式開始，逐一把函式推至 Call stack 的最上方，並從最後進入的函式開始執行。當函式結束後，會將此函式抽離堆疊

2. Web APIs
瀏覽器提供很多不同的 API（例如：DOM、Ajax），讓我們能夠同時處理多項任務。
當完成 Web APIs 的內部函式，便將任務傳至工作佇列

3. Callback Queue
這是一個先進先出的工作佇列，會接收從 Web APIs 來的任務，並透過 Event Loop 的監控，當堆疊中沒有執行項目時，便把佇列中的內容拉進堆疊中執行。

- 所以什麼是 Event loop（事件循環）
之所以被稱為事件循環，是因為經常被以如下的方式實作：

```
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

當沒有任何訊息時，queue.waitForMessage 會同步地等待新訊息到來。
等 Call stack 空下來之後，Event Loop 將工作佇列的 Callback function 依序推進 Call stack 執行。


### 你知道什麼是作用域（Scope）

Scope(作用域、作用範疇)，指變數有用的範圍，如超出此範圍則無法存取變數。Javascript 使用靜態作用域 （static scope/ lexical scope），意即變數宣告位置即等於其範圍，與 Function 在哪裡被呼叫無關。其中提到 Lexical Scoping，意思是內層區塊可以存取定義在外層區塊的變數。反過來說，外層區塊沒辦法存取內層區塊的變數。

而取得外層區塊變數的方式就是透過 scope chain，如果函式中找不到變數，就依照 scope chain 往上一層去找。

### 你知道 Hoisting（提升）是什麼

Hoisting（提升） 概念及是：
1. 變數與函式，在進入執行階段前，其實就已經完成宣告。
2. 這種「將變數宣告與函式宣告的動作，提升到程式碼最頂端」的行為，就是 Hoisting（提升）。

### 你知道 Hoisting 的原理為何

要知道 Hoisting 的原理 ，我們得先認識一些名詞

1. 執行環境（Execution content）：所有的程式碼都必須在執行環境中執行，而 Exection content 分成創造及執行階段。一開始會默認「全域執行環境」為第一個執行環境。並且如果有函式呼叫的話，會在創造階段以 Stack 的方式堆疊（後進先出），
等到全部函式呼叫完畢則停止創造模式轉為執行模式，從上至下依序執行程式碼，並在 return 後自動從堆疊中 pop off 消失。

1.1 執行環境物件 (Execution context object)：每個執行環境都會配有一個執行環境物件 (Execution context object)，
負責紀錄該環境中需要用到的各種資料。

每個 執行環境物件 都有 3 個屬性 (Property)，分別是：

- 變數物件 (Variable Object)，功能如下
```
建立 Argument Object，存放所有我們打算送進函式的引數 (Argument)。
掃描程式碼中是否有函式宣告 (Function Declaration)：如果有，就為每一個函式建立一個新屬性，其值指向該函式在記憶體中的位址。
掃描程式碼中是否有變數宣告 (Variable Declaration)：如果有，就為每一個變數建立一個新屬性，並將該屬性的值初始為 undefined。
```
- 作用域鏈 (Scope Chain)
- “This” 變數 (“This” Variable)

而 Variable Object 的功能二及功能三即是提升（Hoisting），這些函式及變數早就在執行階段前，就已經被宣告並儲存在 Variable Object 中，這也是為什麼為什麼有些函式在宣告式之前就可以進行呼叫


### 你知道 Closure（閉包）是什麼

閉包（Closure）是函式以及該函式被宣告時所在的作用域環境（lexical environment）的組合，舉例來說

```
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
add5 與 add10 都是閉包。他們共享函式的定義，卻保有不同的環境：在 add5 的作用域環境，x 是 5。而在 add10 的作用域環境， x 則是 10。

### 你能夠舉出一個運用 Closure 的例子
1. 以實用情形為例
```
// 寫好一個改變 size 的 function
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

//我們的互動式文字大小按鈕，可以改變 body 元素的 font-size 屬性（property）並藉由相對單位令頁面其他元素接受相應調整。
var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

//size12、size14、size16 現在變成能調整字體大小到 12、14、與 16 像素的函式。而我們能如下例一般，把他們附加到按鈕上
document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;

//結果
<a href="#" id="size-12">12</a>
<a href="#" id="size-14">14</a>
<a href="#" id="size-16">16</a> 
```

2. 以安全為例
```
var counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  };   
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1
```

該作用域環境由匿名函式的 body 建立，之後立刻執行。作用域環境還包括兩個私有項（private item）：變數 privateCounter 與函式 changeBy。這些私有項，都不會在匿名函式外直接訪問。相反地，它們要透過由匿名包裝器（anonymous wrapper）回傳的公有函式訪問。使用這種方法的閉包，提供了一些與物件導向程式設計的益處，尤其是資料隱藏與封裝。

### 你知道 Prototype 在 JavaScript 裡是什麼

原型（Prototype）是為實作物件導向出現的內容，因此要認識原型（Prototype）前，我們得先了解 Javascript 是如何實作物件導向。

JavaScript 並不像 Java、C++ 這些知名的物件導向語言具有「類別」（class）來區分概念與實體（instance）或天生具有繼承的能力，而只有「物件」
，而 JavaScript 世界中，到底是怎麼實現物件導向的概念的？

首先要有個模子，我們稱它為類別，而當前面有 new 的時候，可看成是建構子（constructor），接著用這個建構子做初始化，進而建立（new）實體。

關於建構子…

- 在 JavaScript 中，除了沒有類別外，其實也沒有建構子，因此
	- 只要函式前有 new，這個函式就是建構子。
	- 只要函式前有 new 來做呼叫，就叫做建構子呼叫。

- new 關鍵字要做哪些事情呢？它的工作就是
	1. 建立一個新的物件。
	2. 將物件的 .__proto__ 指向建構子的 prototype，形成原型串鏈。
	3. 將建構子的 this 指向 new 出來的新物件。
	4. 回傳這個物件。
```
function Book(name, pNum) {
  this.name = name; // 書名
  this.pNum = pNum; // 頁數
  this.comment = null; // 評等
}

Book.prototype.setComments = function(comment) {
  this.comment = comment;
}

var ydkjs_1 = new Book('導讀，型別與文法', 257); // Book 前有 new，Book 就是建構子
// var obj = {} // 建立一個新物件
// obj.__proto__ = Book.prototype // 將物件的 .__proto__ 指向建構子的 prototype，形成原型串鏈。
// Book.call({},('導讀，型別與文法', 257)) // 將建構子的 this 指向 new 出來的新物件。
// return obj //回傳這個物件。
var ydkjs_2 = new Book('範疇與閉包 / this 與物件原型', 251); // Book 前有 new，Book 就是建構子

ydkjs_1.setComments('好書！');
ydkjs_1.comment // "好書！"

ydkjs_2.setComments('超好書！');
ydkjs_2.comment // "超好書！"

ydkjs_1.setComments === ydkjs_2.setComments // true，確認是同一個函式！
```

由此我們也可以知道， 每個物件在建立之初都會有個 .__proto__（dunder proto）內部屬性，它可用來存取另一個相連物件內部屬性 [[Prototype]] 的值，而 [[Prototype]] 存放其建構子原型的位置。

```
1	function Book(name, pNum) {
2	  this.name = name; // 書名
3	  this.pNum = pNum; // 頁數
4	  this.comment = null; // 評等
5	}
6
7	Book.prototype.setComments = function(comment) {
8	  this.comment = comment;
9	}
10
11	var ydkjs_1 = new Book('導讀，型別與文法', 257);
12	ydkjs_1.__proto__ === Book.prototype // true
13
```
>> 執行到 1
Book.__proto__ === Function.prototype
Book.prototype 此時包含 Constructor 建構子（Book）、setComments <Function>、 Book.prototype.__proto__ === Object.prototype

>> 執行到 11
ydkjs_1.__proto__ === Book.prototype

總結

原型串鏈是指經由物件的內部屬性 .__proto__ 而形成的物件到物件的連結串連，當查找物件屬性時，若在本身這個物件找不到，就往更上一層物件尋找，直到串鏈尾端，若無法找到就回傳 undefined。.__proto__ 存放的即為其建構子原型的參考。


### 你知道大部分情況下 this 的值是什麼

this 是根據 「呼叫的情況」 而決定 this 的值

1. 在物件導向下，this 就是自己的 instance
2. 在非物件導向下
	- 嚴格模式（'user strict'）：this 是 undefined
	- 非嚴格模式：node.js 是 global、瀏覽器上是 window
3. 在 obj 下，將其轉為 .call() 的形式，this 是 .call() 內第一個參數。

### 你知道物件導向的基本概念（類別、實體、繼承、封裝）
類別（Class）：自定義稍微複雜的資料型態 如：Book
實體 (Object）：即是變數 如：name、pNum、comment
```
1	function Book(name, pNum) {
2	  this.name = name; // 書名
3	  this.pNum = pNum; // 頁數
4	  this.comment = null; // 評等
5	}
6
7	Book.prototype.setComments = function(comment) {
8	  this.comment = comment;
9	}
10
11	var ydkjs_1 = new Book('導讀，型別與文法', 257);
12	ydkjs_1.__proto__ === Book.prototype // true
13
```
繼承 (Inheritance）：即為繼承者可以擁有被繼承者的特性。繼承是能有效的為我們減少相似的 code，同時為差異化提出可行的解決方法。

封裝 (Encapsulation）：即是將物件內部的資料隱藏起來，只能透過物件本身所提供的介面(interface)取得物件內部屬性或者方法，物件內部的細節資料或者邏輯則隱藏起來，其他物件即無法瞭解此物件的內部細節，若不經過允許之窗口(即此物件提供之方法)便無從更動此物件內之資料。封裝（Encapsulation）的目的，是將程式碼切割成許多模組（Module），使各模組之間的關連性降到最低，這麼一來比較不會產生「牽一髮而動全身」的狀況，降低模組間相互依賴的程度，也等於是降低複雜度，讓開發與維護更容易。

事實上，沒有人用「模組」一詞來稱呼封裝的結果，而是稱為「類別」，把模組一詞做更高階的包裝用途。因此我們應該將「類別」視為封裝的結果，把「模組」視為整個程式切割出來的許多片段。在物件導向的世界，一般來說，一個程式有多個模組，一個模組內包含多個類別


### 參考資料
1. [並行模型和事件循環](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/EventLoop)
2. [【筆記】到底 Event Loop 關我啥事？](https://medium.com/infinitegamer/why-event-loop-exist-e8ac9d287044)
3. [Scope 作用域](https://ithelp.ithome.com.tw/articles/10206604)
4. [五分鐘輕鬆暸解「提升(Hoisting)」!](https://medium.com/%E9%AD%94%E9%AC%BC%E8%97%8F%E5%9C%A8%E7%A8%8B%E5%BC%8F%E7%B4%B0%E7%AF%80%E8%A3%A1/%E4%BA%94%E5%88%86%E9%90%98%E8%BC%95%E9%AC%86%E6%9A%B8%E8%A7%A3-%E6%8F%90%E5%8D%87-hoisting-82e960964b3e)
5. [秒懂！JavaSript 執行環境與堆疊](https://medium.com/%E9%AD%94%E9%AC%BC%E8%97%8F%E5%9C%A8%E7%A8%8B%E5%BC%8F%E7%B4%B0%E7%AF%80%E8%A3%A1/%E6%B7%BA%E8%AB%87-javascript-%E5%9F%B7%E8%A1%8C%E7%92%B0%E5%A2%83-2976b3eaf248)
6. [閉包](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Closures)
7. [該來理解 JavaScript 的原型鍊了](https://blog.techbridge.cc/2017/04/22/javascript-prototype/)
8. [你懂 JavaScript 嗎？#19 原型（Prototype](https://cythilya.github.io/2018/10/26/prototype/)
9. [Java物件導向 重觀念迅速教學 (1) Class and Object ; Abstraction 什麼是OOP ? 為何使用OOP?](https://www.youtube.com/watch?v=xA2WhiAloWE)
10. [思考物件導向(1)物件導向與封裝](https://www.ithome.com.tw/node/45903)
11. [思考物件導向(2)繼承與其階段性任務](https://www.ithome.com.tw/node/46085)
12. [思考物件導向(3)從多型看物件導向的真面目](https://www.ithome.com.tw/node/46202)
13. [初學者應該要知道的物件導向概念](https://www.happycoding.today/posts/49)