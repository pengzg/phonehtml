tempApp.controller('ctr_baseStorebox', function($scope,
		$state,http,EzConfirm,messageFactory,$rootScope) {
	$scope.pager = {page:1,rows:'20',sort:'bs_id',order:'desc',pageList:['10','20','30'],bs_shopid:$rootScope.USER.shopId};
	$scope.searchParam = {};
	$scope.vo = {};
	$scope.showPic = false;
	$scope.appidShow = false;
	$scope.showExample = false;
	$scope.onlineList = [{"onlinestate":"","name":"全部"},{"onlinestate":"1","name":"离线"},{"onlinestate":"2","name":"在线"}]
	
	$scope.boxStateList = [{"id":"","name":"全部"},{"id":1,"name":"正常"},{"id":2,"name":"维修"},{"id":3,"name":"异常"}];
	$scope.alertStateList = [{"id":"","name":"全部"},{"id":1,"name":"低于预警"},{"id":2,"name":"高于预警"}];
	$scope.statsList = [{"id":"","name":"全部"},{"id":1,"name":"启用"},{"id":0,"name":"禁用"}];
	$scope.activeStateList = [{"id":"","name":"全部"},{"id":1,"name":"已激活"},{"id":2,"name":"未激活"}];
	/**
	 * 查询数据
	 */
	var queryBaseStorehouse = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.baseStorehouseList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		$scope.searchParam.bs_type = 4;
		var url = '/admin/base/baseStorehouseControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
//		http.post(url,$scope.pager,success,error);
	}

	
	/**
	 * 删除
	 */
	$scope.toDelete = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryBaseStorehouse();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'bs_id':id}
		var url = "/admin/base/baseStorehouseControl/delete.action";
		var	msg = '您确定修改本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	
	/**
	 * 条件查询
	 */
	$scope.doSearch = function(){
		if($scope.pager.page!=1){
			$scope.pager.page = 1;
		}
		queryBaseStorehouse();
	}
	
	
	/**
	 * 排序方法
	 */
	$scope.sortFun = function(name,flag){
		if(!flag){
			return 'colorCenter noSortCss';
		}
		if($scope.pager.sort==name&&$scope.pager.order=='asc'){
			return 'SortAscCss'
		}
		if($scope.pager.sort==name&&$scope.pager.order=='desc'){
			return 'SortDescCss'
		}
	}
	
	/**
	 * 点击切换排序
	 */
	$scope.clickSortFun = function(name){
		if($scope.pager.sort!=name){
			$scope.pager.sort = name;
			$scope.pager.order = 'asc';
		}
		if($scope.pager.sort==name){
			if($scope.pager.order=='asc'){
				$scope.pager.order = 'desc';
			}else{
				$scope.pager.order = 'asc';
			}
		}
	}
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue;
	},queryBaseStorehouse);
	
	/**
	 * 显示添加弹框
	 */
	$scope.showDialog = function(){
		$scope.vo = {};
		$scope.vo.bs_stats = '1';
		$scope.vo.bs_type = '4';
		$scope.vo.bs_stock_status = 'Y';
		$scope.vo.bs_is_negative = '0';
		$scope.vo.bs_is_virtual = '2';
		$scope.vo.bs_boxnum = 1;
		$scope.vo.bs_box_type = 3;
		$scope.vo.bs_box_state = 1;
		$scope.vo.bs_activestate = 2;
		$scope.vo.bs_alertnum = 20;
		$scope.vo.bs_spec = 80;
		$scope.vo.bs_is_sendmsg = "Y";
		
		$scope.dialogShow = true;
	}
	
	/**
	 * 关闭添加弹框
	 */
	$scope.closeDialog = function(){
		$scope.showDialog();
		$scope.dialogShow = false;
	}
	
	//新增和修改柜子
	$scope.toEdit = function(id,type){
		if(id==undefined || id == ''){
			$scope.dialogTitle = '添加柜子';
			$scope.showDialog();
		}else{
			$scope.dialogTitle = '编辑柜子';
			$scope.queryDetail(id);
			$scope.showDialog();
		}
	}
	
	/**
     * 新增柜子完成
     */
    $scope.addcomplete = function(bs_id,bs_code){
    	
    	if (!$scope.vo.bs_name) {
			messageFactory.showMessage('error',"请输入柜子名称");
			return false;
		}
		
		var codeReg = /^[0-9a-zA-Z]+$/;
    	if (!$scope.vo.bs_code) {
			messageFactory.showMessage('error',"请输入柜子编号");
			return false;
		} else {
			if (!codeReg.test($scope.vo.bs_code)) {
				messageFactory.showMessage('error',"柜子编号只能是数字和字母");
				return false;
			}
		}
		 
    	var  reg = /^\d{1,10}$/;
    	
    	if (!reg.test($scope.vo.bs_boxnum) ||!$scope.vo.bs_boxnum) {
			messageFactory.showMessage('error',"格子数量只能为整数且只能介于1和99之间");
			return false;
		}
    	
			$scope.vo.bs_type = 4;//
			
			if (!$scope.vo.bs_areacode) {
				messageFactory.showMessage('error',"请选择柜子区域");
				return false;
			}

    	
    	var success = function(result){
    		messageFactory.closeLoading();
    		messageFactory.showMessage('success',result.desc);
    		$scope.vo={};
			$scope.closeDialog();
			$scope.doSearch();
    	}
    	
    	var error = function(result){
    		messageFactory.showMessage('error',result.desc);
    		messageFactory.closeLoading();
    		/*$scope.closeDialog();*/
    	}
    	
		var url = "/admin/base/baseStorehouseControl/update.action" ;
			var msg = '您确定添加本条记录吗？';
			//console.log($stateParams.bc_id);
			if(bs_id != undefined && bs_id != ''){
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
    
    /**
	 * 查询柜子明细
	 */
	$scope.queryDetail = function(id){
		var success = function(result){
			$scope.vo = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		messageFactory.showLoading();
		var url = '/admin/base/baseStorehouseControl/getDetail.action';
		http.post(url,{bs_id:id},success,error);
	}

	
	$scope.goBoxList = function(x){
		var url = $state.href("index.box.storeboxlist",{"bs_id":x.bs_id});
		window.open(url,'_blank');
	}

	$scope.showAppChoose = function(x) {
		$scope.vo = x;
		$scope.appidShow = true;

	}
	
	/**
	 * 生成柜子的小程序二维码
	 */
	$scope.createQRcode = function() {
		if (!$scope.vo.appCode) {
			messageFactory.showMessage('error',"请选择小程序");
			return false;
		}
		var x = $scope.vo;
		var success = function(result){
			$scope.qrcode = result.data;
			$scope.updateqrcode(x.bs_id,$scope.qrcode);
			
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		
		var url ="/admin/base/weixinInformationControl/createwxaqrcode.action";
		var data = {"scene":x.bs_code,"code":$scope.vo.appCode,"page":"pages/mall/scanbuy"};
		var msg = "您确定要生成二维码吗？";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, data, success, error);
		}, function() {

		});		
	}
	
	/**
	 * 更新柜子的小程序二维码
	 */
	$scope.updateqrcode = function(bs_id, qrcode) {
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			messageFactory.closeLoading();
			$scope.vo = {};
			$scope.appidShow = false;
			queryBaseStorehouse();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		
		var url ="/admin/base/baseStorehouseControl/updateQrcode.action";
		var data = {"bs_id":bs_id,"qrcode":qrcode};

		messageFactory.showLoading();
		http.post(url, data, success, error);
	}
	
	$scope.showBsPic = function(x, type){
		if (type ==1) {
			if (!x.bs_def1_show) {
				return false;
			}
			$scope.showPic = true;
			$scope.picUrl = x.bs_def1_show;
		} else {
			if (!x.bs_qrcode_show) {
				return false;
			}
			$scope.showPic = true;
			$scope.picUrl = x.bs_qrcode_show;
		}

		$scope.storeTitle = x.bs_name;
	}
	
	$scope.clearParams = function(){
		$scope.searchParam.bs_onlinestatus = "";
		$scope.searchParam.searchKey = "";
		$scope.searchParam.bs_box_state = "";
		$scope.searchParam.bs_stats = "";
		$scope.searchParam.bs_box_type = "";
		$scope.searchParam.bs_alert_state = "";
	}
	
	$scope.appPager = {page:1,rows:'20',sort:'wi_id',order:'desc',pageList:['10','20','30'],bs_shopid:$rootScope.USER.shopId};
	$scope.getAppList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.appList = result.data.rows;
			$scope.appPager.total=result.data.total;
			$scope.appPager.pageTotal = Math.ceil($scope.appPager.total/$scope.appPager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/base/weixinInformationControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.appPager, $scope.searchParam),success,error);
	}
	$scope.getAppList();
	
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
    			enable: false
    		},
    		callback: {
    			onClick: zTreeOnClick
    		}
    	}; 
	$scope.selectarea = {};
    function zTreeOnClick(event, treeId, treeNode) {
    	$scope.selectarea.bs_areacode = treeNode.ba_district_gbcode;
    	$scope.selectarea.bs_areacode_nameref = treeNode.name;
    	$scope.selectarea.check_Child_State = treeNode.check_Child_State;
    };
	/**
     * 显示城市弹框
     */
    $scope.showCityDialog = function(){
    	$scope.showCity = true;
    	var treeObj = $.fn.zTree.getZTreeObj("tree2");
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
    	if($scope.selectarea.check_Child_State != -1){
    		messageFactory.showMessage('error',"请选择底级区域！");
			return;
    	}
    	$scope.vo.bs_areacode = $scope.selectarea.bs_areacode;
    	$scope.vo.bs_areacode_nameref = $scope.selectarea.bs_areacode_nameref;
    	$scope.closeCityDialog();
    }
	
	/**
	 * 查询柜子类型
	 */
	$scope.boxTypeList = [];
	$scope.boxTypeListSearch = [];
	$scope.queryBoxTypeList = function(){
		var success = function(result){
			$scope.boxTypeList = result.data;
			for(var x in result.data){
				var code = result.data[x].bd_code; 
				var name = result.data[x].bd_name;
				var str = {'bd_code':code,'bd_name':name};
				$scope.boxTypeListSearch.push(str);
			 } 
			$scope.boxTypeListSearch.unshift({'bd_code':'','bd_name':"全部"});	 
			$scope.boxTypeList.unshift({'bd_code':'','bd_name':"请选择柜子类型"});	 
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2154';
		http.post(url,null,success,error);
	}
	$scope.queryBoxTypeList();

					/**
	 * 查询列表
	 */
	$scope.communityList = [];
	$scope.communityPager = {page:1,rows:'20',sort:'bcm_id',order:'desc',pageList:['10','20','30'],bcm_shopid:$rootScope.USER.shopId};
	var queryCommunityList = function(){

		messageFactory.showLoading();
		var success = function(result){
			$scope.communityList = result.data.rows;
			$scope.communityPager.total=result.data.total;
			$scope.communityPager.pageTotal = Math.ceil($scope.communityPager.total/$scope.communityPager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/base/baseCommunityControl/dataGrid.action';
		http.post(url,$.extend({},$scope.communityPager,$scope.searchParam2),success,error);
	}

		/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.communityPager.page+' '+$scope.communityPager.rows+' '+$scope.communityPager.sort+' '+$scope.communityPager.order+' ';
		
		return newValue;
	},queryCommunityList);


	$scope.searchFun2 = function() {
		if($scope.communityPager.page==1){
			queryCommunityList();
		}else{
			$scope.communityPager.page = 1;
		}
	}

	$scope.selectCommunity = function(x) {
		console.log(11);
		$scope.selectCommunityVO = x;

	}

	$scope.subSelectCommunity = function(){
		$scope.vo.bs_communityid = $scope.selectCommunityVO.bcm_id;
		$scope.vo.bs_communityid_nameref = $scope.selectCommunityVO.bcm_name;
		$scope.dialog = 0;

	}

	$scope.showDialogBox = function(type) {
		$scope.dialog = type;
		if (type == 5) {
			queryAgentList();
		}

	}

	/**
	 * 查询列表
	 */
	$scope.agentList = [];
	$scope.agentPager = {page:1,rows:'20',sort:'ba_id',"ba_dr":1,order:'desc',pageList:['10','20','30'],ba_shopid:$rootScope.USER.shopId};
	$scope.searchParam5 = {};
	var queryAgentList = function(){

		messageFactory.showLoading();
		var success = function(result){
			$scope.agentList = result.data.rows;
			$scope.agentPager.total=result.data.total;
			$scope.agentPager.pageTotal = Math.ceil($scope.agentPager.total/$scope.agentPager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/base/baseAgentControl/dataGrid.action';
		http.post(url,$.extend({},$scope.agentPager,$scope.searchParam5),success,error);
	}

		/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.agentPager.page+' '+$scope.agentPager.rows+' '+$scope.agentPager.sort+' '+$scope.agentPager.order+' ';
		
		return newValue;
	},queryAgentList);


	$scope.searchFun5 = function() {
		if($scope.agentPager.page==1){
			queryAgentList();
		}else{
			$scope.agentPager.page = 1;
		}
	}

	$scope.selectAgent = function(x) {
		$scope.selectedAgentVO= x;

	}

	$scope.subSelectAgent= function(){
		if ($scope.searchParam5.ba_type==4) {
			$scope.vo.bs_agentid = $scope.selectedAgentVO.ba_id;
			$scope.vo.bs_agent_memberid = $scope.selectedAgentVO.ba_agent_memberid;
			$scope.vo.bs_agent_memberid_nameref = $scope.selectedAgentVO.ba_agent_memberid_nameref;
		} else {
			$scope.vo.bs_agentid2 = $scope.selectedAgentVO.ba_id;
			$scope.vo.bs_agent_memberid2 = $scope.selectedAgentVO.ba_agent_memberid;
			$scope.vo.bs_agent_memberid2_nameref = $scope.selectedAgentVO.ba_agent_memberid_nameref;
		}
		$scope.dialog = 0;
		$scope.selectedAgentVO = {};
		$scope.searchParam5.bs_type = "";

	}

	$scope.clearParams5 = function(){
		$scope.searchParam5.searchKey = "";
	}

	/**
	 * 查询柜子运营类型
	 */
	$scope.boxOptTypeList = [];
	
	$scope.queryOptBoxTypeList = function(){
		var success = function(result){
			$scope.boxOptTypeList = result.data;
			
			$scope.boxOptTypeList.unshift({'bd_code':'','bd_name':"请选择类型"});	 
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2206';
		http.post(url,null,success,error);
	}
	$scope.queryOptBoxTypeList();


	$scope.agentSaleList = [];
	$scope.agentSalePager = {page:1,rows:'200',"ba_dr":1,sort:'ba_id',order:'desc',"ba_type":3,pageList:['10','20','30']};
	$scope.queryAgentSaleList = function(){

		messageFactory.showLoading();
		var success = function(result){
			$scope.agentSaleList = result.data.rows;
			$scope.agentSaleList.unshift({"ba_id":"","ba_name":"请选择管理员"});

			
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/base/baseAgentControl/dataGrid.action';
		http.post(url,$.extend({},$scope.agentSalePager),success,error);
	}
	$scope.queryAgentSaleList();

})