function background() {
	starsnum = 150; //星星数量
	starArr = []; //储存每一个星星的位置
	canvas_stars = document.getElementById("stars");
	context_stars = canvas_stars.getContext("2d");
	canvas_stars.width = window.innerWidth;
	canvas_stars.height = window.innerHeight;
	canvas_stars.style.cssText = "top: 0";

	canvas_lines = document.getElementById("lines");
	context_lines = canvas_lines.getContext("2d");
	canvas_lines.width = window.innerWidth;
	canvas_lines.height = window.innerHeight;
	canvas_lines.style.cssText = "top: 0";

	function random(lo, hi) { //随机获得从lo-hi的整数
		return Math.floor(Math.random() * (hi - lo + 1) + lo);
	}

	function draw_stars() { //初始化
		for (var i = 0; i < starsnum; i++) {
			x = random(-100, canvas_stars.width + 100);
			y = random(-100, canvas_stars.height + 100);
			r = (Math.random() + 2);
			var newStar = drawCirle(context_stars, x, y, r, 1);
			starArr.push(newStar);
		}
	}

	function draw_lines() {
		for (var j = 0; j < starsnum; j++) {
			for (var k = j; k < starsnum; k++) {
				var bx = starArr[j].centerX;
				var by = starArr[j].centerY;
				var cx = starArr[k].centerX;
				var cy = starArr[k].centerY;
				var dis = Math.sqrt(Math.abs(cx - bx) * Math.abs(cx - bx) + Math.abs(by - cy) * Math.abs(by - cy));
				if (dis < 0.065 * (canvas_lines.width + canvas_lines.height) / 2) {
					drawLine(context_lines, bx, by, cx, cy);
				}
			}
		}
	}

	function drawCirle(ctx, x, y, r, op) { //在(x,y)处画半径为r的圆
		function Circle(x, y, r, op) {
			this.centerX = x;
			this.centerY = y;
			this.radius = r;
			this.opacity = op;
		}
		var circle = new Circle(x, y, r, op);
		ctx.beginPath();
		ctx.arc(circle.centerX, circle.centerY, circle.radius, 0, Math.PI * 2, true);
		ctx.fillStyle = "rgba(255,255,255," + circle.opacity + ")";
		ctx.fill();
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 8;
		ctx.shadowColor = "rgba(255,255,255," + circle.opacity + ")";
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
		ctx.lineWidth = 1.5;
		ctx.strokeStyle = "rgba(255,255,255,0.3)"
		ctx.closePath();
	}

	draw_stars();
	draw_lines();
}

background();

window.addEventListener("resize", function(){//根据窗口变化改变背景的大小
	background();
}, false);