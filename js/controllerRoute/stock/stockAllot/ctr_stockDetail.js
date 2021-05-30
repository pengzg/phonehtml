tempApp.controller('ctr_stockDetail', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory) {
	//console.error($stateParams);
    if ($stateParams.eim_id != undefined) {
    	$scope.eim_id = $stateParams.eim_id;
    }
    
    /**
     * 详情
     */
    $scope.getDetail = function() {
    	messageFactory.showLoading();
		var success = function(result){
			$scope.vo = result.data;
			
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"eim_id":$scope.eim_id};
		var url = '/admin/erp/erpInoroutMainControl/getDetail.action';
		http.post(url,data,success,error);
    }
    
    if ($scope.eim_id) {
    	$scope.getDetail($scope.eim_id);
    }
	
	$scope.startViewer = function(){
		$('#viewer').viewer();
	}
})