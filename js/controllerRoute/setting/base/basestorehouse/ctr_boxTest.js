tempApp.controller('ctr_boxTest', function($scope,
    $state,http,EzConfirm,messageFactory,$rootScope) {
$scope.pager = {page:1,rows:'20',sort:'otr_addtime',order:'desc',pageList:['10','20','30'],otr_shopid:$rootScope.USER.shopId, "otr_state":3};
$scope.searchParam = {};
$scope.vo = {};
$scope.showPic = false;
$scope.appidShow = false;
$scope.showExample = false;
/**
 * 查询数据
 */
var queryRecordList = function(){
    messageFactory.showLoading();
    var success = function(result){
        $scope.baseStorehouseList = result.data.rows;
        $scope.pager.total=result.data.total;
        $scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
        messageFactory.closeLoading();
    }
    var error = function(result){
        messageFactory.closeLoading();
    }
    var url = '/admin/ticket/orderTemporaryRecordControl/dataGrid.action';
    http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
}




/**
 * 条件查询
 */
$scope.doSearch = function(){
    if($scope.pager.page!=1){
        $scope.pager.page = 1;
    }
    queryRecordList();
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
},queryRecordList);


$scope.changeState = function(state){
    if (!$scope.otr_id) {
        messageFactory.showMessage('error',"请输入值");
        return false;
    }
    var success = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('success',"成功");
        $scope.doSearch();
    }
    var error = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('error',result.desc);
    }
    
    var data ={'interimId':$scope.otr_id, "status":state, "box_code":"01"}
    var url = "/mobile/storeApp/storeAppGoodsControl/noticOrder.action";
    var	msg = '您确定修改本条记录吗？';
    EzConfirm.create({
        heading : '提示',
        text : msg
    }).then(function() {			
        http.post(url, data, success, error);
    }, function() {

    });
}


})