tempApp.controller('ctr_bargainPreview', function($rootScope, $scope, http, $timeout, $state) {
    $scope.oriPrice = 10000;
    $scope.killedPrice = 2000;
    updatePercent();

    function updatePercent(){
	    $scope.percent = (1-$scope.killedPrice/$scope.oriPrice)*100;
    }

    $scope.word_back_img = '../../../img/mobile/bargain/bg2.png';
    $scope.$watch('showIdx',function(newVal){
        switch(newVal)
            {
            case 0:
                $scope.isEnd = false;
                break;
            case 1:
                $scope.isEnd = true;
            }
    });
})