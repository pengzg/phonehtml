tempApp.controller('ctr_createMiniQrcode', ['$scope','dateUtil','messageFactory','http','$state','EzConfirm','activityFactory','$rootScope',
function($scope,dateUtil,messageFactory,http,$state,EzConfirm,activityFactory,$rootScope) {
  $scope.pager = {page:1,rows:'20',sort:'ppm_sort DESC, ppm_addtime',order:'desc',pageList:['10','20','30'],ppm_shopid:$rootScope.USER.shopId};

	$scope.today = dateUtil.getDate2();
	$scope.showType = 1;//1:发布 2：暂存 3：取消发布
    $scope.qrcodePath = "";
	$scope.showInForm = true;// true:表格显示 false: 块状显示
	$scope.searchParam = {"ppm_state":""};
    $scope.path  = "";
    $scope.scene = "";

	$scope.createQrcode = function(x,state) {

        if (!$scope.path) {
            messageFactory.showMessage('error', "路径不能为空");
			return false;
        }

        var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.qrcodePath = result.data;
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var url = "/admin/order/orderMainControl/getMiniQrcode.action";
		var	msg = '您确定要生成二维码吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, {path:$scope.path,scene:$scope.scene,fullPath:"1"}, success, error);
		}, function() {

		});
    }
}])