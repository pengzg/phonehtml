tempApp.controller('ctr_homePage', function($scope, $rootScope, $location,
		$state,$timeout,http) {
	
	
	 $scope.getUserInfo = function() {
         var url = "/admin/login/loginControl/getSessionInfo.action";
         var success = function(result) {
             $rootScope.USER = result.data;
             $state.go('index.homePage');
         }
         var error = function() {};
         http.post(url, {}, success, error);
     }
	
	 $scope.getUserInfo();
	 
	 $scope.goPromotion = function(){
		 $state.go("index.marketing.promotionGoods");
	 }
	 
	 $scope.goOrder = function(){
		 $state.go("index.order.orderList");
	 }
	 
	 $scope.goProduct = function(){
		 $state.go("index.product.productList");
	 }
	 
	 $scope.goMember = function(){
		 $state.go("index.user.userList");
	 }

})