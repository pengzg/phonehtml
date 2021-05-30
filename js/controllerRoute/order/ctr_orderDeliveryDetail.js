tempApp.controller('ctr_orderDeliveryDetail', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    
          
    $scope.searchParam = {odm_sourcetype:"",searchKey:""};
    
        $scope.dateNow = dateUtil.getDate2();
    //   $("#start_date").val($scope.dateNow);
      
    //   $("#end_date").val($scope.dateNow);
    $scope.vo = {};
    $('.right-pop').hide();
 
    /**
     * 查询订单列表
     */
    $scope.pager = {page:1,rows:'20',sort:'odd_ts',order:'desc',pageList:['10','20','30'],odd_shopid:$rootScope.USER.shopId};
    var queryList = function(){
        messageFactory.showLoading();
        $scope.searchParam.startDate = $("#start_date").val();
        $scope.searchParam.endDate = $("#end_date").val();
        var success = function(result){
            $scope.dataList = result.data.rows;
            $scope.pager.total = result.data.total;
            $scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
            messageFactory.closeLoading();
        }
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
        }
        var url = '/admin/order/orderDeliveryDetailControl/dataGrid.action';
        http.post(url,$.extend({"tsa_dr":1},$scope.pager,$scope.searchParam),success,error);
    }
  
    /**
       * 监听
       */
      $scope.$watch(function(){
          var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
          return newValue;
      },queryList);
      
      
     
          
      /**
       * 查询
       */
      $scope.doSearch = function(){
         
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
        //   $scope.searchParam.gca_audit_state = '';
          $('#start_date').val($scope.dateNow);
          $('#end_date').val($scope.dateNow);
          $scope.searchParam.startDate = $scope.dateNow;
          $scope.searchParam.endDate = $scope.dateNow;
          $scope.doSearch();
      }
      
      
    
    //   $scope.check = function(x,state) {
    //     var success = function(result){
	// 		messageFactory.closeLoading();
	// 		messageFactory.showMessage('success',result.desc);
	// 		queryList();
	// 	}
	// 	var error = function(result){
	// 		messageFactory.closeLoading();
	// 		messageFactory.showMessage('error',result.desc);
	// 	}
		
	// 	var url = "/admin/gl/glCashApplyControl/updateCheckApply.action";
	// 	var	msg = '您确定要审核通过吗？';
	// 	EzConfirm.create({
	// 		heading : '提示',
	// 		text : msg
	// 	}).then(function() {
	// 		messageFactory.showLoading();
	// 		http.post(url, {gca_id:x.gca_id,gca_audit_state:state}, success, error);
	// 	}, function() {

	// 	});
    // }
      
     /**
	 * 状态
	 */
    $scope.typeList = [];
	$scope.queryTypeList = function(){
		
		var success = function(result){
			 
             result.data.unshift({'bd_code':'','bd_name':"全部"});
             $scope.typeList = result.data;
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2184';
		http.post(url,null,success,error);
	}
	$scope.queryTypeList(); 
      
      
      /**
     * 导出
     */
    $scope.doExport = function(){
        var str = "odd_shopid="+$rootScope.USER.shopId;
          str += "&startDate="+$('#start_date').val();
          str += "&endDate="+$('#end_date').val();
          str += "&odm_sourcetype="+$scope.searchParam.odm_sourcetype
          str += "&searchKey="+$scope.searchParam.searchKey;
          str += "&order="+$scope.pager.order;
          str += "&sort="+$scope.pager.sort;
         
		var url = '/admin/order/orderDeliveryDetailControl/doExportDelivery.action?'+str;
		window.location.href = url;
	}
      
      
      
      
     
      
      
    
      
      

    
     
      
     
    
      
     
  

  })