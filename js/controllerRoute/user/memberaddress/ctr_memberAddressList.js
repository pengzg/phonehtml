tempApp.controller('ctr_memberAddressList', function($scope,EzConfirm,messageFactory,http,$state,$stateParams, $rootScope) {
    $scope.pager = {page:1,rows:'20',sort:'ma_addtime',order:'desc',pageList:['10','20','30'],"shopid": $rootScope.USER.shopId};
    $scope.searchParam = {};
    var format = 'yyyy-MM-dd';
	// $scope.dateNow = dateRangeUtil.getCurrentMonth(format);
	$scope.dateNow  = '';
	// $scope.startdate = $scope.dateNow;
	// $scope.enddate = $scope.dateNow;
	$scope.searchParam.startDate = $scope.dateNow;
	$scope.searchParam.endDate = $scope.dateNow;
	$("#start_date").val($scope.dateNow);
	$("#end_date").val($scope.dateNow);
	$scope.servicerShop_nameref = '所属服务商';
   
	/**
	 * 查询列表
	 */
	var queryMaList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.maList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/member/memberAddressControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		if($scope.pager.page==1){
			queryMaList();
		}else{
			$scope.pager.page = 1;
		}
	}
    
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		for(var x in $scope.searchParam){
			newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		}
		return newValue;
	},queryMaList);
	
	/**
	 * 显示弹框
	 */
	$scope.showDialog = function(object){
		$scope.dialogTitle = "关联服务商";
		$scope.userName = object.ma_name;
		$scope.servicerName = object.ma_shopid_nameref;
		$scope.servicerPop = true;
		$scope.ms_id = '';
		$scope.addressId = object.ma_id;
		$scope.shopid = object.ma_shopid;
		$scope.associatedServicer();
	}
	/**
	 * 关闭弹框
	 */
	$scope.closeDialog = function(){
		$scope.servicerPop = false;
	}
	
	$scope.pagerShop = {page:1,rows:'10',sort:'ms_ts',order:'desc',pageList:['10','20','30']};
	$scope.searchParamShop = {};
	/**
	 * 服务商水站列表
	 * 
	 */
	$scope.associatedServicer = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.shopList = result.data.rows;
			$scope.pagerShop.total = result.data.total;
			$scope.pagerShop.pageTotal = Math.ceil($scope.pagerShop.total/$scope.pagerShop.rows);
			messageFactory.closeLoading();
			$scope.servicerShop = [];
			for(var x in $scope.shopList){
				var id = $scope.shopList[x].ms_id;
				var name = $scope.shopList[x].ms_name;
				var str = {'ms_id':id,'ms_name':name};
				$scope.servicerShop.push(str);
			}
			$scope.servicerShop.unshift({'ms_id':'','ms_name':"全部服务商"});
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/member/memberShopControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pagerShop,$scope.searchParamShop),success,error);
	}
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pagerShop.page+' '+$scope.pagerShop.rows+' '+$scope.pagerShop.sort+' '+$scope.pagerShop.order+' ';
		for(var x in $scope.searchParamShop){
			newValue = newValue + x+'='+$scope.searchParamShop[x]+'&';
		}
		return newValue;
	},$scope.associatedServicer);
	
	/**
	 * 已选店铺
	 */
	 $scope.selectedShop = function(){
			$scope.ms_id = '';
			$("input[name='shop']:checked").not(":disabled").each(function(){
				$scope.ms_id = $(this).attr("ms_id");
			});
	}
	
	/**
	 * 确认关联
	 */
	$scope.saveAssociated = function(){
		if($scope.ms_id == '' || $scope.ms_id == undefined){
			messageFactory.showMessage('error',"请选择要关联的服务商！");
			return;
		}
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.closeDialog();
			queryMaList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var data ={'ma_id':$scope.addressId,'ms_id':$scope.ms_id};
		var url = "/admin/member/memberAddressControl/associateServicer.action";
		var	msg = '您确定关联该服务商吗？原关联服务商将解除！';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
	}
	
	$scope.showDetailDialog = function(){
		$scope.dialog = true;
	}
	
	$scope.closrDetailDialog = function(){
		$scope.dialog = false;
	}
	
	/**
	 * 跳转到详情
	 */
	$scope.getDetail = function(id) {
		//$state.go("index.user.userdetail",{'id':id});
		$scope.dialogTitle = "用户详情";
		$scope.toDetail(id);
		$scope.showDetailDialog();
	}
	
	/**
     * 获取用户详情
     */
	 $scope.toDetail = function(id){
		 messageFactory.showLoading();
			var success = function(result){
				$scope.vo = result.data;
				messageFactory.closeLoading();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
				
			}
			var url = '/admin/member/memberAddressControl/getDetail.action';
			http.post(url,{'ma_id':id},success,error);
	 }
	
	/**
	 * 删除用户
	 */
	 $scope.deleteUser = function(id){
		var success = function(result){
			queryUserList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/member/memberAddressControl/delete.action';
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			http.post(url,{"ma_id":id},success,error);
		}, function() {
			//console.log('取消？')
		});
	}
	 
	 /**
	  * 搜索
	  */
	 $scope.doSearch = function(){
		 $scope.searchParam.startDate = $('#start_date').val();
		 $scope.searchParam.endDate = $('#end_date').val();
		 $scope.searchParam.searchKey = '';
		 if($scope.pager.page != 1){
			 $scope.pager.page = 1; 
		 }
	 }
	 
	   /**
		 * 修改用户状态
		 */
		$scope.changeStatus = function(id,text){
			var success = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('success',result.desc);
				queryUserList();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			}
			
			var data ={'ma_id':id}
			var url = "/admin/member/memberAddressControl/changeStatus.action";
			var	msg = '您确定'+text+'该用户吗？';
			EzConfirm.create({
				heading : '提示',
				text : msg
			}).then(function() {			
				http.post(url, data, success, error);
			}, function() {

			});
		}
		 /**
		 * 上一页
		 */
		$scope.prevPage = function(pager,fun){
			if(pager.page==1){
				return;
			}
			pager.page --;
			fun();
		}
		
		/**
		 * 下一页
		 */
		$scope.nextPage = function(pager,fun){
			if(pager.page >= pager.pageTotal){
				return;
			}
			pager.page ++;
			fun();
		}
	 
		/**
		 * 选择服务商水站
		 */
		$scope.chooseServicerShop = function(object){
			$scope.servicerShop_nameref = object.ms_name;
			$scope.searchParam.ma_shopid = object.ms_id;
			$scope.searchFun();
		}


		$scope.clearParams = function(){
			$scope.searchParam.searchKey='';
			$scope.searchParam.ma_shopid='';
			$("#start_date").val($scope.dateNow[0]);
			$("#end_date").val($scope.dateNow[1]);
		}
	 
})