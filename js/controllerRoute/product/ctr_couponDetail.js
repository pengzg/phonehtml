tempApp.controller('ctr_couponDetail', function($scope,$rootScope,$state) {
	$scope.time;
 	$('#activityRange1').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    	//console.log(start.format('YYYY-MM-DD'))
    	$scope.time = $('#activityRange1').val();
    });

    $scope.timeRange = [{time1:'00',time2:'00',time3:'24',time4:'00'}];
    $scope.addTimeRange = function(){
    	$scope.timeRange.push({time1:'00',time2:'00',time3:'24',time4:'00'});
    }
    $scope.deleteTimeRange = function(){
    	$scope.timeRange.pop();
    }
    $scope.activeTime = '立即生效';
    $scope.activeTimes = ['立即生效','第二天生效'];
    $scope.otherMerchants = new Array();
    $scope.addMer = function(){
        $scope.otherMerchants.push({num:$scope.merchantsNum});
        $scope.merchantsNum =  '';
        $scope.isOtherMerchant = false;
    }
    $scope.deleteMer = function(idx){
        $scope.otherMerchants.splice(idx,1);
    }
    $scope.colorData = ['63b359','2c9f67','509fc9','5885cf','9062c0'];
    $scope.colorData2 = ['d09a45','e4b138','ee903c','dd6549','cc463d'];
    $scope.currentColor = 'd09a45';
    $scope.changeColor = function(color){
        $scope.currentColor = color;
        $scope.isColor = false;
    }
    $scope.activeJump = '跳转至付款码'
    $scope.jumpWay = ['跳转至付款码','跳转至默认页'];

    $scope.cardFunction = false;
    $scope.isAddGoods = false;
    $scope.isInfoGoods = false;
    $scope.next = function(){
        $scope.isInfoGoods = true;
        $scope.isAddGoods = false;
    }
    $scope.cancel = function(){
        $scope.isAddGoods = false;
    }
    $scope.sure = function(){
        $scope.isInfoGoods = false;
    }
    $scope.previous = function(){
        $scope.isAddGoods = true;
        $scope.isInfoGoods = false;
    }
    $scope.available = '1';
    $scope.markers = [];
    $scope.markerNew = '';
    $scope.addMarker = function(){
        if($scope.markers.indexOf($scope.markerNew)>=0){
            return
        }
        if($scope.markerNew!=''){
            $scope.markers.push($scope.markerNew);
        }
        $scope.markerNew = '';
    }
    $scope.delMarker = function(idx){
        $scope.markers.splice(idx,1);
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

    $scope.edit = function(){
        $state.go('index.product.moneyCoupon');
    }
})