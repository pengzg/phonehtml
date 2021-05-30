tempApp.controller('ctr_cutInitiatorList', ['$scope','dateUtil','messageFactory','http','$state','EzConfirm','activityFactory','$rootScope','$stateParams',
function($scope,dateUtil,messageFactory,http,$state,EzConfirm,activityFactory,$rootScope,$stateParams) {
  $scope.pager = {page:1,rows:'20',sort:'pci_addtime',order:'desc',pageList:['10','20','30'],pc_shopid:$rootScope.USER.shopId};

	$scope.today = dateUtil.getDate2();
	$scope.showType = 1;//1:发布 2：暂存 3：取消发布
	$scope.dialog = 0;
	$scope.showInForm = true;// true:表格显示 false: 块状显示
	$scope.searchParam = {pci_state:""};
	
	
	if ($stateParams.cutId != undefined) {
		$scope.searchParam.pci_cutid = $stateParams.cutId;
	}

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
        $scope.searchParam.pci_dr =1;
		var url = '/admin/cut/promotionCutInitiatorControl/dataGrid.action';
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

	$scope.goBack = function(){
		history.back();
	}
	
	$scope.showParticipantsList = function(x){
		$scope.partList = [];
		$scope.dialog = 2;
		
		$scope.queryPartList(x.pci_id);
	}


	/**
	 * 查询列表
	 */
	$scope.partPager = {page:1,rows:'20',sort:'pcp_addtime',order:'desc',pageList:['10','20','30'],pc_shopid:$rootScope.USER.shopId};
	$scope.searchParam2 = {};
	$scope.queryPartList = function(pciId){
		if (!pciId) {
			return false;
		}
		messageFactory.showLoading();
		var success = function(result){
			$scope.partList = result.data.rows;
			$scope.partPager.total=result.data.total;
			$scope.partPager.pageTotal = Math.ceil($scope.partPager.total/$scope.partPager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
        };
		$scope.searchParam2.pcp_dr =1;
		$scope.searchParam2.pcp_cut_initiatorid = pciId;
		var url = '/admin/cut/promotionCutParticipantsControl/dataGrid.action';
		http.post(url,$.extend({},$scope.partPager,$scope.searchParam2),success,error);
	}

	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.partPager.page+' '+$scope.partPager.rows+' '+$scope.partPager.sort+' '+$scope.partPager.order+' ';
		
		return newValue;
	},$scope.queryPartList);

	$scope.closeDialog = function(){
		$scope.dialog = 0;
	}
}])