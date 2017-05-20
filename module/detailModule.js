var detailModule = Object.create(addressModule);
//重载
detailModule = $.extend(detailModule,{
	name:'食物详情页模板',
	dom: $("#detail"),
	bindEvent:function(){
		$('.cont-nav').on('click', 'li', function(event){
			$(this).addClass('nav-ys'); 
			$(this).siblings().removeClass('nav-ys');	
		    var selector = "[data-title='"+ $(this).text() +"']";
			var dom = $(selector).get(0);
			rightScroll.scrollToElement(dom, 1000);
		});
	},
	loadInfo:function(hash){
		//加载信息
		this.shopId = hash.split('-')[1];
		this.lat = hash.split('-')[2];
		this.lng = hash.split('-')[3];
		this.loadHeaderInfo(); //加载头部信息
		this.loadFoodInfo();//加载食物信息 
	},
	loadHeaderInfo: function(){
		$.ajax({
			url: 'shopping/restaurant/' + this.shopId,
			type:'get',
			data: {
				extras:['activities', 'album', 'identification', 'statistics'],
				latitude:this.lat,
				longitude:this.lng
			},
			success: function(res){
				console.log('请求成功', res);
				var imgs = res.image_path,
					imgs_P = "";
				if(imgs.indexOf("png") !== -1){
					imgs += ".png";
				}
				// console.log(imgs);
				 else{
				 	imgs +=".jpeg";
				 }
				imgs_P = `<a href="#"><img src="https://fuss10.elemecdn.com/${imgs}"/></a>`
				$(".m-pic").html(imgs_P);
				var html = "";
				html = `<h3 id="title_t"><a href="#">${res.name}</a></h3>
				<p style="margin-bottom:5px;">${res.delivery_mode.text}/${res.order_lead_time}分钟送达/满${res.float_minimum_order_amount}免配送费</p>
				<p style="overflow:hidden; height:0.6rem;">公告：${res.promotion_info}</p>`
				$(".m-cont").html(html);
				var gg = "";
				gg = `<div class="bot-ms"><i style="background:green; font-weight:bold; margin-right:0.2rem; corlor:${res.activities[0].icon_corlor};font-style:normal"> ${res.activities[0].icon_name}</i>${res.activities[0].tips}</div>
					<span>${res.activities.length}个活动</span>`
				$(".h-bot").html(gg);
			},
			error: function(){
				//alert('后端错误，后端哥哥')
			}
		})
	},
	loadFoodInfo: function(){
		var me = this;
		$.ajax({
			url: '/shopping/v2/menu?restaurant_id=' + this.shopId,
			type: 'get', 
			success: function(res){
				console.log('食物数据得到', res);
				var nav_list = "";
				var food_list = "";
				for(var i = 0; i<res.length; i++){
					//动态对坐标导航进行渲染
					nav_list += `<li><a href="javascript:;">${res[i].name}</a></li>`; 
				}
				$("#navlist").html(nav_list);
				//动态对食物进行相应的渲染
				for(var i = 0; i<res.length; i++){
				 food_list +=
				 	 '<div class="food-con">'+
						'<div class="f-title">'+
							'<h2 data-title="'+ res[i].name +'">'+ res[i].name +'</h2>'+
						'</div>'+
						me.renderFood(res[i].foods)+
				'</div>'
				}
				$(".cont-list").html(food_list);
				//此时石头渲染完成
				var left = new IScroll(".cont-nav",{
					scrollbars:true //要进行滚动条的展示
				})
				window.rightScroll = new IScroll(".cont-list",{
					scrollbars:true, //要进行滚动条的展示
					probeType:2//滚动条的灵敏度
				})
				var listItem = $(".food-con")//获取每个事物板块
				var leftNav = $(".cont-nav li");
				var heightList = [];
				var sum = 0;
				for(var i = 0;i < listItem.length;i++){
					sum += listItem.eq(i).height();
					heightList.push(sum);
				}
				console.log(heightList);
				rightScroll.on("scroll",function(){
					//获取到滚动的高度
					var offsetY = Math.abs(rightScroll.y);
					for(var i = 0;i<heightList.length;i++){
						if(offsetY<heightList[i]){
							leftNav.eq(i).addClass("nav-ys");
							leftNav.eq(i).siblings().removeClass("nav-ys");
							break;
						}
					}
				})
			}
		})
	},
	renderFood: function(data){
		var str = "";
		//console.log(data);
		for(var i =0; i < data.length; i++) {
			var imgs_a = data[i].image_path;
			// console.log(imgs_a);
				if(imgs_a.indexOf("png") !== -1){
					imgs_a += ".png";
				} else{
				 	imgs_a +=".jpeg";
				 };
			str += 
				`<div class="f-cont">
							<div class="food-pic">
							<a>
							<img src="https://fuss10.elemecdn.com/${imgs_a}"/>
							</a>
							</div>
							<div class="food-txt">
								<h4>${data[i].name}</h4>
								<p>月销售${data[i].month_sales}份/好评率${data[i].rating_count}%</p>
								<span class="pric"><b>￥${data[i].specfoods[0].price}</b>起</span>
								<div class="num-box">
									<span class="minus">-</span>
									<span class="num">0</span>
									<span class="plus">+</span>
								</div>	
							</div>
						</div>`
		}	

		return str; 
	}	
})