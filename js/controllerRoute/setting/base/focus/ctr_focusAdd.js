tempApp.controller('ctr_focusAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory,$rootScope) {
	$scope.imgsize = ['','750*370，50kb以内','','1119*1080，2M以内','1920*1080，4M以内'];
	if ($stateParams.fb_id) {
		$scope.fb_id = $stateParams.fb_id;
	}
	$scope.today = dateUtil.getDate2();
	$scope.vo = {"fb_dr":1,"fb_checkstate":1,'fb_type':2,"fb_target_type":1,"fb_sort":1,"fb_start":$scope.today,"fb_end":$scope.today,"fb_location":1};
	$scope.shopid=$rootScope.USER.shopId;
	$scope.getDetail = function(){
		var success = function(result){
			$scope.vo = result.data;
			$("#start_time").val($scope.vo.fb_start +" 至  "+$scope.vo.fb_end);
			$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
				$scope.vo.fb_start = start.format('YYYY-MM-DD');
				$scope.vo.fb_end = end.format('YYYY-MM-DD');
				$scope.$apply();
		    });
			$scope.queryFocusAreaRelationList();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}

		var url = '/admin/base/focusBaseControl/getDetail.action';
		http.post(url,{"fb_id":$scope.fb_id},success,error);
	}
	
	if ($scope.fb_id) {
		$scope.getDetail();
	}
    /**
     * 查询区域关系
     */
    $scope.queryFocusAreaRelationList = function(){
    	var success = function(result){
			$scope.focusAreaRelation = result.data;
			var data = [];
	    	for(i in $scope.focusAreaRelation){
	    			data.push($scope.focusAreaRelation[i].far_areaid);
	    	}
	    	$scope.vo.fb_areaid_str = data.join(',');
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'fb_id':$scope.fb_id}
		var url = "/admin/base/focusAreaRelationControl/getRelationList.action";
				
		http.post(url, data, success, error);
    }
	
	
	
	$("#start_time").val($scope.vo.fb_start +" 至  "+$scope.vo.fb_end);
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
		$scope.vo.fb_start = start.format('YYYY-MM-DD');
		$scope.vo.fb_end = end.format('YYYY-MM-DD');
		$scope.$apply();
    });
	

	/**
	 * 保存
	 */
	$scope.submit = function(){
		
		if( $scope.vo.fb_cover==undefined || $scope.vo.fb_cover==""){
			messageFactory.showMessage('error','请上传图片');
			return;
		}
		if( $("#start_time").val()==""){
			messageFactory.showMessage('error','请选择活动时间');
			return;
		}
		if( $("#end_time").val()==""){
			messageFactory.showMessage('error','请选择活动时间');
			return;
		}
		
		if ($scope.vo.fb_type ==1) {
			if (!$scope.vo.fb_video){
				messageFactory.showMessage('error','请输入视频路径 ');
				return;	
			}
		}

		if (!$scope.vo.fb_areaid_str) {
			messageFactory.showMessage('error',"请选择展示区域");
			return false;
		}
		
		var success = function(result){
			messageFactory.showMessage('success','提交成功');
			$scope.goBack();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}

		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/base/focusBaseControl/update.action";
			http.post(url,$.extend({},$scope.vo),success,error);
		}, function() {

		});
	}

	// 返回
	$scope.goBack = function(){
		
		$state.go("index.setting.focus");
		
	}

	$scope.upImage = function($event) {
		$scope.ue_myeditor.addListener("beforeInsertImage",
			function(t, arg) {
				var imgs = "";
				if (arg.length > 0) {
					imgs = arg[0].src;
				}
				var imgsArr = imgs.split(",");
				$scope.vo.fb_cover_show = imgsArr[0]
						.split("|")[0].replace(
						"m.shequkuaixian.com",
						"imgtest.sqkx.net");
				$scope.vo.fb_cover = imgsArr[0]
						.split("|")[0]
						.split("static/upload/image")[1];
			}
		);
		var myImage = $scope.ue_myeditor
				.getDialog("insertimage");
		myImage.open();
	};

	$scope.upVideo = function($event) {
		$scope.ue_myvideoeditor.addListener("afterUpVideo",
			function(t, arg) {
				$scope.vo.fb_video = arg[0].url;
				$scope.vo.fb_video_show = arg[0].url;
			}
		);
		var myvideo = $scope.ue_myvideoeditor
				.getDialog("insertvideo");
		myvideo.open();
	};
	
    /**
     * 显示城市弹框
     */
    $scope.showCityDialog = function(){
    	$scope.showCity = true;
    	var treeObj = $.fn.zTree.getZTreeObj("tree2");
		for(j in $scope.focusAreaRelation){
			var node = treeObj.getNodeByParam('id', $scope.focusAreaRelation[j].far_areaid, null);
			treeObj.checkNode(node, true, true);
		}
    }
    /**
     * 关闭城市弹框
     */
    $scope.closeCityDialog = function(){
    	$scope.showCity = false;
    }
    
    /**
     * 选择城市
     */
    $scope.selectCity = function(){
    	var treeObj = $.fn.zTree.getZTreeObj("tree2");
    	var nodes = treeObj.getCheckedNodes(true);
    	var data = [];
    	$scope.focusAreaRelation = [];
    	for(i in nodes){
    		if(!nodes[i].isParent){
    			data.push(nodes[i].id);
    			var temp = {};
    			temp.far_areaid = nodes[i].id;
    			temp.far_areaid_nameref = nodes[i].name;
    			$scope.focusAreaRelation.push(temp);
    		}
    	}
    	$scope.vo.fb_areaid_str = data.join(',');
    	$scope.closeCityDialog();
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
    			enable : true,
    			autoCheckTrigger : true,
    			chkboxType : {
    				"Y" : "ps",
    				"N" : "ps"
    			},
    			chkStyle : "checkbox",
    			nocheckInherit : true,
    			chkDisabledInherit : true
    		}
		}; 
		

			/**
	 * 显示位置列表
	 */
	$scope.locationList = [];
	$scope.queryLocationList = function(){
	  var success = function(result){
		$scope.locationList = result.data;
		// $scope.payWayList = [{"bd_code":"1", "bd_name":"线上支付"},{"bd_code":"2", "bd_name":"线下支付"}];
	  }
	  var error = function(result){
		  messageFactory.closeLoading();
		  messageFactory.showMessage('error',result.desc);
	  }
		var url = '/admin/base/baseDataControl/detailItem.action?codekey=1051';
		http.post(url,null,success,error);
	}
	$scope.queryLocationList();
})