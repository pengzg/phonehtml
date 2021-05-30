tempApp.controller('ctr_getCash', function($rootScope, $scope,http,$timeout,$state) {
	$scope.getCash = function(){
		$rootScope.popSuccess.show('提现成功')
	}
  
  var rules = new Array();
  rules.push('1. 腾讯公司规定：累计红包金额超过1元，方可提现；红包由“社区快线”');
  rules.push('2. 在社区快线服务号推送微信红包后，消费者需在24小时内领取，过期视为消费者自愿放弃领取；');
  rules.push('3. 活动咨询：400-688-4399；');
  rules.push('4. 社区快线保留法律范围允许的对活动的解释权。');

  $scope.showRule = function(){
  	$rootScope.popSuccess.show(rules,true)
  }

  $scope.goCashList = function(){
    $state.go('cashList');
  }
})

