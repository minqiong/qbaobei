<?php 
	include 'connect.php';
	$title=isset($_GET['title'])?$_GET['title']:'';

	// 编写查询语句
	$sql="select * from content where con_title='$title'";
	// 获取查询结果
	$result=$conn->query($sql);
	// 使用查询结果
	$row=$result->fetch_all(MYSQLI_ASSOC);

	// 输出
	echo json_encode($row,JSON_UNESCAPED_UNICODE);
	
	// 释放查询内存
	$result->free();


	// 关闭连接
	$conn->close();
?>