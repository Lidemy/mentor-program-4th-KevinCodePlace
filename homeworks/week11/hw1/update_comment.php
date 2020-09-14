<?php
    session_start();
    require_once("conn.php");
    require_once("utils.php");

    if(empty($_GET['id'])) {
      header("Location:./index.php?errCode=1");
      die("資料不齊全");
    }

    $id = $_GET['id'];

    $sql = "SELECT * from kevincodeplace_comments WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i",$id);
    $result = $stmt->execute();
    
    if(!$result) {
      die('編輯留言失敗');
    }

    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class="board">
      <h1 class="board__title">編輯留言</h1>
	      <form class="board__new-comment-form" method="POST" action="handle_update_comment.php">
	        <textarea name="content" rows="5"><?php echo $row['content']?></textarea>
          <input type="hidden" name="id" value="<?php echo $row['id']?>"/>
	        <input class="board__submit-btn" type="submit" />
	      </form>
  </main>
</body>
</html> 

