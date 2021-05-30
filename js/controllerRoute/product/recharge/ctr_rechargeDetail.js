tempApp.controller('ctr_rechargeDetail', function ($scope, http, messageFactory, $state, $stateParams,
    EzConfirm, dateUtil) {
    $scope.unitVO = {};
    $scope.skuList = [{
        ps_code: "P" + dateUtil.getTs()
    }];
    $scope.picList = [];
    $scope.vo = {
        pm_market_price: 0,
        pm_price: 0,
        pm_typeid: "1010"
    };
    $scope.goBack = function () {
        window.history.back();
    };
    var isImgEventExist = false;

    $scope.pm_id = $stateParams.pm_id;


    $scope.getDetail = function () {
        var success = function (result) {
            $scope.vo = result.data;
            $scope.unitVO = result.data.unitRelationVO;
            $scope.skuList = result.data.skuList;
            $scope.priceList = result.data.priceList;
            for (x in $scope.priceList) {
                if (!$scope.priceList[x].psp_price) {
                    $scope.priceList[x].psp_price = ($scope.vo.pm_market_price
                        * $scope.priceList[x].psp_gradeid_discount).toFixed(2);
                }
            }
           

        }
        var error = function (result) {
            messageFactory.showMessage("error", result.desc);
        }
        var url = "/admin/product/productMainControl/getDetail.action";
        http.post(url, { "pm_id": $scope.pm_id }, success, error);

    }
    $scope.getDetail();
    /**
    * 显示图片上传
    */
    $scope.upImage = function ($event, x, index) {
        setX(x);
        if (!isImgEventExist) {
            isImgEventExist = true;
            $scope.ue_myeditor
                .addListener(
                    "beforeInsertImage",
                    function (t, arg) {
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
                                $scope.pp_path_show = imgsArr1[0].split("|")[0].replace("m.shequkuaixian.com", "imgtest.sqkx.net");
                                $scope.pp_path = imgsArr1[0].split("|")[0].split("static/upload/image")[1];
                                $scope.picList.push({ "pp_path": $scope.pp_path, 'pp_path_show': $scope.pp_path_show, "pp_ismain": "0" });
                            }
                        }
                        if (x == 2) {
                            $scope.skuList[index].ps_image_show = imgsArr[0]
                                .split("|")[0].ps_image_show
                                .replace(
                                    "m.shequkuaixian.com",
                                    "imgtest.sqkx.net");
                            $scope.skuList[index].ps_image = imgsArr[0]
                                .split("|")[0]
                                .split("static/upload/image")[1];
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
    * 选择品牌
    */
    $scope.selectBrandFun = function (obj) {
        $scope.vo.pm_brandid = obj.bd_id;
        $scope.vo.pm_brandid_nameref = obj.bd_title;
    }

    /**
    * 选择单位
    */
    $scope.selectUnitFun = function (obj) {
        $scope.unitVO.pur_unitid_min = obj.bu_id;
        $scope.unitVO.pur_unitid_min_nameref = obj.bu_name;
    }

    /**
    * 添加商品
    */
    $scope.addProduct = function () {
        if (!$scope.vo.pm_title) {
            messageFactory.showMessage("error", '请输入商品名称');
            return;
        }
        if (!$scope.vo.pm_categoryid) {
            messageFactory.showMessage("error", '请选择商品分类');
            return;
        }
        if (!$scope.unitVO.pur_unitid_min) {
            messageFactory.showMessage("error", '请选择计量单位');
            return;
        }
        if (!$scope.vo.pm_def3) {
            $scope.vo.pm_def3 = "0.00";
        }

        if ($scope.vo.pm_code) {
            var reg = /^[0-9a-zA-Z]{1,30}$/;
            if (!reg.test($scope.vo.pm_code)) {
                messageFactory.showMessage("error", '商品编码只能是数字或者字母');
                return;
            }
        }

        //充值金额 数据
        var  reg = /^[0-9.]{1,10}$/;
		var priceList = [];		
		for(i in $scope.priceList){
			if(!$scope.priceList[i].psp_price){
                messageFactory.showMessage('error',"请输入充值金额");
                return false;
			}
			var priceInfo = {}
            var item = $scope.priceList[i];
            if (!item.psp_rebate_value) {
                messageFactory.showMessage('error',"请输入返现值");
				return false;
            }

			priceInfo = item;
			
			priceList.push(priceInfo);
		}
		
		if (priceList.length <1) {
			messageFactory.showMessage('error','请输入充值金额');
			return;
		}
        var priceListStr = JSON.stringify(priceList);
        

        var success = function (result) {
            messageFactory.showMessage("success", result.desc);
            $state.go("index.product.productList");
        }
        var error = function (result) {
            messageFactory.showMessage("error", result.desc);
        }
        var url = "/admin/product/productMainControl/updateRecharge.action";
        for (i in $scope.skuList) {
            $scope.skuList[i].productAttributeValueRelationStr = JSON
                .stringify([{
                    pavr_attributeid: "",
                    pavr_attribute_valueid: ""
                }]);
        }

        EzConfirm.create({
            heading: '提示',
            text: "您确定提交吗？"
        }).then(function () {
            var data = $.extend({}, $scope.vo, $scope.unitVO, { priceListStr: priceListStr }, { skuListStr: JSON.stringify($scope.skuList) }, { "pi_content": $scope.pi_content }, { "pictureListStr": JSON.stringify($scope.picList) });
            http.post(url, data, success, error);
        }, function () {

        });

    }

    $scope.numberRegFun = function () {
        $scope.vo.pm_sort = $scope.vo.pm_sort.replace(/[^\d]/g,
            '');
    }

    /**
    * 获取会员等级
    */
    $scope.priceList = [];
    $scope.getGrade = function () {
        var success = function (result) {
            for (i in result.data) {
                var data = {
                    psp_gradeid_nameref: result.data[i].bg_title,
                    psp_grade_discount: result.data[i].bg_discount,
                    psp_gradeid: result.data[i].bg_id,
                    psp_is_buy: "Y",
                    psp_price: 0,
                    psp_min_num: 0
                };
                $scope.priceList.push(data);
            }
        }
        var error = function (result) {
            messageFactory.showMessage("error", result.desc);
        }
        var url = "/admin/base/baseGradeControl/getItemList.action";
        http.post(url, {}, success, error);
    }
    // $scope.getGrade();

    /**
    * 获取分类
    */
    $scope.getCategory = function () {
        var success = function (result) {
            var zNodes = result.data;
            var zTreeObj = null;
            var setting = {
                data: {
                    key: {
                        title: "t"
                    },
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        $scope
                            .$apply(function () {
                                if (treeNode.check_Child_State >= 0) {
                                    messageFactory
                                        .showMessage(
                                            "error",
                                            "只能选择子节点");
                                    return;
                                }
                                $scope.vo.pm_categoryid = treeNode.id;
                                $scope.vo.pm_categorycode = treeNode.code;
                                $scope.vo.pm_categoryid_nameref = treeNode.name;
                                $scope.showCategory = false;
                            })
                    }
                }
            };
            zTreeObj = $.fn.zTree.init($("#categrayList"),
                setting, zNodes);
        }
        var error = function (result) {
            messageFactory.showMessage("error", result.desc);
        }
        var url = "/admin/product/productCategoryControl/queryProductCategoryTree.action";
        http.post(url, {}, success, error);
    }
    $scope.getCategory();
    /**
    * 计算价格
    */
    $scope.calPriceFun = function () {
        $scope.vo.pm_market_price = $scope.vo.pm_market_price
            .replace(/[^\.\d]/g, '');
        for (x in $scope.priceList) {
            $scope.priceList[x].psp_price = Number($scope.vo.pm_market_price
                * $scope.priceList[x].psp_gradeid_discount).toFixed(2);
        }
    }

    /**
    * 查询单位
    */
    $scope.getUnit = function () {
        var success = function (result) {
            $scope.unitList = result.data;
        }
        var error = function (result) {
            messageFactory.showMessage("error", result.desc);
        }
        var url = "/admin/base/baseUnitControl/queryUnitList.action";
        http.post(url, {}, success, error);
    }
    $scope.getUnit();

    /**
    * 获取品牌
    */
    $scope.getBrand = function () {
        var success = function (result) {
            $scope.brandList = result.data;
        }
        var error = function (result) {
            messageFactory.showMessage("error", result.desc);
        }
        var url = "/admin/base/baseBrandControl/queryBrandList.action";
        http.post(url, {}, success, error);
    }
    $scope.getBrand();
    /**
    * 勾选
    */
    $scope.checkFun = function (obj) {
        if (obj.psp_is_buy == 'Y') {
            obj.psp_is_buy = 'N';
        } else {
            obj.psp_is_buy = 'Y';
        }
    }

    /**
    * 设置商品图片
    */
    $scope.setCover = function (x) {
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
    $scope.del = function (index) {
        $scope.picList.splice(index, 1);
    }

    $scope.showTips = function (index) {
        $(".js_setCover" + index).show();
    }
    $scope.hideTips = function (index) {
        $(".js_setCover" + index).hide();
    }

    // 返回首页
    $scope.goList = function () {
        $state.go("index.product.productList");
    }

    /**
    * 检查价格
    */
    $scope.checkPrice = function (x) {
        x.psp_price = x.psp_price.replace(/[^\.\d]/g, '');
        if (!x.psp_price) {
            messageFactory.showMessage("error", "输入的价格不正确");
            return;
        }
    }

    
    /**
    * 检查值
    */
    $scope.checkValue = function (x) {
        x.psp_rebate_value = x.psp_rebate_value.replace(/[^\.\d]/g, '');
        if (!x.psp_rebate_value) {
            messageFactory.showMessage("error", "输入的数值不正确");
            return;
        }
    }


    $scope.change2Num = function () {
        $scope.vo.pm_def3 = $scope.vo.pm_def3.replace(/[^\.\d]/g, '');
        if (!$scope.vo.pm_def3) {
            $scope.vo.pm_def3 = "0.00";
            return;
        }
        $scope.vo.pm_def3 = parseFloat($scope.vo.pm_def3).toFixed(2);
    }

    $scope.change2Num2 = function () {
        $scope.vo.pm_rebate_ratio = $scope.vo.pm_rebate_ratio.replace(/[^\.\d]/g, '');
        if (!$scope.vo.pm_rebate_ratio) {
            $scope.vo.pm_rebate_ratio = "0.00";
        }
        $scope.vo.pm_rebate_ratio = parseFloat($scope.vo.pm_rebate_ratio).toFixed(2);
    }

    $scope.getCheckedIds = function () {
        $scope.checkedIds = "";
        var ids = [];
        $("input[name='delivery_type']:checked").not(":disabled").each(function () {
            var selectId = $(this).val();
            //  console.log(selectId);
            ids.push(selectId);
        });
        $scope.vo.pm_delivery_type = ids.join(',');
        var reg = /2/
        $scope.vo.pm_delivery_type_show = reg.test($scope.vo.pm_delivery_type);
        console.log($scope.vo.pm_delivery_type_show);
    }

    	/**
	 * 添加行
	 */
	$scope.addLine = function(){
        $scope.priceList.push({"psp_rebate_type":1, "psp_rebate_value":"0"});
    }
    
    	/**
	 * 移除行
	 */
	$scope.removeLine = function(index){
        if($scope.priceList.length>1){
            $scope.priceList.splice(index,1);
        }else{
            messageFactory.showMessage('error',"至少保留一条记录");
        }
	}
})