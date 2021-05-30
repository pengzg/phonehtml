tempApp.controller('ctr_deviceActive', function($scope,$rootScope,$state,http,messageFactory,EzConfirm,$timeout) {
    $scope.pager = {page:1,rows:'10',sort:'me_ts',order:'desc',pageList:['10','20','30']};
    $scope.pager1 = {page:1,rows:'10',sort:'ms_id',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
    $scope.searchParam1 = {};
    $scope.type_nameref = '设备类型';
    $scope.state_nameref = '激活状态';
    $scope.isOpen_nameref = '开启状态';
    $scope.shop_nameref = '门店名称';
    $scope.groud_nameref = '设置分组';
    $scope.vo = {};
    $scope.stopPro = function($event){
    	$event.stopPropagation();
    }
    
    
    //设备开启状态
    $scope.openList = [{'id':'','name':'全部状态'},{'id':'Y','name':'已开启'},{'id':'N','name':'未开启'}];

    /**
     * 查询设备分组
     */
    $scope.queryGroup = function(){
    	messageFactory.showLoading();
		var success = function(result){
			$scope.deviceGroupList = result.data;
			$scope.deviceGroupList.unshift({'meg_id':'','meg_name':"全部分组",'checked':true});
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/member/memberEquipmentGroupControl/getList.action';
		http.post(url,{'meg_type':2,'me_groupid0':''},success,error);
    }
    $scope.queryGroup();
    
    
    
    /**
     * 添加设备分组
     */
    $scope.group = {};
    $scope.insertGroup = function(){
    	if($scope.group.meg_name == undefined || $scope.group.meg_name == ''){
    		messageFactory.showMessage('error','分组名称不能为空');
    		return;
    	}
    	messageFactory.showLoading();
		var success = function(result){
			messageFactory.closeLoading();
			$scope.queryGroup();
			messageFactory.showMessage('success',result.desc);
			$scope.group.meg_name = '';
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		$scope.group.meg_type = "2";
		var url = '/admin/member/memberEquipmentGroupControl/update.action';
		http.post(url,$scope.group,success,error);
    }
    
    
	/**
	 * 查询设备列表
	 */
	$scope.queryList = function(){
		messageFactory.showLoading();
		
		var success = function(result){
			$scope.meList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/member/memberEquipmentControl/dataGrid.action';
		http.post(url,$.extend({'me_orgid':1,'me_isopen':'Y'},$scope.pager,$scope.searchParam),success,error);
	};
	$scope.queryList();
	
	
	/**
     * 根据分组查询设备列表
     */
    $scope.selectedGroup = function(id){
    	for(var x in $scope.deviceGroupList){
    		$scope.deviceGroupList[x].checked = false;
    	}
    	for(var x in $scope.deviceGroupList){
    		if(id == $scope.deviceGroupList[x].meg_id){
    			$scope.deviceGroupList[x].checked = true;
    		}
    	}
    	if($scope.pager.page != 1){
    		$scope.pager.page = 1;
    	}
    	messageFactory.showLoading();
		var success = function(result){
			$scope.meList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/member/memberEquipmentControl/dataGrid.action';
		http.post(url,$.extend({'me_groupid0':id,'me_orgid':1,'me_isopen':"Y"},$scope.pager,$scope.searchParam),success,error);
    }
    
	/**
	 * 查询设备详情
	 */
	$scope.queryDeviceDetail = function(id){
		messageFactory.showLoading();
		var success = function(result){
			$scope.deviceDetail = result.data;
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/member/memberEquipmentControl/getDetail.action';
		http.post(url,{me_id:id},success,error);
	};
	
	/**
	 * 查询
	 */
	$scope.searchFun = function(){
		if($scope.pager.page!=1){
			$scope.pager.page = 1;
		}else{
			$scope.queryList();
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
	 * 选择设置类型
	 */
	 $scope.chooseDevicetype = function(x){
		 $scope.searchParam.me_type = x.bd_code;
		 $scope.type_nameref = x.bd_name
		 $scope.searchFun();
	 }
	 
	 /**
	  * 选择激活状态
	  */
	 $scope.chooseState = function(x){
		 $scope.searchParam.me_state = x.bd_code;
		 $scope.state_nameref = x.bd_name;
		 $scope.searchFun();
	 }
	 
	 /**
	  * 选择开启状态
	  */
	 $scope.chooseOpenStatus = function(x){
		 $scope.searchParam.me_isopen = x.id;
		 $scope.isOpen_nameref = x.name;
	 }
	 
    
	//获取设备类型
	$scope.getDeviceTypeList=function(){
		var success = function(result){
			$scope.deviceTypeList = result.data;
			$scope.deviceTypeList.unshift({'bd_code':'','bd_name':"设备类型"});
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2128';
		http.post(url,null,success,error);
	}
	$scope.getDeviceTypeList();
	
	//获取激活状态
	$scope.getStateList=function(){
		var success = function(result){
			$scope.stateList = result.data;
			$scope.stateList.unshift({'bd_code':'','bd_name':"激活状态"});
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=2129';
		http.post(url,null,success,error);
	}
	$scope.getStateList();
	
	/**
	 * 获取关联了设备的门店列表
	 */
	$scope.getShopList=function(){
		$scope.msShopList = [];
		var success = function(result){
			for(var x in result.data.rows){
				var id = result.data.rows[x].ms_id;
				var name = result.data.rows[x].ms_name;
				var str = {'ms_id':id,'ms_name':name};
				$scope.msShopList.push(str);
			}
			$scope.pager1.total=result.data.total;
			$scope.pager1.pageTotal = Math.ceil($scope.pager1.total/$scope.pager1.rows);
			$scope.msShopList.unshift({'ms_id':'','ms_name':"全部门店"});
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/member/memberShopControl/dataGrid.action';
		http.post(url,$.extend({'extEqp':'Y'},$scope.pager1,$scope.searchParam1),success,error);
	}
	
	/**
	 * 选择店铺
	 */
	$scope.chooseShop = function(x){
		$scope.shop_nameref = x.ms_name;
		$scope.searchParam.me_shopid = x.ms_id;
		$scope.searchFun();
	}
	
	/**
	 * 得到店铺列表
	 */
	$scope.shopPager = {page:1,rows:'10',sort:'ms_id',order:'desc',pageList:['10','20','30']};
	$scope.getMerberShopList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.shopList = result.data.rows;
			$scope.shopPager.total=result.data.total;
			$scope.shopPager.pageTotal = Math.ceil($scope.shopPager.total/$scope.shopPager.rows);
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/member/memberShopControl/dataGrid.action';
		http.post(url,$.extend({'ms_state':1},$scope.shopPager),success,error);
	}
	$scope.getMerberShopList();
	
	/**
	 * 关联
	 */
	$scope.doRel = function(x,ms_id){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.vo = {};
			$scope.queryList();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		$scope.vo.me_id = x.me_id;
		$scope.vo.me_shopid = ms_id
		var url = '/admin/member/memberEquipmentControl/doRelationShop.action';
		http.post(url,$scope.vo,success,error);
	}
	
	
	/**
	 * 删除设备分组
	 */
	$scope.delDeviceGroup = function(x){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.queryGroup();
			$scope.queryList();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var data = {'meg_id':x.meg_id};
		var url = '/admin/member/memberEquipmentGroupControl/delete.action';
		EzConfirm.create({
			heading : '提示',
			text : '删除分组后,原有设备的分组会被清空，确定要操作吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {

		});

	}
	
	/**
	 * 修改激活状态
	 */
	$scope.changeStatus = function(id,text){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.queryList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'me_id':id}
		var url = "/admin/member/memberEquipmentControl/changeStatus.action";
		var	msg = '您确定'+text+'该设备吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
	}
	
	
	 /**
	  * 选中全部设备
	  */
	 $scope.selectedAllEqp = function(){
			if($("#selectedAll").is(':checked')){
				$(".checkbox").prop("checked",true);
			}else{
				$(".checkbox").prop("checked",false);
			}
	}
	 
	/**
	 * 已选设备
	 */
	 $scope.selectedEqp = function(){
			$scope.selectedList = [];
			$("input[name='eqp']:checked").not(":disabled").each(function(){
				var me_id = $(this).attr("me_id");
				var str = {'me_id':me_id};
				$scope.selectedList.push(str);
			});
	}
	
	/**
	 * 选择设置分组
	 */
	$scope.setUpGroup = function(meg_id){
		$scope.selectedEqp();
		if(meg_id == ""){
			messageFactory.showMessage('error',"不能选择全部分组！");
			return;
		}
		if($scope.selectedList.length < 1){
			messageFactory.showMessage('error',"请选择分组下的设备！");
		}else{
			var success = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('success',result.desc);
				$scope.queryList();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			}
			var arrId = [];
			for(var x in $scope.selectedList){
				arrId.push($scope.selectedList[x].me_id);
			}
			var arrIdStr = arrId.join(",");
			var data ={'meg_id':meg_id,'arrIdStr':arrIdStr,'type':2};
			var url = "/admin/member/memberEquipmentControl/updateEqpBatch.action";
			if($scope.selectedList.length == 1){
				var	msg = '您确定添加这个设备吗？';
			}else{
				var	msg = '您确定添加这些设备吗？';
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
		if(pager.page >= pager.pageTotal){
			return;
		}
		pager.page ++;
		fun();
	}
	
})