tempApp.controller('ctr_sellerManage', function($scope,EzConfirm,messageFactory,http,$state) {
    $scope.pager = {page:1,rows:'20',sort:'ms_addtime',order:'desc',pageList:['10','20','30']};
    $scope.pager1 = {page:1,rows:'10',sort:'cc_addtime',order:'desc',pageList:['10','20','30']};
    $scope.pager2 = {page:1,rows:'10',sort:'',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
    $scope.searchParam1 = {};
    $scope.searchParam2 = {};
    $scope.selectedList = [];
    $scope.vo = {};
    var format = 'yyyy-MM-dd';
    $scope.dateNow = dateRangeUtil.getCurrentMonth(format);
	// $scope.startdate = $'scope.dateNow[0]';
	// $scope.enddate = $scope.dateNow[1];
	// $scope.searchParam.startDate = $scope.dateNow[0];
	// $scope.searchParam.endDate = $scope.dateNow[1];
	// $('#start_date').val($scope.startdate);
	// $('#end_date').val($scope.enddate);
	$scope.offSell = function(){
		EzConfirm.create({
			heading : '提示',
			text : '确认下架吗？'
		}).then(function() {
			//console.log('删除')
		}, function() {
			//console.log('取消？')
		});
	}
	
	/**
	 * 查询本月门店数和累计门店数
	 */
	var queryShopNum = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.statsVO = result.data;
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var format = 'yyyy-MM-dd';
		$scope.dateNow = dateRangeUtil.getCurrentMonth(format);
		$scope.vo.startDate = $scope.dateNow[0];
		$scope.vo.endDate = $scope.dateNow[1];
		var url = '/admin/member/memberShopControl/queryShopStats.action';
		http.post(url,$scope.vo,success,error);
	}
	queryShopNum();
    
	/**
	 * 查询列表
	 */
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
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	};
    
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
	
	$scope.removeAllData = function(obj){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		EzConfirm.create({
			heading : '警告',
			text : '确认清空['+obj.ms_name+']下所有数据吗？'
		}).then(function() {
			messageFactory.showLoading();
			var url = '/admin/member/memberShopControl/removeShopData.action';
			http.post(url,{"ms_id":obj.ms_id},success,error);
		}, function() {
			
		});
	}
    
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue;
	},$scope.queryList);
	
	/**
	 * 跳转到详情
	 */
	$scope.goDetail = function(ms_id) {
		$state.go("index.seller.sellerManageAdd",{ms_id:ms_id});
	}
	
	/**
	 * delete
	 */
	 $scope.deleteSeller = function(x){
		 
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.queryList();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/member/memberShopControl/delete.action';
		 
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			http.post(url,{"ms_id":x.ms_id},success,error);
		}, function() {
			//console.log('取消？')
		});
	}
	
	 /**
	  * 添加店铺
	  */
	 $scope.addSeller= function(){
		 $state.go("index.seller.sellerManageAdd");
	 }
	 
	 /**
	  * 添加已有店铺
	  */
	 $scope.addExistSeller = function(){
		 messageFactory.showLoading();
		 $scope.showDialog();
		 /**
			 * 监听
			 */
		$scope.$watch(function(){
			var newValue = $scope.pager1.page+' '+$scope.pager1.rows+' '+$scope.pager1.sort+' '+$scope.pager1.order+' ';
			return newValue;
		},$scope.queryExistSeller);
	 }
	 
	 /**
	  * 显示添加已有店铺弹框
	  */
	 $scope.showDialog = function(){
		 $scope.addPop = true;
		 $scope.isChecked = false;
		 $(".checkbox").prop("checked",false);
	 }
	 /**
	  * 关闭添加已有店铺弹框
	  */
	 $scope.closeDialog = function(){
		 $scope.addShop = false;
		 $scope.addPop = false;
	 } 
	 
	 /**
	  * 查询已有店铺列表
	  */
	 $scope.queryExistSeller = function(){
		 $scope.existSellerList = [];
		 var success = function(result){
			 $scope.existSellerList = result.data.rows;
			 $scope.pager1.total=result.data.total;
			 $scope.pager1.pageTotal = Math.ceil($scope.pager1.total/$scope.pager1.rows);
			 messageFactory.closeLoading();
		 }
		 var error = function(result){
			 messageFactory.closeLoading();
			 messageFactory.showMessage('error',result.desc);
		 }
		 var url = "/admin/customer/csCustomerControl/dataGrid.action";
		 http.post(url,$.extend({'isfromyx':1},$scope.pager1,$scope.searchParam1),success,error);
	 }
	 
	 /**
	  * 弹框内搜索
	  */
	 $scope.doSearch = function(){
		 $scope.searchParam1.searchKey = $scope.searchKey;
		 if($scope.pager1.page != 1){
			 $scope.pager1.page = 1; 
		 }
		 $scope.queryExistSeller();
	 }
	 
	 /**
	  * 选中全部店铺
	  */
	 $scope.selectedAllSeller = function(){
			if($("#selectedAll").is(':checked')){
				$(".checkbox").prop("checked",true);
			}else{
				$(".checkbox").prop("checked",false);
			}
			$scope.selectedSeller();
	}
	 
	/**
	 * 已选店铺
	 */
	 $scope.selectedSeller = function(){
			$scope.selectedList = [];
			$("input[name='seller']:checked").not(":disabled").each(function(){
				var cs_customer = $(this).attr("cs_customer");
				//从字符串中解析出json
				$scope.selectedList.push(JSON.parse(cs_customer));
			});
	}
	/**
	 * 保存选中添加的店铺
	 */
	 $scope.addExistShop = function(){
		 	$scope.selectedSeller();
			if($scope.selectedList == null || $scope.selectedList == ""){
				messageFactory.showMessage('error',"请选择要添加的店铺！");
			}else{
				var success = function(result){
					messageFactory.closeLoading();
					messageFactory.showMessage('success',result.desc);
					 $scope.closeDialog();
					 $scope.queryList();
				}
				var error = function(result){
					messageFactory.closeLoading();
					messageFactory.showMessage('error',result.desc);
				}
				//从对象中解析出字符串
				var csListStr = JSON.stringify($scope.selectedList);
				var data ={'csListStr':csListStr};
				var url = "/admin/member/memberShopControl/insertShop.action";
				if($scope.selectedList.length == 1){
					var	msg = '您确定添加这个店铺吗？';
				}else{
					var	msg = '您确定添加这些店铺吗？';
				}
				EzConfirm.create({
					heading : '提示',
					text : msg
				}).then(function() {			
					http.post(url, data, success, error);
				}, function() {
				});
			}
	}
	 
	 
	 /**
	  * 显示设备弹框
	  */
	 $scope.showEqpDialog = function(){
		 $scope.eqpPop = true;
	 }
	 
	 /**
	  * 关闭设备弹框
	  */
	 $scope.closeEqpDialog = function(){
		 $scope.eqpPop = false;
	 }
	 
	 
	 /**
	  * 关联和取消关联设备
	  */
	 $scope.associatedEqp = function(type,id){
		 $scope.type = type;
		 $scope.ms_id = id;
		 if(type == 1){
			 $scope.dialogTitle = "关联设备";
			 $scope.btnTitle = "关联";
		 }else{
			 $scope.dialogTitle = "	取消关联设备"; 
			 $scope.btnTitle = "取消关联";
		 }
		 $scope.showEqpDialog();
		 $scope.queryEqpList(type);
	 }
	 
	 /**
	  * 查询设备列表 
	  * type=1 查未被关联的设备  
	  */
	 $scope.queryEqpList = function(type){
		 $scope.eqpList = [];
		 messageFactory.showLoading();
			var success = function(result){
				$scope.eqpList = result.data.rows;
				$scope.pager2.total=result.data.total;
				$scope.pager2.pageTotal = Math.ceil($scope.pager2.total/$scope.pager2.rows);
				messageFactory.closeLoading();
			};
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
				
			};
			var url = '/admin/member/memberEquipmentControl/dataGrid.action';
			if(type == 1){
				http.post(url,$.extend({'isBind':type,'me_isopen':"Y"},$scope.pager2,$scope.searchParam2),success,error);
			}else{
				http.post(url,$.extend({'me_shopid':$scope.ms_id,'me_isopen':"Y"},$scope.pager2,$scope.searchParam2),success,error);
			}
	 }
	 
	 /**
	  * 搜索设备
	  */
	 $scope.doSearchEqp = function(){
		 $scope.searchParam2.searchKey = $scope.searchKeyEqp;
		 if($scope.pager2.page != 1){
			 $scope.pager2.page = 1;
		 }
		 $scope.queryEqpList($scope.type);
	 }
	 
	 /**
	  * 选中全部设备
	  */
	 $scope.selectedAllEqp = function(){
			if($("#selectedAllEqp").is(':checked')){
				$(".checkbox").prop("checked",true);
			}else{
				$(".checkbox").prop("checked",false);
			}
			$scope.selectedEqp();
	}
	 
	/**
	 * 已选设备
	 */
	 $scope.selectedEqp = function(){
			$scope.arrEqp=[];
			$("input[name='eqp']:checked").not(":disabled").each(function(){
				var me_id  = $(this).attr("me_id");
				var str = {'me_id':me_id};
				$scope.arrEqp.push(str);
			});
	}
	
	/**
	 * 保存已选的设备
	 */
	 $scope.saveSelectedEqp = function(){
		 $scope.selectedEqp();
			if($scope.arrEqp == null || $scope.arrEqp == ""){
				if($scope.type == 1){
					messageFactory.showMessage('error',"请选择要关联的设备！");
				}else{
					messageFactory.showMessage('error',"请选择要取消关联的设备！");
				}
			}else{
				var success = function(result){
					messageFactory.closeLoading();
					if($scope.type == 1){
						var msg = "关联成功！";
						var msg1 = "关联失败！"
					}else{
						var msg = "取消关联成功！";
						var msg1 = "取消关联失败！"
					}
					messageFactory.showMessage('success',msg);
					 $scope.closeEqpDialog();
				}
				var error = function(result){
					messageFactory.closeLoading();
					messageFactory.showMessage('error',msg1);
				}
				var ids = [];
				for(var x in $scope.arrEqp){
					ids.push($scope.arrEqp[x].me_id);
				}
				var idStr = ids.join(",");
				if($scope.type ==2){
					$scope.ms_id = '';
				}
				var data ={'me_id_arr':idStr,'shopId':$scope.ms_id};
				var url = "/admin/member/memberEquipmentControl/updateShopBatch.action";
				if($scope.arrEqp.length == 1){
					if($scope.type == 1)
						var	msg = '您确定关联这个设备吗？';
					else
						var	msg = '您确定取消关联这个设备吗？';
				}else{
					if($scope.type == 1)
						var	msg = '您确定关联这些设备吗？';
					else
						var	msg = '您确定取消关联这些设备吗？';
				}
				EzConfirm.create({
					heading : '提示',
					text : msg
				}).then(function() {			
					http.post(url, data, success, error);
				}, function() {
				});
			}
	 }
	 /**
	  * 更新门店信息
	  */
	 $scope.refreshShopInfor = function(id){
		 messageFactory.showLoading();
		 var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',"更新成功！");
			window.location.reload();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/member/memberShopControl/updateShopInfor.action';
		http.post(url,{'ms_id':id},success,error);
	}
	 
	 
	 /**
	  * 搜索
	  */
	 $scope.search = function(){
		 $scope.searchParam.startDate = $('#start_date').val();
		 $scope.searchParam.endDate = $('#end_date').val();
		 $scope.searchParam.searchKey = $scope.searchKey;
		 if($scope.pager.page != 1){
			 $scope.pager.page = 1; 
		 }
		 $scope.queryList(); 
	 } 
	 
	$scope.user= {mb_isuse_fx:'N'}
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
	
	$scope.addBox = function(obj){
		$scope.addShop = true;
	}
	
	/**
	 * 关闭
	 */
	$scope.closeBox = function(id){
		$("#"+id).hide();
	}
	
	$scope.checkFun = function(id,state){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.searchFun();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var msg = "";
		if(state==1){
			msg='您确定审核通过么？';
		}else{
			msg='您确定审核不通过么？';
		}
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			var url = "/admin/member/memberShopControl/checkMemberShop.action"
			http.post(url,{ms_id:id,ms_check_state:state},success,error);
		}, function() {
		});
	}
	
	/**
	 * 显示工作人员弹框
	 */
	$scope.showWorkDialog = function(){
		$scope.workPop = true;
	}
	
	/**
	 * 关闭工作人员弹框
	 */
	$scope.closeWorkDialog = function(){
		$scope.workPop = false;
	}
	
	/**
	 * 显示商家下工作人员列表
	 */
	$scope.showWorkList = function(id,name){
		$scope.popName = name;
		$scope.dialogTitle = "工作人员列表";
		$scope.showWorkDialog();
		$scope.queryWorkList(id);
	}
	
	$scope.workpager = {page:1,rows:'10',sort:'mbw_ts',order:'desc',pageList:['10','20','30']};
	$scope.worksearchParam = {};
	
	/**
	 * 查询商家下工作人员
	 */
	$scope.queryWorkList = function(id){
		 messageFactory.showLoading();
		 var success = function(result){
			$scope.workList = result.data.rows;
			$scope.workpager.total=result.data.total;
			$scope.workpager.pageTotal = Math.ceil($scope.workpager.total/$scope.workpager.rows);
			messageFactory.closeLoading();
		}
		
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
				
		}
		var url = '/admin/member/memberBaseWorkControl/dataGrid.action';
		http.post(url,$.extend({'mbw_shopid':id},$scope.workpager,$scope.worksearchParam),success,error);
	 }
	
	/**
	 * 跳转到工作人员列表
	 */
	$scope.goWorkList = function(ms_id,ms_name) {
		$state.go("index.seller.workList",{ms_id:ms_id,ms_name:ms_name});
	}
	
	
	$scope.updateState = function(x, state){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.searchFun();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var msg = "";
		if(state==1){
			msg='您确定启用么？';
		}else{
			msg='您确定禁用么？';
		}
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			messageFactory.showLoading();
			var url = "/admin/member/memberShopControl/updateState.action"
			http.post(url,{ms_id:x.ms_id,state:state},success,error);
		}, function() {
			
		});
	}
	
	$scope.clearParams = function(){
		$('#start_date').val($scope.startdate);
		$('#end_date').val($scope.enddate);
		$scope.searchParam.searchKey = $scope.searchKey="";
	}




	//关联收款账户
	 /**
	  * 显示设备弹框
	  */
	 $scope.showAccountDialog = function(){
		$scope.accountPop = true;
	}
	
	/**
	 * 关闭弹框
	 */
	$scope.closeAccountDialog = function(){
		$scope.accountPop = false;
	}
	
	
	/**
	 * 关联和取消
	 */
	$scope.associatedAccount = function(id){
		$scope.ms_id = id;
		$scope.dialogTitle = "关联账号";
		$scope.btnTitle = "确定";
		$scope.showAccountDialog();
		$scope.queryAccountList();
	}
	
	/**
	 * 查询列表 
	 */
	$scope.queryAccountList = function(){
		$scope.accountList = [];
		messageFactory.showLoading();
		   var success = function(result){
			   $scope.accountList = result.data.rows;
			   $scope.pager2.total=result.data.total;
			   $scope.pager2.pageTotal = Math.ceil($scope.pager2.total/$scope.pager2.rows);
			   messageFactory.closeLoading();
		   };
		   var error = function(result){
			   messageFactory.closeLoading();
			   messageFactory.showMessage('error',result.desc);
			   
		   };
		   var url = '/admin/base/weixinPayaccountControl/dataGrid.action';
		   http.post(url,$.extend({'wp_state':"1"},$scope.pager2,$scope.searchParam2),success,error);
	}
	
	/**
	 * 搜索
	 */
	$scope.doSearchAccount = function(){
		$scope.searchParam2.searchKey = $scope.searchKeyAccount;
		if($scope.pager2.page != 1){
			$scope.pager2.page = 1;
		}
		$scope.queryAccountList();
	}
	

   
   /**
	* 保存已选
	*/
	$scope.saveSelectedAccount = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			var msg = "关联成功！";
			var msg1 = "关联失败！"
			messageFactory.showMessage('success',msg);
			$scope.searchFun();
			$scope.closeAccountDialog();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',msg1);
		}
		var ids = [];
		var idStr = ids.join(",");
		var data ={'wp_id':id,'shopId':$scope.ms_id};
		var url = "/admin/member/memberShopControl/updatePayAccount.action";
		var msg = '您确定关联这个账号吗？';  
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {
		});
	}

	
})