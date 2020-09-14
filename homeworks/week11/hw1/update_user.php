<?php
  session_start();
  require_once("conn.php");
  if(empty($_POST['nickname'])) {
      header("Location:./index.php?errCode=1");
      die("資料不齊全");
    }

  $nickname = $_POST['nickname'];
  $username = $_SESSION['username'];

  $sql = "UPDATE kevincodeplace_users SET nickname=? WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss",$nickname,$username);
  $result = $stmt->execute();

  if(!$result) {
  	  die('編輯暱稱失敗');
    } else {
  	  header("Location:./index.php");
    }
?>