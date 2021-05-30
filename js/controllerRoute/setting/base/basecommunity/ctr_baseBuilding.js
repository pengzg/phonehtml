
tempApp.controller('ctr_baseBuilding', function($scope,
            $state,http,EzConfirm,$stateParams,messageFactory,$rootScope,dateUtil) {

$scope.bcm_id = $stateParams.bcm_id;

//$scope.pager = {page:1,rows:'20',sort:'bbd_state',order:'desc',pageList:['10','20','30'],bbd_shopid:$rootScope.USER.shopId};
$scope.pager = {page:1,rows:'20',sort:'bbd_add_time',order:'asc',pageList:['10','20','30'], 'bbd_communityid':$scope.bcm_id};
$scope.searchParam = {};
$scope.vo = {"bbd_state":1};    
$scope.showPic = false;
$scope.appidShow = false;
// $scope.dialogShow1 = false;
$scope.showExample = false;
$scope.stateList = [{'bbd_code':'', 'bbd_name':'全部'},{'bbd_code':'1', 'bbd_name':'启用'},{'bd_code':'0', 'bd_name':'禁用'}]


/**
 * 查询社区详情
 */
$scope.queryCommunityDetail = function(id){
    var success = function(result){
        $scope.communityVO = result.data;			
    }
    var error = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('error',result.desc);
    }
    var url = '/admin/base/baseCommunityControl/getDetail.action';
    
    http.post(url,{bcm_id:$scope.bcm_id},success,error);
}
$scope.queryCommunityDetail();

/**
 * 查询数据
 */

var queryBuildingList = function(){
    messageFactory.showLoading();
    var success = function(result){
        $scope.communityList = result.data.rows;
        $scope.pager.total=result.data.total;
        $scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
        messageFactory.closeLoading();
    }
    var error = function(result){
        messageFactory.closeLoading();
    }
    
    var url = '/admin/base/baseBuildingDoorControl/dataGrid.action';
    http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
//		http.post(url,$scope.pager,success,error);
}



$scope.toRemove = function(x){
    var success = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('success',result.desc);
        queryBuildingList();
    }
    var error = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('error',result.desc);
    }
    
    var data ={'bbd_id':x.bbd_id,addType:4}
    var url = "/admin/base/baseBuildingDoorControl/insertBatch.action";
    var	msg = '您确定清空绽定的用户吗？';
    EzConfirm.create({
        heading : '提示',
        text : msg
    }).then(function() {			
        http.post(url, data, success, error);
    }, function() {

    });
}
/**
 * 删除
 */
$scope.toDelete = function(x){
    var success = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('success',result.desc);
        queryBuildingList();
    }
    var error = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('error',result.desc);
    }
    
    var data ={'bbd_id':x.bbd_id}
    var url = "/admin/base/baseBuildingDoorControl/delete.action";
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
 * 条件查询
 */
$scope.doSearch = function(){
    if($scope.pager.page!=1){
        $scope.pager.page = 1;
    }
    queryBuildingList();
}


/**
 * 监听
 */
$scope.$watch(function(){
    var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
    return newValue;
},queryBuildingList);

/**
 * 显示添加弹框
 */
$scope.showDialog = function(){    
    $scope.dialogShow = true;
}

/**
 * 关闭添加弹框
 */
$scope.closeDialog = function(){
    $scope.showDialog();
    $scope.dialogShow = false;
}

//修改
$scope.toEdit = function(x){
    $scope.dialogTitle = '编辑信息';
    $scope.queryDetail(x.bbd_id);
    $scope.showDialog();

}


/**
 * 初始化数据
 */
$scope.save = function(){
    
    if (!$scope.vo.bbd_name) {
        messageFactory.showMessage('error',"请输入名称");
        return false;
    }

    $scope.vo.communityid = $scope.communityVO.bcm_id;
    
    var success = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('success',result.desc); 
        $scope.closeDialog();
        queryBuildingList();
    }

    
    
    var error = function(result){
        messageFactory.showMessage('error',result.desc);
        messageFactory.closeLoading();
        /*$scope.closeDialog();*/
    }
    
    var url = "/admin/base/baseBuildingDoorControl/update.action" ;
        var msg = '您确定修改数据吗？';
        
        EzConfirm.create({
            heading : '提示',
            text : msg
        }).then(function() {
            messageFactory.showLoading();
            http.post(url, $scope.vo, success, error);
        }, function() {

        });
}


/**
 * 初始化数据
 */
$scope.saveInit = function(){
    
    if (!$scope.vo.buildingNum) {
        messageFactory.showMessage('error',"请输入栋数");
        return false;
    }
    if ($scope.vo.buildingNum<=0) {
        messageFactory.showMessage('error',"楼栋数要大于0");
        return false;
    }
    
    if (!$scope.vo.unitNum) {
        messageFactory.showMessage('error',"请输入单元数");
        return false;
    }
    if ($scope.vo.unitNum<=0) {
        messageFactory.showMessage('error',"单元数要大于0");
        return false;
    }

    if (!$scope.vo.floorNum) {
        messageFactory.showMessage('error',"请输入楼层数");
        return false;
    }
    if ($scope.vo.floorNum<=0) {
        messageFactory.showMessage('error',"楼层数要大于0");
        return false;
    }

    if (!$scope.vo.doorNum) {
        messageFactory.showMessage('error',"请输入楼门数");
        return false;
    }
    if ($scope.vo.doorNum<=0) {
        messageFactory.showMessage('error',"楼门数要大于0");
        return false;
    }
    $scope.vo.communityid = $scope.communityVO.bcm_id;
    
    var success = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('success',result.desc);
        //$scope.vo={'bbd_state':1};
        $scope.closeInitDialog();
        $scope.doSearch();
    }

    
    
    var error = function(result){
        messageFactory.showMessage('error',result.desc);
        messageFactory.closeLoading();
        /*$scope.closeDialog();*/
    }
    
    var url = "/admin/base/baseBuildingDoorControl/insertInit.action" ;
        var msg = '您确定初始化数据吗？';
        
        EzConfirm.create({
            heading : '提示',
            text : msg
        }).then(function() {
            messageFactory.showLoading();
            http.post(url, $scope.vo, success, error);
        }, function() {

        });
}




/**
 * 添加楼栋
 */
$scope.saveBuilding = function(){
    if (!$scope.vo.buildingNum) {
        messageFactory.showMessage('error',"请输入栋数");
        return false;
    }
    
    $scope.vo.communityid = $scope.communityVO.bcm_id;
    $scope.vo.addType = '1';
    
    var success = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('success',result.desc);
        //$scope.vo={'bbd_state':1};
        $scope.closeBuildingDialog();
        $scope.doSearch();
    }

    var error = function(result){
        messageFactory.showMessage('error',result.desc);
        messageFactory.closeLoading();
        /*$scope.closeDialog();*/
    }
    
    var url = "/admin/base/baseBuildingDoorControl/insertBatch.action" ;
        var msg = '您确定添加楼栋数据吗？';
        
        EzConfirm.create({
            heading : '提示',
            text : msg
        }).then(function() {
            messageFactory.showLoading();
            http.post(url, $scope.vo, success, error);
        }, function() {

        });
}


/**
 * 添加楼栋
 */
$scope.saveUnit = function(){
    if (!$scope.vo.unitNum) {
        messageFactory.showMessage('error',"请输入单元数");
        return false;
    }
    if ($scope.vo.unitNum<=0) {
        messageFactory.showMessage('error',"单元数要大于0");
        return false;
    }

    if (!$scope.vo.floorNum) {
        messageFactory.showMessage('error',"请输入楼层数");
        return false;
    }
    if ($scope.vo.floorNum<=0) {
        messageFactory.showMessage('error',"楼层数要大于0");
        return false;
    }

    if (!$scope.vo.doorNum) {
        messageFactory.showMessage('error',"请输入楼门数");
        return false;
    }
    if ($scope.vo.doorNum<=0) {
        messageFactory.showMessage('error',"楼门数要大于0");
        return false;
    }

    console.log($scope.vo);

    $scope.vo.communityid = $scope.communityVO.bcm_id;
    $scope.vo.addType = '2';

    // return false;
    
    var success = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('success',result.desc);
        //$scope.vo={'bbd_state':1};
        $scope.closeUnitDialog();
        $scope.doSearch();
    }

    var error = function(result){
        messageFactory.showMessage('error',result.desc);
        messageFactory.closeLoading();
        /*$scope.closeDialog();*/
    }
    
    var url = "/admin/base/baseBuildingDoorControl/insertBatch.action" ;
        var msg = '您确定添加楼栋数据吗？';
        
        EzConfirm.create({
            heading : '提示',
            text : msg
        }).then(function() {
            messageFactory.showLoading();
            http.post(url, $scope.vo, success, error);
        }, function() {

        });
}

/**
 * 查询柜子明细
 */
$scope.queryDetail = function(id){
    var success = function(result){
        $scope.vo = result.data;
        messageFactory.closeLoading();
    }
    var error = function(result){
        messageFactory.showMessage('error',result.desc);
        messageFactory.closeLoading();
    }
    messageFactory.showLoading();
    var url = '/admin/base/baseBuildingDoorControl/getDetail.action';
    http.post(url,{bbd_id:id},success,error);
}


$scope.clearParams = function(){
   
}

$scope.addBuilding = function(){
    $scope.dialogTitle = '添加楼栋';
    $scope.showBuildingDialog();
}

$scope.showBuildingDialog = function(){
    $scope.showBuilding = true;
}

$scope.closeBuildingDialog = function(){
    $scope.showBuilding = false;
}


$scope.addUnit = function(x){
    $scope.vo={};
    $scope.vo.buildingId = x.bbd_id; 
    $scope.dialogTitle = '添加单元、楼层和楼门';
    $scope.showUnitDialog();
}

$scope.showUnitDialog = function(){
    $scope.showUnit = true;
}

$scope.closeUnitDialog = function(){
    $scope.showUnit = false;
}


/**
 * 初始化数据弹出窗口的控制
 */
$scope.addInit = function(){
    $scope.dialogTitle = '初始化数据';
    $scope.showInitDialog();
}

$scope.showInitDialog = function(){
    $scope.showInit = true;
}

$scope.closeInitDialog = function(){
    $scope.showInit = false;
}

$scope.goCommunityList = function(x){
    $state.go("index.setup.basecommunity");
}

})