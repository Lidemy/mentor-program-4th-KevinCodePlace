<?php 

  session_start();
  require_once("conn.php");
  require_once("utils.php");
  

  $username = $_SESSION['username'];

  $page = 1;
  if(!empty($_GET['page'])) {
    $page = $_GET['page'];
  }

  $items_per_page = 5;
  if(!empty($_GET['items_per_page'])) {
    $items_per_page = $_GET['items_per_page'];
  }

  $offset = ($page - 1) * $items_per_page;


  $sql = "SELECT * FROM kevincodeplace_users limit ? offset ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii",$items_per_page,$offset);
  $result = $stmt->execute();

  if(!$result) {
  	die("查找失敗");
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
  	  <a class="board__btn" href="index.php">回留言板</a>
      <h1 class="board__title">管理員後台</h1>
      <table>
      	<tr>
      		<th>id</th>
      		<th>nickname</th>
      		<th>username</th>
      		<th>權限等級</th>
      		<th>權限</th>
      	</tr>
  <?php
  while($row = $result->fetch_assoc()) {
   $role = "";
   if($row['role'] === 2) {
      $role = "管理員";
   } else if($row['role'] === 1) {
   	  $role = "停權使用者";
   } else {
   	  $role = "一般使用者";
   }

   echo"<tr>";
   echo    "<td>" . $row['id'] ."</td>";
   echo    "<td>" . $row['nickname'] ."</td>";
   echo    "<td>" . $row['username'] ."</td>";
   echo    "<td class='role__now'>" . $role ."</td>";
   echo    "<td class='edit__role' id=" . $row['username'] . ">" . "編輯" ."</td>";
   echo"<tr>";
  }
 ?>
      </table>
      <div class="board__hr"></div>
      <?php

      	$sql_count = "SELECT count(id) as count from kevincodeplace_users ";
      	$stmt_count = $conn->prepare($sql_count);
      	$result_count = $stmt_count->execute();
      	$result_count = $stmt_count->get_result();
      	$row_count = $result_count->fetch_assoc();

      	$count = $row_count['count'];
      	$total_page = ceil($count/$items_per_page);
      ?>
      <div class="page__info">
      	<div class="board__nickname">
          <span>單頁顯示</span>
          <input class= "admin__play" type="text" name="play" placeholder="<?php echo $items_per_page ?>" />
          <span>筆資料</span>
        </div>
        <span>總共有</span>
        <span class="count"><?php echo $count ?></span>
        <span>筆資料 ，頁數：</span>
        <span><?php echo $page ?> / <?php echo $total_page ?></span>
      </div>
      <div class="paginator">
        <a href="admin.php?page=1">首頁</a>
        <a href="admin.php?page=<?php echo $page > 1 ? ($page-1):1 ?>">上一頁</a>
        <a href="admin.php?page=<?php echo $page < $total_page?($page+1):$total_page ?>">下一頁</a>
        <a href="admin.php?page=<?php echo $total_page ?>">末頁</a>
      </div>
  </main>
  <div class="update__role hide__normal hide">
  </div>
  <div class="update__role hide__admin hide">
  </div>
  <div class="update__role hide__stop hide">
  </div>
  <script>
  	  //處理單頁顯示會員資料筆數
  	  let playBtn = document.querySelector(".admin__play");
  	  playBtn.addEventListener("keydown",function(e){
  		if(e.keyCode === 13) {
  			let offset = escapeStr(playBtn.value);
  			let countString = document.querySelector(".count").innerText;
  			let count = parseInt(countString, 10);

  			if(offset > 0 && offset <= count ) {
  			  window.location = './admin.php?items_per_page=' + offset ;
  			  return ;
  			} else {
  			  alert("請輸入正確範圍 1 - " + count);
  			}
  		}
  	  })

  	  //更改使用者權限畫面
  	  let editRole = document.querySelector("table");
  	  editRole.addEventListener("click", function(e){
		if(e.target.className === "edit__role") { //當點擊到編輯
		  let roleNow = e.target.parentNode.childNodes[3].innerText; //取得編輯位置用戶的權限
		  let username = e.target.parentNode.childNodes[2].innerText;//取得編輯位置用戶的 username
		  if(roleNow === "管理員") {
		  	let hideRolechange = document.querySelector(".hide__admin"); 
		  	hideRolechange.innerHTML = `
		  	<div class="update__role-title"><h3>變更權限為</h3></div>
		  	<a class="board__btn update__role-change" href="update_role.php?username=${username}&role=0&items_per_page=<?php echo $items_per_page ?>">一般使用者</a>
  	        <a class="board__btn update__role-change" href="update_role.php?username=${username}&role=1&items_per_page=<?php echo $items_per_page ?>">停權使用者</a>
  	        <a class="board__btn update__role-change back" href="admin.php?items_per_page=<?php echo $items_per_page ?>">點選回後台</a>
		  	`;
		   hideRolechange.classList.remove("hide");
		  } else if(roleNow === "停權使用者") {
		  	let hideRolechange = document.querySelector(".hide__stop"); 
		  	hideRolechange.innerHTML = `
		  	<div class="update__role-title"><h3>變更權限為</h3></div>
		  	<a class="board__btn update__role-change" href="update_role.php?username=${username}&role=0&items_per_page=<?php echo $items_per_page ?>">一般使用者</a>
  	        <a class="board__btn update__role-change" href="update_role.php?username=${username}&role=2&items_per_page=<?php echo $items_per_page ?>">成為管理員</a>
  	        <a class="board__btn update__role-change back" href="admin.php?items_per_page=<?php echo $items_per_page ?>">點選回後台</a>
		  	`;
		   hideRolechange.classList.remove("hide");
		  } else if(roleNow === "一般使用者") {
		  	let hideRolechange = document.querySelector(".hide__normal"); 
		  	hideRolechange.innerHTML = `
		  	<div class="update__role-title"><h3>變更權限為</h3></div>
		  	<a class="board__btn update__role-change" href="update_role.php?username=${username}&role=2&items_per_page=<?php echo $items_per_page ?>">成為管理員</a>
  	        <a class="board__btn update__role-change" href="update_role.php?username=${username}&role=1&items_per_page=<?php echo $items_per_page ?>">停權使用者</a>
  	        <a class="board__btn update__role-change back" href="admin.php?items_per_page=<?php echo $items_per_page ?>">點選回後台</a>
		  	`;
		   hideRolechange.classList.remove("hide");
  	   	    
		  } else {
		  	alert("錯誤");
		  }
		}
  	  });

  	  function escapeStr(str){
    	return str.replace(/\&/g, '&amp;')
	        .replace(/\</g, '&lt;')
	        .replace(/\>/g, '&gt;')
	        .replace(/\"/g, '&quot;')
	        .replace(/\'/g, '&#x27')
	        .replace(/\//g, '&#x2F');
		}
  </script>
</body>
</html> 

