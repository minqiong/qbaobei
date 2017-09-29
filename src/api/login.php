<?php
	include 'connect.php';

	// 用变量存放传过来的数据
	$phone=isset($_GET['phone'])?$_GET['phone']:'';
	$password=isset($_GET['password'])?$_GET['password']:'123456';
	//查看用户名是否已经存在
	$sql = "select * from user where phone='$phone' and password='$password'";
	// 得到的查询结果集
	$result = $conn->query($sql);
	$row = $result->fetch_row();

	//print_r($row[0]);

	if($row[0]){
		echo 'ok';
	}else{
		echo 'fail';
	}
	

	// 释放查询内存(销毁)
	$result->free();

	//关闭连接
	$conn->close();
?>