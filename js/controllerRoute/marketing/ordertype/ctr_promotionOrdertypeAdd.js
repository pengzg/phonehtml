tempApp.controller('ctr_promotionOrdertypeAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory,$rootScope) {
	$scope.promotion = {};
	$scope.checkedAreas = "";
	$scope.dataList = [{}];
	$scope.goodsList = [];
	$scope.today = dateUtil.getDate2()+" 至  "+dateUtil.getDate2();
	$scope.ladderVO = {"ppg_skuid":"","ppg_productid":'',"ppg_productid_nameref":'',"ppg_minnum":'',"ppg_minamount":'',"ppg_gift_num":'',"ppg_mj_amount":'',"ppg_discount":'',"ppg_productprice":'',"ppg_gift_totalnum":''};
	$scope.ladderList = [$scope.ladderVO];
	//$scope.ladderList = [1];
	

	
	$scope.vo = {"ppm_def4":3,"ppm_def5":2,"ppm_group_type":1,'ppm_promotion_type':1,"ppm_promotion_rules":1,"ppm_range":1, "ppm_state":2,"ppm_amount_group":0,"ppm_num_group":0,"ppm_valid_day":1,"ppm_group_price":1,"ppm_limit_num":1,"ppm_group_peopler_num":2};
	$scope.vo.ppm_startdate = $scope.vo.ppm_enddate = dateUtil.getDate2();
	$("#start_time").val($scope.today);
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
		$scope.vo.ppm_startdate = start.format('YYYY-MM-DD');
		$scope.vo.ppm_enddate = end.format('YYYY-MM-DD');
		$scope.$apply();
    });
	$scope.goods_type = 1;
	
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

	$scope.queryDeliveryType = function(){
		var success = function(result){
			$scope.deliveryTypeList = result.data;
		}
		var error = function(result){
			
		}
		var url = "/admin/base/baseDataControl/detailItem.action";
		http.post(url,{codekey:"2153"},success,error);
	}
	
	$scope.queryDeliveryType();
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
     * 查询商品
     */
    $scope.pager1 = {page:1,rows:'10',sort:'',order:'',searchKey:'',ps_shopid:$rootScope.USER.shopId};
    $scope.searchParam = {};
    $scope.getGoods = function(){
  
    	activityDetailFactory.getGoods($scope);
    }
    /**
     * 商品模糊查询
     */
    $scope.keySearchFun = function(key,type){
    	if(type=="goods"){
    		$scope.pager1 = {page:1,rows:'10',sort:'pm_id',order:'desc',searchKey:key,ps_shopid:$rootScope.USER.shopId};
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
				$scope.dataList[obj2].pm_num = 1;
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
		
		
		
		if( $scope.vo.ppm_startdate <dateUtil.getDate2()){
			messageFactory.showMessage('error','活动开始日期不能小于当前日期');
			return;
		}
		if( $scope.vo.ppm_startdate >$scope.vo.ppm_enddate){
			messageFactory.showMessage('error','活动结束时间不能小于开始时间');
			return;
		}
		$scope.vo.ppm_def5 = Math.abs((parseFloat($scope.vo.ppm_def5)).toFixed(2));
		if ($scope.vo.ppm_def5<=0) {
			messageFactory.showMessage('error','价格必须大于0');
			return false;
		}
		/* $scope.vo.ppm_def5 =($scope.vo.ppm_def5+"").replace(/[^\.\d]/g,'');
		if (!$scope.vo.ppm_def5) {
			messageFactory.showMessage("error","输入的价格不正确");
    		return false;
		}
 */
		var success = function(result){
			messageFactory.showMessage('success','提交成功');
			$scope.goBack();
			$scope.dataList = [{}];
			$scope.subTotal = 0;
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		$scope.vo.ppm_type = 6;
		$scope.vo.ppm_range = 1;
		$scope.vo.ppm_group_type = 3;
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/promotion/productPromotionMainControl/update.action";
			http.post(url,$scope.vo,success,error);
		}, function() {

		});
	}
	
	

	
	// 返回
	$scope.goBack = function(){
	
		$state.go("index.marketing.promotionOrdertype");
		
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
			
			if (!$scope.dataList[i].pm_num) {
				$scope.dataList[i].pm_num = 1;
			}
			var  reg = /^\d{1,10}$/;
			if (!reg.test($scope.dataList[i].pm_num) || $scope.dataList[i].pm_num<=0) {
				messageFactory.showMessage('error','商品数量只能为正整数');
				return;
			}
			
			$scope.amount += $scope.dataList[i].ps_price*$scope.dataList[i].pm_num;
			$scope.num += parseInt($scope.dataList[i].pm_num);
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


	  	/**
	 * 检查价格
	 */
	$scope.checkPrice = function(x) {
		$scope.vo.ppm_def5 = Math.abs((parseFloat($scope.vo.ppm_def5)).toFixed(2));
		if ($scope.vo.ppm_def5<=0) {
			messageFactory.showMessage('error','价格必须大于0');
			return false;
		}
	}
 	
})