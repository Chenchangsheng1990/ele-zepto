function calSize(){
	//动态计算根元素的字体大小（根据不同屏幕的宽度尺寸）
	//获取我们对应机型的屏幕的宽度
	var clientWidth = window.innerWidth||document.documentElement.clientWidth;

	var Htmlsize = clientWidth/(320/20); //拿到不同机型的对应根元素字体大小

	//设置根元素字体大小
	document.documentElement.style.fontSize = Htmlsize + 'px';
	 	
}

calSize();

window.addEventListener('resize', calSize)
