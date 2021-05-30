tempApp.controller('ctr_promotionPackageCopy', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory) {
	$scope.promotion = {};
	$scope.checkedAreas = "";
	$scope.dataList = [];
	$scope.goodsList = [];
	$scope.today = dateUtil.getDate2()+" 至  "+dateUtil.getDate2();
	$scope.ladderVO = {"ppg_skuid":"","ppg_productid":'',"ppg_productid_nameref":'',"ppg_minnum":'',"ppg_minamount":'',"ppg_gift_num":'',"ppg_mj_amount":'',"ppg_discount":'',"ppg_productprice":'',"ppg_gift_totalnum":''};
	$scope.ladderList = [$scope.ladderVO];
	//$scope.ladderList = [1];
	
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


    if ($stateParams.ppm_id != undefined) {
    	$scope.ppm_id = $stateParams.ppm_id;
    }
    
    /**
     * 详情
     */
    $scope.getDetail = function() {
    	messageFactory.showLoading();
		var success = function(result){
			$scope.vo = result.data;
			if ($scope.vo.detailList.length>0) {
				for (var x in $scope.vo.detailList) {
					var str = {"ps_price":$scope.vo.detailList[x].ppd_product_price,
							"pm_title":$scope.vo.detailList[x].ppd_productid_nameref,
							"ps_id":$scope.vo.detailList[x].ppd_skuid,
							"ps_productid":$scope.vo.detailList[x].ppd_productid,
							"ppd_product_num":$scope.vo.detailList[x].ppd_product_num,
							"pm_picture":$scope.vo.detailList[x].ppd_productid_picture}
					$scope.dataList.push(str);
				}
			} else {
				$scope.dataList = [{}];
			}
			$scope.ladderList = $scope.vo.giftList;
			if ($scope.ladderList.length==0) {
				$scope.ladderList=[{}];
			} 
			$scope.vo.ppm_state =2;
			if ($scope.vo.ppm_isladder==1) {
				$scope.isLabber = true;
			} else {
				$scope.isLabber = false;
			}
			if ($scope.vo.ppm_isgroup=='Y') {
				$scope.isgroup = true;
			} else {
				$scope.isgroup = false;
			}
			$scope.vo.ppm_startdate = $scope.vo.ppm_enddate = dateUtil.getDate2();
			$scope.cal();
			$scope.queryDeliveryType();
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"ppm_id":$scope.ppm_id};
		var url = '/admin/promotion/productPromotionMainControl/getCopyData.action';
		http.post(url,data,success,error);
    }
    
    if ($scope.ppm_id) {
    	$scope.getDetail($scope.ppm_id);
    }
	
	$scope.vo = {'ppm_promotion_type':1,"ppm_promotion_rules":1,"ppm_range":1, "ppm_state":2,"ppm_amount_group":0,"ppm_num_group":0};
	$scope.vo.ppm_startdate = $scope.vo.ppm_enddate = dateUtil.getDate2();
	$("#start_time").val($scope.today);
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
		$scope.vo.ppm_startdate = start.format('YYYY-MM-DD');
		$scope.vo.ppm_enddate = end.format('YYYY-MM-DD');
		$scope.$apply();
    });
	$scope.goods_type = 1;
	
	
	$scope.queryDeliveryType = function(){
		var success = function(result){
			$scope.deliveryTypeList = result.data;
		}
		var error = function(result){
			
		}
		var url = "/admin/base/baseDataControl/detailItem.action";
		http.post(url,{codekey:"2153"},success,error);
	}
	
	$scope.getDeliveryCheckedIds = function() {
		$scope.checkedIds = "";
		var ids = [];
		$("input[name='delivery_type']:checked").not(
				":disabled").each(function() {
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
	function hideUnChecked(treeObj){
		var nodes = treeObj.getNodesByFilter(function(node){
			return node.checked == false;
		});
		treeObj.hideNodes(nodes);
	}
	
	/**
	 * 点击分类事件
	 */
	function onCheck(e, treeId, treeNode) {
		 var treeObj=$.fn.zTree.getZTreeObj("treeDemo"),
         nodes=treeObj.getCheckedNodes(true);
         var v=[];
         for(var i=0;i<nodes.length;i++){
        	
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
	$scope.getDetail = function(pa_id,type) {
		activityDetailFactory.getDetail($scope,pa_id,setting,type);
	}
	
	/**
	 * 查询树
	 */
	$scope.getBaseArea = function(){
		activityDetailFactory.getBaseArea($scope,setting);
	}

	$scope.getBaseArea();

	
	
    /**
     * 查询商品
     */
    $scope.pager1 = {page:1,rows:'10',sort:'',order:'',searchKey:''};
    $scope.searchParam = {};
    $scope.getGoods = function(){
  
    	activityDetailFactory.getGoods($scope);
    }
    /**
     * 商品模糊查询
     */
    $scope.keySearchFun = function(key,type){
    	if(type=="goods"){
    		$scope.pager1 = {page:1,rows:'10',sort:'pm_id',order:'desc',searchKey:key};
    		$scope.getGoods();
    	}
    }
	
    /**
	 * 上一页
	 */
	$scope.prevPage = function(pager,fun){
		activityDetailFactory.prevPage($scope,pager,fun);
	}
	
	/**
	 * 下一页
	 */
	$scope.nextPage = function(pager,fun){
		activityDetailFactory.nextPage($scope,pager,fun);
	}
    /**
     * 选择商品
     */
	$scope.chooseGoods = function(obj,obj2,type){
		if (type == 1) {
			
			var flag = true;
			if($scope.dataList){
				for(var i in $scope.dataList){
					if($scope.dataList[i].ps_id==obj.ps_id){
						flag = false;
						continue;
					}
				}
			}
			if(flag){
				$scope.dataList[obj2] = obj;
				$scope.dataList[obj2].ppd_product_num = 1;
				$scope.cal();
				
			}else{
				messageFactory.showMessage('error','活动商品不能重复');
				return;
			}
			
			
		}  else {
			obj2.ppg_productid_nameref = obj.pm_title;
			obj2.ppg_productid = obj.pm_id;
		}
		
		
		
		// $scope.calculateFun();
		$(".droplistWrap2").hide();
	}
	/**
     * 添加全部商品
     */
    $scope.addAll = function(objList,index){

    	for(var i=0,len=objList.length;i<len;i++){
    		$scope.chooseGoods(objList[i],index+i);
    	}
    }
	
	/**
	 * 添加行
	 */
	$scope.addLine = function(type){
		if (type == 1) {
			$scope.dataList.push({});
		}
	}
	
	/**
	 * 移除行
	 */
	$scope.removeLine = function(index, type){
		if (type == 1){
			if($scope.dataList.length>1){
				$scope.dataList.splice(index,1);
				// changeFrameHeight('index.'+$state.current.name);
				$scope.cal();
			}else{
				messageFactory.showMessage('error',"至少保留一条记录");
			}
		} 
	}
	
	
	$scope.lineNum = 0;
	$scope.subTotal = 0;

	$scope.showDroplist = function (event,fun,type){	
		activityDetailFactory.showDroplist($scope,event,fun,type);
    };
    
	/**
	 * 保存
	 */
	$scope.submit = function(){
		
	
		if( $scope.vo.ppm_name==undefined || $scope.vo.ppm_name==""){
			messageFactory.showMessage('error','活动名不能为空');
			return;
		}
		
		if( $scope.vo.ppm_picture==undefined || $scope.vo.ppm_picture==""){
			messageFactory.showMessage('error','请上传活动图片');
			return;
		}
		
		if( $scope.vo.ppm_startdate <dateUtil.getDate2()){
			messageFactory.showMessage('error','活动开始日期不能小于当前日期');
			return;
		}
		if( $scope.vo.ppm_startdate >$scope.vo.ppm_enddate){
			messageFactory.showMessage('error','活动结束时间不能小于开始时间');
			return;
		}
		if (!$scope.vo.ppm_def3) {
			messageFactory.showMessage('error','请选择配送方式！');
			return;
		}
		
		if ($scope.isLabber) {
			$scope.vo.ppm_isladder = 1;
		} else {
			$scope.vo.ppm_isladder = 2;
		}

		
		var  reg = /^\d{1,10}$/;
		

		// 团购 start
		if ($scope.isgroup) {
			$scope.vo.ppm_isgroup = "Y";
		} else {
			$scope.vo.ppm_isgroup = "N";
		}
		
		
		if ($scope.vo.ppm_isgroup == "Y") {
			if (!reg.test($scope.vo.ppm_valid_day)) {
				messageFactory.showMessage('error',"有效天数不能包含除数字以外的字符");
				return false;
			}
			
			if (!$scope.vo.ppm_group_price) {
				messageFactory.showMessage('error',"请输入团购价格");
				return false;
			}
			if (!reg.test($scope.vo.ppm_limit_num)) {
				messageFactory.showMessage('error',"参入次数不能包含除数字以外的字符");
				return false;
			}
			if (!reg.test($scope.vo.ppm_group_peopler_num)) {
				messageFactory.showMessage('error',"开团人数不能包含除数字以外的字符");
				return false;
			}
			
			
		}
		
		// 团购 end
		
		
		
		
		// 参加活动的商品
		var goodsList = [];	
		for(i in $scope.dataList){
			if(!$scope.dataList[i].ps_id){
				messageFactory.showMessage('error','请选择要参加活动的商品');
				return;
			}
			var detailInfo = {}
			var item = $scope.dataList[i];
			
			var  reg = /^\d{1,10}$/;
			if (!reg.test(item.ppd_product_num) || item.ppd_product_num<=0) {
				messageFactory.showMessage('error','商品数量只能为正整数');
				return;
			}
			detailInfo["ppd_productid"] = item.ps_productid;
			detailInfo["ppd_productid_nameref"] = item.pm_title;
			detailInfo["ppd_product_describe"] = item.pm_text;
			detailInfo["ppd_product_num"] = item.ppd_product_num;
			detailInfo["ppd_product_price"] = item.ps_price;
			detailInfo["ppd_skuid"] = item.ps_id;
			
			// 计算单个商品团购价格
			if ($scope.vo.ppm_isgroup == "Y") {
				var price = ($scope.vo.ppm_group_price*(
						item.ps_price/$scope.vo.ppm_amount_group
				)).toFixed(2);
				detailInfo["ppd_product_gourp_price"] = price;
			}
			
			
			goodsList.push(detailInfo);
		}
		
		if (goodsList.length <2) {
			messageFactory.showMessage('error','套餐活动商品数量不能少于两个');
			return;
		}
		
		var goodsListStr = JSON.stringify(goodsList);
		if (!$scope.vo.ppm_picture) {
			$scope.vo.ppm_picture = $scope.dataList[0].pm_picture;
		}
		var giftListStr = "";
		
		
	
		var success = function(result){
			messageFactory.showMessage('success','提交成功');
			$scope.goBack();
			$scope.dataList = [{}];
			$scope.subTotal = 0;
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		$scope.vo.ppm_type = 4;
		$scope.vo.ppm_range = 1;
		$scope.vo.ppm_group_type = 3;
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/promotion/productPromotionMainControl/update.action";
			http.post(url,$.extend({'ppdListStr':goodsListStr,"gfListStr":giftListStr,"promotionAreas":$scope.checkedAreas,"promotionGrades":$scope.getCheckedIds},$scope.vo),success,error);
		}, function() {

		});
	}
	
	

	
	// 返回
	$scope.goBack = function(){
	
		$state.go("index.marketing.promotionPackage");
		
	}
		
	/**
	 * 显示图片上传
	 */
	$scope.upImage = function($event){
		activityDetailFactory.upImage($scope,$event);
	};
	
	/**
	 * 加减数目
	 */
	$scope.changeNum = function(x,name,opt,type) {
		activityDetailFactory.changeNum($scope,x,name
				,opt,type);
	}
	
	/**
	 * 按金额与按数量
	 */
	$scope.promotionTypeChange = function(){
		if($scope.vo.ppm_promotion_type==1){
			$scope.vo.ppm_promotion_rules = 1;
		}else{
			$scope.vo.ppm_promotion_rules = 4;
		}
	}

	$scope.addSection = function(){
		$scope.ladderList.push({});
	}

	$scope.delSection = function(index){
		$scope.ladderList.splice(index,1);
	}

	/**
	 * 查询树
	 */
	$scope.getBaseArea = function(){
		activityDetailFactory.getBaseArea($scope,setting);
	}
	
	/**
	 * 客户等级
	 *//*
	$scope.getBaseGradeList = function(){
			
    	var success = function(result){
			$scope.gradeList = result.data.rows;
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		
		var url = '/admin/base/baseGradeControl/dataGrid.action';
		
		http.post(url,{"rows":20,"page":1,"bg_state":1},success,error);
	}
	
	$scope.getBaseGradeList();*/
	
	
	$scope.getCheckedIds = function()
	{
	  $scope.checkedIds = "";
	  var ids = [];
	  $("input.js_grade:checked").not(":disabled").each(function(){		  
	    var selectId = $(this).attr("data-id");	
	   //  console.log(selectId);
	    ids.push(selectId);
	  });
	  return ids.join(',');
	}
	
	/**
	 * 计算
	 */
	$scope.cal= function() {
		$scope.amount = 0;
		$scope.num = 0;
		for(i in $scope.dataList){
			if(!$scope.dataList[i].ps_id){
				continue;
			}
			if (!$scope.dataList[i].ps_price) {
				$scope.dataList[i].ps_price = 0;
			}
			
			if (!$scope.dataList[i].ppd_product_num) {
				$scope.dataList[i].ppd_product_num = 1;
			}
			var  reg = /^\d{1,10}$/;
			if (!reg.test($scope.dataList[i].ppd_product_num) || $scope.dataList[i].ppd_product_num<=0) {
				messageFactory.showMessage('error','商品数量只能为正整数');
				return;
			}
			
			$scope.amount += $scope.dataList[i].ps_price*$scope.dataList[i].ppd_product_num;
			$scope.num += parseInt($scope.dataList[i].ppd_product_num);
		}
		
		$scope.vo.ppm_amount_group = $scope.amount.toFixed(2);
		$scope.vo.ppm_num_group = parseInt($scope.num);
		
	}
	
	$scope.upImage = function($event) {
	    
	      $scope.ue_myeditor.addListener("beforeInsertImage", function(t, arg) {
	        var imgs = "";

	        if (arg.length > 0) {
	          imgs = arg[0].src;
	        }
	        var imgsArr = imgs.split(",");
      	$scope.vo.ppm_picture_show = imgsArr[0].split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net");
       	$scope.vo.ppm_picture =imgsArr[0].split("|")[0].split("static/upload/image")[1];
	       
	      });
		    
		    var myImage = $scope.ue_myeditor.getDialog("insertimage");
		    myImage.open();
	  };
 	
})