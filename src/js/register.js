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
	// com.headAndFoot();

	// $('#phone')[0].oninput=function(){

	// 	console.log(phone);
	// };
	$('#btn').click(function(e){
		e.preventDefault();
		var phone=$('#phone')[0].value;
		if(!/^1[34578]\d{9}$/.test(phone)){
			$('.phone_tip').html('手机号码不合法').css({color:'#ff5722'});
			return false;
		}else{
			$('.phone_tip').html();
			
		}
		//昵称只能输入中文
		var nickname = $('#nickname')[0].value;
		if(!/^[\u2E80-\u9FFF]*$/.test(nickname)){
			$('.name_tip').html('昵称只能输入中文').css({color:'#ff5722'});
			return false;
		}else{
			$('.name_tip').html();
		}
		/*
			密码  
				长度6-20 
				不能包含空格
		 */
		var password = $('#password')[0].value;
		if(!/^\S{6,16}$/.test(password)){
			$('.password_tip').html('密码不合法').css({color:'#ff5722'});
			return false;
		}else{
			$('.password_tip').html();
		}
		// $.getJSON('../api/register.php',{'phone':phone,'nickname':nickname,'password':password,},function(data){
		// 	console.log(data);
		// }) ;// type:’get’, dataType:’json’
		$.ajax({
			url:'../api/register.php',
			data:{phone:phone,nickname:nickname,password:password},
			success:function(data){
				console.log(data);
				if(data==='ok'){
					$('#shade').show();
				}else{
					$('.phone_tip').html('手机号码已被注册').css({color:'#ff5722'});
				}
			}
		});
		$('#phone')[0].value='';
		$('#nickname')[0].value='';
		$('#password')[0].value='';

	});
	$('#shade').hide();
	$('#shade span').click(function(){
		$('#shade').hide();
	})
});