tempApp.controller('ctr_couponCodeList', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {


    $scope.goAdd = function(){
        var url = "";
        url = $state.href('index.marketing.couponcodeadd',{});
        window.open(url,'_blank');
    }

    $scope.goCouponData = function(){
        var url = "";
        url = $state.href('index.marketing.couponcodedata',{});
        window.open(url,'_blank');
    }
    
})