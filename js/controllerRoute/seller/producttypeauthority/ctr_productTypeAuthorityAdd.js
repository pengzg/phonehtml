tempApp.controller('ctr_productTypeAuthorityAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory,$rootScope) {

	$scope.dataList = [{}];
	$scope.typeList = [];
    if ($stateParams.shopId != undefined) {
    	$scope.shopId = $stateParams.shopId;
    }
    
    /**
     * 详情
     */
    $scope.pager = {"page":1, "rows":30, "sort":"pta_ts", "order":"desc"};
    $scope.getDetail = function() {
		for (x in $scope.typeList) {
			$scope.typeList[x].checked = false;
		}
		//$scope.typeList = [];
    	messageFactory.showLoading();
		var success = function(result){
			
			if (result.data.rows.length>0) {
				$scope.dataList = result.data.rows;
				for (x in $scope.typeList) {
					for (y in $scope.dataList) {
						if ($scope.dataList[y].pta_typeid == $scope.typeList[x].pt_id) {
							$scope.typeList[x].checked = true;
						} 
					}
				}
				console.log($scope.typeList);
			} else {
				$scope.dataList= [{}];
			}
			

			
			messageFactory.closeLoading();
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var data = {"pta_shopid":$scope.shopId,"pta_dr":1};
		var url = '/admin/product/productTypeAuthorityControl/dataGrid.action';
		http.post(url,$.extend(data,$scope.pager),success,error);
    }
    
    if ($scope.shopId) {
    	$scope.getDetail();
    }
	



	
	$scope.submit = function(){
		var success = function(result){
			messageFactory.showMessage('success','提交成功');
			$scope.goBack();
		}
		var error = function(){
			messageFactory.showMessage("error", result.desc);
			$scope.goBack();
		}
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/product/productTypeAuthorityControl/update.action";
			http.post(url,{"typeid_str": $scope.getCheckedIds, "pta_shopid":$scope.shopId},success,error);
		}, function() {

		});
		
    	
    }

    /**
     * 得到类型列表
     */
    $scope.pager = {"page":1, "rows":30, "sort": "pt_dr" ,"order":"desc", "pt_dr":1};
    $scope.getTypeList = function(){
		var success = function(result){
			$scope.typeList = result.data.rows;
		}
		var error = function(){
			
		}
		
		var url = "/admin/product/productTypeControl/dataGrid.action";
		http.post(url,$scope.pager,success,error);
    	
    }
	$scope.getTypeList();
	
	/**
	 * 得到经销商列表
	 */
	$scope.pager2 = {"page":1, "rows":100, "sort":"ms_id", "order":"desc"};
    $scope.getShopList = function(){
		var success = function(result){
			$scope.shopList = result.data.rows;
			$scope.shopList.unshift({"ms_id":"", "ms_name":"请选择经销商"});
		}
		var error = function(){
			
		}
		
		var url = "/admin/member/memberShopControl/dataGrid.action";
		http.post(url,$scope.pager2,success,error);
    	
    }
	$scope.getShopList();
   
	$scope.getCheckedIds = function()
	{
	  $scope.checkedIds = "";
	  var ids = [];
	  $("input.js_type:checked").not(":disabled").each(function(){		  
	    var selectId = $(this).attr("data-id");	
	   //  console.log(selectId);
	    ids.push(selectId);
	  });
	  return ids.join(',');
	}


	/**
	 * 返回
	 */
	$scope.goBack = function(){
		$state.go("index.seller.producttypeauthority");
	}

})