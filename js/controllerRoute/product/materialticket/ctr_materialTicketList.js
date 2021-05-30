tempApp.controller('ctr_materialTicketList', function($scope,
    $state,http,EzConfirm,messageFactory,$rootScope,dateUtil, $stateParams) {
$scope.mt_mtp_id = $stateParams.mt_mtp_id;

$scope.pager = {page:1,rows:'20',sort:'mt_add_time Desc ,mt_no',order:'desc',pageList:['10','20','30'],mt_shopid:$rootScope.USER.shopId, "mt_mtp_id":$scope.mt_mtp_id};
$scope.searchParam = {};
$scope.mt_id = "";
$scope.salesid = "";
$scope.salesid_nameref = "";
$scope.vo = {};

/**
	 * 查询mtc详情
	 */
	$scope.queryMTPDetail = function(id){
		var success = function(result){
			$scope.mtpVO = result.data;
			
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/ticket/materialTicketProductControl/getDetail.action';
		
		http.post(url,{mtp_id:$scope.mt_mtp_id},success,error);
	}
	$scope.queryMTPDetail();

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
        var url = '/admin/ticket/materialTicketControl/dataGrid.action';
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


    $scope.goProductList = function(){
        $state.go("index.product.materialproductlist", {"mtc_id":$scope.mtpVO.mtp_mtc_id});
    }

    /**
	 * 查询业务员列表
	 */
    $scope.baseWorkList = [];
    $scope.baseWorkPager = {page:1,rows:'100',sort:'mbw_id',order:'desc',pageList:['10','20','30']};
	$scope.baseWorkSearchParam = {};
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
		http.post(url,$.extend({"mbw_state":1,"mbw_dr":1,"mbw_shopid":$rootScope.USER.shopId},$scope.baseWorkPager,$scope.baseWorkSearchParam),success,error);
	}
    $scope.queryDeliveryman();
    
    $scope.chooseSales = function(x) {
        $scope.dialogShow3 = 1;
        $scope.mt_id = x.mt_id;
    }

    $scope.chooseSalesMan = function(x) {
        $scope.salesid = x.mbw_memberid;
        $scope.salesid_nameref = x.mbw_name;
    }

    $scope.sendToSales = function(){
        if (!$scope.salesid) {
            messageFactory.showMessage('error',"请选择业务员");
            return false;
        }
        var success = function(result){
            $scope.closeSend();
            messageFactory.showMessage('success',result.desc);
            $scope.doSearch();
        }
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
        }  
        var url = "/admin/ticket/materialTicketControl/sendTicketToSales.action";
        var msg = "您确定要操作吗？"
        EzConfirm.create({
            heading : '提示',
            text : msg
        }).then(function() {			
            http.post(url, {mt_id:$scope.mt_id, salesid:$scope.salesid}, success, error);
        }, function() {
            
        });
    }


    $scope.closeSend = function(){
        $scope.mt_id = "";
        $scope.salesid = "";
        $scope.salesid_nameref = "";
        $scope.dialogShow3 = 0;
    }
})