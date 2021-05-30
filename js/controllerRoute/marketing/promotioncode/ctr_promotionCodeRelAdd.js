tempApp.controller('ctr_promotionCodeRelAdd', function ($scope, $rootScope, 
	$state,  http,  EzConfirm,  messageFactory, activityDetailFactory, $rootScope, $stateParams, dateUtil) {
		$scope.mtc_id = $stateParams.mtc_id;
		$scope.pcr_id = $stateParams.pcr_id;
		$scope.dataList = [{}];
	$scope.mtcVO = {};
	$scope.vo = { "pcr_limit_is":"N", "pcr_total_num":0, "pcr_valid_days":360, "pcr_available_num":1,"pcr_def1":1,"pcr_def2":2};
	$scope.today = dateUtil.getDate2() + " 至  " + dateUtil.getDate2();
	$scope.goods_type = 1;
	$scope.ppmList = [];
    $scope.vo.pcr_valid_startdate = $scope.vo.pcr_valid_enddate = dateUtil.getDate2();
	$("#start_time").val($scope.today);
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function (start, end, label) { // 格式化日期显示框
		$scope.vo.pcr_valid_startdate = start.format('YYYY-MM-DD');
		$scope.vo.pcr_valid_enddate = end.format('YYYY-MM-DD');
		$scope.$apply();
	});
	var  reg = /^\d{1,10}$/;

	
	
	
	/**
	 * 查询详情
	 */
	$scope.queryDetail = function(id){
		var success = function(result){
			$scope.vo = result.data;
			var dataStr = $scope.vo.pcr_valid_startdate +"至"+$scope.vo.pcr_valid_enddate;
			$("#start_time").val(dataStr);
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/ticket/promotionCodeRelationControl/getDetail.action';
		
		http.post(url,{pcr_id:id},success,error);
	}
	if ($scope.pcr_id) {
		$scope.queryDetail($scope.pcr_id);
	}
		

    /**
     * 查询商品
     */
	$scope.pager1 = { page: 1, rows: '100', sort: '', order: '', searchKey: '', ppm_shopid: $rootScope.USER.shopId, "ppm_isexchangecode":1 };
	$scope.searchParam = {};
	$scope.getPromotionList = function () {
		var success = function(result){
			$scope.ppmList = result.data.rows;
			
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		$scope.searchParam.ppm_type = 7;
		var url = '/admin/promotion/productPromotionMainControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager1,$scope.searchParam),success,error);
		
	}

	$scope.getPromotionList();

    

   


	/**
	 * 保存
	 */
	$scope.submit = function () {
		
		
		
        
		var success = function (result) {
			messageFactory.showMessage('success', '提交成功');
			$scope.goBack();
			$scope.subTotal = 0;
		}
		var error = function (result) {
			messageFactory.showMessage('error', result.desc);
			return false;
		}

		$scope.vo.pcr_open_state = 1;
		EzConfirm.create({
			heading: '提示',
			text: "您确定提交吗？"
		}).then(function () {
			var url = "/admin/ticket/promotionCodeRelationControl/update.action";
			http.post(url, $scope.vo, success, error);
		}, function () {

		});
	}

	// 返回
	$scope.goBack = function () {

		$state.go("index.marketing.promotioncoderellist");

    }
    /**
	 * 计算总数
	 */
    $scope.calNum = function(){
		console.log($scope.vo.pcr_end_code.length);
		$scope.checkCode($scope.vo.pcr_start_code);
		$scope.checkCode($scope.vo.pcr_end_code);
        var startStr = $scope.vo.pcr_start_code.substr($scope.vo.pcr_start_code.length-10, $scope.vo.pcr_start_code.length)
        var endStr = $scope.vo.pcr_end_code.substr($scope.vo.pcr_end_code.length-10, $scope.vo.pcr_end_code.length)
        $scope.vo.pcr_start_num = startStr.replace(/\b(0+)/gi,"");
		$scope.vo.pcr_end_num = endStr.replace(/\b(0+)/gi,"");
		console.log($scope.vo.pcr_start_num);
		console.log($scope.vo.pcr_end_num);
        if (parseInt($scope.vo.pcr_start_num)>parseInt($scope.vo.pcr_end_num)) {
			messageFactory.showMessage('error', "请按顺序输入编码");
			return false;
		}
        $scope.vo.pcr_total_num = $scope.vo.pcr_end_num-$scope.vo.pcr_start_num + 1;
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
		$scope.vo.pcr_salesid = x.mbw_id;
		$scope.vo.pcr_salesuserid = x.mbw_memberid;
		$scope.vo.pcr_salesuserid_nameref =  x.mbw_name;
	}
	/**
	 * 删除业务员
	 */
	$scope.clearWorkMan = function(){
		$scope.vo.pcr_salesid = "";
		$scope.vo.pcr_salesuserid = "";
		$scope.vo.pcr_salesuserid_nameref =  "";
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