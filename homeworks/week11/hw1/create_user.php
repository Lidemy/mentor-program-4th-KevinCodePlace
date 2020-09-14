<?php
	require_once("conn.php");
	$nickArr=array('nick1','nick2','nick3','nick3','nick4','nick5','nick6','nick7','nick8','nick9','nick10');
	$userArr=array('user1','user2','user3','user3','user4','user5','user6','user7','user8','user9','user10');
	$passArr=array('pass1','pass2','pass3','pass3','pass4','pass5','pass6','pass7','pass8','pass9','pass10');
	$i=count($nickArr);
	for($j=0 ; $j<$i ; $j++){
	  $nickname = $nickArr[$j];
	  $username = $userArr[$j];
	  $password = password_hash($passArr[$j], PASSWORD_DEFAULT);
	  $sql = " INSERT INTO kevincodeplace_users(nickname,username,password) VALUES(?,?,?) ";
	  $stmt = $conn->prepare($sql);
	  $stmt->bind_param("sss",$nickname,$username,$password);
	  $result = $stmt->execute();
	}
?>