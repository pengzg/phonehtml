tempApp.controller('ctr_addStartPageListAd', function($scope,$rootScope,EzConfirm) {
    $scope.adtype = 1;
    $scope.baseStoreList1 = [{bs_id:1,bs_name:'经销商'},{bs_id:2,bs_name:'免费商铺'},{bs_id:3,bs_name:'公交站台'}];
    $scope.baseStoreList2 = new Array(); 
    $scope.deleteSeller = function(){
		EzConfirm.create({
			heading : '提示',
			text : '确认删除吗？'
		}).then(function() {
			//console.log('删除')
		}, function() {
			//console.log('取消？')
		});
	}
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

    $('#dateTimeRange').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    	//console.log(start.format('YYYY-MM-DD'))
    });

    $scope.charging = '单次计费';
    $scope.charges = ['单次计费']

    $scope.uploadAudio = function(){
        $('#audioInput').click();
    }

    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    $scope.audioChange = function(){
        var objUrl = getObjectURL($('#audioInput')[0].files[0]);
        $("#audio").attr("src", objUrl);
        // $("#audio")[0].play();
        //console.log(123)
        $("#audio").show();
        // getTime();
    }

    $scope.moveOptionSh = function(event){
        var target = event.target;
        var value = angular.element(target).val();
        var list_id = angular.element(target).parent().attr("id");
        if(list_id=="list1"){
            for(x in $scope.baseStoreList1){
                if(value == $scope.baseStoreList1[x].bs_id){
                    $scope.baseStoreList2.push($scope.baseStoreList1[x]);
                    $scope.baseStoreList1.splice(x,1);
                    break;
                }
            }
        }else{
            for(x in $scope.baseStoreList2){
                if(value == $scope.baseStoreList2[x].bs_id){
                    $scope.baseStoreList1.push($scope.baseStoreList2[x]);
                    $scope.baseStoreList2.splice(x,1);
                    break;
                }
            }
        }
    }
    //左右移动
    $scope.moveOptionBatchSh = function(type){
        if(type=="list1"){
            var e1 = document.getElementById('list1');
            for(var i=0;i<e1.options.length;i++){
                for(x in $scope.baseStoreList1){
                    if(e1.options[i].selected){
                        var e = e1.options[i];
                        if(e.value == $scope.baseStoreList1[x].bs_id){
                            $scope.baseStoreList2.push($scope.baseStoreList1[x]);
                            $scope.baseStoreList1.splice(x,1);
                            break;
                        }
                    }
                }
            }
        }else{
            var e1 = document.getElementById('list2');
            for(var i=0;i<e1.options.length;i++){
                for(x in $scope.baseStoreList2){
                    if(e1.options[i].selected){
                        var e = e1.options[i];
                        if(e.value == $scope.baseStoreList2[x].bs_id){
                            $scope.baseStoreList1.push($scope.baseStoreList2[x]);
                            $scope.baseStoreList2.splice(x,1);
                            break;
                        }
                    }
                }
            }
        }
    }
})