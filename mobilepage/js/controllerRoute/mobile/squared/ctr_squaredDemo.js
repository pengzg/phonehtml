tempApp.controller('ctr_squaredDemo', function($rootScope, $scope,http,$location,$window,$timeout,$state) {
	//$rootScope.comLoading.show();
	var gameState = {state:'squared',params:$location.search()};
	window.sessionStorage.gameState = JSON.stringify(gameState);
	$rootScope.isBottomTab = false;
	$rootScope.tabsCheck = 1;
	$scope.active = -1;
	$scope.btnDisable = false;
	$scope.sessioninfo = {
		mb_nickname: '小明'
	}
	$scope.activityMain = {
		mm_lucky_rat_people_type:2,

	}
	$scope.drawChanceNum = {
		drawChanceDay:10,
		drawNumDay: 0
	}
	var prize = {
		name: '50元优惠券'
	};

	$rootScope.goHome = null;
	$rootScope.goMine = null;
	$scope.shakeInfo = {
		me_shopid_nameref: '演示小店'
	}
	$scope.prizeList = [];

	$scope.prizeList.push({
		mp_name: 'Iphone',
		mp_img: 'img/mobile/squared/gift.png',
		isPrize: true
	});
	
	$scope.prizeList.push({
		mp_name: 'Iphone',
		mp_img: 'img/mobile/squared/gift.png',
		isPrize: true
	});
	
	$scope.prizeList.push({
		mp_name: '50元优惠券',
		isPrize: true
	});
	
	$scope.prizeList.push({
		mp_name: '未中奖'
	});
	$scope.prizeList.push({
		mp_name: '未中奖'
	});
	$scope.prizeList.push({
		mp_name: '未中奖'
	});
	$scope.prizeList.push({
		mp_name: '未中奖'
	});
	$scope.prizeList.push({
		mp_name: '未中奖'
	});
	
	

    $scope.onRefresh = function() {
        $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
            $timeout(function(){
                $rootScope.videoPop.show('南方黑芝麻联合社区盒子摇一摇，抽好礼！轻脂饮品黑黑乳，营养无负担！');
            },200)
        }, 500);
    }
	//rander函数里使用的setTimeout 会导致$scope失效
	function randerFun(idx){
		if(!$scope.$$phase){
			$scope.$apply(function(){
				$scope.active = idx;
			})
		}else{
			$scope.active = idx;
		}
	}

	function callback(){
		$scope.$apply(function(){
			$scope.btnDisable = false;
			if(prize.isPrize){
				$rootScope.comGetPrize.show(prize.mp_name,'去领奖',function(){
					$rootScope.showIonicPop("演示活动，不能核销！",'提示');
				});
			}else{
				$rootScope.comMissPrize.show('您还有一次抽奖机会','再抽一次')
			}
		});
	}

	$scope.drawLeftTimes = 3;
	$scope.start = function(){
		if($scope.btnDisable){
			return;
		}
		if(($scope.drawChanceNum.drawChanceDay-$scope.drawChanceNum.drawNumDay)<=0){
			$rootScope.showIonicPop("您今天的抽奖次数已经用完啦！",'提示');
			return;
		}
		$scope.btnDisable = true;
		$scope.drawChanceNum.drawNumDay++;
		//随机中奖
		var prizeIdx = 1;
		if(Math.random()>0.5){
			prizeIdx = Math.ceil(Math.random()*3);
		}else{
			prizeIdx = Math.ceil(Math.random()*5)+3;
		}
		prize = $scope.prizeList[prizeIdx-1]
		//roller在路由里预先加载了
		roller.init(0,prizeIdx,randerFun,callback);
		roller.roll();

	};
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
})

