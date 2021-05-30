tempApp.controller('ctr_materialProductList', function($scope,
    $state,http,EzConfirm,$stateParams,messageFactory,$rootScope,dateUtil) {
$scope.mtc_id = $stateParams.mtc_id;

$scope.pager = {page:1,rows:'20',sort:'mtp_add_time ',order:'desc',pageList:['10','20','30'],mtp_shopid:$rootScope.USER.shopId, 'mtp_mtc_id':$scope.mtc_id};
$scope.searchParam = {};
$scope.vo = {};

    /**
	 * 查询mtc详情
	 */
	$scope.queryMTCDetail = function(id){
        if (!id) {
            return false;
        }
		var success = function(result){
			$scope.mtcVO = result.data;			
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/ticket/materialTicketCodeControl/getDetail.action';
		
		http.post(url,{mtc_id:$scope.mtc_id},success,error);
	}
	$scope.queryMTCDetail($scope.mtc_id);
    /**
     * 查询数据
     */
    var queryTicket = function(){
        $scope.searchParam.startDate = $("#start_date").val();
        $scope.searchParam.endDate = $("#end_date").val();
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
        var url = '/admin/ticket/materialTicketProductControl/dataGrid.action';
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


    /**
     * 排序方法
     */
    $scope.sortFun = function(name,flag){
        if(!flag){
            return 'colorCenter noSortCss';
        }
        if($scope.pager.sort==name&&$scope.pager.order=='asc'){
            return 'SortAscCss'
        }
        if($scope.pager.sort==name&&$scope.pager.order=='desc'){
            return 'SortDescCss'
        }
    }

    /**
     * 点击切换排序
     */
    $scope.clickSortFun = function(name){
        if($scope.pager.sort!=name){
            $scope.pager.sort = name;
            $scope.pager.order = 'asc';
        }
        if($scope.pager.sort==name){
            if($scope.pager.order=='asc'){
                $scope.pager.order = 'desc';
            }else{
                $scope.pager.order = 'asc';
            }
        }
    }





    /**
     * 监听
     */
    $scope.$watch(function(){
        var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
        return newValue;
    },queryTicket);

    $scope.goAdd = function(){
        $state.go("index.product.materialproductadd", {"mtc_id":$scope.mtc_id});
    }

    $scope.clearInput = function(){
        $scope.searchParam= {};
        $("#start_date").val('');
        $("#end_date").val('');
    }
    // 跳到实物水票列表
    $scope.goMaterialList = function(x) {
        $state.go("index.product.materialticketlist", {"mt_mtp_id": x.mtp_id});
    }


    $scope.goEdit = function(x) {
        $state.go("index.product.materialproductadd", {"mtc_id":$scope.mtc_id, "mtp_id": x.mtp_id});
    }


    $scope.changeOpenState = function(x, state){

        if (state ==2) {
            if (!x.mtp_productid) {
                messageFactory.showMessage('error',"没有关联商品，不能开启");
                return false;
            }
        }

        var success = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('success',result.desc);
            $scope.doSearch();
        }
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
        }  
        var url = "/admin/ticket/materialTicketProductControl/changeOpenState.action";
        var msg = "您确定要操作吗？"
        EzConfirm.create({
            heading : '提示',
            text : msg
        }).then(function() {			
            http.post(url, {mtp_id:x.mtp_id, mtp_open_state:state}, success, error);
        }, function() {
            
        });
    }


    $scope.goCodeList = function(){
        $state.go("index.product.materialcodelist");
    }
})