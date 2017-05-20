//防抖动
function debounce(func,wait){
	var timeId = null;
	return function(){
		var arg = arguments;
		var later = function(){
			func.apply(null,arg);//func();
		}
		clearTimeout(timeId);
		timeId = setTimeout(function(){
			later();
		},wait || 300);
	}
}


var addressModule = {
	name: '地址搜索页模块',
	dom: $("#address"),
	init: function(){
		//该模块初始化方法	 
		this.bindEvent();	
	},
	loadList: function(event){
		var txt = $("#addtxt").val();
		$.ajax({
				url:"/bgs/poi/search_poi_nearby",
				type: "get",
				data:{
					keyword:txt,
					offset:0,
					limit:20
				},
				success: function(res){					
					var html = "";
					for(var i = 0;i<res.length;i++){
						html +='<div class="add-list"><h3><a href="#rlist-'+ res[i].latitude+'-'+res[i].longitude + '">' + res[i].name + '</a></h3><p>' + res[i].short_address + '</p></div>';
					}
					$(".content-txt").html(html);
				},
				error: function(){
					console.log("失败了...");
				}
			})
	},
	bindEvent: function(){
		//事件绑定	
		var me = this
		$("#addtxt").on("input",debounce(function(event){
			
			me.loadList(event);
		}))
/*		$("#addtxt").on("input",debounce(function(event){})
		 function(){
			var txt = this.value;
			
		}
		);*/
/*		$("#addtxt").on("keyup",function(){
			$.ajax({
				url: '/waimai?qt=poisug&wd=%E7%A7%91%E5%8D%8E&cb=suggestion_1491961133008&cid=75&b=&type=0&newmap=1&ie=utf-8',
				type: 'get',
				dataType: "json",
				success: function(res){
					console.log(res);
					var str = "";
					for(var i = 0; i < res.s.length; i++)	{
						str += '<li>'+res.s[i];+'</li>'
					}
					$("#list").html(str);
				},
				error: function(){
					console.log('error');	 	
				}
			}) 	
		})*/ 	
	
	},
	enter: function(){
		this.dom.show();	
		//console.log('360度旋转'); 	
	},
	leave: function(){
		this.dom.hide();
	}
}
