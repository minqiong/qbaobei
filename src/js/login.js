require.config({
	paths:{
		jquery:'../lib/jquery-3.2.1.min',
		common:'common'
	},
	shim:{
		common:['jquery']
	}
});
require(['jquery','common'],function($,com){
	$('#main').height(window.innerHeight);
	window.onresize=function(){
		$('#main').height(window.innerHeight);
	}
	// 登录方式切换
	// 默认第二个隐藏第一个加样式
	$('.login_box ul li').first().addClass('active');
	$('.phone_login').hide();
	$('.login_box ul li').click(function(){
		$('.login_box ul li').eq($(this).index()).addClass('active').siblings().removeClass('active');
		$('.login_way div').eq($(this).index()).show().siblings().hide();
	});
	$('#count_btn').click(function(){
		var phone=$('#count_phone')[0].value;
		$.ajax({
			url:'../api/login.php',
			data:{phone:phone,password:password},
			success:function(data){
				console.log(data);
				if(data==='ok'){
				// 	$('#shade').show();
				// }else{
				// 	$('.phone_tip').html('手机号码已被注册').css({color:'#ff5722'});
				}
			}
		});
	});
});