<?php
	session_start();
	require_once("conn.php");

	if(empty($_POST['username']) ||
	   empty($_POST['password']) 
	) {
	  header("Location:./login.php?errCode=1");
	  die("資料不齊全");
	}

	$username = $_POST['username'];

	$sql = " SELECT * FROM kevincodeplace_users WHERE username=? ";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param("s",$username);
	$result = $stmt->execute();

	if(!$result) {
		die();
	}

	$result = $stmt->get_result();
	$row = $result->fetch_assoc();

	if(password_verify($_POST['password'], $row['password'])) {
		$_SESSION['username'] = $username;
		header("Location:./index.php");
	} else {
		header("Location:login.php?errCode=2");
  		exit();
	}
?>