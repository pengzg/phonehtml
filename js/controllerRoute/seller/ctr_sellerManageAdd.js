tempApp.controller('ctr_sellerManageAdd', function($scope,$rootScope,EzConfirm,http,messageFactory,$stateParams,$state) {
    $scope.adtype = 1;
 
    $scope.vo = {"ms_state":1,"ms_check_state":1,"ms_type":1, "ms_def1":1};
    /**
     * 提交
     */
    $scope.submit = function($event){
    	
    	var thisObj = $($event.target);
    	if (thisObj.attr("is-post") == 1) {
    		return false;
    	}
    	thisObj.attr("is-post","0");
    	
    	
    	var success = function(result){
    		thisObj.attr("is-post","0");
			messageFactory.showMessage('success',result.desc);
			$state.go("index.seller.sellerManage");
			$scope.vo = {"ms_state":1,"ms_check_state":1};
		}
		var error = function(result){
			thisObj.attr("is-post","0");
			messageFactory.showMessage('error',result.desc);
		}
				
		var name = $scope.vo.ms_name;
		var pattern = new RegExp("[`~!%@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") ;
		
		if (pattern.test(name) || $.trim(name)=="") {
			messageFactory.showMessage('error',"名字不能为空,也不能为特殊字符");
			return false;
		}
		
		if (!$scope.vo.areas) {
			messageFactory.showMessage('error',"请选择服务区域");
			return false;
		}
		
		
		var url = '/admin/member/memberShopControl/update.action';

		var msg = '您确定添加本条记录吗？';
		if($scope.vo.ms_id!=undefined&&$scope.vo.ms_id!=''){
			msg = '您确定修改本条记录吗？';
		}
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, $scope.vo, success, error);
		}, function() {

		});
    }
    
    
    $scope.getDetail = function(ms_id){
    	var success = function(result){
			$scope.vo = result.data;
			$scope.queryMemberShopArea();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		var data ={'ms_id':ms_id}
		var url = "/admin/member/memberShopControl/getDetail.action";
		
		http.post(url, data, success, error);
	
		
    }
    
    if ($stateParams.ms_id != undefined) {
   	 $scope.getDetail($stateParams.ms_id);
    }
    /**
     * 返回
     */
    $scope.backList = function(){
    	$state.go("index.seller.sellerManage");
    }
    
    /**
     * 显示城市弹框
     */
    $scope.showCityDialog = function(){
    	$scope.showCity = true;
    	var treeObj = $.fn.zTree.getZTreeObj("tree2");
		for(j in $scope.shopAreaRelation){
			var node = treeObj.getNodeByParam('id', $scope.shopAreaRelation[j].msa_areaid, null);
			treeObj.checkNode(node, true, true);
		}
    	/*var treeObj = $.fn.zTree.getZTreeObj("tree2");
    	
    	var nodesAll = treeObj.getNodes();
    	for (i in nodesAll) {
    		for(j in $scope.shopAreaRelation){
    			if($scope.shopAreaRelation[j].msa_areaid == nodesAll[i].id){
    				treeObj.checkNode(nodesAll[i], true, true);
    				break;
    			}
    		}
    	}*/
    }
    /**
     * 关闭城市弹框
     */
    $scope.closeCityDialog = function(){
    	$scope.showCity = false;
    }
    
    /**
     * 选择城市
     */
    $scope.selectCity = function(){
    	var treeObj = $.fn.zTree.getZTreeObj("tree2");
    	var nodes = treeObj.getCheckedNodes(true);
    	var data = [];
    	$scope.shopAreaRelation = [];
    	for(i in nodes){
    		if(!nodes[i].isParent){
    			data.push(nodes[i].id);
    			var temp = {};
    			temp.msa_areaid = nodes[i].id;
    			temp.msa_areaid_nameref = nodes[i].name;
    			$scope.shopAreaRelation.push(temp);
    		}
    	}
    	$scope.vo.areas = data.join(',');
    	$scope.closeCityDialog();
    }
    
    /**
     * 查询区域关系
     */
    $scope.queryMemberShopArea = function(){
    	var success = function(result){
			$scope.shopAreaRelation = result.data;
			var data = [];
	    	for(i in $scope.shopAreaRelation){
	    			data.push($scope.shopAreaRelation[i].msa_areaid);
	    	}
	    	$scope.vo.areas = data.join(',');
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'shopid':$scope.vo.ms_id}
		var url = "/admin/member/memberShopAreaControl/queryList.action";
				
		http.post(url, data, success, error);
    }
    

    $scope.mysetting = {
		data : {
			key : {
				title : "t"
			},
			simpleData : {
				enable : true
			}
		},
		edit : {
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false,
			drag : {
				isCopy : false,
				isMove : false
			}
		},
		check : {
			enable : true,
			autoCheckTrigger : true,
			chkboxType : {
				"Y" : "ps",
				"N" : "ps"
			},
			chkStyle : "checkbox",
			nocheckInherit : true,
			chkDisabledInherit : true
		}
	}; 

/**
	 * 经销商类型
	 */
	$scope.shopTypeList = [];
	$scope.queryShopTypeList = function(){
		var success = function(result){
			 
			 $scope.shopTypeList = result.data;
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2147';
		http.post(url,null,success,error);
	}
	$scope.queryShopTypeList();

	/**
	 * 查询列表
	 */
	$scope.msList = [];
	$scope.pager={"rows":10,"page":1,"ms_type":"8"}
	$scope.queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.msList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/member/memberShopControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager),success,error);
	};

	$scope.queryList();
})