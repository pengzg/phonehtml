tempApp.controller('ctr_csCustomerCheck', function($scope,
		$state,http,EzConfirm,messageFactory,dateUtil) {
	$scope.pager = {page:1,rows:'10',sort:'ccl_id',order:'desc',pageList:['10','20','30']};
	$scope.searchParam = {};
	$scope.showTree = 1;
	$scope.checkedIds = "";
	$scope.searchParam.ccl_state = "";
	$scope.searchParam.start_date = dateUtil.getDate2();
	$scope.searchParam.end_date = dateUtil.getDate2();
	$("#start_date").val($scope.searchParam.start_date);
	$("#end_date").val($scope.searchParam.end_date);
	$scope.tab1 = 1;
		
	/**
	 * 查询数据
	 */
	$scope.queryCsCustomer = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.csCustomerList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();

			$scope.viewImg();
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		$scope.searchParam.start_date = $("#start_date").val();
		$scope.searchParam.end_date = $("#end_date").val();
		var url = '/admin/customer/csCustomerLocationControl/dataGrid.action';
		http.post(url,$.extend({}, $scope.pager, $scope.searchParam),success,error);
	}
	
	
	/**
	 * 审核 
	 */
	$scope.toCheck = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.queryCsCustomer();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'cc_id':id}
		var url = "/admin/customer/csCustomerLocationControl/updateCheckstats.action";
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
			$scope.queryCsCustomer();
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
	 * 查询业务员
	 */
	$scope.pager3 = {page:1,rows:'999',sort:'',order:'',searchKey:''};
	$scope.getSalemanList = function(){
		var success = function(result){
			
			$scope.salemanList = result.data.rows;
			$scope.salemanList.unshift({"su_name":"全部","su_id":""});
			
			$scope.pager3.total=result.data.total;
			$scope.pager3.pageTotal = Math.ceil($scope.pager3.total/$scope.pager3.rows);
		}
		var error = function(){
			
		}
		var url = "/admin/base/baseUserdocControl/queryBaseUserdoc.action";
		http.post(url,$.extend({dateType:'datagrid',"su_usertype_str":'6'},$scope.pager3),success,error);
	}
	$scope.getSalemanList();
	
	$scope.chooseSalesman = function(x){
		$scope.searchParam.cc_adduserid = x.su_id;
		$scope.queryCsCustomer();
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
	},$scope.queryCsCustomer);
	

	
	
	// 选择标签
	$scope.tabSelect = function(ccl_state) {
		
		$scope.tab = ccl_state;
		$scope.searchParam.ccl_state = ccl_state;
		$scope.queryCsCustomer();
	}
	
	
	

	// 批量审核
	$scope.checkBatch = function(stats) {
		$scope.getCheckedIds();
		if (!$scope.checkedIds) {
			messageFactory.showMessage('error',"请选择客户");
			return false;
		}
		$scope.check($scope.checkedIds, stats);		
	}
	
	
	$scope.check = function(userStr,stats) {
		
		var success = function(result){
			messageFactory.showMessage('success',"操作成功");
			$(".js_select").prop("checked",false);
			$scope.queryCsCustomer();
		}
		var error = function(result){
			messageFactory.showMessage('error',"操作失败");
			$(".js_select").prop("checked",false);
		}
		
		
		var data ={'ccl_id_str':userStr, "ccl_state":stats}
		var url = "/admin/customer/csCustomerLocationControl/updateCheckStatsBatch.action";
		var	msg = '您确定修改吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {

		});
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

	
	// 显示地图
	$scope.showMap =function(cc_id){
		if ($scope.tab1 ==1) {
			$scope.tab1 =2;
			$('#mapContent').show();
		} else if($scope.tab1 ==2) {
			$scope.tab1 =1;
			//更新viewer图片预览（有图片变化时是需要更新）
			setTimeout(function(){
				$('.imgviews').viewer('update');
			})
			$('#mapContent').hide();
		} else{
			$('#mapContent').hide();
			$scope.tab1 =1;
			//更新viewer图片预览（有图片变化时是需要更新）
			setTimeout(function(){
				$('.imgviews').viewer('update');
			})
		}

		$scope.openMap($scope.location)
		
	}
	$scope.openMap = function(location) {
				
			map = new BMap.Map("allmap");
		
		
		//第1步：设置地图中心点，当前城市
		if ($scope.location != undefined) {
			// alert($scope.location);
			var res = $scope.location.split(',');
			map.centerAndZoom(new BMap.Point(res[0], res[1]), 11);
		} else {
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
		}
		
		//第3步：启用滚轮放大缩小
		map.enableScrollWheelZoom(true);
		//第4步：向地图中添加缩放控件
		var ctrlNav = new window.BMap.NavigationControl({
			anchor : BMAP_ANCHOR_TOP_LEFT,
			type : BMAP_NAVIGATION_CONTROL_LARGE
		});
		map.addControl(ctrlNav);
		//第5步：向地图中添加缩略图控件
		var ctrlOve = new window.BMap.OverviewMapControl({
			anchor : BMAP_ANCHOR_BOTTOM_RIGHT,
			isOpen : 1
		});
		map.addControl(ctrlOve);

		//第6步：向地图中添加比例尺控件
		var ctrlSca = new window.BMap.ScaleControl({
			anchor : BMAP_ANCHOR_BOTTOM_LEFT
		});
		map.addControl(ctrlSca);
		
		// console.log($scope.csLineCustTaskList);
		//第7步：绘制点 
		for (var i = 0; i < $scope.csCustomerList.length; i++) {
			var p0 = $scope.csCustomerList[i].ccl_longitude;
			var p1 = $scope.csCustomerList[i].ccl_latitude;
			var maker = $scope.addMarker(
					new window.BMap.Point(p0, p1), i);
			// 自定义弹窗
			// maker.addEventListener("click", function(){
			// var infoWindows;
			// $scope.$apply(function(){
			// infoWindows = $scope.infoWindowPop();
			// })
			// this.openInfoWindow(infoWindows);
			// document.getElementById('imgDemo').onload =
			// function (){
			// infoWindows.redraw();
			// }
			// });
			$scope.addInfoWindow(maker,
					$scope.csCustomerList[i], i + 1);
		}
		//绘制点
	
		var points = new Array();
		for (var i = 0; i < $scope.csCustomerList.length; i++) {
			var p0 = $scope.csCustomerList[i].ccl_longitude;
			var p1 = $scope.csCustomerList[i].ccl_latitude;
			
			var thePoint1 = new BMap.Point(p0, p1);
			points.push(thePoint1);
		}

	// 	$scope.drawPolyline(map, points);
		
		var view = map.getViewport(points);  
		// console.log(view);
		map.setViewport(view);

	}
	// 添加信息窗口
	$scope.addInfoWindow = function(marker, poi, num) {
		//  marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
		// console.log(poi.clct_customerid_nameref);
		var label = new window.BMap.Label(num+"."+poi.ccl_name, {
			offset : new window.BMap.Size(20, -10)
		});
		
		label.setStyle({
			color : "#000",
			fontSize : "16px",
			backgroundColor : "0.05",
			border : "0px solid red",
			fontWeight : "bold"
		});
		marker.setLabel(label);

	}
	// $scope.openMap("");
	
	// 添加标注
	$scope.addMarker = function(point, index) {
		index = 11;
		var myIcon = new BMap.Icon(
				"http://api.map.baidu.com/img/markers.png",
				new BMap.Size(23, 25), {
					offset : new BMap.Size(10, 25),
					imageOffset : new BMap.Size(0, 0 - index * 25)

				});
		var marker = new BMap.Marker(point, {
			icon : myIcon
		});
		map.addOverlay(marker);
		return marker;
	}
	/**
	 * 添加信息窗
	 * @Author   SunXinqiang
	 * @DateTime 2017-09-12
	 * @param    {[type]}    point [description]
	 * @param    {[type]}    index [description]
	 */
	$scope.infoWindowPop = function(point, index) {
		var htmlStr = $('#popContent').html();
		var infoWindow = new BMap.InfoWindow(htmlStr);
		return infoWindow;
	}
	
	/**
	 * 画线
	 * @param bMap
	 * @param points
	 */
	$scope.drawPolyline = function(bMap, points) {
		if (points == null || points.length <= 1) {
			return;
		}
		bMap.addOverlay(new BMap.Polyline(points, {
			strokeColor : "blue",
			strokeWeight : 3,
			strokeOpacity : 0.6
		})); // 画线

	}

	/**
	 * 未知图片数量，每张图片加载完成 都执行更新
	 * @Author   SunXinqiang
	 * @DateTime 2017-09-29
	 * @return   {[type]}    [description]
	 */
    $scope.imgLoadRefresh = function(){
    	$('.imgviews').viewer('update');
    }

    /**
     * 加载图片预览
     * @Author   SunXinqiang
     * @DateTime 2017-09-29
     * @return   {[type]}    [description]
     */
    $scope.viewImg = (function(){
    	var viewerImg = null;
    	return function(){
	    	setTimeout(function(){
				//没有img初始化viewer会发生错误
				if($('.imgviews img').length==0){
					return;
				}
				if(!viewerImg){
					viewerImg = $('.imgviews').viewer({'zoomRatio':0.2});
				}else{
					$('.imgviews').viewer('update');
				}
			},100);
    	}
    })()

    $scope.showAllImgs = function(){
    	$scope.tab1 = 3;
    	$('#mapContent').hide();
    	//更新viewer图片预览（有图片变化时是需要更新）
		setTimeout(function(){
			$('.imgviews').viewer('update');
		})
    }


})