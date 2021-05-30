tempApp.controller('ctr_materialTicketAdd', function ($scope, $rootScope, 
	$state,  http,  EzConfirm,  messageFactory, activityDetailFactory, $rootScope, $stateParams) {
	$scope.dataList = [{}];
	$scope.vo = {"mtc_type":"1", "mtc_total_num": 10};
	$scope.mtc_id = $stateParams.mtc_id;
	$scope.goods_type = 1;
	var  reg = /^\d{1,10}$/;


	/**
	 * 查询mtc详情
	 */
	$scope.queryMTCDetail = function(id){
		var success = function(result){
			$scope.vo = result.data;
			
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/ticket/materialTicketCodeControl/getDetail.action';
		
		http.post(url,{mtc_id:$scope.mtc_id},success,error);
	}
	if ($scope.mtc_id) {
		$scope.queryMTCDetail();
	}
	

    /**
     * 查询商品
     */
	$scope.pager1 = { page: 1, rows: '10', sort: '', order: '', searchKey: '', ps_shopid: $rootScope.USER.shopId,"pm_typeid":1010 };
	$scope.searchParam = {};
	$scope.getGoods = function () {

		activityDetailFactory.getGoods($scope);
	}



    /**
     * 商品模糊查询
     */
	$scope.keySearchFun = function (key, type) {
		if (type == "goods") {
			$scope.pager1.page = 1;
			$scope.pager1.searchKey = key;

			$scope.getGoods();
		} else {
			$scope.couponPager.page = 1;
			$scope.couponPager.searchKey = key;
			$scope.getCouponList();
		}
	}

    /**
	 * 上一页
	 */
	$scope.prevPage = function (pager, fun) {
		activityDetailFactory.prevPage($scope, pager, fun);
	}

	/**
	 * 下一页
	 */
	$scope.nextPage = function (pager, fun) {
		activityDetailFactory.nextPage($scope, pager, fun);
	}
        /**
     * 选择商品
     */
	$scope.chooseGoods = function(obj,obj2,type){
		
			
		$scope.vo.mtc_productid = obj.ps_productid;
		$scope.vo.mtc_productid_nameref = obj.pm_title;
		$scope.vo.mtc_skuid = obj.ps_id;

		// $scope.calculateFun();
		$(".droplistWrap2").hide();
	}

	$scope.lineNum = 0;
	$scope.subTotal = 0;

	$scope.showDroplist = function (event, fun, type) {
		activityDetailFactory.showDroplist($scope, event, fun, type);
	};

	/**
	 * 保存
	 */
	$scope.submit = function () {
		if (!$scope.vo.mtc_title) {
			messageFactory.showMessage('error', "请输入标题");
			return false;
		}
		if (!$scope.vo.mtc_type) {
			messageFactory.showMessage('error', "请选择类型");
			return false;
		}
		if (!$scope.vo.mtc_total_num) {
			messageFactory.showMessage('error', "请输入实物券数量且只能为正整数");
			return false;
		}

		if (!reg.test($scope.vo.mtc_total_num)) {
			messageFactory.showMessage('error', "实物数量不能包含除了数字以外的字符");
			return false;
		}

		var success = function (result) {
			messageFactory.showMessage('success', '提交成功');
			$scope.goBack();
			$scope.dataList = [{}];
			$scope.subTotal = 0;
		}
		var error = function (result) {
			messageFactory.showMessage('error', result.desc);
		}


		EzConfirm.create({
			heading: '提示',
			text: "您确定提交吗？"
		}).then(function () {
			var url = "/admin/ticket/materialTicketCodeControl/update.action";
			http.post(url, $scope.vo, success, error);
		}, function () {

		});
	}

	// 返回
	$scope.goBack = function () {

		$state.go("index.product.materialcodelist");

	}


	/**
	 * 支付类型列表
	 */
	$scope.ticketTypeList = [];
	$scope.queryticketTypeList = function () {
		var success = function (result) {
			$scope.ticketTypeList = result.data;
			// $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
		}
		var error = function (result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2175';
		http.post(url, null, success, error);
	}
	$scope.queryticketTypeList();

})