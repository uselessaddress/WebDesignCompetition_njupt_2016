Event = function(d, p, t, c, pl) {
	this.date = d;
	this.place = p;
	this.title = t;
	this.context = c;
	this.pic = pl;
}

let pics=[];
pics.push("img/百团大战.png");
pics.push("img/地球一小时.jpg");
pics.push("img/日偏食.JPG");
pics.push("img/羊山湖.png");
pics.push("img/邮你月更圆.png");
pics.push("img/紫金山.jpg");

let Events = [];

Events.push(new Event("2015年10月25日", "紫金山天文台", "爬紫金山", "欣赏各类陨石，学习中国古代的天文仪器，与南京各大天文社团交流。", pics[5]));
Events.push(new Event("2016年03月09日", "南二广场", "观测日偏食","食分0.18的日偏食，出动高精尖设备，记录日食瞬间。", pics[2]));
Events.push(new Event("2016年03月19日", "南操", "地球一小时", "与南邮绿色风共同举办“仰望星空区”，向南邮的同学们普及天文知识，宣传光污染的危害。", pics[1]));
Events.push(new Event("2016年05月04日", "羊山湖公园", "羊山湖露营","与相邻高校展开的露营活动，在观赏星空的同时进行烧烤，表演等各种活动。", pics[3]));
Events.push(new Event("2016年09月15日", "南操", "中秋赏月", "中秋节特别活动！爱好天文的同学和路人们一起赏月吃月饼。", pics[4]));
Events.push(new Event("2016年09月22日", "南邮主干道", "百团大战","百团大战开始啦，新一届的小鲜肉纷纷来到帐篷报名~", pics[0]));

notice = "南京邮电大学天文协会为南邮校科协直属的校级兴趣社团。南邮天协自2015年成立，为南邮最年轻的社团之一，南邮天文协会是南邮所有爱好头顶上灿烂星空的同学的共同家园。天协的日常活动有观星、学术授课等，以达到普及天文知识的目的。当重大天象事件发生时，组织观测活动。南邮天协现有天鹰80/100折射式望远镜、双筒望远镜等设备。希望每一个热爱星空的你，能仰望星空，脚踏实地，我们在南邮天协等你。";

$(function(){
	
	let num = Events.length;
	for(var i = 0; i < num; i++){
		$('.time').append("<td class='time_text'>" + Events[i].date + "</td>");
		$('.timepoint').append("<td class='time_point'><img src='img/circle.svg'></td>");
	}
	$('.time').append("<td class='time_text'>接下来会发生什么呢...</td>");
	$('.timepoint').append("<td class='time_point'><img src='img/circle_cur.svg'></td>");
	$('.time_line_notice').html("<div class='time_line_img'></div>"+
								"<div class='time_line_intro'></div>"+ 
								"<h3  style = 'text-align:center;'>" + "通告" + "</h3>"+
								"<p style = 'font-weight: normal;'>" + notice + "</p>");
	$('.time_line_intro').css("display", "none");
	$('.time_line_img').css("display", "none");
	$('.time_point img').click(function(){
		var i = $('.time_point img').index(this);
		$('.time_point img').attr("src", "img/circle.svg");
		$('.time_point img').eq(i).attr("src", "img/circle_cur.svg");
		if (i == num) {
			$('.time_line_intro').css("display", "none");
			$('.time_line_center').text('未来计划');
			$('.time_line_img').removeAttr("style");
			$('.time_line_notice').html("<div class='time_line_img'></div>"+
								"<div class='time_line_intro'></div>"+ 
								"<h3 style = 'text-align:center;'>" + "通告" + "</h3>"+
								"<p style = 'font-weight: normal;'>" + notice + "</p>");
			$('.time_line_intro').css("display", "none");
			$('.time_line_img').css("display", "none");
		}else{
			$('.time_line_intro').css("display", "block");
			$('.time_line_img').css("display", "block");
			$('.time_line_center').text('过往记忆');
			$('.time_line_intro').html("<b>" + Events[i].title + "</b>" + "<p>" + Events[i].date +" "+ Events[i].place + "</p>" + "<p>" + Events[i].context + "</p>");
			$('.time_line_img').css("background-image", "url(" + Events[i].pic +")");
		}
	});
});