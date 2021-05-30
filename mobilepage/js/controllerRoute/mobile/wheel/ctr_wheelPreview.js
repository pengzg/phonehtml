tempApp.controller('ctr_wheelPreview', function($rootScope, $scope, commonFactory) {
	var startNum = 1084; //这个角度为一等奖
	var riseNum = 60;//每加60往后推一等奖
	var prizeArr = ['一等奖','二等奖','三等奖','幸运奖','欢迎再来','谢谢参与'];
	var btnDisable = false;
	/**
	 * 抽奖点击方法
	 * @Author   SunXinqiang
	 * @DateTime 2017-08-18
	 * @return   null
	 */
	$scope.start = function(){
		if(btnDisable){
			return;
		}
		btnDisable = true;
		var prizeNum = commonFactory.getRandom(1,5);
		$('#wheel-panel').rotate({ 　
			angle: 0,  //起始角度
			animateTo: startNum+prizeNum*riseNum,  //结束的角度
			duration: 10*1000, //转动时间
			callback: function(){
				$scope.$apply(function(){
					if(prizeNum<4){
						$rootScope.compopPrize.show('恭喜获得'+prizeArr[prizeNum]);
					}else{
						$rootScope.compopFail.show('您还有一次抽奖机会','再抽一次')
					}
				});
				btnDisable = false;
			} //回调函数
	　 })
	}
	$scope.data1 = [
 					{title:'活动奖品',content:{text:['一等奖：价值100元礼品券','二等奖：价值50元礼品券','三等奖：价值10元礼品券'],id:'set_actaward_box',idx:2}},
 					{title:'活动时间',content:{text:['2017年08月10日~2017年08月17日'],id:'set_acttime_box',idx:0}},
 					{title:'活动规则',content:{text:['1、进入游戏，长按复制红包口令 ','2、点击“红包入口”进入公众号 ；','3、将口令黏贴发送至公众号，公众号将会发送红包链接，点击领取；','4、一个口令对应一个红包，不能重复使用；','5、活动期间奖品数量有限，先到先得，发完即止；','6 、活动期间用户全程免费参与，红包将直接发送到零钱'],id:'set_ruletext_box',idx:0}},
 				]
 	var data2 = [{level:'一等奖',content:'iphone8s plus 1部',status:'未领取'}];

 	$scope.$watch('data1',function(newVal){
 		$rootScope.tabPop2.setData(newVal,data2);
 	});

 	$scope.showTabPop = function(isTwo){
 		$rootScope.tabPop.show(data1,data2,false,isTwo);
 	}

 	$scope.word_back_img = '../../img/mobile/wheel/bg.png';
 	$scope.word_bar_img = '../../img/mobile/wheel/wheel_title.png';
 	
	$scope.$watch('showIdx',function(newVal){
		switch(newVal)
			{
			case 0:
				  $scope.isEnd = false;
			  	  $rootScope.tabPop2.hide();
			  	  $rootScope.compopFail.hide();
			  	  $rootScope.compopPrize.hide();
			  	  break;
			case 1:
				  $scope.isEnd = false;
				  $rootScope.tabPop2.show($scope.data1,data2,true);
				  break;
			case 2:
				  $scope.isEnd = false;
				  $rootScope.tabPop2.show($scope.data1,data2,true,true);
				  break;
			case 3:
				  $scope.isEnd = false;
				  $rootScope.tabPop2.hide();
				  $rootScope.compopFail.hide();
				  $rootScope.compopPrize.show('恭喜获得一等奖',true);
				  break;
		  case 4:
		  	  	  $scope.isEnd = false;
				  $rootScope.tabPop2.hide();
				  $rootScope.compopPrize.hide();
				  $rootScope.compopFail.show('您还有一次抽奖机会','再抽一次',true);
				  break;
		  case 5:
				  $rootScope.tabPop2.hide();
				  $rootScope.compopPrize.hide();
  				  $rootScope.compopFail.hide();
  				  $scope.isEnd = true;
				  break;
			}
	});
})

