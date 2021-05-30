tempApp.controller('ctr_posterTypeList', ['$scope','$state','EzConfirm','messageFactory','$stateParams','http'
    ,function($scope,$state,EzConfirm,messageFactory,$stateParams,http) {
	
    $(function(){
        $(".searchItem_list a").click(function() {
            $(this).siblings('a').removeClass('selected');
            $(this).addClass('selected'); 
        });
    }); 
    
    /**
     * 获取活动类型2级
     */
    $scope.queryActivityType = function(){
        messageFactory.showLoading();
        var success = function(result){
            $scope.activityTypeList  = result.data;
            $scope.getMarketingTemplate();
            messageFactory.closeLoading();
        };
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
        };
        var url = '/admin/activity/marketingActivityTypeControl/queryActivityType.action';
        // if($stateParams.mat_id){
            http.post(url,{mat_parentid:$stateParams.mat_id},success,error);
        // }
    }
    $scope.queryActivityType();
    
    /**
     * 获取活动模版
     */
    $scope.getMarketingTemplate = function(){
        messageFactory.showLoading();
        var success = function(result){
            $scope.marketingTemplateList  = result.data;
            messageFactory.closeLoading();
        };
        var error = function(result){
            messageFactory.closeLoading();
            messageFactory.showMessage('error',result.desc);
        };
        var url = '/admin/activity/marketingTemplateControl/getMarketingTemplate.action';
        http.post(url,{mt_activity_type:$scope.selectActivityTypeItem.mat_id},success,error);
    }
    
    $scope.createFun = function(obj){
        //console.log(obj.mt_id);
        $state.go('index.addActivityDetail_poster',{'mt_id':obj.mt_id})
    }
    
    /**
     * 选择二级活动类型
     */
    $scope.selectIndex = 'all';
    $scope.selectActivityTypeItem = {};
    $scope.selectActivityType = function(obj,index){
        $scope.selectIndex = index;
        if(index=='all'){
            $scope.selectActivityTypeItem = {};
        }else{
            $scope.selectActivityTypeItem = obj;
        }
        $scope.getMarketingTemplate();
    }

    // 生成活动预览二维码
    $scope.makeQrCode = function(index,state){
        if($('#qrcode'+index).html()==''){
            var demoAddress = location.origin + state;
            $('#qrcode'+index).qrcode({width:140,height:140,correctLevel:0,text:demoAddress});
        }
    }

}])