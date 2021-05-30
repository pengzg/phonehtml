tempApp.controller('ctr_promotionApplyDetail', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory) {
	if ($stateParams.pa_id != undefined) {
    	$scope.pa_id = $stateParams.pa_id;
    }
	
	$scope._simpleConfig = {
	     //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
	     toolbars: [
	       ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc','|', 'justifyleft',
	        'justifyright', 
	        'justifycenter',
	        'justifyjustify', 
	        'forecolor', 
	        'backcolor',
	        'fontfamily',
	        'fontsize']
	     ],
	     //focus时自动清空初始化时的内容
	     autoClearinitialContent: true,
	     //关闭字数统计
	     wordCount: true,
	     //关闭elementPath
	     elementPathEnabled: false
	};
    
    /**
     * 详情
     */
    $scope.getDetail = function() {
    	messageFactory.showLoading();
		var success = function(result){
			$scope.vo = result.data;
			
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"pa_id":$scope.pa_id};
		var url = '/admin/apply/promotionApplyControl/getDetail.action';
		http.post(url,data,success,error);
    }
    
    if ($scope.pa_id) {
    	$scope.getDetail();
    }
	

 	
})