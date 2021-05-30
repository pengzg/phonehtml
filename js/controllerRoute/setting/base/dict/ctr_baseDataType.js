tempApp.controller('ctr_dictType', function($scope, http,EzConfirm,messageFactory,$compile) {
	$scope.pager = {page:1,rows:'10',sort:'bdt_code',order:'desc',pageList:['10','20','30']};
	$scope.searchParam = {};
	$scope.vo = {};
	
	/**
	 * 验证提示
	 */
	$scope.role = {
			rules : {
				bdt_code : {
					required : "字典类型编码不能为空",
					pattern:"格式输入不正确！"
				},
				bdt_name : {
					required : "字典类型名称不能为空"
				},
			}
	};
	
	//查询字典类型list 
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
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
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
	 * 显示添加div
	 */
	$scope.showDialog = function() {
		$scope.editAndAddPop = true;
		
	}

	/**
	 * 关闭添加div
	 */
	$scope.closeDialog = function() {
		$(".w5c-error").remove();
		$scope.editAndAddPop = false;
		$scope.vo = {};
	}
	
	/**
	 * 显示查看弹框
	 */
	$scope.showViewDialog = function(){
		$scope.dialogTitle = '查看详情';
		$scope.viewPop = true;
	}
	/**
	 * 关闭查看弹框
	 */
	$scope.closeViewDialog = function(){
		$scope.vo = {};
		$scope.viewPop = false;
	}
	
	/**
	 * 编辑字典类型
	 */
	$scope.toEdit = function(id){
		if(id == null || id == ''){
			$scope.dialogTitle = '添加字典类型';
			$scope.vo.bdt_status = '1';
			$scope.vo.bdt_isgroup = '1';
			
		}else{
			$scope.dialogTitle = '编辑字典类型';
			$scope.queryDetail(id);
		}
		$scope.showDialog();
	}
	
	/**
	 * 查看详情
	 */
	$scope.showViewDetail = function(id){
		$scope.queryDetail(id);
		$scope.showViewDialog();
	}
	
	/**
	 * 保存新增字典类型
	 */
	$scope.createDictType = function() {
		$scope.searchParam.searchKey = '';
		var success = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('success', result.desc);
			$scope.searchFun();
			$scope.vo = {};
			$scope.closeDialog();
		}
		var error = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}

		messageFactory.showBakLoading();
		var url = "/admin/base/baseDataTypeControl/update.action";
		 $scope.vo.bdt_isgroup = '1';
		http.post(url, $scope.vo, success, error);
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
		var url = '/admin/base/baseDataTypeControl/getDetail.action';
		http.post(url,{bdt_id:id},success,error);
	}
	
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			queryDicType();
		}else{
			$scope.pager.page = 1;
		}
	}
	
	/**
	 * 删除
	 */
	$scope.toDelete = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryDicType();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'bdt_id':id}
		var url = "/admin/base/baseDataTypeControl/remove.action";
		var	msg = '您确定修改本条记录吗？';
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
	/**
	 * 清空搜索条件
	 */
	$scope.clearSearch = function(){
		$scope.searchParam.searchKey = '';
		$scope.searchKey = '';
	}
	
	
	
	$scope.update = function(){
		EzConfirm.create({
			heading : '提示',
			text : '您确认要同步更新吗？'
		}).then(function() {
			// http.post(url, data, success, error);
		}, function() {

		});
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
})
