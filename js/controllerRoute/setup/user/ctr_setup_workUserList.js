tempApp.controller('ctr_setup_workUserList', function($scope,$rootScope,EzConfirm,messageFactory,http,$state,$stateParams,$rootScope) {
    $scope.pager = {page:1,rows:'20',sort:'mbw_ts',order:'desc',pageList:['10','20','30'],mbw_shopid:$rootScope.USER.shopId};
    $scope.searchParam = {};
    var format = 'yyyy-MM-dd';
	$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
	$scope.startdate = $scope.dateNow[0];
	$scope.enddate = '2028-12-30';
	$scope.searchParam.startDate = $scope.dateNow[0];
	$scope.searchParam.endDate = '2028-12-30';
	var startdate = $scope.dateNow[0];
	var enddate = '2028-12-30';
	$('#start_date').val($scope.startdate);
	$('#end_date').val($scope.enddate);
	$scope.vo = {"mbw_shopid":$rootScope.USER.shopId};
	$scope.merchantShopList = {'ms_id':'','ms_name':''};
	$('#start_time').val($scope.startdate+'至'+$scope.enddate)
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    	//console.log(start.format('YYYY-MM-DD'))
		startdate = start.format('YYYY-MM-DD');
		enddate = end.format('YYYY-MM-DD');
    });
   
	$scope.vm = {
            rules : {
            	
            }
         };
	/**
	 * 查询列表
	 */
	var queryWorkUserList = function(){
		messageFactory.showLoading();
		$scope.searchParam.startDate = $("#start_date").val();
		$scope.searchParam.endDate = $("#end_date").val();
		var success = function(result){
			$scope.workUserList = result.data.rows;
			$scope.pager.total = result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/member/memberBaseWorkControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			$scope.queryWorkUserList()
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
	},queryWorkUserList);
	
	/**
	 * 显示弹框
	 */
	$scope.showDialog = function(){
		$scope.vo.mbw_state = 1;
		$scope.vo.mbw_isdelivery = "Y";
		$('#start_time').val($scope.dateNow[0]+'至'+'2028-12-30');
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
     * 获取用户详情
     */
	 $scope.toDetail = function(id){
		 messageFactory.showLoading();
		var success = function(result){
			$scope.vo = result.data;
			$('#start_time').val($scope.vo.mbw_statdate+'至'+$scope.vo.mbw_enddate);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
				
		}
		var url = '/admin/member/memberBaseWorkControl/getDetail.action';
		http.post(url,{'mbw_id':id},success,error);
	 }
	
	/**
	 * 删除用户
	 */
	 $scope.deleteUser = function(id){
		var success = function(result){
			queryUserList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/member/memberBaseControl/delete.action';
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			http.post(url,{"mb_id":id},success,error);
		}, function() {
			//console.log('取消？')
		});
	}
	 
	 /**
	  * 搜索
	  */
	 $scope.doSearch = function(){
		 $scope.searchParam.startDate = $('#start_date').val();
		 $scope.searchParam.endDate = $('#end_date').val();
		 if($scope.pager.page != 1){
			 $scope.pager.page = 1; 
		 }else{
			 queryWorkUserList();
		 }
	 }
	 
	   /**
		 * 修改用户状态
		 */
		$scope.changeStatus = function(id,text){
			var success = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('success',result.desc);
				queryWorkUserList();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			}
			
			var data ={'mbw_id':id}
			var url = "/admin/member/memberBaseWorkControl/changeStatus.action";
			var	msg = '您确定'+text+'该用户吗？';
			EzConfirm.create({
				heading : '提示',
				text : msg
			}).then(function() {			
				http.post(url, data, success, error);
			}, function() {

			});
		}
		
		
		/**
		 * 新增和编辑
		 */
		$scope.toEdit = function(id){
			$scope.queryWorkList();
			if(id==null||id==undefined){
				$scope.dialogTitle = "新增工作人员信息";
				$scope.vo.isShow = true;
			}else{
				$scope.vo.isShow = false;
				$scope.dialogTitle = "编辑工作人员信息";
				$scope.toDetail(id);
			}
			$scope.showDialog();
		}
	
		/**
		 * 保存
		 */
		$scope.savaEdit = function(id){
			// console.log(111);
			
			if (!$scope.vo.mbw_memberid) {
				messageFactory.showMessage('error',"对不起,此手机号不是公司的客户");
				return false;
			}
			 
			if (!id && !$scope.vo.mbw_pwd) {
				messageFactory.showMessage('error',"请输入密码");
				return false;
			}
			$scope.vo.mbw_state = $("input[name='mbw_state']:checked").val();//状态
			$scope.vo.mbw_statdate = startdate;
			$scope.vo.mbw_enddate = enddate;

			
			var success = function(result){
				$scope.closeDialog();
				queryWorkUserList();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
				
			}
			var url = '/admin/member/memberBaseWorkControl/update.action';
			var msg = "您确定添加本条记录么？";
			if(id != undefined && id != ''){
				var msg = "您确定修改本条记录吗？";
			}
			EzConfirm.create({
				heading : '提示',
				text : msg
			}).then(function() {
				http.post(url,$scope.vo,success,error);
			}, function() {
			});
		}
		
		/**
		 * 选择注册类型
		 */
		$scope.chooseRegisterType = function(x){
			$scope.vo.mbw_role = x.bd_code;
			$scope.vo.mbw_role_nameref = x.bd_name;
		}
		
		/**
		 * 根据手机号查询会员信息
		 */
		$scope.checkMobile = function(mobile){
			$scope.vo.mbw_memberid = "";
			if(mobile.length == 11){
				var success = function(result){
					$scope.vo.mbw_memberid = result.data.mbw_memberid;
					$scope.vo.mbw_name = result.data.mbw_name;
					messageFactory.closeLoading();
					if (!$scope.vo.mbw_memberid) {
						messageFactory.showMessage('error',"对不起,此手机号不是公司的客户");
						return false;
					}
				}
				var error = function(result){
				}
				var url = '/admin/member/memberBaseWorkControl/queryMemberInforByMobile.action';
				http.post(url,{'mbw_mobile':mobile},success,error);
			}
		}
		
		$scope.deleteInput = function(type){
			switch(type){
			case 1:
				$scope.vo.mbw_role = '';
				$scope.vo.mbw_role_nameref = '';
				break;
			case 2:
				$scope.vo.mbw_shopid_nameref = '';
				$scope.vo.mbw_shopid = '';
				break;
			case 3:
				$scope.vo.mbw_storeid_nameref = '';
				$scope.vo.mbw_storeid = '';
				break;
			case 4:
				$scope.vo.mbw_leader_workid = '';
				$scope.vo.mbw_leader_userid = '';
				$scope.vo.mbw_leader_workid_nameref = '';
				break;
			}
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
			http.post(url,$.extend({ms_id:$rootScope.USER.shopId},$scope.pager1,$scope.searchParam1),success,error);
		}
		$scope.queryMemberShopList();
		
		/**
		 * 选择服务商店铺列表
		 */
		$scope.selectedMemberShop = function(id,name){
			$scope.vo.mbw_shopid_nameref = name;
			$scope.vo.mbw_shopid = id;
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
		
		
		/**
		 * 显示重置密码弹框
		 */
		$scope.showDialogPwd = function(){
			$scope.editPwddialogShow = true;
			$scope.passWord = '';
		}
		
		/**
		 * 关闭重置密码弹框
		 */
		$scope.closeDialogPwd = function(){
			$scope.editPwddialogShow = false;
			$(".w5c-error").remove();
			
		}
		
		/**
		 * 重置密码
		 */
		$scope.resetPwd = function(mbw_id){
			$scope.mbw_id = mbw_id;
			$scope.showDialogPwd();
		}
		
		/**
		 * 确认重置密码
		 */
		$scope.modifyPwdComplete = function(){
	    	var success = function(result){
	    		messageFactory.closeLoading();
	    		$scope.closeDialogPwd();
	    		messageFactory.showMessage('success',result.desc);
	    	}
	    	
	    	var error = function(result){
	    		messageFactory.showMessage('error',result.desc);
	    		messageFactory.closeLoading();
	    	}
	    	
			var msg = '您确定重置密码吗？';
				EzConfirm.create({
					heading : '提示',
					text : msg
				}).then(function() {
						messageFactory.showLoading();
						var url = '/admin/member/memberBaseWorkControl/resetPwd.action';
						http.post(url,{'mbw_id':$scope.mbw_id,'mbw_pwd':$scope.passWord}, success, error);
				}, function() {

				});
			
		}
		
		// 显示用户角色弹窗
		$scope.showUserRole = function(obj){
			$scope.userId = obj.mbw_memberid;//选中授权的用户id
			$scope.showUserPop = true;
			$scope.searchKey = '';
			$scope.rolesearchParam.searchKey = '';
			$scope.popName = obj.mbw_name;
			//baseFactory.disableScroll();
			$scope.queryAllRoleList();
		}
		
		$scope.hideUserRole = function(){
			$scope.showUserPop = false;
			$scope.searchKey = '';
			//baseFactory.enableScroll();
		}
		
		/**
		 *查询所有角色 
		 */
		$scope.rolepager = {page:1,rows:'100',sort:'sr_ts',order:'desc',pageList:['100','50']};
		$scope.rolesearchParam = {};
		$scope.queryAllRoleList = function(){
			messageFactory.showLoading();
			var success = function(result){
				$scope.roleList = result.data.rows;
				$scope.rolepager.total = result.data.total;
				$scope.rolepager.pageTotal = Math.ceil($scope.rolepager.total/$scope.rolepager.rows);
				messageFactory.closeLoading();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			}
			var url =  '/admin/sys/sysRoleControl/queryShopRole.action';
			//var url =  '/admin/sys/sysRoleControl/queryAllRole.action';
			http.post(url,$.extend({'userId':$scope.userId},$scope.rolepager,$scope.rolesearchParam),success,error);
		}
		
		/**
		 * 授权
		 */
		$scope.roleUser = function(){
			$scope.selectedRole();
			var roleIds = [];
			for(var x in $scope.arrRole){
				roleIds.push($scope.arrRole[x].sr_id); 
			}
			var roleIdStr = roleIds.join(",");
			
			var success = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('success',result.desc);
				$scope.hideUserRole();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			}
			var data ={'userId':$scope.userId,'roleStr':roleIdStr,sur_source:2}
			var url = "/admin/sys/sysUserRoleControl/insertAuth.action";
			var	msg = '您确定授权吗？';
			EzConfirm.create({
				heading : '提示',
				text : msg
			}).then(function() {			
				http.post(url, data, success, error);
			}, function() {
			});
		}
		
		/**
		 * 选中的角色
		 */
		$scope.selectedRole = function(){
			$scope.arrRole=[];
			$("input[name='role']:checked").not(":disabled").each(function(){
				var sr_id  = $(this).attr("sr_id");
				var str = {'sr_id':sr_id};
				$scope.arrRole.push(str);
			});
		}
		
		//用户角色下搜索
		$scope.doSearchRole = function(){
			$scope.rolesearchParam.searchKey = $scope.searchKey;
			if($scope.rolepager.page==1){
				$scope.queryAllRoleList();
			}else{
				$scope.rolepager.page = 1;
			}
		}
		
		$scope.storePager = {page:1,rows:'10',sort:'bs_id',order:'desc',pageList:['10','20','30']};
		$scope.searchParamStore = {"dateType":'datagrid'};
		
		/**
		 * 查询车仓库
		 */
		$scope.queryStoreList = function(){
			var success = function(result){
				$scope.storeList = result.data.rows;
				$scope.storePager.total=result.data.total;
				$scope.storePager.pageTotal = Math.ceil($scope.storePager.total/$scope.storePager.rows);
				messageFactory.closeLoading();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			}
			var url =  "/admin/base/baseStorehouseControl/queryStorehouse.action";
			http.post(url,$.extend({bs_shopid:$rootScope.USER.shopId,"bs_type_arr":"1,2,4"},$scope.storePager,$scope.searchParamStore),success,error);
		}
		$scope.queryStoreList();
		
		/**
		 * 选择车仓库
		 */
		$scope.selectedStore = function(x){
			$scope.vo.mbw_storeid_nameref = x.bs_name;
			$scope.vo.mbw_storeid = x.bs_id;
			$('.droplistWrap2').hide();
		}
		
		/**
		 * 搜索仓库
		 */
		$scope.doSearchStore = function(){
			$scope.searchParamStore.searchKey = $scope.vo.mbw_storeid_nameref;
			if($scope.storePager.page!=1){
				$scope.storePager.page = 1;
			}
			$scope.queryStoreList();	
		}

		$scope.clearParams = function(){
			$('#start_date').val($scope.startdate);
			$('#end_date').val($scope.enddate);
			$scope.searchParam.searchKey = $scope.searchKey="";
		}
		

				/**
		 * 查询
		 */
		$scope.roleList = [];
		$scope.queryRoleList = function(){
			var success = function(result){
				$scope.roleList = result.data;
							
				}
				var error = function(result){
					messageFactory.closeLoading();
					messageFactory.showMessage('error',result.desc);
				}
			var url = '/admin/base/baseDataControl/detailItem.action?codekey=2149';
			http.post(url,null,success,error);
		}						
	$scope.queryRoleList();
	
	$scope.baseWorkPager = {page:1,rows:'100',sort:'mbw_id',order:'desc',pageList:['10','20','30']};
	$scope.baseWorkSearchParam = {};
	/**
	 * 查询配送员列表
	 */
	$scope.queryWorkList = function(){
		var success = function(result){
			$scope.workUserList = result.data.rows;
			$scope.baseWorkPager.total = result.data.total;
			$scope.baseWorkPager.pageTotal = Math.ceil($scope.baseWorkPager.total/$scope.baseWorkPager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/member/memberBaseWorkControl/dataGrid.action';
		http.post(url,$.extend({"mbw_state":1,"mbw_dr":1,"mbw_shopid":$rootScope.USER.shopId},$scope.baseWorkPager,$scope.baseWorkSearchParam),success,error);
	}
	$scope.queryWorkList();

	$scope.chooseLeader = function(x) {
		$scope.vo.mbw_leader_workid = x.mbw_id;
		$scope.vo.mbw_leader_workid_nameref = x.mbw_name;
		$scope.vo.mbw_leader_userid = x.mbw_memberid;
	}

	/**
	 * 查询工厂列表
	 */
	$scope.baseFactoryPager = {page:1,rows:'100',sort:'bf_id',order:'desc',pageList:['10','20','30']};
	$scope.baseWorkSearchParam = {};
	$scope.queryFactoryList = function(){
		var success = function(result){
			$scope.factoryList = result.data.rows;
			$scope.baseFactoryPager.total = result.data.total;
			$scope.baseFactoryPager.pageTotal = Math.ceil($scope.baseFactoryPager.total/$scope.baseFactoryPager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/base/baseFactoryControl/dataGrid.action';
		http.post(url,$.extend({"mbw_state":1,"mbw_dr":1,"mbw_shopid":$rootScope.USER.shopId},$scope.baseFactoryPager),success,error);
	}
	$scope.queryFactoryList();
})