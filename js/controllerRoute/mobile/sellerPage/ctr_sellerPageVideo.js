tempApp.controller('ctr_sellerPageVideo', ['$scope','$rootScope','$state','$timeout',
	function($scope,$rootScope,$state,$timeout) {

	var latitude = 0; // 纬度，浮点数，范围为90 ~ -90
    var longitude = 0; // 经度，浮点数，范围为180 ~ -180。
    if($rootScope.wxReady){
    	// afterReady();
    }else{
	    $scope.$on('wxReady', function() {
	    	// afterReady();
	    });
    }

    function afterReady(){
        window.wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function(res) {
                latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            }
        });

        $scope.goMap = function(){
        	wx.openLocation({
				latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
				longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
				name: '华联超市', // 位置名
				address: '朝阳路13号1102', // 地址详情说明
				scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
				// infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
			});
        }
    }

    $scope.onRefresh = function(){
        $timeout(function() {
            $scope.$broadcast('scroll.refreshComplete');
            $timeout(function(){
                $state.reload();
            },500)
        }, 500);
    }
}])