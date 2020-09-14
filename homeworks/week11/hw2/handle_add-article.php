<?php
session_start();
require_once("conn.php");

if(empty($_POST['title']) ||
   empty($_POST['content'])
){
  header("Location:./add_article.php?errorCode=1");
  die("資料不齊全");
}

$title = $_POST['title'];
$content = $_POST['content'];

$sql = "INSERT INTO kevincodeplace_blog_articles(title,content) VALUES(?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss",$title,$content);
$result = $stmt->execute();

if(!$result) {
  die("新增文章錯誤" . $conn->error);
} else {
  header("Location:./index.php");
}


?>