tempApp.controller('ctr_exportMemberBuyAgain', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    $scope.pager = {page:1,rows:'20',sort:'om_order_time',order:'desc',om_order_type:'3',pageList:['10','20','30'],om_shopid:$rootScope.USER.shopId};
    $scope.searchParam = {};
    $scope.dateNow = dateUtil.getDate2();
      $scope.searchParam.startDate = $scope.dateNow;
      $scope.searchParam.endDate = $scope.dateNow;
      $("#start_date").val($scope.searchParam.startDate);
      $("#end_date").val($scope.searchParam.endDate);
    //$scope.orderList = [{selected:false},{selected:false},{selected:false},{selected:false}]
    $scope.selectItem = [];
    $scope.selectAll = false;
    $scope.vo = {};
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
    
    $scope.tab = ['',6,5];
    
    /**
     * 页签切换
     */
    $scope.chooseTab = function(tab){
        $scope.activeTab = tab;
        $scope.searchParam.om_state = $scope.tab[tab];
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
    
    $scope.selectPayWays = function(){
        $scope.searchParam.om_pay_ways = $scope.om_pay_ways;
        queryList();
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
      
      $scope.bd_code ;
  
      
      $scope.refundQS = function(om_id){
          var success = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('success',result.desc);
              $scope.doSearch();
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }  
          var url = "/admin/order/orderRefundControl/refundQS.action";
          var msg = "您确定退款么？"
          EzConfirm.create({
              heading : '提示',
              text : msg
          }).then(function() {			
              http.post(url, {om_id:om_id}, success, error);
          }, function() {
              
          });
      }
      
      /**
       * 查询
       */
      $scope.doSearch = function(){
          $scope.searchParam.startDate = $('#start_date').val();
           $scope.searchParam.endDate = $('#end_date').val();
          $scope.searchParam.searchKey = $scope.searchKey;
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
          $scope.searchKey = '';
          $scope.searchParam.searchKey = '';
          $scope.searchParam.om_pay_type = '';
          $scope.searchParam.om_state = $scope.bd_code='';
          $scope.searchParam.om_pay_ways = '';
          $('#start_date').val($scope.dateNow);
          $('#end_date').val($scope.dateNow);
          $scope.searchParam.startDate = $scope.dateNow;
          $scope.searchParam.endDate = $scope.dateNow;
          $scope.searchParam.om_storeid = '';
          $scope.doSearch();
      }
      
      
      /**
       * 查询订单详情
       */
      $scope.queryOrderDetail = function(id){
          
          var success = function(result){
              $scope.vo.orderVO = result.data.orderMainVO;
              $scope.vo.list = result.data.detailList;
              $scope.queryBillRecord($scope.vo.orderVO.om_order_code);
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/order/orderDetailControl/queryOrderDetail.action';
          
          http.post(url,{om_id:id},success,error);
      }
      
      /**
       * 查询操作日志
       */
      $scope.queryOperateLog = function(id){
          var success = function(result){
              $scope.logList = result.data;
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/order/orderLogControl/queryLogList.action';
          
          http.post(url,{om_id:id},success,error);
      }
      
      
      /**
       * 打开备注弹窗
       */
      $scope.showRemarksDialog = function(){
          $scope.dialogShow = true;
      }
      
      /**
       * 关闭备注弹窗
       */
      $scope.closeRemarksDialog = function(){
          $scope.dialogShow = false;
      }
      
      /**
       * 添加备注信息 type=1 商品备注 type=2 整单备注
       */
      $scope.addRemarks = function(type,id){
          $scope.showRemarksDialog();
          $scope.type = type;
          $scope.id = id;
          $scope.getRemarks(type,id);
      }
      
      /**
       * 查询备注信息
       */
      $scope.getRemarks = function(type,id){
          var success = function(result){
              console.log(result.data);
              if(type == 1){
                  $("#remak").val(result.data.od_remarks);
              }else{
                  $("#remak").val(result.data.om_remarks);
              }
              messageFactory.showMessage('success',result.desc);
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/order/orderDetailControl/getRemarks.action';
          var data = {'type':type,'id':id};
          http.post(url,data,success,error);
      }
      /**
       * 保存备注
       */
      $scope.saveRemark = function(){
          $scope.closeRemarksDialog();
          var success = function(result){
              messageFactory.showMessage('success',result.desc);
              $scope.vo.orderVO.om_remarks = $("#remak").val();
              $("#remak").val("");
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/order/orderDetailControl/updateRemarks.action';
          var remarks = $("#remak").val();
          var data = {'type':$scope.type,'id':$scope.id,'remarks':remarks};
          http.post(url,data,success,error);
      }
      /**
       * 删除
       */
      $scope.deleteOrder = function(id){
          var success = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('success',result.desc);
              queryList();
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var data ={'om_id':id}
          var url = "/admin/order/orderMainControl/delete.action";
          var	msg = '您确定删除本条记录吗？';
          EzConfirm.create({
              heading : '提示',
              text : msg
          }).then(function() {			
              http.post(url, data, success, error);
          }, function() {
          });
      }
      
      /**
       * 查询待出库商品清单
       */
      $scope.queryDckGoodsList = function(id,storeId){
          var success = function(result){
              $scope.dckGoodsList = result.data;
              for(i in $scope.dckGoodsList){
                  $scope.dckGoodsList[i].outNum = $scope.dckGoodsList[i].od_product_num-$scope.dckGoodsList[i].od_delivery_num;
                  if($scope.dckGoodsList[i].pss_stocknum<=0){
                      $scope.dckGoodsList[i].outNum = 0;
                  }
                  else if($scope.dckGoodsList[i].pss_stocknum<=$scope.dckGoodsList[i].outNum){
                      $scope.dckGoodsList[i].outNum = $scope.dckGoodsList[i].pss_stocknum;
                  }
              }
              $scope.goodsKindNum = $scope.dckGoodsList.length;
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/order/orderDetailControl/queryDckGoodsList.action';
          var data = {'om_id':id,'store_id':storeId};
          http.post(url,data,success,error);
      }
      
      
      $scope.shopPager = {page:1,rows:'10',sort:'bs_id',order:'desc',pageList:['10','20','30']};
      $scope.shopSearchParam = {};
      /**
       * 查询出库仓库
       */
      $scope.queryHouse = function(){
          $scope.houseList = [];
          var success = function(result){
              for(x in result.data){
                  var bs_id = result.data[x].bs_id;
                  var bs_name = result.data[x].bs_name;
                  var str = {'bs_id':bs_id,'bs_name':bs_name};
                  $scope.houseList.push(str);
              }
              $scope.bs_name = $scope.houseList[0].bs_name;
              $scope.bs_id = $scope.houseList[0].bs_id;
              $scope.queryDckGoodsList($scope.om_id,$scope.bs_id);
              //$scope.houseList.unshift({'bs_id':'','bs_name':'默认仓'});
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/base/baseStorehouseControl/queryItemList.action';
          http.post(url,$scope.shopSearchParam,success,error);
      }
      /**
       * 选择出库仓库
       */
      $scope.chooseHouse = function(bs_id,bs_name){
          $scope.bs_name = bs_name;
          $scope.bs_id = bs_id;
          $scope.queryDckGoodsList($scope.om_id,bs_id);
      }
      
      /**
       * 查询出库/发货记录
       */
      $scope.queryDeliveryRecord = function(code){
          var success = function(result){
              $scope.deliveryList = result.data;
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/order/orderDeliveryDetailControl/queryDeliveryRecord.action';
          var data = {'order_code':code};
          http.post(url,data,success,error);
      }
      
      /**
       * 查询收款记录
       */
      $scope.queryBillRecord = function(code){
          var success = function(result){
              $scope.billList = result.data;
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/gl/glReceiptBillControl/queryBillRecord.action';
          var data = {'order_code':code};
          http.post(url,data,success,error);
      }
      
      /**
       * 显示发货出库弹框
       */
      $scope.showDeliveryDialog = function(){
          $scope.deliveryAmount=0;
          $scope.goodstotalNum=0;
          
          for(var i in $scope.dckGoodsList){
              if(!$scope.dckGoodsList[i].outNum)
                  $scope.dckGoodsList[i].outNum=0;
              $scope.deliveryAmount = $scope.deliveryAmount+$scope.dckGoodsList[i].od_sale_price*$scope.dckGoodsList[i].outNum;
              $scope.goodstotalNum = $scope.goodstotalNum +parseInt($scope.dckGoodsList[i].outNum);
          }
          if($scope.goodstotalNum == 0){
              messageFactory.showMessage('error','发货数量不能为0');
              return;
          }
          $scope.dialogShow3 = true;
      }
      
      $scope.closeDeliveryDialog = function(){
          $scope.bs_name = '';
          $scope.bs_id = '';
          $scope.workManName = '';
          $scope.workManId = '';
          $scope.deliveryAmount = '';
          $scope.dialogShow3 = false;
      }
      
      $scope.baseWorkPager = {page:1,rows:'10',sort:'mbw_id',order:'desc',pageList:['10','20','30']};
      $scope.baseWorkSearchParam = {};
      /**
       * 查询配送员列表
       */
      $scope.queryDeliveryman = function(){
          var success = function(result){
              $scope.baseWorkList = result.data.rows;
              $scope.baseWorkPager.total = result.data.total;
              $scope.baseWorkPager.pageTotal = Math.ceil($scope.baseWorkPager.total/$scope.baseWorkPager.rows);
              messageFactory.closeLoading();
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/member/memberBaseWorkControl/dataGrid.action';
          http.post(url,$.extend({},$scope.baseWorkPager,$scope.baseWorkSearchParam),success,error);
      }
      /**
       * 选择配送人员
       */
      $scope.chooseWorkMan = function(id,name){
          $scope.workManName = name;
          $scope.workManId = id;
      }
      
      $scope.deleteInput = function(){
          $scope.workManName = '';
          $scope.workManId = '';
      }
      
      /**
       * 提交发货出库
       */
      $scope.saveDelivery = function(){
          var success = function(result){
              messageFactory.closeLoading();
              $scope.closeDeliveryDialog();
              $scope.queryDeliveryRecord($scope.om_order_code);
              $scope.queryDckGoodsList($scope.om_id,$scope.bs_id);
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          for(var i in $scope.dckGoodsList){
              var num = $scope.dckGoodsList[i].od_delivery_num+parseInt($scope.dckGoodsList[i].outNum);
              if($scope.dckGoodsList[i].od_product_num < num){
                  messageFactory.showMessage('error',$scope.dckGoodsList[i].od_product_name+'本次出库数已超');
                  $scope.closeDeliveryDialog();
                  return;
              }
          }
          
          var dckGoodsListStr = JSON.stringify($scope.dckGoodsList);
          var url = "/admin/order/orderDetailControl/insertOrderDelivery.action";
          var data = {'deliveryStoreId':$scope.bs_id,
                      'deliveryTotalNum':$scope.goodstotalNum,
                      'deliverymanId':$scope.workManId,
                      'deliveryAmount':$scope.deliveryAmount,
                      'orderMainId': $scope.om_id,
                      'orderDetailListStr':dckGoodsListStr,
                      'orderCode': $scope.om_order_code,
                      'memberId':$scope.vo.orderVO.om_memberid,
                      'consigneename':$scope.vo.orderVO.om_consignee_name,
                      'consigneemobile':$scope.vo.orderVO.om_consignee_mobile,
                      'consigneeaddress':$scope.vo.orderVO.om_consignee_address,
                      'orderRemarks':$scope.vo.orderVO.om_remarks};
          var	msg = '您确定出库发货吗？';
          EzConfirm.create({
              heading : '提示',
              text : msg
          }).then(function() {			
              http.post(url, data, success, error);
          }, function() {
          });
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
      $scope.queryOrderDetail($scope.om_id);
      $scope.queryOperateLog($scope.om_id);
      $scope.orderMainVO = object;
    }
    $scope.hideItem = function(){
      $('.right-pop').hide();
      }
      
          /**
       * 查询订单状态
       */
      $scope.payTypeList = [];
      $scope.queryPayTypeList = function(){
          var success = function(result){
              $scope.payTypeList =  result.data
                  
               $scope.payTypeList.unshift({'bd_code':'','bd_name':"全部"});
          }
            var error = function(result){
                messageFactory.closeLoading();
                messageFactory.showMessage('error',result.desc);
            }
          var url = '/admin/base/baseDataControl/detailItem.action?codekey=1047';
          http.post(url,null,success,error);
      }
      $scope.queryPayTypeList();
  
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
              $scope.storeList.unshift({'bs_code':'','bs_name':'请选择柜子'});
          }
          var error = function(){
              
          }
          var url = "/admin/base/baseStorehouseControl/queryItemList.action";
          http.post(url,{searchKey:"", "bs_type":4,bs_shopid:$rootScope.USER.shopId},success,error);
      }
      $scope.getStoreHouse();
  })