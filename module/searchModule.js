var searchModule = Object.create(addressModule);
//重载
searchModule = $.extend(searchModule,{
	name:'商家搜索页面',
	dom: $("#search")
})