tempApp.controller('ctr_phoneList', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    
    $scope.searchParam = {"searchKey":""};
    
    $scope.dateNow = dateUtil.getDate2();
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
 
    $scope.tab  = "1";
    $scope.searchParam.gca_type = "1";

    /**
     * 查询订单列表
     */
    $scope.pager = {page:1,rows:'20',sort:'pm_sort',order:'desc',om_order_type:'2',pageList:['10','20','30']};
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
        var url = '/admin/phone/phoneMainControl/dataGrid.action';
        http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
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
          $scope.searchParam.gca_audit_state = '';
          $('#start_date').val($scope.dateNow);
          $('#end_date').val($scope.dateNow);
          $scope.searchParam.startDate = $scope.dateNow;
          $scope.searchParam.endDate = $scope.dateNow;
          $scope.doSearch();
      }
      
      
    
      $scope.check = function(x,state) {
        var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var url = "/admin/gl/glCashApplyControl/updateCheckApply.action";
		var	msg = '您确定要审核通过吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, {gca_id:x.gca_id,gca_audit_state:state}, success, error);
		}, function() {

		});
}
      
      
      
$scope.selectTab = function(x) {
    $scope.tab  = x;
    $scope.pager.page = 1;
    $scope.searchParam.gca_type = x;
    $scope.searchParam.searchKey = "";
    $scope.searchParam.startDate = "";
    $scope.searchParam.endDate = "";
    queryList();
}   
      
   /**
	 * 显示审核框
	 */
	$scope.showCheckBox = function(x) {
		$scope.vo = x;
		$scope.checkBoxShow = true;
	}   
      
     /**
	 * 启用与禁用
	 */
	$scope.updateCheckstate = function(state) {
		var success = function(result){
    		messageFactory.closeLoading();
            messageFactory.showMessage('success',result.desc);
            $scope.checkBoxShow = false;
            $scope.vo = {};
    			queryList();
    	}
    	
    	var error = function(result){
    		messageFactory.showMessage('error',result.desc);
    		messageFactory.closeLoading();
    	}
    	
        
        var data = {gca_id:$scope.vo.gca_id,gca_audit_state:state,"gca_audit_opinion": $("#comment").val()};
		var url = "/admin/gl/glCashApplyControl/updateCheckApply.action";
		
		var msg = '您确定要审核通过吗？';
		if (state ==3) {
			msg = '您确定要审核不通过吗？';
		}
		
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, data, success, error);
		}, function() {

		});

	}  
     
    
    $scope.doAdd = function(){
        $state.go("index.phone.phoneAdd");
    }
     
      
     /**
     * 导出
     */
    $scope.doExport = function(){
        var str = "gca_shopid="+$rootScope.USER.shopId;
          str += "&startDate="+$('#start_date').val();
          str += "&endDate="+$('#end_date').val();
          str += "&gca_type="+$scope.searchParam.gca_type;
         
          str += "&searchKey="+$scope.searchParam.searchKey;

		var url = '/admin/gl/glCashApplyControl/doExportGlCash.action?'+str;
		window.location.href = url;
    }  
    
      
      

    
     
      
     
    
      
     
  

  })