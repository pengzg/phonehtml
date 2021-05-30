tempApp.controller('ctr_combinationPackage', ['$scope','dateUtil','messageFactory','http','$state','EzConfirm','activityFactory','$rootScope',
function($scope,dateUtil,messageFactory,http,$state,EzConfirm,activityFactory,$rootScope) {
  $scope.pager = {page:1,rows:'20',sort:'ppm_sort DESC, ppm_def6',order:'DESC',pageList:['10','20','30'],ppm_shopid:$rootScope.USER.shopId};

	$scope.today = dateUtil.getDate2();
	$scope.showType = 1;//1:发布 2：暂存 3：取消发布

	$scope.showInForm = true;// true:表格显示 false: 块状显示
	$scope.searchParam = {"ppm_state":""};
	$scope.wi_code = "";
	$scope.qrcode = "";
	$scope.showPic  = false;
	/**
	 * 查询列表
	 */
	var queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.ppmList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		$scope.searchParam.ppm_type = 7;
		var url = '/admin/promotion/productPromotionMainControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
	
	/**
	 * 自动开团
	 */
	$scope.insertGroupAuto = function(x){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.searchFun();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = "/admin/order/orderGroupRecordControl/insertGroupAuto.action"
		EzConfirm.create({
			heading : '提示',
			text : '确认自动开团吗？'
		}).then(function() {
			messageFactory.showLoading();
			http.post(url,{sourceType:'2',sourceId:x.ppm_id},success,error);
		}, function() {
			
		});
		http.post(url,data,success,error);
	}
	
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		
		return newValue;
	},queryList);

	
	$scope.searchFun = function() {
		if($scope.pager.page==1){
			queryList();
		}else{
			$scope.pager.page = 1;
		}
	}
	//type 1 详情 2 复制 
	$scope.goDetail = function(x,type) {
		var url = "";
		if (type ==1) {
			url = $state.href("index.marketing.combinationPackageDetail",{"ppm_id":x.ppm_id});
		} else if (type ==2) {
			url = $state.href("index.marketing.combinationPackageCopy",{"ppm_id":x.ppm_id});
		} else {
			url = $state.href("index.marketing.combinationPackageEdit",{"ppm_id":x.ppm_id});
		}
		window.open(url,'_blank');
	}
	
	// 修改发布状态
	$scope.updatePublish = function(x,stats,$event){
		activityFactory.updatePublish($scope,x,stats,$event);
	}
	
	// 删除活动 
	$scope.deltePromotion = function(x,$event){
		activityFactory.deltePromotion($scope,x,$event);
	}
	
	$scope.goBack = function(){
		history.back();
	}

	/**
	 * 生成二维码
	 */
	$scope.createQRcode = function(x) {
		
		var success = function(result){
			$scope.qrcode = result.data;
			$scope.updateqrcode(x.ppm_id,$scope.qrcode);
			
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		
		var url ="/admin/order/orderMainControl/getMiniQrcode.action";
		var data = {"scene":x.ppm_id,"path":"pages/promotion/comPackageDetail"};
		var msg = "您确定要生成二维码吗？";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, data, success, error);
		}, function() {

		});		
	}
	
	/**
	 * 更新二维码
	 */
	$scope.updateqrcode = function(ppm_id, qrcode) {
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			messageFactory.closeLoading();
			queryList();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		
		var url ="/admin/promotion/productPromotionMainControl/updatePromotionMainQrcode.action";
		var data = {"ppm_id":ppm_id,"ppm_qrcode":qrcode};

		messageFactory.showLoading();
		http.post(url, data, success, error);
	}

	$scope.showQrPic = function(x){
		console.log(111)
		$scope.showPic = 1;
		$scope.picUrl = x.ppm_qrcode_show;
	}

}])