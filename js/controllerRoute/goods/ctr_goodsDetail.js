tempApp.controller('ctr_goodsDetail', function($scope, http, messageFactory, $state, $stateParams, EzConfirm) {
  $scope.pm_id = $stateParams.pm_id;

	
	
	$scope.getDetail = function(){
		if (!$scope.pm_id) {
			return false;
		}
		
		var success = function(result){
			$scope.vo = result.data;
			if ($scope.vo.pm_integral_mall == 'N') {
				$scope.integral_mall = true;
			} else {
				$scope.integral_mall = false;
			}
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"pm_id":$scope.pm_id};
		
		var url = '/admin/product/productMainControl/getDetail.action';
		
		http.post(url,data,success,error);
		
	}
	if ($scope.pm_id) {
		$scope.getDetail();
		
	} else {
		$scope.vo = {"pm_state":1,"pm_integral_mall":'N',"pm_typeid":'1006',"pm_market_price":1,"pm_payment_type":1,"pm_integral_value":0.1,"pm_stock":0};
	}
	
	 /**
     * 保存礼品
     */
    $scope.saveProduct = function(){
    	
    	if (!$scope.vo.pm_code) {
    		messageFactory.showMessage('error',"请输入礼品编码");
    		return false;
    	}
    	
    	if (!$scope.vo.pm_title) {
    		messageFactory.showMessage('error',"请输入礼品名称");
    		return false;
    	}
    	
    	if (!$scope.vo.pm_subtitle) {
    		messageFactory.showMessage('error',"请输入副标题");
    		return false;
    	}
    	
    	if (!$scope.vo.pm_picture) {
    		$scope.vo.pm_picture = "/img_default/prizedef.jpg";
    	}

    	
    	var success = function(result){
  
			messageFactory.showMessage('success',result.desc);
			$state.go("index.product.productList");
			
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = $scope.vo;
		
		var url = '/admin/product/productMainControl/update.action';
		
		EzConfirm.create({
			heading : '提示',
			text : '确定要保存数据吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
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
		
		$scope.vo.pm_picture_show = imgsArr[0].split("|")[0];
		$scope.vo.pm_picture = imgsArr[0].split("|")[0].split("static/upload/image")[1];
		
	}
	
	// 返回首页
	$scope.goList = function(){
		$state.go("index.product.productList");
	}
})