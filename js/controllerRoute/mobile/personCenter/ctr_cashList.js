tempApp.controller('ctr_cashList', function($rootScope, $scope,http,$timeout) {
	
  $scope.do_refresher = function(){
    $timeout(function(){
      $scope.items = new Array(10);
      $scope.$broadcast('scroll.refreshComplete');  
    },1000);
  }

  $scope.items = new Array(10);
  $scope.loadMore = function() {
    $timeout(function(){
    		var lengths = $scope.items.length+10;
        $scope.items = new Array(lengths)
			  $scope.$broadcast('scroll.infiniteScrollComplete');
		},1000);
  };

  $scope.$on('$stateChangeSuccess', function() {
    $scope.$broadcast('scroll.infiniteScrollComplete');
  });
  
})

