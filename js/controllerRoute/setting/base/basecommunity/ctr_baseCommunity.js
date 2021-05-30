tempApp.controller('ctr_baseCommunity', function($scope,
    $state,http,EzConfirm,messageFactory,$rootScope) {
$scope.pager = {page:1,rows:'20',sort:'bcm_state',order:'desc',pageList:['10','20','30'],bcm_shopid:$rootScope.USER.shopId};
$scope.searchParam = {};
$scope.vo = {"bcm_state":1};    
$scope.showPic = false;
$scope.appidShow = false;
$scope.showExample = false;
$scope.stateList = [{'bd_code':'', 'bd_name':'全部'},{'bd_code':'1', 'bd_name':'启用'},{'bd_code':'0', 'bd_name':'禁用'}]
/**
 * 查询数据
 */

var queryCommunityList = function(){
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
    
    var url = '/admin/base/baseCommunityControl/dataGrid.action';
    http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
//		http.post(url,$scope.pager,success,error);
}


/**
 * 删除
 */
$scope.toDelete = function(id){
    var success = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('success',result.desc);
        queryBaseStorehouse();
    }
    var error = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('error',result.desc);
    }
    
    var data ={'bcm_id':id}
    var url = "/admin/base/baseCommunityControl/delete.action";
    var	msg = '您确定修改本条记录吗？';
    EzConfirm.create({
        heading : '提示',
        text : msg
    }).then(function() {			
        http.post(url, data, success, error);
    }, function() {

    });
    
}

$scope.goBuildingList = function(x){
    $state.go("index.setup.basebuilding",{"bcm_id":x.bcm_id});
}

/**
 * 条件查询
 */
$scope.doSearch = function(){
    if($scope.pager.page!=1){
        $scope.pager.page = 1;
    }
    queryCommunityList();
}


/**
 * 监听
 */
$scope.$watch(function(){
    var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
    return newValue;
},queryCommunityList);

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

//新增和修改柜子
$scope.toEdit = function(x){

    $scope.dialogTitle = '编辑小区';
    $scope.queryDetail(x.bcm_id);
    $scope.showDialog();

}

/**
 * 新增或者添加 
 */
$scope.save = function(){
    
    if (!$scope.vo.bcm_name) {
        messageFactory.showMessage('error',"请输入小区名称");
        return false;
    }
    
    var codeReg = /^[0-9a-zA-Z]+$/;
    if (!$scope.vo.bcm_code) {
        messageFactory.showMessage('error',"请输入小区编号");
        return false;
    } else {
        if (!codeReg.test($scope.vo.bcm_code)) {
            messageFactory.showMessage('error',"小区编号只能是数字和字母");
            return false;
        }
    }
    if (!$scope.vo.bcm_district) {
        messageFactory.showMessage('error',"请选择城市");
        return false;
    } 
    
    
    var success = function(result){
        messageFactory.closeLoading();
        messageFactory.showMessage('success',result.desc);
        $scope.vo={'bcm_state':1};
        $scope.closeDialog();
        $scope.doSearch();
    }

    
    
    var error = function(result){
        messageFactory.showMessage('error',result.desc);
        messageFactory.closeLoading();
        /*$scope.closeDialog();*/
    }
    
    var url = "/admin/base/baseCommunityControl/update.action" ;
        var msg = '您确定添加本条记录吗？';
        //console.log($stateParams.bc_id);
        if($scope.vo.bcm_id != undefined && $scope.vo.bcm_id != ''){
            msg = '您确定修改本条记录吗？';
        }
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
    var url = '/admin/base/baseCommunityControl/getDetail.action';
    http.post(url,{bcm_id:id},success,error);
}








$scope.showCover = function(x, type){
    if (type ==1) {
        if (!x.bcm_cover_show) {
            return false;
        }
        $scope.showPic = true;
        $scope.picUrl = x.bcm_cover_show;
    } 

    $scope.storeTitle = x.bcm_name;
}

$scope.clearParams = function(){
   $scope.searchParam.searchKey = "";
   $scope.searchParam.bcm_state = "";
}



$scope.mysetting = {
        data : {
            key : {
                title : "t"
            },
            simpleData : {
                enable : true
            }
        },
        edit : {
            enable : true,
            showRemoveBtn : false,
            showRenameBtn : false,
            drag : {
                isCopy : false,
                isMove : false
            }
        },
        check : {
            enable: false
        },
        callback: {
            onClick: zTreeOnClick
        }
    }; 
$scope.selectarea = {};
function zTreeOnClick(event, treeId, treeNode) {
    $scope.selectarea.bcm_district = treeNode.ba_district_gbcode;
    $scope.selectarea.bcm_district_nameref = treeNode.name;
    $scope.selectarea.check_Child_State = treeNode.check_Child_State;
    pNode = treeNode.getParentNode();
    $scope.selectarea.bcm_city = pNode.ba_district_gbcode;
    $scope.selectarea.bcm_city_nameref = pNode.name;
    gNode = pNode.getParentNode();
    $scope.selectarea.bcm_province = gNode.ba_district_gbcode;
    $scope.selectarea.bcm_province_nameref = gNode.name;
};
/**
 * 显示城市弹框
 */
$scope.showCityDialog = function(){
    $scope.showCity = true;
    var treeObj = $.fn.zTree.getZTreeObj("tree2");
}
/**
 * 关闭城市弹框
 */
$scope.closeCityDialog = function(){
    $scope.showCity = false;
}
/**
 * 选择城市
 */
$scope.selectCity = function(){
    if($scope.selectarea.check_Child_State != -1){
        messageFactory.showMessage('error',"请选择底级区域！");
        return;
    }
    $scope.vo.bcm_district = $scope.selectarea.bcm_district;
    $scope.vo.bcm_district_nameref = $scope.selectarea.bcm_district_nameref;
    $scope.vo.bcm_city = $scope.selectarea.bcm_city;
    $scope.vo.bcm_city_nameref = $scope.selectarea.bcm_city_nameref;
    $scope.vo.bcm_province = $scope.selectarea.bcm_province;
    $scope.vo.bcm_province_nameref = $scope.selectarea.bcm_province_nameref;
    $scope.closeCityDialog();
}

$scope.add = function(){
    $scope.dialogTitle = '添加小区';
    $scope.showDialog();
}


})