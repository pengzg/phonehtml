tempApp.controller('ctr_personCenter', function($rootScope, $scope,
		http, $timeout,$ionicLoading,$state,$location) {
    $rootScope.isBottomTab = true;
    //登录用户
    $scope.user = {};
    $scope.items = [];
    var removeItem = function(item, button) {
        $ionicActionSheet.show({
            buttons: [],
            destructiveText: 'Delete Task',
            cancelText: 'Cancel',
            cancel: function() {
                return true;
            },
            destructiveButtonClicked: function() {
                $scope.items.splice($scope.items.indexOf(item), 1);
                return true;
            }
        });
    };

    var completeItem = function(item, button) {
        item.isCompleted = true;
    };

    $scope.onReorder = function(el, start, end) {
        ionic.Utils.arrayMove($scope.items, start, end);
    };

    $scope.onRefresh = function() {
       $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
            $timeout(function(){
                $state.reload();
            },600)
        }, 500);
    }


    $scope.removeItem = function(item) {
        removeItem(item);
    };

    $scope.newTask = function() {
        $scope.settingsModal.show();
    };

    // Create the items
    for (var i = 0; i < 25; i++) {
        $scope.items.push({
            title: 'Task ' + (i + 1),
            buttons: [{
                text: 'Done',
                type: 'button-success',
                onButtonClicked: completeItem,
            }, {
                text: 'Delete',
                type: 'button-danger',
                onButtonClicked: removeItem,
            }]
        });
    }

    // $scope.show = function() {
    //     $ionicLoading.show({
    //       template: '<ion-spinner icon="bubbles" class="spinner-balanced"></ion-spinner>',
    //       duration: 2000
    //     });
    //   };
    //   console.log($ionicLoading.show)
    // $scope.hide = function(){
    //     $ionicLoading.hide();
    // };

    //   $scope.show()
    
    $scope.goCash = function(){
        $state.go('getCash');
    }
    $scope.goCashList = function(){
        $state.go('cashList');
    }
    $scope.goPrize = function(){
        $state.go('prizeList');
    }
    $scope.goCoupon = function(){
        $state.go('couponList');
    }
    $scope.goData = function(){
        $state.go('personalData');
    }
    $scope.goCards = function(){
        $state.go('giftHistory')
    }
    
    /**
     * 获取用户信息 
     */
    $scope.getUserInfo=function(){
    	
    	var success = function(result){
			$scope.user = result.data;
		};
		var error = function(result){
			
		};
		var url = '/weixin/web/weixinIndexController/getSession.action';
		http.post(url,$location.search(),success,error);
    }
    $scope.getUserInfo();
    
})