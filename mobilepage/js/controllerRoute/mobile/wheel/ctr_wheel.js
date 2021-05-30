tempApp.controller('ctr_wheel', ['$rootScope', '$scope', 'commonFactory','http','$state',
	function($rootScope, $scope, commonFactory,http,$state) {
	window.sessionStorage.gameState = 'wheel';
	
	// $rootScope.comLoading.show();
	var startWheel = (function(){
		var startNum = 2160; //这个角度为一等奖
		var riseNum = 60;//每加60往后推一等奖
		var prizeArr = ['一等奖','二等奖','三等奖','幸运奖','欢迎再来','谢谢参与'];
		var ij = 10;
		return function(prizeNum){
			$('#wheel-panel').rotate({ 　
				angle: 0,  //起始角度
				animateTo: startNum+prizeNum*riseNum,  //结束的角度
				duration: 5*1000, //转动时间
				callback: function(){
					$scope.$apply(function(){
						if(prizeNum<4){
							$rootScope.comGetPrize.show(prizeArr[prizeNum],'去领奖',function(){
								// $state.go('mverification', { 'mw_id': prize.mw_id });
								$rootScope.showIonicPop("演示活动，不能领取！",'提示');
							});
						}else{
							$rootScope.comMissPrize.show('您还有一次抽奖机会','再抽一次');
						}
						$scope.start.btnDisable = false;
					});
				} //回调函数
		　 })
		}
	})();

	/**
	 * 抽奖点击方法
	 * @Author   SunXinqiang
	 * @DateTime 2017-08-18
	 * @return   null
	 */
	$scope.start = (function(){

		var prizeNum ;
		var startObj = {};
		startObj.btnDisable = false;
		startObj.start = function(){
			if(startObj.btnDisable){
				return;
			}
			startObj.btnDisable = true;

			startWheel(Math.floor(Math.random()*6));
		}
		return startObj;
	})();

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
				// $state.go('mverification', { 'mw_id': 123 });
				$rootScope.showIonicPop("演示活动，不能领取！",'提示');
			})
	}



}])

