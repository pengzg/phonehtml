tempApp.controller('ctr_csLineCustTaskList2', function($scope,
		$state,http,EzConfirm,messageFactory,sessionFactory) {
$scope.pager = {page:1,rows:'10',sort:'cc_id',order:'desc',pageList:['10','20','30']};//客户
$scope.vo = {};
$scope.searchParam = {};
var myDate = new Date();
$scope.vo.startdate = myDate.Format("yyyy-MM-dd");//默认起始查询时间为当前日期
$scope.vo.enddate = myDate.Format("yyyy-MM-dd");//默认终止查询时间为当前日期
$scope.flag= 0;//是否确定选中
/**
 * 获取用户信息
 */
$scope.getUserInfo = function(){
	var calbackFun = function(result){
		$scope.user = result;
	}
	sessionFactory.getUser(calbackFun);
}
$scope.getUserInfo();
/**
/**
 * 查詢報表
 */
$scope.searchFun = function(){
	var url = "/admin/line/csLineCustTaskControl/queryCsLineReport.action";
	$scope.vo.start_time = $('#start_date').val();
	$scope.vo.end_time = $('#end_date').val();
	$scope.vo.orgid = $scope.user.orgid;
	var csMaxGateIds = [];
	var csMinGateIds = [];
	var csIds = [];
	var ChanelMaxGateIds =[];
	var ChanelMinGateIds =[];
	for(var x in $scope.arrCsCg1){
		csMaxGateIds.push($scope.arrCsCg1[x].cc_id);
	}
	for(var x in $scope.arrCsCg){
		csMinGateIds.push($scope.arrCsCg[x].cc_id);
	}
	for(var x in $scope.arrCs){
		csIds.push($scope.arrCs[x].cc_id);
	}
	for(var x in $scope.arrQdCg1){
		ChanelMaxGateIds.push($scope.arrQdCg1[x].cct_id);
	}
	for(var x in $scope.arrQdCg){
		ChanelMinGateIds.push($scope.arrQdCg[x].cct_id);
	}
	var csMaxGateIdsStr = csMaxGateIds.join(",");
	var csMinGateIdsStr = csMinGateIds.join(",");
	var csIdsStr = csIds.join(",");
	var ChanelMaxGateIdsStr = ChanelMaxGateIds.join(",");//渠道大类
	var ChanelMinGateIdsStr = ChanelMinGateIds.join(",");//渠道小类
	$scope.vo.csMaxCategory_str = csMaxGateIdsStr;//客户大类
	$scope.vo.csMinCategory_str = csMinGateIdsStr;//客户小类
	$scope.vo.csIds_str = csIdsStr;//客户
	$scope.vo.chanelMaxCategory_str = ChanelMaxGateIdsStr;//渠道大类
	$scope.vo.chanelMinCategory_str = ChanelMinGateIdsStr;//渠道小类
	var parmter = JSON.stringify($scope.vo);//查询参数对象转换成json字符串
	url = url+"?parmter="+parmter.replace(/"/g,"'");
	CreatePrintViewerEx("100%", "100%", "/views/cs/line/cslinecusttask/salemanLineReport30.grf", url, true, "",'report_holder');
}
	
/**
 * 查询客户大类、小类
 * type=1大类，type=2小类
 */
$scope.queryCsBigSmallCategory = function(type){
	var success = function(result){
		$scope.csCategoryList = result.data;//客户类别
		if(type==2){
			for(var x in $scope.csCategoryList){
				for(var y in $scope.csCategoryList[x].subList){
					for(var z in $scope.arrCsCg){
						if($scope.csCategoryList[x].subList[y].cc_id == $scope.arrCsCg[z].cc_id){
							$scope.csCategoryList[x].subList[y].checkecdCg = true;
						}
					}
				}
			}
		}else{
			for(var x in $scope.csCategoryList){
				for(y in $scope.arrCsCg1){
					if($scope.csCategoryList[x].cc_id == $scope.arrCsCg1[y].cc_id){
						$scope.csCategoryList[x].checkecdCg1 = true;
					}
				}
			}
		}
	}
	var error = function(){
		messageFactory.showMessage('error',result.desc);
	}
	var url='/admin/customer/csCategoryControl/getCsCategoryList.action';
	http.post(url,$.extend({},$scope.searchParam),success,error);
}


/**
 * 添加客户类别
 * type=1 大类  type=2小类
 */
$scope.addCsCategory = function(type){
	if(type==1){
		$scope.arrCsCg1=[];//客户类别大
	}else{
		$scope.arrCsCg=[];//客户类别小
	}
	$("input[name='csCgStatus']:checked").not(":disabled").each(function(){
		var cc_id = $(this).attr("cc_id");
		var cc_name = $(this).attr("cc_name");
		var str = {'cc_id':cc_id,'cc_name':cc_name};
		if(type==2){
			$scope.arrCsCg.push(str);
		}else{
			$scope.arrCsCg1.push(str);
		}
	})
}

/**
 * 查询渠道大类、小类
 * type=1大类，type=2小类
 */
$scope.queryQdBigSmallCategory = function(type){
	var success = function(result){
		$scope.qdCategoryList = result.data;//渠道类别
		if(type==2){
			for(var x in $scope.qdCategoryList){
				for(var y in $scope.qdCategoryList[x].subList){
					for(var z in $scope.arrQdCg){
						if($scope.qdCategoryList[x].subList[y].cct_id == $scope.arrQdCg[z].cct_id){
							$scope.qdCategoryList[x].subList[y].checkecdCg = true;
						}
					}
				}
			}
		}else{
			for(var x in $scope.qdCategoryList){
				for(y in $scope.arrQdCg1){
					if($scope.qdCategoryList[x].cct_id == $scope.arrQdCg1[y].cct_id){
						$scope.qdCategoryList[x].checkecdCg1 = true;
					}
				}
			}
		}
	}
	var error = function(){
		messageFactory.showMessage('error',result.desc);
	}
	var url = '/admin/customer/csChannelTypeControl/getCsChannelTypeList.action';
	http.post(url,$.extend({},$scope.searchParam),success,error);
}


/**
 * 添加渠道类别
 * type=1 大类  type=2小类
 */
$scope.addQdCategory = function(type){
	if(type==1){
		$scope.arrQdCg1=[];//渠道类别大
	}else{
		$scope.arrQdCg=[];//渠道类别小
	}
	$("input[name='qdCgStatus']:checked").not(":disabled").each(function(){
		var cct_id = $(this).attr("cct_id");
		var cct_name = $(this).attr("cct_name");
		var str = {'cct_id':cct_id,'cct_name':cct_name};
		if(type==2){
			$scope.arrQdCg.push(str);
		}else{
			$scope.arrQdCg1.push(str);
		}
	})
}


/**
 * 显示客户选择弹出框
 */
$scope.showCustomerDialog = function(){
	$scope.showDialog = true;
	$scope.num=0;
	$scope.arrCs1 = [];
	$scope.searchParam.cc_categoryid = '';
	$scope.searchParam.searchKey = '';
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		for(var x in $scope.searchParam){
			newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		}
		return newValue;
	},$scope.queryCustomerList);
}

$scope.closeCustomerDialog = function(){
	$scope.showDialog = false;
}

/**
 * 客户选择
 */
$scope.selectCustomer = function(){
	$scope.showCustomerDialog();
	$("#report_holder").html('');
	$scope.queryCsCategory();//查询客户类别
}

/**
 * 添加客户
 */
$scope.addCustomer = function(){
	$scope.arrCs=[];
	$("input[name='csStatus']:checked").not(":disabled").each(function(){
		var cc_id  = $(this).attr("cc_id");
		var cc_name  = $(this).attr("cc_name");
		var str = {'cc_id':cc_id,'cc_name':cc_name};
		$scope.arrCs.push(str);
	});
	if($scope.arrCs.length == 0){
		messageFactory.showMessage('error',"请选择客户！");
	}else{
		$scope.closeCustomerDialog();
		$scope.flag = 1;
	}
}
/**
 * 已选客户条数统计
 */
$scope.selectedNum = function(){
	$scope.arrCs1=[];//未确定的选中客户
	$scope.num = 0;//初始选中客户条数
	$("input[name='csStatus']:checked").not(":disabled").each(function(){
		$scope.num++;
		var cc_name  = $(this).attr("cc_name");
		var str = {'cc_name':cc_name};
		$scope.arrCs1.push(str);
	});
}
/**
 * 查询客户类别
 */
$scope.queryCsCategory = function(){
	var success = function(result){
		$scope.customerList = result.data;
		$scope.customerList.splice(0, 0, {cc_id:"",cc_code:"",cc_name:"全部",subList:[]});//增加一条记录
		if(result.data.length>0){
			$scope.csCategoryChecked = $scope.customerList[0];
			for(x in $scope.customerList){
				$scope.customerList[x].subList.splice(0, 0, {cc_id:"",cc_code:"",cc_name:"全部"}); 
			}
			$scope.childCsCategoryChecked = $scope.csCategoryChecked.subList[0];
			$scope.customerSecondList = $scope.csCategoryChecked.subList;
		}
	}
	var error = function(result){
		messageFactory.showMessage('error',result.desc);
	}
	var url='/admin/customer/csCategoryControl/getCsCategoryList.action';
	http.post(url,$.extend({},$scope.searchParam),success,error);
}

/**
 * 选择客户分类
 * type = 1 一级分类 type=2 二级分类
 */
$scope.choseCustomerCategory = function(category,type){
	if(type == 1){
		$scope.csCategoryChecked = category;//选中一级类别
		$scope.customerSecondList = category.subList;//二级类别
		if($scope.customerSecondList.length >0){
			$scope.childCsCategoryChecked = $scope.customerSecondList[0];
		}
	}else{
		$scope.childCsCategoryChecked = category;
	}
	$scope.searchParam.cc_categoryid = category.cc_id;
	$scope.searchParam.searchKey = '';
}

/**
 * 查询客户列表
 */
$scope.queryCustomerList = function(){
	var success = function(result){
		$scope.customerAllList = result.data.rows;
		$scope.pager.total=result.data.total;
		$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
		for(var i in $scope.customerAllList){
			$scope.customerAllList.selectedCs=false;
		}
		for(var i in $scope.customerAllList){
			for(var j in $scope.arrCs){
				if($scope.customerAllList[i].cc_id == $scope.arrCs[j].cc_id){
					$scope.customerAllList[i].selectedCs = true;
					$scope.num++;
				}
			}
		}
	}
	var error = function(){
		messageFactory.showMessage('error',result.desc);
	}
	var url = '/admin/customer/csCustomerControl/dataGrid.action';
	http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
}


/**
 * 查询客户
 */
$scope.doSearch = function(){
	$scope.searchKey=$("input[name='search']").val();
	// console.log($scope.searchKey);
	$scope.searchParam.searchKey = $scope.searchKey;
	if($scope.pager.page==1){
		$scope.queryCustomerList();
	}else{
		$scope.pager.page=1;
	}
}
/**
 * 清空出入框內容
 */
$scope.deleteInput = function(id,name){
	switch(id){
	case 1://清空所有客戶大類
		$scope.arrCsCg1=[];
		break;
	case 2://清空單個客戶大類
		for(var x in $scope.arrCsCg1){
			if($scope.arrCsCg1[x].cc_name == name){
				$scope.arrCsCg1.splice(x,1);
				break;
			}
		}
		break;
	case 3://清空所有客戶小類
		$scope.arrCsCg=[];
		break;
	case 4://清空單個客戶小類
		for(var x in $scope.arrCsCg){
			if($scope.arrCsCg[x].cc_name == name){
				$scope.arrCsCg.splice(x,1);
				break;
			}
		}
		break;
	case 5://清空所有渠道大類
		$scope.arrQdCg1=[];
		break;
	case 6://清空單個渠道大類
		for(var x in $scope.arrQdCg1){
			if($scope.arrQdCg1[x].cct_name == name){
				$scope.arrQdCg1.splice(x,1);
				break;
			}
		}
		break;
	case 7://清空所有渠道小類
		$scope.arrQdCg=[];
		break;
	case 8://清空單個渠道小類
		for(var x in $scope.arrQdCg){
			if($scope.arrQdCg[x].cct_name == name){
				$scope.arrQdCg.splice(x,1);
				break;
			}
		}
		break;
	case 9://清空客戶
		$scope.arrCs=[];
		break;
	}
}

//客户全选
$scope.selectAll = function(){
	if($("#selectAll").is(':checked')){
		$(".zk_checkbox").prop("checked",true);
	}else{
		$(".zk_checkbox").prop("checked",false);
	}
	$scope.selectedNum();
}

})