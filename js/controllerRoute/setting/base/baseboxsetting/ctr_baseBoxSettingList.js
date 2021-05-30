tempApp.controller('ctr_baseBoxSettingList', function($scope, $state, http,
		EzConfirm, messageFactory) {
	 $scope.pager = {page:1,rows:'10',sort:'bbs_areacode',order:'desc',pageList:['10','20','30']};
	 $scope.searchParam = {};
	 $scope.vo = {};
	/**
	 * 查询列表
	 */
	var queryList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.parameterList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url =  '/admin/base/baseBoxSettingControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
	
	$scope.queryBoxType = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.boxTypeList = result.data;
			$scope.boxTypeList.unshift({"bd_code":"", "bd_name":"请选择柜子类型"});
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url =  '/admin/base/baseDataControl/detailItem.action?codekey=2154';
		http.post(url,{},success,error);
	}
	$scope.queryBoxType();
	
	
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
	 * 显示添加div
	 */
	$scope.showDialog = function() {
		$scope.dialogShow = true;
	}

	/**
	 * 关闭添加div
	 */
	$scope.closeDialog = function() {
		$(".w5c-error").remove();
		$scope.dialogShow = false;
		$scope.vo = {};
	}
	
	/**
     * 关闭城市弹框
     */
    $scope.closeCityDialog = function(){
    	$scope.showCity = false;
    }
    
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
    	$scope.selectarea.bbs_areacode = treeNode.ba_district_gbcode;
    	$scope.selectarea.bbs_areacode_nameref = treeNode.name;
    	$scope.selectarea.check_Child_State = treeNode.check_Child_State;
    };
    
    /**
     * 选择城市
     */
    $scope.selectCity = function(){
    	/*if($scope.selectarea.check_Child_State != -1){
    		messageFactory.showMessage('error',"请选择底级区域！");
			return;
    	}*/
    	$scope.vo.bbs_areacode = $scope.selectarea.bbs_areacode;
    	$scope.vo.bbs_areacode_nameref = $scope.selectarea.bbs_areacode_nameref;
    	$scope.closeCityDialog();
    }
    
    /**
     * 显示城市弹框
     */
    $scope.showCityDialog = function(){
    	$scope.showCity = true;
    	var treeObj = $.fn.zTree.getZTreeObj("tree2");
    }

	/**
	 * 去编辑
	 */
	$scope.toEdit = function(id) {
		if (id == undefined || id == '') {
			$scope.vo = {};
			$("#date1").val("");
			$("#date2").val("");
			$("#hour1").val("");
			$("#hour2").val("");
			$("#hour3").val("");
			$("#hour4").val("");
			$scope.dialogTitle = '添加';
			$scope.vo.bbs_type = 1;
			$scope.vo.bbs_state = 1;
			$scope.vo.bbs_dr = 1;
		} else {
			$scope.dialogTitle = '修改';
			$scope.queryDetail(id);
		}
		$scope.showDialog();
	}
	
	/**
	 * 查询明细
	 */
	$scope.queryDetail = function(id){
		var success = function(result){
			$scope.vo = result.data;
			if($scope.vo.bbs_date){
				$("#date1").val($scope.vo.bbs_date.split("-")[0]);
				$("#date2").val($scope.vo.bbs_date.split("-")[1]);
			}
			$("#hour1start").val($scope.vo.bbs_hour1start);
			$("#hour1end").val($scope.vo.bbs_hour1end);
			$("#hour2start").val($scope.vo.bbs_hour2start);
			$("#hour2end").val($scope.vo.bbs_hour2end);
			$("#hour3start").val($scope.vo.bbs_hour3start);
			$("#hour3end").val($scope.vo.bbs_hour3end);
			$("#hour4start").val($scope.vo.bbs_hour4start);
			$("#hour4end").val($scope.vo.bbs_hour4end);
			if($scope.vo.bbs_hour){
				var arr = $scope.vo.bbs_hour.split(",");
				if(arr.length>1){
					$("#hour1").val(arr[0].split("-")[0]);
					$("#hour2").val(arr[0].split("-")[1]);
					$("#hour3").val(arr[1].split("-")[0]);
					$("#hour4").val(arr[1].split("-")[1]);
				}else{
					$("#hour1").val(arr[0].split("-")[0]);
					$("#hour2").val(arr[0].split("-")[1]);
				}

				
			}
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		messageFactory.showLoading();
		var url = '/admin/base/baseBoxSettingControl/getDetail.action';
		http.post(url,{'bbs_id':id},success,error);
	}

	/**
	 * 新增和编辑保存
	 */
	$scope.create = function(){
		var date1 = $("#date1").val();
		var date2 = $("#date2").val();
		var hour1 = $("#hour1").val();
		var hour2 = $("#hour2").val();
		var hour3 = $("#hour3").val();
		var hour4 = $("#hour4").val();
		$scope.vo.bbs_hour1start = $("#hour1start").val();
		$scope.vo.bbs_hour1end = $("#hour1end").val();
		$scope.vo.bbs_hour2start = $("#hour2start").val();
		$scope.vo.bbs_hour2end = $("#hour2end").val();
		$scope.vo.bbs_hour3start = $("#hour3start").val();
		$scope.vo.bbs_hour3end = $("#hour3end").val();
		$scope.vo.bbs_hour4start = $("#hour4start").val();
		$scope.vo.bbs_hour4end = $("#hour4end").val();
		if(!$scope.vo.bbs_areacode){
			messageFactory.showMessage('error',"请选择区域");
			return false;
		}
		console.log($scope.vo.bbs_box_type);
		if(!$scope.vo.bbs_box_type){
			
			messageFactory.showMessage('error',"请选择柜子类型");
			return false;
		}

		// if (!date1||!date2||!$scope.vo.bbs_hour1start||!$scope.vo.bbs_hour1end) {
		// 	messageFactory.showMessage('error',"请选择生效时间");
		// 	return false;
		// }
		if(date2<date1){
			messageFactory.showMessage('error',"结束时间不能小于开始时间");
			return false;
		}
		if(hour2<hour1&&hour2!="00:00"){
			messageFactory.showMessage('error',"结束时间不能小于开始时间");
			return false;
		}
		if(hour4!="00:00"&&hour4!=""&&(hour3!="00:00"||hour2!="00:00")){
			messageFactory.showMessage('error',"时间格式不正确");
			$("#hour2").val("00:00");
			$("#hour3").val("00:00");
			return false;
		}
		if(hour4==="00:00"){
			messageFactory.showMessage('error',"时间格式不正确");
			$("#hour4").val("");
			$("#hour3").val("");
			return false;
		}
		// if (!date1||!date2||!hour1||!hour2) {
		// 	messageFactory.showMessage('error',"请选择生效时间");
		// 	return false;
		// }
		
		$scope.vo.bbs_date = date1+"-"+date2;
		if(hour4){
			$scope.vo.bbs_hour = hour1+"-"+hour2+","+hour3+"-"+hour4;
		}else{
			$scope.vo.bbs_hour = hour1+"-"+hour2;
		}
		var success = function(result){
			$scope.closeDialog();
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryList();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var msg = "您确定添加本条记录吗？";
		if($scope.vo.bp_id){
			msg = "您确定编辑本条记录吗？";
		}
		var url = "/admin/base/baseBoxSettingControl/update.action";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, $scope.vo, success, error);
		}, function() {
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
	 * 删除
	 */
	$scope.toDelete = function(vo) {
				
		var success = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('success', result.desc);
			queryList();
		}
		var error = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}

		var data = angular.copy(vo);
		data.bbs_dr = 0;
		var url = "/admin/base/baseBoxSettingControl/update.action";
		
		var msg = '您确定删除本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			http.post(url, data, success, error);
		}, function() {

		});

	}

	$scope.searchFun = function() {
		if ($scope.pager.page == 1) {
			queryList();
		} else {
			$scope.pager.page = 1;
		}
	}

	/**
	 * 排序方法
	 */
	$scope.sortFun = function(name, flag) {
		if (!flag) {
			return 'colorCenter noSortCss';
		}
		if ($scope.pager.sort == name && $scope.pager.order == 'asc') {
			return 'SortAscCss'
		}
		if ($scope.pager.sort == name && $scope.pager.order == 'desc') {
			return 'SortDescCss'
		}
	}

	/**
	 * 点击切换排序
	 */
	$scope.clickSortFun = function(name) {
		if ($scope.pager.sort != name) {
			$scope.pager.sort = name;
			$scope.pager.order = 'asc';
		}
		if ($scope.pager.sort == name) {
			if ($scope.pager.order == 'asc') {
				$scope.pager.order = 'desc';
			} else {
				$scope.pager.order = 'asc';
			}
		}
	}
})