tempApp.controller('ctr_twoDimensionCode', function($scope, $rootScope, $location,
		$state,$timeout) {
	
		$scope.ac_showHtml = {
    			show:false,
    			index: false,
    			warn_html:false
   		};
		//       	
    	$scope.demoPreview = function(){
    		$scope.ac_showHtml.show = true;
    		$scope.ac_showHtml.index= 1;
    	};

    	// 取消按钮
    	$scope.cancleBtnClick = function(){
    		$scope.ac_showHtml.show = false;
    		$scope.ac_showHtml.index = 0;
    	};

})