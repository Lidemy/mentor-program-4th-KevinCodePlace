<?php
  session_start();
  require_once("conn.php");

  if(empty($_POST['nickname']) ||
     empty($_POST['username']) ||
     empty($_POST['password'])
    ){
    header("Location:./register.php?errorCode=1");
  }

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = "INSERT INTO kevincodeplace_blog_users(nickname,username,password) VALUES(?,?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sss",$nickname,$username,$password);
  $result = $stmt->execute();
  
  if ($result) {
    $_SESSION['username'] = $username;
    header('Location: ./index.php');
  } else {
    if($conn->errno === 1062) {
      header("Location:register.php?errCode=2");
    }
    die($conn->error); 
  }
?>