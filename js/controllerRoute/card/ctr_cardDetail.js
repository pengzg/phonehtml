tempApp.controller('ctr_cardDetail', ['$scope', 'EzConfirm', 'messageFactory', '$rootScope', '$state', '$stateParams',
	function ($scope, EzConfirm, messageFactory, $rootScope, $state, $stateParams) {

	$scope.pager = {page:1,rows:'10',sort:'mmu_ts',order:'desc',pageList:['10','20','30']};

	$scope.imgTextData = [];

	$scope.couponType = $stateParams.coupon_type;
	/**
	 * 删除
	 */
	$scope.del = function(x){
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
			// http.post(url,$.extend({'mmu_id':x.mmu_id},$scope.vo),success,error);
		}, function() {
			messageFactory.activityBtn();
		});
		
	}

	$scope.colorData = ['63b359','2c9f67','509fc9','5885cf','9062c0'];
    $scope.colorData2 = ['d09a45','e4b138','ee903c','dd6549','cc463d'];
    $scope.currentColor = '2c9f67';
    $scope.changeColor = function(color){
        $scope.currentColor = color;
        $scope.isColor = false;
    }

    $('#activityRange').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    	//console.log(start.format('YYYY-MM-DD'))
    	// $('#activityRange').val(); 
    	
    });

    $scope.returnList = function(){
    	$state.go('index.card.cardList');
    }

    $scope.save = function(){
		// $state.go('index.card.cardList');
		console.log($scope.imgTextData)
    }

	$scope.isDisable = $state.current.name === 'index.card.cardView';
	
	$scope.arr90 = new Array(91);
	$scope.arr91 = new Array(90);
	$scope.formDate = '当天';
	$scope.endDate = '30天';
	for (var i = 0; i < $scope.arr90.length;i++){
		if(i == 0){
			$scope.arr90[i] = '当天';
			continue;
		}
		$scope.arr90[i] = i + '天'
	}
	for (var i = 0; i < $scope.arr91.length;i++){
		$scope.arr91[i] = (i + 1) + '天'
	}

	$scope.timeRange = [];

	$scope.addTimeRange = function(){
    	$scope.timeRange.push({time1:'00',time2:'00',time3:'24',time4:'00'});
    }
    $scope.deleteTimeRange = function(){
    	$scope.timeRange.pop();
	}
	
	var isImgEventExist = false;
	/**
	 * 显示图片上传
	 */
	$scope.upImage = function () {
		if (!isImgEventExist) {
			isImgEventExist = true;
			$scope.ue_myeditor.addListener("beforeInsertImage", function (t, arg) {
				var imgs = "";

				if (arg.length > 0) {
					imgs = arg[0].src;
				}
				var imgsArr = imgs.split(",");
				$scope.mp_img = imgsArr[0].split("|")[0].split("static/upload/image")[1];
				$scope.mp_img_show = imgsArr[0].split("|")[0];
			});
		}
		var myImage = $scope.ue_myeditor.getDialog("insertimage");
		myImage.open();

	};

}])