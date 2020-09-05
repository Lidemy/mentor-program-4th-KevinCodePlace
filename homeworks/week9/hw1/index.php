<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $username = NULL;

  if(!empty($_SESSION['username'])) {
  	$username = $_SESSION['username'];
  	$user = getUserFromUsername($username);
  	$nickname = $user['nickname'];
  }
  // $username = NULL;
  // $nickname = NULL;
  // if(!empty($_COOKIE['token'])) {
  // 	$user = getUserFromToken($_COOKIE['token']);
  // 	$username = $user['username'];
  // }

  $result = $conn->query("SELECT * FROM KevinCodePlace_comments ORDER BY id DESC");

  if(!$result) {
    die("Error：" . $conn->error);
  }
?>
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
		<?php if (!$username) { ?>
			<a href="register.php" class="board__btn">註冊</a>
			<a href="login.php" class="board__btn">登入</a>
		<?php } else {?>
			<a href="logout.php" class="board__btn">登出</a>
		<?php } ?>
		<h1 class="board__title">Comment</h1>
		<?php 
	        if(!empty($_GET['errCode'])) {
	        	$code = $_GET['errCode'];
	        	$msg = "Error";

	        	if($code === "1") {
	        		$msg = "資料不齊全";
	        	}
	        	echo "<h2 class='missinfo'>錯誤：" . $msg . "</h2>";
	        }
        ?>
        <?php if($username) {
        	echo "<h3>Hi：" . $nickname  . "</h3>";	
        } 
        ?>
		<form action="handle_add_comment.php" class="board__new-comment-form" method="POST">
		    <div class="board__nickname">
		    </div>
			<textarea name="content" rows="5"></textarea>
		      <?php if(!empty($_SESSION['username'])){ ?>
			<input type="submit" class="board__submit-btn">
			 <?php } else { ?>
			<h3>請登入後發佈留言</h3>
			 <?php } ?>
		</form>
		<div class="board__hr"></div>
		<section>
		<?php
			while($row = $result->fetch_assoc()){
			  echo "<div class='card'>";
			  echo "  <div class='card__avatar'></div>";
			  echo "  <div class='card__body'>";
			  echo "    <div class='card__info'>";
			  echo "      <span class='card__author'>" . $row['nickname'] . "</span>";
			  echo "      <span class='card__time'>" . $row['created_at'] . "</span>";
			  echo "    </div>";
			  echo "    <p class='card__content'>". $row['content'] . "</p>";
			  echo "  </div>";
			  echo "</div>";
			} 
		?>
		</section>
	</main>
</body>
</html>