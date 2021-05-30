tempApp.controller('ctr_baseGradeList', function($scope, $state, http,
		EzConfirm, messageFactory,$rootScope) {
	$scope.pager = {
		page : 1,
		rows : '20',
		sort : 'bg_sort',
		order : 'desc',
		pageList : [ '10', '20', '30' ],
		bg_shopid : $rootScope.USER.shopId
	};
	$scope.searchParam = {};
	$scope.vo = {};

	/**
	 * 查询数据
	 */
	var querybaseGrade = function() {
		messageFactory.showLoading();
		var success = function(result) {
			$scope.baseGradeList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total
					/ $scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result) {
			messageFactory.closeLoading();
		}
		var url = '/admin/base/baseGradeControl/dataGrid.action';
		http.post(url, $.extend({}, $scope.pager, $scope.searchParam), success, error);
	}

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
		// $state.go('index.baseGradeAdd',{bu_id:id})
		if (id == undefined || id == '') {
			$scope.dialogTitle = '添加会员等级';
			$scope.vo.bg_state = "1";
			$scope.vo.bg_sort = 0;
		} else {
			$scope.dialogTitle = '修改会员等级';
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
		var url = '/admin/base/baseGradeControl/getDetail.action';
		http.post(url,{bg_id:id},success,error);
	}

	/**
	 * 添加等级
	 */
	$scope.createGrade = function() {
		
		var  reg = /^\d{1,10}$/;
		if (!reg.test($scope.vo.bg_sort)) {
			messageFactory.showMessage('error',"排序不能包含除数字以外的字符");
			return false;
		}
		
		if (!$scope.vo.bg_title) {
			messageFactory.showMessage('error',"请输入会员等级名称");
			return false;
		}
		
		
		if ($scope.vo.bg_discount == undefined ||  $scope.vo.bg_discount<0 || $scope.vo.bg_discount>1) {
			messageFactory.showMessage('error',"默认折扣不正确，只能输入0-1之间的数");
			return false;
		}
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

		var url = "/admin/base/baseGradeControl/update.action";
		var msg = '您确定添加本条记录吗？';
		//console.log($stateParams.bc_id);
		if($scope.vo.bg_id != undefined && $scope.vo.bg_id != ''){
			msg = '您确定修改本条记录吗？';
		}
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			http.post(url, $scope.vo, success, error);
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
		querybaseGrade();
	}

	/**
	 * 去详情
	 */
	$scope.toDetail = function(id) {
		$state.go('index.baseGradeDetail', {
			bg_id : id
		})
	}

	/**
	 * 删除
	 */
	$scope.toDelete = function(id) {
		
		//$scope.getIsUserByUnitId(id);
		$scope.deleteGrade(id);
		
	}
	
	
	
	//首先判断该品牌是否使用 
	/*$scope.getIsUserByUnitId = function(id) {
		var success = function(result) {
			messageFactory.closeLoading();
			if(result.data.repCode=='00'){
				$scope.deleteUnit(id);
			}else{
				messageFactory.showMessage('error', result.desc);
			}
		}
		var error = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}

		var data = {
			'bu_id' : id
		}
		var url = "/admin/goods/gsGoodsControl/getIsUserByUnitId.action";
		http.post(url, data, success, error);
	}*/
	
		$scope.deleteGrade = function(id) {
		
		var success = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('success', result.desc);
			querybaseGrade();
		}
		var error = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}

		var data = {
			'bg_id' : id
		}
		var url = "/admin/base/baseGradeControl/delete.action";
		var msg = '您确定修改本条记录吗？';
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
			querybaseGrade();
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

	/**
	 * 监听
	 */
	$scope.$watch(function() {
		var newValue = $scope.pager.page + ' ' + $scope.pager.rows + ' '
				+ $scope.pager.sort + ' ' + $scope.pager.order + ' ';
		for ( var x in $scope.searchParam) {
			newValue = newValue + x + '=' + $scope.searchParam[x] + '&';
		}
		return newValue;
	}, querybaseGrade);
})