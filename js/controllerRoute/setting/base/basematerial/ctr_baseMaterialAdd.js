tempApp.controller('ctr_baseMaterialAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory,$rootScope) {
	$scope.imgsize = ['','750*370，50kb以内','','1119*1080，2M以内','1920*1080，4M以内'];
	if ($stateParams.bm_id) {
		$scope.bm_id = $stateParams.bm_id;
	}
	$scope.today = dateUtil.getDate2();
	$scope.vo = {"bm_dr":1,"bm_checkstate":1,'bm_type':2,"bm_target_type":1,"bm_sort":1,"bm_start":$scope.today,"bm_end":$scope.today,"bm_location":1};
	$scope.shopid=$rootScope.USER.shopId;
	var isImgEventExist = false;
	$scope.picList = [];
	$scope.getDetail = function(){
		var success = function(result){
			$scope.vo = result.data;
			$("#start_time").val($scope.vo.bm_start +" 至  "+$scope.vo.bm_end);
			$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
				$scope.vo.bm_start = start.format('YYYY-MM-DD');
				$scope.vo.bm_end = end.format('YYYY-MM-DD');
				$scope.$apply();
			});
			$scope.picList = $scope.vo.picList;
			// $scope.queryFocusAreaRelationList();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}

		var url = '/admin/base/baseMaterialControl/getDetail.action';
		http.post(url,{"bm_id":$scope.bm_id},success,error);
	}
	
	if ($scope.bm_id) {
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
	    	$scope.vo.bm_areaid_str = data.join(',');
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'bm_id':$scope.bm_id}
		var url = "/admin/base/focusAreaRelationControl/getRelationList.action";
				
		http.post(url, data, success, error);
    }
	
	
	
	$("#start_time").val($scope.vo.bm_start +" 至  "+$scope.vo.bm_end);
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
		$scope.vo.bm_start = start.format('YYYY-MM-DD');
		$scope.vo.bm_end = end.format('YYYY-MM-DD');
		$scope.$apply();
    });
	

	/**
	 * 保存
	 */
	$scope.submit = function(){
		
		
		if( $("#start_time").val()==""){
			messageFactory.showMessage('error','请选择活动时间');
			return;
		}
		if( $("#end_time").val()==""){
			messageFactory.showMessage('error','请选择活动时间');
			return;
		}
		var imgArr = [];
		if ($scope.picList.length>0) {
			for (i=0;i<$scope.picList.length;i++) {
				imgArr.push($scope.picList[i].path);
			}
			
		}
		$scope.vo.imgListStr = imgArr.join(",");
		
		$scope.vo.picList = [];
		
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
			var url = "/admin/base/baseMaterialControl/update.action";
			http.post(url,$.extend({},$scope.vo),success,error);
		}, function() {

		});
	}

	// 返回
	$scope.goBack = function(){
		
		$state.go("index.setup.basematerial");
		
	}

	// $scope.upImage = function($event) {
	// 	$scope.ue_myeditor.addListener("beforeInsertImage",
	// 		function(t, arg) {
	// 			var imgs = "";
	// 			console.log(arg);
	// 			for (i =0;i<arg.length;i++) {
	// 				$scope.picList.push({
	// 					"picturepath":arg[i].src.split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net"),
	// 					"path":arg[i].src.split("|")[0].split("static/upload/image")[1]
	// 				})
	// 			}
	// 			console.log($scope.picList);
				
	// 		}
	// 	);
	// 	var myImage = $scope.ue_myeditor
	// 			.getDialog("insertimage");
	// 	myImage.open();
	// };

	/**
   * 显示图片上传
   */
  $scope.upImage = function($event, x,index) {
   // setX(x);
   console.log(isImgEventExist);
    if (!isImgEventExist) {
      isImgEventExist = true;
      $scope.ue_myeditor.addListener("beforeInsertImage", function(t, arg) {
       

		console.log(arg);
		// for (i =0;i<arg.length;i++) {
			$scope.picList.push({
				"picturepath":arg[0].src.split("|")[0].replace("m.shequkuaixian.com","imgtest.sqkx.net"),
				"path":arg[0].src.split("|")[0].split("static/upload/image")[1]
			})
		// }
		console.log($scope.picList);
		console.log(isImgEventExist,'88');			
        
      });
	}
	console.log(isImgEventExist);
    var myImage = $scope.ue_myeditor.getDialog("insertimage");
	myImage.open();
	console.log(isImgEventExist);
  };

	// var tempX;
	// function setX(x) {
	//   tempX = x;
	// }
	// function getX() {
	//   return tempX;
	// }




	$scope.upVideo = function($event) {
		$scope.ue_myvideoeditor.addListener("afterUpVideo",
			function(t, arg) {
				$scope.vo.bm_video = arg[0].url;
				$scope.vo.bm_video_show = arg[0].url;
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
    	$scope.vo.bm_areaid_str = data.join(',');
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


	$scope.del = function(index){
		$scope.picList.splice(index,1);
	 }

	 $scope.showTips = function(index) {
		$(".js_setPic"+index).show();
	}
	$scope.hideTips = function(index) {
	   $(".js_setPic"+index).hide();
	}
})