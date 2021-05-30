tempApp.factory('activityFactory', function($state,messageFactory,EzConfirm,http,dateUtil) {
	var factory = {};
	
	var today = dateUtil.getDate2();
	factory.deltePromotion = function($scope,x,$event) {
		var thisObj = $($event.target);
		if (thisObj.attr('is-post') == 1) {
			messageFactory.showMessage('error',"网络延迟,请刷新重试");
			return;
		}
		thisObj.attr('is-post',1);
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			factory.queryList($scope);
		}
		
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		EzConfirm.create({
			heading : '提示',
			text : "您确定要删除该活动吗？"
		}).then(function() {
			var url = "/admin/promotion/productPromotionMainControl/delete.action";
			http.post(url,{'ppm_id':x.ppm_id},success,error);
		}, function() {
			thisObj.attr('is-post',0);
		});
	}
	// 复制活动 
	factory.copyPromotion = function($scope,x,$event){
		var thisObj = $($event.target);
		if (thisObj.attr('is-post') == 1) {
			messageFactory.showMessage('error',"网络延迟,请刷新重试");
			return;
		}
		thisObj.attr('is-post',1);
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			factory.queryList($scope);
		}
		
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		EzConfirm.create({
			heading : '提示',
			text : "您确定要复制该活动吗？"
		}).then(function() {
			var url = "/admin/promotion/productPromotionMainControl/copyPromotion.action";
			http.post(url,{'pa_id':x.pa_id},success,error);
		}, function() {
			thisObj.attr('is-post',0);
		});
	}
	
	
	// 修改发布状态
	factory.updatePublish = function($scope,x,stats,$event){
		var thisObj = $($event.target);
		if (thisObj.attr('is-post') == 1) {
			messageFactory.showMessage('error',"网络延迟,请刷新重试");
			return;
		}
		thisObj.attr('is-post',1);
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			factory.queryList($scope);
		}
		
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		var message = "您确定提交吗？";
		if(stats==1){
			message = "您确定要取消发布吗";
			EzConfirm.create({
				heading : '提示',
				text : message 
			}).then(function() {
				var url = "/admin/promotion/productPromotionMainControl/updatePublishStatus.action";
				http.post(url,{'ppm_id':x.ppm_id,'stats':stats},success,error);
			}, function() {
				thisObj.attr('is-post',0);
			});
		}else if(stats==3){
			if (x.ppm_startdate == "" || x.ppm_enddate == "") {
				messageFactory.showMessage('error',"活动时间不能为空");
				thisObj.attr('is-post',0);
				return;
			}
			
			if (x.ppm_enddate<today) {
				messageFactory.showMessage('error',"活动结束日期不能小于当前日期");
				thisObj.attr('is-post',0);
				return;
			}
			
			message = "您确定要发布吗";
			EzConfirm.create({
				heading : '提示',
				text : message 
			}).then(function() {
				var url = "/admin/promotion/productPromotionMainControl/updatePublishStatus.action";
				http.post(url,{'ppm_id':x.ppm_id,'stats':stats},success,error);
			}, function() {
				thisObj.attr('is-post',0);
			});
			
			
		}
		
	}
	
	//查询列表
	factory.queryList = function($scope){
		messageFactory.showLoading();
		var success = function(result){
			$scope.ppmList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			
			
			
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/promotion/productPromotionMainControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
	
	
	
	return factory;
});