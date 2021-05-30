tempApp.controller('ctr_squared', function($rootScope, $scope,http,$location,$window,$timeout,$state) {
	//$rootScope.comLoading.show();
	var gameState = {state:'squared',params:$location.search()};
	window.sessionStorage.gameState = JSON.stringify(gameState);
	$rootScope.isBottomTab = false;
	$rootScope.tabsCheck = 1;
	$scope.active = -1;
	$scope.btnDisable = false;
	var prize = {
	};

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
				$rootScope.comGetPrize.show(prize.name,'去领奖',function(){
					$state.go('mverification', { 'mw_id': prize.mw_id });
				});
			}else{
//				$rootScope.compopFail.show('您还有一次抽奖机会','再抽一次')
				$rootScope.comMissPrize.show('您还有一次抽奖机会','再抽一次')
			}
		});
	}

	$scope.start = function(){
		if($scope.btnDisable){
			return;
		}
		if($scope.activityMain.mm_lucky_rat_people_type==2&&$scope.drawChanceNum.drawChanceDay<=$scope.drawChanceNum.drawNumDay){
			$rootScope.showIonicPop("您今天的抽奖次数已经用完啦！",'提示');
			return;
		}
		if($scope.activityMain.mm_lucky_rat_people_type==1&&$scope.drawChanceNum.drawChanceAll<=$scope.drawChanceNum.drawNumAll){
			$rootScope.showIonicPop("您的抽奖次数已经用完啦！",'提示');
			return;
		}
		$scope.btnDisable = true;
		var success = function(result){
			prize = {
					index: result.data.index,
					mw_id:result.data.mw_id,
					isPrize: false,
					name: $scope.prizeList[result.data.index-1].mp_name
				};
			if($scope.prizeList[result.data.index-1].mp_id)
				prize.isPrize= true;
			$scope.getDrawChange();
			//roller在路由里预先加载了
			roller.init(0,prize.index,randerFun,callback)
			roller.roll();
		}
		var error = function(result){
			$scope.btnDisable = false;
			$rootScope.showIonicPop(result.desc,'提示');
		}
		var url = '/weixin/web/weixinActivityController/drawSquared.action';
		http.post(url,$.extend({},$scope.activityMain,$scope.shakeInfo),success,error);
	};
	var ruleObj = [
			{
				"title" : "活动名称",
				"content" : [ ]
			},
			{
				"title" : "活动奖品",
				"content" : [ ]
			},
			{
				"title" : "活动时间",
				"content" : []
			},
			{
				"title" : "活动规则",
				"content" : []
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
				var success = function(result){
					$scope.memberPrizeList = result.data;
					myPrizeObj = [];
					for(i in $scope.memberPrizeList){
						myPrizeObj.push({
							"level":$scope.memberPrizeList[i].mw_prizename,
							"time":$scope.memberPrizeList[i].mw_winningtime,
							"content":$scope.memberPrizeList[i].mw_productname,
							"status":$scope.memberPrizeList[i].mw_state_nameref,
							"mw_id":$scope.memberPrizeList[i].mw_id,
							"mw_state":$scope.memberPrizeList[i].mw_state
						});
					}
					pop.awardData = myPrizeObj;
				}
				var error = function(result){
					
				}
				var url = '/weixin/web/weixinActivityController/getMemberPrize.action';
				http.post(url,{activityid:$scope.activityMain.mm_id},success,error);
			},
			function(x){
				$rootScope.tabPop3.hide();
				$state.go('mverification', { 'mw_id': x.mw_id });
		        $rootScope.comShare.hide();
			})
 		}
	
	$scope.getSession = function(){
		var success = function(result){
			$scope.sessioninfo = result.data;
			if(!$scope.sessioninfo){
				$scope.auth();
			}else{
				if(!window.sessionStorage.videoPopViewed){
					$rootScope.videoPop.show('南方黑芝麻联合社区盒子摇一摇，抽好礼！轻脂饮品黑黑乳，营养无负担！');
				}
				$scope.getActivity($scope.shakeInfo);
			}
			//$scope.getShakeinfo();
		}
		var error = function(result){
			
		}
		var url = '/weixin/web/weixinIndexController/getSession.action';
		http.post(url,$location.search(),success,error);
	}
	//$scope.getSession();
	/**
	 * 获取设备信息
	 */
	$scope.getShakeinfo = function(){
		var success = function(result){
			$scope.shakeInfo = result.data;
			$scope.getSession();
			if($scope.shakeInfo.me_state!='1'){
				$rootScope.showIonicPop("设备："+$scope.shakeInfo.me_num+"未激活",'',function(){WeixinJSBridge.call('closeWindow')});
				$rootScope.comLoading.stop();
				return;
			}
			if($scope.shakeInfo.me_shopid==undefined||$scope.shakeInfo.me_shopid==''){
				$rootScope.showIonicPop("设备："+$scope.shakeInfo.me_num+"未绑定店铺",'',function(){WeixinJSBridge.call('closeWindow')});
				$rootScope.comLoading.stop();
				return;
			}
		}
		var error = function(result){
			if($scope.shakeInfo.me_shopid==undefined||$scope.shakeInfo.me_shopid==''){
				$rootScope.showIonicPop("未查询到设备信息",'',function(){WeixinJSBridge.call('closeWindow')});
				$rootScope.comLoading.stop();
			}
		}
		var url = '/weixin/web/weixinIndexController/getShakeinfo.action';
		http.post(url,$location.search(),success,error);
	}
	$scope.getShakeinfo();
	
	$scope.getActivity = function(){
		var success = function(result){
			$scope.activityMain = result.data.activityMain;
			$scope.prizeList = result.data.prizeList;
			var prizeDesc = new Array();
			for(i in $scope.prizeList){
				if($scope.prizeList[i].mp_id)
					prizeDesc.push($scope.prizeList[i]);
			}
			prizeDesc.sort(function(a,b){
				return a.mp_sort-b.mp_sort});
			ruleObj[0]['content'].push(result.data.activityMain.mm_name);
			for(i in prizeDesc){
				if(prizeDesc[i].mp_id)
					ruleObj[1]['content'].push(prizeDesc[i].mp_level+":"+prizeDesc[i].mp_name);
			}
			var start = $scope.activityMain.mm_startime.substring(0,10).split("-");
			var end = $scope.activityMain.mm_endtime.substring(0,10).split("-");
			var starttime = start[0]+"年"+start[1]+"月"+start[2]+"日"
			var endtime = end[0]+"年"+end[1]+"月"+end[2]+"日"
			ruleObj[2]['content'].push(starttime+"~"+endtime);
			var msg = $scope.activityMain.mm_rule.split(/[;；]/);
			ruleObj[3]['content'] = msg;
			
			$scope.getDrawChange();
		}
		var error = function(result){
			$state.go('gameEnd');
		}
		var url = '/weixin/web/weixinActivityController/getActivityInfo.action';
		http.post(url,{shopid:$scope.shakeInfo.me_shopid,me_id:$location.search().me_id},success,error);
	}
	
	/**
	 * 获取抽奖数据信息
	 */
	$scope.getDrawChange = function(){
		var success = function(result){
			$scope.drawChanceNum = result.data;
		}
		var error = function(result){
			
		}
		var url = '/weixin/web/weixinActivityController/getDrawChange.action';
		http.post(url,$scope.activityMain,success,error);
	}
	
	$scope.auth = function(){
		var success = function(result){
			window.location.href = result.data;
		}
		var error = function(result){
			
		}
		var url = "/weixin/web/weixinIndexController/auth.action";
		var data = {
				wi_appid : $location.search().wi_appid,
				return_url : '&wi_appid='+$location.search().wi_appid+'&me_id='+$location.search().me_id+'&orgid='+$scope.shakeInfo.me_orgid
		};
		http.post(url,data,success,error);
	}
})

