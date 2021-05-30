tempApp.controller('ctr_orderWaterDetail', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm) {

  $scope.pager = {page:1,rows:'10',sort:'od_id',order:'desc',pageList:['10','20','30']};
  $scope.searchParam = {};
  $scope.om_id = $stateParams.om_id;                            
  $scope.om_order_code = $stateParams.om_order_code;
  $scope.vo = {};
	/**
	 * 查询订单详情
	 */
	$scope.queryOrderDetail = function(id){
		var success = function(result){
			$scope.vo.orderVO = result.data.orderMainVO;
			$scope.vo.list = result.data.detailList;
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/order/orderDetailControl/queryOrderDetail.action';
		
		http.post(url,{om_id:id},success,error);
	}
	$scope.queryOrderDetail($stateParams.om_id);
	
	/**
	 * 查询操作日志
	 */
	$scope.queryOperateLog = function(id){
		var success = function(result){
			$scope.logList = result.data;
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/order/orderLogControl/queryLogList.action';
		
		http.post(url,{om_id:id},success,error);
	}
	$scope.queryOperateLog($stateParams.om_id);
	
	/**
	 * 打开备注弹窗
	 */
	$scope.showRemarksDialog = function(){
		$scope.dialogShow = true;
	}
	
	/**
	 * 关闭备注弹窗
	 */
	$scope.closeRemarksDialog = function(){
		$scope.dialogShow = false;
	}
	
	/**
	 * 添加备注信息 type=1 商品备注 type=2 整单备注
	 */
	$scope.addRemarks = function(type,id){
		$scope.showRemarksDialog();
		$scope.type = type;
		$scope.id = id;
		$scope.getRemarks(type,id);
	}
	
	/**
	 * 查询备注信息
	 */
	$scope.getRemarks = function(type,id){
		var success = function(result){
			console.log(result.data);
			if(type == 1){
				$("#remak").val(result.data.od_remarks);
			}else{
				$("#remak").val(result.data.om_remarks);
			}
			messageFactory.showMessage('success',result.desc);
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/order/orderDetailControl/getRemarks.action';
		var data = {'type':type,'id':id};
		http.post(url,data,success,error);
	}
	/**
	 * 保存备注
	 */
	$scope.saveRemark = function(){
		$scope.closeRemarksDialog();
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.vo.orderVO.om_remarks = $("#remak").val();
			$("#remak").val("");
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/order/orderDetailControl/updateRemarks.action';
		var remarks = $("#remak").val();
		var data = {'type':$scope.type,'id':$scope.id,'remarks':remarks};
		http.post(url,data,success,error);
	}
	/**
	 * 查询待出库商品清单
	 */
	$scope.queryDckGoodsList = function(id,shopId){
		var success = function(result){
			$scope.dckGoodsList = result.data;
			$scope.goodsKindNum = $scope.dckGoodsList.length;
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/order/orderDetailControl/queryDckGoodsList.action';
		var data = {'om_id':id,'shop_id':shopId};
		http.post(url,data,success,error);
	}
	$scope.queryDckGoodsList($scope.om_id);
	
	/**
	 * 查询收款记录
	 */
	$scope.queryBillRecord = function(code){
		var success = function(result){
			$scope.billList = result.data;
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/gl/glReceiptBillControl/queryBillRecord.action';
		var data = {'order_code':code};
		http.post(url,data,success,error);
	}
	$scope.queryBillRecord($scope.om_order_code);
	
})