tempApp.controller('ctr_promotionOrderAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory) {
	$scope.promotion = {};
	$scope.checkedAreas = "";
	$scope.dataList = [{}];
	$scope.dataList2 = [{}];	
	$scope.goodsList = [];
	$scope.today = dateUtil.getDate2()+" 至  "+dateUtil.getDate2();
	$scope.ladderVO = {"ppg_skuid":'',"ppg_productid":'',"ppg_productid_nameref":'',"ppg_minnum":'',"ppg_minamount":'',"ppg_gift_num":'',"ppg_mj_amount":'',"ppg_discount":'',"ppg_productprice":'',"ppg_gift_totalnum":''};
	$scope.ladderList = [$scope.ladderVO];
	
	
	$scope.vo = {'ppm_promotion_type':2,"ppm_promotion_rules":1,"ppm_range":1, "ppm_state":2};
	$("#start_time").val($scope.today);
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    	//console.log(start.format('YYYY-MM-DD'))
    	// $scope.time= $('#start_time').val(); 
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
					if($scope.dataList[i].pm_id==obj.pm_id){
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
			obj2.ppg_productid = obj.pm_id;
			obj2.ppg_skuid = obj.ps_id;
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
		} else {
			$scope.dataList2.push({});
		}
		
		// changeFrameHeight('index.'+$state.current.name);
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
		if( !$scope.vo.ppm_name){
			messageFactory.showMessage('error','请输入促销主题！');
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
		
		if ($scope.isLabber) {
			$scope.vo.ppm_isladder = 1;
		} else {
			$scope.vo.ppm_isladder = 2;
		}

		$scope.vo.ppm_startdate = $("input[name^='daterangepicker_start']").val();
		$scope.vo.ppm_enddate = $("input[name^='daterangepicker_end']").val();
		
		
		// 参加活动的商品
		var goodsList = [];	
	
		var goodsListStr = JSON.stringify(goodsList);
		
		//赠品 数据
		var giftList = [];		
		for(i in $scope.ladderList){
			if(!$scope.ladderList[i].ppg_skuid){
				continue;
			}
			var ppgInfo = {}
			var item = $scope.ladderList[i];
			ppgInfo = item;

			giftList.push(ppgInfo);
		}
		
		if (giftList.length <1) {
			messageFactory.showMessage('error','请选择参加活动的赠品');
			return;
		}
		var giftListStr = JSON.stringify(giftList);
		
	
		var success = function(result){
			messageFactory.showMessage('success','提交成功');
			$scope.dataList = [{}];
			$scope.dataList2 = [{}];
			$scope.subTotal = 0;
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		$scope.vo.ppm_type = 3;
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
		var stateNow = $state.current.name;//获取当前路由，
		parent.closeIframeState(stateNow);//关闭指定页签
		$state.go("index.combinationActivityList");
		
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

	$scope.selectAllClick = function(){
		if($scope.selectAll){
			$scope.selectAll = false;
			$scope.select1 = false;
			$scope.select2 = false;
			$scope.select3 = false;
			$scope.select4 = false;
		}else{
			$scope.selectAll = true;
			$scope.select1 = true;
			$scope.select2 = true;
			$scope.select3 = true;
			$scope.select4 = true;
		}
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
		
		http.post(url,{"rows":20,"page":1},success,error);
	}
	
	$scope.getBaseGradeList();
	
})