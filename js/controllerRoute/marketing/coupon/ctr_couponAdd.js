tempApp.controller('ctr_couponAdd', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    $scope.vo = {"cb_category":1, "cb_scope":1, "cb_coupon_type":1, "cb_receive_type":1, "cb_receive_value":1,"cb_isfree":1,"cb_num":99,
                 "cb_grant_num":0,"cb_draw_state":1, "cb_is_show":0, "cb_create_rules":1, "cb_use_area":2, 
                "cb_activate_type":2, "cb_activate_gq_day":0,  "cb_activate_yx_day":3, "cb_activate_kjh_day":0,
                "cb_state":1, "cb_min_amount_type":1, "cb_min_amount":0, "cb_effective_time":1,"cb_isshareoffers":1, "cb_scene":1
                };
	$scope.vo.cb_start_time = $scope.vo.cb_end_time = dateUtil.getDate2();
	$("#start_date").val(dateUtil.getDate2());
	$("#end_date").val(dateUtil.getDate2());
    $scope.canModify = true;
    $scope.reveiveTypeList = [{"bd_code":1, "bd_name":"不限制"},{"bd_code":2, "bd_name":"限制张数"}];
    $scope.stateList = [{"bd_code":1, "bd_name":"未发布"},{"bd_code":2, "bd_name":"已发布"},{"bd_code":3, "bd_name":"已取消"}];
    $scope.dialog = 0;
/**
	 * 查询
	 */
	$scope.getDetail = function(){
		messageFactory.showLoading();
		var success = function(result){
            $scope.vo = result.data;
            $("#start_date").val($scope.vo.cb_start_time);
			$("#end_date").val($scope.vo.cb_end_time);
			if ($scope.vo.cb_state ==2|| $scope.vo.cb_state ==3) {
				$scope.canModify = false;
			}
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/coupon/couponBaseControl/getDetail.action';
		http.post(url,{"cb_id":$scope.cb_id},success,error);
	}

    if ($stateParams.cb_id != undefined && $stateParams.cb_id) {
        $scope.cb_id = $stateParams.cb_id;
        $scope.getDetail();
    }



    /**
	 * 保存
	 */
	$scope.submit = function(){
		
		if (!$scope.vo.cb_title) {
			messageFactory.showMessage('error','请输入优惠券标题');
			return;
		}
		var codeReg = /^[0-9a-zA-Z]+$/;
		if (!$scope.vo.cb_periods) {
			messageFactory.showMessage('error','请输入优惠券码');
			return;
		} else {
			if (!codeReg.test($scope.vo.cb_periods)) {
				messageFactory.showMessage('error',"编码只能是数字和字母且在15位以内");
				return false;
			}
		}

		
        
        if (!$scope.vo.cb_amount) {
			messageFactory.showMessage('error','请输入优惠券价格');
			return;
		}
        if (!$scope.vo.cb_num) {
			messageFactory.showMessage('error','请输入优惠券数量且只能为正整数');
			return;
		}
		
		if (parseInt($scope.vo.cb_num)<1) {
			messageFactory.showMessage('error','请输入优惠券数量且只能为正整数');
			return;
		}
		if ($scope.vo.cb_receive_type==2) {
			if (!$scope.vo.cb_receive_value || $scope.vo.cb_receive_value<1) {
				messageFactory.showMessage('error','请输入限定数量且不能小于1');
				return;
			}
		}

		if( $("#start_date").val()==""){
			messageFactory.showMessage('error','请选择优惠券开始时间');
			return;
        }
        $scope.vo.cb_start_time = $("#start_date").val();
		if( $("#end_date").val()==""){
			messageFactory.showMessage('error','请选择优惠券结束时间');
			return;
        }
        $scope.vo.cb_end_time = $("#end_date").val();
		if( $scope.vo.cb_start_time <dateUtil.getDate2()){
			messageFactory.showMessage('error','开始日期不能小于当前日期');
			return;
		}
		if( $scope.vo.cb_start_time >$scope.vo.cb_end_time){
			messageFactory.showMessage('error','结束时间不能小于开始时间');
			return;
		}
		

		if (!$scope.vo.cb_effective_time) {
			messageFactory.showMessage('error','请输入优惠券有效天数');
			return;
		}

		if ($scope.vo.cb_category !=1) {
			if (!$scope.vo.cb_category_value) {
				messageFactory.showMessage('error','请选择对应的商品或者分类');
				return;
			}
		}

		var success = function(result){
            messageFactory.showMessage('success','提交成功');
            $state.go('index.marketing.couponlist');
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/coupon/couponBaseControl/update.action";
			http.post(url,$scope.vo,success,error);
		}, function() {

		});
	}

	/**
	 * 转换
	 */
	$scope.change2num = function(){
		$scope.vo.cb_num = Math.abs(parseInt($scope.vo.cb_num));
		$scope.vo.cb_effective_time = Math.abs(parseInt($scope.vo.cb_effective_time));
		$scope.vo.cb_min_amount = Math.abs((parseFloat($scope.vo.cb_min_amount)).toFixed(2));
		$scope.vo.cb_amount = Math.abs((parseFloat($scope.vo.cb_amount)).toFixed(2));
		if ($scope.vo.cb_receive_type==2) {
			$scope.vo.cb_receive_value = Math.abs((parseFloat($scope.vo.cb_receive_value)).toFixed(2));
			if ($scope.vo.cb_receive_value<1) {
				messageFactory.showMessage('error','限定数量不能小于1张');
				return;
			}
		}
	}

	/**
	 * 优惠券类型列表
	 */
	$scope.couponTypeList = [];
	$scope.queryCouponTypeList = function(){
		var success = function(result){
			 
			 $scope.couponTypeList = result.data;
			 $scope.vo.cb_coupon_type = $scope.couponTypeList[0].bd_code;
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2164';
		http.post(url,null,success,error);
	}
	$scope.queryCouponTypeList();

		/**
	 * 优惠券使用场景列表
	 */
	$scope.couponSceneList = [];
	$scope.queryCouponSceneList = function(){
		var success = function(result){
			 
			 $scope.couponSceneList = result.data;
			 $scope.vo.cb_scene = $scope.couponSceneList[0].bd_code;
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2165';
		http.post(url,null,success,error);
	}
	$scope.queryCouponSceneList();


	/**
	 * 优惠券使用指定范围类别
	 */
	$scope.categoryList = [];
	$scope.queryCategoryList = function(){
		var success = function(result){
			 
			 $scope.categoryList = result.data;
			 $scope.vo.cb_category = $scope.categoryList[0].bd_code;
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=1018';
		http.post(url,null,success,error);
	}
	$scope.queryCategoryList();

	// 清除数据
	$scope.clearParams2 = function(){
			$scope.goodsList = [];
		$scope.goodsPager.page = 1;
		$scope.searchParam2 = {};
			
	}

	$scope.showSelectCategory  = function(){
		$scope.dialog = $scope.vo.cb_category;
		queryGoodsList();
	}

			/**
	 * 查询列表
	 */
	$scope.goodsList = [];
	$scope.goodsPager = {page:1,rows:'20',sort:'pm_id',order:'desc',pageList:['10','20','30'],pm_shopid:$rootScope.USER.shopId};
	var queryGoodsList = function(){

		messageFactory.showLoading();
		var success = function(result){
			$scope.goodsList = result.data.rows;
			$scope.goodsPager.total=result.data.total;
			$scope.goodsPager.pageTotal = Math.ceil($scope.goodsPager.total/$scope.goodsPager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/product/productMainControl/dataGrid.action';
		http.post(url,$.extend({},$scope.goodsPager,$scope.searchParam2),success,error);
	}

		/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.goodsPager.page+' '+$scope.goodsPager.rows+' '+$scope.goodsPager.sort+' '+$scope.goodsPager.order+' ';
		
		return newValue;
	},queryGoodsList);


	$scope.searchFun2 = function() {
		if($scope.goodsPager.page==1){
			queryGoodsList();
		}else{
			$scope.goodsPager.page = 1;
		}
	}

	$scope.selectGoods = function(x) {
		$scope.selectGoodsid = x.pm_id;
		$scope.selectGoodstitle = x.pm_title;
	}

	$scope.subSelectGoods =  function(){
		if ($scope.vo.cb_category == 4) {
			$scope.vo.cb_category_value = $scope.selectGoodsid;
			$scope.vo.cb_category_value_nameref = $scope.selectGoodstitle;
		} else if ($scope.vo.cb_category == 3) {
			$scope.vo.cb_category_value = $scope.selectNode.id;
			$scope.vo.cb_category_value_nameref = $scope.selectNode.name;
		}
		$scope.dialog = 0;
	}

	$scope.selectNode = {'id':0};
		/**
	 * 选择类别
	 */
	$scope.select = function(){
		console.log($scope.selectNode);
		if ($scope.selectNode.level == 2) {
			$scope.option = 1;
		}
	}

	$scope.changeSelectedCategory = function(){
		$scope.vo.cb_category_value = "";
		$scope.vo.cb_category_value_nameref = "";
		$scope.selectNode = {'id':0};
		$scope.selectGoodsid = "";
	} 

})