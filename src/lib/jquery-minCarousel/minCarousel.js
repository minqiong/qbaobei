;(function($){
	$.prototype.minCarousel=function(options){
		var defaults={
			width:224,
			height:288,
			// 时间间隔
			duration:3000,
			// 是否自动播放
			autoPlay:true,
			index:0,
			// 播放类型
			type:'vertical' ,    //horizontal/fade/幻灯片
			// 是否显示分页
			showBtn:true, 
			smallImg:true,  
			// 是否无缝滚动
			seamless:false
		}
		this.each(function(){
			var $this=$(this);
			var opt=$.extend({},defaults,options);
			var carousel={
				init:function(){
					// 设置轮播图大小
					$this.css({
						width:opt.width,
						height:opt.height
					})
					// 生成html结构
					$('<ul/>').addClass('bigImg').html(opt.imgs.map(function(item){
						return `<li><img src="${item}"/></li>`;
					}).join('')).appendTo($this);
					// 是否无缝滚动
					if(opt.seamless===true){
						$('.bigImg').children().first().clone().appendTo($('.bigImg'));
					}
					// 获取li元素的长度
					var len=$('.bigImg li').length; 

					// 水平播放初始动画值
					if(opt.type==='horizontal'){
						$('.bigImg').addClass('left').width(len*opt.width+'px');
						// this.start();
					}
					// 淡入淡出
					else if(opt.type==='fade'){
						$('.bigImg').addClass('fade');
						// this.start();
					}
					// 显示分页小按钮或分页小图片
					if(opt.showBtn===true){
						// 如果是无缝滚动则不循环最后一个
						len=opt.seamless===true?len-1:len;
						// 生成按钮小分页
						var $pageUl=$('<ul/>');
						for(var i=0;i<len;i++){
							var $li=$('<li/>');
							$li[0].innerText=i;
							if(i===opt.index){
								$li.addClass('active');
							}
							$pageUl.append($li);
						}
						$pageUl.addClass('smallBtn').appendTo($this);
					}
					// 生成小图
					if(opt.smallImg===true){
						var $res=$('.bigImg').clone();
						$res.removeClass('bigImg left').addClass('smallImg').width('200px').appendTo($('.smallImgBox'));
						// 无缝滚动删除最后一个li
						if(opt.seamless===true){
							$('.smallImg li').last().remove();
						}
						// 默认显示第一个高亮
						$('.smallImg li').eq(opt.index).addClass('bor');
					}
					// 点击小图或分页时调到相应的大图
					$this.on('mouseenter','.smallBtn li',function(){
						opt.index=$(this).index();
						carousel.move();
					});
					$('.smallImgBox').on('mouseenter','.smallImg li',function(){
						opt.index=$(this).index();
						carousel.move();
					});
					// 鼠标移上去时创建
					$this.mouseenter(function(){
						// 添加前后点击按钮
						$('<span/>').html('&lt;').appendTo($this).addClass('prev').click(function(){
							opt.index--;
							carousel.move();
						});
						$('<span/>').html('&gt;').appendTo($this).addClass('next').click(function(){
							opt.index++;
							carousel.move();
						});
					}).mouseleave(function(){
						$('this span').remove();
					});
					// 鼠标悬停是停止动画，松开时继续
					$this.mouseenter(function(){
						carousel.stop();
					}).mouseleave(function(){
						opt.autoPlay===true?carousel.start():carousel.move();
					});
					// 判断是否自动播放
					opt.autoPlay===true?this.start():this.move();
				},
				move:function(){
					var $len=$('.bigImg li').length;
					if(opt.index>=$len){
						opt.index=0;
					}
					// 无缝滚动时设置index值
					if(opt.seamless===true&&opt.index>=$len||opt.index<=0){
						opt.index=1;
						$('.bigImg').css({left:0,top:0});
					}

					// 判断动画类型
					if(opt.type==='vertical'){
						$('.bigImg').animate({top:-opt.index*opt.height});
					}else if(opt.type==='horizontal'){
						$('.bigImg').animate({left:-opt.index*opt.width});
					}else if(opt.type==='fade'){
						$('.bigImg li').eq(opt.index).animate({opacity:1}).siblings().animate({opacity:0});
					}
					// 分页显示高亮
					if(opt.showBtn===true){
						$('.smallBtn li').eq(opt.index).addClass('active').siblings().removeClass('active');
					}
					if(opt.smallImg===true){
						$('.smallImg li').eq(opt.index).addClass('bor').siblings().removeClass('bor');
					}
				},
				stop:function(){
					clearInterval(opt.timer);
				},
				start:function(){
					clearInterval(opt.timer);
					opt.timer=setInterval(function(){
						opt.index++;
						this.move();
					}.bind(this),opt.duration);
				}
			}
			carousel.init();
		});
		return this;
	}
})(jQuery);