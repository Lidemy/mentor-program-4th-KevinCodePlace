<?php
require_once("conn.php");
if(empty($_GET['id'])) {
  header("Location:./index.php");
}

$contentID = $_GET['id'];
$sql = "SELECT * FROM kevincodeplace_blog_articles WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i",$contentID);
$result = $stmt->execute();

if(!$result) {
  header("Location:./index.php");
}

$result = $stmt->get_result();
$row = $result->fetch_assoc();


?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="#">文章列表</a></li>
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
        </div>
        <div>
          <li><a href="admin.php">管理後台</a></li>
          <li><a href="#">登出</a></li>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="handle_edit-article.php" method="POST">
          <div class="edit-post__title">
            發表文章：
          </div>
          <div class="edit-post__input-wrapper">
           <?php
           echo"<input class='edit-post__input' name='title' value='". $row['title'] ."'/>";
           ?>
         </div>
         <div class="edit-post__input-wrapper">
          <?php
          echo "<textarea rows='20' name='content' class='edit-post__content'>". $row['content']. "</textarea>";
          ?>
        </div>
        <div class="edit-post__btn-wrapper">
          <input type="hidden" name="id" value="<?php echo $row['id']?>"/>
          <input type='submit' class="edit-post__btn"></input>
        </div>
      </form>
    </div>
  </div>
</div>
<footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>