tempApp.controller('ctr_orderProductDetail', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,$rootScope) {

    $scope.pager = {page:1,rows:'10',sort:'od_id',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
    $scope.om_id = $stateParams.om_id;
    $scope.om_order_code = $stateParams.om_order_code;
    $scope.showBoxLogs = false;
    $scope.vo = {};
        /**
         * 切换tab
         */
        $scope.changeTab = function(tabId){
            $scope.order_tab=tabId;
            if(tabId=='1'){
                $scope.queryOrderDetail($stateParams.om_id);
                $scope.queryOperateLog($stateParams.om_id);
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
       * 查询订单详情
       */
      $scope.queryOrderDetail = function(id){
          var success = function(result){
              // $scope.vo = result.data;
              $scope.vo = result.data;
              
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/ordergoods/orderGoodsMainControl/getDetail.action';
          
          http.post(url,{ogm_id:id},success,error);
      }
      $scope.queryOrderDetail($stateParams.om_id);
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
      $scope.queryOperateLog($stateParams.om_id);
      
      /**
       * 查询开箱日志
       */
      $scope.boxpager = {page:1,rows:'10',sort:'owr_start_time',order:'desc',pageList:['10','20','30']};
      $scope.queryBoxOperateLog = function(){
          var success = function(result){
              $scope.boxLogList = result.data.rows;
              $scope.boxpager.total=result.data.total;
              $scope.boxpager.pageTotal = Math.ceil($scope.boxpager.total/$scope.boxpager.rows);
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/ticket/orderWaterRecordControl/dataGrid.action';
          
          http.post(url,$.extend({owr_orderid:$stateParams.om_id},$scope.boxpager),success,error);
      }
      $scope.queryBoxOperateLog();
      
      /**
       * 监听
       */
      $scope.$watch(function(){
          var newValue = $scope.boxpager.page+' '+$scope.boxpager.rows+' '+$scope.boxpager.sort+' '+$scope.boxpager.order+' ';
          /*for(var x in $scope.searchParam){
              newValue = newValue + x+'='+$scope.searchParam[x]+'&';
          }*/
          return newValue;
      },$scope.queryBoxOperateLog);
      
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
       * 查询待出库商品清单
       */
      $scope.goodsStock = {};
      $scope.queryDckGoodsList = function(id,store_id){
          var success = function(result){
              $scope.dckGoodsList = result.data;
              for(i in $scope.dckGoodsList){
                  $scope.goodsStock[$scope.dckGoodsList[i].od_product_skuid] = $scope.dckGoodsList[i].pss_stocknum;
              }
              var temp = angular.copy($scope.goodsStock);
              for(i in $scope.dckGoodsList){
                  $scope.dckGoodsList[i].outNum = $scope.dckGoodsList[i].od_product_num-$scope.dckGoodsList[i].od_delivery_num;
                  if($scope.dckGoodsList[i].pss_stocknum<=0){
                      $scope.dckGoodsList[i].outNum = 0;
                  }else if(temp[$scope.dckGoodsList[i].od_product_skuid]<=$scope.dckGoodsList[i].outNum){
                      $scope.dckGoodsList[i].outNum = temp[$scope.dckGoodsList[i].od_product_skuid];
                      temp[$scope.dckGoodsList[i].od_product_skuid] = 0;
                  }else if(temp[$scope.dckGoodsList[i].od_product_skuid]>$scope.dckGoodsList[i].outNum){
                      temp[$scope.dckGoodsList[i].od_product_skuid] = temp[$scope.dckGoodsList[i].od_product_skuid] - $scope.dckGoodsList[i].outNum;
                  }
              }
              $scope.goodsKindNum = $scope.dckGoodsList.length;
          }
          var error = function(result){
              messageFactory.closeLoading();
              messageFactory.showMessage('error',result.desc);
          }
          var url = '/admin/order/orderDetailControl/queryDckGoodsList.action';
          var data = {'om_id':id,'store_id':store_id};
          http.post(url,data,success,error);
      }
      
      
      $scope.shopSearchParam = {bs_stats:1,bs_dr:1};
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
          $scope.shopSearchParam.bs_type_arr = "1,2,3";
          $scope.shopSearchParam.bs_shopid = $rootScope.USER.shopId;
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
          $scope.deliveryList=[];
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
          $scope.productAmount=0;
          for(var i in $scope.dckGoodsList){
              if(!$scope.dckGoodsList[i].outNum)
                  $scope.dckGoodsList[i].outNum=0;
              $scope.productAmount = $scope.productAmount+$scope.dckGoodsList[i].od_sale_price*$scope.dckGoodsList[i].outNum;
              $scope.goodstotalNum = $scope.goodstotalNum +parseInt($scope.dckGoodsList[i].outNum);
          }
          if($scope.goodstotalNum == 0){
              messageFactory.showMessage('error','发货数量不能为0');
              return;
          }
          $scope.dialogShow3 = true;
      }
      
      $scope.outNumChange = function(x,index){
          var num = x.outNum+"";
          num=num.replace(/[^0-9]/ig,"");
          x.outNum = parseInt(num);
          if(!x.outNum){
              x.outNum = 0;
          }
          if(x.outNum<0){
              x.outNum = 0;
          }
          var num = 0;
          for(i in $scope.dckGoodsList){
              if($scope.dckGoodsList[index].od_product_skuid = $scope.dckGoodsList[i].od_product_skuid){
                  num = num+$scope.dckGoodsList[i].outNum;
              }
          }
          if(num>$scope.goodsStock[$scope.dckGoodsList[index].od_product_skuid]){
              for(i in $scope.dckGoodsList){
                  $scope.goodsStock[$scope.dckGoodsList[i].od_product_skuid] = $scope.dckGoodsList[i].pss_stocknum;
              }
              var temp = angular.copy($scope.goodsStock);
              for(i in $scope.dckGoodsList){
                  $scope.dckGoodsList[i].outNum = $scope.dckGoodsList[i].od_product_num-$scope.dckGoodsList[i].od_delivery_num;
                  if($scope.dckGoodsList[i].pss_stocknum<=0){
                      $scope.dckGoodsList[i].outNum = 0;
                  }else if(temp[$scope.dckGoodsList[i].od_product_skuid]<=$scope.dckGoodsList[i].outNum){
                      $scope.dckGoodsList[i].outNum = temp[$scope.dckGoodsList[i].od_product_skuid];
                      temp[$scope.dckGoodsList[i].od_product_skuid] = 0;
                  }else if(temp[$scope.dckGoodsList[i].od_product_skuid]>$scope.dckGoodsList[i].outNum){
                      temp[$scope.dckGoodsList[i].od_product_skuid] = temp[$scope.dckGoodsList[i].od_product_skuid] - $scope.dckGoodsList[i].outNum;
                  }
              }
          }
      }
      
      $scope.closeDeliveryDialog = function(){
          $scope.workManName = '';
          $scope.workManId = '';
          $scope.deliveryAmount = 0;
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
          http.post(url,$.extend({"mbw_state":1,"mbw_dr":1,"mbw_isdelivery":'Y',"mbw_shopid":$rootScope.USER.shopId},$scope.baseWorkPager,$scope.baseWorkSearchParam),success,error);
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
          // 配送员
          if (!$scope.workManId) {
              messageFactory.showMessage('error', "请选择配送员");
              return false;
          }
          
          
          var success = function(result){
              messageFactory.closeLoading();
              
              $scope.closeDeliveryDialog();
              $scope.queryDeliveryRecord($scope.om_order_code);
              $scope.queryDckGoodsList($scope.om_id,$scope.bs_id);
              $scope.queryOrderDetail($stateParams.om_id);
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
                      'productAmount':$scope.productAmount,
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
      
      $scope.addBill = function(){
          $scope.dialogShow2=true;
          $scope.billInfo={};
          $scope.billInfo.grb_total_amount = $scope.vo.orderVO.om_settlement_amount - $scope.vo.orderVO.om_collect_amount;
      }
      $scope.closeBill = function(){
          $scope.dialogShow2=false;
      }
      $scope.changeDate = function(){
          
      }
      $scope.saveBill = function(){
          $scope.billInfo.grb_sourceid = $scope.vo.orderVO.om_id;
          $scope.billInfo.grb_sourcecode = $scope.vo.orderVO.om_order_code;
          $scope.billInfo.grb_pay_time = $("#start_date").val();
          var success = function(result){
              $scope.closeBill();
              messageFactory.showMessage('success',result.desc);
          }
          var error = function(result){
              messageFactory.showMessage('error',result.desc);
          }
          var url="";
          EzConfirm.create({
              heading : '提示',
              text : "确认添加收款信息？"
          }).then(function() {			
              http.post(url, $scope.billInfo, success, error);
          }, function() {
              
          });
          
      }
      $scope.goBack = function(){
          window.history.back();
      }
  })