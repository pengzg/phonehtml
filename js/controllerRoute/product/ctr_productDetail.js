tempApp.controller('ctr_productDetail', function($scope,http,$stateParams,$state,EzConfirm,messageFactory) {
	console.log($stateParams);
	$scope.pm_id = $stateParams.pm_id;
	$scope.vo = {};
	
	
	$scope.getDetail = function(){
		if (!$scope.pm_id) {
			return false;
		}
		
		var success = function(result){
			$scope.vo = result.data;
			
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"pm_id":$scope.pm_id};
		
		var url = '/admin/product/productMainControl/getDetail.action';
		http.post(url,data,success,error);
		
	}
	$scope.getDetail();
	
	$scope.goEdit = function(){
		if (!$scope.pm_id) {
			return false;
		}
		$state.go("index.product.productAdd",{"pm_id":$scope.pm_id});
	}
	
	/**
	 * 更新库存
	 */
	$scope.updateStock = function(){
		
		if (!$scope.stock) {
			messageFactory.showMessage('error',"请输入要购买的数量");
			return false;
		}
		
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			messageFactory.closeLoading();
			$scope.getDetail();
			$scope.queryDetailList();
			$scope.stock=0;
			$scope.note = "";
			
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"psd_productid":$scope.pm_id,"psd_stock":$scope.stock,"psd_note":$scope.note};
		
		var url = '/admin/product/productStockDetailControl/update.action';
		
		EzConfirm.create({
			heading : '提示',
			text : '确认修改库存吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
	}
	
	$scope.clearStock = function(){
		
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			messageFactory.closeLoading();
			$scope.getDetail();
			$scope.queryDetailList();
			$scope.stock=0;
			$scope.note = "";
			
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"psd_productid":$scope.pm_id,"psd_stock":0-$scope.vo.pm_stock,"psd_note":"清空库存"};
		
		var url = '/admin/product/productStockDetailControl/update.action';
		
		EzConfirm.create({
			heading : '提示',
			text : '确认清空库存吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
	}
	
	
	/**
	 * 查询库存记录列表
	 */
	$scope.pager = {page:1,rows:'100',sort:'psd_addtime',order:'desc',pageList:['10','20','30']};
	$scope.queryDetailList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.detailList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			// messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/product/productStockDetailControl/dataGrid.action';
		http.post(url,$.extend({"psd_productid":$scope.pm_id},$scope.pager),success,error);
	}
	$scope.queryDetailList();
	
	// 返回列表页面
	$scope.goList = function(){
		$state.go("index.product.productList");
	}
})