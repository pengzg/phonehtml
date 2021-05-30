tempApp.controller('ctr_promotionCutDetail', function($scope, $rootScope, $location,
    $state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory,$rootScope) {
$scope.promotion = {};
$scope.checkedAreas = "";
$scope.dataList = [{}];
$scope.dataList2 = [{}];	
$scope.today = dateUtil.getDate2()+" 至  "+dateUtil.getDate2();
$scope.priceTypeList = [{"bd_code":1,"bd_name":"砍至指定金额"},{"bd_code":2,"bd_name":"任意金额可以购买"}]

$scope.vo = {pc_dr:1,"pc_type":1, "pc_price_type":1, "pc_number":1,"pc_attendance":1,"pc_total":20, "pc_valid_day":1, "pc_state":2};
$scope.vo.pc_startdate = $scope.vo.pc_enddate = dateUtil.getDate2();
$("#start_time").val($scope.today);
$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    $scope.vo.pc_startdate = start.format('YYYY-MM-DD');
    $scope.vo.pc_enddate = end.format('YYYY-MM-DD');
    $scope.$apply();
});
$scope.goods_type = 1;


if ($stateParams.pc_id != undefined) {
    $scope.pc_id = $stateParams.pc_id;
}

/**
     * 详情
     */
	$scope.getDetail = function () {
		messageFactory.showLoading();
		var success = function (result) {
			$scope.vo = result.data;
			$scope.today = $scope.vo.pc_startdate+"至"+$scope.vo.pc_enddate;
            $("#start_time").val($scope.today);
            messageFactory.closeLoading();
		};
		var error = function (result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);

		};
		var data = { "pc_id": $scope.pc_id };
		var url = '/admin/cut/promotionCutControl/getDetail.action';
		http.post(url, data, success, error);
	}

    if ($scope.pc_id) {
		$scope.getDetail();
	}


/**
 * 查询商品c
 */
$scope.pager1 = {page:1,rows:'10',sort:'',order:'',searchKey:'',pc_shopid:$rootScope.USER.shopId};
$scope.searchParam = {};
$scope.getGoods = function(){

    activityDetailFactory.getGoods($scope);
}
$scope.searchParam = {};



/**
 * 商品模糊查询
 */
$scope.keySearchFun = function(key,type){
    if(type=="goods"){
        $scope.pager1.page =1; 
        $scope.pager1.searchKey =key; 
        
        $scope.getGoods();
    } 
}

/**
 * 上一页
 */
$scope.prevPage = function(pager,fun){
    activityDetailFactory.prevPage($scope,pager,fun);
}

/**
 * 下一页
 */
$scope.nextPage = function(pager,fun){
    activityDetailFactory.nextPage($scope,pager,fun);
}
    /**
     * 选择商品
     */
	$scope.chooseGoods = function(obj,obj2,type){
			
		$scope.vo.pc_product_id = obj.ps_productid;
		$scope.vo.pc_product_id_nameref = obj.pm_title;
		$scope.vo.pc_product_skuid = obj.ps_id;
        $scope.vo.pc_market_price = obj.ps_price;
		$(".droplistWrap2").hide();
	}

$scope.lineNum = 0;
$scope.subTotal = 0;

$scope.showDroplist = function (event,fun,type){	
    activityDetailFactory.showDroplist($scope,event,fun,type);
};

/**
 * 保存
 */
$scope.submit = function(){
    if (!$scope.vo.pc_title_main) {
        messageFactory.showMessage('error','请输入活动主题');
        return;
    }
    // if( $scope.vo.pc_img==undefined || $scope.vo.pc_img==""){
    //     messageFactory.showMessage('error','请上传活动图片');
    //     return;
    // }
    if( $("#start_time").val()==""){
        messageFactory.showMessage('error','请选择活动时间');
        return;
    }
    if( $("#end_time").val()==""){
        messageFactory.showMessage('error','请选择活动时间');
        return;
    }
    // if( $scope.vo.pc_startdate <dateUtil.getDate2()){
    //     messageFactory.showMessage('error','活动开始日期不能小于当前日期');
    //     return;
    // }
    if( $scope.vo.pc_startdate >$scope.vo.pc_enddate){
        messageFactory.showMessage('error','活动结束时间不能小于开始时间');
        return;
    }
   

    var success = function(result){
        messageFactory.showMessage('success','提交成功');
        $scope.goBack();
        $scope.dataList = [{}];
        $scope.dataList2 = [{}];
        $scope.subTotal = 0;
    }
    var error = function(result){
        messageFactory.showMessage('error',result.desc);
    }
    

    EzConfirm.create({
        heading : '提示',
        text : "您确定提交吗？"
    }).then(function() {
        var url = "/admin/cut/promotionCutControl/update.action";
        http.post(url,$scope.vo,success,error);
    }, function() {

    });
}

// 返回
$scope.goBack = function(){
    
    $state.go("index.marketing.promotioncutlist");
    
}
    
/**
 * 显示图片上传
 */
$scope.upImage = function($event){
    activityDetailFactory.upImage($scope,$event);
};


  $scope.upImage = function($event) {
        
      $scope.ue_myeditor.addListener("beforeInsertImage", function(t, arg) {
        var imgs = "";

        if (arg.length > 0) {
          imgs = arg[0].src;
        }
        var imgsArr = imgs.split(",");
        $scope.vo.pc_img_show = imgsArr[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
         $scope.vo.pc_img =imgsArr[0].split("|")[0].split("static/upload/image")[1];
       
      });
        
        var myImage = $scope.ue_myeditor.getDialog("insertimage");
        myImage.open();
};
 








})