tempApp.controller('ctr_materialProductAdd', function ($scope, $rootScope, 
	$state,  http,  EzConfirm,  messageFactory, activityDetailFactory, $rootScope, $stateParams, dateUtil) {
		$scope.mtc_id = $stateParams.mtc_id;
		$scope.mtp_id = $stateParams.mtp_id;
		$scope.dataList = [{}];
	$scope.mtcVO = {};
	$scope.vo = {"mtp_mtc_id":$scope.mtc_id, "mtp_limit_is":"N", "mtp_total_num":0, "mtp_valid_days":360, "mtp_available_num":1,"mtp_def1":1,"mtp_def2":2};
	$scope.today = dateUtil.getDate2() + " 至  " + dateUtil.getDate2();
	$scope.goods_type = 1;
    $scope.vo.mtp_valid_startdate = $scope.vo.mtp_valid_enddate = dateUtil.getDate2();
	$("#start_time").val($scope.today);
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function (start, end, label) { // 格式化日期显示框
		$scope.vo.mtp_valid_startdate = start.format('YYYY-MM-DD');
		$scope.vo.mtp_valid_enddate = end.format('YYYY-MM-DD');
		$scope.$apply();
	});
	var  reg = /^\d{1,10}$/;

	/**
	 * 查询mtc详情
	 */
	$scope.queryMTCDetail = function(id){
		var success = function(result){
			$scope.mtcVO = result.data;
			$scope.vo.mtp_productid = $scope.mtcVO.mtc_productid;
			$scope.vo.mtp_skuid = $scope.mtcVO.mtc_skuid;
			$scope.vo.mtp_productid_nameref = $scope.mtcVO.mtc_productid_nameref;
			$scope.vo.mtp_prefix = $scope.mtcVO.mtc_prefix;
			$scope.vo.mtp_start_code = $scope.mtcVO.mtc_def1;
			$scope.vo.mtp_end_code = $scope.mtcVO.mtc_end_code;
			
			$scope.calNum();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/ticket/materialTicketCodeControl/getDetail.action';
		
		http.post(url,{mtc_id:$scope.mtc_id},success,error);
	}
	
	
	/**
	 * 查询详情
	 */
	$scope.queryDetail = function(id){
		var success = function(result){
			$scope.vo = result.data;
			var dataStr = $scope.vo.mtp_valid_startdate +"至"+$scope.vo.mtp_valid_enddate;
			$("#start_time").val(dataStr);
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/ticket/materialTicketProductControl/getDetail.action';
		
		http.post(url,{mtp_id:id},success,error);
	}
	if ($scope.mtp_id) {
		$scope.queryDetail($scope.mtp_id);
	} else {
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
						
		$scope.vo.mtp_productid = obj.ps_productid;
		$scope.vo.mtp_skuid = obj.ps_id;
		$scope.vo.mtp_productid_nameref = obj.pm_title;
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
		if (!$scope.vo.mtp_id) {
			$scope.calNum();
		}
		
		if (!$scope.vo.mtp_valid_days) {
			messageFactory.showMessage('error', "请输入有效天数且只能为正整数");
			return false;
		}
		if (!reg.test($scope.vo.mtp_valid_days)) {
			messageFactory.showMessage('error', "有效天数不能包含除了数字以外的字符");
			return false;
		}

		if (!$scope.vo.mtp_start_code) {
			messageFactory.showMessage('error', "请输入开始编码");
			return false;
		}
		if (!$scope.vo.mtp_end_code) {
			messageFactory.showMessage('error', "请输入结束编码");
			return false;
		}

		if (!$scope.vo.mtp_available_num) {
			messageFactory.showMessage('error', "请输入水票数量且只能为正整数");
			return false;
		}

		if (!reg.test($scope.vo.mtp_available_num)) {
			messageFactory.showMessage('error', "水票数量不能包含除了数字以外的字符");
			return false;
		}

		if ($scope.vo.mtp_limit_is == "Y") {
			$scope.vo.mtp_ticket_hour1start = $("#hour1").val();
			$scope.vo.mtp_ticket_hour1end = $("#hour2").val();
			$scope.vo.mtp_ticket_hour2start = $("#hour3").val();
			$scope.vo.mtp_ticket_hour2end = $("#hour4").val();
			$scope.vo.mtp_ticket_hour3start = $("#hour5").val();
			$scope.vo.mtp_ticket_hour3end = $("#hour6").val();
		}
        
		var success = function (result) {
			messageFactory.showMessage('success', '提交成功');
			$scope.goBack();
			$scope.dataList = [{}];
			$scope.subTotal = 0;
		}
		var error = function (result) {
			messageFactory.showMessage('error', result.desc);
			return false;
		}

		$scope.vo.mtp_open_state = 1;
		EzConfirm.create({
			heading: '提示',
			text: "您确定提交吗？"
		}).then(function () {
			var url = "/admin/ticket/materialTicketProductControl/update.action";
			http.post(url, $scope.vo, success, error);
		}, function () {

		});
	}

	// 返回
	$scope.goBack = function () {

		$state.go("index.product.materialproductlist", {"mtc_id":$scope.mtc_id});

    }
    /**
	 * 计算总数
	 */
    $scope.calNum = function(){
		console.log($scope.vo.mtp_end_code.length);
		$scope.checkCode($scope.vo.mtp_start_code);
		$scope.checkCode($scope.vo.mtp_end_code);
        var startStr = $scope.vo.mtp_start_code.substr($scope.vo.mtp_start_code.length-10, $scope.vo.mtp_start_code.length)
        var endStr = $scope.vo.mtp_end_code.substr($scope.vo.mtp_end_code.length-10, $scope.vo.mtp_end_code.length)
        $scope.vo.mtp_start_num = startStr.replace(/\b(0+)/gi,"");
		$scope.vo.mtp_end_num = endStr.replace(/\b(0+)/gi,"");
		console.log($scope.vo.mtp_start_num);
		console.log($scope.vo.mtp_end_num);
        if (parseInt($scope.vo.mtp_start_num)>parseInt($scope.vo.mtp_end_num)) {
			messageFactory.showMessage('error', "请按顺序输入编码");
			return false;
		}
        $scope.vo.mtp_total_num = $scope.vo.mtp_end_num-$scope.vo.mtp_start_num + 1;
    }


    /**
	 * 查询业务员列表
	 */
    $scope.baseWorkList = [];
    $scope.baseWorkPager = {page:1,rows:'10',sort:'mbw_id',order:'desc',pageList:['10','20','30']};
	$scope.baseWorkSearchParam = {};
	$scope.queryDeliveryman = function(){
		var success = function(result){
			$scope.baseWorkList = result.data.rows;
			$scope.baseWorkPager.total = result.data.total;
			$scope.baseWorkPager.pageTotal = Math.ceil($scope.baseWorkPager.total/$scope.baseWorkPager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/member/memberBaseWorkControl/dataGrid.action';
		http.post(url,$.extend({"mbw_state":1,"mbw_dr":1,"mbw_shopid":$rootScope.USER.shopId},$scope.baseWorkPager,$scope.baseWorkSearchParam),success,error);
	}
	$scope.queryDeliveryman();
	/**
	 * 选择业务员
	 */
	$scope.chooseWorkMan = function(x) {
		$scope.vo.mtp_salesid = x.mbw_id;
		$scope.vo.mtp_salesuserid = x.mbw_memberid;
		$scope.vo.mtp_salesuserid_nameref =  x.mbw_name;
	}
	/**
	 * 删除业务员
	 */
	$scope.clearWorkMan = function(){
		$scope.vo.mtp_salesid = "";
		$scope.vo.mtp_salesuserid = "";
		$scope.vo.mtp_salesuserid_nameref =  "";
	}

	/**
	 * 检查编码
	 */
	$scope.checkCode = function(code){
		var success = function(result){
			
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			return false;
		}
		var url = '/admin/ticket/materialTicketControl/checkCode.action';
		
		http.post(url,{mt_ticket_code:code, "mt_mtc_id":$scope.mtc_id},success,error);
	}

	$scope.useTypeList = [];
	$scope.queryUseTypeList = function(){
		
		var success = function(result){
			$scope.useTypeList = result.data;
			
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2198';
		http.post(url,null,success,error);
	}
	$scope.queryUseTypeList();


})