tempApp.controller('ctr_prizeList', ['$rootScope', '$scope', '$timeout', '$ionicPopup', '$state', 'http', '$window','$ionicScrollDelegate',
    function($rootScope, $scope, $timeout, $ionicPopup, $state, http, $window,$ionicScrollDelegate) {

        $scope.pager = { page: 1, rows: '10', sort: 'mw_winningtime', order: 'desc', pageList: ['10', '20', '30'] };
        $scope.items = [];
        $scope.mw_state = '';
        $scope.user = {};
        $scope.do_refresher = function() {
            //console.log('refresh')
            $timeout(function() {
                $scope.pager.page = 1;
                $scope.$broadcast('scroll.refreshComplete');
                $scope.items = [];
                $scope.getPrizeList();
            }, 1000);
        }

        $scope.loadMore = function() {
            //console.log('loadMore')
            $timeout(function() {
            	if($scope.items.length< $scope.pager.rows){
            		return;
            	}
                $scope.pager.page = parseInt($scope.pager.page) + 1;
                $scope.getPrizeList();
            }, 1000);
        };

        $scope.$on('$stateChangeSuccess', function() {
            //console.log('stateChangeSuccess')
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });



        /**
         * 获取用户信息 
         */
        $scope.getPrizeUserInfo = function() {

            var success = function(result) {
                $scope.user = result.data;
            };
            var error = function(result) {

            };
            var url = '/weixin/web/weixinIndexController/getSession.action';
            http.post(url, null, success, error);
        }
        $scope.getPrizeUserInfo();

        /**
         * 获取该用户的奖品列表 
         */
        $scope.getPrizeList = function() {

            var success = function(result) {
                $scope.dataList = result.data;
                $scope.items = $scope.items.concat($scope.dataList);
            };
            var error = function(result) {

            };
            var url = '/weixin/web/weixinActivityPrizeController/dataGrid.action';
            http.post(url, $.extend({'mw_state':$scope.mw_state}, $scope.pager), success, error);
        }
        $scope.getPrizeList();
        $scope.loadFinish = function() {
            $scope.$broadcast('scroll.refreshComplete');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
        $scope.goCheck = function(x) {
            $state.go('mverification', { 'mw_id': x.mw_id });
            $rootScope.comShare.hide();
        }
        
        $scope.goTop = function(){
            $ionicScrollDelegate.scrollTop();
        }
        /**
         * 选择状态 
         */
        $scope.choseState=function(state){
        	$scope.mw_state=state;
        	$scope.items = [];
        	$scope.pager.page=1;
        	$scope.getPrizeList();
        }
    }
])