tempApp.controller('ctr_stockOut', function($scope, $rootScope, $location,
    $state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,sessionFactory) {
$scope.pager = {page:1,rows:'10','eim_dr':1,sort:'eim_add_time',order:'DESC',pageList:['10','20','30']};
$scope.searchParam = {};
$scope.searchParam.startDate = dateUtil.getDate2();
$scope.searchParam.endDate = dateUtil.getDate2();
$("#start_date").val($scope.searchParam.startDate);
$("#end_date").val($scope.searchParam.endDate);
$scope.erpMainInfo = {};
$scope.dialog = 0;


    /**ctr_stockInList
     * 查询列表
     */
    var queryErpList = function(){
        
        messageFactory.showLoading();
        $scope.searchParam.startDate = $("#start_date").val();
        $scope.searchParam.endDate = $("#end_date").val();
        var success = function(result){
            $scope.erpList = result.data.rows;
            $scope.pager.total=result.data.total;
            $scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
            messageFactory.closeLoading();
        };
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
            
        };
        $scope.searchParam.eim_type = 301;
        $scope.searchParam.eim_shopid = $rootScope.USER.shopId;
        var url = '/admin/erp/erpInoroutMainControl/dataGrid.action';
        http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
    };




    /**
     * 查询
     */
    $scope.searchFun = function(){
        
        if($scope.pager.page==1){
            queryErpList();
        }else{
            $scope.pager.page = 1;
        }
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
            $scope.storeList.unshift({'bs_code':'','bs_name':'请选择仓库'});
        }
        var error = function(){
            
        }
        var url = "/admin/base/baseStorehouseControl/queryItemList.action";
        http.post(url,{searchKey:"",bs_shopid:$rootScope.USER.shopId},success,error);
    }
    $scope.getStoreHouse();


    /**
     * 监听
     */
    $scope.$watch(function(){
        var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
        return newValue;
    },queryErpList);

    /**
     * 详情
     */
    $scope.goDetail = function(x) {
        $scope.dialog = 2;
        $scope.getDetail(x);
        /*var url = $state.href("index.stock.stockdetail",{"eim_id":x.eim_id});
        window.open(url,'_blank');*/
        //$state.go("index.stock.stockdetail",{"eim_id":x.eim_id});
    }

    $scope.closeDialog = function(){
        $scope.dialog = 0;
    }
    /**
     * 详情
     */
    $scope.getDetail = function(x) {
        messageFactory.showLoading();
        var success = function(result){
            $scope.vo = result.data;
            
            messageFactory.closeLoading();
        };
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
            
        };
        var data = {"eim_id":x.eim_id};
        var url = '/admin/erp/erpInoroutMainControl/getDetail.action';
        http.post(url,data,success,error);
    }

    $scope.startViewer = function(){
        $('#viewer').viewer();
    }

    $scope.clearParams = function(){
        $('#start_date').val(dateUtil.getDate2());
        $('#end_date').val(dateUtil.getDate2());
        $scope.searchParam.searchKey = "";
        $scope.searchParam.eim_storeid = "";
        $scope.searchParam.eim_stock_type = "";
    }

    $scope.stockTypeList = [];
    $scope.queryStockTypeList = function(){
        var success = function(result){
                
                $scope.stockTypeList = result.data;
                $scope.stockTypeList.unshift({'bd_code':'','bd_name':'请选择类型'});
            }
            var error = function(result){
                messageFactory.closeLoading();
                messageFactory.showMessage('error',result.desc);
            }
        var url = '/admin/base/baseDataControl/detailItem.action?codekey=2112';
        http.post(url,null,success,error);
    }
    $scope.queryStockTypeList();
})