tempApp.controller('ctr_memberbase', function($scope,EzConfirm,messageFactory,http,$state,$stateParams,$rootScope) {
		$scope.pager = {page:1,rows:'20',sort:'mb_ts',order:'desc',pageList:['10','20','30']};
		$scope.orderPager = {page:1,rows:'20',sort:'om_order_time',order:'desc',pageList:['10','20','30'],om_shopid:$rootScope.USER.shopId};
		$scope.searchParam = {};
		$scope.vo = {};
		var format = 'yyyy-MM-dd';
		$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
		// $scope.startdate = $scope.dateNow[0];
		// $scope.enddate = $scope.dateNow[1];
		$scope.startDate = "";
		$scope.endDate = "";
		$scope.searchParam.startDate = $scope.startDate;
		$scope.searchParam.endDate = $scope.endDate;
		$("#start_date").val($scope.startdate);
		$("#end_date").val($scope.enddate);

	$scope.vm = {
            rules : {
            	
            }
         };
	
	/**
	 * 查询列表
	 */
	var queryUserList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.userList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		//console.log("===========ttt=============="+$scope.searchParam.startDate);
		//console.log("===========ttt=============="+$scope.searchParam.endDate);
		var url = '/admin/member/memberBaseControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		//alert($("#start_date").val());
		//alert($("#end_date").val());
		// console.log("===========start_date=============="+$("#start_date").val());
		// console.log("===========end_date================"+$("#end_date").val());
		// console.log("=========xxx================"+$scope.searchParam.startDate);
		// console.log("=========xxx================"+$scope.searchParam.endDate);
		if($scope.pager.page==1){
			queryUserList();
		}else{
			$scope.pager.page = 1;
		}
	}
    
    
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue;
	},queryUserList);
	
	/**
	 * 显示弹框
	 */
	$scope.showDialog = function(){
		$('#start_time').val($scope.dateNow[0]+'至'+'2028-12-30');
		$scope.dialogShow = true;
	}
	/**
	 * 关闭弹框
	 */
	$scope.closeDialog = function(){
		$scope.dialogShow = false;
		$scope.vo = {};
	}
	
	
	
	 /**
	  * 搜索
	  */
	 $scope.doSearch = function(){
		 //$scope.searchParam.searchKey = $scope.searchKey;
		 if($scope.pager.page != 1){
			 $scope.pager.page = 1; 
		 }else{
			queryUserList();
		 }
	 }
	 
	   
		
		
		/**
		 * 新增和编辑
		 */
		$scope.toEdit = function(id){
			$scope.dialogTitle = "人员信息调整";
			$scope.showDialog();
		}
	
		/**
		 * 保存
		 */
		$scope.savaEdit = function(){
			
			var success = function(result){
				messageFactory.showMessage('success',result.desc);
				$scope.closeDialog();
				queryUserList();
			}
			var error = function(result){
				console.log("===========start_date=============="+result.desc);
				messageFactory.closeLoading();
				console.log("===========start_date=============="+result.desc);
				messageFactory.showMessage('error',result.desc);
				
			}

			$scope.vo.queryStartdate = $("#queryStartdate").val();
			$scope.vo.queryEnddate = $("#queryEnddate").val();
			$scope.vo.startdate = $("#startdate").val();


			
			if (!$scope.vo.queryStartdate) {
				messageFactory.showMessage('error',"注册开始日期不能为空！");
				return false;
			}
			if (!$scope.vo.queryEnddate) {
				messageFactory.showMessage('error',"注册开始结束不能为空！");
				return false;
			}
			if (!$scope.vo.startdate) {
				messageFactory.showMessage('error',"调整日期不能为空！");
				return false;
			}

			if (!$scope.vo.shopid) {
				messageFactory.showMessage('error',"调整日期不能为空！");
				return false;
			}
			if (!$scope.vo.storecode) {
				messageFactory.showMessage('error',"柜号不能为空！");
				return false;
			}
			if (!$scope.vo.membernum) {
				messageFactory.showMessage('error',"人数不能为空！");
				return false;
			}



			var url = '/admin/ticket/ticketVerificationControl/updateMemberData.action';
			var msg = "您确定调整日期吗？";
			EzConfirm.create({
				heading : '提示',
				text : msg
			}).then(function() {
				http.post(url,$scope.vo,success,error);
			}, function() {
			});
		}
		

		$scope.vmm ={}
		
		$scope.pager1 = {page:1,rows:'10',sort:'ms_id',order:'desc',pageList:['10','20','30']};
		$scope.searchParam1 = {};
		
		/**
		 * 查询服务商商店铺列表
		 */
		$scope.queryMemberShopList = function(){
			var success = function(result){
				$scope.memberShopList = result.data.rows;
				$scope.pager1.total=result.data.total;
				$scope.pager1.pageTotal = Math.ceil($scope.pager1.total/$scope.pager1.rows);
				messageFactory.closeLoading();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			}
			var url =  '/admin/member/memberShopControl/dataGrid.action';
			http.post(url,$.extend({},$scope.pager1,$scope.searchParam1),success,error);
		}
		$scope.queryMemberShopList();
		
		/**
		 * 选择服务商店铺列表
		 */
		$scope.selectedMemberShop = function(id,name){
			$scope.vo.shopname = name;
			$scope.vo.shopid = id;
			$('.droplistWrap2').hide();
		}
		
		/**
		 * 上一页
		 */
		$scope.prevPage = function(pager,fun){
			if(pager.page==1){
				return;
			}
			pager.page --;
			fun();
		}
		
		/**
		 * 下一页
		 */
		$scope.nextPage = function(pager,fun){
			if(pager.page == pager.pageTotal){
				return;
			}
			pager.page ++;
			fun();
		}
		
		/**
		 * 查询店铺列表
		 */
		$scope.doSearchMsShop = function(){
			$scope.searchParam1.search_ms_name = $scope.vo.mbw_shopid_nameref;
			if($scope.pager1.page!=1){
				$scope.pager1.page = 1;
			}
			$scope.queryMemberShopList();	
		}
		
		
		

		$scope.clearParams = function(){
			$('#start_date').val($scope.startdate);
			$('#end_date').val($scope.enddate);
			$scope.searchParam.searchKey = $scope.searchKey="";
			$scope.searchParam.spreadSearchKey  = "";
			$scope.searchParam.partnerSearchKey  = "";
			$scope.searchParam.agentSearchKey  = "";
		}


		/**
	 * 全局商品编码
	 */
	$scope.usertypeList = [];
	$scope.queryUsertypeList = function(){
		var success = function(result){
			 
			 $scope.usertypeList = result.data;
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2136';
		http.post(url,null,success,error);
	}
	$scope.queryUsertypeList();

	$scope.showUpBox = function(x) {
		$scope.userVo = x;
		$scope.upBox = true;
	}

	$scope.closeUpbox = function(){
		$scope.upBox = false;
	}

	$scope.saveUsertype = function(){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.closeUpbox();
			queryUserList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}

		var url = '/admin/member/memberBaseControl/updateMemberUsertype.action';
		var msg = "您确定修改吗？";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			http.post(url,$scope.userVo,success,error);
		}, function() {
		});
	}

	/**
	 * 显示弹框
	 */
	$scope.showDialog = function(type){
		$scope.dialog = type;
	}
	/**
	 * 关闭弹框
	 */
	$scope.closeDialog = function(){
		$scope.dialog = 0;
	}

	$scope.agentPager = {page:1,rows:'20',sort:'mb_ts',order:'desc',"mb_isagent_sale":"Y",pageList:['10','20','30']};
	$scope.agentList = [];
	$scope.agentSearchParam = {searchKey:""};
	$scope.queryAgentList = function(){
		var success = function(result){
			  $scope.agentList = result.data.rows;
			  $scope.agentPager.total = result.data.total;
			  $scope.agentPager.pageTotal = Math.ceil($scope.agentPager.total/$scope.agentPager.rows);
			  messageFactory.closeLoading();
		  }
		  var error = function(result){
			  messageFactory.closeLoading();
			  messageFactory.showMessage('error',result.desc);
		  }
		  var url = '/admin/member/memberBaseControl/dataGrid.action';
		  http.post(url,$.extend({},$scope.agentPager,$scope.agentSearchParam),success,error);
	}	
	
	/**
	 * 监听合伙人的分页
	 */
	$scope.$watch(function(){
		var newValue = $scope.agentPager.page+' '+$scope.agentPager.rows+' '+$scope.agentPager.sort+' '+$scope.agentPager.order+' ';
		return newValue;
	},$scope.queryAgentList);

	$scope.showSelectPartner = function(x,type){
		if (type == "1") {
			$scope.agenttype_sale = 1;
			$scope.upUser = x;
			$scope.dialog = 3;
			$scope.dialogTitle3 = "为用户"+x.mb_name+"绑定合伙人";
			$scope.agentPager.mb_agenttype_sale = "";
			$scope.agentPager.page =1;
			$scope.queryAgentList();
		} else {
			$scope.agenttype_sale = 2;
			$scope.upUser = x;
			$scope.dialog = 3;
			$scope.dialogTitle3 = "为用户"+x.mb_name+"绑定管理员";
			$scope.agentPager.mb_agenttype_sale = "3";
			$scope.agentPager.page =1;
			$scope.queryAgentList();
		}
		
	}

	$scope.bindAgent = function(x) {
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.dialog = 0;
			$scope.upUser = {};
			queryUserList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'mb_id':$scope.upUser.mb_id, "mb_firstspread":x.mb_id, "mb_agenttype_sale":$scope.agenttype_sale}
		var url = "/admin/member/memberBaseControl/updateProfitInfo.action";
		var	msg = "您确定将"+x.mb_name+"设置为"+$scope.upUser.mb_name+"的上级吗？";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});


	}



	$scope.updateSetPartnerLevel = function(x,type) {
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryUserList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var url = "/admin/member/memberBaseControl/updateSetPartnerLevel.action";
		var	msg = '您确定要升级这个人为管理员吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, {memberId:x.mb_id,agentType:type,"shopId":$rootScope.USER.shopId,"ba_recommend1_rate":50,"ba_recommend2_rate":50}, success, error);
		}, function() {

		});
	}


	$scope.updateSetPartnerToAgent = function(x,type) {
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryUserList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var url = "/admin/member/memberBaseControl/updateSetPartnerAgent.action";
		var	msg = '您确定要升级这个人为管理员吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			http.post(url, {memberId:x.mb_id,agentType:type,"shopId":$rootScope.USER.shopId,"ba_recommend1_rate":50,"ba_recommend2_rate":50}, success, error);
		}, function() {

		});
	}
		
})