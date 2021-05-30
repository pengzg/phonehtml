tempApp.controller('ctr_exportBox', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    $scope.pager = {page:1,rows:'20',sort:'owr_end_time',order:'desc',pageList:['10','20','30'],shopid:$rootScope.USER.shopId};
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
        var url = '/admin/order/orderExportControl/exportBox.action';
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
	 * 查询仓库
	 */
    $scope.storeList = [];
	$scope.getStoreHouse = function(){
		var success = function(result){
			$scope.storeList = result.data;
			for (i in $scope.storeList) {
				$scope.storeList[i].bs_name = $scope.storeList[i].bs_name+"("+$scope.storeList[i].bs_code+")";
			}
			$scope.storeList.unshift({'bs_id':'','bs_name':'请选择柜子'});
		}
		var error = function(){
			
		}
		var url = "/admin/base/baseStorehouseControl/queryItemList.action";
		http.post(url,{bs_type:4,bs_shopid:$rootScope.USER.shopId},success,error);
	}
    $scope.getStoreHouse();
    
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

		var url = '/admin/order/orderExportControl/doExportBox.action?'+str;
		window.location.href = url;
    }
    
  })