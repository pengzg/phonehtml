tempApp.controller('ctr_giftList', function($scope,EzConfirm) {
	
	$scope.deleteGift = function(){
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			//console.log('删除')
		}, function() {
			//console.log('取消？')
		});
	}
})