tempApp.controller('ctr_shakePreview', ['$rootScope', '$scope','$timeout',
	function($rootScope, $scope,$timeout) {
	
	$rootScope.isBottomTab = false;
	$rootScope.tabsCheck = 1;
	
	var ruleObj = [
			{
				"title" : "活动名称",
				"content" : ["演示活动"]
			},
			{
				"title" : "活动奖品",
				"content" : ['Iphone','50元优惠券']
			},
			{
				"title" : "活动时间",
				"content" : ['2018-09-08']
			},
			{
				"title" : "活动规则",
				"content" : ['1.每人只有一次中奖机会','2.请及时兑奖','3.截止日期2018-12-12']
			} ]
	var myPrizeObj = [];

	/**
	 * 规则弹窗和奖品弹窗
	 * @DateTime 2017-11-01
	 * @param    {Boolean}  isTwo [description]
	 * @return   {[type]}         [description]
	 */
	$scope.showTabPop = function(isTwo){
		$rootScope.tabPop3.show(isTwo,
			 function(pop){
				pop.noteData = ruleObj;//给规则弹窗赋值数据
			},
			/**
			 * 获取用户奖品列表
			 * 奖品弹窗 每次点都会调用该方法 重新获取数据
			 */
			function(pop){
				myPrizeObj = [];
				myPrizeObj.push({
					"level":'二等奖',
					"time":'2018-1-01-05',
					"content":'50元优惠券',
					"status":'未领取',
					"mw_id":123,
					"mw_state":'1'
				});
				pop.awardData = myPrizeObj;
			},
			function(x){
				$rootScope.tabPop3.hide();
				$rootScope.showIonicPop("演示活动，不能领取！",'提示');
		        $rootScope.comShare.hide();
			})
 		}


	function showPop(){
		var template = $('#popContent')[0].innerHTML;
		$rootScope.showIonicPop2.show(template,'中奖啦',function(){},'再摇一次')
	}

	function hidePop(){
		$rootScope.showIonicPop2.hide();
	}

	$scope.data1 = [
 					{title:'活动奖品',content:{text:['一等奖：价值100元礼品券','二等奖：价值50元礼品券','三等奖：价值10元礼品券'],id:'set_actaward_box',idx:2}},
 					{title:'活动时间',content:{text:['2017年08月10日~2017年08月17日'],id:'set_acttime_box',idx:0}},
 					{title:'活动规则',content:{text:['1、进入游戏，长按复制红包口令 ','2、点击“红包入口”进入公众号 ；','3、将口令黏贴发送至公众号，公众号将会发送红包链接，点击领取；','4、一个口令对应一个红包，不能重复使用；','5、活动期间奖品数量有限，先到先得，发完即止；','6 、活动期间用户全程免费参与，红包将直接发送到零钱'],id:'set_ruletext_box',idx:0}},
 				]
 	var data2 = [{level:'一等奖',content:'iphone8s plus 1部',status:'未领取'}];

	$scope.$watch('showIdx',function(newVal){
		switch(newVal)
			{
			case 0:
				  $scope.isEnd = false;
			  	  $rootScope.tabPop2.hide();
			  	  hidePop();
			  	  break;
			case 1:
				  $scope.isEnd = false;
				  $rootScope.tabPop2.show($scope.data1,data2,true);
				  hidePop();
				  break;
			case 2:
				  $scope.isEnd = false;
				  hidePop();
				  $rootScope.tabPop2.show($scope.data1,data2,true,true);
				  break;
			case 3:
				  $scope.isEnd = false;
				  $rootScope.tabPop2.hide();
				  showPop();
				  $rootScope.showIonicPop2
				  break;
		  	case 4:
				  $rootScope.tabPop2.hide();
				  hidePop();
  				  $scope.isEnd = true;
				  break;
			}
	});
}])

