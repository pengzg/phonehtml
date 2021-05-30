tempApp.controller('ctr_goodsDetail',function($scope, http, messageFactory, $state, $stateParams,
						EzConfirm, dateUtil,$rootScope) {
	$scope.unitVO = {};
	$scope.skuList = [ {
		ps_code : "P" + dateUtil.getTs()
	} ];
	$scope.picList = [];
	$scope.vo = {};
	$scope.stockVO = {'opationtype':1};
	$scope.storeId = "";
	$scope.memberType = $rootScope.USER.memberType;
	$scope.goBack = function() {
		$state.go("index.product.productList");
	};
	
	$scope.pm_id = $stateParams.pm_id;
	
	
	$scope.getDetail = function() {
		var success = function(result) {
			$scope.vo = result.data;
			$scope.unitVO = result.data.unitRelationVO;
			$scope.skuList = result.data.skuList;
			$scope.priceList = result.data.priceList;
			$scope.picList = result.data.picList;
			$scope.pi_content  = result.data.pi_content;
			$scope.stockVO.productskuid = $scope.skuList[0].ps_id;
			$scope.stockVO.productmainid = $scope.pm_id;
			var reg2 = /2/
			$scope.vo.pm_delivery_type_show = reg2.test($scope.vo.pm_delivery_type);
			var reg1 = /1/;
			$scope.vo.pm_delivery_type_1 = reg1.test($scope.vo.pm_delivery_type);
			var reg3 = /3/;
			$scope.vo.pm_delivery_type_3 = reg3.test($scope.vo.pm_delivery_type);

			$scope.vo.payMethodArr = ($scope.vo.pm_paymethod).split(",");
			$scope.vo.payWayArr = ($scope.vo.pm_payway).split(",");
		}
		var error = function(result) {
			messageFactory.showMessage("error", result.desc);
		}
		var url = "/admin/product/productMainControl/getDetail.action";
		http.post(url, {"pm_id":$scope.pm_id}, success, error);

	}
	$scope.getDetail();

	/**
	 * 库存变动记录
	 * 
	 */
	$scope.pager = {'page':1, 'rows':20,'psd_dr':1,'sort':'psd_operation_time','order':'desc',pageList:['10','20','30']};
	$scope.getStockDetail = function(){
		console.log(111);
		var success = function(result){
			$scope.detailList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
		}
		var error = function(){
			
		}
		var url = "/admin/stock/productStockDetailControl/dataGrid.action";
		http.post(url,$.extend({'psd_productid':$scope.pm_id, "psd_storeid":$scope.vo.storeid},$scope.pager),success,error);
	}
	$scope.getStockDetail();
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		
		return newValue;
	},$scope.getStockDetail);

	/**
	 * 查询仓库
	 */
	$scope.getStoreHouse = function(){
		var success = function(result){
			$scope.storeHouseList = result.data;
			$scope.storeHouseList.unshift({'bs_id':'','bs_name':'请选择仓库'});
		}
		var error = function(){
			
		}
		var url = "/admin/base/baseStorehouseControl/queryItemList.action";
		http.post(url,{"bs_type_arr":"1,2,3,4","bs_stats":1,"bs_dr":1,bs_shopid:$rootScope.USER.shopId},success,error);
	}
	$scope.getStoreHouse();


	/**
	 * 更新库存
	 */
	$scope.updateStock = function(){
		// console.log($scope.stockVO);
		
		if (!$scope.stockVO.storeid) {
			messageFactory.showMessage("error", "请选择仓库");
			return false;
		}
		var  reg = /^\d{1,10}$/;
		if (!$scope.stockVO.num || !reg.test($scope.stockVO.num)) {
			messageFactory.showMessage("error", "请输入库存数量且库存数量不能为负");
			return false;
		}
		
		
		var success = function(result) {
			$scope.getStockDetail();
			$scope.stockVO.num = 1;
			$scope.stockVO.opationtype = 1;
			$scope.stockVO.describe = '';
			messageFactory.showMessage("success", result.desc);
		}
		var error = function(result) {
			messageFactory.showMessage("error", result.desc);
		}
		
		var data = $scope.stockVO;
		var url = "/admin/stock/productStockStoreControl/updateStock.action"
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
		  http.post(url,data,success,error);
		}, function() {

		});
	}

	  
	// 返回首页
	$scope.goList = function(){
		$state.go("index.product.productList");
	}

		/**
	 * 支付方式列表
	 */
	$scope.payMethodList = [];
	$scope.queryPayMethodList = function(){
		var success = function(result){
			 
			 $scope.payMethodList = result.data;
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2163';
		http.post(url,null,success,error);
	}
	$scope.queryPayMethodList();

	/**
	 * 支付类型列表
	 */
	$scope.payWayList = [];
	$scope.queryPayWayList = function(){
	  var success = function(result){
		$scope.payWayList = result.data;
		// $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
	  }
	  var error = function(result){
		  messageFactory.closeLoading();
		  messageFactory.showMessage('error',result.desc);
	  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2166';
		http.post(url,null,success,error);
	}
	$scope.queryPayWayList();

	$scope.createProduct = function(vo){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.reload();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}

		for (i in $scope.skuList) {
			$scope.skuList[i].ps_id = "";
			$scope.skuList[i].productAttributeValueRelationStr = JSON.stringify([{pavr_attributeid:"",pavr_attribute_valueid:""}]);
		}
		$scope.vo.pm_code="";
		$scope.vo.pm_payway=1;
		$scope.vo.pm_def3 = 0.00;
		var url = "/admin/product/productMainControl/createRelationProduct.action"
		var data = $.extend({},$scope.vo,$scope.unitVO,{priceListStr:JSON.stringify($scope.priceList)},{skuListStr:JSON.stringify($scope.skuList)},{"pi_content":$scope.pi_content},{"pictureListStr":JSON.stringify($scope.picList)});
		EzConfirm.create({
			heading : '提示',
			text : "您确定生成水票吗？"
		}).then(function() {
		  http.post(url,data,success,error);
		}, function() {

		});
	}

	/**
	 * 解绑关联
	 */
	$scope.delRelation = function(vo){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.reload()
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var url = "/admin/product/productMainControl/deleteRelation.action"
	
		EzConfirm.create({
			heading : '提示',
			text : "您确定解绑关联吗？"
		}).then(function() {
		  http.post(url,{"pm_id":vo.pm_id},success,error);
		}, function() {

		});
	}


	$scope.showDialog = function(val){
		$scope.dialog = val;
		queryGoodsList();
	}
				/**
	 * 查询列表
	 */
	$scope.goodsList = [];
	$scope.goodsPager = {page:1,rows:'20',sort:'pm_id',order:'desc',pageList:['10','20','30'],pm_shopid:$rootScope.USER.shopId, "pm_typeid":"1011", "pm_relation_empty":"1"};
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
		if (x.pm_relationid) {
			messageFactory.showMessage('error',"对不起，商品已经关联水票了");
			return false;
		}
		$scope.selectGoodsid = x.pm_id;
		$scope.selectGoodstitle = x.pm_title;

	}

	$scope.subSelectGoods =  function(){
		if (!$scope.selectGoodsid) {
			messageFactory.showMessage('error',"请选择要关联的商品");
			return false;
		}
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.reload()
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var url = "/admin/product/productMainControl/doRelation.action"
	
		EzConfirm.create({
			heading : '提示',
			text : "您确定要关联吗？"
		}).then(function() {
		  http.post(url,{"pm_id":$scope.vo.pm_id, "pm_relationid":$scope.selectGoodsid},success,error);
		}, function() {

		});
	}

	/**
	 * 支付类型列表
	 */
	$scope.changeRateList = [];
	$scope.queryChangeRateList = function(){
	  var success = function(result){
		$scope.changeRateList = result.data;
		// $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
	  }
	  var error = function(result){
		  messageFactory.closeLoading();
		  messageFactory.showMessage('error',result.desc);
	  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2203';
		http.post(url,null,success,error);
	}
	$scope.queryChangeRateList();
	
})