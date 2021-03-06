require.config({
	paths:{
		jquery:'../lib/jquery-3.2.1.min',
		mincar:'../lib/jquery-minCarousel/minCarousel',
        common:'common'
	},
	shim:{
		common:['jquery'],
		mincar:['jquery']
	}
});
require(['jquery','mincar','common'],function($,min,com){
    // 7天免登录
    // 进入页面判断是否有cookie或者路径有传递参数
    var cookies = document.cookie;
    var url=location.search;
    if(cookies.length>0){
        cookies = cookies.split('; ');
        cookies.forEach(function(cookies){
            var temp = cookies.split('=');
            if(temp[0] === 'phone'){
                changeStatus(temp[1]);
            }
        });
    }else if(url!==''){
        // url解码
        url=decodeURI(url);   
        url=url.slice(1).split('=');
        // url=url;
        $('.userLogin').html(url[1]+' <span class="exit">退出</span>');
        // console.log(url[1]);
    }
    $('.exit').click(function(){
        changeStatus();
    });

    function changeStatus(phone){
        // console.log(phone);
        // @登录
        // 显示登录信息
        // 隐藏登录框
        if(phone){
            $('.userLogin').html(phone+' <span class="exit">退出</span>');
        }

        // @退出
        // 显示表单
        // 隐藏登录信息
        // 清除cookie
        else{
            $('.userLogin').html('登录');
            
            // 利用设置过期时间达到删除的效果。
            var date = new Date();
            date.setDate(date.getDate()-7);
            document.cookie = 'phone=xx;expires=' + date.toString();
            document.cookie = 'password=xx;expires=' + date.toString();
        }
    }


	// 吸顶菜单
	window.onscroll=function(){
        // window.scrollY>=600?$('#gotop').show():$('#gotop').hide();
        
		if(window.scrollY>=40){
			$('#minNav').css({
				position:'fixed',
				top:0,
				left:0,
				zIndex:100
			});
		}else{
			$('#minNav').removeAttr('style');
		}
	}
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


    $('.main_1').each(function(){
        // 怀孕模块tal标签切换动画
        // 默认给第一个tab li加样式
        // 左边
        $(this).find('.main_1_ll li').first().addClass('active');
        $('.main_1_ul').width($('.main_1_tab1').width()*4);
        // 事件委托
        $(this).on('click','.main_1_ll li,.main_1_rt li,.btn_prev,.btn_next',function(){
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().next().find('.main_1_ul').animate({left:-$(this).index()*$('.main_1_tab1').width()});
        
            $(this).parent().next().find('.main_1_rb_box').animate({left:-$('.main_1_rb_box ul').width()*$(this).index()});
        });
        // 右边
        $('.main_1_rt li').first().addClass('active');
        $('.main_1_rb_box').width($('.main_1_rb_box ul').width()*2)
        
        // 工具部分动画
        var $dl_width=$('.rb_dl dl dd').width();
        $('.rb_dl dl').width($dl_width*6);
        var $dl_index=0;
        $(this).on('click','.btn_prev,.btn_next',function(){
        	this.className==='btn_prev active'?$dl_index++:$dl_index--;
        	$(this).parent().find('dl').animate({left:3*$dl_width*$dl_index});
        });
    });
    
    // 排行榜动画main_5
    $('.main_5top li').eq(0).addClass('active');
    $('.main_5top li').mouseenter(function(){
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
    // console.log(666);
    // 生成动画小圆点
    var _7ul=$('<ul/>').addClass('ban_btn');
    for(var i=0;i<$('.ban_part').length-1;i++){
        $('<li/>').html(i).appendTo(_7ul);
    }

    _7ul.appendTo($('.main_7_img_ban'));
    var _7index=0;
    // 默认第一个li加样式
    $('.ban_btn li').first().addClass('active');
    clearInterval(_7timer);
    var _7timer=setInterval(function(){
        console.log(666);
    	_7index++;
    	if(_7index>=$('.ban_part').length){
    		_7index=0;
    		$('.ban_box').css({left:0});
    	}
        if(_7index>=$('.ban_part').length-1){
            $('.ban_btn li').first().addClass('active').siblings().removeClass('active');
        }
	    showBan();
    },3000);
    // 鼠标放到小按钮后调到相应的页面
    $('.ban_btn li').mouseenter(function(){
    	_7index=$(this).index();
    	showBan()
    });
    clearInterval(_7timer);
   	$('.ban_part').mouseenter(function(){
   	    clearInterval(_7timer);
   	}).mouseleave(function(){
   		_7timer=setInterval(function(){
	    	_7index++;
	    	if(_7index>=$('.ban_part').length){
	    		_7index=0;
	    		$('.ban_box').css({left:0});
	    	}
            if(_7index>=$('.ban_part').length-1){
                $('.ban_btn li').first().addClass('active').siblings().removeClass('active');
            }
		    showBan();
	    },3000);
   	});
    function showBan(){
    	$('.ban_btn li').eq(_7index).addClass('active').siblings().removeClass('active');
   		$('.ban_box').animate({left:-$('.ban_part').width()*_7index});
    }

//------------------------main_8-----------------------------------
    // 百科部分tab标签切换
    $('.main_8 h2 li').first().addClass('active').find('i').addClass('point');
    $('.main_8_tab1').eq(0).show().siblings().hide();
    $('.main_8 h2 li').click(function(){
    	$('.main_8 h2 li').find('i').removeClass('point');
    	$(this).addClass('active').siblings().removeClass('active');
    	$(this).find('i').addClass('point');
    	$('.main_8_tab1').eq($(this).index()).show().siblings().hide();
    });
    // 最新内容部分tab标签切换
    $('.main_9 h2 li').first().addClass('active').find('i').addClass('point');
    $('.main_9_tab1').eq(0).show().siblings().hide();
    $('.main_9 h2 li').click(function(){
    	$('.main_9 h2 li').find('i').removeClass('point');
    	$(this).addClass('active').siblings().removeClass('active');
    	$(this).find('i').addClass('point');
    	$('.main_9_tab1').eq($(this).index()).show().siblings().hide();
    });

/*---------------------main9部分-------------------------------*/
    // 请求数据
    $.ajax({
        url:'../api/index.php',
        success:function(data){
            var arr=JSON.parse(data);
            $.each(arr,function(idx,item){
                switch(item.title){
                    case '不孕不育':
                    case '生男生女':
                    case '孕前饮食':
                        $('<p><span>【'+this.title+'】</span>'+this.content+'<span>'+
                            this.answer+'个回答</span></p>').appendTo('.question_yun');
                        break;
                    case '婴儿健康':
                    case '婴儿营养':
                        $('<p><span>【'+this.title+'】</span>'+this.content+'<span>'+
                            this.answer+'个回答</span></p>').appendTo('.que_xin');
                        break;
                    case '家庭教育':
                        $('<p><span>【'+this.title+'】</span>'+this.content+'<span>'+
                            this.answer+'个回答</span></p>').appendTo('.que_jia');
                        break;
                    case '产后饮食':
                        $('<p><span>【'+this.title+'】</span>'+this.content+'<span>'+
                            this.answer+'个回答</span></p>').appendTo('.que_chan');
                        break;
                    case '怀孕':
                        $('<li><span>['+this.title+']</span><p>'+this.content+'</p><span>'+
                            this.settime+'</span></li>').appendTo('.huaiyun');
                        break;
                    case '育儿':
                        $('<li><span>['+this.title+']</span><p>'+this.content+'</p><span>'+
                            this.settime+'</span></li>').appendTo('.yuer');
                        break;
                    case '早教':
                        $('<li><span>['+this.title+']</span><p>'+this.content+'</p><span>'+
                            this.settime+'</span></li>').appendTo('.zaojiao');
                        break;

                }
            });
        }
    })

    // 点击跳转到详情页
    // console.log($('.main_1_tab1r').find('a'));
    $('.main_1 .title').click(function(e){
        // console.log($(this).text());
        var params=encodeURI($(this).text());
        location.href='../html/newsList.html?params='+params;
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
   	$('.prev,.next').hide();
    clearInterval(_9timer);
    $('.main_9_ban_box').mouseenter(function(){
    	clearInterval(_9timer);
    	$('.prev,.next').show();
	    $('.prev').click(function(){
	    	// clearInterval(_9timer);
			main_9_banPrev();	    	
	    });
	    $('.next').click(function(){
	    	// clearInterval(_9timer);
			main_9_banNext();	    	
	    });
    }).mouseleave(function(){
    	_9timer=setInterval(function(){
	    	main_9_banNext();
	    },3000);
    	$('.next,.prev').hide();
    });
});