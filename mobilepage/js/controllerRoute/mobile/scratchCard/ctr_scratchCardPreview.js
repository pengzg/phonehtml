tempApp.controller('ctr_scratchCardPreview', function($rootScope, $scope,http,$timeout) {
	
	//控制刮卡次数
	var t = 1; 
	//初始化所有数据并且随机产生奖品
	var initialize  = function () {
		//剩余刮卡次数
		document.getElementsByClassName('scratch-num1')[0].innerHTML = (4-t);
		//随机数
		function getRandomNum(lbound, ubound) {
			return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
		}
		var r = getRandomNum(1,100);
		var btn = document.getElementsByClassName("scratch-btn");
		for(var i=0; i<btn.length; i++){
			btn[i].style.zIndex = '1';
		}
		document.getElementById("scratch-no").style.display = "none";
		document.getElementById("scratch-ok").style.display = "none";
		
		//初始化涂抹面积
		isOk = 0;
		
		
		if(true||r<t*33){
			document.getElementById("scratch-prompt").innerHTML="恭喜您，中奖了！"
			var ok =document.getElementById("scratch-ok");
			ok.style.display = "block";
			//点击领取奖品
			// ok.onclick = function () {
			// 	window.location.href="prize.html"
			// };
		}else{
			document.getElementById("scratch-prompt").innerHTML="很遗憾，未中奖！"
			document.getElementById("scratch-no").style.display = "block";
		}
	};

	var c1;				//画布
	var ctx;			//画笔
	var ismousedown;	//标志用户是否按下鼠标或开始触摸
	var isOk=0;			//标志用户是否已经刮开了一半以上
	var fontem = parseInt(window.getComputedStyle(document.documentElement, null)["font-size"]);//这是为了不同分辨率上配合@media自动调节刮的宽度

	/* 页面加载后开始初始化画布 */
	function reset(){	
		initialize();
		c1 = document.getElementById("scratch-c1");
		
		//这里很关键，canvas自带两个属性width、height,我理解为画布的分辨率，跟style中的width、height意义不同。
		//最好设置成跟画布在页面中的实际大小一样
		//不然canvas中的坐标跟鼠标的坐标无法匹配
		c1.width=c1.clientWidth;
		c1.height=c1.clientHeight;
		ctx = c1.getContext("2d");
		
		//初始化
		initCanvas();
	}

	function clearCanvas(){
		c1 = document.getElementById("scratch-c1");
		cxt = c1.getContext("2d");  
		cxt.clearRect(0,0,c1.width,c1.height);  
	}
	reset();
	//初始化画布，画灰色的矩形铺满
	function initCanvas(){
		//网上的做法是给canvas设置一张背景图片，我这里的做法是直接在canvas下面另外放了个div。
		//c1.style.backgroundImage="url(中奖图片.jpg)";
		ctx.globalCompositeOperation = "source-over";
		ctx.fillStyle = '#aaaaaa';
		ctx.fillRect(0,0,c1.clientWidth,c1.clientHeight);
		ctx.fill();
		
		ctx.font = "Bold 30px Arial";
				ctx.textAlign = "center";
				ctx.fillStyle = "#999999";
				ctx.fillText("刮一刮",c1.width/2,50);
		
		//把这个属性设为这个就可以做出圆形橡皮擦的效果
		//有些老的手机自带浏览器不支持destination-out,下面的代码中有修复的方法
		ctx.globalCompositeOperation = 'destination-out';
	}
  
	$scope.$watch('showIdx',function(newVal){
		switch(newVal)
			{
			case 0:
				$scope.isShare = false;
				$scope.isEnd = false;
				reset();
			  	break;
			case 1:
				$scope.isShare = true;
				clearCanvas();
				$scope.isEnd = false;
				break;
			case 2:
				$scope.isShare = false;
				clearCanvas();
				$scope.isEnd = true;
			}
	});
})

