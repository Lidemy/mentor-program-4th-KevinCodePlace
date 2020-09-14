<?php
  session_start();
  require_once("conn.php");
  require("utils.php");

  if(empty($_POST['content'])) {
  	header("Location:./index.php?errCode=1");
	die("資料不齊全");
  }

  $username = $_SESSION['username'];
  $content = $_POST['content'];
  
  $sql = "INSERT INTO kevincodeplace_comments(username,content) VALUES (?,?) ";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss",$username,$content);
  $result = $stmt->execute();

  if(!$result) {
  	die('新增留言失敗');
  } else {
  	header("Location:./index.php");
  }

?>