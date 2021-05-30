tempApp.controller('ctr_combinationPackageEdit', function ($scope, $rootScope, $location,
	$state, $timeout, http, $stateParams, EzConfirm, $compile, dateUtil, messageFactory, $q, $http, activityDetailFactory) {
	$scope.promotion = {};
	$scope.checkedAreas = "";
	$scope.dataList = [];
	$scope.goodsList = [];
	$scope.today = dateUtil.getDate2();
	$scope.ladderVO = { "ppg_skuid": "", "ppg_productid": '', "ppg_productid_nameref": '', "ppg_minnum": '', "ppg_minamount": '', "ppg_gift_num": '', "ppg_mj_amount": '', "ppg_discount": '', "ppg_productprice": '', "ppg_gift_totalnum": '' };
	$scope.ladderList = [$scope.ladderVO];
	$scope.iscouponList = [{ "bd_code": 1, "bd_name": "是" }, { "bd_code": 2, "bd_name": "否" }];
	$scope.groupList = [];
	$scope.couponRelationList = [];
	//$scope.ladderList = [1];
	$scope.vo = {"ppm_startdate":$scope.today,}
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
* 点击分类事件
*/
	function onCheck(e, treeId, treeNode) {
		var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
			nodes = treeObj.getCheckedNodes(true);
		var v = [];
		for (var i = 0; i < nodes.length; i++) {

			v.push(nodes[i].id);
		}
		$scope.checkedAreas = v.join(",");
	};
	/**
	 * 分类树形结构配置
	 */
	var setting = {
		view: {
			selectedMulti: false
		},
		check: {
			enable: true
		},
		data: {
			simpleData: {
				enable: true
			}
		},
		callback: {
			onCheck: onCheck
		}
	};

	if ($stateParams.ppm_id != undefined) {
		$scope.ppm_id = $stateParams.ppm_id;
	}

    /**
     * 详情
     */
	$scope.getDetail = function () {
		messageFactory.showLoading();
		var success = function (result) {
			$scope.vo = result.data;
			$scope.buildDetail($scope.vo.detailList);

			$scope.ladderList = $scope.vo.giftList;
			if ($scope.ladderList.length == 0) {
				$scope.ladderList = [{}];
				$scope.isGift = false;
			} else {
				$scope.isGift = true;
			}
			$scope.vo.ppm_paymethodArr = ($scope.vo.ppm_paymethod).split(",");
			$scope.vo.ppm_paywayArr = ($scope.vo.ppm_payway).split(",");
			$scope.vo.ppm_def3Arr = ($scope.vo.ppm_def3).split(",");
			$scope.couponRelationList = $scope.vo.couponRelList;
			$scope.spreadList = $scope.vo.spreadList;
			$("#start_time").val($scope.vo.ppm_startdate+"至 "+$scope.vo.ppm_enddate);
			$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
				$scope.vo.ppm_startdate = start.format('YYYY-MM-DD');
				$scope.vo.ppm_enddate = end.format('YYYY-MM-DD');
				$scope.$apply();
		    });
			$scope.queryDeliveryType();
			$("#hour1").val($scope.vo.ppm_ticket_hour1start);
			$("#hour2").val($scope.vo.ppm_ticket_hour1end);
			$("#hour3").val($scope.vo.ppm_ticket_hour2start);
			$("#hour4").val($scope.vo.ppm_ticket_hour2end);
			$("#hour5").val($scope.vo.ppm_ticket_hour3start);
			$("#hour6").val($scope.vo.ppm_ticket_hour3end);
			messageFactory.closeLoading();
		};
		var error = function (result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);

		};
		var data = { "ppm_id": $scope.ppm_id };
		var url = '/admin/promotion/productPromotionMainControl/getDetail.action';
		http.post(url, data, success, error);
	}

	if ($scope.ppm_id) {
		$scope.getDetail($scope.ppm_id);
	}

	$("#start_time").val($scope.vo.ppm_startdate+"至"+$scope.vo.ppm_enddate);
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function (start, end, label) { // 格式化日期显示框
		$scope.vo.ppm_startdate = start.format('YYYY-MM-DD');
		$scope.vo.ppm_enddate = end.format('YYYY-MM-DD');
		$scope.$apply();
	});
	$scope.goods_type = 1;


	$scope.queryDeliveryType = function () {
		var success = function (result) {
			$scope.deliveryTypeList = result.data;
		}
		var error = function (result) {

		}
		var url = "/admin/base/baseDataControl/detailItem.action";
		http.post(url, { codekey: "2153" }, success, error);
	}

	$scope.getDeliveryCheckedIds = function () {
		$scope.checkedIds = "";
		var ids = [];
		$("input[name='delivery_type']:checked").not(
			":disabled").each(function () {
				var selectId = $(this).val();
				ids.push(selectId);
			});
		$scope.vo.ppm_def3 = ids.join(',')
	}

	/**
	 *隐藏未选中节点
	 * @param treeObj
	 * @returns
	 */
	function hideUnChecked(treeObj) {
		var nodes = treeObj.getNodesByFilter(function (node) {
			return node.checked == false;
		});
		treeObj.hideNodes(nodes);
	}




	$scope.getDetail = function (pa_id, type) {
		activityDetailFactory.getDetail($scope, pa_id, setting, type);
	}

	/**
	 * 查询树
	 */
	$scope.getBaseArea = function () {
		activityDetailFactory.getBaseArea($scope, setting);
	}

	$scope.getBaseArea();



    /**
     * 查询商品
     */
	$scope.pager1 = { page: 1, rows: '10', sort: '', order: '', searchKey: '', ps_shopid: $rootScope.USER.shopId };
	$scope.searchParam = {};
	$scope.getGoods = function () {

		activityDetailFactory.getGoods($scope);
	}
	/**
	  * 查询优惠券
	  */
	$scope.couponPager = { page: 1, rows: '10', sort: '', order: '', searchKey: '', cb_shopid: $rootScope.USER.shopId };
	$scope.searchParam = {};
	$scope.getCouponList = function () {

		activityDetailFactory.getCouponList($scope);
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










	$scope.lineNum = 0;
	$scope.subTotal = 0;

	$scope.showDroplist = function (event, fun, type) {
		activityDetailFactory.showDroplist($scope, event, fun, type);
	};



	// 返回
	$scope.goBack = function () {

		$state.go("index.marketing.combinationPackage");

	}

	/**
	 * 显示图片上传
	 */
	$scope.upImage = function ($event) {
		activityDetailFactory.upImage($scope, $event);
	};






	/**
	 * 查询树
	 */
	$scope.getBaseArea = function () {
		activityDetailFactory.getBaseArea($scope, setting);
	}



	$scope.getCheckedIds = function () {
		$scope.checkedIds = "";
		var ids = [];
		$("input.js_grade:checked").not(":disabled").each(function () {
			var selectId = $(this).attr("data-id");
			//  console.log(selectId);
			ids.push(selectId);
		});
		return ids.join(',');
	}



	$scope.upImage = function ($event) {

		$scope.ue_myeditor.addListener("beforeInsertImage", function (t, arg) {
			var imgs = "";

			if (arg.length > 0) {
				imgs = arg[0].src;
			}
			var imgsArr = imgs.split(",");
			$scope.vo.ppm_picture_show = imgsArr[0].split("|")[0].replace("m.shequkuaixian.com", "imgtest.sqkx.net");
			$scope.vo.ppm_picture = imgsArr[0].split("|")[0].split("static/upload/image")[1];

		});

		var myImage = $scope.ue_myeditor.getDialog("insertimage");
		myImage.open();
	};


	/**
* 支付方式
*/
	$scope.getPayMethodCheckedIds = function () {
		$scope.payMethodCheckedIds = "";
		var ids = [];
		$("input[name='payMethod']:checked").not(":disabled").each(function () {
			var selectId = $(this).val();
			//  console.log(selectId);
			ids.push(selectId);
		});
		$scope.vo.ppm_paymethod = ids.join(',');
	}
	/**
* 支付方式列表
*/
	$scope.payMethodList = [];
	$scope.queryPayMethodList = function () {
		var success = function (result) {

			$scope.payMethodList = result.data;
		}
		var error = function (result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2163';
		http.post(url, null, success, error);
	}
	$scope.queryPayMethodList();

	$scope.getPayWayCheckedIds = function () {
		$scope.payWayCheckedIds = "";
		var ids = [];
		$("input[name='payWay']:checked").not(":disabled").each(function () {
			var selectId = $(this).val();
			//  console.log(selectId);
			ids.push(selectId);
		});
		$scope.vo.ppm_payway = ids.join(',');
	}
	/**
	 * 支付类型列表
	 */
	$scope.payWayList = [];
	$scope.queryPayWayList = function () {
		var success = function (result) {
			$scope.payWayList = result.data;
			// $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
		}
		var error = function (result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2166';
		http.post(url, null, success, error);
	}
	$scope.queryPayWayList();


	$scope.buildDetail = function (detailList) {
		for (i in detailList) {

			detailList[i].ps_price = detailList[i].ppd_product_price;
			detailList[i].pm_num = detailList[i].ppd_product_num;
			detailList[i].ps_id = detailList[i].ppd_skuid;
			detailList[i].ps_productid = detailList[i].ppd_productid;
			detailList[i].pm_title = detailList[i].ppd_productid_nameref;
			console.log(detailList[i].ppd_groupcode);
			if ($scope.groupList[detailList[i].ppd_groupcode] === undefined) {
				$scope.groupList.splice(detailList[i].ppd_groupcode, 0, { "dataList": [detailList[i]], "num": detailList[i].ppd_groupnum , "salenum":detailList[i].ppd_product_sale_num});
			} else {
				$scope.groupList[detailList[i].ppd_groupcode].dataList.push(detailList[i]);
			}
		}
		console.log($scope.groupList);
		$scope.cal();
	}

	/**
 * 计算
 */
	$scope.cal = function () {
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

	$scope.changeNum = function (z) {
		var ppdIdArr = [];
		for (i in z.dataList) {
			ppdIdArr.push(z.dataList[i].ppd_id);
		}

		var str = ppdIdArr.join(",");

		var success = function (result) {
			messageFactory.showMessage("success", result.desc);
		}
		var error = function (result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}

		var url = "/admin/promotion/productPromotionDetailControl/updateGroupNum.action";
		EzConfirm.create({
			heading: '提示',
			text: "您确定提交吗？"
		}).then(function () {
			var data = $.extend({},  { ppd_id_Str: str }, { num: z.num});
			http.post(url, data, success, error);
		}, function () {

		});
	}

	$scope.change2num = function(){
		for (i in $scope.groupList) {
			$scope.groupList[i].num = Math.abs(parseInt($scope.groupList[i].num));
			if (!$scope.groupList[i].num) {
				$scope.groupList[i].num = 0;
			}
		}
	}

	$scope.upVideo = function($event) {
		$scope.ue_myvideoeditor.addListener("afterUpVideo",
			function(t, arg) {
				$scope.vo.ppm_def1 = arg[0].url;
				$scope.vo.ppm_def1_show = arg[0].url;
			}
		);
		var myvideo = $scope.ue_myvideoeditor
				.getDialog("insertvideo");
		myvideo.open();
	};
	$scope.clearVideo = function(type){
		if (type == 1) {
			$scope.vo.ppm_def1 = "";
			$scope.vo.ppm_def1_show = "";
		} else if(type==6){
			$scope.vo.ppm_desc_pic = "";
			$scope.vo.ppm_desc_pic_show = "";
	
		}else {
			$scope.vo.ppm_home_picture = "";
			$scope.vo.ppm_home_picture_show = "";
	
		}
	}

	$scope.upImage2 = function($event) {
	    
		$scope.ue_myeditor2.addListener("beforeInsertImage", function(t, arg) {
		  var imgs = "";

		  if (arg.length > 0) {
			imgs = arg[0].src;
		  }
		  var imgsArr = imgs.split(",");
		$scope.vo.ppm_def2_show = imgsArr[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
		 $scope.vo.ppm_def2 =imgsArr[0].split("|")[0].split("static/upload/image")[1];
		 
		});
		  
		  var myImage = $scope.ue_myeditor2.getDialog("insertimage");
		  myImage.open();
	};

	$scope.upImage3 = function($event) {
	    
		$scope.ue_myeditor3.addListener("beforeInsertImage", function(t, arg) {
		  var imgs = "";

		  if (arg.length > 0) {
			imgs = arg[0].src;
		  }
		  var imgsArr = imgs.split(",");
		$scope.vo.ppm_home_picture_show = imgsArr[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
		 $scope.vo.ppm_home_picture =imgsArr[0].split("|")[0].split("static/upload/image")[1];
		 
		});
		  
		  var myImage = $scope.ue_myeditor3.getDialog("insertimage");
		  myImage.open();
	};

	$scope.upImage4 = function($event) {
	    
		$scope.ue_myeditor4.addListener("beforeInsertImage", function(t, arg) {
		  var imgs = "";

		  if (arg.length > 0) {
			imgs = arg[0].src;
		  }
		  var imgsArr = imgs.split(",");
		$scope.vo.ppm_share_picture_show = imgsArr[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
		 $scope.vo.ppm_share_picture =imgsArr[0].split("|")[0].split("static/upload/image")[1];
		 
		});
		  
		  var myImage = $scope.ue_myeditor4.getDialog("insertimage");
		  myImage.open();
	};

	$scope.upImage6 = function($event) {
	    
		$scope.ue_myeditor6.addListener("beforeInsertImage", function(t, arg) {
		  var imgs = "";

		  if (arg.length > 0) {
			imgs = arg[0].src;
		  }
		  var imgsArr = imgs.split(",");
		$scope.vo.ppm_desc_pic_show = imgsArr[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
		 $scope.vo.ppm_desc_pic =imgsArr[0].split("|")[0].split("static/upload/image")[1];
		 
		});
		  
		  var myImage = $scope.ue_myeditor6.getDialog("insertimage");
		  myImage.open();
	};
	$scope.upImage7 = function($event) {
	    
		$scope.ue_myeditor7.addListener("beforeInsertImage", function(t, arg) {
		  var imgs = "";

		  if (arg.length > 0) {
			imgs = arg[0].src;
		  }
		  var imgsArr = imgs.split(",");
		$scope.vo.ppm_isspread_picture_show = imgsArr[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
		 $scope.vo.ppm_isspread_picture =imgsArr[0].split("|")[0].split("static/upload/image")[1];
		 
		});
		  
		  var myImage = $scope.ue_myeditor7.getDialog("insertimage");
		  myImage.open();
	};
	$scope.upImage8 = function($event) {
	    
		$scope.ue_myeditor8.addListener("beforeInsertImage", function(t, arg) {
		  var imgs = "";

		  if (arg.length > 0) {
			imgs = arg[0].src;
		  }
		  var imgsArr = imgs.split(",");
		$scope.vo.ppm_isspread_s_picture_show = imgsArr[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
		 $scope.vo.ppm_isspread_s_picture =imgsArr[0].split("|")[0].split("static/upload/image")[1];
		 
		});
		  
		  var myImage = $scope.ue_myeditor8.getDialog("insertimage");
		  myImage.open();
	};
		/**
	 * 保存
	 */
	$scope.submit = function(){
		
		
		if (!$scope.vo.ppm_name) {
			messageFactory.showMessage('error','请输入活动主题');
			return;
		}
		
		if( $scope.vo.ppm_picture==undefined || $scope.vo.ppm_picture==""){
			messageFactory.showMessage('error','请上传活动图片');
			return;
		}
		
		if ($scope.vo.ppm_ticket_limit_is == "Y") {

			$scope.vo.ppm_ticket_hour1start = $("#hour1").val();
			$scope.vo.ppm_ticket_hour1end = $("#hour2").val();
			$scope.vo.ppm_ticket_hour2start = $("#hour3").val();
			$scope.vo.ppm_ticket_hour2end = $("#hour4").val();
			$scope.vo.ppm_ticket_hour3start = $("#hour5").val();
			$scope.vo.ppm_ticket_hour3end = $("#hour6").val();


		}

		var success = function(result){
			messageFactory.showMessage('success','提交成功');
			$scope.goBack();

		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		$scope.vo.ppm_type = 1;
		$scope.vo.ppm_range = 1;
		$scope.vo.ppm_group_type = 3;
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/promotion/productPromotionMainControl/updatePromotionMain.action";
			http.post(url,$scope.vo,success,error);
		}, function() {

		});
	}

	$scope.useTypeList = [];
	$scope.queryUseTypeList = function () {
		var success = function (result) {

			$scope.useTypeList = result.data;
		}
		var error = function (result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2189';
		http.post(url, null, success, error);
	}
	$scope.queryUseTypeList();



	$scope.upImage9 = function($event) {
	    
		$scope.ue_myeditor9.addListener("beforeInsertImage", function(t, arg) {
		  var imgs = "";

		  if (arg.length > 0) {
			imgs = arg[0].src;
		  }
		  var imgsArr = imgs.split(",");
		$scope.vo.ppm_userrule_pic_show = imgsArr[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
		$scope.vo.ppm_userrule_pic =imgsArr[0].split("|")[0].split("static/upload/image")[1];
		 
		});
		  
		  var myImage = $scope.ue_myeditor9.getDialog("insertimage");
		  myImage.open();
	};

	$scope.machineList = [];
	$scope.machinePager = {page:1,rows:'100',sort:'pm_id',order:'desc',pm_shopid:$rootScope.USER.shopId};
	$scope.queryMachineList = function(){

		messageFactory.showLoading();
		var success = function(result){
			$scope.machineList = result.data.rows;
			$scope.machineList.unshift({"pm_id":"","pm_title":"请选择商品"});
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/product/productMainControl/dataGrid.action';
		http.post(url,$.extend({},$scope.machinePager),success,error);
	}
	$scope.queryMachineList();

})