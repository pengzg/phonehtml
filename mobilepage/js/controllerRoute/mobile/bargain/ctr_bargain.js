tempApp.controller('ctr_bargain', function($rootScope, $scope, http, $timeout, $state) {

    window.sessionStorage.gameState = 'bargain';
    
    $rootScope.comLoading.show();
    var rules = new Array();
    rules.push('1. 腾讯公司规定：累计红包金额超过1元，方可提现；红包由“社区快线”');
    rules.push('2. 在社区快线服务号推送微信红包后，消费者需在24小时内领取，过期视为消费者自愿放弃领取；');
    rules.push('3. 活动咨询：400-688-4399；');
    rules.push('4. 社区快线保留法律范围允许的对活动的解释权。');

    $scope.showRule = function() {
        $rootScope.popSuccess.show(rules, true)
    }

    var rules2 = new Array();
    rules2.push('砍价排行：');
    rules2.push('  第一名-- 张三：200元');
    rules2.push('  第二名-- 李四：199元');
    rules2.push('  第三名-- 王五：100元');
    

    $scope.showRanking = function() {
        $rootScope.popSuccess.show(rules2, true)
    }

    $scope.oriPrice = 10000;
    $scope.killedPrice = 2000;
    updatePercent();
    $scope.bargaining = (function(){
	    var times = 3;
    	return function(){
    		if(times==0){
    			$rootScope.popSuccess.show('砍价机会已用完')
    			return
    		}
    		times--;
    		$scope.killedPrice += 1000;
    		updatePercent();
    		$rootScope.popSuccess.show('砍掉：1000元')
    	}
    })()

    function updatePercent(){
	    $scope.percent = (1-$scope.killedPrice/$scope.oriPrice)*100;
    }

})