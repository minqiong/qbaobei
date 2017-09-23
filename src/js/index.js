require.config({
	paths:{
		jquery:'../lib/jquery-3.2.1.min',
		mincar:'../lib/jquery-minCarousel/minCarousel'
	},
	shim:{
		common:['jquery'],
		mincar:['jquery']
	}
});
require(['jquery','mincar','common'],function($,min){
	// **********************************导航栏的动画************************************
    // 返回顶部按钮
    $('#gotop').click(function(){
        $(window).scrollTop(0);
    });
    // 导航条显示与隐藏
   	$('.secondNav').mouseenter(function(){
   		$(this).addClass('active').find('.thirdNav').css({display:'block'});
   	}).mouseleave(function(){
   		$(this).removeClass('active').find('.thirdNav').css({display:'none'});
   	});
   	// 轮播图展示
   	$('.minCarousel').minCarousel({
        width:'810',
        height:'410',
        type:'horizontal',
        showPage:'smallBtn',
        seamless:true,
        imgs:['img/banner1.png','img/banner2.png','img/banner3.png','img/banner4.png']
    });
    // 孕期折叠菜单
    $('.fold').mouseenter(function(){
    	$(this).animate({width:79}).css({backgroundColor:'#fa4e68'}).find('a').css({color:'#fff'});
    }).mouseleave(function(){
    	$(this).animate({width:13}).removeAttr('style').find('a').css({color:'#ffebeb'});
    });
});