<?php
require_once("conn.php");

if(empty($_POST['title']) ||
   empty($_POST['content']) ||
   empty($_POST['id'])
){
  header("Location:./index.php?errorCode=1");
  die("資料不齊全");
}

$title = $_POST['title'];
$content = $_POST['content'];
$ID = $_POST['id'];


$sql = "UPDATE kevincodeplace_blog_articles SET title=?,content=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi",$title,$content,$ID);
$result = $stmt->execute();

if(!$result) {
  die("編輯文章錯誤" . $conn->error);
} else {
  header("Location:./index.php");
}


?>