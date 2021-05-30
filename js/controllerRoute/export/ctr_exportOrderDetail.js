tempApp.controller('ctr_exportOrderDetail', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    $scope.pager = {page:1,rows:'20',sort:'om_order_time',order:'desc',pageList:['10','20','30'],om_shopid:$rootScope.USER.shopId};
    $scope.searchParam = {storeid:"", productSearchKey:"", memberMobileSearchKey:"",memberNameSearchKey:"", om_order_type:"",om_state:"",om_pay_state:"","od_saletype":"","searchKey":""};
    $scope.dateNow = dateUtil.getDate2();
      $scope.searchParam.startDate = $scope.dateNow;
      $scope.searchParam.endDate = $scope.dateNow;
      $("#start_date").val($scope.searchParam.startDate);
      $("#end_date").val($scope.searchParam.endDate);
   
    /**
     * 查询订单列表
     */
    $scope.queryList = function(){
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
        var url = '/admin/order/orderExportControl/exportOrderDetail.action';
        http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
    }

    
    /**
       * 监听
       */
      $scope.$watch(function(){
          var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
          return newValue;
      },$scope.queryList);

      
      /**
       * 查询
       */
      $scope.doSearch = function(){
          $scope.searchParam.startDate = $('#start_date').val();
           $scope.searchParam.endDate = $('#end_date').val();
          if($scope.pager.page != 1){
              $scope.pager.page = 1;
          }else{
              $scope.queryList();
          }
      }
      
      /**
       * 清空
       */
      $scope.clearParams  = function(){

        $scope.searchParam.storeid = '';
        $scope.searchParam.om_order_type = '';
        $('#start_date').val($scope.dateNow);
        $('#end_date').val($scope.dateNow);
        $scope.searchParam.startDate = $scope.dateNow;
        $scope.searchParam.endDate = $scope.dateNow;
        $scope.searchParam.memberNameSearchKey = '';
        $scope.searchParam.memberMobileSearchKey = '';
        $scope.searchParam.productSearchKey = '';
        $scope.searchParam.om_state = "";
        $scope.searchParam.om_pay_state = "";
        $scope.searchParam.od_saletype = "";
        $scope.searchParam.searchKey = "";
        $scope.doSearch();
    }

      /**
	 * 查询柜子类型
	 */
	$scope.orderTypeList = [];
	$scope.queryOrderTypeList = function(){
		var success = function(result){
			$scope.orderTypeList = result.data;
			$scope.orderTypeList.unshift({'bd_code':'','bd_name':"全部"});
						 
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2167';
		http.post(url,null,success,error);
	}
	$scope.queryOrderTypeList();
    
    /**
     * 导出
     */
    $scope.doExport = function(){
        var str = "shopid="+$rootScope.USER.shopId;
          str += "&storeid="+$scope.searchParam.storeid ;
          str += "&startDate="+$('#start_date').val();
          str += "&endDate="+$('#end_date').val();
          str += "&om_order_type="+$scope.searchParam.om_order_type;
          str += "&memberNameSearchKey="+$scope.searchParam.memberNameSearchKey ;
          str += "&memberMobileSearchKey="+$scope.searchParam.memberMobileSearchKey ;
          str += "&productSearchKey="+$scope.searchParam.productSearchKey;
          str += "&order="+$scope.pager.order;
          str += "&sort="+$scope.pager.sort;
          str += "&om_state="+$scope.searchParam.om_state;
          str += "&om_pay_state="+$scope.searchParam.om_pay_state;
          str += "&od_saletype="+$scope.searchParam.od_saletype;
          str += "&searchKey="+$scope.searchParam.searchKey;
		var url = '/admin/order/orderExportControl/doExportOrderDetail.action?'+str;
		window.location.href = url;
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
	 * 查询柜子类型
	 */
	$scope.payStateList = [];
	$scope.queryPayStateList = function(){
		var success = function(result){
			$scope.payStateList = result.data;
			$scope.payStateList.unshift({'bd_code':'','bd_name':"全部"});
						 
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2151';
		http.post(url,null,success,error);
	}
  $scope.queryPayStateList();
  

  $scope.saleTypeList = [];
	$scope.querySaleTypeList = function(){
		var success = function(result){
			$scope.saleTypeList = result.data;
			$scope.saleTypeList.unshift({'bd_code':'','bd_name':"全部"});
						 
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2178';
		http.post(url,null,success,error);
	}
	$scope.querySaleTypeList();


  })