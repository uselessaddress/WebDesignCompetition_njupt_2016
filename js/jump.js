function jump(from, to){
	var start = 0, during = 100;
	wheelup = false;
	var _run = function(){
		start ++;
		var top = Tween.Quad.easeInOut(start, document.body.scrollTop, to*document.body.clientHeight - document.body.scrollTop, during);
		document.body.scrollTop = top;
		if (start < during && wheelup == false) {
			console.log("运行了")
			requestAnimationFrame(_run);
		}
	}
	_run();
}