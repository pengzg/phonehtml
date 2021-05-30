tempApp.controller('ctr_orderInvoiceLog', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    
    $scope.searchParam = {};
    
        $scope.dateNow = dateUtil.getDate2();
    //   $scope.searchParam.startDate = $scope.dateNow;
    //   $scope.searchParam.endDate = $scope.dateNow;
      $scope.dateNow = "";
      $("#start_date").val($scope.searchParam.startDate);
      
      $("#end_date").val($scope.searchParam.endDate);
    $scope.vo = {};
    //$scope.orderList = [{selected:false},{selected:false},{selected:false},{selected:false}]
    $scope.selectItem = [];
    $scope.selectAll = false;
    $('.right-pop').hide();
 
    /**
     * 查询订单列表
     */
    $scope.pager = {page:1,rows:'20',sort:'oil_addtime',order:'desc',om_order_type:'2',pageList:['10','20','30'],om_shopid:$rootScope.USER.shopId};
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
        var url = '/admin/order/orderInvoiceLogControl/dataGrid.action';
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
          var url = '/admin/base/baseDataControl/detailItem.action?codekey=2186';
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
          $scope.searchParam.oil_invoice_state = '';
          $('#start_date').val($scope.dateNow);
          $('#end_date').val($scope.dateNow);
          $scope.searchParam.startDate = $scope.dateNow;
          $scope.searchParam.endDate = $scope.dateNow;
          $scope.doSearch();
      }
      
      $scope.showItem = function(x) {
        
        var success = function(result){
            x.orderDetailList = result.data;
             
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
        var url = '/admin/order/orderMainControl/getOrderDetailSum.action?order_ids_str='+x.oil_orderid_str;
        http.post(url,null,success,error);
      }
    
      $scope.changeInvoiceState = function(x, state) {
        var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		x.oil_invoice_state=3;
		var url = "/admin/order/orderInvoiceLogControl/update.action";
		var	msg = '您确定要操作吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, x, success, error);
		}, function() {

		});
      }
      
      
      
      
      
      
      
      
      
     
      
      
    
      
      

    
     
      
     
    
      
     
  

  })