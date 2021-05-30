tempApp.controller('ctr_glAgentProductRelAdd', function($scope, $rootScope, $location,
	$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory,$rootScope) {

$scope.dataListOld = [{}];

$scope.dataList = [{}];
$scope.addStoreList = [];

if ($stateParams.workId != undefined) {
	$scope.workid = $stateParams.workId;
}
$scope.productList = [];
$scope.selectProduct = {};

/**
 * 详情
 */
$scope.pager = {"page":1, "rows":30};
$scope.getDetail = function(x) {

	console.log($scope.selectProduct);
	$scope.skuid = $scope.selectProduct.ps_id;
	if(!$scope.skuid){
		$scope.dataList= [{}];
		return;
	}
	
	messageFactory.showLoading();
	var success = function(result){
		if (result.data.rows.length>0) {
			$scope.dataList = [];
			for (var x  in  result.data.rows) {
				var str = {
						"ba_name":result.data.rows[x].gapr_agentid_nameref,
						"ba_id":result.data.rows[x].gapr_agentid,
						"gapr_recommend1_rate":result.data.rows[x].gapr_recommend1_rate,
						"gapr_recommend2_rate":result.data.rows[x].gapr_recommend2_rate,
						"gapr_amount1":result.data.rows[x].gapr_amount1
				}
				$scope.dataList.push(str);
			}
			console.log($scope.dataList.length)
		} else {
			$scope.dataList= [{}];
		}
		messageFactory.closeLoading();
	};
	var error = function(result){
		messageFactory.closeLoading();
		messageFactory.showMessage('error',result.desc);
		
	};
	var data = {"gapr_skuid":$scope.skuid,"gapr_dr":1};
	var url = '/admin/gl/glAgentProductRelControl/dataGrid.action';
	http.post(url,$.extend(data,$scope.pager),success,error);
}

if ($scope.skuid) {
	$scope.getDetail();
}


/**
 *隐藏未选中节点
 * @param treeObj
 * @returns
 */
function hideUnChecked(treeObj){
	var nodes = treeObj.getNodesByFilter(function(node){
		return node.checked == false;
	});
	treeObj.hideNodes(nodes);
}


/**
 * 查询柜子列表
 */
$scope.pager1 = {page:1,rows:'10',sort:'',order:'',searchKey:'', ba_type:"3"
		};
$scope.searchParam = {};
$scope.getAgentList = function(){

	var agent_arr = [];
	
	messageFactory.showLoading();
	var success = function(result){
		$scope.agentList = result.data.rows;
		$scope.pager1.total = result.data.total;
		$scope.pager1.pageTotal = Math.ceil($scope.pager1.total/$scope.pager1.rows);
		messageFactory.closeLoading();
	}
	var error = function(result){
		messageFactory.closeLoading();
		messageFactory.showMessage('error',result.desc);
		
	}
	var str = '';
	if($scope.dataList.length>0){
		for(i in $scope.dataList){
			var item = $scope.dataList[i];
			if(!$scope.dataList[i].ba_id){
				continue;
			}
			agent_arr.unshift(item.ba_id);
		}
	}
	str = agent_arr.join(',');
	var url = '/admin/base/baseAgentControl/dataGrid.action';
	http.post(url,$.extend({},$scope.pager1,$scope.searchParam),success,error);    	
}


/**
 * 柜子模糊查询
 */
$scope.keySearchFun = function(key,type){
	if(type=="store"){
		$scope.pager1 = {page:1,rows:'10',sort:'bs_id',order:'desc',searchKey:key,bs_type:4,bs_shopid:$rootScope.USER.shopId};
		$scope.getAgentList();
	}
}

/**
 * 上一页
 */
$scope.prevPage = function(pager,fun){
	if (pager.page==1) {
		return;
	}
	$scope.pager1.page = pager.page-1;
	$scope.getAgentList();
	
}

/**
 * 下一页
 */
$scope.nextPage = function(pager,fun){

	$scope.pager1.page = $scope.pager1.page+1;
	$scope.getAgentList();
}

/**
 * 选择柜子
 */
$scope.chooseAgent = function(obj,obj2,type){
	
	var flag = true;
	if($scope.dataList){
		for(var i in $scope.dataList){
			if($scope.dataList[i].ba_id==obj.ba_id){
				flag = false;
				continue;
			}
		}
	}
	
	if(flag){
		$scope.dataList[obj2] =	{
			"ba_name":obj.ba_name,
			"ba_id":obj.ba_id,
			"gapr_recommend1_rate":$scope.selectProduct.pm_recommend1_rate,
			"gapr_recommend2_rate":$scope.selectProduct.pm_recommend2_rate,
			"gapr_amount1":$scope.selectProduct.pm_profit_value
	}
		
	console.log($scope.dataList);					

	}else{
		messageFactory.showMessage('error','对不起合伙人不能重复');
		return;
	}
		
	$(".droplistWrap2").hide();
}
/**
 * 添加全部商品
 */
$scope.addAll = function(objList,index){

	for(var i=0,len=objList.length;i<len;i++){
		$scope.chooseGoods(objList[i],index+i);
	}
}

/**
 * 添加行
 */
$scope.addLine = function(type){
	if (type == 1) {
		$scope.dataList.push({});
	}
}

/**
 * 移除行
 */
$scope.removeLine = function(index, type){
	if (type == 1){
		if($scope.dataList.length>1){
			$scope.dataList.splice(index,1);
			$scope.cal();
		}else{
//				messageFactory.showMessage('error',"至少保留一条记录");
			$scope.dataList=[{}];
		}
	} 
}


$scope.lineNum = 0;
$scope.subTotal = 0;

$scope.showDroplist = function (event,fun,type){	
	activityDetailFactory.showDroplist($scope,event,fun,type);
};

/**
 * 保存
 */
$scope.submit = function(){
	
	if (!$scope.skuid) {
		messageFactory.showMessage('error','请选择商品');
		return;
	}
	
	// 关联的柜子
	var agentListArr = [];	
	for(i in $scope.dataList){
		if(!$scope.dataList[i].ba_id){
			messageFactory.showMessage('error','请选择要关联的合伙人');
			return;
		}
		var relationInfo = {}
		var item = $scope.dataList[i];

		relationInfo["gapr_agentid"] = item.ba_id;
		relationInfo["gapr_amount1"] = item.gapr_amount1;
		relationInfo["gapr_recommend1_rate"] = item.gapr_recommend1_rate;
		relationInfo["gapr_recommend2_rate"] = item.gapr_recommend2_rate;
		agentListArr.push(relationInfo);
	}
	
	if (agentListArr.length <1) {
		messageFactory.showMessage('error','关联的合伙人不能少于1个');
		return;
	}
	
	var agentListStr = JSON.stringify(agentListArr);

	var success = function(result){
		messageFactory.showMessage('success','提交成功');
		$scope.goBack();

	}
	var error = function(result){
		messageFactory.showMessage('error',result.desc);
	}
	
	EzConfirm.create({
		heading : '提示',
		text : "您确定提交吗？"
	}).then(function() {
		var url = "/admin/gl/glAgentProductRelControl/update.action";
		http.post(url,{'relationListStr':agentListStr,"skuid":$scope.skuid},success,error);
	}, function() {

	});
}

// 返回
$scope.goBack = function(){

	$state.go("index.gl.glagentproductrel");
	
}

/**
 * 查询业务员
 */
$scope.getProductList = function(){
	var success = function(result){
		$scope.productList = result.data.rows;
		
		
			$scope.productList.unshift({'ps_id':'','pm_title':'请选择商品'});
//			}
	}
	var error = function(){
		
	}
	
	var url = "/admin/product/productSkuControl/dataGridSku.action";
	http.post(url,{"pm_dr":1,ps_shopid:$rootScope.USER.shopId,"page":1,"rows":"10000"},success,error);
}
$scope.getProductList();


$scope.change2Num2 = function(index){
	
	console.log(index);
	if ($scope.dataList[index].gapr_recommend1_rate) {
		$scope.dataList[index].gapr_recommend1_rate =($scope.dataList[index].gapr_recommend1_rate+"").replace(/[^\.\d]/g,'');
		if (!$scope.dataList[index].gapr_recommend1_rate) {
			$scope.dataList[index].gapr_recommend1_rate = "0.00";
		}
		$scope.dataList[index].gapr_recommend1_rate = parseFloat($scope.dataList[index].gapr_recommend1_rate).toFixed(2);
		$scope.dataList[index].gapr_recommend2_rate = 100-$scope.dataList[index].gapr_recommend1_rate;
	}
	
}

})