tempApp.controller('ctr_sysBlackList', function($scope,$rootScope,EzConfirm,messageFactory,http,$state,$stateParams,$rootScope) {
    $scope.pager = {page:1,rows:'20',sort:'sbl_id',order:'desc',pageList:['10','20','30'],mbw_shopid:$rootScope.USER.shopId};
    $scope.searchParam = {"sbl_status":""};
	$scope.enddate = '2028-12-30';

	$scope.statusList = [{"id":"","name":"全部"},{"id":1,"name":"启用"},{"id":0,"name":"禁用"}];	
    var enddate = '2028-12-30';
	$scope.vo = {"sbl_status":1};
	$('#expired').val('2028-12-30');
   
	$scope.vm = {
            rules : {
            	
            }
         };
	/**
	 * 查询列表
	 */
	var queryList = function(){
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
		var url = '/admin/member/sysBlackListControl/dataGrid.action';
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
		for(var x in $scope.searchParam){
			newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		}
		return newValue;
	},queryList);
	
	/**
	 * 显示弹框
	 */
	$scope.showDialog = function(){
		$('#expired').val('2028-12-30');
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
			$scope.vo.isShow =true;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
				
		}
		var url = '/admin/member/sysBlackListControl/getDetail.action';
		http.post(url,{'sbl_id':id},success,error);
	 }
	
	/**
	 * 删除用户
	 */
	 $scope.deleteUser = function(id){
		var success = function(result){
			queryList();
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

		 if($scope.pager.page != 1){
			 $scope.pager.page = 1; 
		 }else{
			 queryList();
		 }
	 }
	 
	   /**
		 * 修改用户状态
		 */
		$scope.changeStatus = function(x,status){
			var success = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('success',result.desc);
				queryList();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			}
			
			var data ={'sbl_id':x.sbl_id,"sbl_status":status}
			var url = "/admin/member/sysBlackListControl/updateStatus.action";
			var	msg = '您确定操作该用户吗？';
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
				$scope.dialogTitle = "新增黑名单";
				$scope.vo.isShow = true;
			}else{
				$scope.vo.isShow = false;
				$scope.dialogTitle = "编辑黑名单";
				$scope.toDetail(id);
			}
			$scope.showDialog();
		}
	
		/**
		 * 保存
		 */
		$scope.savaEdit = function(id){
			// console.log(111);
			if (!$scope.vo.sbl_userid) {
				messageFactory.showMessage('error',"对不起,此手机号不是公司的客户");
				return false;
			}

			$scope.vo.sbl_expired = $("#expired").val();
			var success = function(result){
				$scope.closeDialog();
				queryList();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
				
			}
			var url = '/admin/member/sysBlackListControl/update.action';
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
		 * 根据手机号查询会员信息
		 */
		$scope.checkMobile = function(mobile){
			$scope.vo.sbl_userid = "";
			if(mobile.length == 11){
				var success = function(result){
					$scope.vo.sbl_userid = result.data.mbw_memberid;
					$scope.vo.sbl_userid_nameref = result.data.mbw_name;
					messageFactory.closeLoading();
					if (!$scope.vo.sbl_userid) {
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
		


		$scope.vmm ={}
		
		$scope.pager1 = {page:1,rows:'10',sort:'ms_id',order:'desc',pageList:['10','20','30']};
		$scope.searchParam1 = {};
		


		
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
		

})