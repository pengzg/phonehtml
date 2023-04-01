tempApp.controller('ctr_dictList', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    
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
    $scope.pager = {page:1,rows:'20',sort:'dm_addtime',order:'desc',om_order_type:'2',pageList:['10','20','30']};
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
        var url = '/admin/dict/dictMainControl/dataGrid';
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
		
		var url = "/admin/gl/glCashApplyControl/updateCheckApply";
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
      
   
      
    
     
    
    $scope.doAdd = function(){
        $state.go("index.dict.dictAdd");


    }

    $scope.goEdit = function(x){
        var url = "";
        url = $state.href('index.dict.dictAdd',{"dm_id":x.dm_id});
        window.open(url,'_blank');
    }
     
    $scope.dmTypeList = []; 
    $scope.queryDmTypeList = function(){	
		var success = function(result){
             $scope.dmTypeList = result.data;
			 $scope.dmTypeList.unshift({'bd_code':'','bd_name':"全部语言"});
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2012';
		http.post(url,null,success,error);
	}
	$scope.queryDmTypeList(); 

  })