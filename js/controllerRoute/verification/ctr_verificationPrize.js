tempApp.controller('ctr_verificationPrize', function($scope,
		messageFactory,http,EzConfirm) {
    
    
    // $('#myModal').modal('hide');
	/**
	 * 搜索
	 */
    $scope.searchByCode = function(){
    	
    	if(!$scope.searchCode){
    		messageFactory.showMessage('error',"请输入中奖编码！");
    		return;
    	}
    	
    	var success = function(result){
			$scope.winningData = result.data;
			$('#myModal').modal('show');
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
    	var url = "/admin/activity/marketingWinningControl/getDetailByCode.action";
		http.post(url,{'mw_prizecode':$scope.searchCode},success,error);
    	
    	
    }
    /**
     * 核销
     */
    $scope.checkWinning = function(id){
    	
    	var success = function(result){
    		messageFactory.showMessage('success',"成功");
			$('#myModal').modal('hide');
			$scope.searchCode = "";
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		EzConfirm.create({
			heading : '提示',
			text : "您确定核销吗？"
		}).then(function() {
			var url = "/admin/activity/marketingWinningControl/checkWinning.action";
			http.post(url,{'mw_id':id},success,error);
		}, function() {
			messageFactory.activityBtn();
		});
    	
    }
    
	    
})