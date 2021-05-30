tempApp.controller('ctr_csCategoryList', function($scope,
		$state,http,EzConfirm,messageFactory) {
	
	$scope.option = 1;
	$scope.selectNode = {'id':0};
	/**
	 * 选择类别
	 */
	$scope.selectCategory = function(){
		// console.log($scope.selectNode);
		
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
		/*if (!$scope.selectNode) {
			messageFactory.showMessage('error',"请选择要操作的数据");
			return false;
		}*/
		
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			
			// $state.go("index.cscategoryList",{},{reload:true});
			$state.reload('index.cscategoryList');
			// queryCsCategory();
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
		if ($scope.option == 2){
			
			if ($scope.selectNode.level == 1) {
				messageFactory.showMessage('error',"二级分类下不能添加分类了");
				// $scope.option = 1;
				return false;
			}
			$scope.selectNode.level = $scope.selectNode.level?$scope.selectNode.level:0;
			data = {"cc_name":name,'cc_parentid':$scope.selectNode.id,"cc_level":$scope.selectNode.level+1};
			var	msg = '您确定添加本条记录吗？';
		} 
		if ($scope.option == 3){
			$scope.selectNode.level = $scope.selectNode.level?$scope.selectNode.level:0;
			data = {"cc_name":name,'cc_parentid':$scope.selectNode.pId,"cc_level":$scope.selectNode.level};
			var	msg = '您确定添加本条记录吗？';
		} 
		if ($scope.option == 1){
			var	msg = '您确定修改本条记录吗？';
			if(!$scope.selectNode.id){
				messageFactory.showMessage('error',"请选择要修改的数据！");
				return;
			}
			data = {"cc_name":name,'cc_id':$scope.selectNode.id}
		}
		var url = "/admin/customer/csCategoryControl/update.action";
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
			// $state.go("index.cscategoryList",{},{reload:true});
			$state.reload('index.cscategoryList');
			// queryCsCategory();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'cc_id':$scope.selectNode.id}
		var url = "/admin/customer/csCategoryControl/delete.action";
		var	msg = '您确定删除本条记录吗？';
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
	
	$scope.config={  
            //初始化编辑器内容  
            content : '<p>test1</p>',  
            //是否聚焦 focus默认为false  
            focus : true,  
            //首行缩进距离,默认是2em  
            indentValue:'2em',  
            //初始化编辑器宽度,默认1000  
            initialFrameWidth:1000,  
            //初始化编辑器高度,默认320  
            initialFrameHeight:320,  
            //编辑器初始化结束后,编辑区域是否是只读的，默认是false  
            readonly : false ,  
            //启用自动保存  
            enableAutoSave: false,  
            //自动保存间隔时间， 单位ms  
            saveInterval: 500,  
            //是否开启初始化时即全屏，默认关闭  
            fullscreen : false,  
            //图片操作的浮层开关，默认打开  
            imagePopup:true,       
            //提交到后台的数据是否包含整个html字符串  
            allHtmlEnabled:false,                
            functions :['insertimage']       
    };  
    $scope.isEdit = false;//编辑按钮
	$scope.isAdd = false;//添加按钮
	
})