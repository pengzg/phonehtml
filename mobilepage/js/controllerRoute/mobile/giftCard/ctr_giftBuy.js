tempApp.controller('ctr_giftBuy', function($rootScope, $scope, http, $state, $ionicPopup) {
    $rootScope.isBottomTab = false;

    $scope.picCheck = 0; //选中图片
    $scope.picList = new Array();
    $scope.picList.push({ src: '../../img/mobile/giftCard/pic1.png' });
    $scope.picList.push({ src: '../../img/mobile/giftCard/pic2.png' });
    $scope.picList.push({ src: '../../img/mobile/giftCard/pic4.png' });

    $scope.moneyList = new Array();
    $scope.moneyList.push({ price: 50, type: '中秋卡', num: 0 });
    $scope.moneyList.push({ price: 100, type: '中秋卡', num: 0 });
    $scope.moneyList.push({ price: 200, type: '中秋卡', num: 0 });
    $scope.moneyList.push({ price: 300, type: '中秋卡', num: 0 });
    $scope.moneyList.push({ price: 400, type: '中秋卡', num: 0 });
    $scope.moneyList.push({ price: 500, type: '中秋卡', num: 0 });
    $scope.moneyList.push({ price: 666, type: '中秋卡', num: 0 });
    $scope.moneyList.push({ price: 888, type: '中秋卡', num: 0 });

    $scope.totalNum = 0;
    $scope.totalMoney = 0;
    $scope.plus = function(x) {
        x.num++;
        getTotal();
    }
    $scope.minus = function(x) {
        if (x.num == 0) {
            return;
        }
        x.num--;
        getTotal();
    }

    function getTotal() {
        $scope.totalNum = 0;
        $scope.totalMoney = 0;
        angular.forEach($scope.moneyList, function(item, i) {
            $scope.totalNum += item.num;
            $scope.totalMoney += item.price * item.num;
        })
    }
    $scope.buy = function() {
        var alertPopup = $ionicPopup.alert({
            title: '购买成功',
            template: '<div style="text-align:center;">卡券可以赠送好友哦！</div>',
            okText: '确认',
            okType: 'button-balanced common-btn-radius' // String (默认: 'button-positive')。OK按钮的类型。
        });
        alertPopup.then(function(res) {
            $state.go('giftHistory');
        });
    }

    $scope.send = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: '购买成功',
            template: '<div style="text-align:center;">是否立即赠送给好友？</div>',
            cancelText: '取消', // String (默认: 'Cancel')。一个取消按钮的文字
            cancelType: 'button-default common-btn-radius',
            okText: '确认', // String (默认: 'OK')。OK按钮的文字。
            okType: 'button-balanced common-btn-radius', // String (默认: 'button-positive')。OK按钮的类型。
        });
        confirmPopup.then(function(res) {
            if (res) {
                $state.go('giftSend')
            } else {
                $state.go('giftHistory');
            }
        });
    }
})