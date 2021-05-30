tempApp.controller('ctr_wheel', function($rootScope, $scope, commonFactory,http) {
	window.sessionStorage.gameState = 'wheel';
	
	$rootScope.comLoading.show();
	var startWheel = (function(){
		var startNum = 2168; //这个角度为一等奖
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
							$rootScope.compopPrize.show('恭喜获得'+prizeArr[prizeNum]);
						}else{
							$rootScope.compopFail.show('您还有一次抽奖机会','再抽一次')
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
			http.get('json/prize.json',{},function(data){
				prizeNum = data.prizeLevel;
				startWheel(prizeNum);
			},function(err){
				
			})
		}
		return startObj;
	})();
	
 	$scope.showTabPop = function(isTwo){
 		var ruleObj = {
 			url: 'json/rule.json',
 			param: ''
 		}
 		var myPrizeObj = {
 			url: 'json/myPrize.json',
 			param: ''
 		}
		$rootScope.tabPop.show(ruleObj,myPrizeObj,false,isTwo);
 	}
})

