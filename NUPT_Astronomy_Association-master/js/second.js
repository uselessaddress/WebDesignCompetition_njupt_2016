var box = document.getElementById('box');
var input = box.getElementsByTagName('input');
var div = box.getElementsByTagName('div');
var btn1 = document.getElementById("btn1");
var btn2 = document.getElementById("btn2");
var btn3 = document.getElementById("btn3");
var btn4 = document.getElementById("btn4");

for (var i = 0; i < input.length; i++) {
    input[i].index = i;
    input[i].onclick = function() {
        for (var i = 0; i < input.length; i++) {
            input[i].className = 'before_active';
            div[i].style.display = 'none';
        };
        this.className = 'active';
        div[this.index].style.display = 'block';
        if (this.index == 0) {
            wrapper.style.backgroundColor = "rgba(180,151,90, 0.3)";
            btn1.dataset.index = 1;
            btn2.dataset.index = 0;
            btn3.dataset.index = 0;
            btn4.dataset.index = 0;
        } else if (this.index == 1) {
            wrapper.style.backgroundColor = "rgba(0,128,128,0.3)";
            btn1.dataset.index = 0;
            btn2.dataset.index = 1;
            btn3.dataset.index = 0;
            btn4.dataset.index = 0;
        } else if (this.index == 2) {
            btn1.dataset.index = 0;
            btn2.dataset.index = 0;
            btn3.dataset.index = 1;
            btn4.dataset.index = 0;
            wrapper.style.backgroundColor = "rgba(13,37,76,0.3)";
        } else if (this.index == 3) {
            btn1.dataset.index = 0;
            btn2.dataset.index = 0;
            btn3.dataset.index = 0;
            btn4.dataset.index = 1;
            wrapper.style.backgroundColor = "rgba(197,195,214,0.3)";
        }
    };
};


var pic_to_left = document.getElementById('pg_2_ani');
var wrapper = document.getElementById('before_wrapper');
pic_to_left.addEventListener("click", to_left, false);


function to_left() { //向右缓动

    var wid = wrapper.offsetWidth;
    var after = document.body.clientWidth * 0.9;
    var start = 0;
    var during = 10;
    tween_to_left = function() {
        start++;
        var change = Tween.Quart.easeOut(start, wid, after - wid, during);
        wrapper.style.width = change + "px";
        if (start < during)
            requestAnimationFrame(tween_to_left);
        else {
            if (btn1.dataset.index == 1) {
                wrapper.style.backgroundColor = "rgba(180,151,90, 0.3)"; //
            } else if (btn2.dataset.index == 1) {
                wrapper.style.backgroundColor = "rgba(0,128,128,0.3)"; //
            } else if (btn3.dataset.index = 1) {
                wrapper.style.backgroundColor = "rgba(13,37,76,0.3)"; //
            } else if (btn4.dataset.index == 1) {
                wrapper.style.backgroundColor = "rgba(197,195,214,0.3)"; //
            }
            pic_to_left.style.display = "none";
            pic_to_right.style.display = "block";
        }
    };
    tween_to_left();
    box.style.display = "block";
}

var pic_to_right = document.getElementById('pg_3_ani');
pic_to_right.addEventListener("click", to_right, false);

function to_right() { //向左缓动

    var wid = wrapper.offsetWidth;
    console.log(wrapper.offsetWidth);
    var after = document.body.clientWidth * 0.08;
    console.log(document.body.clientWidth);
    var start = 0;
    var during = 10;
    tween_to_right = function() {
        start++;
        var change = Tween.Quart.easeOut(start, wid, after - wid, during);
        wrapper.style.width = change + "px";
        if (start < during)
            requestAnimationFrame(tween_to_right);
        else {
            pic_to_left.style.display = "block";
            pic_to_right.style.display = "none";
            wrapper.style.backgroundImage = "none";
        }
    };
    tween_to_right();
    box.style.display = "none";

}