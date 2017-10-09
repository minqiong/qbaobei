require(['require-con'],function(){
	require(['jquery','common'],function($,com){
		// 加载头部和尾部
	    $('#minNav').load('../html/headAndFoot.html #minNav .container');
	    $('#logo').load('../html/headAndFoot.html #logo .container');
	    $('#footer').load('../html/headAndFoot.html #footer .container');


	    // var url=location.search;
	    // var str=decodeURI(url);
	    // var title=str.slice('1').split('=');
	    // console.log(title[1]);
	    var classify='备孕';
	    // 点击标题传递参数
	    function data(){
		    var p=new Promise(function(resolve,reject){
		    	$.ajax({
			    	url:'../api/newsList.php',
			    	data:{classify:classify},
			    	success:function(data){
			    		resolve(data);
			    	}
			    });
		    });
		    p.then(function(data){
	    		var arr=JSON.parse(data);
	    		$.each(arr,function(idx,item){
	    			$('<div data-title="'+item.con_title+'"><img src="../'
	    				+item.imgurl+'"><a href="#">'+item.con_title+'</a><p>'
	    				+item.con_content+'</p><p>标签：'+item.label+'</p></div>').appendTo('.content');
	    		});
	    		return $('.content');
		    }).then(function(ele){
		    	// 点击图片或标题是跳转
		    	ele.on('click','img,a',function(){
		    		var params=encodeURI($(this).parent().attr('data-title'));
		    		location.href='../html/detial.html?params='+params;
		    	});
		    });
	    }
	    data();
	    

	    $('.sec_nav li').first().addClass('active').find('i').addClass('point');
	    $('.sec_nav li').click(function(){
	    	console.log(this,$(this).text());
	    	$('.sec_nav li').removeClass('active').find('i').removeClass('point');
	    	$(this).addClass('active').find('i').addClass('point');
	    	// 点击时发送请求
	    	classify=$(this).text();
	    	// 清空并重新写入页面结构
	    	$('.content').html('');
	    	data();
	    });
	});
});