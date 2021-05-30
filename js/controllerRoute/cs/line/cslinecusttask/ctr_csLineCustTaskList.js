tempApp.controller('ctr_csLineCustTaskList', function($scope,
		$state,http,EzConfirm,dateUtil,messageFactory) {
	$scope.pager = {page:1,rows:'10',sort:'clct_id',order:'desc',pageList:['10','20','30']};
	$scope.searchParam = {};
	
	$scope.visitStateList = [{"bd_code":"1","bd_name":"全部"},{"bd_code":"2","bd_name":"正常拜访"},{"bd_code":"3","bd_name":"异常拜访"}];
	$scope.stateName="全部";
	$scope.searchParam.state_type = 1;
	$scope.tab =1;
	$scope.searchParam.clct_userid_str = "";
	$scope.today = dateUtil.getDate2();
	$("#start_date,#end_date").val($scope.today);
//	图片预览插件
	var viewerImg = null;
	/**
	 * 查询数据
	 */
	$scope.queryCsLineCustTask = function(){		
		messageFactory.showLoading();
		var success = function(result){
			$scope.csLineCustTaskList = result.data.rows;
			var imgList = [];
			for (i in $scope.csLineCustTaskList) {
				imgList.push($scope.csLineCustTaskList[i].clct_id);
			}
			// console.log(imgList);
			$scope.getImgList(imgList.join(","));
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
			//	 图片预览插件
			if(result.data.rows){
				setTimeout(function(){
					//没有img初始化viewer会发生错误
					if($('#viewer_main img').length==0){
						return;
					}
					if(!viewerImg){
						viewerImg = $('#viewer_main').viewer({'zoomRatio':0.2});
					}else{
						$('#viewer_main').viewer('update');
					}
				},100);
			}
			
		}		
		var error = function(result){
			messageFactory.closeLoading();
		}
		$scope.searchParam.clct_userid_str = $scope.getCheckedIds();
		$scope.searchParam.start_date = document.getElementById('start_date').value;
		$scope.searchParam.end_date = document.getElementById('end_date').value;
		var url = '/admin/line/csLineCustTaskControl/dataGrid.action';
		http.post(url,$.extend({},$scope.pager,$scope.searchParam),success,error);
	}
	

	$scope.searchFun = function(){
		if($scope.pager.page==1){
			$scope.queryCsLineCustTask();
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
	},$scope.queryCsLineCustTask);
	
	// 选择状态
	$scope.chooseState = function(x) {
		if ($scope.searchParam.clct_userid == undefined || $scope.searchParam.clct_userid ==0) {
			messageFactory.showMessage('error',"请选择业务员");
			return false;
		}
		$scope.stateName = x.bd_name;
		$scope.searchParam.state_type = x.bd_code;
	}
	
	// 得到业务员列表
	$scope.getBaseUserdocList = function(type){
		$('.js_selectAll').prop("checked",false);
		$scope.baseUserdocList = {};
		$scope.searchParam.clct_userid_str = "";
		var success = function(result){
			$scope.baseUserdocList = result.data;
			$('.js_selectAll').prop("checked",true);
			$('.js_select').prop("checked",true);
			$scope.queryCsLineCustTask();
		}
		var data = {'start_date':document.getElementById('start_date').value,'end_date':document.getElementById('end_date').value,'su_usertype':type};
		
		var url = "/admin/line/csLineCustTaskControl/queryTaskSalesCount.action";
		http.post(url,data,success,null);
	}	
	
	// 选择业务员
	$scope.selectSaleman = function(su_id) {
		$scope.searchParam.clct_userid = su_id;
		$scope.queryCsLineCustTask();
	}
	
	$scope.selectTab = function(x) {
		
		$scope.tab = x;
		//更新viewer图片预览（有图片变化时是需要更新）
		setTimeout(function(){
			$('#viewer_main').viewer('update');
		})
	}
	
	// 得到图片列表
	$scope.getImgList = function(clctid_str){
		var success = function(result){
			$scope.baseImgList = result.data;
		}
		//var data = {'start_date':document.getElementById('start_date').value,'end_date':document.getElementById('end_date').value,'clct_userid':$scope.searchParam.clct_userid};
		var data = {"clct_id_str":clctid_str};
		
		var url = "/admin/line/csLineCustTaskControl/queryImgList.action";
		http.post(url,data,success,null);
	}
	// 删除图片
	$scope.delImg = function(bar_id){
		var success = function(result){
			messageFactory.showMessage('success',result.desc);
			$scope.queryCsLineCustTask();
		}
		
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		var data = {'bar_id':bar_id};
		
		var url = "/admin/line/csLineCustTaskControl/delImg.action";
		
		msg = '您确定删除这个图片吗？';

		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {
			
			http.post(url, data, success, error);
		}, function() {

		});	
		
	}
	
	// 显示图片
	$scope.showPic = function(imgPath){
		$scope.dialogShow = true;
		$scope.picPath = imgPath;
	}
	
	$scope.cancleBtnClick = function(){
		$scope.dialogShow = false;
	}
	
	$scope.today = function(){
	    var today=new Date();
	    var h=today.getFullYear();
	    var m=today.getMonth()+1;
	    var d=today.getDate();
	    m= m<10?"0"+m:m;   //  这里判断月份是否<10,如果是在月份前面加'0'
	    d= d<10?"0"+d:d;        //  这里判断日期是否<10,如果是在日期前面加'0'
	    return h+"-"+m+"-"+d;
	}
	$scope.startdate = $scope.today();
	$scope.enddate = $scope.today();
	
	$scope.getBaseUserdocList('');
	
	$scope.changeDate = function(){		
		$scope.getBaseUserdocList("");
	}
	$scope.chooseDate = function(e){
        dateRangeUtil.shwoDateSelect(e.target,function(start,end){
            $scope.$apply(function(){
	            $scope.startdate = start.Format("yyyy-MM-dd");
	            document.getElementById('start_date').value = start.Format("yyyy-MM-dd");
	            $scope.enddate = end.Format("yyyy-MM-dd");
	             document.getElementById('end_date').value = end.Format("yyyy-MM-dd");
	            $scope.changeDate();
            });
        })
    }
    
    /*图片加载完成事件*/
	var current = 0;
	//已知图片数量 加载完成调用更新viewer
    $scope.imgLoadFinish = function(len){
    	current++;
		if(current==len){
			$('#viewer_main').viewer('update');
			current=0;
		}
    }
    //未知图片数量，每张图片加载完成 都执行更新
    $scope.imgLoadRefresh = function(){
    	$('#viewer_main').viewer('update');
    }

	// 得到所有选中的值
	$scope.getCheckedIds = function()
	{
  	  var ids = [];
  	  $("input.js_select:checked").not(":disabled").each(function(){		  
	    var selectId = $(this).attr("data-id");
	    ids.push(selectId);
  	  });
  	  return ids.join(",");
	}
	
	/**
	 * 全选
	 */
	$scope.selectAll = function(event){
		var target = event.target;
		
		if($(target).is(':checked')){  
			$('.js_select').prop("checked",true);
		}else{	
			$('.js_select').prop("checked",false);
		}
		$scope.queryCsLineCustTask();
	}

})