tempApp.controller('ctr_posterList', ['$scope','$state','EzConfirm','messageFactory','http'
    ,function($scope,$state,EzConfirm,messageFactory,http) {
	
    $scope.pager = {page:1,rows:'10',sort:'mf_addtime',order:'desc',pageList:['10','20','30']};
    $scope.searchParam = {};
    $scope.queryFlyerList = function(){
    	messageFactory.showLoading();
		var success = function(result){
			$scope.flyerList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total
					/$scope.pager.rows);
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/flyer/marketingFlyerControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,
				$scope.searchParam),success,error);
    }
    
    /**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+
		' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		return newValue;
	},$scope.queryFlyerList);
    
	$scope.searchFlyerList = function(){
		if($scope.pager.page==1){
			$scope.queryFlyerList();
		}else{
			$scope.pager.page = 1;
		}
	}
    
    
    
    
    $scope.preview = function(){
        $('#myModal2').modal('show');
    }
	
    $scope.titleData = '年货促销专题<span class="tag" contenteditable="false">分享人昵称</span>';
    $scope.contentData = '这是我制作的H5微传单，快来看看！';
    $scope.addNick = function(){
        $scope.titleData += '<span class="tag" contenteditable="false">分享人昵称</span>';
    } 
    $scope.addTimes = function(){
        $scope.titleData += '<span class="tag" contenteditable="false">访问次数</span>';
    }
    $scope.addNick2 = function(){
        $scope.contentData += '<span class="tag" contenteditable="false">分享人昵称</span>';
    } 
    $scope.addTimes2 = function(){
        $scope.contentData += '<span class="tag" contenteditable="false">访问次数</span>';
    }
    $scope.goEditModal = function(){
        $('#myModal2').on('hidden.bs.modal', function (e) {
            $state.go('index.addActivityDetail_poster');
        })
        $('#myModal2').modal('hide');
    }
    $scope.goEdit = function(){
        $state.go('index.addActivityDetail_poster');
    }
    $scope.stop = function(){
        EzConfirm.create({
            heading : '提示',
            text : "您确定删除吗？"
        }).then(function() {
           
        }, function() {
            
        });
    }
    $scope.pause = function(){
        EzConfirm.create({
            heading : '提示',
            text : "您确定暂停吗？"
        }).then(function() {
           
        }, function() {
            
        });
    }

    $scope.goData = function(){
        $state.go('index.posterData.costEvaluate');
    }

    $scope.goResult = function(){
        $state.go('index.posterResult.propagationAnalysis');
    }

    var demoAddress = location.origin + '/dist/#/poster';
    $('#qrcodeImg').qrcode({width:200,height:200,correctLevel:0,text:demoAddress});
    
}])