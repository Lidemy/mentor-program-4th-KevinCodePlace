<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>留言板</title>
	<link rel="stylesheet" href="./style.css">
</head>
<body>
	<header class="warning">
	  <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
	</header>
	<main class="board">
		<a href="index.php" class="board__btn">回留言板</a>
		<a href="login.php" class="board__btn">登入</a>
		<h1 class="board__title">註冊</h1>
		<?php 
	        if(!empty($_GET['errCode'])) {
	        	$code = $_GET['errCode'];
	        	$msg = "Error";

	        	if($code === "1") {
	        		$msg = "資料不齊全";
	        	}
	        	if($code ==="2") {
	        		$msg = "帳號已被註冊";
	        	}
 	        	echo "<h2 class='missinfo'>錯誤：" . $msg . "</h2>";
	        }
        ?>
		<form action="handle_register.php" class="board__new-comment-form" method="POST">
		  <div class="board__nickname">
		  	<span>暱稱：</span>
		  	<input type="text" name="nickname">
		  </div>
		  <div class="board__nickname">
		  	<span>帳號：</span>
		  	<input type="text" name="username">
		  </div>
		  <div class="board__nickname">
		  	<span>密碼：</span>
		  	<input type="password" name="password">
		  </div>
		  <input type="submit" class="board__submit-btn">
		</form>
	</main>
</body>
</html>