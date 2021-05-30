tempApp.controller('ctr_exportTicketDetail', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    $scope.pager = {page:1,rows:'20',sort:'dateStr',order:'desc',pageList:['10','20','30'],shopid:$rootScope.USER.shopId};
    $scope.searchParam = {storeid:"", productSearchKey:"", memberMobileSearchKey:"",memberNameSearchKey:"", om_order_type:""};
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
        var url = '/admin/order/orderExportControl/exportTicketDetail.action';
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
        $('#start_date').val($scope.dateNow);
        $('#end_date').val($scope.dateNow);
        $scope.searchParam.startDate = $scope.dateNow;
        $scope.searchParam.endDate = $scope.dateNow;
        $scope.searchParam.memberNameSearchKey = '';
        $scope.searchParam.memberMobileSearchKey = '';
        $scope.searchParam.productSearchKey = '';
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
		var url = '/admin/order/orderExportControl/doExportTicketDetail.action?'+str;
		window.location.href = url;
    }
    
  })