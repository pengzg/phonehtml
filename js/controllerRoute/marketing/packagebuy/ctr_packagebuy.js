tempApp.controller('ctr_packagebuy', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

	$scope.pager = {page:1,rows:'20',sort:'om_order_time',order:'desc',pageList:['10','20','30'],om_shopid:$rootScope.USER.shopId,"om_source":"2"};
	$scope.searchParam = {};
	
		// $scope.dateNow = dateUtil.getDate2();
		$scope.dateNow = "";
	  $scope.searchParam.startDate = $scope.dateNow;
	  $scope.searchParam.endDate = $scope.dateNow;
	  $("#start_date").val($scope.searchParam.startDate);
	  
	  $("#end_date").val($scope.searchParam.endDate);
	$scope.vo = {};
	//$scope.orderList = [{selected:false},{selected:false},{selected:false},{selected:false}]
	$scope.selectItem = [];
	$scope.selectAll = false;
	$('.right-pop').hide();
	$scope.selectAllClick = function(){
	  if($scope.selectAll){
		$scope.orderList.forEach(function(item,index){
		  item.selected = false;
		});
		$scope.selectAll = false;
		$scope.selectItem = [];
	  }else{
		$scope.orderList.forEach(function(item,index){
		  item.selected = true;
		});
		$scope.selectAll = true;
		$scope.selectItem = [].concat($scope.orderList)
	  }
	}
  
	$scope.updateSelect = function(){
	  $scope.selectItem = [];
	  $scope.orderList.forEach(function(item,index){
		  if(item.selected){
			$scope.selectItem.push(item);
		  }
		});
	}
	
	$scope.tab = ['',6,3];
	
	/**
	 * 页签切换
	 */
	$scope.chooseTab = function(tab){
		$scope.activeTab = tab;
		$scope.searchParam.om_state = $scope.tab[tab];
		queryList();
	}
	
		/**
	   * 切换tab
	   */
	  $scope.changeTab = function(tabId){
		  $scope.order_tab=tabId;
		  if(tabId=='1'){
			  $scope.queryOrderDetail($scope.om_id);
			  $scope.queryOperateLog($scope.om_id);
		  }
		  if(tabId=='2'){
			  $scope.queryHouse();
			  $scope.queryDeliveryman();
			  $scope.queryDeliveryRecord($scope.om_order_code);
		  }
		  if(tabId=='3'){
			  $scope.queryBillRecord($scope.om_order_code);
		  }
	  }
	
	/**
	 * 查询订单列表
	 */
	var queryList = function(){
		messageFactory.showLoading();
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		var success = function(result){
			$scope.orderList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/order/orderMainControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
	
	
	
	/**
	   * 监听
	   */
	  $scope.$watch(function(){
		  var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		  /*for(var x in $scope.searchParam){
			  newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		  }*/
		  return newValue;
	  },queryList);
	  
	  /**
	   * 查询订单详情
	   */
	  $scope.goOrderDetail = function(id,code){
		  var url = "";
		  url = $state.href('index.order.orderDetail',{'om_id':id,'om_order_code':code});
		  window.open(url,'_blank');
	  }
	  
	  /**
	   * 查询订单状态
	   */
	  $scope.queryOrderStatus = function(){
		  $scope.statusList = [];
		  var success = function(result){
			   for(var x in result.data){
				  var code = result.data[x].bd_code; 
				  var name = result.data[x].bd_name;
				  var str = {'bd_code':code,'bd_name':name};
				  $scope.statusList.push(str);
			   }
			   $scope.statusList.unshift({'bd_code':'','bd_name':"全部状态"});
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			}
		  var url = '/admin/base/baseDataControl/detailItem.action?codekey=2150';
		  http.post(url,null,success,error);
	  }
	  $scope.queryOrderStatus();
		  
	  /**
	   * 查询
	   */
	  $scope.doSearch = function(){
		  $scope.searchParam.startDate = $('#start_date').val();
		   $scope.searchParam.endDate = $('#end_date').val();
		  if($scope.pager.page != 1){
			  $scope.pager.page = 1;
		  }else{
			  queryList();
		  }
	  }
	  
	  /**
	   * 清空
	   */
	  $scope.clearInput = function(){
		  $scope.searchParam.searchKey = '';
		  $scope.searchParam.om_state = '';
		  $('#start_date').val($scope.dateNow);
		  $('#end_date').val($scope.dateNow);
		  $scope.searchParam.startDate = $scope.dateNow;
		  $scope.searchParam.endDate = $scope.dateNow;
		  $scope.doSearch();
	  }
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	$('body').on('click',function(e){
	  if($(e.target).parents('.right-pop,.dialog').length==0){
		$('.right-pop').hide();
	  }
	});
  
	$scope.showItem = function(object){
	  $('.right-pop').show();
	  $scope.om_id = object.om_id;
	  $scope.om_order_code = object.om_order_code;
	  $scope.changeTab("1");
	  $scope.orderMainVO = object;
	}
	$scope.hideItem = function(){
	  $('.right-pop').hide();
	}
  })