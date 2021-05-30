tempApp.controller('ctr_giftCard', function($rootScope, $scope, http, $state) {
	$rootScope.isBottomTab = false;
	$scope.goBuy = function(){
		$state.go('giftBuy');
	}
	$scope.goHistory = function(){
		$state.go('giftHistory');
	}
})