<?php

  require_once("conn.php");
  if(empty($_GET['username']) ||
    ($_GET['role'] != 0 && $_GET['role'] != 1 && $_GET['role'] != 2)
    ) {
      header("Location:./admin.php");
      die("資料不齊全");
    }

  $username = $_GET['username'];
  $role = $_GET['role'];
  $items_per_page = $_GET['items_per_page'];

  $sql = "UPDATE kevincodeplace_users SET role=? WHERE username = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("is",$role,$username);
  $result = $stmt->execute();

  if(!$result) {
  	  die('編輯權限失敗');
    } else {
  	  header("Location:./admin.php?items_per_page=" . $items_per_page);
    }
?>