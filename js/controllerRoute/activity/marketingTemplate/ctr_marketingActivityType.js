tempApp.controller('ctr_marketingActivityType', function($scope,EzConfirm,messageFactory,http,$state) {
   
	$scope.selectNode = {"level":0}; 
	$scope.showCategory = 1;
	$scope.category = 1;
	
	/**
	 * 选择类别
	 */
	$scope.selectCategory = function(){
		console.log($scope.selectNode);
		
		if ($scope.selectNode.id == "") {
			document.getElementById('catName').value = "";
			document.getElementById('catName2').value = "";
			document.getElementById('catName3').value = "";
		} else {
			$scope.category = $scope.selectNode.category;
			if ($scope.selectNode.level == 0) {
				$scope.showCategory =1;
			} else {
				$scope.showCategory =0;
			}
			document.getElementById('catName').value = $scope.selectNode.name;
			document.getElementById('catName2').value = $scope.selectNode.name;
			document.getElementById('catName3').value = $scope.selectNode.name;
		}

	}
    
	
	// 删除
	$scope.toDelete = function(){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$state.reload("index.marketingActivityType");
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"mat_id":$scope.selectNode.id};
		
		var url = '/admin/activity/marketingActivityTypeControl/delete.action';
		
		EzConfirm.create({
			heading : '提示',
			text : '确定要删除数据吗？'
		}).then(function() {
			http.post(url,data,success,error);
		}, function() {
			//console.log('取消？')
		});
	}
	
	
	// 保存信息
	$scope.editOrAdd = function(){		
		/*if (!$scope.selectNode) {
			messageFactory.showMessage('error',"请选择要操作的数据");
			return false;
		}*/
		
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$state.reload("index.marketingActivityType");
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var name = document.getElementById('catName').value;
		if ($scope.option == 2 || $scope.option == 3){
			name = document.getElementById('catNameNew').value;
		}
		var pattern = new RegExp("[`~!%@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") ;		
		if (pattern.test(name) || $.trim(name) == "") {
			messageFactory.showMessage('error',"名字不能为空,也不能为特殊字符");
			return false;
		}

		var data = {};
		// 新增
		if ($scope.option == 2){
			
			if ($scope.selectNode.level == 1) {
				messageFactory.showMessage('error',"二级分类下不能添加分类了");
				// $scope.option = 1;
				return false;
			}
			$scope.selectNode.level = $scope.selectNode.level?$scope.selectNode.level:0;
			data = {"mat_name":name,'mat_parentid':$scope.selectNode.id,"mat_category":$scope.category};
			var	msg = '您确定添加本条记录吗？';
		} 
		if ($scope.option == 3){
			$scope.selectNode.level = $scope.selectNode.level?$scope.selectNode.level:0;
			data = {"mat_name":name,'mat_parentid':$scope.selectNode.pId,"mat_category":$scope.category};
			var	msg = '您确定添加本条记录吗？';
		} 
		if ($scope.option == 1){
			var	msg = '您确定修改本条记录吗？';
			if(!$scope.selectNode.id){
				messageFactory.showMessage('error',"请选择要修改的数据！");
				return;
			}
			data = {"mat_name":name,'mat_id':$scope.selectNode.id}
		}
		var url = "/admin/activity/marketingActivityTypeControl/update.action";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		

	}
	
	$scope.addNew = function(){
		$scope.isAdd=true;
		$scope.option=2;
		if ($scope.selectNode.level==0) {
			$scope.showCategory = 0;
		}
	}
})