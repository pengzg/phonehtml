tempApp.controller('ctr_promotionGoods', ['$scope','dateUtil','messageFactory','http','$state','EzConfirm','activityFactory','$rootScope',
function($scope,dateUtil,messageFactory,http,$state,EzConfirm,activityFactory,$rootScope) {
  $scope.pager = {page:1,rows:'20',sort:'ppm_addtime',order:'desc',pageList:['10','20','30'],ppm_shopid:$rootScope.USER.shopId};

	$scope.today = dateUtil.getDate2();
	$scope.showType = 1;//1:发布 2：暂存 3：取消发布

	$scope.showInForm = true;// true:表格显示 false: 块状显示
	$scope.searchParam = {"ppm_state":""};
	
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
		$scope.searchParam.ppm_type = 1;
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
			url = $state.href("index.marketing.promotionMainDetail",{"ppm_id":x.ppm_id});
		} else if (type ==2){
			url = $state.href("index.marketing.promotionGoodsEdit",{"ppm_id":x.ppm_id});
		}else {
			url = $state.href("index.marketing.promotionGoodsCopy",{"ppm_id":x.ppm_id});
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
	
	// 检查团购  （暂时不加）
	$scope.checkGroupNum = function(x,state,$event){
		if (state == 4) {
			messageFactory.showLoading();
			var success = function(result){
				if (result.data>0) {
					messageFactory.showMessage('error',"有正在开团中的团购，不能取消");
					return false;
				} else {
					activityFactory.updatePublish($scope,x,stats,$event);
				}
			};
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
				
			};
			var data = {"ogr_source_type":2,"ogr_source_id":x.ppm_id,"ogr_group_state":1}
			var url = '/admin/order/orderGroupRecordControl/getGroupNum.action';
			http.post(url,$.extend({},data),success,error);
		} else {
			activityFactory.updatePublish($scope,x,stats,$event);
		}
	}
}])