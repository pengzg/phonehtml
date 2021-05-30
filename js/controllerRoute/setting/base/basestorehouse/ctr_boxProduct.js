tempApp.controller('ctr_boxProduct', function ($scope, $rootScope, 
	$state,  http,  EzConfirm,  messageFactory, activityDetailFactory, $rootScope, $stateParams) {
	$scope.dataList = [{}];
	$scope.vo = {};
	$scope.bb_id = $stateParams.bb_id;
	$scope.goods_type = 1;
	var  reg = /^\d{1,10}$/;


	/**
	 * 查询mtc详情
	 */
	$scope.queryDetail = function(id){
		var success = function(result){
			$scope.vo = result.data;
			$scope.pager1.storeid = $scope.vo.bb_storeid;
			this.$apply();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/base/baseBoxControl/getDetail.action';
		
		http.post(url,{bb_id:$scope.bb_id},success,error);
	}
	if ($scope.bb_id) {
		$scope.queryDetail();
	}
	

    /**
     * 查询商品
     */
	$scope.pager1 = { page: 1, rows: '10', sort: '', order: '', searchKey: '', ps_shopid: $rootScope.USER.shopId,"pm_typeid":1011 , "storeid":$scope.vo.bb_storeid};
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
		
			
		$scope.vo.bb_productid = obj.ps_productid;
		$scope.vo.bb_productid_nameref = obj.pm_title;
		$scope.vo.bb_skuid = obj.ps_id;

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
		

		var success = function (result) {
			messageFactory.showMessage('success', '提交成功');
			$scope.dataList = [{}];
			$scope.goBack();
			$scope.subTotal = 0;
		}
		var error = function (result) {
			messageFactory.showMessage('error', result.desc);
		}


		EzConfirm.create({
			heading: '提示',
			text: "您确定提交吗？"
		}).then(function () {
			var url = "/admin/base/baseBoxControl/updateProduct.action";
			http.post(url, $scope.vo, success, error);
		}, function () {

		});
	}

	// 返回
	$scope.goBack = function () {

		$state.go("index.box.storeboxlist", {"bs_id":$scope.vo.bb_storeid});

	}


	
})