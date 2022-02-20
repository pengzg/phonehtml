tempApp.controller('ctr_phoneAdd', function ($scope, $rootScope, $location,
	$state, $timeout, http, $stateParams, EzConfirm, $compile, dateUtil, messageFactory, $q, $http, activityDetailFactory, $rootScope) {


	$scope.vo = {ppm_use_type:1,ppm_membertype:1, ppm_ticket_valid_day:360, ppm_ticket_limit_is:"N", ppm_def3: "", "ppm_payway": "", "ppm_iscoupon": 2, ppm_isshareoffers: "1", ppm_paymethod: "", "ppm_group_type": 1, 'ppm_promotion_type': 1, "ppm_promotion_rules": 1, "ppm_range": 1, "ppm_state": 2, "ppm_amount_group": 0, "ppm_num_group": 0, "ppm_valid_day": 1, "ppm_group_price": 1, "ppm_limit_num": 0, "ppm_group_peopler_num": 2 ,"ppm_box_show":2,"ppm_isspread":2,"ppm_userrule":2,"ppm_def11":1,"ppm_def8":2,"ppm_def9":1,"ppm_isexchangecode":2,"ppm_machineid":"","ppm_def14":2};
	

	$scope._simpleConfig = {
		//这里可以选择自己需要的工具按钮名称,此处仅选择如下五个

		//focus时自动清空初始化时的内容
		autoClearinitialContent: true,
		//关闭字数统计
		wordCount: true,
		//关闭elementPath
		/* elementPathEnabled: false,
		 retainOnlyLabelPasted:true,
		 pasteplain:true,
		 filterTxtRules://默认值：
			 function() {
				function transP(node) {
					node.tagName = 'p';
					node.setStyle();
				}
				return {
					//直接删除及其字节点内容
					'-': 'script style object iframe embed input select',
					'p': {
						$: {}
					},
					'br': {
						$: {}
					},
					'div': {
						'$': {}
					},
					'li': {
						'$': {}
					},
					'caption': transP,
					'th': transP,
					'tr': transP,
					'h1': transP,
					'h2': transP,
					'h3': transP,
					'h4': transP,
					'h5': transP,
					'h6': transP,
					'td': function(node) {
						//没有内容的td直接删掉
						var txt = !! node.innerText();
						if (txt) {
							node.parentNode.insertAfter(UE.uNode.createText('    '), node);
						}
						node.parentNode.removeChild(node, node.innerText())
					}
				}
			}(),*/
	};


	

	
	

	

   

	/**
	 * 保存
	 */
	$scope.submit = function () {
		$scope.vo.ppm_def3 = "1,2";

		

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
			var url = "/admin/promotion/productPromotionMainControl/update.action";
			http.post(url, $.extend({ 'ppdListStr': goodsListStr, "gfListStr": giftListStr, "promotionAreas": $scope.checkedAreas, "promotionGrades": $scope.getCheckedIds, "couponListStr": couponRelationListStr, "spreadListStr":spreadListStr }, $scope.vo), success, error);
		}, function () {

		});
	}




	

	

	


	



	

	


	

	
	/**
	 * 国家
	 */
	$scope.countryList = [];
	$scope.queryCountryList = function () {
		var success = function (result) {
			$scope.countryList = result.data;
			// $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
		}
		var error = function (result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2008';
		http.post(url, null, success, error);
	}
	$scope.queryCountryList();
	/**
	 * 充电类型
	 */
	 $scope.chargeTypeList = [];
	 $scope.queryChargeTypeList = function () {
		 var success = function (result) {
			 $scope.chargeTypeList = result.data;
			 // $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
		 }
		 var error = function (result) {
			 messageFactory.closeLoading();
			 messageFactory.showMessage('error', result.desc);
		 }
		 var url = '/admin/base/baseDataControl/detailItem.action?codekey=2010';
		 http.post(url, null, success, error);
	 }
	 $scope.queryChargeTypeList();
	 /**
	 * 键盘类型
	 */
	$scope.keyTypeList = [];
	$scope.queryKeyTypeList = function () {
		var success = function (result) {
			$scope.keyTypeList = result.data;
			// $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
		}
		var error = function (result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2009';
		http.post(url, null, success, error);
	}
	$scope.queryKeyTypeList();
	/**
	 * 操作系统
	 */
	 $scope.systemList = [];
	 $scope.querySystemList = function () {
		 var success = function (result) {
			 $scope.systemList = result.data;
			 // $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
		 }
		 var error = function (result) {
			 messageFactory.closeLoading();
			 messageFactory.showMessage('error', result.desc);
		 }
		 var url = '/admin/base/baseDataControl/detailItem.action?codekey=2011';
		 http.post(url, null, success, error);
	 }
	 $scope.querySystemList();
	

	


	

	

	
	

	




	

	
	$scope.brandList = [];
	$scope.brandPager = {page:1,rows:'100',sort:'pm_id',order:'desc',pm_shopid:$rootScope.USER.shopId};
	$scope.queryBrandList = function(){

		messageFactory.showLoading();
		var success = function(result){
			$scope.brandList = result.data.rows;
			$scope.brandList.unshift({"pm_id":"","pm_title":"请选择商品"});
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/product/productMainControl/dataGrid.action';
		http.post(url,$.extend({},$scope.machinePager),success,error);
	}
	$scope.queryBrandList();



	/**
	 * 显示图片上传
	 */
	 $scope.picList = [];
	 $scope.pp_path_show = "";
	 $scope.pp_path = "";

	 var isImgEventExist = false;
	 $scope.upImage = function($event, x, index) {
		setX(x);
		if (!isImgEventExist) {
			isImgEventExist = true;
			$scope.ue_myeditor
					.addListener(
							"beforeInsertImage",
							function(t, arg) {
								var x = getX();
								var imgs = "";

								if (arg.length > 0) {
									imgs = arg[0].src;
								}
								var imgsArr = imgs.split(",");
								if (x == 1) {
									
						        	for (i in arg) {
						        		imgs1 = arg[i].src;
						        		var imgsArr1 = imgs1.split(",");
							        	$scope.pp_path_show = imgsArr1[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
							         	$scope.pp_path =imgsArr1[0].split("|")[0].split("static/upload/image")[1];
							         	$scope.picList.push({"pp_path": $scope.pp_path,'pp_path_show':$scope.pp_path_show,"pp_ismain":"0"});
						        	}
								}
								
							});
		}
		var myImage = $scope.ue_myeditor
				.getDialog("insertimage");
		myImage.open();
	};
	var tempX;
	function setX(x) {
		tempX = x;
	}
	function getX() {
		return tempX;
	}

	 /**
	   * 设置商品图片
	   */
	  $scope.setCover = function(x){
		$scope.vo.pm_picture = x.pp_path;
		$scope.vo.pm_picture_show = x.pp_path_show;
		for (i in $scope.picList) {
			if ($scope.picList[i].pp_path == x.pp_path) {
				$scope.picList[i].pp_ismain = 1;
			} else {
				$scope.picList[i].pp_ismain = 0;
			}
		}
	}
	// 删除 
	$scope.del = function(index){
		$scope.picList.splice(index,1);
	}
	
	$scope.showTips = function(index) {
		$(".js_setCover"+index).show();
	}
	$scope.hideTips = function(index) {
	   $(".js_setCover"+index).hide();
	}
})