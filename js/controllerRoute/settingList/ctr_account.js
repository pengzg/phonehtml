tempApp.controller('ctr_setting_account', function($scope, $rootScope, $location,$state) {
	$scope.account = {};
	$scope.save = function(){
		$rootScope.settingMod.show('账户设置','保存成功',3000, function(){
			//console.log(123)
		});
	}
})