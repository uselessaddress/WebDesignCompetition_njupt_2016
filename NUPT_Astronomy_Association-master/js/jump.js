var block_top = false;
var block_jump = false;

function to_top() { //跳转回顶部
	if(block_top == false)
	{
		$('.hd').removeAttr('style');
		$('.hd').eq(0).css('color', 'white');
		$('.hd').eq(0).css('text-shadow', '0px 0px 5px rgba(255,255,255,1)');
		x = document.body.scrollTop;
		rocket = document.getElementById('rocket');
		if (x == 0) {
			return;
		}
		block_jump = true;
		block_top = true;
		start = 0, during = Math.floor(40 * x / document.documentElement.clientHeight);
		tween_to_top = function() {
			start++;
			document.body.scrollTop = Tween.Quart.easeInOut(start, x, -x, during);
			if (start < during)
				requestAnimationFrame(tween_to_top);
			if (start == during) {
				rocket.style.cssText = "display: none";
				block_jump = false;
				block_top = false;
				block_page = false;
				cur_page = 0;
			}
		};
		tween_to_top();
	}
}

function getindex(arr, val){
	for(var i = 0; i < arr.length; i++){
		if(arr[i] == val)
			return i;
	}
	return -1;
}

function jump(obj) {
	if(block_jump == false){
		idx = getindex(pages, obj);
		$('.hd').removeAttr('style');
		$('.hd').eq(idx).css('color', 'white');
		$('.hd').eq(idx).css('text-shadow', '0px 0px 5px rgba(255,255,255,1)');
		object = document.getElementById(obj);
		x = document.body.scrollTop;
		to = object.offsetTop;
		if(Math.abs(x - to) < 1)
			return;
		start = 0, during = Math.floor(40 * Math.abs(to - x) / document.documentElement.clientHeight);
		block_top = true;
		block_jump = true;
		cur_page = getindex(pages, obj);
		jump_to = function() {
			start++;
			document.body.scrollTop = Tween.Quart.easeInOut(start, x, to - x, during);
			if (start <= during) {
				requestAnimationFrame(jump_to);
			}else{
				block_top = false;
				block_jump = false;
				block_page = false;		
			}
		};
		jump_to();
	}
}