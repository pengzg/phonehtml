tempApp.controller('ctr_giftHistory', function($rootScope, $scope, http, $state, $timeout,$ionicScrollDelegate) {
    $rootScope.isBottomTab = false;

    $scope.haveMore = true;//是否有更多数据
    $scope.goSend = function() {
        event.stopPropagation();
        $state.go('giftSend');
    }

    $scope.do_refresher = function() {
        $timeout(function() {
            $scope.items = new Array(6);
            $scope.haveMore = true;
            $scope.$broadcast('scroll.refreshComplete');
        }, 1000);
    }
    $scope.items = new Array(6);
    $scope.loadMore = function() {
        $timeout(function() {
        	if($scope.haveMore){
        		$scope.haveMore = false;
        	}else{
        		return;
        	}
            var lengths = $scope.items.length + 5;
            $scope.items = new Array(lengths)
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 1000);
    };

    $scope.$on('$stateChangeSuccess', function() {
        $scope.$broadcast('scroll.infiniteScrollComplete');
    });

    $scope.goTop = function(){
        $ionicScrollDelegate.scrollTop();
    }

    $scope.goDetail = function(){
        $state.go('cardDetail')
    }
})