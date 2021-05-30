tempApp.controller('ctr_promotionMainAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory) {
	$scope.promotion = {};
	$scope.checkedAreas = "";
	$scope.dataList = [{}];
	$scope.dataList2 = [{}];	
	$scope.goodsList = [];
	$scope.today = dateUtil.getDate2()+" 至  "+dateUtil.getDate2();
	$scope.ladderVO = {"ppg_skuid":"","ppg_productid":'',"ppg_productid_nameref":'',"ppg_minnum":'',"ppg_minamount":'',"ppg_gift_num":'',"ppg_mj_amount":'',"ppg_discount":'',"ppg_productprice":'',"ppg_gift_totalnum":''};
	$scope.ladderList = [$scope.ladderVO];
	//$scope.ladderList = [1];
	

	
	$scope.vo = {ppm_use_type:1,'ppm_promotion_type':1,"ppm_promotion_rules":1,"ppm_range":1, "ppm_state":2};
	$scope.vo.ppm_startdate = $scope.vo.ppm_enddate = dateUtil.getDate2();
	$("#start_time").val($scope.today);
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
		$scope.vo.ppm_startdate = start.format('YYYY-MM-DD');
		$scope.vo.ppm_enddate = end.format('YYYY-MM-DD');
		$scope.$apply();
    });
	$scope.goods_type = 1;
	
	
	
	
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
	
	
	
	if ($stateParams.pa_id != "undefined" && $stateParams.pa_id != undefined) {
		$scope.getDetail($stateParams.pa_id,$stateParams.type);
	} else {
		$scope.getBaseArea();
	}
	
	
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
			if (!$scope.vo.ppm_picture) {
				$scope.vo.ppm_picture = obj.pm_picture;
			}
			if(flag){
				$scope.dataList[obj2] = obj;
				
			}else{
				messageFactory.showMessage('error','活动商品不能重复');
				return;
			}
			
			
		} else if (type == 2){
			$scope.dataList2[index] = obj;
		} else {
			obj2.ppg_productid_nameref = obj.pm_title;
			obj2.ppg_productid = obj.ps_productid;
			obj2.ppg_skuid = obj.ps_id;
			obj2.ppg_productprice = obj.ps_price;
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
		} else if (type ==3) {
			$scope.ladderList.push({});
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
			}else{
				messageFactory.showMessage('error',"至少保留一条记录");
			}
		} else if (type == 3) {
			if($scope.ladderList.length>1){
				$scope.ladderList.splice(index,1);
				// changeFrameHeight('index.'+$state.current.name);
			}else{
				messageFactory.showMessage('error',"至少保留一条记录");
			}
		} else {
			if($scope.dataList2.length>1){
				$scope.dataList2.splice(index,1);
				// changeFrameHeight('index.'+$state.current.name);
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
		
		if( $("#start_time").val()==""){
			messageFactory.showMessage('error','请选择活动时间');
			return;
		}
		if( $("#end_time").val()==""){
			messageFactory.showMessage('error','请选择活动时间');
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
		
		if ($scope.isLabber) {
			$scope.vo.ppm_isladder = 1;
		} else {
			$scope.vo.ppm_isladder = 2;
		}

		var  reg = /^\d{1,10}$/;
		console.log($scope.vo);
		// 参加活动的商品
		var goodsList = [];	
		for(i in $scope.dataList){
			if(!$scope.dataList[i].ps_id){
				messageFactory.showMessage('error',"请选择参加活动的商品");
				return false;
			}
			var detailInfo = {}
			var item = $scope.dataList[i];
			detailInfo["ppd_productid"] = item.ps_productid;
			detailInfo["ppd_productid_nameref"] = item.pm_title;
			detailInfo["ppd_product_describe"] = item.pm_text;
			detailInfo["ppd_skuid"] = item.ps_id;
			goodsList.push(detailInfo);
		}
		
		
		
		if (goodsList.length <2) {
			messageFactory.showMessage('error','组合活动商品数量不能少于两个');
			return;
		}
		var goodsListStr = JSON.stringify(goodsList);
		$scope.vo.ppm_picture = $scope.dataList[0].pm_picture;
		//赠品 数据
		var giftList = [];		
		for(i in $scope.ladderList){
			if(!$scope.ladderList[i].ppg_skuid){
				continue;
			}
			var ppgInfo = {}
			var item = $scope.ladderList[i];
			
			if (!reg.test(item.ppg_minnum)) {
				messageFactory.showMessage('error',"购买产品数量不能包含除数字以外的字符");
				return false;
			}
			
			if (!item.ppg_minnum || item.ppg_minnum<=0) {
				messageFactory.showMessage('error','请选择输入购买产品数量且不能小于等于0');
				return;
			}
			// 阶梯区间
			for (j in $scope.ladderList) {
				if(!$scope.ladderList[j].ppg_productid){
					continue;
				}
				
				if ($scope.ladderList[j].ppg_minnum == $scope.ladderList[i].ppg_minnum && i != j) {
					messageFactory.showMessage('error','阶梯区间不能重复');
					return;
				}
				
			}
			
			if (!reg.test(item.ppg_gift_num)) {
				messageFactory.showMessage('error',"赠品数量不能包含除数字以外的字符");
				return false;
			}
			if (!item.ppg_gift_num || item.ppg_gift_num<=0) {
				messageFactory.showMessage('error','请选择输入赠品数量且不能小于等于0');
				return;
			}
			
			ppgInfo = item;

			giftList.push(ppgInfo);
		}
		
		if (giftList.length <1) {
			messageFactory.showMessage('error','请选择参加活动的赠品');
			return;
		}
		var giftListStr = JSON.stringify(giftList);
		
		if (!$scope.getCheckedIds()) {
			messageFactory.showMessage('error','请选择参加活动的客户等级');
			return;
		}
		
		var success = function(result){
			messageFactory.showMessage('success','提交成功');
			$scope.goBack();
			$scope.dataList = [{}];
			$scope.dataList2 = [{}];
			$scope.subTotal = 0;
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		$scope.vo.ppm_type = 2;
		$scope.vo.ppm_range = 1;
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
	
		$state.go("index.marketing.promotionMain");
		
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

	/**
	 * 查询树
	 */
	$scope.getBaseArea = function(){
		activityDetailFactory.getBaseArea($scope,setting);
	}
	
	/**
	 * 客户等级
	 */
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
	
	$scope.getBaseGradeList();
	
	
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