tempApp.controller('ctr_dictManage', function($scope, http,EzConfirm,$compile,messageFactory) {
	$scope.pager = {page:1,rows:'10',sort:'bdt_code',order:'desc',pageList:['10','20','30']};
	$scope.searchParam = {};
	$scope.addPop = false;//添加和修改弹窗
	$scope.vo = {};
	$scope.vo.bd_status = '1';
	/**
	 * 验证提示
	 */
	$scope.role = {
			rules : {
				bd_code : {
					required : "字典编码不能为空"
				},
				bd_name:{
					required : "字典名称不能为空"
				}
			}
	};
	
	/**
	 * 查询字典类型列表
	 */
	var queryDicType = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.dictTypeList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url =  '/admin/base/baseDataTypeControl/dataGrid.action';
		http.post(url,$.extend({'bdt_status':1},$scope.pager,$scope.searchParam),success,error);
	}
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		for(var x in $scope.searchParam){
			newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		}
		return newValue;
	},queryDicType);
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
	 * 显示添加div
	 */
	$scope.showDialog = function() {
		$scope.addPop = true;
		
	}

	/**
	 * 关闭添加div
	 */
	$scope.closeDialog = function() {
		$(".w5c-error").remove();
		$scope.addPop = false;
		$scope.vo.bd_id = '';
		$scope.vo.bd_code = '';
		$scope.vo.bd_name = '';
		$scope.vo.bd_order = '';
		$scope.vo.bd_des = '';
		
	}
	
	/**
	 * 选中左边列表行
	 */
	$scope.selectedLeft = function(bdt_id,bdt_name){
		$scope.typeid = bdt_id;
		$scope.typename = bdt_name;
		$scope.queryTree();
	}
	
	/**
	 * 查询字典项明细
	 */
	$scope.queryTree = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.dictDetailList = result.data;
			messageFactory.closeLoading();
			
			//query($scope.dictDetailList);
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url =  '/admin/base/baseDataControl/queryBaseDataDetailTree.action';
		http.post(url,{bd_datatypeid:$scope.typeid},success,error);
	}
	
	/**
	 * 编辑弹框
	 */
	$scope.toEdit = function(id){
		if($scope.typeid == undefined || $scope.typeid == ''){
			messageFactory.showMessage('error',"请选择字典类型！");
			$scope.closeDialog();
			return;
		}
		if(id == undefined || id == ''){
			$scope.typename = $scope.typename;
			$scope.dialogTitle = '添加';
			
		}else{
			$scope.typename = $scope.typename;
			$scope.dialogTitle = '编辑';
			$scope.queryDetail(id);
		}
		$scope.showDialog();
	}
	/**
	 * 添加保存
	 */
	$scope.editAndAdd = function(){
		var success = function(result){
			$scope.closeDialog();
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.queryTree();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		$scope.vo.bd_datatypeid = $scope.typeid;
		if($scope.vo.bd_datatypeid == undefined || $scope.vo.bd_datatypeid == ''){
			messageFactory.showMessage('error',"请选择字典类型！");
			$scope.closeDialog();
			return;
		}
		var msg = "您确定添加本条记录吗？";
		var url = "/admin/base/baseDataControl/update.action";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, $scope.vo, success, error);
		}, function() {
		});	
		
	}
	
	/**
	 * 查询明细
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
		var url = '/admin/base/baseDataControl/getDetail.action';
		http.post(url,{bd_id:id},success,error);
	}
	
	/**
	 * 删除
	 */
	$scope.toDelete = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.queryTree();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'bd_id':id}
		var url = "/admin/base/baseDataControl/remove.action";
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
	 * 搜索
	 */
	$scope.doSearch = function(){
		$scope.searchParam.searchKey = $scope.searchKey;
		if($scope.pager.page != 1){
			$scope.pager.page = 1;
		}
		queryDicType();
	}
    

})
