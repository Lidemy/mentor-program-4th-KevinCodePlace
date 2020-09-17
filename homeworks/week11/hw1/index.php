<?php 
	session_start();
	require_once("conn.php");
	require_once("utils.php");

	$username = NULL;
	$nickname = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserfromUsername($username);
		$nickname = $user['nickname'];
	}

	$page = 1;
	if(!empty($_GET['page'])) {
      $page = $_GET['page'];
    }
	$items_per_page = 5;
	$offset = ($page - 1) * $items_per_page;


    // 0 一般使用者（可以新增留言，且編輯與刪除自己的留言）
    // 1 遭停權使用者（不能新增留言，但是可以編輯與刪除自己的留言）
    // 2 管理員（可以新增留言，也可以編輯與刪除任意留言）
	$sql = "SELECT kevincodeplace_comments.id as id,kevincodeplace_comments.username as username,kevincodeplace_comments.content as content, kevincodeplace_comments.created_at as created_at, kevincodeplace_comments.is_deleted as is_deleted, kevincodeplace_users.nickname as nickname,kevincodeplace_users.role as role  FROM kevincodeplace_comments LEFT JOIN  kevincodeplace_users
	    ON kevincodeplace_comments.username = kevincodeplace_users.username WHERE kevincodeplace_comments.is_deleted IS NULL ORDER BY kevincodeplace_comments.id DESC limit ? offset ?";

	$stmt = $conn->prepare($sql);
	$stmt->bind_param("ii",$items_per_page,$offset);
	$result = $stmt->execute();


	if(!$result) {
  	 die('留言載入失敗');
    }

    $result = $stmt->get_result();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="board">
  	<?php if(!$username) { ?>
	  <a class="board__btn" href="register.php">註冊</a>
	  <a class="board__btn" href="login.php">登入</a>
	<?php } else { ?>
	  <a class="board__btn" href="logout.php">登出</a>
      <a class="board__btn update__nickname">編輯暱稱</a>
      <?php
      $role = getRolefromUsername($username);
      if($role===2) {?>
      <a class="board__btn" href="admin.php">查看後台</a>
      <?php }?>
      <form class="board__new-comment-form update__nickname-form hide" method="POST" action="update_user.php">
        <div class="board__nickname">
          <span>新的暱稱：</span>
          <input type="text" name="nickname" />
        </div>
        <input class="board__submit-btn" type="submit" />
      </form>
      <h1 class="board__title">Comments</h1>
      <h3> Hi ，<?php echo $nickname . "(@" . $username . ")" ?> </h3>
     <?php } ?>
     <?php
        $message = "";
        if(!empty($_GET['errCode'])){
          if($_GET['errCode']==="1") {
            $message = "請輸入完整資訊";
         } 
        }   
        echo "<h2 class='missinfo'>" . $message . "</h2>"; 
      ?>
	  <form class="board__new-comment-form" method="POST" action="handle_add_comment.php">
	      <textarea name="content" rows="5"></textarea>
	  <?php
	    $role = getRolefromUsername($username); 
	    if($username && $role !== 1) { 
	  echo"<input class='board__submit-btn' type='submit' />";
	  } else if($username && $role ===1) { 
	  echo"<h3>您的帳號已遭停權</h3>";
	  } else {
	  echo"<h3>請登入發佈留言</h3>";
	  }
	  ?>
	  </form>
      	  
      <div class="board__hr"></div>
      <section>
		<?php while($row = $result->fetch_assoc()) { 
		 echo"<div class='card'>";
		 echo   "<div class='card__avatar'></div>";
		 echo   "<div class='card__body'>";
		 echo     "<div class='card__info'>";
		 echo       "<span class='card__author'>" . $row['nickname'] . "(@" . $row['username'] . ")</span>";
		 echo       "<span class='card__time'>" . $row['created_at'] . "</span>";
	    if($row['username'] === $username || $role === 2){
		 echo       "<a class='update__comment' href='update_comment.php?id=" . escape($row['id']) . "'>" . "編輯</a>";
		 echo       "<a class='update__comment' href='delete_comment.php?id=" . escape($row['id']) . "'>" . "刪除</a>";
	    }
	     echo     "</div>";
		 echo     "<p class='card__content'>" . escape($row['content']) . "</p>";
		 echo   "</div>";
		 echo"</div>";	  
		} ?>      
      </section>
      <div class="board__hr"></div>
      <?php
      	$sql = "SELECT count(id) as count from kevincodeplace_comments WHERE is_deleted IS NULL";
      	$stmt = $conn->prepare($sql);
      	$result = $stmt->execute();
      	$result = $stmt->get_result();
      	$row = $result->fetch_assoc();

      	$count = $row['count'];
      	$total_page = ceil($count/$items_per_page);
      ?>
      <div class="page__info">
        <span>總共有 <?php echo $count ?> 筆留言，頁數：</span>
        <span><?php echo $page ?> / <?php echo $total_page ?></span>
      </div>
      <div class="paginator">
        <a href="index.php?page=1">首頁</a>
        <a href="index.php?page=<?php echo $page > 1 ? ($page-1):1 ?>">上一頁</a>
        <a href="index.php?page=<?php echo $page < $total_page?($page+1):$total_page ?>">下一頁</a>
        <a href="index.php?page=<?php echo $total_page ?>">末頁</a>
      </div>
  </main>
</body>
<script>
	document.querySelector(".update__nickname").addEventListener("click",function(e){
		let btn = document.querySelector(".update__nickname-form");
		btn.classList.toggle("hide");
	})
</script>
</html> 

     