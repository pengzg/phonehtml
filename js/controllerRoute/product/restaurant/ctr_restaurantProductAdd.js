tempApp.controller('ctr_restaurantProductAdd', function($scope, $rootScope, $location,
    $state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory,$rootScope) {
$scope.imgsize = ['','750*370，50kb以内','','1119*1080，2M以内','1920*1080，4M以内'];
if ($stateParams.rsp_id) {
    $scope.rsp_id = $stateParams.rsp_id;
}


$scope.vo = {"rsp_dr":1,"rsp_checkstate":1,'rsp_type':2,"rsp_sort":1};
$scope.shopid=$rootScope.USER.shopId;


/**
 * 查询数据
 */
$scope.rsList = "";
$scope.rspager = {page:1,rows:'100',sort:'rs_ts',order:'desc',pageList:['10','20','30'],rs_shopid:$rootScope.USER.shopId};
$scope.queryRsList = function(){
    messageFactory.showLoading();
    var success = function(result){
        $scope.rsList = result.data.rows;
        messageFactory.closeLoading();
    }
    var error = function(result){
        messageFactory.closeLoading();
    }
    var url = '/admin/restaurant/restaurantShopControl/dataGrid.action';
    http.post(url,$.extend({}, $scope.rspager, $scope.searchParam),success,error);
}
$scope.queryRsList();



$scope.getDetail = function(){
    var success = function(result){
        $scope.vo = result.data;
      
    }
    var error = function(result){
        messageFactory.closeLoading();
    }

    var url = '/admin/restaurant/restaurantShopProductControl/getDetail.action';
    http.post(url,{"rsp_id":$scope.rsp_id},success,error);
}

if ($scope.rsp_id) {
    $scope.getDetail();
}



/**
 * 保存
 */
$scope.submit = function(){
    
    if( $scope.vo.rsp_cover==undefined || $scope.vo.rsp_cover==""){
        messageFactory.showMessage('error','请上传图片');
        return;
    }
    
    
    var success = function(result){
        messageFactory.showMessage('success','提交成功');
        $scope.goBack();
    }
    var error = function(result){
        messageFactory.showMessage('error',result.desc);
    }

    EzConfirm.create({
        heading : '提示',
        text : "您确定提交吗？"
    }).then(function() {
        var url = "/admin/restaurant/restaurantShopProductControl/update.action";
        http.post(url,$.extend({},$scope.vo),success,error);
    }, function() {

    });
}

// 返回
$scope.goBack = function(){
    
    $state.go("index.product.restaurantProduct");
    
}

$scope.upImage = function($event) {
    $scope.ue_myeditor.addListener("beforeInsertImage",
        function(t, arg) {
            var imgs = "";
            if (arg.length > 0) {
                imgs = arg[0].src;
            }
            var imgsArr = imgs.split(",");
            $scope.vo.rsp_cover_show = imgsArr[0]
                    .split("|")[0].replace(
                    "m.shequkuaixian.com",
                    "imgtest.sqkx.net");
            $scope.vo.rsp_cover = imgsArr[0]
                    .split("|")[0]
                    .split("static/upload/image")[1];
        }
    );
    var myImage = $scope.ue_myeditor
            .getDialog("insertimage");
    myImage.open();
};




		/**
	 * 显示位置列表
	 */
	$scope.reList = [];
	$scope.queryReList = function(){
	  var success = function(result){
		$scope.reList = result.data;
		// $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
	  }
	  var error = function(result){
		  messageFactory.closeLoading();
		  messageFactory.showMessage('error',result.desc);
	  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2203';
		http.post(url,null,success,error);
	}
	$scope.queryReList();


})