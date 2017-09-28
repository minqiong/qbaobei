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
	$('#minNav').html(com.headAndFoot());
	// $('#minNav').css({background:com.randomColor()});
});