tempApp.controller('ctr_index', function($scope, $compile, $rootScope,
		$location, http, sessionFactory, Modules_Config, $state, messageFactory, EzConfirm) {
	
	$scope.shopid="";
	$scope.shopid = $rootScope.USER.shopId;
	$scope.showPwd = 0;
	$scope.passWord = "";
	console.log($scope.shopid);
	//查询菜单列表
	$scope.queryMenu = function(){
		var calbackFun = function(result){
			$scope.menu = result.data;
		}
		sessionFactory.getMenu(calbackFun);
	}
	
	$scope.queryMenu();
	
	$scope.selectMenu = function(sm_url){
		if(sm_url==undefined){
			sm_url='';
		}
		var url=$location.url();
		if(url.indexOf("/" + sm_url.replace('.','')+"/")>=0){
			return 'curimg';
		}
	} 

	/**
	 * 退出登录
	 */
	$scope.exitLogin = function() {
		var url = "/admin/login/loginControl/loginOut.action";
		var success = function(data) {
			sessionFactory.clearSession();
			$state.go("login");
		}
		var error = function(data) {

		}
		http.post(url, {}, success, error);
	}
	$scope.stateNow = $state.current.name;
	$scope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		$scope.stateNow = toState.name;
	})
	$scope.showMenu = function(menu){
		
		return $scope.stateNow.indexOf(menu)>=0;
	}
	
	$scope.selectFun= function(obj){
		if(obj.childMenus&&obj.childMenus.length>0){
			$state.go('index'+obj.sm_url+obj.childMenus[0].sm_url);
		}else if(obj.sm_url=='.activity.noreleasedList'){
			$state.go('index'+obj.sm_url,{mm_state:2});
		}else{
			$state.go('index'+obj.sm_url);
		}
	}

	$scope.showSelect = function(){
		alert(1111111111);
	}


	/**
	 * 得到店铺
	 */

	$scope.shopList = [];
	$scope.getShopList = function() {
	 // messageFactory.showLoading();
		var success = function(result) {
		$scope.shopList = result.data;
		$scope.getUserInfo();
		
		
			// messageFactory.closeLoading();
		}
		var error = function(result) {
			// messageFactory.closeLoading();
		}
		var url = "/admin/member/memberShopControl/queryAuthorityShopeList.action";
		http.post(url, {}, success, error); 
	}; 
	$scope.getShopList();
	



	$scope.changeShop = function(){
		console.log();
		var success = function(result) {
			$scope.getUserInfo();
			$state.go('index.homePage');
			// messageFactory.closeLoading();
		}
		var error = function(result) {
			// messageFactory.closeLoading();
		}
		var url = "/admin/login/loginControl/switchShop.action";
		http.post(url, {shopid:$("#shop-select").val()}, success, error); 
	};

	$scope.getUserInfo = function() {
		var url = "/admin/login/loginControl/getSessionInfo.action";
		var success = function(result) {
			$rootScope.USER = result.data;
			sessionStorage.USER = JSON.stringify(result.data);
			$scope.shopid = $rootScope.USER.shopId;
			
		}
		var error = function() {};
		http.post(url, {}, success, error);
	}

	$scope.changeS= function(x){
		console.log(x);
	};

	$scope.showPwdBox = function(type){
		$scope.showPwd = type;
	}

	/**
		 * 确认重置密码
		 */
		$scope.modifyPwdComplete = function(){
			$scope.passWord = $(".pass-box").val();
			if (!$scope.passWord) {
				messageFactory.showMessage('error',"请输入密码");
	    		return ;
			}
	    	var success = function(result){
				$scope.showPwdBox(0);
	    		messageFactory.closeLoading();
	    		messageFactory.showMessage('success',result.desc);
	    	}
	    	
	    	var error = function(result){
	    		messageFactory.showMessage('error',result.desc);
	    		messageFactory.closeLoading();
	    	}
	    	
			var msg = '您确定重置密码吗？';
				EzConfirm.create({
					heading : '提示',
					text : msg
				}).then(function() {
					messageFactory.showLoading();
					var url = '/admin/member/memberBaseWorkControl/resetPwd.action';
					http.post(url,{'mbw_id':$scope.USER.workid,'mbw_pwd':$scope.passWord}, success, error);
				}, function() {

				});
			
		}

})
