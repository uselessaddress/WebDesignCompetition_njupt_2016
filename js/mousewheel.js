var pre_wheel;
var cur_wheel;

function load() {
	nav = document.getElementById("navbar")
	lb = document.getElementById("nav_lb")
	icon = document.getElementById("brand")
	pre_wheel = cur_wheel = document.body.scrollTop;
	if (cur_wheel != 0) {
		nav.style.cssText = "height: 8vh;background-color: #242244;"
		nav_lb.style.cssText = "padding-top: 3vh;"
		icon.style.cssText = "opacity: 1;"
	}
}

function scroll() {
	nav = document.getElementById("navbar")
	lb = document.getElementById("nav_lb")
	icon = document.getElementById("brand")
	cur_wheel = document.body.scrollTop;
	if(cur_wheel != 0 && pre_wheel == 0){
		nav.style.cssText = "animation: nav_shrink 1s forwards;"
		nav_lb.style.cssText = "animation: a_down 1s forwards;"
		icon.style.cssText = "animation: icon_in 1s forwards;"
	}
	else if(cur_wheel == 0 && pre_wheel != 0){
		nav.style.cssText = "animation: nav_expand 1s forwards;"
		nav_lb.style.cssText = "animation: a_up 1s forwards;"
		icon.style.cssText = "animation: icon_out 1s forwards;"
	}
	pre_wheel = cur_wheel;
}