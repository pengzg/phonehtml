tempApp.controller('ctr_memberBankAccount', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    
    $scope.searchParam = {};
    
        $scope.dateNow = dateUtil.getDate2();
    //   $("#start_date").val($scope.dateNow);
      
    //   $("#end_date").val($scope.dateNow);
    $scope.vo = {};
    $('.right-pop').hide();
 
    /**
     * 查询订单列表
     */
    $scope.pager = {page:1,rows:'20',sort:'mba_ts',order:'desc',pageList:['10','20','30']};
    var queryList = function(){
        messageFactory.showLoading();
        $scope.searchParam.startDateApply = $("#start_date").val();
        $scope.searchParam.endDateApply = $("#end_date").val();
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
        var url = '/admin/member/memberBankAccountControl/dataGrid';
        http.post(url,$.extend({"mba_dr":1},$scope.pager,$scope.searchParam),success,error);
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
          $scope.searchParam.startDateApply = $scope.dateNow;
          $scope.searchParam.endDateApply = $scope.dateNow;
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
		
	// 	var url = "/admin/gl/glCashApplyControl/updateCheckApply";
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
	 * 查询订单状态
	 */
    $scope.statusList = [];
	$scope.queryStatus = function(){
		
		var success = function(result){
			 
             result.data.unshift({'bd_code':'','bd_name':"全部状态"});
             $scope.statusList = result.data;
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem?codekey=2183';
		http.post(url,null,success,error);
	}
	$scope.queryStatus(); 
      
      
      
      
      
      
      
 
       /**
	 * 显示审核框
	 */
	$scope.showDialog = function(x) {
		$scope.vo = x;
		$scope.dialogShow = true;
    }
    $scope.closeDialog = function(){
        $scope.vo = {};
        $scope.dialogShow = false;
        queryList();
    };   
      
     /**
	 * 修改
	 */
	$scope.doUpdate= function() {
		var success = function(result){
    		messageFactory.closeLoading();
            messageFactory.showMessage('success',result.desc);
         
            $scope.vo = {};
            $scope.dialogShow = false;
    		queryList();
    	}
    	
    	var error = function(result){
    		messageFactory.showMessage('error',result.desc);
    		messageFactory.closeLoading();
    	}
    	
        
        var data = $scope.vo;
		var url = "/admin/member/memberBankAccountControl/update";
		
		var msg = '您确定要修改吗？';
		
		
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, data, success, error);
		}, function() {

		});

	}  
      
      

    
     
      
     
    
      
     
  

  })