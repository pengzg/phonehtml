tempApp.controller('ctr_csCustomerList', function($scope,
		$state,http,EzConfirm,messageFactory) {
	$scope.pager = {page:1,rows:'10',sort:'cc_id',order:'desc',pageList:['10','20','30']};
	$scope.searchParam = {};
	$scope.showTree = 1;
	$scope.vo = {};
	$scope.checkedIds = "";
	$scope.searchParam.cc_islocation = "";
	$scope.isPassWord = false;
	$scope.searchParam.isBindLine='';
	$scope.bindName='全部';
	$scope.cwState = 1;
	
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
	
	var queryPriceGrade = function(){
		var url = "/admin/goods/gsPriceGradeControl/queryItem.action";
		var success = function(result){
			$scope.priceGradeItemList = result.data;
			for(x in $scope.csCustomerList){
				for(y in result.data){
					if($scope.csCustomerList[x].cc_goods_gradeid==result.data[y].gpg_id){
						$scope.csCustomerList[x].cc_goods_gradeid_nameref = result.data[y].gpg_title;
					}
				}
			}
		}
		if($scope.priceGradeItemList){
			for(y in $scope.priceGradeItemList){
				for(x in $scope.csCustomerList){
					for(y in $scope.priceGradeItemList){
						if($scope.csCustomerList[x].cc_goods_gradeid==$scope.priceGradeItemList[y].gpg_id){
							$scope.csCustomerList[x].cc_goods_gradeid_nameref = $scope.priceGradeItemList[y].gpg_title;
						}
					}
				}
			}
		}else{
			http.post(url,{},success,function(){});
		}
		
	}
	
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
			queryPriceGrade();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		$scope.searchParam.cc_type_str = "1,2";
		var url = '/admin/customer/csCustomerControl/dataGrid.action';
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
			if($scope.selectNode==undefined||$scope.selectNode.id==''||$scope.selectNode.pId==null){
				messageFactory.showMessage('error',"请选择客户类别");
				return;
			}else if($scope.selectNode.level!=1){
				messageFactory.showMessage('error',"请选择第二级客户类别");
				return;
			}
			$scope.dialogTitle = '客户添加';
			$scope.vo = {};
			$scope.vo.cc_visiting_cycle = 7;
			$scope.vo.cc_visiting_num = 10;
			$scope.vo.cc_safety_arrears_day = 10;
			$scope.vo.cc_check_account = 5;
			$scope.vo.cc_stats = 1;
			$scope.lineIds = {};
			$(".js_select2").prop("checked",false);//清空 线路选中状态
			$scope.vo.cc_categoryid_nameref = $scope.selectNode.name;
			$scope.vo.cc_categoryid = $scope.selectNode.id;
			$(".js_selectedLines").hide();
			$(".jsInit").click();
			$scope.cwState = 1;
			$scope.showDialog();
		}else{
			$scope.dialogTitle = '客户修改';
			$(".jsInit").click();
			$scope.queryDetail(id);
			$scope.getCustomerCWState(id);
		}
	}
	// 选择线路
	$scope.showSelectLine = function(){
		$(".js_select2").prop("checked",false);
		 $("input.js_select2").not(":disabled").each(function(){		  
		    var selectId = $(this).attr("data-id");
		    
		    if ($.inArray(selectId,$scope.lineIds) != -1) {
		    	$(this).prop("checked",true);
		    }
		  });
		$scope.dialogShow2 = true;
	}
	//设置线路选中状态
	function getLineListChecked(){
		$(".js_select2").prop("checked",false);
		$("input.js_select2").not(":disabled").each(function(){		  
		    var selectId = $(this).attr("data-id");
		    
		    if ($.inArray(selectId,$scope.lineIds) != -1) {
		    	$(this).prop("checked",true);
		    }
		  });
	}
	
	// 关闭选择线路
	$scope.closeSelectLine = function(){
		$scope.dialogShow2 = false;
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
			$scope.lineIds = $scope.vo.lineIds.split(',');
			// console.log($scope.lineIds);
			$scope.saleman_name = $scope.vo.bud_name;
			$scope.selectedLines();//显示基本信息下的已选路线
			getLineListChecked();//设置线路checkbox选中状态 根据lineIds
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
			$scope.gcb_after_amount = 0;
			$scope.searchFun();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		$scope.getCheckedIds2();
		
		$scope.vo.lineIds = $scope.checkedIds2;
		
		if (!$scope.vo.cc_visiting_cycle) {
			$scope.vo.cc_visiting_cycle = 7;
		}
		
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
	
	$scope.selectChannel = function(){
		if ($scope.selectNode.check_Child_State != -1) {
			messageFactory.showMessage('error',"客户只能添加在渠道的最未级");
			return false;
		}
		$scope.vo.cc_channelid = $scope.selectNode.id;
		$scope.vo.cc_channelid_nameref = $scope.selectNode.name;
		
		$scope.showBox = false;
		$scope.dialogShow2 = false;
	}
	
	$scope.cancleBtnClick = function() {
		$scope.showBox = false;
		$scope.showArea = false;
	}
	
	// 得到路线列表
	$scope.getBaseLineList = function(){
		var success = function(result){
			$scope.baseLineList = result.data;
		}
		
		var url = "/admin/base/baseLineControl/queryBaseLineItem.action";
		
		http.post(url,{},success,null);
	}	
	$scope.getBaseLineList();
	
	// 得到业务员
	$scope.getUserdocList = function(){
		var success = function(result){
			$scope.userdocList = result.data;
		}
		
		var url = "/admin/base/baseUserdocControl/queryBaseUserdoc.action";
		http.post(url,{"su_usertype_str":"1,2,4"},success,null);
	}	
	$scope.getUserdocList();
	
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
	
	// 得到已经选中的线路
	$scope.getCheckedIds2 = function()
	{
	  $scope.checkedIds2 = "";
	  var ids = [];
	  $("input.js_select2:checked").not(":disabled").each(function(){		  
	    var selectId = $(this).attr("data-id");	
	   //  console.log(selectId);
	    ids.push(selectId);
	  });
	  $scope.checkedIds2 = ids.join(',');
	}
	
	// 确定选择线路
	$scope.subSelectLine = function(){
		$scope.getCheckedIds2();
		$scope.dialogShow2 = false;
		$scope.lineIds = $scope.checkedIds2.split(',');
		$scope.selectedLines();
		
		
	}
	// 取消选择线路
	$scope.cancelSelectLine = function(){
		// $scope.getCheckedIds();
		$scope.dialogShow2 = false;
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
	// 显示已经选中的线路
	$scope.select = function(){
		 $("input.js_select2").not(":disabled").each(function(){		  
		    var selectId = $(this).attr("data-id");
		    
		    if ($.inArray(selectId,$scope.lineIds) != -1) {
		    	$(this).prop("checked",true);
		    } else {
		    	$(this).prop("checked",false);
		    }
		  });
	}
	
	// 显示已经选中的
	$scope.selectedLines = function(){
		$(".js_selectedLines").each(function(){		  
		    var selectId = $(this).attr("data-id");
		    if ($.inArray(selectId,$scope.lineIds) == -1) {
		    	// console.log("隐藏"+selectId);
		    	$(this).hide();
		    } else {
		    	$(this).show();
		    }
		  });
	}
	// 删除选中的线路
	$scope.delLine = function(bl_id){
		
		//console.log(bl_id+"将要被删除");
		//console.log($scope.lineIds);
		var arr = $scope.lineIds
		arr.splice($.inArray(bl_id+"",arr),1);

		$scope.lineIds = arr;
		$scope.selectedLines();
		$scope.select();		
	}
	
	// 选择业务员
	$scope.choseUserdoc = function(x){
		$scope.saleman_name = x.bud_name;
		$scope.vo.cc_salesmanid = x.su_id;
	}
	
	$scope.deleteUserdoc = function(){
		$scope.saleman_name = "";
		$scope.vo.cc_salesmanid = 0;
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
	
	// 批量修改类别
	$scope.changeCategoryBatch = function(){
		$scope.getCheckedIds();
		// console.log($scope.checkedIds);
		
		if (!$scope.checkedIds) {
			messageFactory.showMessage('error',"请选择客户");
			return false;
		}
		$scope.showSelectCategory = true;
		$scope.dialogShow5 = true;
	}
	
	$scope.selectCsCategory = function(){
		$scope.to_cc_categoryid = $scope.selectNode.id;
	}
	
	$scope.changeCategory = function() {
		if ($scope.to_cc_categoryid ==0 || $scope.to_cc_categoryid == undefined) {
			messageFactory.showMessage('error',"请选择类别");
			return false;
		}
		var success = function(result){
			messageFactory.showMessage('success',"操作成功");
			$scope.showSelectCategory = false;
			$scope.dialogShow5 = false;
			$(".js_select").prop("checked",false);
			$scope.to_cc_categoryid = 0;
			queryCsCustomer();
		}
		var error = function(result){
			messageFactory.showMessage('error',"操作失败");
			$(".js_select").prop("checked",false);
			$scope.to_cc_categoryid = 0;
		}
		
		
		var data ={'cc_id_str':$scope.checkedIds, "category_id":$scope.to_cc_categoryid}
		var url = "/admin/customer/csCustomerControl/updateCategory.action";
		var	msg = '您确定修改吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
		
	}
	
	$scope.cancelChangeCategory = function(){
		$scope.showSelectCategory = false;
		$scope.dialogShow5 = false;
		$(".js_select").prop("checked",false);
		$scope.to_cc_categoryid = 0;		
	}
	$scope.showArea = false;
	$scope.selectArea = function(){
		$scope.vo.cc_areaid = $scope.vo.selectNode.id;
		$scope.vo.cc_areaid_nameref = $scope.vo.selectNode.name;
		$scope.showArea = false;
	}
	
	/**
	 * 查询价格等级列表
	 */
	$scope.queryPriceGradeList = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.priceGradeList = result.data;			
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		var url = '/admin/goods/gsPriceGradeControl/queryPriceGradeList.action';
		http.post(url,null,success,error);
	}
	$scope.queryPriceGradeList();
	
	// 批量修改价格等级
	$scope.changePriceBatch = function(){
		$scope.getCheckedIds();
		// console.log($scope.checkedIds);
		
		if (!$scope.checkedIds) {
			messageFactory.showMessage('error',"请选择客户");
			return false;
		}		
		$scope.dialogShow3 = true;
	}
	
	$scope.closeShow3 = function(){
		$scope.dialogShow3 = false;
	}
	
	$scope.subSelectPriceId = function(){		
		
		if ($scope.priceId =='' || $scope.priceId == undefined) {
			messageFactory.showMessage('error',"请选择价格等级");
			return false;
		}
		// console.log($scope.vo.cc_id);
		if ($scope.vo.cc_id != undefined && $scope.vo.cc_id !="") {
			$scope.vo.cc_goods_gradeid = $scope.priceId;
			for(y in $scope.priceGradeItemList){
				if($scope.vo.cc_goods_gradeid==$scope.priceGradeItemList[y].gpg_id){
					$scope.vo.cc_goods_gradeid_nameref = $scope.priceGradeItemList[y].gpg_title;
				}
			}
			$scope.dialogShow3 = false;
			return false;
		}
		
		var success = function(result){
			messageFactory.showMessage('success',"操作成功");
			$scope.dialogShow3 = false;
			queryCsCustomer();
		}
		var error = function(result){
			messageFactory.showMessage('error',"操作失败");
		}
		
		
		var data ={'cc_id_str':$scope.checkedIds, "cc_goods_gradeid":$scope.priceId}
		var url = "/admin/customer/csCustomerControl/updatePriceGrade.action";
		var	msg = '您确定修改吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
	}
	
	
	$scope.chooseGrade = function(x) {
		$scope.searchParam.searchAreaid = "";
		$scope.searchParam.cc_categoryid = "";
		$scope.searchParam.cc_goods_gradeid = x.gpg_id;
		queryCsCustomer();
	} 
	
	/**
	 * 查询仓库
	 */
	$scope.storePager =  {page:1,rows:'10',sort:'bs_id',order:'desc','searchKey':''};
	$scope.getStoreHouse = function(){
		
		var success = function(result){
			$scope.storeHouseList = result.data.rows;
			$scope.storePager.total=result.data.total;
			$scope.storePager.pageTotal = Math.ceil($scope.storePager.total/$scope.storePager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			
		}
		var url = '/admin/base/baseStorehouseControl/queryStorehouse.action';
		http.post(url,$.extend({'dateType':'datagrid'},$scope.storePager),success,error);
	
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
	
	/**
	 * 更新商城
	 */
	$scope.updateAccount = function(x,$event){
		
		if (x.isShopAccount=="N") {
			messageFactory.showMessage('error',"公司没有开通商城功能，请到[设置][基础信息][公司信息]开通商城账号功能，再进行此操作");
			return ;
		}
		
		if (!x.cc_contacts_mobile) {
			messageFactory.showMessage('error',"联系电话不能为空");
			return ;
		}
		
		var success = function(result){
			if (x.cc_isaccount == "N") {
				//setInterval(function(){
					$scope.isPassWord = true;
					$scope.account = x.cc_contacts_mobile;
					$scope.pass = "123456";
					$scope.name = x.cc_name;
				// }, 2000);
				// $scope.isPassWord = false;
			} else {
				messageFactory.showMessage('success',"操作成功");
			}
			queryCsCustomer();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		var url = "/admin/customer/csCustomerControl/updateOpenAccount.action";
		var	msg = '您确定要修改吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, {"cc_id":x.cc_id}, success, error);
		}, function() {

		});
	}
	
	$scope.closePassWord = function() {
		$scope.isPassWord = false;
		$scope.account = "";
		$scope.pass = "123456";
		$scope.name = "";
	}
	// $scope.isPassWord = true;
	
	
	/**
	 * 得到客户余额
	 */
	$scope.getCustomerCWState = function(customerId){
		var success = function(result){
			$scope.cwState = result.data;			
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'customerId':customerId}
		var url = "/admin/gl/balance/glCustBalanceControl/getCustomerCWState.action";
				
		http.post(url, data, success, error);
	}
})