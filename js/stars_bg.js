var mouse = {
    x: 0,
    y: 0,
    down: false
}
var stars_bg = {};
(function() {
    function DymaticBackground(opt) {
        this.init(opt);
    }
    DymaticBackground.prototype.init = function(opt) {
        var self = this;
        self._initDom(opt);
        self.canvas.width = this.options.canvasWidth;
        self.canvas.height = this.options.canvasHeight;
        self._initStars(self.context);
        self.canvas.addEventListener('mousemove', self.mouseMove);
    }
    DymaticBackground.prototype._initDom = function(opt) {
        this.options = {
            canvasContainerID: "canvas-container",
            canvasOpacity: 1,
            canvasEleCss: "z-index:-20;position:absolute;left:0;top:0;bottom:0;right:0;",
            starsnum: 200,
            canvasWidth: document.documentElement.clientWidth || document.documentElement.clientWidth,
            canvasHeight: document.documentElement.clientHeight || document.documentElement.clientHeight
        }
        if (opt) {
            for (var key in opt) {
                this.options[key] = opt[key];
            }
        }
        var canvasEle = document.createElement("canvas");
        var canvasContainer = document.getElementById(this.options.canvasContainerID);
        canvasContainer.appendChild(canvasEle);
        canvasEle.style.cssText = "z-index:-20;position:absolute;left:0;top:0;bottom:0;right:0;";
        canvasEle.style.opacity = this.options.canvasOpacity;
        for (var key in this.options.canvasEleCss) {
            canvasEle.style[key] = this.options.canvasEleCss[key];
        }
        this.canvas = canvasEle;
        this.drawMaxWidth = this.options.canvasWidth + 100;
        this.drawMinWidth = -100;
        this.drawMaxHeight = this.options.canvasHeight + 100;
        this.drawMinHeight = -100;
        this.context = this.canvas.getContext("2d");
        this.starArr = [];
        this.movArr = [];
    }
    DymaticBackground.prototype.random = function(max, _min) {
        var minNum = arguments[1] || 0;
        return Math.floor(Math.random() * (max - minNum + 1) + minNum);
    }
    DymaticBackground.prototype._initStars = function(context) {
        var self = this;
        for (var i = 0; i < self.options.starsnum; i++) {
            x = self.random(self.drawMaxWidth, self.drawMinWidth);
            y = self.random(self.drawMaxHeight, self.drawMinHeight);
            r = 2;
            var newStar = self.drawStar(context, x, y, r);
            self.starArr.push(newStar);
            self.movArr.push(Math.random());
        }
        for (var j = 0; j < self.options.starsnum; j++) {
            for (var k = j; k < self.options.starsnum; k++) {
                var bx = self.starArr[j].centerX;
                var by = self.starArr[j].centerY;
                var cx = self.starArr[k].centerX;
                var cy = self.starArr[k].centerY;
                var dis = Math.sqrt(Math.abs(cx - bx) * Math.abs(cx - bx) + Math.abs(by - cy) * Math.abs(by - cy));
                if (dis < 0.045 * self.canvas.width) {
                    self._initLine(context, bx, by, cx, cy);
                }
            }
        }
    }
    DymaticBackground.prototype.mouseMove = function(event) {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        console.log(mouse.x, mouse.y)
        this.render();
    }
    DymaticBackground.prototype.render = function() {
        var self = this;
        self.context.clearRect(0, 0, self.options.canvasWidth, self.options.canvasHeight);
        for (var i = 0; i < self.options.starsnum; i++) {
            var changeStar = self.starArr[i];
            changeStar.centerX += (mouse.x / 2 * (1 + movArr[i]));
            changeStar.centerY += (mouse.y / 2 * (1 + movArr[i]));
            self.starArr[i] = changeStar;
            self.drawStar(self.context, changeStar.centerX, changeStar.centerY, changeStar.radius);
        }
        for (var j = 0; j < self.options.starsnum; j++) {
            for (var k = j; k < self.options.starsnum; k++) {
                var bx = self.starArr[j].centerX;
                var by = self.starArr[j].centerY;
                var cx = self.starArr[k].centerX;
                var cy = self.starArr[k].centerY;
                var dis = Math.sqrt(Math.abs(cx - bx) * Math.abs(cx - bx) + Math.abs(by - cy) * Math.abs(by - cy));
                if (dis < 0.045 * self.canvas.width) {
                    self._initLine(self.context, bx, by, cx, cy);
                }
            }
        }
    }
    DymaticBackground.prototype._initLine = function(ctx, bx, by, cx, cy) {
        var self = this;

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
        ctx.lineWidth = 1
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.closePath();
    }
    DymaticBackground.prototype.drawStar = function(ctx, x, y, r) {
        var self = this;

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
        ctx.shadowColor = "#ffffff";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
        return circle;
    }
    stars_bg.background = DymaticBackground;
})()