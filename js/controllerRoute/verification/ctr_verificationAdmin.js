tempApp.controller('ctr_verificationAdmin', function($scope,
		messageFactory,http,EzConfirm) {
	$scope.pager = {page:1,rows:'10',sort:'mmu_ts',order:'desc',pageList:['10','20','30']};
	$scope.searchParam = {};
	$scope.userpager = {page:1,rows:'5',sort:'mb_ts',order:'desc',pageList:['5']};
	$scope.usersearchParam = {};
	$scope.winningpager = {page:1,rows:'5',sort:'mw_receivetime',order:'desc',pageList:['5']};
	$scope.winningsearchParam = {};
	
	/**
	 * 查询列表
	 */
	$scope.queryList = function(){
		
		messageFactory.showLoading();
		var success = function(result){
			$scope.dataList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		$scope.searchParam.mm_state = 2;
		var url = '/admin/member/memberManagerUserControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	};
	// $scope.queryList();
    
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		
		if($scope.pager.page==1){
			$scope.queryList();
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
	},$scope.queryList);
	
	/**
	 * 删除
	 */
	$scope.deleteUser=function(x){
		var success = function(result){
			$scope.queryList();
			messageFactory.showMessage('success',"删除成功");
		};
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			
		};
		EzConfirm.create({
			heading : '提示',
			text : "您确定删除吗？"
		}).then(function() {
			var url = "/admin/member/memberManagerUserControl/delete.action";
			http.post(url,$.extend({'mmu_id':x.mmu_id},$scope.vo),success,error);
		}, function() {
			messageFactory.activityBtn();
		});
		
	}
	
	
	/**
	 * 展示用户的核销记录 
	 */
	$scope.queryUserCheckLogList = function(x){
		messageFactory.showLoading();
		var success = function(result){
			$scope.winningList = result.data.rows;
			$scope.winningpager.total=result.data.total;
			$scope.winningpager.pageTotal = Math.ceil($scope.winningpager.total
					/$scope.winningpager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/activity/marketingWinningControl/dataGrid.action';
		http.post(url,$.extend({'mw_grant_userid':$scope.mw_grant_userid,
			'mw_state':2},$scope.winningpager,$scope.winningsearchParam),
			success,error);
	}
    
	$scope.showUserCheckLog = function(x){
		$scope.mw_grant_userid = x.mmu_memberid;
		$('#myModal1').modal('show');
		/*if($scope.winningpager.page==1){
			$scope.queryUserCheckLogList();
		}else{
			$scope.winningpager.page = 1;
		}*/
		/**
		 * 监听
		 */
		$scope.$watch(function(){
			var newValue = $scope.winningpager.page+' '+$scope.winningpager.rows+
			' '+$scope.winningpager.sort+' '+$scope.winningpager.order+' ';
			return newValue;
		},$scope.queryUserCheckLogList);
	}
	
	  
	//展示添加的会员列表
	$scope.queryUserList = function(x){
		messageFactory.showLoading();
		var success = function(result){
			$scope.userList = result.data.rows;
			$scope.userpager.total=result.data.total;
			$scope.userpager.pageTotal = Math.ceil($scope.userpager.total
					/$scope.userpager.rows);
//			$('#myModal2').modal('show');
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/member/memberBaseControl/dataGrid.action';
		http.post(url,$.extend({'isRelation':1},$scope.userpager,
				$scope.usersearchParam),success,error);
	}
	
    
	$scope.searchUserList = function(x){
		if($scope.userpager.page==1){
			$scope.queryUserList();
		}else{
			$scope.userpager.page = 1;
		}
	}
	/**
	 * 全选 取消全选 
	 */
	$scope.toggleAllGloobal=function(allChecked2,userList){
		for(var i in userList){
			userList[i].checked = allChecked2;
		}
	}
	
	/**
	 * 将用户设置为 核销员 
	 */
	$scope.setUserChecked=function(){
		var datalist = [];
		for(var i in $scope.userList){
			if($scope.userList[i].checked){
				datalist.push($scope.userList[i]);
			}
		}
		if(datalist.length<=0){
			messageFactory.showMessage('error',"请先选择要设置的用户");
			return;
		}
		
		var datalistStr = JSON.stringify(datalist);;
		
		var success = function(result){
			messageFactory.showMessage('success',"设置成功");
			$('#myModal2').modal('hide');
			$scope.searchFun();
		};
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			
		};
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/member/memberManagerUserControl/updateUserCheck.action";
			http.post(url,{'datalistStr':datalistStr},success,error);
		}, function() {
			messageFactory.activityBtn();
		});
	}
	
	/**
	 * 显示添加用户弹框 
	 */
	$scope.add=function(){
		$('#myModal2').modal('show');
		/**
		 * 监听
		 */
		$scope.$watch(function(){
			var newValue = $scope.userpager.page+' '+$scope.userpager.rows+
			' '+$scope.userpager.sort+' '+$scope.userpager.order+' ';
			return newValue;
		},$scope.queryUserList);
		//$scope.searchUserList();
	};
	
	/**
	 * 显示关联的页面 
	 */
	$scope.showConcatData=function(type,x){
		$scope.mmu_id=x.mmu_id;
		if(type==3){
			$('#myModal3').modal('show');
			/**
			 * 监听
			 */
			$scope.$watch(function(){
				var newValue = $scope.sysUserpager.page+' '+$scope.sysUserpager.rows+
				' '+$scope.sysUserpager.sort+' '+$scope.sysUserpager.order+' ';
				return newValue;
			},$scope.querySysUserList);
			//$scope.searchSysUserList();
		}else{
			$('#myModal4').modal('show');
			/**
			 * 监听
			 */
			$scope.$watch(function(){
				var newValue = $scope.customerpager.page+' '+$scope.customerpager.rows+
				' '+$scope.customerpager.sort+' '+$scope.customerpager.order+' ';
				return newValue;
			},$scope.queryCustomerList);
			//$scope.searchCustomerList();
		}
		
	};
	
	
	$scope.sysUserpager = {page:1,rows:'10',sort:'',order:'',pageList:['10','20','30']};
	$scope.sysUsersearchParam = {};
	//展示用户列表
	$scope.querySysUserList = function(x){
		messageFactory.showLoading();
		var success = function(result){
			$scope.sysUserList = result.data.rows;
			$scope.sysUserpager.total=result.data.total;
			$scope.sysUserpager.pageTotal = Math.ceil($scope.sysUserpager.total
					/$scope.sysUserpager.rows);
//			$('#myModal2').modal('show');
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/member/sysUserControl/dataGrid.action';
		http.post(url,$.extend({},$scope.sysUserpager,
				$scope.sysUsersearchParam),success,error);
	}
	
	$scope.searchSysUserList = function(x){
		if($scope.sysUserpager.page==1){
			$scope.querySysUserList();
		}else{
			$scope.sysUserpager.page = 1;
		}
	}
	
	$scope.checkedSysUser={};
	$scope.checkedCustomer={};
	/**
	 * 设置联系
	 */
	$scope.setSysUserConcat=function(type){
		var id = '';
		if(type == 3){
			/*if($scope.sysUserList){
				for(var i in $scope.sysUserList){
					if($scope.sysUserList[i].checked){
						id = $scope.sysUserList[i].su_id;
					}
				}
			}*/
			id = $scope.checkedSysUser.su_id;
		}else{
			id = $scope.checkedCustomer.cc_id;
		}
		if(!id){
			messageFactory.showMessage('error',"请选择要设置的用户");
			return;
		}
		var success = function(result){
			messageFactory.showMessage('success',"设置成功");
			$('#myModal3').modal('hide');
			$('#myModal4').modal('hide');
			$scope.searchFun();
		};
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			
		};
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/member/memberManagerUserControl/updateUserRelation.action";
			http.post(url,{'mmu_usertype':type,
				'mmu_id':$scope.mmu_id,
				'mmu_userid':id},success,error);
		}, function() {
			messageFactory.activityBtn();
		});
	};
	
	
	$scope.customerpager = {page:1,rows:'10',sort:'',order:'',pageList:['10','20','30']};
	$scope.customersearchParam = {};
	
	//展示添加的会员列表
	$scope.queryCustomerList = function(x){
		messageFactory.showLoading();
		var success = function(result){
			$scope.customerList = result.data.rows;
			$scope.customerpager.total=result.data.total;
			$scope.customerpager.pageTotal = Math.ceil($scope.customerpager.total
					/$scope.customerpager.rows);
//			$('#myModal2').modal('show');
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/customer/csCustomerControl/dataGrid.action';
		http.post(url,$.extend({},$scope.customerpager,
				$scope.customersearchParam),success,error);
	}
	
    
	$scope.searchCustomerList = function(x){
		if($scope.customerpager.page==1){
			$scope.queryCustomerList();
		}else{
			$scope.customerpager.page = 1;
		}
	}
	/**
	 * 显示 
	 */
	$scope.showMMSecret=function(x){
		$('#myModal5').modal('show');
		$scope.checkedPwdUserId = x.mmu_id;
		$scope.showPwd = 2;
	}
	
	/**
	 * 显示 
	 */
	$scope.showPwdDioalg=function(x){
		$('#myModal6').modal('show');
		$scope.showPwd = 1;
		$scope.mmu_pwd = x.mmu_pwd;
	}
	/**
	 * 设置核销密码 
	 */
	$scope.setUserPwd = function(){
		if(!$scope.mmu_pwd){
			messageFactory.showMessage('error',"请输入密码");
			return;
		}
		
		var success = function(result){
			messageFactory.showMessage('success',"设置成功");
			$scope.mmu_pwd = "";
			$('#myModal5').modal('hide');
		};
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			
		};
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/member/memberManagerUserControl/updateUserPwd.action";
			http.post(url,{
				'mmu_id':$scope.checkedPwdUserId,
				'mmu_pwd':$scope.mmu_pwd},success,error);
		}, function() {
			messageFactory.activityBtn();
		});
		
	}
	
	$scope.getUserInfo = function(){
		var success = function(result){
			$scope.user = result.data;
		}
		var error = function(result){
			
		}
		var url = "/admin/member/memberBaseControl/getUserInfo.action"
		http.post(url,{},success,error);
	}
	$scope.getUserInfo();
	
	
})