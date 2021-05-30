tempApp.controller('ctr_egg', ['$rootScope', '$scope','$timeout',
	function($rootScope, $scope,$timeout) {
	
	$rootScope.isBottomTab = false;
	$rootScope.tabsCheck = 1;
	$scope.timeLeft = 3;

	$scope.onRefresh = function() {
        $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
            $timeout(function(){
                $rootScope.videoPop.show('南方黑芝麻联合社区盒子摇一摇，抽好礼！轻脂饮品黑黑乳，营养无负担！');
            },200)
        }, 500);
    }
    /**
     * ng-repeat加载完成
     * @DateTime 2018-01-05
     * @return   {[type]}
     */
	$scope.eggFinish = function(){

		/**
		 * 绑定金蛋点击事件
		 * @DateTime 2018-01-05
		 * @return   {[type]}
		 */
		$('#center>.egg>.egg-img').click(function(){
			if($scope.timeLeft<=0){
				$rootScope.showIonicPop("您的机会已经用完",'提示');
				return
			}
			$scope.timeLeft--;
			$scope.$apply();
			var that = $(this);
			var animationend = 'animationend webkitAnimationEnd oAnimationEnd';
			//蛋碎动画结束
			that.children('#crack').on(animationend,function(){
				that.removeClass('shakeEgg');
				that.children('#crack').removeClass('crack-height');
				that.hide();
				//这里是随便判断的 模拟中奖未中奖
				if($scope.timeLeft==1){
					//中奖
					that.siblings('.award').show();
					$rootScope.showIonicPop("恭喜获得iPhoneX",'中奖啦');
				}else{
					//未中奖
					that.siblings('.fail').show();
				}
			})
			//摆动动画结束
			that.on(animationend,function(){
				//蛋碎
				that.children('#crack').addClass('crack-height');
			})
			//蛋摆动
			that.addClass('shakeEgg');

		})
	}
}])

