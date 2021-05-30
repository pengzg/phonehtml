tempApp.controller('ctr_baseStorehouseList', function($scope,
		$state,http,EzConfirm,messageFactory,$rootScope) {
	$scope.pager = {page:1,rows:'20',sort:'bs_id',order:'desc',pageList:['10','20','30'],bs_shopid:$rootScope.USER.shopId};
	$scope.searchParam = {};
	$scope.vo = {};
	
	$scope.vm = {
			rules : {
				bud_deptid : {
					required : "部门名称不能为空"
				},
				bs_name : {
					required : "仓库名称不能为空",
					/*number : "必须输入数字",
					maxlength : "该选项输入值长度不能大于{maxlength}",
					minlength : "该选项输入值长度不能小于{minlength}",
					max : "该选项输入值不能大于{max}",
					min : "该选项输入值不能小于{min}"*/
				},
				bs_code :{
					required : "编号不能为空",
					pattern : "输入正确的编号或车号"
				},
				bs_length:{
					number : "必须输入数字",
					maxlength : "该选项输入值长度不能大于{maxlength}",
					pattern:"格式输入不正确！"
				},
				bs_tonnage:{
					number : "必须输入数字",
					maxlength : "该选项输入值长度不能大于{maxlength}",
					pattern:"格式输入不正确！"
				}
				/*bud_native_place :{
					required : "籍贯不能为空"
				},
				bud_post : {
					required : "职务不能为空"
				},
				bud_mobile : {
					required : "联系电话不能为空",
					number : "必须输入数字",
					maxlength : "该选项输入值长度不能大于{maxlength}",
				}*/
			}
		};
	
	/**
	 * 查询数据
	 */
	var queryBaseStorehouse = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.baseStorehouseList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		
		$scope.searchParam.bs_type_arr = "1,2,3";
		var url = '/admin/base/baseStorehouseControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
//		http.post(url,$scope.pager,success,error);
	}
	
	/**
	 * 去编辑
	 */
	/*$scope.toEdit = function(id){
		$state.go('index.baseStorehouseAdd',{bs_id:id})
	}*/
	
	/**
	 * 去详情
	 */
	$scope.toDetail = function(id){
		$state.go('index.baseStorehouseDetail',{bs_id:id})
	}
	
	/**
	 * 删除
	 */
	$scope.toDelete = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryBaseStorehouse();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'bs_id':id}
		var url = "/admin/base/baseStorehouseControl/delete.action";
		var	msg = '您确定修改本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	
	/**
	 * 条件查询
	 */
	$scope.doSearch = function(){
		$scope.searchParam.searchKey = $scope.searchKey;
		if($scope.pager.page!=1){
			$scope.pager.page = 1;
		}
		queryBaseStorehouse();
	}
	
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			queryBaseStorehouse();
		}else{
			$scope.pager.page = 1;
		}
	}
	
	/**
	 * 排序方法
	 */
	$scope.sortFun = function(name,flag){
		if(!flag){
			return 'colorCenter noSortCss';
		}
		if($scope.pager.sort==name&&$scope.pager.order=='asc'){
			return 'SortAscCss'
		}
		if($scope.pager.sort==name&&$scope.pager.order=='desc'){
			return 'SortDescCss'
		}
	}
	
	/**
	 * 点击切换排序
	 */
	$scope.clickSortFun = function(name){
		if($scope.pager.sort!=name){
			$scope.pager.sort = name;
			$scope.pager.order = 'asc';
		}
		if($scope.pager.sort==name){
			if($scope.pager.order=='asc'){
				$scope.pager.order = 'desc';
			}else{
				$scope.pager.order = 'asc';
			}
		}
	}
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		/*for(var x in $scope.searchParam){
			newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		}*/
		return newValue;
	},queryBaseStorehouse);
	
	/**
	 * 显示添加弹框
	 */
	$scope.showDialog = function(){
		$scope.vo.bs_stats = '1';
		$scope.vo.bs_type = '1';
		$scope.vo.bs_stock_status = 'Y';
		$scope.vo.bs_is_negative = '0';
		$scope.vo.bs_is_virtual = '0';
		$scope.vo.bs_name = '';
		$scope.vo.bs_code = '';
		$scope.vo.bs_length = '';
		$scope.vo.bs_tonnage = '';
		$scope.vo.bs_id = '';
		$scope.dialogShow = true;
	}
	
	/**
	 * 关闭添加弹框
	 */
	$scope.closeDialog = function(){
		$(".w5c-error").remove();
		$scope.dialogShow = false;
	}
	
	//新增和修改仓库
	$scope.toEdit = function(id,type){
		if(id==undefined || id == ''){
			$scope.dialogTitle = '添加仓库';
			$scope.showDialog();
		}else{
			$scope.dialogTitle = '编辑仓库';
			$scope.queryDetail(id);
			$scope.showDialog();
		}
	}
	
	/**
     * 新增仓库完成
     */
    $scope.addcomplete = function(bs_id,bs_code){
    	
    	if (!$scope.vo.bs_name) {
			messageFactory.showMessage('error',"请输入仓库名称");
			return false;
		}
    	$scope.vo.bs_stats = $("input[name='bs_stats']:checked").val();//状态
    	$scope.vo.bs_type = $("input[name='bs_type']:checked").val();//是否主仓库 1:主  2:车
    	if($scope.vo.bs_type == 2){
    		if(bs_code == '' || bs_code == undefined){
    			$scope.vo.bs_code = $scope.vo.bs_name;
    		}
    		if($scope.vo.bs_length == "" ){
        		$scope.vo.bs_length = '0';
        	}
        	if($scope.vo.bs_tonnage == ""){
        		$scope.vo.bs_tonnage = '0';
        	}
    	}else{
    		if(bs_code == '' || bs_code == undefined){
    			$scope.vo.bs_code = $scope.vo.bs_name;
    			$scope.vo.bs_length = '';
    			$scope.vo.bs_tonnage = '';
    		}
    	}
    	
    	
    	var success = function(result){
    		messageFactory.closeLoading();
    		messageFactory.showMessage('success',result.desc);
    		$scope.vo={};
			$scope.closeDialog();
			$scope.searchFun();
    	}
    	
    	var error = function(result){
    		messageFactory.showMessage('error',result.desc);
    		messageFactory.closeLoading();
    		/*$scope.closeDialog();*/
    	}
    	
		var url = "/admin/base/baseStorehouseControl/update.action" ;
			var msg = '您确定添加本条记录吗？';
			//console.log($stateParams.bc_id);
			if(bs_id != undefined && bs_id != ''){
				msg = '您确定修改本条记录吗？';
			}
			EzConfirm.create({
				heading : '提示',
				text : msg
			}).then(function() {
				messageFactory.showLoading();
				http.post(url, $scope.vo, success, error);
			}, function() {

			});
    }
    
    /**
	 * 查询仓库明细
	 */
	$scope.queryDetail = function(id){
		var success = function(result){
			$scope.vo = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		messageFactory.showLoading();
		var url = '/admin/base/baseStorehouseControl/getDetail.action';
		http.post(url,{bs_id:id},success,error);
	}
	/**
	 * 删除输入框
	 */
	$scope.delete_input = function(){
		$scope.vo.bs_length = '';
		$scope.vo.bs_tonnage = '';
		$scope.vo.bs_is_virtual = '0';
	}
	
	$scope.agentSaleList = [];
	$scope.agentSalePager = {page:1,rows:'200',"ba_dr":1,sort:'ba_id',order:'desc',"ba_type":3,pageList:['10','20','30']};
	$scope.queryAgentSaleList = function(){

		messageFactory.showLoading();
		var success = function(result){
			$scope.agentSaleList = result.data.rows;
			$scope.agentSaleList.unshift({"ba_id":"","ba_name":"请选择管理员"});

			
		};
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		};
		var url = '/admin/base/baseAgentControl/dataGrid.action';
		http.post(url,$.extend({},$scope.agentSalePager),success,error);
	}
	$scope.queryAgentSaleList();
	
})