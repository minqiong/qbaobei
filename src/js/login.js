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
	$('#count_btn').click(function(e){
		e.preventDefault();
		var phone=$('#count_phone')[0].value;
		var password=$('#count_password')[0].value;
		$.ajax({
			url:'../api/login.php',
			data:{phone:phone,password:password},
			success:function(data){
				console.log(data);
				if(data==='fail'){
					$('<p class="count_tip">您输入的密码有误，请重新输入...</p>').css({color:'#ff5722'}).insertBefore($('#count_btn'))
				}else{
					if($('#count_checkbox')[0].checked){
						console.log(666);
						// 设置有效期限为七天
						var date=new Date();
						date.setDate(date.getDate()+7);

						document.cookie='phone='+phone+';expires='+date.toString()+';path=/';
						document.cookie='password='+password+';expires='+date.toString()+';path=/';
						window.location.href='../index.html';
					}else{

						window.location.href='../index.html?phone='+phone;
					}
					// $('#count_btn').find('a').attr({href:'../index.html'});
				}
			}
		});
	});
});