tempApp.controller('ctr_marketingTemplateAdd', function($scope,EzConfirm,messageFactory,http,$state,$stateParams) {
    $scope.pager = {page:1,rows:'10',sort:'mt_ts',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
    $scope.searchParam2 = {};

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
	
    $scope.mt_id = $stateParams.mt_id;
	$scope.getDetail = function(){
		if (!$scope.mt_id) {
			return false;
		}
		
		var success = function(result){
			$scope.vo = result.data;
			
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"mt_id":$scope.mt_id};
		
		var url = '/admin/activity/marketingTemplateControl/getDetail.action';
		
		http.post(url,data,success,error);
		
	}
	if ($scope.mt_id) {
		$scope.getDetail();
		
	} else {
		$scope.vo = {"mt_stats":1,"mat_category":1};
	}
	
	/**
	 * 查询列表
	 */
	$scope.queryList = function(){
		
		messageFactory.showLoading();
		var success = function(result){
			$scope.mtList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		$scope.searchParam.mm_state = 3;
		var url = '/admin/activity/marketingTemplateControl/dataGrid.action';
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
	

	$scope.typepager = {page:1,rows:'9999',sort:'mat_id',order:'desc',pageList:['10','20','30']};
	$scope.queryTypeList = function(){
		var success = function(result){
			$scope.typeList = result.data.rows;
	//	$scope.typeList.unshift({'mat_id':'','mat_name':"全部类型"});
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		$scope.searchParam.mat_category = "1";
		$scope.searchParam.mat_parentid_isnull = "2";
		var url = '/admin/activity/marketingActivityTypeControl/dataGrid.action';
		http.post(url,$.extend({},$scope.typepager,$scope.searchParam),success,error);
	}
	$scope.queryTypeList();
	
	$scope.typepager2 = {page:1,rows:'9999',sort:'mat_id',order:'desc',pageList:['10','20','30']};
	$scope.queryTypeList2 = function(){
		var success = function(result){
			$scope.typeList2 = result.data.rows;
	//	$scope.typeList.unshift({'mat_id':'','mat_name':"全部类型"});
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		$scope.searchParam2.mat_category = "2";
		var url = '/admin/activity/marketingActivityTypeControl/dataGrid.action';
		http.post(url,$.extend({},$scope.typepager2,$scope.searchParam2),success,error);
	}
	$scope.queryTypeList2();
	
	$scope.saveMt = function(){
		
    	if (!$scope.vo.mt_code) {
    		messageFactory.showMessage('error',"请输入模板编码");
    		return false;
    	}
    	
    	if (!$scope.vo.mt_name) {
    		messageFactory.showMessage('error',"请输入模板名称");
    		return false;
    	}
    	
    	if (!$scope.vo.mt_activity_type) {
    		messageFactory.showMessage('error',"请选择模板类型");
    		return false;
    	}

    	
    	var success = function(result){
  
			messageFactory.showMessage('success',result.desc);
			$scope.goList();
			
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = $scope.vo;
		
		var url = '/admin/activity/marketingTemplateControl/update.action';
		
		EzConfirm.create({
			heading : '提示',
			text : '确定要保存数据吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
		
	}
	
	$scope.goList = function(){
		$state.go("index.setting.marketingTemplate");
	}
	
	/**
	 * 显示图片上传
	 */
	$scope.upImage = function($event){
		$scope.ue_myeditor.addListener("beforeInsertImage", function (t, arg) {
			var imgs="";
			for(var i=0;i<arg.length;i++){
				imgs += arg[i].src+"|"+arg[i].title;
				if(i<arg.length-1){
					imgs +=",";
				}
			}
			uploadImgCallBack(imgs);
		});
		var myImage = $scope.ue_myeditor.getDialog("insertimage");
		myImage.open();

	};
	
	/**
	 * 图片上传回调
	 */
	var uploadImgCallBack = function(imgs){
		var imgsArr = imgs.split(",");
		//console.log(imgsArr);
		
		$scope.vo.mt_background_address_nameref = imgsArr[0].split("|")[0];
		$scope.vo.mt_background_address = imgsArr[0].split("|")[0].split("static/upload/image")[1];
		
	}
	
})