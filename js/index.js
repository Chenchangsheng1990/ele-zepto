//监听hash值的变化
/*function init(){
	var hash = location.hash || "#address";
	var dom = $(hash);
	dom.show();
	dom.siblings().hide();
}

window.onhashchange = function(){
	init();
}*/

var HashModuleMap = {
	'address': addressModule,
	'detail': detailModule,
	'rlist': rlistModule,
	'search':searchModule
}
var ModuleCache = {
	//判断模块是否被初始化
}

var prevModule = null; //前一个模块
var currentModule = null; //当前模块

function routeControl(){
	//路由控制
	var khash = "";
	var hash = location.hash.slice(1) || 'address';
	khash = hash;
	if(hash.indexOf("rlist") !== -1){
		khash = "rlist";
		rlistModule.loadList(hash,true);
	}
	
	if(hash.indexOf('detail') !== -1) {
		khash = 'detail';
		detailModule.loadInfo(hash);
	}

	var module = HashModuleMap[khash]; //动态获取对象的属性
	prevModule = currentModule;
	currentModule = module;
	if(prevModule) {
		//如果前一个模块存在， 要将其隐藏掉
		prevModule.leave();
	}

	module.enter();
	if(!ModuleCache[khash]){
		module.init();
		ModuleCache[khash] = true;
	}
	
}
routeControl();
//可扩展性、可维护性、可读性都得到明显的提高
window.onhashchange = function(){
	routeControl(); 	
}

$(".det-nav a").on("click",function(event){
	$(this).addClass("cccc");
	$(this).siblings().removeClass("cccc");
})
