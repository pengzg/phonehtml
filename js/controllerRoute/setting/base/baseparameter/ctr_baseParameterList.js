tempApp.controller('ctr_baseParameterList', function($scope, $state, http,
		EzConfirm, messageFactory) {
	 $scope.pager = {page:1,rows:'10',sort:'bp_id',order:'desc',pageList:['10','20','30']};
	 $scope.searchParam = {};
	 $scope.vo = {};
	/**
	 * 查询列表
	 */
	var queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.parameterList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url =  '/admin/base/baseParameterControl/dataGrid.action';
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
	},queryList);

	/**
	 * 显示添加div
	 */
	$scope.showDialog = function() {
		$scope.dialogShow = true;
	}

	/**
	 * 关闭添加div
	 */
	$scope.closeDialog = function() {
		$(".w5c-error").remove();
		$scope.dialogShow = false;
		$scope.vo = {};
	}

	/**
	 * 去编辑
	 */
	$scope.toEdit = function(id) {
		// $state.go('index.baseUnitAdd',{bu_id:id})
		if (id == undefined || id == '') {
			$scope.dialogTitle = '添加';
			$scope.vo.bp_level = 2;
			$scope.vo.status = 1;
		} else {
			$scope.dialogTitle = '修改';
			$scope.queryDetail(id);
		}
		$scope.showDialog();
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
		var url = '/admin/base/baseParameterControl/getDetail.action';
		http.post(url,{'bp_id':id},success,error);
	}

	/**
	 * 新增和编辑保存
	 */
	$scope.create = function(){
		if (!$scope.vo.bp_key) {
			messageFactory.showMessage('error',"请输入编码");
			return false;
		}
		if (!$scope.vo.bp_value) {
			messageFactory.showMessage('error',"请输入值");
			return false;
		}
		var success = function(result){
			$scope.closeDialog();
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var msg = "您确定添加本条记录吗？";
		if($scope.vo.bp_id){
			msg = "您确定编辑本条记录吗？";
		}
		var url = "/admin/base/baseParameterControl/update.action";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, $scope.vo, success, error);
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
		queryList();
	}

	/**
	 * 删除
	 */
	$scope.toDelete = function(vo) {
				
		var success = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('success', result.desc);
			queryList();
		}
		var error = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}

		var data = angular.copy(vo);
		data.bp_dr = 0;
		console.log(data);
		var url = "/admin/base/baseParameterControl/update.action";
		
		var msg = '您确定删除本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			http.post(url, data, success, error);
		}, function() {

		});

	}

	$scope.searchFun = function() {
		if ($scope.pager.page == 1) {
			queryList();
		} else {
			$scope.pager.page = 1;
		}
	}

	/**
	 * 排序方法
	 */
	$scope.sortFun = function(name, flag) {
		if (!flag) {
			return 'colorCenter noSortCss';
		}
		if ($scope.pager.sort == name && $scope.pager.order == 'asc') {
			return 'SortAscCss'
		}
		if ($scope.pager.sort == name && $scope.pager.order == 'desc') {
			return 'SortDescCss'
		}
	}

	/**
	 * 点击切换排序
	 */
	$scope.clickSortFun = function(name) {
		if ($scope.pager.sort != name) {
			$scope.pager.sort = name;
			$scope.pager.order = 'asc';
		}
		if ($scope.pager.sort == name) {
			if ($scope.pager.order == 'asc') {
				$scope.pager.order = 'desc';
			} else {
				$scope.pager.order = 'asc';
			}
		}
	}
})