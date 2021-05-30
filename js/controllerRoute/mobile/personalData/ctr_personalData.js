tempApp.controller('ctr_personalData', function($rootScope, $scope, http, $state,$window) {
	
	$window.wx.hideOptionMenu();   // 隐藏微信菜单 
	 /**
     * 获取用户信息 
     */
    $scope.getUserInfo=function(){
    	
    	var success = function(result){
			$scope.user = result.data;
		};
		var error = function(result){
			
		};
		var url = '/weixin/web/weixinIndexController/getSession.action';
		http.post(url,null,success,error);
    }
    $scope.getUserInfo();
    
	
	 
})