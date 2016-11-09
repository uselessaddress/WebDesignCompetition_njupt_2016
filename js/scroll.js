
// 转换为数字
function intval(v)
{
	v = parseInt(v);
	return isNaN(v) ? 0 : v;
}
 
// 获取元素信息
function getPos(e)
{
	var l = 0;
	var t  = 0;
	var w = intval(e.style.width);
	var h = intval(e.style.height);
	var wb = e.offsetWidth;  //自身属性
	var hb = e.offsetHeight;
	while (e.offsetParent){
		l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
		t += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
		e = e.offsetParent;
	}
	l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
	t += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
	return {x:l, y:t, w:w, h:h, wb:wb, hb:hb};
}
 
// 获取滚动条信息
function getScroll() 
{
	var t, l, w, h;
	
	if (document.documentElement && document.documentElement.scrollTop) {
		t = document.documentElement.scrollTop;
		l = document.documentElement.scrollLeft;
		w = document.documentElement.scrollWidth;
		h = document.documentElement.scrollHeight;
	} else if (document.body) {
		t = document.body.scrollTop;
		l = document.body.scrollLeft;
		w = document.body.scrollWidth;
		h = document.body.scrollHeight;
	}
	return { t: t, l: l, w: w, h: h };
}
 
// 锚点(Anchor)间平滑跳转
function scroller(el, duration)
{
	if(typeof el != 'object') { el = document.getElementById(el); }
 
	if(!el) return;
 
	var z = this;
	z.el = el;
	z.p = getPos(el);
	z.s = getScroll();
	z.clear = function(){
		window.clearInterval(z.timer);
		z.timer=null
	};
	z.t=(new Date).getTime();

	z.step = function(){
		var t = (new Date).getTime();
		var p = (t - z.t) / duration;
		if (t >= duration + z.t) {
			z.clear();
			window.setTimeout(function(){z.scroll(z.p.y, z.p.x)},2);
		} else {
			st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t;
			sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l;
			z.scroll(st, sl);
		}
	};
	z.scroll = function (t, l){window.scrollTo(l, t)};
	z.timer = window.setInterval(function(){z.step();},2);
}


document.body.onmousewheel = function() {
	console.log(document.body.scrollTop);
	e =  window.event;
	if(e.wheelDelta<0){
		if(document.body.scrollTop>=0 && document.body.scrollTop<600){
			scroller(second, 1000);
		}
		else if(document.body.scrollTop>=600 && document.body.scrollTop<1270){
            scroller(third, 1000);
		}
	}
	if(e.wheelDelta>0){
		if(document.body.scrollTop>=600 && document.body.scrollTop<1270){
		 	scroller(first, 1000);
		}
		if(document.body.scrollTop>=1270 && document.body.scrollTop<1500){
			scroller(second, 1000);
		}
	}
}


