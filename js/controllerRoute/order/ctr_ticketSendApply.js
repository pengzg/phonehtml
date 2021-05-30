tempApp.controller('ctr_ticketSendApply', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    
    $scope.searchParam = {"searchKey":""};
    
        $scope.dateNow = dateUtil.getDate2();
    //   $("#start_date").val($scope.dateNow);
      
    //   $("#end_date").val($scope.dateNow);
    $scope.vo = {};
    $('.right-pop').hide();
 
    /**
     * 查询订单列表
     */
    $scope.pager = {page:1,rows:'20',sort:'tsa_apply_time',order:'desc',pageList:['10','20','30'],tsa_shopid:$rootScope.USER.shopId};
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
        var url = '/admin/ticket/ticketSendApplyControl/dataGrid.action';
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
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2183';
		http.post(url,null,success,error);
	}
	$scope.queryStatus(); 
      
      
      
       /**
     * 导出
     */
    $scope.doExport = function(){
        var str = "tsa_shopid="+$rootScope.USER.shopId;
          str += "&startDateApply="+$('#start_date').val();
          str += "&endDateApply="+$('#end_date').val();
         
         
          str += "&searchKey="+$scope.searchParam.searchKey;

		var url = '/admin/ticket/ticketSendApplyControl/doExportTicketsend.action?'+str;
		window.location.href = url;
    } 
    
    $scope.showSelectPartner = function(x,type){
		
		$scope.agenttype_sale = 2;
		$scope.upOrder = x;
		$scope.dialog = 3;
		$scope.dialogTitle3 = "修改订单服务团队";
		$scope.agentPager.mb_agenttype_sale = "3";
		$scope.agentPager.page =1;
		$scope.queryAgentList();
	}

	$scope.agentPager = {page:1,rows:'20',sort:'mb_ts',order:'desc',"mb_isagent_sale":"Y",pageList:['10','20','30']};
	$scope.agentList = [];
	$scope.agentSearchParam = {searchKey:""};
	$scope.queryAgentList = function(){
		var success = function(result){
			  $scope.agentList = result.data.rows;
			  $scope.agentPager.total = result.data.total;
			  $scope.agentPager.pageTotal = Math.ceil($scope.agentPager.total/$scope.agentPager.rows);
			  messageFactory.closeLoading();
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		  var url = '/admin/member/memberBaseControl/dataGrid.action';
		  http.post(url,$.extend({},$scope.agentPager,$scope.agentSearchParam),success,error);
	}
	/**
	 * 监听合伙人的分页
	 */
	$scope.$watch(function(){
		var newValue = $scope.agentPager.page+' '+$scope.agentPager.rows+' '+$scope.agentPager.sort+' '+$scope.agentPager.order+' ';
		return newValue;
	},$scope.queryAgentList);


	$scope.bindAgent = function(x) {
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.dialog = 0;
			$scope.upOrder = {};
			queryList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'tsa_id':$scope.upOrder.tsa_id, "tsa_agentsale_id":x.mb_agentid_sale}
		var url = "/admin/ticket/ticketSendApplyControl/updateAgentsaleId.action";
		var	msg = "您确定将这个订单的团队进行修改吗？";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});


	}

	/**
	 * 关闭弹框
	 */
	$scope.closeDialog = function(){
		$scope.dialog = 0;
	}

	/**
	 * 复制送水申请
	 * @param {x} x 
	 */
	$scope.copyApply = function(x) {
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.dialog = 0;
			queryList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'tsa_id':x.tsa_id}
		var url = "/admin/ticket/ticketSendApplyControl/copyTicketSendApply.action";
		var	msg = "您确定要代替用户提交送水申请吗？";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});


	}

  })