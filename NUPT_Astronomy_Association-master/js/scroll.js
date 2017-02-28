/**      scroll js       */
var wheel = {
	pre_wheel: 0, //前一个滚轮位置
	cur_wheel: 0, //当前滚轮位置
	wheelup: false, //滚轮是否向上
	wheeldown: false, //滚轮是否向下
	on_top: false, //滚轮是否到顶
	on_bottom: false //滚轮是否到底
}

pages = [
	"first",
	"second",
	"third",
	"fourth",
	"fifth",
];



block_page = false;
cur_page = 0;

function load() { //判断载入状态
	nav = document.getElementById("header") //获得id为header的对象
	rocket = document.getElementById("rocket");
	wheel.cur_wheel = wheel.pre_wheel = document.body.scrollTop; //载入的时候初始化滚轮的状态
	wheel.wheelup = wheel.wheeldown = false;
	if ($(window).scrollTop() == 0) {
		wheel.on_top = true;
	} else {
		wheel.on_top = false;
	}
	if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
		wheel.on_bottom = true;
	} else {
		wheel.on_bottom = false;
	}
	if (wheel.on_top == false) { //如果滚轮不在顶部
		nav.style.cssText = "height: 8vh;background-color: #242244;box-shadow: 2px 0 10px rgba(0,0,0,0.5);" //使用如下的样式
		rocket.style.cssText = "display: block;";
		rocket.style.opacity = 1;
	} else {
		rocket.style.cssText = "display: none;";
		rocket.style.opacity = 0;
	}
	cur_page = 0;
	for(var i = 0; i < pages.length; i++){
		if($('#' + pages[i]).offset().top <= $(window).scrollTop() + 1){
			cur_page = i;
		}
	}
	jump(pages[cur_page]);
}

function scroll() { //滚动的时候判断滚轮的状态
	wheel.cur_wheel = document.body.scrollTop;
	if (wheel.cur_wheel < wheel.pre_wheel) {
		wheel.wheelup = true;
		wheel.wheeldown = false;
	} else if (wheel.cur_wheel > wheel.pre_wheel) {
		wheel.wheelup = false;
		wheel.wheeldown = true;
	} else if(wheel.cur_wheel == wheel.pre_wheel) {
		wheel.wheelup = wheel.wheeldown = false;
	}
	if ($(window).scrollTop() == 0) {
		wheel.on_top = true;
	} else {
		wheel.on_top = false;
	}
	if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
		wheel.on_bottom = true;
	} else {
		wheel.on_bottom = false;
	}
	/*鼠标滚动函数接口*/
	navbar_transform();
	rocket_transform();
	//scroll_jump();//有问题请注释掉这行

	wheel.pre_wheel = wheel.cur_wheel;
}

function navbar_transform() {
	nav = document.getElementById("header");
	if (wheel.cur_wheel >= 20 && wheel.pre_wheel <= 20) {
		nav.style.cssText = "animation: nav_shrink 1s forwards;"; //播放收缩动画定格到最后
	} else if (wheel.cur_wheel <= 20 && wheel.pre_wheel >= 20) {
		nav.style.cssText = "animation: nav_expand 1s forwards;";
	}
}

function rocket_transform() {
	rocket = document.getElementById("rocket");
	if (wheel.cur_wheel >= 20 && wheel.pre_wheel <= 20) {
		rocket.style.cssText = "display: block;";
		rocket.style.cssText = "animation: rocket_in 1s forwards;";
	} else if (wheel.cur_wheel <= 20 && wheel.pre_wheel >= 20) {
		rocket.style.cssText = "display:block;";
		rocket.style.cssText = "animation: rocket_out 1s forwards;";
	}
	if (wheel.on_top) {
		rocket.style.cssText = "display: none";
		return;
	}
}

function scroll_jump(){
	if(block_page)
		return;
	if(wheel.on_top && wheel.wheelup || wheel.on_bottom && wheel.wheeldown)
		return;
	if (wheel.wheelup) {
		jump(pages[cur_page-1]);
	}
	else if(wheel.wheeldown){
		jump(pages[cur_page+1]);
	}
}