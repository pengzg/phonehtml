tempApp.controller('ctr_csLineTrip', function($scope,
		$state,http,EzConfirm,dateUtil,messageFactory) {
	$scope.pager = {page:1,rows:'100',sort:'clct_arrivetime',order:'ASC',pageList:['10','20','30']};
	$scope.searchParam = {};
	
	$scope.searchParam.clct_userid = 0;
	$scope.nowDay = dateUtil.getDate2();
	$scope.dateStr = $scope.nowDay;
	$scope.showRightPop = false;
	$scope.showSale = true;//true 显示销售信息 false：退货信息
	$scope.showUserPop = false;//客户档案卡弹窗显示

	/**
	 * 查询数据
	 */
	$scope.queryCsLineCustTask = function(){		
		messageFactory.showLoading();
		var success = function(result){
			$scope.csLineCustTaskList = result.data.rows;			
			messageFactory.closeLoading();
			setTimeout(function(){
				$scope.openMap("");				
			}, 2000) 
		}
		var error = function(result){
			messageFactory.closeLoading();
		}
		$scope.searchParam.start_date = $scope.dateStr;
		$scope.searchParam.end_date = $scope.dateStr;
		var url = '/admin/line/csLineCustTaskControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
	
	// 得到业务员列表
	$scope.getBaseUserdocList = function(type){
		$scope.baseUserdocList = {};
		$scope.searchParam.clct_userid = 0;
		var success = function(result){
			$scope.baseUserdocList = result.data;
		}
		var data = {'clct_start_date':$scope.dateStr,'clct_end_date':$scope.dateStr};
		
		var url = "/admin/base/baseUserdocControl/queryUserItemLineCount.action";
		http.post(url,data,success,null);
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
	
	
	// 选择业务员
	$scope.selectSaleman = function(x) {
		$scope.searchParam.clct_userid =x.su_id;
		$scope.queryCsLineCustTask();		
	}
		
	$scope.getBaseUserdocList();
	$scope.getOrgidLocation();
	
	
	$scope.changeDate = function(){
		$scope.getBaseUserdocList();
	}
	
	
	WdatePicker({
		eCont : 'div1',
		onpicked : function(dp) {
			//调用msg变量，并改变msg的值
			$scope.dateStr = dp.cal.getNewDateStr();
			//上一行改变了msg的值，如果想同步到Angular控制器中，则需要调用$apply()方法即可
			$scope.$apply();
			//调用控制器中的getData()方法
			$scope.changeDate();

		},
		lang:'zh-cn'
	})
	
	
	$scope.openMap = function(location) {
		
		/*map = new BMap.Map("allmap"); // 创建Map实例
		map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
		map.addControl(new BMap.MapTypeControl()); //添加地图类型控件

		if (location != "") {
			var res = location.split(',');
			$("#selectlng").val(res[0]);
			$("#selectlat").val(res[1]);
			setpoint(res[0], res[1]);
			map.centerAndZoom(new BMap.Point(res[0], res[1]), 11);
		} else {
			map.centerAndZoom("济宁", 12);
		}
		map.enableScrollWheelZoom(true);
		//单击获取点击的经纬度
		map.addEventListener("click", function(e) {
			setpoint(e.point.lng, e.point.lat);

			$("#selectlng").val(e.point.lng);
			$("#selectlat").val(e.point.lat);
		});*/
		
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
		for (var i = 0; i < $scope.csLineCustTaskList.length; i++) {
			var p0 = $scope.csLineCustTaskList[i].clct_longitude;
			var p1 = $scope.csLineCustTaskList[i].clct_latitude;
			var maker = $scope.addMarker(new window.BMap.Point(p0, p1), i);
			//自定义弹窗
			// maker.addEventListener("click", function(){          
			// 	var infoWindows;
			// 	$scope.$apply(function(){
			// 		infoWindows = $scope.infoWindowPop();
			// 	})
			//    this.openInfoWindow(infoWindows);
			//    document.getElementById('imgDemo').onload = function (){
			// 	   infoWindows.redraw();  
			//    }
			// });
			$scope.addInfoWindow(maker, $scope.csLineCustTaskList[i], i+1);
		}
		//绘制点
	
		var points = new Array();
		for (var i = 0; i < $scope.csLineCustTaskList.length; i++) {
			var p0 = $scope.csLineCustTaskList[i].clct_longitude;
			var p1 = $scope.csLineCustTaskList[i].clct_latitude;
			
			var thePoint1 = new BMap.Point(p0, p1);
			points.push(thePoint1);
		}
		$scope.drawPolyline(map, points);
		
		
		// 重新切换中心位置
		/* console.log(tempPointsArr);
		 tempPointsArr = [[111.944764,34.093619],[118.839686,33.586989],[116.852778,30.850392]];*/
		var view = map.getViewport(points);  
		// console.log(view);
		map.setViewport(view);
		/*var mapZoom = view.zoom;   
		var centerPoint = view.center;   
		console.log(mapZoom);
		console.log(centerPoint);
		map.centerAndZoom(centerPoint,mapZoom);*/
		
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
	
	
	// 添加信息窗口
	$scope.addInfoWindow = function(marker, poi, num) {
		//  marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
		// console.log(poi.clct_customerid_nameref);
		var label = new window.BMap.Label(num+"."+poi.clct_customerid_nameref, {
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
	//客户档案卡弹窗
	$scope.showUserPopClick = function(){
		$scope.showUserPop = true;
	}
	$scope.changeTab = function(e,idx){
		var ele = $(e);
		if(!ele.hasClass('active')){
			ele.siblings().removeClass('active');
			ele.addClass('active');
			$('#diaTab'+idx).show();
			var idx2 = idx==1?2:1;
			$('#diaTab'+idx2).hide();
		}
	}
})