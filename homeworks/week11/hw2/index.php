<?php
require_once("conn.php");


$page_now = 1;
if(!empty($_GET['page_now'])) {
	$page_now =  $_GET['page_now'];
}

$items_per_page = 5;
$offset = ($page_now-1) * $items_per_page;

$sql = "SELECT * FROM kevincodeplace_blog_articles WHERE is_deleted is NULL ORDER BY id DESC limit ? offset ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii",$items_per_page,$offset);
$result = $stmt->execute();

if(!$result) {
	die("查詢文章失敗" . $conn->error);
}  

$result = $stmt->get_result();
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
					<li><a href="article_list.php">文章列表</a></li>
					<li><a href="#">分類專區</a></li>
					<li><a href="#">關於我</a></li>
				</div>
				<div>
					<li><a href="admin.php">管理後台</a></li>
					<li><a href="login.php">登入</a></li>
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
		<div class="posts">
			<?php  while($row = $result->fetch_assoc()) { 
				echo"<article class='post'>";
				echo"<div class='post__header'>";
				echo"<div>".$row['title']."</div>";
				echo"<div class='post__actions'>";
				echo"<a class='post__action' href='edit.php?id=" . $row['id'] . "'>編輯</a>";
				echo"</div>";
				echo"</div>";
				echo"<div class='post__info'>";
				echo"2020/07/01 11:11:12";
				echo"</div>";
				echo"<div class='post__content'>" . $row['content'];
				echo"</div>";
				echo"<a class='btn-read-more' href='blog.php'>READ MORE</a>";
				echo"</article>";
			}
			?>
			<?php
			$Num_sql = "SELECT count(id) as count from kevincodeplace_blog_articles WHERE is_deleted IS NULL";
			$Num_stmt = $conn->prepare($Num_sql);
			$Num_result = $Num_stmt->execute();
			$Num_result = $Num_stmt->get_result();
			$row = $Num_result->fetch_assoc();

			$total_article = $row['count'];
			$total_page = ceil($total_article/$items_per_page);
			?>
			<div class="page" role="navigation">
				<?php
				echo"<a class='page-back' title='前往上一頁' href='index.php?page_now=" . ($page_now == 1 ? 1 : $page_now - 1) . "'>上一頁</a>"; 
				for($pg=1; $pg <= $total_page; $pg++){
					if($pg == $page_now) {
						echo"<a href='index.php?page_now=" . $pg ."' class='page-now' title='前往第" . $pg ."頁'>". $pg . "</a>";  
					} else {
						echo"<a href='index.php?page_now=" . $pg ."' title='前往第" . $pg ."頁'>". $pg . "</a>"; 
					}				
				}
				echo"<a class='page-next' title='前往下一頁' href='index.php?page_now=" . ($page_now == $total_page ? $page_now : $page_now + 1) . "'>下一頁</a>"; 
				?>
				
			</div>
		</div>
	</div>
	<footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>
