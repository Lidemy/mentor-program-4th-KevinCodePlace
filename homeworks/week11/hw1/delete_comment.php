<?php
    session_start();
	require_once("conn.php");
	require_once("utils.php");

	if(empty($_GET['id'])){
		die("刪除留言失敗");
	}

	$id = $_GET['id'];
	$username = $_SESSION['username'];
	$role = getRolefromUsername($username);

	if($role === 2) {
	  $sql = "UPDATE kevincodeplace_comments SET is_deleted=1 WHERE id=?";
	  $stmt = $conn->prepare($sql);
	  $stmt->bind_param("i",$id);
	} else {
	  $sql = "UPDATE kevincodeplace_comments SET is_deleted=1 WHERE id=? and username=?";
	  $stmt = $conn->prepare($sql);
	  $stmt->bind_param("is",$id,$username);
	}
	
	$result = $stmt->execute();

	if(!$result) {
  	  die('刪除留言失敗');
    } else {
  	  header("Location:./index.php");
  	}
?>