define(['jquery'],function($){
	return {
		
		/**
		 * [获取随机颜色]
		 * @return {String} [颜色16进制]
		 */
		randomColor:function (){
			var str = '0123456789abcdef';

			var res = '#';
			for(var i=0;i<6;i++){
				var idx = Math.floor(Math.random()*str.length);
				res += str[idx];
			}
			return res;
		},
		// randomColor();//'#ff0000'

		/*
			增：Cookie.set()
			删：Cookie.remove()
			查：Cookie.get()
			改：Cookie.set()
		 */
		cookie:function(){

			var Cookie = {
				/**
				 * [获取cookie]
				 * @param  {String} name [cookie名]
				 * @return {String}      [cookie名对应的值]
				 */
				get:function(name){
					var res = '';
					var cookies = document.cookie;
					if(cookies.length>0){
						cookies = cookies.split('; ');
						cookies.forEach(function(cookie){
							var temp = cookie.split('=');
							if(temp[0] === name){
								res = temp[1];
							}
						})
					}
					return res;
				},

				/**
				 * [设置cookie]
				 * @param {String} name  [cookie名]
				 * @param {String} value [cookie值]
				 * @param {[Object]} opt   [cookie参数：exipres,path,domain]
				 */
				set:function(name,value,opt){
					var cookieStr = name + '=' + value;
					if(opt !== undefined){
						for(var attr in opt){
							cookieStr += ';'+attr + '=' + opt[attr]
						}
					}

					document.cookie = cookieStr;
				},

				// 删除cookie
				remove:function(name){
					var date = new Date();
					date.setDate(date.getDate()-10);
					// document.cookie = name + '=x;expires=' + date.toUTCString();
					this.set(name,'x',{expires:date.toUTCString()});
				}
			}
		},
		// JSON.parse(Cookie.get('carlist'));//[{},{}]
		// Cookie.set('carlist',val,{expires:date.toUTCString(),path:'/'});//[{},{}]
		// Cookie.remove('carlist')

		headAndFoot:function (){
			// 生成头部导航栏和尾部
			console.log(666);
			$('#minNav').load('../html/headAndFoot.html #minNav .container');
		    // $('#nav').load('../html/headAndFoot.html #nav .container');
		    $('#footer').load('../html/headAndFoot.html #footer .container');
		    $('.gotop').load('../html/headAndFoot.html #gotop');
		},
	
		
		// ***********************************实时显示购物车的商品情况*******************
		showGoods:function (){
		    var carlist = [];
		    var cookies = document.cookie;
		    //从cookie中获取carlist(数组变量，其中元素为单项商品信息)
		    if (cookies.length > 0) {
		        cookies = cookies.split('; ');
		        cookies.forEach(function (cookie) {
		            var temp = cookie.split('=');
		            if (temp[0] === 'carlist') {
		                carlist = JSON.parse(temp[1]);
		            }
		        });
		    }
		    // 利用cookie中的数据生成html结构
			function render(){
		        // var top_r=document.getElementsByClassName("top_r")[0];
		        var top_r=document.querySelector('.box1 ul');
		   
		        var topcar=top_r.querySelector('.buycar');
		        var ta2=document.querySelector('.li2');
		        // 获得页面上显示商品数量的标签
		        var count=ta2.querySelector('.count');
		        var span=ta2.querySelector('.money');
		        // 计算总价
		        var totalPrice = 0;
		        var num=0;
		        var ul = document.createElement('ul');
		        ul.innerHTML = carlist.map(function(item){
		            totalPrice += item.goods_price2 * item.num;
		            num+=Number(item.num);
		            return `<li>
		                <img class='copyimgs' src=${item.imgurl}>
		                <a href="#">${item.name}<br>
		                ${item.goods_size}&nbsp &nbsp ${item.goods_color}<br>
		                <span>${item.goods_price2}&times
		                ${item.num}</span>
		                </a>
		            </li>`;
		        }).join('');

		        // 添加前先清空
		        topcar.innerHTML = '';
		        topcar.appendChild(ul);

		        // 把总价写入页面
		        span.innerHTML = '$'+totalPrice;
		        // 将商品总数量写入页面
		        count.innerHTML=num;
		    }
		    render();//进入页面，写入cookie
		}
	}
});