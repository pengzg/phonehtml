tempApp.controller('ctr_promotionCutList', ['$scope','dateUtil','messageFactory','http','$state','EzConfirm','activityFactory','$rootScope',
function($scope,dateUtil,messageFactory,http,$state,EzConfirm,activityFactory,$rootScope) {
  $scope.pager = {page:1,rows:'20',sort:'pc_addtime',order:'desc',pageList:['10','20','30'],pc_shopid:$rootScope.USER.shopId};

	$scope.today = dateUtil.getDate2();
	$scope.showType = 1;//1:发布 2：暂存 3：取消发布

	$scope.showInForm = true;// true:表格显示 false: 块状显示
	$scope.searchParam = {"pc_state":""};
	
	/**
	 * 查询列表
	 */
	var queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.dataList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
        };
        $scope.searchParam.pc_dr =1;
		var url = '/admin/cut/promotionCutControl/dataGrid.action';
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
		var url = "";
		if (type ==1) {
			url = $state.href("index.marketing.promotioncutdetail",{"pc_id":x.pc_id});
		} else if (type ==2){
			url = $state.href("index.marketing.promotioncutedit",{"pc_id":x.pc_id});
		}else {
			url = $state.href("index.marketing.promotionGoodsCopy",{"ppm_id":x.ppm_id});
		}
		
		window.open(url,'_blank');
	}
	
	// 修改发布状态
	$scope.updatePublish = function(x,stats,$event){
        var msg = "您确定要发布吗？";
        if (stats == 1) {
            msg = "您确定要结束吗"
        }
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.searchFun();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
        }
        var data = {"pc_id":x.pc_id, pc_state:stats};
		var url = "/admin/cut/promotionCutControl/updateState.action"
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url,data,success,error);
		}, function() {
			
		});
	}
	
	// 删除活动 
	$scope.deltePromotion = function(x,$event){
		var msg = "您确定要删除吗？";
        
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.searchFun();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
        }
        var data = {"pc_id":x.pc_id};
		var url = "/admin/cut/promotionCutControl/delete.action"
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url,data,success,error);
		}, function() {
			
		});
	}
	
	$scope.goBack = function(){
		history.back();
	}
	
	$scope.goInitiatorList = function(x) {
		var url = "";
		url = $state.href("index.marketing.cutinitiatorlist",{"cutId":x.pc_id});

	
		window.open(url,'_blank');
	}
	
}])