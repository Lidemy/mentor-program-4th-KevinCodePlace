<?php
    session_start();
	require_once("conn.php");
	require_once("utils.php");

	if(empty($_POST['content'])) {
	   header("Location:./index.php?errCode=1");
	   die("資料不齊全");	
	}
    
    $user = getUserFromUsername($_SESSION['username']);
	$nickname = $user['nickname'];
	$content = $_POST['content'];

	$sql = "INSERT INTO KevinCodePlace_comments(nickname,content) VALUES('$nickname','$content') ";

	$result = $conn->query($sql);

	if ($result) {
	  header("Location:./index.php");
	} else {
      echo "新增留言錯誤 " . $conn->error;
	}

?>