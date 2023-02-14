tempApp.controller('ctr_setup_workStoreRelationAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory,$rootScope) {

	$scope.dataListOld = [{}];
	
	$scope.dataList = [{}];
	$scope.addStoreList = [];

    if ($stateParams.workId != undefined) {
    	$scope.workid = $stateParams.workId;
    }
    
    /**
     * 详情
     */
    $scope.pager = {"page":1, "rows":1000, "order":"asc", "sort":"msa_storeid"};
    $scope.getDetail = function() {
    	if(!$scope.workid){
    		$scope.dataList= [{}];
    		return;
    	}
    	
    	messageFactory.showLoading();
		var success = function(result){
			if (result.data.rows.length>0) {
				$scope.dataList = [];
				for (var x  in  result.data.rows) {
					var str = {
							"bs_code":result.data.rows[x].msa_store_code,
							"bs_id":result.data.rows[x].msa_storeid,
							"bs_name":result.data.rows[x].msa_store_name,
							"msa_type":result.data.rows[x].msa_type
					}
					$scope.dataList.push(str);
				}
				//记录业务员下的柜子列表
				$scope.dataListOld = result.data.rows;
			} else {
				$scope.dataList= [{}];
			}
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"msa_work_id":$scope.workid,"msa_dr":1};
		var url = '/admin/member/memberStoreAuthorityControl/dataGrid';
		http.post(url,$.extend(data,$scope.pager),success,error);
    }
    
    if ($scope.workid) {
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
     * 查询柜子列表
     */
    $scope.pager1 = {page:1,rows:'10',sort:'',order:'',searchKey:'', msa_work_id:$scope.workid,
    		bs_type:4,bs_shopid:$rootScope.USER.shopId};
    $scope.searchParam = {};
    $scope.getStore = function(){
    	//已添加的柜子列表
    	var bs_storeid_arr = [];
    	
    	messageFactory.showLoading();
		var success = function(result){
			$scope.storeList = result.data.rows;
			$scope.pager1.total = result.data.total;
			$scope.pager1.pageTotal = Math.ceil($scope.pager1.total/$scope.pager1.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var str = '';
		if($scope.dataList.length>0){
			for(i in $scope.dataList){
				var item = $scope.dataList[i];
				if(!$scope.dataList[i].bs_id){
					continue;
				}
				bs_storeid_arr.unshift(item.bs_id);
			}
		}
		var str = bs_storeid_arr.join(',');
		var url = '/admin/base/baseStorehouseControl/dataGrid';
		http.post(url,$.extend({'bs_storeid_arr':str},$scope.pager1,$scope.searchParam),success,error);    	
    }
    
    
    /**
     * 柜子模糊查询
     */
    $scope.keySearchFun = function(key,type){
    	if(type=="store"){
    		$scope.pager1 = {page:1,rows:'10',sort:'bs_id',order:'desc',searchKey:key,bs_type:4,bs_shopid:$rootScope.USER.shopId};
    		$scope.getStore();
    	}
    }
	
    /**
	 * 上一页
	 */
	$scope.prevPage = function(pager,fun){
//		activityDetailFactory.prevPage($scope,pager,fun);
		if (pager.page==1) {
			return;
		}
		$scope.pager1.page = pager.page-1;
		$scope.getStore();
		
	}
	
	/**
	 * 下一页
	 */
	$scope.nextPage = function(pager,fun){
//		activityDetailFactory.nextPage($scope,pager,fun);
		if (($scope.storeList.length%10)>0) {
			return;
		}
		$scope.pager1.page = $scope.pager1.page+1;
		$scope.getStore();
	}
	
    /**
     * 选择柜子
     */
	$scope.chooseStore = function(obj,obj2,type){
		
		var flag = true;
		if($scope.dataList){
			for(var i in $scope.dataList){
				if($scope.dataList[i].bs_id==obj.bs_id){
					flag = false;
					continue;
				}
			}
		}
		
		if(flag){
			obj.msa_type = 2;
			$scope.dataList[obj2] = obj;
		}else{
			messageFactory.showMessage('error','关联柜子不能重复');
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
				$scope.cal();
			}else{
//				messageFactory.showMessage('error',"至少保留一条记录");
				$scope.dataList=[{}];
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
		
		if (!$scope.workid) {
			messageFactory.showMessage('error','请选择要关联柜子的业务员');
			return;
		}
		
		/*if ($scope.dataListOld.length>0) {
			
		}*/
//		if($scope.dataList.length==1){
//			
//		}
		
		// 关联的柜子
		var addStoreList = [];	
		for(i in $scope.dataList){
			if(!$scope.dataList[i].bs_id){
				messageFactory.showMessage('error','请选择要关联的柜子');
				return;
			}
			var relationInfo = {}
			var item = $scope.dataList[i];

			relationInfo["msa_storeid"] = item.bs_id;
			relationInfo["msa_type"] = item.msa_type;
			addStoreList.push(relationInfo);
		}
		
		if (addStoreList.length <1) {
			messageFactory.showMessage('error','关联的柜子不能少于1个');
			return;
		}
		
		var addStoreListStr = JSON.stringify(addStoreList);

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
			var url = "/admin/member/memberStoreAuthorityControl/update";
			http.post(url,{'relationListStr':addStoreListStr,"workid":$scope.workid},success,error);
		}, function() {

		});
	}

	// 返回
	$scope.goBack = function(){
	
		$state.go("index.setup.workStoreRelation");
		
	}
	
	/**
	 * 查询业务员
	 */
	$scope.getStoreHouse = function(){
		var success = function(result){
			$scope.workList = result.data;
			
			/*if ($stateParams.mbw_id != undefined) {
		    	$scope.mbw_id = $stateParams.mbw_id;
		    	for(i in $scope.workList){
		    		if($scope.mbw_id == i.mbw_id){
			    		
			    	}
		    	}
			}else{*/
				$scope.workList.unshift({'mbw_id':'','mbw_name':'请选择工作人员'});
//			}
		}
		var error = function(){
			
		}
		
		var url = "/admin/member/memberBaseWorkControl/queryItemList";
		http.post(url,{"mbw_dr":1,"mbw_role_str":"2001,2005","mbw_state":1,mbw_shopid:$rootScope.USER.shopId},success,error);
	}
	$scope.getStoreHouse();

})