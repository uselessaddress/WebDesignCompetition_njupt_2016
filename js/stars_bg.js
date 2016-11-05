var canvas;
var context;
var starsnum = 500; //星星数量
var mouse = {
	x: 0,
	y: 0
};
var starArr = []; //储存每一个星星的位置
var movArr = []; //储存移动变化的因子

function random(lo, hi) { //随机获得从lo-hi的整数
	return Math.floor(Math.random() * (hi - lo + 1) + lo);
}

function init() { //初始化
	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	for (var i = 0; i < starsnum; i++) {
		x = random(-100, canvas.width + 100);
		y = random(-100, canvas.height + 100);
		r = 2;
		var newStar = drawCirle(context, x, y, r);
		starArr.push(newStar);
		movArr.push(Math.random());
	}
	for (var j = 0; j < starsnum; j++) {
		for (var k = j; k < starsnum; k++) {
			var bx = starArr[j].centerX;
			var by = starArr[j].centerY;
			var cx = starArr[k].centerX;
			var cy = starArr[k].centerY;
			var dis = Math.sqrt(Math.abs(cx - bx) * Math.abs(cx - bx) + Math.abs(by - cy) * Math.abs(by - cy));
			if (dis < 0.04 * (canvas.width + canvas.height) / 2) {
				drawLine(context, bx, by, cx, cy);
			}
		}
	}
	canvas.addEventListener('mousemove', mouseMove, false); //鼠标移动监控
}

function mouseMove(event) { //鼠标移动事件
	mouse.x = event.pageX;
	mouse.y = event.pageY;
	render();
}

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < starsnum; i++) {
		var changeStar = starArr[i];
		changeStar.centerX += mouse.x/2 * movArr[i];
		changeStar.centerY += mouse.y/2 * movArr[i];
		drawCirle(context,changeStar.centerX, changeStar.centerY, changeStar.radius);
		starArr[i] = changeStar;
	}
	for (var j = 0; j < starsnum; j++) {
		for (var k = j; k < starsnum; k++) {
			var bx = starArr[j].centerX;
			var by = starArr[j].centerY;
			var cx = starArr[k].centerX;
			var cy = starArr[k].centerY;
			var dis = Math.sqrt(Math.abs(cx - bx) * Math.abs(cx - bx) + Math.abs(by - cy) * Math.abs(by - cy));
			if (dis < 0.04 * (canvas.width + canvas.height) / 2) {
				drawLine(context, bx, by, cx, cy);
			}
		}
	}
}

function drawCirle(ctx, x, y, r) { //在(x,y)处画半径为r的圆
	function Circle(x, y, r) {
		this.centerX = x;
		this.centerY = y;
		this.radius = r;
	}
	var circle = new Circle(x, y, r);
	ctx.beginPath();
	ctx.arc(circle.centerX, circle.centerY, circle.radius, 0, Math.PI * 2, true);
	ctx.fillStyle = "rgba(255,255,255,1)";
	ctx.fill();
	ctx.closePath();
	return circle;
}

function drawLine(ctx, bx, by, cx, cy) { //用直线把(bx,by)到(cx,cy)连起来
	function Line(bx, by, cx, cy) {
		this.beginX = bx;
		this.beginY = by;
		this.closeX = cx;
		this.closeY = cy;
	}
	var line = new Line(bx, by, cx, cy);
	ctx.beginPath();
	ctx.moveTo(line.beginX, line.beginY);
	ctx.lineTo(line.closeX, line.closeY);
	ctx.stroke();
	ctx.lineWidth = 1;
	ctx.strokeStyle = "rgba(255,255,255,0.5)"
	ctx.closePath();
}

init();