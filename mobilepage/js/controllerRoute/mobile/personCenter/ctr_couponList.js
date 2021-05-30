tempApp.controller('ctr_couponList', function($rootScope, $scope,http,$timeout,$log) {
	

  $scope.do_refresher = function(){
    $timeout(function(){
      $scope.items = new Array(5);
      $scope.$broadcast('scroll.refreshComplete');  
    },1000);
  }

  $scope.items = new Array(5);
  $scope.loadMore = function() {
    $timeout(function(){
    		var lengths = $scope.items.length+5;
        $scope.items = new Array(lengths)
			  $scope.$broadcast('scroll.infiniteScrollComplete');
		},1000);
  };

  $scope.$on('$stateChangeSuccess', function() {
  	$log.log('stateChangeSuccess')
    $scope.$broadcast('scroll.infiniteScrollComplete');
  });
  
})

