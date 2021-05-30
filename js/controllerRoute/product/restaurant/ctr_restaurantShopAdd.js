tempApp.controller('ctr_restaurantShopAdd', function($scope, $rootScope, $location,
    $state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory,$rootScope) {
$scope.imgsize = ['','750*370，50kb以内','','1119*1080，2M以内','1920*1080，4M以内'];
if ($stateParams.rs_id) {
    $scope.rs_id = $stateParams.rs_id;
}
$scope.today = dateUtil.getDate2();
$scope.vo = {"rs_dr":1,"rs_checkstate":1,'rs_type':2,"rs_target_type":1,"rs_sort":1,"rs_start":$scope.today,"rs_end":$scope.today,"rs_location":1};
$scope.shopid=$rootScope.USER.shopId;
$scope.getDetail = function(){
    var success = function(result){
        $scope.vo = result.data;
        $("#start_time").val($scope.vo.rs_start +" 至  "+$scope.vo.rs_end);
        $('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
            $scope.vo.rs_start = start.format('YYYY-MM-DD');
            $scope.vo.rs_end = end.format('YYYY-MM-DD');
            $scope.$apply();
        });
    }
    var error = function(result){
        messageFactory.closeLoading();
    }

    var url = '/admin/restaurant/restaurantShopControl/getDetail.action';
    http.post(url,{"rs_id":$scope.rs_id},success,error);
}

if ($scope.rs_id) {
    $scope.getDetail();
}




$("#start_time").val($scope.vo.rs_start +" 至  "+$scope.vo.rs_end);
$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    $scope.vo.rs_start = start.format('YYYY-MM-DD');
    $scope.vo.rs_end = end.format('YYYY-MM-DD');
    $scope.$apply();
});


/**
 * 保存
 */
$scope.submit = function(){
    
    if( $scope.vo.rs_cover==undefined || $scope.vo.rs_cover==""){
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
        var url = "/admin/restaurant/restaurantShopControl/update.action";
        http.post(url,$.extend({},$scope.vo),success,error);
    }, function() {

    });
}

// 返回
$scope.goBack = function(){
    
    $state.go("index.product.restaurantShop");
    
}

$scope.upImage = function($event) {
    $scope.ue_myeditor.addListener("beforeInsertImage",
        function(t, arg) {
            var imgs = "";
            if (arg.length > 0) {
                imgs = arg[0].src;
            }
            var imgsArr = imgs.split(",");
            $scope.vo.rs_cover_show = imgsArr[0]
                    .split("|")[0].replace(
                    "m.shequkuaixian.com",
                    "imgtest.sqkx.net");
            $scope.vo.rs_cover = imgsArr[0]
                    .split("|")[0]
                    .split("static/upload/image")[1];
        }
    );
    var myImage = $scope.ue_myeditor
            .getDialog("insertimage");
    myImage.open();
};



$scope.updateLocation = function(){
    $scope.vo.rs_lng = $("#selectlng").val();
    $scope.vo.rs_lat = $("#selectlat").val();
    $scope.mapShow = false;
};

})