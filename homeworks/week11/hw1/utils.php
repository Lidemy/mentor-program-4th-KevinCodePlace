<?php
	require_once("conn.php");

	function getUserfromUsername($username) {
		global $conn;
		$sql = "SELECT * FROM kevincodeplace_users WHERE username=?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param("s",$username);
		$result = $stmt->execute();

		$result = $stmt->get_result();
		$user =  $result->fetch_assoc();
		return $user;
	}

	function escape($str){
      $escStr = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
      return($escStr);
	}

	function getRolefromUsername($username){

	  if(empty($username)){return "";}
	  global $conn;
	  $sql_getadmin = "SELECT * FROM kevincodeplace_users WHERE username=?";
      $stmt_getadmin = $conn->prepare($sql_getadmin);
      $stmt_getadmin->bind_param("s",$username);
      $result_getadmin = $stmt_getadmin->execute();
      $result_getadmin = $stmt_getadmin->get_result();
      $row_getadmin = $result_getadmin->fetch_assoc();
      return  $row_getadmin['role'];
	}

?>