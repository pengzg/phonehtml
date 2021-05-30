tempApp.controller('ctr_csChannelTypeList', function($scope,
		$state,http,EzConfirm,messageFactory) {
	
	$scope.option = 1;
	$scope.selectNode = {'id':0};
	/**
	 * 选择类别
	 */
	$scope.select = function(){
		
		/*if ($scope.selectNode.level == 1) {
			$('.js_edit').prop("checked", true);
			$scope.option = 2;
		}
		*/
		
		if ($scope.selectNode.id == "") {
			document.getElementById('catName').value = "";
			document.getElementById('catName2').value = "";
			document.getElementById('catName3').value = "";
		} else {
			document.getElementById('catName').value = $scope.selectNode.name;
			document.getElementById('catName2').value = $scope.selectNode.name;
			document.getElementById('catName3').value = $scope.selectNode.name;
		}

	}
	
	// 保存信息
	$scope.editOrAdd = function(){	
		// console.log($scope.selectNode);
		/*if (!$scope.selectNode) {
			messageFactory.showMessage('error',"请选择要操作的数据");
			return false;
		}*/
		
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			
			// $state.go("index.cschannelTypeList",{},{reload:true});
			$state.reload('index.cschannelTypeList');
			// queryCsCategory();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var name = document.getElementById('catName').value;

		if($scope.option == 2 || $scope.option == 3){
			name = document.getElementById('catNameNew').value;
		}
		
		var pattern = new RegExp("[`~!%@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") ;		
		if (pattern.test(name) || $.trim(name) == "") {
			messageFactory.showMessage('error',"名字不能为空,也不能为特殊字符");
			return false;
		}
		
		
		var data = {};
		if ($scope.option == 2){
			if ($scope.selectNode.level == 1) {
				messageFactory.showMessage('error',"二级分类下不能添加分类了");
				// $scope.option = 1;
				return false;
			}
			var	msg = '您确定添加本条记录吗？';
			data = {"cct_name":name,'cct_parentid':$scope.selectNode.id};
		} 
		if ($scope.option == 3){
			var	msg = '您确定添加本条记录吗？';
			data = {"cct_name":name,'cct_parentid':$scope.selectNode.pId};
		}
		if ($scope.option == 1){
			var	msg = '您确定修改本条记录吗？';
			if(!$scope.selectNode.id){
				messageFactory.showMessage('error',"请选择要修改的数据！");
				return;
			}
			data = {"cct_name":name,'cct_id':$scope.selectNode.id}
		}
		var url = "/admin/customer/csChannelTypeControl/update.action";
		
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
		
	}
	
	
	/**
	 * 删除
	 */
	$scope.toDelete = function(){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			// $state.go("index.cschannelTypeList",{},{reload:true});
			$state.reload('index.cschannelTypeList');
			
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'cct_id':$scope.selectNode.id}
		var url = "/admin/customer/csChannelTypeControl/remove.action";
		var	msg = '您确定修改本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	
	// 选择操作方式
	$scope.chooseOpt = function(opt){
		if ($scope.selectNode!= undefined && opt == 2 && $scope.selectNode.level == 1) {
			messageFactory.showMessage('error',"二级分类下不能再添加分类了");
			$scope.option = 1;
			$(".js_edit").prop("checked",true);

		} else {
			$scope.option = opt;
		}
	}
	
	$scope.stripscript = function(s) 
	{ 
		var pattern = new RegExp("[`~!%@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
		var rs = ""; 
		for (var i = 0; i < s.length; i++) { 
			rs = rs+s.substr(i, 1).replace(pattern, ''); 
		} 
		return rs; 
	}
	$scope.isEdit = false;//编辑按钮
	$scope.isAdd = false;//添加按钮
})