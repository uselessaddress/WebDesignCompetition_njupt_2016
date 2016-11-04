var stars_bg = {}; (function() {
    function DymaticBackground(opt) {
        this.init(opt);
    }
    DymaticBackground.prototype.init = function(opt) {
        var self = this;
        self._initDom(opt);
        self.canvas.width = this.options.canvasWidth;
        self.canvas.height = this.options.canvasHeight;
        self._initStar(self.context);
        self.render();
    }
    DymaticBackground.prototype._initDom = function(opt) {
        this.options = {
            canvasContainerID: "canvas-container",
            canvasOpacity: 1,
            canvasEleCss: "z-index:-20;position:absolute;left:0;top:0;bottom:0;right:0;",
            circleNum: 500,
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
    }
    DymaticBackground.prototype.random = function(max, _min) {
        var minNum = arguments[1] || 0;
        return Math.floor(Math.random() * (max - minNum + 1) + minNum);
    }
    DymaticBackground.prototype._initStar = function(context) {
        var self = this;
        for (var i = 0; i < self.options.circleNum; i++) {
            x = self.random(self.drawMaxWidth, self.drawMinWidth);
            y = self.random(self.drawMaxHeight, self.drawMinHeight);
            r = 1.5;
            var newStar = self.drawStar(context, x, y, r);
            self.starArr.push(newStar);
        }
    }
    DymaticBackground.prototype.render = function() {
        var self = this;
        self.context.clearRect(0, 0, self.options.canvasWidth, self.options.canvasHeight);
        for (var i = 0; i < self.options.circleNum; i++) {
            var changeStar = self.starArr[i];
            self.drawStar(self.context, changeStar.centerX, changeStar.centerY, changeStar.radius);
        }
        var timer = setTimeout(function() {
            self.render();
        },
        2000);
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
        a = Math.random()
        ctx.fillStyle = "rgba(255,255,255," + a + ")";
        ctx.fill();
        ctx.shadowColor = "#ffffff";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 15;
        ctx.closePath();
        return circle;
    }
    stars_bg.background = DymaticBackground;
})()
