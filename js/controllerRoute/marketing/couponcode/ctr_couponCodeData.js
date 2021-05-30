tempApp.controller('ctr_couponCodeData', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    $scope.goCouponList = function(){
        
        $state.go('index.marketing.couponcodelist',{});
        
    }
   
})