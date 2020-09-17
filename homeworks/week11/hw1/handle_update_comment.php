<?php
	session_start();
	require_once("conn.php");
	require_once("utils.php");

	if(empty($_POST['id']) ||
	   empty($_POST['content'])	
	  ){
		die("編輯留言失敗");
	}

	$id = $_POST['id'];
	$content = $_POST['content'];
	$username = $_SESSION['username'];
	$role = getRolefromUsername($username);

	if($role === 2) {
	  $sql = "UPDATE kevincodeplace_comments SET content=? WHERE id=?";
	  $stmt = $conn->prepare($sql);
	  $stmt->bind_param("si",$content,$id);
	}else {
	  $sql = "UPDATE kevincodeplace_comments SET content=? WHERE id=? and username=?";
	  $stmt = $conn->prepare($sql);
	  $stmt->bind_param("sis",$content,$id,$username);
	}
	
	$result = $stmt->execute();

	if(!$result) {
  	  die('編輯留言失敗');
    } else {
  	  header("Location:./index.php");
    }


?>