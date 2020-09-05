<?php
  require_once("conn.php");

  if(empty($_POST['nickname']) ||
     empty($_POST['username']) ||
     empty($_POST['password']) 
  ) {
  	header("Location:./register.php?errCode=1");
  	die("資料不齊全");
  }

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = "INSERT INTO KevinCodePlace_users(nickname,username,password) VALUES('$nickname','$username','$password')";

  $result = $conn->query($sql);

  if(!$result) {
  	if($conn->errno === 1062) {
      header("Location:register.php?errCode=2");
    }
  	die("註冊時遇到錯誤： " . $conn->error);
  }
  
  header("Location:./index.php");

?>