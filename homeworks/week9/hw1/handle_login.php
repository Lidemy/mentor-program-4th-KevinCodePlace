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
  $password = $_POST['password'];

  $sql = "SELECT * FROM KevinCodePlace_users WHERE username='$username' AND password='$password'";

  $result = $conn->query($sql);

  if($result->num_rows) {
    
    $_SESSION['username'] = $username;  
    // $expire = time() + 3600 * 24 * 30;
    // setcookie("username",$username,$expire);
    header("Location:index.php");
  } else {
    header("Location:login.php?errCode=2");
  }

?>