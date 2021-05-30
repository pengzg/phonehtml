tempApp.controller('ctr_giftPointAdd', function($scope) {
	
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
		$scope.imageList=[];
		for(var i in imgsArr){
			if(i==0){
				//封面图
				var str = {'type':1,'path':imgsArr[i].split("|")[0].split("static/upload/image")[1],'pathDesc':imgsArr[i].split("|")[0]};
			}else{
				var str = {'type':2,'path':imgsArr[i].split("|")[0].split("static/upload/image")[1],'pathDesc':imgsArr[i].split("|")[0]};
			}
			
			$scope.imageList.push(str);
		}
		//图片改变啦
		$scope.changePic_type=1;
	}
})