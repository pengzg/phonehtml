tempApp.controller('ctr_promotionCodeRelList', function($scope,
    $state,http,EzConfirm,messageFactory,$rootScope,dateUtil) {
$scope.pager = {page:1,rows:'20',sort:'pcr_add_time ',order:'desc',pageList:['10','20','30'],pcr_shopid:$rootScope.USER.shopId};
$scope.searchParam = {};
$scope.vo = {};

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
    var url = '/admin/ticket/promotionCodeRelationControl/dataGrid.action';
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
        $state.go("index.marketing.promotioncodereladd");
    }

    $scope.clearInput = function(){
        $scope.searchParam= {};
        $("#start_date").val('');
        $("#end_date").val('');
    }

    /**
     * 
     * @param {对象} x 
     * @param {状态} state 
     */
    $scope.changeOpenState = function(x, state){
        var success = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('success',result.desc);
            $scope.doSearch();
        }
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
        }  
        var url = "/admin/ticket/promotionCodeRelationControl/changeOpenState.action";
        var msg = "您确定要操作吗？"
        EzConfirm.create({
            heading : '提示',
            text : msg
        }).then(function() {			
            http.post(url, {pcr_id:x.pcr_id, pcr_open_state:state}, success, error);
        }, function() {
            
        });
    }

   
    /**
     * 导出
     */
    $scope.doExport = function(x){
		/* var success = function(result){
			
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		} */
		//var url = '/admin/ticket/materialTicketControl/doDetailExport.action';
		var url = '/admin/ticket/promotionCodeControl/doDetailExport.action?pc_pcr_id='+x.pcr_id+"&pcr_type="+x.pcr_type+"&title="+x.pcr_title;
		window.location.href = url;
		//http.post(url,{mt_pcr_id:x.pcr_id, pcr_type:x.pcr_type, "pcr_title":x.pcr_title},success,error);
    }
    // 编辑
    $scope.goEdit = function(x) {
        $state.go("index.marketing.promotioncodereladd", {"pcr_id":x.pcr_id});
    }

    $scope.goPCList = function(x){
        $state.go("index.marketing.promotioncodelist", {"pcr_id":x.pcr_id});
	}

})