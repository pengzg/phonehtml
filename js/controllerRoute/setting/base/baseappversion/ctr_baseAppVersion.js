tempApp.controller('ctr_baseAppVersion', function($scope,
    $state,http,EzConfirm,messageFactory,$rootScope) {
$scope.pager = {page:1,rows:'20',sort:'bv_id',order:'desc',pageList:['10','20','30'],bs_shopid:$rootScope.USER.shopId};
$scope.searchParam = {};
$scope.vo = {};
$scope.showPic = false;
$scope.appidShow = false;
$scope.showExample = false;
$scope.onlineList = [{"onlinestate":"","name":"全部"},{"onlinestate":"1","name":"离线"},{"onlinestate":"2","name":"在线"}]
$scope.boxTypeList = [{"id":"","name":"全部"},{"id":2,"name":"重力柜"},{"id":3,"name":"户外机械柜"}];
$scope.boxStateList = [{"id":"","name":"全部"},{"id":1,"name":"正常"},{"id":2,"name":"维修"},{"id":3,"name":"异常"}];
$scope.alertStateList = [{"id":"","name":"全部"},{"id":1,"name":"低于预警"},{"id":2,"name":"高于预警"}];
$scope.statsList = [{"id":"","name":"全部"},{"id":1,"name":"启用"},{"id":0,"name":"禁用"}];
$scope.activeStateList = [{"id":"","name":"全部"},{"id":1,"name":"已激活"},{"id":2,"name":"未激活"}];
/**
 * 查询数据
 */
var queryAppList = function(){
    messageFactory.showLoading();
    var success = function(result){
        $scope.appList = result.data.rows;
        $scope.pager.total=result.data.total;
        $scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
        messageFactory.closeLoading();
    }
    var error = function(result){
        messageFactory.closeLoading();
    }
    var url = '/admin/base/baseAppVersionControl/dataGrid.action';
    http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
}









/**
 * 监听
 */
$scope.$watch(function(){
    var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
    return newValue;
},queryAppList);



/**
 * 关闭添加弹框
 */
$scope.closeDialog = function(){
    $scope.vo = {};

    
    $scope.dialogShow = false;
}

/**
 * 关闭添加弹框
 */
$scope.showDialog = function(){

    
    $scope.dialogShow = true;
}

//新增和修改柜子
$scope.toEdit = function(x){
    
    $scope.queryDetail(x);
    $scope.showDialog();
}

/**
 * 新增柜子完成
 */
$scope.save = function(){
    
    
    
    var success = function(result){

        $scope.vo={};
        
        $scope.closeDialog();
        queryAppList();
    }
    
    var error = function(result){
        messageFactory.showMessage('error',result.desc);
        messageFactory.closeLoading();
    }
    $scope.vo.bv_down_url = $("#url_input").val();
    var url = "/admin/base/baseAppVersionControl/update.action" ;
    msg = '您确定修改本条记录吗？';
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
$scope.queryDetail = function(x){
    var success = function(result){
        $scope.vo = result.data;
        $("#url_input").val($scope.vo.bv_down_url);
        messageFactory.closeLoading();
    }
    var error = function(result){
        messageFactory.showMessage('error',result.desc);
        messageFactory.closeLoading();
    }
    messageFactory.showLoading();
    var url = '/admin/base/baseAppVersionControl/getNewVersion.action';
    http.post(url,{source:x.bv_source},success,error);
}


	/**
	 * 显示图片上传
	 */
	var isFileEventExist = false;
	$scope.upFile = function($event, x, index) {
		if (!isFileEventExist) {
			isFileEventExist = true;
			$scope.ue_myeditor.addListener("afterUpfile",_afterUpfile);
		}
		var myImage = $scope.ue_myeditor.getDialog("attachment");
		myImage.open();
	};
	
	function _afterUpfile(t, arg) {
        //console.log(arg);
        $scope.vo.bv_down_url = arg[0].url;
        $("#url_input").val(arg[0].url);
		/* var fileHtml = '';
        document.getElementById('upload_file_wrap').innerHTML = fileHtml;
        console.log(document.getElementById('upload_file_wrap').innerHTML); */
	}
})
