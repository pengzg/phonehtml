tempApp.controller('ctr_baseSetting', function($scope,dateUtil,messageFactory,http,$state,EzConfirm,$rootScope) {
	
	 /**
     *  得到公司信息
     */
    $scope.getCompanyinfo = function() {
        var success = function(result) {
        	$scope.requireGoodsReceive = result.data.requireGoodsReceive;
            $scope.vo = result.data;
        }
        var error = function(result) {

        }
        var url = "/admin/base/BaseOrgIniterControl/getCompanyInfo.action";
        http.post(url, {"shopid":$rootScope.USER.shopId}, success, error);
    }
	
    $scope.getCompanyinfo();

	
    
	$scope.save = function(){
		$scope.vo.shopid = $rootScope.USER.shopId;
		
		var success = function(result){
			messageFactory.showMessage('success',"操作成功");
			$scope.getCompanyinfo();
			return;
		}
		
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		
		
		var message = "您确定提交吗？";
		
		EzConfirm.create({
			heading : '提示',
			text : message 
		}).then(function() {
			var url = "/admin/base/BaseOrgIniterControl/update.action";
			http.post(url,$scope.vo,success,error);
		}, function() {
		});
	}
})