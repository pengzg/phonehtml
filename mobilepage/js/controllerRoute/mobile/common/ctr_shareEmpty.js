tempApp.controller('ctr_shareEmpty', function($scope,http,$stateParams,$rootScope) {
	$rootScope.isBottomTab = false;
	location.href = decodeURIComponent($stateParams.callback_url);
})

