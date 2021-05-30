tempApp.controller('ctr_storeboxList', function($scope,$stateParams,$state,http,EzConfirm,messageFactory,$timeout,$rootScope) {
	$scope.pager = {page:1,rows:'30',sort:'bb_boxcode',order:'desc',pageList:['10','20','30'],"bb_shopid":$rootScope.USER.shopId};
	$scope.searchParam = {};
	$scope.vo = {};
	$scope.stateList = [{"id":"","name":"全部"},{"id":1,"name":"空仓"},{"id":2,"name":"满仓"},{"id":3,"name":"取货中"},{"id":4,"name":"补货中"}];
	$scope.fixList = [{"id":"","name":"全部"},{"id":1,"name":"正常"},{"id":2,"name":"维修中"}];
	
	if ($stateParams.bs_id != undefined) {
    	$scope.bs_id = $stateParams.bs_id;
    }
	
	/**
	 * 查询数据
	 */
	var queryBoxList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.boxList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		$scope.searchParam.bb_storeid = $scope.bs_id;
		var url = '/admin/base/baseBoxControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}
	


	
	/**
	 * 删除
	 */
	$scope.addBox = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryBoxList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'bb_storeid':$scope.bs_id}
		var url = "/admin/base/baseBoxControl/insertBox.action";
		var	msg = '您确定要增加一个格子吗？';
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
		$scope.searchParam.searchKey = $scope.searchKey;
		if($scope.pager.page!=1){
			$scope.pager.page = 1;
		}
		queryBoxList();
	}
	
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			queryBoxList();
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
	},queryBoxList);
	
	/**
	 * 显示添加弹框
	 */
	$scope.showDialog = function(){
		$scope.vo.bb_status = '1';
		$scope.vo.bb_storeid = $scope.bs_id;
		
		$scope.dialogShow = true;
	}
	
	/**
	 * 关闭添加弹框
	 */
	$scope.closeDialog = function(){
		$(".w5c-error").remove();
		$scope.dialogShow = false;
	}
	
	//新增和修改柜子
	$scope.toEdit = function(x){
		if(x.bb_id==undefined || x.bb_id == ''){
			$scope.dialogTitle = '添加水仓';
			$scope.showDialog();
		}else{
			$scope.dialogTitle = '编辑水仓';
			$scope.queryDetail(x);
			$scope.showDialog();
		}
	}
	
	/**
     * 新增柜子完成
     */
    $scope.addcomplete = function(){
    	
    	var success = function(result){
    		messageFactory.closeLoading();
    		messageFactory.showMessage('success',result.desc);
    		$scope.vo={};
			$scope.closeDialog();
			$scope.searchFun();
    	}
    	
    	var error = function(result){
    		messageFactory.showMessage('error',result.desc);
    		messageFactory.closeLoading();
    	}
    	
		var url = "/admin/base/baseBoxControl/update.action" ;
		var msg = '您确定修改本条记录吗？';
		
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
			$scope.vo.bb_productid_nameref = x.bb_productid_nameref;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		messageFactory.showLoading();
		var url = '/admin/base/baseBoxControl/getDetail.action';
		http.post(url,{bb_id:x.bb_id},success,error);
	}
	
	/**
	 * 远程开箱 
	 */
	$scope.openBox = function(x) {
		var success = function(result){
    		messageFactory.closeLoading();
    		messageFactory.showMessage('success',result.desc);
    		$timeout(function(){
    			queryBoxList();
                return 'angular'
            },1500)
    	}
    	
    	var error = function(result){
    		messageFactory.showMessage('error',result.desc);
    		messageFactory.closeLoading();
    	}
    	var data = {"bs_code":x.bb_storeid_code,"bb_code":x.bb_boxcode};
		var url = "/admin/box/boxControl/openBox.action" ;
		var msg = '您确定要打开这个箱子吗？';
		
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	/**
	 * 跳转到开箱 日志
	 */
	$scope.goLog = function(x) {
		var url = $state.href("index.box.boxoperationlog",{"bol_box_id":x.bb_boxcode,"bol_storeid":x.bb_storeid_code});
		window.open(url,'_blank');
	}
	
	/**
	 * 返回
	 */
	$scope.goStoreList = function(){
		$state.go("index.box.basestorebox");
	}

	$scope.toRelation = function(x) {
		$state.go("index.box.boxproduct", {'bb_id':x.bb_id});
	}
	
})