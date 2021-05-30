tempApp.controller('ctr_productStoreRelationAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory,$rootScope) {

	$scope.dataList = [{}];
	$scope.goodsList = [];
	$scope.box_type = "";
	$scope.box_num = "";
    if ($stateParams.storeId != undefined) {
    	$scope.storeid = $stateParams.storeId;
    }
    
    /**
     * 详情
     */
    $scope.pager = {"page":1, "rows":30};
    $scope.getDetail = function() {
		$scope.box_type = $("#storeSel>option:selected").attr("box_type");
		$scope.box_num = $("#storeSel>option:selected").attr("box_num");
        /* var grade = objS.options[objS.selectedIndex].box_type; 
        alert(grade); */


    	messageFactory.showLoading();
		var success = function(result){
			if (result.data.rows.length>0) {
				$scope.dataList = [];
				for (var x  in  result.data.rows) {
					var str = {
							"pm_title":result.data.rows[x].psr_productid_nameref,
							"ps_id":result.data.rows[x].psr_skuid,
							"ps_productid":result.data.rows[x].psr_productid
					}
					$scope.dataList.push(str);
				}
			} else {
				$scope.dataList= [{}];
			}
			

			
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"psr_storeid":$scope.storeid,"psr_state":1,"psr_dr":1};
		var url = '/admin/product/productStoreRelationControl/dataGrid.action';
		http.post(url,$.extend(data,$scope.pager),success,error);
    }
    
    if ($scope.storeid) {
    	$scope.getDetail();
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
     * 查询商品
     */
    $scope.pager1 = {page:1,rows:'10',sort:'',order:'',searchKey:'',ps_shopid:$rootScope.USER.shopId, "pm_typeid":1011};
    $scope.searchParam = {};
    $scope.getGoods = function(){
  
    	activityDetailFactory.getGoods($scope);
    }
    /**
     * 商品模糊查询
     */
    $scope.keySearchFun = function(key,type){
    	if(type=="goods"){
    		$scope.pager1 = {page:1,rows:'10',sort:'pm_id',order:'desc',searchKey:key,ps_shopid:$rootScope.USER.shopId, "pm_typeid":1011};
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
			
			
		}else{
			messageFactory.showMessage('error','关联商品不能重复');
			return;
		}
			
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
		
		if (!$scope.storeid) {
			messageFactory.showMessage('error','请选择要关联商品的柜子');
			return;
		}
		
		// 参加活动的商品
		var goodsList = [];	
		for(i in $scope.dataList){
			if(!$scope.dataList[i].ps_id){
				messageFactory.showMessage('error','请选择要关联的商品');
				return;
			}
			var relationInfo = {}
			var item = $scope.dataList[i];

			relationInfo["psr_productid"] = item.ps_productid;
			relationInfo["psr_skuid"] = item.ps_id;
			goodsList.push(relationInfo);
		}
		
		if (goodsList.length <1) {
			messageFactory.showMessage('error','关联的商品不能少于1个');
			return;
		}
		
		var goodsListStr = JSON.stringify(goodsList);

		var success = function(result){
			messageFactory.showMessage('success','提交成功');
			$scope.goBack();

		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/product/productStoreRelationControl/update.action";
			http.post(url,{'relationListStr':goodsListStr,"storeid":$scope.storeid},success,error);
		}, function() {

		});
	}

	// 返回
	$scope.goBack = function(){
	
		$state.go("index.product.productstorerelation");
		
	}
	
	/**
	 * 查询仓库
	 */
	$scope.getStoreHouse = function(){
		var success = function(result){
			$scope.storeList = result.data;
			for (i in $scope.storeList) {
				$scope.storeList[i].bs_name = $scope.storeList[i].bs_name+"("+$scope.storeList[i].bs_code+")";
			}
			$scope.storeList.unshift({'bs_id':'','bs_name':'请选择柜子'});
		}
		var error = function(){
			
		}
		
		var url = "/admin/base/baseStorehouseControl/queryItemList.action";
		http.post(url,{"bs_type":"4","bs_stats":1,"bs_dr":1,bs_shopid:$rootScope.USER.shopId},success,error);
	}
	$scope.getStoreHouse();

	$scope.setStore = function(x){
		alert(1111111111);
	}

})