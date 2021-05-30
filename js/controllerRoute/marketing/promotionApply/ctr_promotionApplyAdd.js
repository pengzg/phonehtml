tempApp.controller('ctr_promotionApplyAdd', function($scope, $rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,dateUtil,messageFactory,$q,$http,activityDetailFactory) {
	$scope.goodsList = [];
	$scope.today = dateUtil.getDate2()+" 至  "+dateUtil.getDate2();

	
	$scope.vo = {"pa_state":2,"pa_sort":0,"pa_total_num":1};
	$scope.vo.pa_startdate = $scope.vo.pa_enddate = dateUtil.getDate2();
	$("#start_time").val($scope.today);
	$('#start_time').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
		$scope.vo.pa_startdate = start.format('YYYY-MM-DD');
		$scope.vo.pa_enddate = end.format('YYYY-MM-DD');
		$scope.$apply();
    });
	$scope.goods_type = 1;
	
	$scope._simpleConfig = {
	     //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
	     toolbars: [
	       ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc','|', 'justifyleft',
	        'justifyright', 
	        'justifycenter',
	        'justifyjustify', 
	        'forecolor', 
	        'backcolor',
	        'fontfamily',
	        'fontsize']
	     ],
	     //focus时自动清空初始化时的内容
	     autoClearinitialContent: true,
	     //关闭字数统计
	     wordCount: true,
	     //关闭elementPath
	     elementPathEnabled: false
	   };

    /**
     * 查询商品
     */
    $scope.pager1 = {page:1,rows:'10',sort:'',order:'',searchKey:'',ps_shopid:$rootScope.USER.shopId};
    $scope.searchParam = {};
    $scope.getGoods = function(){
  
    	activityDetailFactory.getGoods($scope);
    }
    /**
     * 商品模糊查询
     */
    $scope.keySearchFun = function(key,type){
    	if(type=="goods"){
    		$scope.pager1 = {page:1,rows:'10',sort:'pm_id',order:'desc',searchKey:key,ps_shopid:$rootScope.USER.shopId};
    		$scope.getGoods();
    	}
    }
	
    /**
	 * 上一页
	 */
	$scope.prevPage = function(pager,fun){
		activityDetailFactory.prevPage($scope,pager,fun);
	}
	
	/**
	 * 下一页
	 */
	$scope.nextPage = function(pager,fun){
		activityDetailFactory.nextPage($scope,pager,fun);
	}
    /**
     * 选择商品
     */
	$scope.chooseGoods = function(obj,obj2,type){
		if (type == 1) {
			$scope.vo.pa_productid_nameref = obj.pm_title;
			$scope.vo.pa_productid = obj.ps_productid;
			$scope.vo.pa_market_price = obj.ps_price;
			$scope.vo.pa_picture = obj.pm_picture;
			$scope.vo.pa_skuid = obj.ps_id;
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
				// changeFrameHeight('index.'+$state.current.name);
			}else{
				messageFactory.showMessage('error',"至少保留一条记录");
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
		
		if (!$scope.vo.pa_name) {
			messageFactory.showMessage('error','请输入试用主题');
			return;
		}
		
		if( $("#start_time").val()==""){
			messageFactory.showMessage('error','请选择活动时间');
			return;
		}
		if( $("#end_time").val()==""){
			messageFactory.showMessage('error','请选择活动时间');
			return;
		}
		if( $scope.vo.pa_startdate <dateUtil.getDate2()){
			messageFactory.showMessage('error','活动开始日期不能小于当前日期');
			return;
		}
		if( $scope.vo.pa_startdate >$scope.vo.pa_enddate){
			messageFactory.showMessage('error','活动结束时间不能小于开始时间');
			return;
		}
		
		if (!$scope.vo.pa_productid) {
			messageFactory.showMessage('error','请选择商品');
			return;
		}

		if (!$scope.vo.pa_market_price) {
			messageFactory.showMessage('error','请输入商品价格');
			return;
		}
		
		var  reg = /^\d{1,10}$/;
		
		if (!reg.test($scope.vo.pa_total_num) || $scope.vo.pa_total_num<1) {
			messageFactory.showMessage('error','试用总人数至少为1人');
			return;
		}
		
		if (!reg.test($scope.vo.pa_sort) || $scope.vo.pa_sort<0) {
			messageFactory.showMessage('error','排序只能为整数');
			return;
		}
		
		if (!reg.test($scope.vo.pa_total_num) || $scope.vo.pa_total_num<1) {
			messageFactory.showMessage('error','试用总人数至少为1人');
			return;
		}
		
		if (!$scope.vo.pa_describe) {
			messageFactory.showMessage('error','请输入试用规则');
			return;
		}
	
		var success = function(result){
			messageFactory.showMessage('success','提交成功');
			$scope.goBack();
			$scope.dataList = [{}];
			$scope.subTotal = 0;
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		$scope.vo.pa_type = 1;
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/apply/promotionApplyControl/update.action";
			http.post(url,$scope.vo,success,error);
		}, function() {

		});
	}
	
	

	
	// 返回
	$scope.goBack = function(){
		
		$state.go("index.marketing.promotionApplyList");
		
	}
	

})