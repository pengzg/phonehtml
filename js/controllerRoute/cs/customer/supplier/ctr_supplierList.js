tempApp.controller('ctr_supplierList', function($scope,
		$state,http,EzConfirm,messageFactory,$rootScope) {
	$scope.pager = {page:1,rows:'10',sort:'cc_id',order:'desc',pageList:['10','20','30']};
	$scope.stateList = [{"id":"","name":"全部"},{"id":1,"name":"启用"},{"id":0,"name":"禁用"}];
	$scope.searchParam = {};
	$scope.showTree = 1;
	$scope.vo = {};
	$scope.checkedIds = "";
	$scope.searchParam.cc_islocation = "";
	$scope.isPassWord = false;
	$scope.vm = {
			rules : {
				cc_name : {
					required : "客户名字不能为空!"
				},
				
				cc_barcode : {
					required : "客户条码不能为空"					
				},
				cc_contacts_name :{
					required : "联系人不能为空"
				},
				cc_contacts_mobile :{
					required : "联系人电话不能为空",					
					pattern : "手机号不正确请输入11位手机号",				
				},
				cc_check_account :{
					pattern :"日期不正确"
				},
				cc_visiting_cycle :{
					pattern : "请输入0-99以内的数"
				},
				cc_visiting_num :{
					pattern : "请输入0-9999以内的数"
				},
				cc_safety_arrears_day :{
					pattern : "请输入0-9999以内的数"
				},
				cc_safety_arrears_num :{
					pattern : "只能输入非负数"
				}
			}
		};
	
	
	
	/**
	 * 查询数据
	 */
	var queryCsCustomer = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.csCustomerList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		$scope.searchParam.cc_shopid = $rootScope.USER.shopId;
		var url = '/admin/customer/csCustomerControl/dataGrid.action?cc_type=3';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}
	
	/**
	 * 显示添加div
	 */
	$scope.showDialog = function(){
		$(".js_select").prop("checked",false);
		$scope.dialogShow = true;
	}
	
	/**
	 * 关闭添加div
	 */
	$scope.closeDialog = function(){
		$(".js_select").prop("checked",false);
		$scope.dialogShow = false;
	}
	
	/**
	 * 去编辑
	 */
	$scope.toEdit = function(id){
		$(".js_select").prop("checked",false);
		if(id==undefined||id==''){
		
			$scope.dialogTitle = '供应商添加';
			$scope.vo = {};
			$scope.vo.cc_visiting_cycle = 7;
			$scope.vo.cc_visiting_num = 10;
			$scope.vo.cc_safety_arrears_day = 10;
			$scope.vo.cc_check_account = 5;
			$scope.vo.cc_stats = 1;
			$scope.vo.cc_shopid = $rootScope.USER.shopId;
			$scope.showDialog();
		}else{
			$scope.dialogTitle = '供应商修改';
			$scope.queryDetail(id);
		}
	}
	
	
	/**
	 * 查询明细
	 */
	$scope.queryDetail = function(id){
		$scope.lineIds = {};
		var success = function(result){
			$scope.vo = result.data;
			for(y in $scope.priceGradeItemList){
				if($scope.vo.cc_goods_gradeid==$scope.priceGradeItemList[y].gpg_id){
					$scope.vo.cc_goods_gradeid_nameref = $scope.priceGradeItemList[y].gpg_title;
					$scope.vo.cc_goods_gradeid = $scope.priceGradeItemList[y].gpg_id;
				}
			}
			$scope.showDialog();
			messageFactory.closeLoading();
			$scope.saleman_name = $scope.vo.bud_name;
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		messageFactory.showLoading();
		var url = '/admin/customer/csCustomerControl/getDetail.action';
		http.post(url,{cc_id:id},success,error);
	}
	
	/**
	 * 提交保存
	 */
	$scope.submit = function(){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.closeDialog();
			$scope.vo = {};
			$scope.searchFun();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}

		
		$scope.vo.cc_type = 3;
		
		
		
		var name = $scope.vo.cc_name;
		var pattern = new RegExp("[`~!%@#$^&*=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") ;
		
		if (pattern.test(name) || $.trim(name)=="") {
			messageFactory.showMessage('error',"名字不能为空,也不能为特殊字符");
			return false;
		}
		/*if (pattern.test($scope.vo.cc_code) || $.trim($scope.vo.cc_code)=="") {
			messageFactory.showMessage('error',"编号不能为空,也不能为特殊字符");
			return false;
		}*/
		
		var url = '/admin/customer/csCustomerControl/update.action';

			var msg = '您确定添加本条记录吗？';
			if($scope.vo.cc_id!=undefined&&$scope.vo.cc_id!=''){
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
	 * 点击ztree
	 */
	$scope.selectCategory = function(){
		$scope.searchParam.searchAreaid = '';
		$scope.searchParam.cc_goods_gradeid = "";
		$scope.searchParam.cc_categoryid = $scope.selectNode.id;
		
		queryCsCustomer();
	}
	
	
	
	/**
	 * 选择区域
	 */
	$scope.selectAreaSearch = function(obj){
		$scope.searchParam.cc_categoryid = '';
		$scope.searchParam.cc_goods_gradeid = "";
		$scope.searchParam.searchAreaid = obj.id;
		queryCsCustomer();
	}
	
	$scope.upNode = function(nodeId){
		// console.log(nodeId)
	}
	$scope.downNode = function(nodeId){
		// console.log(nodeId)
	}
	/**
	 * 去详情
	 */
	$scope.toDetail = function(id){
		$state.go('index.csCustomerDetail',{cc_id:id})
	}
	
	/**
	 * 添加编辑得到焦点flag
	 */
	$scope.checkFun = function(name,type){
		if(type=='focus'){
			$scope.myform[name+'_flag']=true;
		}
		if(type=='blur'){
			$scope.myform[name+'_flag']=false;
		}
	}
	
	/**
	 * 删除
	 */
	$scope.toDelete = function(id,text){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryCsCustomer();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'cc_id':id}
		var url = "/admin/customer/csCustomerControl/changeStatus.action";
		var	msg = '您确定'+text+'该客户吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	
	/**
	 * 审核 
	 */
	$scope.toCheck = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			queryCsCustomer();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'cc_id':id}
		var url = "/admin/customer/csCustomerControl/updateCheckstats.action";
		var	msg = '您确定修改本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	
	// 点击查询
	$scope.searchFun = function(){
		if($scope.pager.page==1){
			queryCsCustomer();
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
	
	$scope.showSelectChannel = function(){
		$scope.showBox = true;
	}
	
	
	
	
	
	// 得到所有选中的值
	$scope.getCheckedIds = function()
	{
	  $scope.checkedIds = "";
	  var ids = [];
	  $("input.js_select:checked").not(":disabled").each(function(){		  
	    var selectId = $(this).attr("data-id");	
	   //  console.log(selectId);
	    ids.push(selectId);
	  });
	  $scope.checkedIds = ids.join(',');
	}
	
	

	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		
		return newValue;
	},queryCsCustomer);
	
	/**
	 * 显示图片上传
	 */
	$scope.upImage = function($event){
		$scope.ue_myeditor.addListener("beforeInsertImage", function (t, arg) {
			var imgs="";
			for(var i=0;i<arg.length;i++){
				imgs += arg[i].src+"|"+arg[i].title;
				if(i<arg.length-1){
					imgs +=",";
				}
			}
			uploadImgCallBack(imgs);
		});
		var myImage = $scope.ue_myeditor.getDialog("insertimage");
		myImage.open();

	};
	
	/**
	 * 图片上传回调
	 */
	var uploadImgCallBack = function(imgs){
		var imgsArr = imgs.split(",");
		// console.log(imgsArr);
		$scope.imgPath = imgsArr[0].split("|")[0];

		$scope.vo.cc_image = $scope.imgPath;
		
	}
	



	// 显示地图
	$scope.showMap =function(cc_id){
		$scope.cc_id = cc_id;
		$scope.mapShow = true;
	}
	
	// 隐藏地图
	$scope.hideMap = function(){
		$scope.mapShow = false;
		document.getElementById('selectlng').value = "";
		document.getElementById('selectlat').value = "";
	}
	// 更新定位
	$scope.updateLocation = function(){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.hideMap();
			queryCsCustomer();
			
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);			
		}
		
		var lng = document.getElementById('selectlng').value;
		var lat = document.getElementById('selectlat').value;
		if (!lng || !lat) {
			messageFactory.showMessage('error',"定位信息错误");
			return false;
		}
		
		var data ={'cc_id':$scope.cc_id, 'cc_longitude':lng,'cc_latitude':lat}
		var url = "/admin/customer/csCustomerControl/updateLocation.action";
		var	msg = '您确定修改本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
	};
	
	
	// 选择标签
	$scope.tabSelect = function(cc_islocation) {
		
		$scope.tab = cc_islocation;
		$scope.searchParam.cc_islocation = cc_islocation;
		queryCsCustomer();
	}
	
	/**
	 * 得到公司位置
	 */
	$scope.getOrgidLocation = function(){		
		messageFactory.showLoading();
		var success = function(result){
			$scope.location = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		
		var url = '/admin/customer/csCustomerControl/getOrgidLocation.action';
		http.post(url,null,success,error);
	}
	
	$scope.getOrgidLocation();
	

	
	

	


	

	
	$scope.closeShow3 = function(){
		$scope.dialogShow3 = false;
	}
	



	/**
	 * 上一页
	 */
	$scope.prevPage = function(pager,fun){
		if(pager.page==1){
			return;
		}
		pager.page --;
		fun();
	}
	
	/**
	 * 下一页
	 */
	$scope.nextPage = function(pager,fun){
		if(pager.page >= pager.pageTotal){
			return;
		}
		pager.page ++;
		fun();
	}
	
	/**
	 * 选择仓库
	 */ 
	$scope.chooseStore = function(x){
		$scope.vo.cc_depotid = x.bs_id;
		$scope.vo.cc_depotid_nameref = x.bs_name;
		$('.droplistWrap2').hide();
	};
	

})