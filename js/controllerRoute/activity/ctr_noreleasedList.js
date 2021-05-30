tempApp.controller('ctr_noreleasedList', function($scope,EzConfirm,messageFactory,http,$state
		,$stateParams) {
    $scope.pager = {page:1,rows:'10',sort:'mm_addtime',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
    $scope.deviceGroupList = {};
    $scope.mm_state = $stateParams.mm_state;
    $scope.activeTab = 0;
    $scope.relationBox = false;
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
	 * 查询列表
	 */
	$scope.queryList = function(){
		
		messageFactory.showLoading();
		var success = function(result){
			$scope.mmList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		if($stateParams.mm_state){
			$scope.searchParam.mm_state = $stateParams.mm_state;
		}
		var url = '/admin/activity/marketingMainControl/dataGrid.action';
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
	 * 跳转到活动中奖纪录列表 
	 */
	$scope.toActivityRecod = function(x){
		$state.go("index.activity.activityRecordList",{'mm_id':x.mm_id});
	}
	
	
	
	/**
	 * delete
	 */
	 $scope.deleteActivity = function(x){
		 
		var success = function(result){
			$scope.queryList();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/activity/marketingMainControl/delete.action';
		 
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			http.post(url,{"mm_id":x.mm_id},success,error);
		}, function() {
			//console.log('取消？')
		});
	}

	 
	    /**
	     * 发布活动
	     */
	    $scope.updateState = function(x,state){
	    	var success = function(result){
	    		messageFactory.showMessage('success',result.desc);
	    		$scope.queryList();
			};
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			};
			var msg = "确定是否发布活动？";
			if(state == 4){
				msg = "确定要结束活动？";
			}
			if(state == 1){
				msg = "确定要取消发布活动？";
			}
			var data ={"mm_id":x.mm_id,"mm_state":state}
			var url = '/admin/activity/marketingMainControl/updateState.action';
			EzConfirm.create({
				heading : '提示',
				text : msg 
			}).then(function() {
				messageFactory.showLoading();
				http.post(url,data,success,error);
			}, function() {

			});
	    }
	    /**
	     * 编辑活动 
	     */
	    $scope.goEdit = function(x){
	    	$state.go("index.addActivityDetail_squared",{'mm_id':x.mm_id,'mm_state':x.mm_state});
	    }
	    /**
	     * 查询活动
	     */
	    $scope.showDetail = function(x){
	    	$state.go("index.addActivityDetail_squared",{'mm_id':x.mm_id,'detail':1});
	    }
	    
	     /**
     * 查询设备分组
     */
	$scope.groupPager = {page:1,rows:'10',sort:'meg_id',order:'desc',pageList:['10','20','30']};
    $scope.queryGroup = function(){
    	messageFactory.showLoading();
		var success = function(result){
			$scope.deviceGroupList = result.data.rows;
			$scope.groupPager.total=result.data.total;
			$scope.groupPager.pageTotal = Math.ceil($scope.groupPager.total/$scope.groupPager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/member/memberEquipmentGroupControl/dataGrid.action';
		http.post(url,$.extend({"meg_type":2},$scope.groupPager),success,error);
    }
  //   $scope.queryGroup(); 
    
    /**
     * 查询设备
     */
    $scope.devicePager = {page:1,rows:'10',sort:'me_num',order:'desc',pageList:['10','20','30']};
    $scope.queryDevice = function(){
    	messageFactory.showLoading();
		var success = function(result){
			$scope.deviceList = result.data.rows;
			$scope.devicePager.total=result.data.total;
			$scope.devicePager.pageTotal = Math.ceil($scope.devicePager.total/$scope.devicePager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/member/memberEquipmentControl/dataGrid.action';
		http.post(url,$scope.devicePager,success,error);
    }
  //   $scope.queryDevice();  
   
	
	/**
	 * 单选资源
	 */
	$scope.selectedArr = [];
	$scope.selectVal = function(x,$event) {
		var thisObj = $($event.target);
		if (thisObj.is(':checked')) {
			switch ($scope.activeTab){
				case 1:
					
					var data = {"id":x.me_id,"name":x.me_num};
					$scope.selectedArr.push(data);
					break;
				case 2:
					var data = {"id":x.meg_id,"name":x.meg_name};
					$scope.selectedArr.push(data);
					break;
				case 3:
					
					break;
				
				default:
					break;
			}
		} else {
			switch ($scope.activeTab){
			case 1:
				for(var y in $scope.selectedArr){
					if($scope.selectedArr[y].id == x.me_id){
						$scope.selectedArr.splice(y,1);
						break;
					}
				}
				
				break;
			case 2:
				for(var y in $scope.selectedArr){
					if($scope.selectedArr[y].id == x.meg_id){
						$scope.selectedArr.splice(y,1);
						break;
					}
				}
				break;
			case 3:
				
				break;
			
			default:
				break;
			}
		}
	}
	
	/**
	 * 关联
	 */
	$scope.doRelation = function($event){
		var thisObj = $($event.target);
		if (thisObj.attr("is-post") == 1) {
			return false;
		}
		thisObj.attr("is-post",1);
		if ($scope.activeTab ==3) {
			var zTree = $.fn.zTree.getZTreeObj("treemode");
			$scope.selectedArr = zTree.getCheckedNodes(true);
		}
		
		var valIds = [];
		for (var x in $scope.selectedArr) {
			valIds.push($scope.selectedArr[x].id);
		}
		
		var valStr = valIds.join(",");
		
		var success = function(result){
			thisObj.attr("is-post",0);
    		messageFactory.showMessage('success',result.desc);
    		$scope.queryList();
    		$('#myModal').modal('hide');
		};
		var error = function(result){
			thisObj.attr("is-post",0);
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var data ={"mm_id":$scope.mm_id,"type":$scope.activeTab,"valStr":valStr};
		var url = '/admin/activity/marketingMainControl/doSourceRelation.action';
		EzConfirm.create({
			heading : '提示',
			text : '确定是否关联？'
		}).then(function() {
			messageFactory.showLoading();
			http.post(url,data,success,error);
		}, function() {
			thisObj.attr("is-post",0);
		});
		
	}
	
	$scope.showRelation = function(x){
		$scope.mm_id = x.mm_id;
		$('#myModal').modal('show');
		$scope.activeTab = 1;
		
	}
	
    // 菜单表格设置
    var setting = {
        view: {
            showLine: false,
            showIcon: true
        },
        check: {
			enable: true,
			chkStyle: "checkbox"
		},
        data: {
            simpleData: {
                enable: true
            }
        }
    };
	 
	/**
	 * 查询所有菜单树
	 */
	$scope.queryBaseArea = function(id,status){
		messageFactory.showLoading();
		var success = function(result){
			$.fn.zTree.init($("#treemode"), setting, result.data);
			var zTree = $.fn.zTree.getZTreeObj("treemode");
	        zTree.expandAll(true);
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url =  '/admin/base/baseCommonAreaControl/queryBaseCommonAreaTree.action';
		http.post(url,{},success,error);
	}
	$scope.queryBaseArea();

	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue1 = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue1;
	},$scope.queryList);
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue2 = $scope.devicePager.page+' '+$scope.devicePager.rows+' '+$scope.devicePager.sort+' '+$scope.devicePager.order+' ';
		return newValue2;
	},$scope.queryDevice);
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue3 = $scope.groupPager.page+' '+$scope.groupPager.rows+' '+$scope.groupPager.sort+' '+$scope.groupPager.order+' ';
		return newValue3;
	},$scope.queryGroup);  
	
    /**
     * 查询已经关联区域
     */
    $scope.rePager = {page:1,rows:'999999',sort:'msr_id',order:'desc',pageList:['10','20','30']};
    $scope.queryResource = function(activityId){
    	// messageFactory.showLoading();
		var success = function(result){
			$scope.reList = result.data.rows;
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		};
		var url = '/admin/activity/marketingSourceRelationControl/dataGrid.action';
		http.post(url,$.extend({"msr_activityid":activityId,"msr_dr":1},$scope.rePager),success,error);
    }
    
    /**
     * 
     */
    $scope.showRelationBox = function(x){
    	$('#myModal2').modal('show');
    	$scope.queryResource(x.mm_id);
    }
})