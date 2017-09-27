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
   		$(this).addClass('active').find('.thirdNav').show();
   		$(this).find('h4 i').addClass('active');
   	}).mouseleave(function(){
   		$(this).removeClass('active').find('.thirdNav').hide();
   		$(this).find('h4 i').removeClass('active');
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
    $('.main_con_ul').width($('.main_con_tab1').width()*4);
    $('.main_con_ll li').click(function(){
    	$('.main_con_ll li').eq($(this).index()).addClass('active').siblings().removeClass('active');
    	$('.main_con_ul').animate({left:-$(this).index()*$('.main_con_tab1').width()});
    });
    // 右边
    $('.main_con_rt li').first().addClass('active');
    $('.main_1_rb_box').width($('.main_1_rb_box ul').width()*2)
    $('.main_con_rt li').click(function(){
    	$('.main_1_rb_box').animate({left:-$('.main_1_rb_box ul').width()*$(this).index()});
    	$('.main_con_rt li').eq($(this).index()).addClass('active').siblings().removeClass('active');
    });
    // 工具部分动画
    var $dl_width=$('.rb_dl dl dd').width();
    $('.rb_dl dl').width($dl_width*6);
    var $dl_index=0;
    $('.rb_dl').on('click','.btn_prev,.btn_next',function(){
    	this.className==='btn_prev'?$dl_index++:$dl_index--;
    	$('.rb_dl dl').animate({left:3*$dl_width*$dl_index});
    });
    
    // 排行榜动画main_5
    $('.main_5top li').eq(0).addClass('active');
    $('.main_5top li').mouseenter(function(){
    	console.log($(this).index());
    	$(this).addClass('active').siblings().removeClass('active');
    });
    // main_6
    $('.main_6top li').eq(0).addClass('active');
    $('.main_6top li').mouseenter(function(){
    	$(this).addClass('active').siblings().removeClass('active');
    });
//------------------------main_7--------------------------
    // 图库main_7动画
    // 轮播图片文字上滑
    $('.ban_part a').mouseenter(function(){
    	$(this).find('.state').animate({bottom:'10'});
    }).mouseleave(function(){
    	$(this).find('.state').animate({bottom:'-30'});
    });
    // 轮播图动画
    $('.ban_part').first().clone().appendTo($('.ban_box'));
    $('.ban_box').width($('.ban_part').width()*$('.ban_part').length);
	var _7ul=$('<ul/>').addClass('ban_btn');
	for(var i=0;i<$('.ban_part').length-1;i++){
		$('<li/>').html(i).appendTo(_7ul);
	}
	_7ul.appendTo($('.main_7_img_ban'));
    var _7index=0;
    $('.ban_btn li').first().addClass('active');
    clearInterval(_7timer);
    var _7timer=setInterval(function(){
    	_7index++;
    	if(_7index>=$('.ban_part').length){
    		_7index=0;
    		$('.ban_box').css({left:0});
    	}
	    showBan();
    },3000);
    $('.ban_btn li').mouseenter(function(){
    	_7index=$(this).index();
    	showBan()
    });
    function showBan(){
    	$('.ban_btn li').eq(_7index).addClass('active').siblings().removeClass('active');
   		$('.ban_box').animate({left:-$('.ban_part').width()*_7index});
    }

//------------------------main_7-----------------------------------
    // 百科部分tab标签切换
    $('.main_8 h3 li').first().addClass('active').find('i').addClass('point');
    $('.main_8_tab1').eq(0).show().siblings().hide();
    $('.main_8 h3 li').click(function(){
    	$('.main_8 h3 li').find('i').removeClass('point');
    	$(this).addClass('active').siblings().removeClass('active');
    	$(this).find('i').addClass('point');
    	$('.main_8_tab1').eq($(this).index()).show().siblings().hide();
    });
    // 最新内容部分tab标签切换
    $('.main_9 h3 li').first().addClass('active').find('i').addClass('point');
    $('.main_9_tab1').eq(0).show().siblings().hide();
    $('.main_9 h3 li').click(function(){
    	$('.main_9 h3 li').find('i').removeClass('point');
    	$(this).addClass('active').siblings().removeClass('active');
    	$(this).find('i').addClass('point');
    	$('.main_9_tab1').eq($(this).index()).show().siblings().hide();
    });
    // main_9部分动画轮播
    var $9_ban_liWidth=$('.main_9_ban ul li').width();
    clearInterval(_9timer);
    var _9timer=setInterval(function(){
    	main_9_banNext();
    },3000);
    function main_9_banNext(){
	    $('.main_9_ban ul').animate({left:-$9_ban_liWidth},function(){
	    	var $cloneLi=$('.main_9_ban ul li').first().clone();
	    	$('.main_9_ban ul li').first().remove();
	    	$('.main_9_ban ul').append($cloneLi);
	    	$('.main_9_ban ul').css({left:0});
	    });
    }
    function main_9_banPrev(){
	    var $cloneLi=$('.main_9_ban ul li').last().clone();
	    $('.main_9_ban ul li').last().remove();
    	$('.main_9_ban ul').animate({left:$9_ban_liWidth},function(){
	    	$cloneLi.insertBefore($('.main_9_ban ul li').first());
	    	$('.main_9_ban ul').css({left:0});
	    });
    }
    $('.main_9_ban').mouseenter(function(){
    	clearInterval(_9timer);
    	$('.prev,.next').show();
	    $('.main_9').on('click','.prev,.next',function(){
	    	clearInterval(_9timer);
			main_9_banNext();
	    	
	    });
    }).mouseleave(function(){
    	_9timer=setInterval(function(){
	    	main_9_banNext();
	    },3000);
    	$('.next,.prev').hide();
    });
});