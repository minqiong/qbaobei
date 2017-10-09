<?php 
	include 'connect.php';
	// 接收穿过来的变量
	$classify=isset($_GET['classify'])?$_GET['classify']:'';

	// 编写查询语句
	$sql="select con_title,con_content,label,imgurl from content where classify='$classify'";
	$result = $conn->query($sql);


	// 使用查询结果集
	// $row = $result->fetch_all(); 不转成json字符串
	$row = $result->fetch_all(MYSQLI_ASSOC);  //转成json字符串
	// echo $classify;
	echo json_encode($row,JSON_UNESCAPED_UNICODE);
	// 释放查询内存(销毁)
	$result->free();

	//关闭连接
	$conn->close();
?>