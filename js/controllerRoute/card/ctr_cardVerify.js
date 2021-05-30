tempApp.controller('ctr_cardVerify', ['$scope','EzConfirm','messageFactory','$state',
	function($scope,EzConfirm,messageFactory,$state) {

	$scope.pager = {page:1,rows:'10',sort:'mmu_ts',order:'desc',pageList:['10','20','30']};
	/**
	 * 删除
	 */
	$scope.del = function(x){
		var success = function(result){
			$scope.queryList();
			messageFactory.showMessage('success',"删除成功");
		};
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			
		};
		EzConfirm.create({
			heading : '提示',
			text : "您确定删除吗？"
		}).then(function() {
			var url = "/admin/member/memberManagerUserControl/delete.action";
			// http.post(url,$.extend({'mmu_id':x.mmu_id},$scope.vo),success,error);
		}, function() {
			messageFactory.activityBtn();
		});
	}
	$scope.add = function(){
		$state.go('index.card.cardDetail');
	}

	$scope.detail = function(){
		$state.go('index.card.cardView');
	}
}])