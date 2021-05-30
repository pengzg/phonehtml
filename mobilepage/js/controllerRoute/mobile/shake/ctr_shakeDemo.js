tempApp.controller('ctr_shakeDemo', ['$rootScope', '$scope','$timeout',
	function($rootScope, $scope,$timeout) {
	
	$rootScope.isBottomTab = false;
	$rootScope.tabsCheck = 1;

	$scope.onRefresh = function() {
        $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
            $timeout(function(){
                $rootScope.videoPop.show('南方黑芝麻联合社区盒子摇一摇，抽好礼！轻脂饮品黑黑乳，营养无负担！');
            },200)
        }, 500);
    }
	
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
 		
	var myShakeEvent = new Shake({
		threshold : 15
	});

	//开始监听摇一摇
	function startListen() {
		myShakeEvent.start();

		window.addEventListener('shake',
				showPop, false);
	}
	//结束监听摇一摇
	function stopListen() {
		window.removeEventListener('shake',
				showPop, false);
		myShakeEvent.stop();
	}

	function showPop(){
		var template = $('#popContent')[0].innerHTML;
		$timeout(function(){
			$rootScope.showIonicPop(template,'中奖啦',function(){},'再摇一次')
		},500)
	}

	startListen();

	$scope.$on('$stateChangeStart',function(){
		stopListen();
	})
}])

