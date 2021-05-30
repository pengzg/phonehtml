tempApp.controller('ctr_productList', function($scope,EzConfirm,messageFactory,http,$state,$stateParams,$rootScope) {
    
    $scope.searchParam = {};
    var format = 'yyyy-MM-dd';
	$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
	$scope.startdate = $scope.dateNow[0];
	$scope.enddate = $scope.dateNow[1];
	$scope.searchParam.startDate = $scope.dateNow[0];
	$scope.searchParam.endDate = $scope.dateNow[1];
	$scope.stateList = [{"id":"","name":"全部"},{"id":"1","name":"上架"},{"id":"2","name":"下架"}];
	$scope.memberType = $rootScope.USER.memberType;

	/**
	 * 查询列表
	 */
	$scope.pager = {page:1,rows:'20',sort:'pm_sort',order:'desc',pageList:['10','20','30'],pm_shopid:$rootScope.USER.shopId};
	$scope.queryProductList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.productList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/product/productMainControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			$scope.queryProductList();
		}else{
			$scope.pager.page = 1;
		}
	}
    

	// 类型列表
	$scope.typepager = {page:1,rows:'9999',sort:'pt_id',order:'desc',pageList:['10','20','30'],"shopid":$rootScope.USER.shopId};
	$scope.searchParam2 = {};
	$scope.queryTypeList = function(){
		var success = function(result){
			$scope.typeList = result.data.rows;
			$scope.typeList.unshift({'pt_id':'','pt_name':"全部类型"});
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		$scope.searchParam2.pt_dr=1;
		$scope.searchParam2.pt_state=1;
		var url = '/admin/product/productTypeControl/dataGrid.action';
		http.post(url,$.extend({},$scope.typepager,$scope.searchParam2),success,error);
	}
	$scope.queryTypeList();
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		
		return newValue;
	},$scope.queryProductList);
	
	/**
	 * 删除礼品
	 */
	$scope.deleteProduct = function(x){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.queryProductList();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/product/productMainControl/delete.action';
		var data = {"pm_id":x.pm_id};
		
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
	}
	
	/**
	 * 自动开团
	 */
	$scope.insertGroupAuto = function(x){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
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
			http.post(url,{sourceType:'1',sourceId:x.pm_id},success,error);
		}, function() {
			
		});
	}
	
	
	
	/**
	 * 先查一下 商品是否有水票订单 
	 */
	$scope.getTicketRecord = function(x){
		var success = function(result){
			if (result.data == 0) {
				$scope.deleteProduct(x);
			} else {
				messageFactory.showMessage('error',"本商品还有未使用的水票，不能删除");
				return false;
			}
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			return false;
		}
		var url = '/admin/ticket/ticketMainControl/getTicketNum.action';
		var data = {"productid":x.pm_id};
		
		http.post(url,data,success,error);

	}
	
	$scope.addProduct = function(){
		$state.go("index.product.productType");
	}
	
	$scope.goDetail = function(x){
		var url = "";
		switch (x.pm_typeid)
		{
			case '1010':// 饮用水'
				url = $state.href("index.product.goodsDetail",{"pm_id":x.pm_id});
				break;
			case '1011':// 实物
				url = $state.href("index.product.goodsDetail",{"pm_id":x.pm_id});
				break;
			case '1012':// 积分
				url = $state.href("index.product.goodsDetail",{"pm_id":x.pm_id});
				break;
			case '1013':// 积分
				url = $state.href("index.product.rechargedetail",{"pm_id":x.pm_id});
				break;

			default:
				break;
		}
		
		 window.open(url,'_blank');
	}

	$scope.goEdit = function(x){
		var url = "";
		switch (x.pm_typeid)
		{
		case '1010':// 饮用水
			url = $state.href("index.product.goodsEdit",{"pm_id":x.pm_id});
			break;
		case '1011':// 实物
			url = $state.href("index.product.goodsEdit",{"pm_id":x.pm_id});
			break;
		case '1012':// 积分
			url = $state.href("index.product.goodsEdit",{"pm_id":x.pm_id});
			break;
		case '1013':// 积分
			url = $state.href("index.product.rechargeEdit",{"pm_id":x.pm_id});
			break;
		
		default:
			break;
		}
		
		window.open(url,'_blank');
	}
	
	/**
	 * 修改上下架 先判断 水票 
	 */
	$scope.changeState = function(x,state){
		
		if (state == 1) {
			$scope.changeState2(x,state)
		} else {
			var success = function(result){
				if (result.data == 0) {
					$scope.changeState2(x,state);
				} else {
					messageFactory.showMessage('error',"本商品还有未使用的水票，不能下架");
					return false;
				}
			}
			var error = function(result){
				messageFactory.showMessage('error',result.desc);
				return false;
			}
			var url = '/admin/order/orderDetailControl/queryWaterVoteNum.action';
			var data = {"od_product_id":x.pm_id};
			
			EzConfirm.create({
				heading : '提示',
				text : '确认操作吗？'
			}).then(function() {
				http.post(url,data,success,error);
			}, function() {
				//console.log('取消？')
			});
		}
	}
	
	/**
	 * 对商品上下架操作
	 */
	$scope.changeState2 = function(x,state){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.queryProductList();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/product/productMainControl/changeState.action';
		var data = {"pm_id":x.pm_id,"state":state};
		if (state == 1) { 
			EzConfirm.create({
				heading : '提示',
				text : '确认操作吗？'
			}).then(function() {
				http.post(url,data,success,error);
			}, function() {
				//console.log('取消？')
			});
		} else{
			http.post(url,data,success,error);
		}

	}


	$scope.clearParams = function(){
		$scope.searchParam.searchKey = "";
		$scope.searchParam.pm_state = "";

	}

	$scope.goStockList = function(x){
		var url = $state.href("index.product.productStockList", {searchKey:x.pm_title});
		window.open(url,'_blank');
	}
})