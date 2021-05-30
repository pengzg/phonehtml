tempApp.controller('ctr_baseUnitList', function($scope, $state, http,
		EzConfirm, messageFactory) {
	$scope.pager = {
		page : 1,
		rows : '20',
		sort : 'bu_seq',
		order : 'desc',
		pageList : [ '10', '20', '30' ]
	};
	$scope.searchParam = {};
	$scope.vo = {};

	$scope.vm = {
		rules : {
			bu_name : {
				required : "计量单位名称不能为空"
			},
			bu_seq : {
				required : "排序序号不能为空",
				number : "必须输入数字",
				maxlength : "该选项输入值长度不能大于{maxlength}",
				minlength : "该选项输入值长度不能小于{minlength}",
				max : "该选项输入值不能大于{max}",
				min : "该选项输入值不能小于{min}"
			}
		}
	};

	/**
	 * 查询数据
	 */
	var queryBaseUnit = function() {
		messageFactory.showLoading();
		var success = function(result) {
			$scope.baseUnitList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total
					/ $scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result) {
			messageFactory.closeLoading();
		}
		var url = '/admin/base/baseUnitControl/dataGrid.action';
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
		// $state.go('index.baseUnitAdd',{bu_id:id})
		if (id == undefined || id == '') {
			$scope.dialogTitle = '添加计量单位';
			$scope.vo.bu_stats = "1";
			$scope.vo.bu_seq = 0;
		} else {
			$scope.dialogTitle = '修改计量单位';
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
		var url = '/admin/base/baseUnitControl/getDetail.action';
		http.post(url,{bu_id:id},success,error);
	}

	/**
	 * 添加计量单位
	 */
	$scope.createUnit = function() {
		
		if (!$scope.vo.bu_name) {
			messageFactory.showMessage('error',"请输入单位名称");
			return false;
		}
		var  reg = /^\d{1,10}$/;
		if (!reg.test($scope.vo.bu_seq)) {
			messageFactory.showMessage('error',"排序不能包含除数字以外的字符");
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

		var url = "/admin/base/baseUnitControl/update.action";
		
		var msg = '您确定添加本条记录吗？';
		//console.log($stateParams.bc_id);
		if($scope.vo.bu_id != undefined && $scope.vo.bu_id != ''){
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
		if($scope.pager.page!=1){
			$scope.pager.page = 1;
		}
		queryBaseUnit();
	}

	/**
	 * 去详情
	 */
	$scope.toDetail = function(id) {
		$state.go('index.baseUnitDetail', {
			bu_id : id
		})
	}

	/**
	 * 删除
	 */
	$scope.toDelete = function(id) {
				
		var success = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('success', result.desc);
			queryBaseUnit();
		}
		var error = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}

		var data = {
			'bu_id' : id
		}
		var url = "/admin/base/baseUnitControl/delete.action";
		
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
			queryBaseUnit();
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
		return newValue;
	}, queryBaseUnit);
})