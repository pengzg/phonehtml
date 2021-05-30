tempApp.controller('ctr_weixinPageAdd', function($scope,$rootScope,$state,$stateParams,http,messageFactory,EzConfirm) {
	$scope.vo = {};
	
	if($stateParams.wsp_id != ''){
		messageFactory.showLoading();
		var success = function(result){
			$scope.vo = result.data;
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/base/weixinShakePageControl/getDetail.action';
		http.post(url,{'wsp_id':$stateParams.wsp_id},success,error);
	}
	/**
	 * 添加
	 */
	$scope.addEnter = function(){
		messageFactory.showLoading();
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			messageFactory.closeLoading();
			if($scope.vo.wsp_icon_url == null || $scope.vo.wsp_icon_url == ''){
				messageFactory.showMessage('error',"请添加显示图片！");
				return;
			}else if($scope.vo.wsp_page_url == null || $scope.vo.wsp_page_url == ''){
				messageFactory.showMessage('error',"请添加跳转页面！");
				return;
			}else if($scope.vo.wsp_title == null || $scope.vo.wsp_title == ''){
				messageFactory.showMessage('error',"请添加标题！");
				return;
			}else if($scope.vo.wsp_description == null || $scope.vo.wsp_description == ''){
				messageFactory.showMessage('error');
				return;
			}    
		};
		
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/base/weixinShakePageControl/update.action';
		http.post(url,$scope.vo,success,error);
	}
	
	
	
	/**
	 * 返回
	 */
	$scope.backList = function(){
		$state.go('index.seller.weixinPage');
	}
    
})