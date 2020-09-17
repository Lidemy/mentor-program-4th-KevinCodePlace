<?php
require_once("conn.php");

if(empty($_GET['id'])) {
  header("Location:./admin.php");
}

$ID = $_GET['id'];

$sql = "UPDATE kevincodeplace_blog_articles SET is_deleted = 1 WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i",$ID);
$result = $stmt->execute();

if(!$result) {
  die("編輯文章錯誤" . $conn->error);
} else {
  header("Location:./admin.php");
}


?>