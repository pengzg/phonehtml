tempApp.controller('ctr_promotionOrder', ['$scope','dateUtil','messageFactory','http','$state','EzConfirm','activityFactory',
function($scope,dateUtil,messageFactory,http,$state,EzConfirm,activityFactory) {
  $scope.pager = {page:1,rows:'12',sort:'ppm_id',order:'desc',pageList:['10','20','30']};

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
		$scope.searchParam.ppm_type = 3;
		var url = '/admin/promotion/productPromotionMainControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
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
		if(type==3){
			$state.go("index.marketing.promotionOrderDetail",{"ppm_id":x.ppm_id,"type":type});
		}else{
			$state.go("index.combinationActivityEdit",{"pa_id":x.pa_id,"type":type});	
		}
		
	}
	
	// 修改发布状态
	$scope.updatePublish = function(x,stats,$event){
		activityFactory.updatePublish($scope,x,stats,$event);
	}
	
	// 删除活动 
	$scope.deltePromotion = function(x,$event){
		activityFactory.deltePromotion($scope,x,$event);
	}
	
	
	
	
	
	$scope.changeSrc = function(e){
		$(e).attr('src','../../../../img/2017-02-27-01.png');
		$(e).onerror = null;
	}
	
	$scope.goBack = function(){
		history.back();
	}
}])