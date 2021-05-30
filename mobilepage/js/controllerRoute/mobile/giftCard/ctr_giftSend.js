tempApp.controller('ctr_giftSend', function($rootScope, $scope, http, $state,$ionicPopup) {
	$rootScope.isBottomTab = false;

	$scope.upload = function(){
		document.getElementById("fileInput").click();
	}
	$scope.send = function(){
		var alertPopup = $ionicPopup.alert({
            title: '赠送成功',
            template: '<div style="text-align:center;">可以到我的礼品卡中查看哦！</div>',
            okText: '确认',
            okType: 'button-balanced common-btn-radius' // String (默认: 'button-positive')。OK按钮的类型。
        });
        alertPopup.then(function(res) {
            $state.go('giftCard');
        });
	}
})