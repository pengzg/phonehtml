tempApp.controller('ctr_promotionMainDetail', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory) {
	//console.error($stateParams);
    if ($stateParams.ppm_id != undefined) {
    	$scope.ppm_id = $stateParams.ppm_id;
    }
		
		$scope.groupList = [];
    /**
     * 详情
     */
    $scope.getDetail = function() {
    	messageFactory.showLoading();
		var success = function(result){
			$scope.vo = result.data;
			$scope.vo.ppm_paymethodArr = ($scope.vo.ppm_paymethod).split(",");
			$scope.vo.ppm_paywayArr = ($scope.vo.ppm_payway).split(",");
			$scope.vo.ppm_def3Arr = ($scope.vo.ppm_def3).split(",");
			$scope.buildDetail($scope.vo.detailList)
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var data = {"ppm_id":$scope.ppm_id};
		var url = '/admin/promotion/productPromotionMainControl/getDetail.action';
		http.post(url,data,success,error);
    }
  
    if ($scope.ppm_id) {
    	$scope.getDetail($scope.ppm_id);
    }
	

	$scope.deliveryTypeList = [];
	$scope.queryDeliveryType = function(){
	  var success = function(result){
		$scope.deliveryTypeList = result.data;
	  }
	  var error = function(result){
		  messageFactory.closeLoading();
		  messageFactory.showMessage('error',result.desc);
	  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2153';
		http.post(url,null,success,error);
	}
	$scope.queryDeliveryType();

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


	$scope.buildDetail = function(detailList){
		for (i in detailList) {
			detailList[i].ps_price = detailList[i].ppd_product_price;
			detailList[i].pm_num = detailList[i].ppd_product_num;
			detailList[i].ps_id = detailList[i].ppd_skuid;
			if ($scope.groupList[detailList[i].ppd_groupcode] === undefined ) {
				console.log(detailList[i].ppd_groupcode);
				$scope.groupList.splice(detailList[i].ppd_groupcode,0, {"dataList":[detailList[i]], "num":detailList[i].ppd_groupnum, "salenum":detailList[i].ppd_product_sale_num});
			} else {
				$scope.groupList[detailList[i].ppd_groupcode].dataList.push(detailList[i]);
			}
		}
		$scope.cal();
		console.log($scope.groupList);
	}
	
		/**
	 * 计算
	 */
	$scope.cal = function () {
		console.log(111111111);
		for (j in $scope.groupList) {
			var amount = 0;
			for (i in $scope.groupList[j].dataList) {
				if (!$scope.groupList[j].dataList[i].ps_id) {
					continue;
				}
				if (!$scope.groupList[j].dataList[i].ps_price) {
					$scope.groupList[j].dataList[i].ps_price = 0;
				}

				if (!$scope.groupList[j].dataList[i].pm_num) {
					$scope.groupList[j].dataList[i].pm_num = 1;
				}
				var reg = /^\d{1,10}$/;
				if (!reg.test($scope.groupList[j].dataList[i].pm_num) || $scope.groupList[j].dataList[i].pm_num <= 0) {
					messageFactory.showMessage('error', '商品数量只能为正整数');
					return;
				}

				amount += $scope.groupList[j].dataList[i].ps_price * $scope.groupList[j].dataList[i].pm_num;
			}
			
			$scope.groupList[j].totalAmount = amount.toFixed(2);
		}

	}


})