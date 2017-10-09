require(['require-con'],function(){
	require(['jquery','common'],function($,com){
	    $('#minNav').load('../html/headAndFoot.html #minNav .container');
	    $('#logo').load('../html/headAndFoot.html #logo .container');
	    $('#footer').load('../html/headAndFoot.html #footer .container');

	    // 获取传递过来的参数
	    var url=location.search;
	    var str=decodeURI(url);
	    var title=str.slice('1').split('=');
	    $.ajax({
	    	url:'../api/detial.php',
	    	data:{title:title[1]},
	    	success:function(data){
	    		var str=JSON.parse(data);
	    		$.each(str,function(idx,item){
	    			console.log(item);
	    			$('<div><h2>'+item.con_title+'</h2><p><span>'+item.settime+'</span><span> 阅读次数：'
	    				+item.reading+'</span></p></div><div> 标签：'+item.label+'</div><div><img src="../'
	    				+item.imgurl+'"><p>'+item.con_content+'</p></div>').appendTo('.content');
	    			console.log(item.classify,$('.sec_nav li').text());
	    			$('.sec_nav li').each(function(idx,arr){
	    				console.log($(this).text());
	    				if(item.classify===$(arr).text()){
	    					console.log(666);
	    					console.log(this);
	    					$(this).addClass('active').find('i').addClass('point');
	    				}
	    			});

	    		});
	    	}
	    });
	});
});