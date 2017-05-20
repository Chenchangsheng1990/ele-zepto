var rlistModule = Object.create(addressModule);
//重载
//后一个对象会覆盖前一个对象属性和方法
rlistModule = $.extend(rlistModule,{
	name:'商家列表页模板',
	dom: $("#rlist"),
	bindEvent: function(){
		//监听滚动事件
		var me = this;
		window.addEventListener('scroll', debounce( function(event){
			console.log('我正在进行滚动');

			//怎么判断 页面滑动了最底部
			if(window.scrollY + window.innerHeight === me.dom.height()) {
				console.log('此时页面滑动了最底部');
				me.loadList(me.hash)
			}
		}));


		var li_list = $("#position li");
		//调用轮播图的初始化方法
		Swipe(document.getElementById('mySwipe'), {
		  auto: false,
		  callback: function(pos) {
		  	//当滑动结束后 所需要执行的方法
		  	console.log(pos); //pos当前滑动板块的索引值
		  	li_list.eq(pos).addClass('cur');
		  	li_list.eq(pos).siblings().removeClass('cur');
		  }
		});
		var start = null;
		this.dom.on('touchstart', function(event){
				console.log('滑动开始', event); 
				start = event.changedTouches[0].pageX;	
		})
		this.dom.on('touchmove', function(event){
				console.log('正在滑动'); 	
		})
		this.dom.on('touchend', function(event){
				console.log('滑动结束'); 
				console.log(event.changedTouches[0].pageX - start);	
		})
	},
	initCount: 0,
	reset: function(){
		//重置
		$(".pro-list").html('');
		this.initCount = 0;
		this.dom.removeClass('noData');		 	
	},
	loadList:function(hash,flag){
		this.hash = hash;
		if(flag){
			this.reset();//重置操作
		}
		var me = this;
		var lat = hash.split('-')[1];
		var lng = hash.split('-')[2];
	//加载商家列表
	$.ajax({
		url:'/shopping/restaurants',
		data:{
			latitude:lat,
			longitude:lng,
			offset:this.initCount,
			limit:20,
			extras:['activities'],
			terminal:'h5'
		},
		success: function(res){
			if(res.length === 0){
				me.dom.addClass("noData");
			}
			me.initCount +=20;
			var html = "";
			console.log(res[0].id);
			for(var i=0;i<res.length;i++){
				html+= '<div class="seller"><div class="pic"><a href="#detail-' + res[i].id + '-' + res[i].latitude + '-' + res[i].longitude + '"><img src="https://fuss10.elemecdn.com/' + res[i].image_path.substring(0,1) + '/' + res[i].image_path.substring(1,3) + '/' + res[i].image_path.substring(3)+ '.' + res[i].image_path.substring(32) +'"></a></div><div class="cont-txt"><h4><a href="#detail-' + res[i].id + '-' + res[i].latitude + '-' + res[i].longitude + '">' + res[i].name + '</a></h4><p class="pf">评分：' + res[i].rating + '</p><p class="ps">￥'+ res[i].piecewise_agent_fee.rules[0].price + '起送/' + res[i].piecewise_agent_fee.tips + '</p></div><div class="sj"></div></div>'; 
			}
			$(".pro-list").append(html);

		}
	})	
	}
})
