<?php
  require_once("conn.php");

  $sql = "SELECT * FROM kevincodeplace_blog_articles WHERE is_deleted is NULL ORDER BY id DESC";
  $result = $conn->query($sql);

  if(!$result) {
   die("查詢文章失敗" . $conn->error);
  }  

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
          <li><a href="add_article.php">新增文章</a></li>
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
      <div class="admin-posts">
  <?php  while($row = $result->fetch_assoc()) { 
        echo"<div class='admin-post'>";
          echo"<div class='admin-post__title'>";
              echo $row['title'];
          echo"</div>";
          echo"<div class='admin-post__info'>";
            echo"<div class='admin-post__created-at'>";
              echo $row['created_at'];
            echo"</div>";
            echo"<a class='admin-post__btn' href='edit.php?id=" . $row['id'] . "'>";
              echo"編輯";
            echo"</a>";
            echo"<a class='admin-post__btn' href='delete_article.php?id=" . $row['id'] . "'>";
              echo"刪除";
            echo"</a>";
          echo"</div>";
        echo"</div>";
      }
  ?>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>