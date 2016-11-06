document.body.onmousewheel = function() {
	console.log(document.body.scrollTop);
	nav = document.getElementById("navbar");
	var tags = document.getElementsByTagName("*");
	var lis = new Array();
	var classNum = 0;
	for(var i in tags){
		if(tags[i].nodeType==1){
			if(tags[i].getAttribute("class") == "nav_a"){
				lis[classNum]=tags[i];
				classNum++; 
			}
		}
	} 
	if(document.body.scrollTop){
		nav.style.cssText = "width: 100%; height: 8vh;position: fixed;top: 0px;overflow: hidden; background-color: #2E2B56;"
		for(var i = 0; i < classNum; i++){
			lis[i].style.cssText = "display: block;margin-top: 14%;text-decoration: none;color: #818A91;font-family: nav-font;";
		}	
	}
	else{
		nav.style.cssText = "width: 100%; height: 14vh;position: fixed;top: 0px;overflow: hidden;"
		for(var i = 0; i < classNum; i++){
			lis[i].style.cssText = "display: block;margin-top: 25%;text-decoration: none;color: #818A91;font-family: nav-font;";
		}
	}
};