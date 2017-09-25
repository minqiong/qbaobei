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
    // 怀孕模块tal标签切换动画
    // 默认给第一个tab li加样式
    // 左边
    $('.main_con_ll li').first().addClass('active');
    $('.main_con_ll li').click(function(){
    	$('.main_con_ll li').eq($(this).index()).addClass('active').siblings().removeClass('active');
    	$('.main_1_tab1').eq($(this).index()).animate({opacity:1,left:0}).siblings().animate({opacity:0,left:'100%'});
    	console.log($(this).index());
    });
    // 右边
    $('.main_con_rt li').first().addClass('active');
    $('.main_1_rb_box').width($('.main_1_rb_box ul').width()*2)
    $('.main_con_rt li').click(function(){
    	$('.main_1_rb_box').animate({left:-$('.main_1_rb_box ul').width()*$(this).index()});
    	$('.main_con_rt li').eq($(this).index()).addClass('active').siblings().removeClass('active');
    });
    // 工具部分动画
    var $dl_len=$('.rb_dl').find('dd').length;
    var $dl_width=$('.rb_dl dl dd').width();
    $('.rb_dl dl').width($dl_width*$dl_len);
    var $dl_index=0;
    $('.rb_dl').on('click','.btn_prev,.btn_next',function(){
    	this.className==='btn_prev'?$dl_index++:$dl_index--;
    	$('.rb_dl dl').animate({left:$dl_len/2*$dl_width*$dl_index});
    })
    // $('.rb_dl .btn_prev').click(function(){
    // 	$dl_index++;
    // 	console.log($dl_index)
    // 	$('.rb_dl dl').animate({left:$dl_len/2*$dl_width*$dl_index});
    // });
    // $('.rb_dl .btn_next').click(function(){
    // 	$dl_index--;
    // 	$('.rb_dl dl').animate({left:$dl_len/2*$dl_width*$dl_index});
    // });
    // 排行榜动画
    $('.main_5top li').eq(0).find('p').first().css({display:'none'}).next().addClass('active');
    $('.main_5top li').mouseenter(function(){
    	console.log($(this).index());
    	$(this).eq($(this).index()).find('p').first().css({display:'none'}).next().addClass('active').siblings().find('p').first().css({display:'block'}).next().removeClass('active');
    });
});