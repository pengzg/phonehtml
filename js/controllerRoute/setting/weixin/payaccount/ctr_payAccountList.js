tempApp.controller('ctr_payaccount', function($scope,
		$state,http,EzConfirm,messageFactory) {
	$scope.pager = {page:1,rows:'20',sort:'wp_id',order:'desc',pageList:['10','20','30']};
	$scope.searchParam = {};
	$scope.vo = {};
	
	$scope.vm = {
			rules : {
				bd_title : {
					required : "名称不能为空"
				}
			}
		};
	
	/**
	 * 显示添加div
	 */
	$scope.showDialog = function() {
		$scope.dialogShow = true;
	}

	/**
	 * 关闭添加div
	 */
	$scope.closeDialog = function() {
		$(".w5c-error").remove();
		$scope.dialogShow = false;
		$scope.vo = {};
	}
	
	/**
	 * 查询数据
	 */
	var queryBaseBrand = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.baseBrandList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/base/weixinPayaccountControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}
	
	/**
	 * 条件查询
	 */
	$scope.doSearch = function(){
		if($scope.pager.page!=1){
			$scope.pager.page = 1;
		}
		queryBaseBrand();
	}
	
	/**
	 * 去编辑
	 */
	$scope.toEdit = function(id){
		if (id == undefined || id == '') {
			$scope.dialogTitle = '添加';
			$scope.vo.wp_state = "1";
		} else {
			$scope.dialogTitle = '修改';
			$scope.queryDetail(id);
		}
		$scope.showDialog();
	}
	
	/**
	 * 查询明细
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
		var url = '/admin/base/weixinPayaccountControl/getDetail.action';
		http.post(url,{wp_id:id},success,error);
	}
	
	/**
	 * 添加品牌信息
	 */
	$scope.createBrand = function() {
		if (!$scope.vo.wp_name) {
			messageFactory.showMessage('error', "请输入支付账号名称");
			return false;
		}
		if (!$scope.vo.wp_mchid) {
			messageFactory.showMessage('error', "请输入微信商户号");
			return false;
		}
		if (!$scope.vo.wp_key) {
			messageFactory.showMessage('error', "请输入API密钥");
			return false;
		}
		if (!$scope.vo.wp_certpassword) {
			messageFactory.showMessage('error', "请输入证书密码");
			return false;
		}
		
		var success = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('success', result.desc);
			$scope.searchFun();
			$scope.vo = {};
			$scope.closeDialog();
		}
		var error = function(result) {
			messageFactory.closeLoading();
			messageFactory.showMessage('error', result.desc);
		}

		var url = "/admin/base/weixinPayaccountControl/update.action";
		var msg = '您确定添加本条记录吗？';
		//console.log($stateParams.bc_id);
		if($scope.vo.wp_id != undefined && $scope.vo.wp_id != ''){
			msg = '您确定修改本条记录吗？';
		}

		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			http.post(url, $scope.vo, success, error);
		}, function() {

		});
	
		
	}
	
	/**
	 * 去详情
	 */
	$scope.toDetail = function(id){
		$state.go('index.baseBrandDetail',{wp_id:id})
	}
	
	/**
	 * 删除
	 */
	$scope.toDelete = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryBaseBrand();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var data ={'wp_id':id}
		var url = "/admin/base/weixinPayaccountControl/remove.action";
		var	msg = '您确定删除本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			queryBaseBrand();
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
		return newValue;
	},queryBaseBrand);
})