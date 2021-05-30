tempApp.controller('ctr_cardCode', function($rootScope, $scope, http, $state) {
	$rootScope.isBottomTab = false;
	$scope.useNow = function(){
		$state.go('cardCode')
	}
	$scope.goMain = function(){
		$state.go('giftCard');
	}
	$scope.goSend = function(){
		$state.go('giftSend');
	}
	$scope.goDetail = function(){
		$state.go('cardInfo');
	}
})