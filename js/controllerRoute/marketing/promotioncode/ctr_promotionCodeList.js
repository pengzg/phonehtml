tempApp.controller('ctr_promotionCodeList', function($scope,
    $state,http,EzConfirm,messageFactory,$rootScope,dateUtil, $stateParams) {
$scope.pcr_id = $stateParams.pcr_id;

$scope.pager = {page:1,rows:'20',sort:'pc_add_time Desc ,pc_no',order:'desc',pageList:['10','20','30'],mt_shopid:$rootScope.USER.shopId, "mt_mtp_id":$scope.mt_mtp_id};
$scope.searchParam = {};

$scope.vo = {};



    /**
     * 查询数据
     */
    var queryTicket = function(){
        $scope.searchParam.startDate = $("#start_date").val();
        $scope.searchParam.endDate = $("#end_date").val();
        $scope.searchParam.pc_pcr_id= $scope.pcr_id;
        messageFactory.showLoading();
        var success = function(result){
            $scope.ticketList = result.data.rows;
            $scope.pager.total=result.data.total;
            $scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
            messageFactory.closeLoading();
        }
        var error = function(result){
            messageFactory.closeLoading();
        }
        var url = '/admin/ticket/promotionCodeControl/dataGrid.action';
        http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
    }

    /**
     * 条件查询
     */
    $scope.doSearch = function(){
        if($scope.pager.page!=1){
            $scope.pager.page = 1;
        }
        queryTicket();
    }

    $scope.searchFun = function(){
        if($scope.pager.page==1){
            queryTicket();
        }else{
            $scope.pager.page = 1;
        }
    }


    



    $scope.queryUseStateList = function(){
        $scope.useStateList = [];
        var success = function(result){
            for(var x in result.data){
                var code = result.data[x].bd_code; 
                var name = result.data[x].bd_name;
                var str = {'bd_code':code,'bd_name':name};
                $scope.useStateList.push(str);
            }
            $scope.useStateList.unshift({'bd_code':'','bd_name':"全部状态"});
        }
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
        }
        var url = '/admin/base/baseDataControl/detailItem.action?codekey=2177';
        http.post(url,null,success,error);
    }
    $scope.queryUseStateList();

    /**
     * 监听
     */
    $scope.$watch(function(){
        var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
        return newValue;
    },queryTicket);

    $scope.clearInput = function(){
        $scope.searchParam= {};
        $("#start_date").val('');
        $("#end_date").val('');
    }


    $scope.goRelList = function(){
        $state.go("index.marketing.promotioncoderellist");
    }

    
})