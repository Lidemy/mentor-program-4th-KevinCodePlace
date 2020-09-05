<?php
  require_once("conn.php");
  
  function getUserFromUsername($username) {
    global $conn;
    $sql = "SELECT * FROM KevinCodePlace_users WHERE username='$username'";
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    return $row;
  }
?>