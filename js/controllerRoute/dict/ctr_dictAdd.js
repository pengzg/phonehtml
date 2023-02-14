tempApp.controller('ctr_dictAdd', function ($scope, $rootScope, $location,
	$state, $timeout, http, $stateParams, EzConfirm, $compile, dateUtil, messageFactory, $q, $http, $rootScope) {


	$scope.vo = {pm_state:1,pm_dr:1};
	$scope.picList = [];

	$scope._simpleConfig = {
		//这里可以选择自己需要的工具按钮名称,此处仅选择如下五个

		//focus时自动清空初始化时的内容
		autoClearinitialContent: true,
		//关闭字数统计
		wordCount: true,
		//关闭elementPath
		/* elementPathEnabled: false,
		 retainOnlyLabelPasted:true,
		 pasteplain:true,
		 filterTxtRules://默认值：
			 function() {
				function transP(node) {
					node.tagName = 'p';
					node.setStyle();
				}
				return {
					//直接删除及其字节点内容
					'-': 'script style object iframe embed input select',
					'p': {
						$: {}
					},
					'br': {
						$: {}
					},
					'div': {
						'$': {}
					},
					'li': {
						'$': {}
					},
					'caption': transP,
					'th': transP,
					'tr': transP,
					'h1': transP,
					'h2': transP,
					'h3': transP,
					'h4': transP,
					'h5': transP,
					'h6': transP,
					'td': function(node) {
						//没有内容的td直接删掉
						var txt = !! node.innerText();
						if (txt) {
							node.parentNode.insertAfter(UE.uNode.createText('    '), node);
						}
						node.parentNode.removeChild(node, node.innerText())
					}
				}
			}(),*/
	};


	

	
	

	/**
	 * 查询
	 */
	 $scope.getDetail = function(){
		messageFactory.showLoading();
		var success = function(result){
            $scope.vo = result.data;
           
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/dict/dictMainControl/getDetail';
		http.post(url,{"dm_id":$scope.dm_id},success,error);
	}

    if ($stateParams.dm_id != undefined && $stateParams.dm_id) {
        $scope.dm_id = $stateParams.dm_id;
        $scope.getDetail();
    }

   

	/**
	 * 保存
	 */
	$scope.submit = function () {
	
		$scope.vo.pm_releasedate = $("#start_date").val();
		var success = function (result) {
			messageFactory.showMessage('success', '提交成功');
			$scope.goBack();
			$scope.dataList = [{}];
			$scope.subTotal = 0;
		}
		var error = function (result) {
			messageFactory.showMessage('error', result.desc);
		}

		$scope.vo.attListStr = JSON.stringify($scope.picList);
		$scope.vo.picList = "";
		EzConfirm.create({
			heading: '提示',
			text: "您确定提交吗？"
		}).then(function () {
			var url = "/admin/dict/dictMainControl/update";
			http.post(url,  $scope.vo, success, error);
		}, function () {

		});
	}



	$scope.goBack = function(){
		$state.go("index.dict.dictList");
	}
})