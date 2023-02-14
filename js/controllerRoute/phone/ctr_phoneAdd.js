tempApp.controller('ctr_phoneAdd', function ($scope, $rootScope, $location,
	$state, $timeout, http, $stateParams, EzConfirm, $compile, dateUtil, messageFactory, $q, $http, $rootScope) {


	$scope.vo = {pm_state:1,pm_dr:1};
	$scope.picList = [];

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
	 * 查询
	 */
	 $scope.getDetail = function(){
		messageFactory.showLoading();
		var success = function(result){
            $scope.vo = result.data;
            $scope.picList = $scope.vo.picList;

			$("#start_date").val($scope.vo.pm_releasedate);
			
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/phone/phoneMainControl/getDetail.action';
		http.post(url,{"pm_id":$scope.pm_id},success,error);
	}

    if ($stateParams.pm_id != undefined && $stateParams.pm_id) {
        $scope.pm_id = $stateParams.pm_id;
        $scope.getDetail();
    }

   

	/**
	 * 保存
	 */
	$scope.submit = function () {
	
		$scope.vo.pm_releasedate = $("#start_date").val();
		var success = function (result) {
			messageFactory.showMessage('success', '提交成功');
			$scope.goBack();
			$scope.dataList = [{}];
			$scope.subTotal = 0;
		}
		var error = function (result) {
			messageFactory.showMessage('error', result.desc);
		}

		$scope.vo.attListStr = JSON.stringify($scope.picList);
		$scope.vo.picList = "";
		EzConfirm.create({
			heading: '提示',
			text: "您确定提交吗？"
		}).then(function () {
			var url = "/admin/phone/phoneMainControl/update.action";
			http.post(url,  $scope.vo, success, error);
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
		var url = '/admin/base/baseDataControl/detailItem?codekey=2008';
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
		 var url = '/admin/base/baseDataControl/detailItem?codekey=2010';
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
		var url = '/admin/base/baseDataControl/detailItem?codekey=2009';
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
		 var url = '/admin/base/baseDataControl/detailItem?codekey=2011';
		 http.post(url, null, success, error);
	 }
	 $scope.querySystemList();
	

	


	

	

	
	

	




	

	
	$scope.brandList = [];
	$scope.brandPager = {page:1,rows:'100',sort:'bb_id',order:'desc'};
	$scope.queryBrandList = function(){

		messageFactory.showLoading();
		var success = function(result){
			$scope.brandList = result.data.rows;
			$scope.brandList.unshift({"bb_id":"","bb_title":"请选择品牌"});
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/base/baseBrandControl/dataGrid.action';
		http.post(url,$.extend({},$scope.brandPager),success,error);
	}
	$scope.queryBrandList();



	/**
	 * 显示图片上传
	 */
	
	 $scope.ba_path_show = "";
	 $scope.ba_path = "";

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
							        	$scope.ba_path_show = imgsArr1[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
							         	$scope.ba_path =imgsArr1[0].split("|")[0].split("static/upload/image")[1];
							         	$scope.picList.push({"ba_path": $scope.ba_path,'ba_path_show':$scope.ba_path_show,"ba_is_main":"0"});
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
		$scope.vo.pm_cover = x.ba_path;
		$scope.vo.pm_cover_show = x.ba_path_show;
		for (i in $scope.picList) {
			if ($scope.picList[i].ba_path == x.ba_path) {
				$scope.picList[i].ba_is_main = 1;
			} else {
				$scope.picList[i].ba_is_main = 0;
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


	$scope.goBack = function(){
		$state.go("index.phone.phoneList");
	}
})