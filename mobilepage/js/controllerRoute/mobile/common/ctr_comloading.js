tempApp.controller('ctr_comloading', function($scope,http,$rootScope,$location,$state,$timeout) {
	$rootScope.isBottomTab = false;
	$scope.leftTime = 8;//剩余秒数
	
	$scope.jump = function(){
		
	}
	
	/*$scope.auth = function(){
		var success = function(result){
			window.location.href = result.data;
		}
		var error = function(result){
			
		}
		var url = "/weixin/web/weixinIndexController/auth.action";
		var data = {
				ticket : $location.search().ticket,
				wi_appid : $location.search().wi_appid,
				return_url : $location.search().return_url
		};
		http.post(url,data,success,error);
	}
	$scope.auth();*/
	var timeStart = new Date().getTime();
	var timeWait = 3;//最快3秒 后跳转，如果接口未返回则等待接口返回 
	$scope.getShakeInfo = function(){
		var success = function(result){
			$scope.shake = result.data;
			if($scope.shake.me_state!='1'){
				$rootScope.showIonicPop("设备："+$scope.shake.me_num+"未激活",'',function(){WeixinJSBridge.call('closeWindow')});
				return;
			}
			if($scope.shake.me_shopid==undefined||$scope.shake.me_shopid==''){
				$rootScope.showIonicPop("设备："+$scope.shake.me_num+"未绑定店铺",'',function(){WeixinJSBridge.call('closeWindow')});
				return;
			}
			var timeNow = new Date().getTime();
			var timePass = timeNow-timeStart;//用时
			var timeLeft = timeWait*1000 - timePass;//剩余时间
			if($scope.shake.me_id){
				window.sessionStorage.hasGame = true;
			}
			//超时 直接跳转
			if(timeLeft<0){
				$state.go('squared',{me_id:$scope.shake.me_id,wi_appid:$location.search().wi_appid,openid:$scope.shake.openid});
			}
			//未超时 等待跳转
			else{
				$timeout(function(){
					$state.go('squared',{me_id:$scope.shake.me_id,wi_appid:$location.search().wi_appid,openid:$scope.shake.openid});
				},timeLeft)
			}
		}
		var error = function(result){
			$rootScope.showIonicPop("该链接已失效",'',function(){WeixinJSBridge.call('closeWindow')});
		}
		var url = "/weixin/web/weixinIndexController/getShake.action";
		var data = {
				ticket : $location.search().ticket,
				wi_appid : $location.search().wi_appid
		};
		http.post(url,data,success,error);
	}
	$scope.getShakeInfo();
})

