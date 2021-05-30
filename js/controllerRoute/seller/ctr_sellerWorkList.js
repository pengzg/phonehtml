tempApp.controller('ctr_sellerWorkList', function($scope,$rootScope,EzConfirm,messageFactory,http,$state,$stateParams) {
    $scope.pager = {page:1,rows:'20',sort:'mbw_ts',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
    $scope.ms_name = $stateParams.ms_name;
    var format = 'yyyy-MM-dd';
	$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
	$scope.startdate = $scope.dateNow[0];
	$scope.enddate = '2028-12-30';
	
	$scope.searchParam.startDate = $scope.dateNow[0];
	$scope.searchParam.endDate = '2028-12-30';
	
	var startdate = $scope.dateNow[0];
    var enddate = '2028-12-30';
	$scope.vo = {};
	$scope.merchantShopList = {'ms_id':'','ms_name':''};
	$('#start_time').val($scope.startdate+'至'+$scope.enddate)
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
		startdate = start.format('YYYY-MM-DD');
		enddate = end.format('YYYY-MM-DD');
    });
   
	/**
	 * 查询列表
	 */
	var queryWorkUserList = function(){
		messageFactory.showLoading();
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
		http.post(url,$.extend({'mbw_shopid':$stateParams.ms_id},$scope.pager,$scope.searchParam),success,error);
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
		for(var x in $scope.searchParam){
			newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		}
		return newValue;
	},queryWorkUserList);
	
	/**
	 * 显示弹框
	 */
	$scope.showDialog = function(){
		$scope.vo.mbw_state = 1;
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
		 $scope.searchParam.searchKey = $scope.searchKey;
		 if($scope.pager.page != 1){
			 $scope.pager.page = 1; 
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
			console.log(111);
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
			$scope.vo.mbw_shopid = $stateParams.ms_id;
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
			http.post(url,$.extend({},$scope.pager1,$scope.searchParam1),success,error);
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
		
		/**
		 * 返回
		 */
		$scope.backList = function(){
		   $state.go("index.seller.sellerManage");
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
	
	
	/**
	 * 查询配送员列表
	 */
	$scope.baseWorkPager = {page:1,rows:'100',sort:'mbw_id',order:'desc',pageList:['10','20','30']};
	$scope.baseWorkSearchParam = {};
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
		var url = '/admin/member/memberBaseWorkControl/dataGrid.action';
		http.post(url,$.extend({"mbw_state":1,"mbw_dr":1,"mbw_shopid":$rootScope.USER.shopId},$scope.baseFactoryPager),success,error);
	}
	$scope.queryFactoryList();

})