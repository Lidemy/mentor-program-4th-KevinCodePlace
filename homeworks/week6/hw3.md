## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
一、audio 
使用時機 :想要插入語音或影片

<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  Your browser does not support the audio tag.
</audio>

二、map
使用時機：想要在圖片中的各個子圖片元素插入連結

<img src="workplace.jpg" alt="Workplace" usemap="#workmap" width="400" height="379">

<map name="workmap">
  <area shape="rect" coords="34,44,270,350" alt="Computer" href="computer.htm">
  <area shape="rect" coords="290,172,333,250" alt="Phone" href="phone.htm">
  <area shape="circle" coords="337,300,44" alt="Cup of coffee" href="coffee.htm">
</map>

三、Canva
使用時機：想要自己畫圖的時候
<!DOCTYPE html>
<html>
<body>

<h1>The canvas element</h1>

<canvas id="myCanvas">Your browser does not support the canvas tag.</canvas>

<script>
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 80, 100);
</script>

</body>
</html>


## 請問什麼是盒模型（box model）

意思是在 CSS 裡面，html 的每個元素都可以被視作一個盒子
從外到內：margin、border、padding


## 請問 display: inline, block 跟 inline-block 的差別是什麼？

display 主要是解答兩個問題：
1. 元素與相鄰元素相對關係？
2. 元素內部元素如何排列？

關於問題一有兩種排列：
1. 相鄰排在一起
2. 由上到下
 
如果需要排列在同一行使用　inline
如果需要由上到下排列使用 block
如果想要排列在同一行（inline），又想調整寬高（block），使用 inline-block

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

Position 主要是解答兩個問題：
1. 元素是絕對定位還是相對定位？
2. 元素是相對於哪裡排版？

static:不跳脫排版流、不預設特定位置來排列的預設狀態
relative：不跳脫排版流，以原本的位置為原點做移動
absolute：跳脫排版流，以特定元素為原點移動（如彈窗上的x）
fixed：跳脫排版流以視窗為原點來移動（如彈窗）
