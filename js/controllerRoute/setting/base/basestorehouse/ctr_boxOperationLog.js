tempApp.controller('ctr_boxOperationLog', function($scope,$stateParams,$state,http,EzConfirm,messageFactory,dateUtil,$timeout,$rootScope) {
	$scope.pager = {page:1,rows:'20',sort:'bol_addtime desc, bol_batchid ',order:' DESC',pageList:['10','20','30'],bol_shopid:$rootScope.USER.shopId};
	$scope.stateList = [{"bd_code":"","bd_name":"全部"},{"bd_code":1,"bd_name":"开仓成功"},{"bd_code":2,"bd_name":"未开仓"},{"bd_code":3,"bd_name":"复位中"},{"bd_code":4,"bd_name":"复位成功"}];
	$scope.searchParam = {};
	$scope.vo = {};
	$scope.dateNow = dateUtil.getDate2();
	$scope.searchParam.startDate = $scope.dateNow;
	$scope.searchParam.endDate = $scope.dateNow;
	$('#start_date').val($scope.dateNow);
	$('#end_date').val($scope.dateNow);
	
	if ($stateParams.bol_box_id != undefined) {
    	$scope.searchParam.bol_box_id_like = $stateParams.bol_box_id;    	
    }
	if ($stateParams.bol_storeid != undefined) {
    	$scope.searchParam.bol_storeid = $stateParams.bol_storeid;
    }

	
	/**
	 * 查询数据
	 */
	var queryLogList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.logList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}

		var url = '/admin/base/boxOperationLogControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}

	
	/**
	 * 条件查询
	 */
	
	$scope.searchFun = function(){
		$scope.searchParam.startDate = $('#start_date').val();
		$scope.searchParam.endDate = $('#end_date').val();
		if($scope.pager.page==1){
			queryLogList();
		}else{
			$scope.pager.page = 1;
		}
	}
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue;
	},queryLogList);
	
	
	

	
	/**
	 * 查询仓库
	 */
	$scope.getStoreHouse = function(){
		var success = function(result){
			$scope.storeList = result.data;
			for (i in $scope.storeList) {
				$scope.storeList[i].bs_name = $scope.storeList[i].bs_name+"("+$scope.storeList[i].bs_code+")";
			}
			$scope.storeList.unshift({'bs_code':'','bs_name':'请选择柜子'});
		}
		var error = function(){
			
		}
		var url = "/admin/base/baseStorehouseControl/queryItemList.action";
		http.post(url,{searchKey:"", "bs_type":4,bs_shopid:$rootScope.USER.shopId},success,error);
	}
	$scope.getStoreHouse();
	// 清除数据
	$scope.clearParams = function(){
		$scope.searchParam.searchKey='';
		$scope.searchParam.bol_storeid='';
		$scope.searchParam.bol_box_id='';
		$scope.searchParam.bol_box_id_like='';
		$scope.searchParam.bol_type='';
		$scope.searchParam.bs_box_type='';
		$scope.searchParam.bol_state = "";
		$('#start_date').val($scope.dateNow);
		$('#end_date').val($scope.dateNow);
		
		
	}
	
	/**
	 * 二次远程开箱 
	 */
	$scope.openBox = function(x) {
		var success = function(result){
    		messageFactory.closeLoading();
    		messageFactory.showMessage('success',result.desc);
    		$timeout(function(){
    			queryLogList();
                return 'angular'
            },1500)
    		
    	}
    	
    	var error = function(result){
    		messageFactory.showMessage('error',result.desc);
    		messageFactory.closeLoading();
    	}
    	var data = {"bol_id":x.bol_id};
		var url = "/admin/box/boxControl/reOpenBox.action" ;
		var msg = '您确定要重新打开这个箱子吗？';
		
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
	 * 查询柜子类型
	 */
	$scope.boxTypeList = [];
	$scope.queryBoxTypeList = function(){
		var success = function(result){
			$scope.boxTypeList = result.data;
			$scope.boxTypeList.unshift({'bd_code':'','bd_name':"全部"});
						 
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2154';
		http.post(url,null,success,error);
	}
	$scope.queryBoxTypeList();

	/**
	 * 查询柜子开仓类型
	 */
	$scope.typeList = [];
	$scope.queryTypeList = function(){
		var success = function(result){
			$scope.typeList = result.data;
			$scope.typeList.unshift({'bd_code':'','bd_name':"全部"});
						 
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2169';
		http.post(url,null,success,error);
	}
	$scope.queryTypeList();
	
})