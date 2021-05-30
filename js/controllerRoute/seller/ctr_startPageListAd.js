tempApp.controller('ctr_startPageListAd', function($scope,EzConfirm) {
    $scope.pager = {page:1,rows:'10',sort:'su_createdatetime',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
    $scope.deleteSeller = function(){
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			//console.log('删除')
		}, function() {
			//console.log('取消？')
		});
	}
	$scope.offSell = function(){
		EzConfirm.create({
			heading : '提示',
			text : '确认下架吗？'
		}).then(function() {
			//console.log('删除')
		}, function() {
			//console.log('取消？')
		});
	}
})