tempApp.controller('ctr_wordenvelopePreview', function($rootScope,$scope) {

	$scope.word = '';
	$scope.isAward = false;
	$scope.hasDraw = false;
	$scope.showIdx = 0;
	$scope.bannerHeight = (document.body.clientWidth/1.91)+'px';
 	$scope.draw = function(word){
 		if(!$scope.word){
 			$scope.compop.show('请输入口令');
 			return;
 		}
 		if($scope.word=='123'){
 			$scope.isAward = true;
 			$scope.hasDraw = true;
 		}else{
	 		$scope.compop.show('口令错误，请跟收银处核对');
	 		$scope.word = '';
 		}
 	}

 	$scope.data1 = [
 					{title:'活动奖品',content:{text:['一等奖：价值100元礼品券','二等奖：价值50元礼品券','三等奖：价值10元礼品券'],id:'set_actaward_box',idx:2}},
 					{title:'活动时间',content:{text:['2017年08月10日~2017年08月17日'],id:'set_acttime_box',idx:0}},
 					{title:'活动规则',content:{text:['1、进入游戏，长按复制红包口令 ','2、点击“红包入口”进入公众号 ；','3、将口令黏贴发送至公众号，公众号将会发送红包链接，点击领取；','4、一个口令对应一个红包，不能重复使用；','5、活动期间奖品数量有限，先到先得，发完即止；','6 、活动期间用户全程免费参与，红包将直接发送到零钱'],id:'set_ruletext_box',idx:0}},
 				]
 	var data2 = [{level:'一等奖',content:'iphone8s plus 1部',status:'未领取'}];

 	$scope.showTabPop = function(){
 		$rootScope.tabPop.show(data1,data2);
 	}

 	$scope.set_bless_box = '祝您生活美满，磕家欢乐';
 	$scope.set_seller_name_box = '社区盒子';
 	$scope.bless_note = '复制该口令 黏贴于公众号输入即可获得红包05:00分钟后红包未兑换，红包将被回收';
 	$scope.word_back_img = '../../img/mobile/bg.png';

	$scope.$watch('showIdx',function(newVal){
		switch(newVal)
			{
			case 0:
			  	  $rootScope.tabPop2.hide();
			  	  $scope.hasDraw = false;
			  	  $scope.isAward = false;
			  	  $scope.isEnd = false;
			  	  break;
			case 1:
				  $scope.hasDraw = true;
				  $scope.isAward = true;
				  $rootScope.tabPop2.hide();
				  $scope.isEnd = false;
				  break;
			case 2:
				  $scope.hasDraw = false;
				  $scope.isAward = false;
				  $rootScope.tabPop2.show($scope.data1,data2,true);
				  $scope.isEnd = false;
				  break;
			case 3:
				  $scope.hasDraw = false;
				  $scope.isAward = false;
				  $rootScope.tabPop2.show($scope.data1,data2,true,true);
				  $scope.isEnd = false;
				  break;
			case 4:
				  $rootScope.tabPop2.hide();
			  	  $scope.hasDraw = false;
			  	  $scope.isAward = false;
			  	  $scope.isEnd = false;
				  $scope.isEnd = true;
				  break;
			}
	});
	
 	$scope.$watch('data1',function(newVal){
 		$rootScope.tabPop2.setData(newVal,data2);
 	});
})

