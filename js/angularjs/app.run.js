tempApp.run(['$rootScope','$timeout','commonFactory','http','$state','$ionicTabsDelegate',"$location","$window","$ionicPopup",
	function($rootScope,$timeout,commonFactory,http,$state,$ionicTabsDelegate,$location,$window,$ionicPopup){
	$rootScope.dateRange = {
	        chooseDate: function(e, id, id2) {
	            var id = id ? id : "start_date";
	            var id2 = id2 ? id2 : "end_date";
	            dateRangeUtil.shwoDateSelect(e.target, function(start, end) {
	                $("#" + id).val(start.Format("yyyy-MM-dd"));
	                $("#" + id2).val(end.Format("yyyy-MM-dd"));
	            })
	        }
	    }
	// 时间范围选择配置
	$rootScope.dateRangeConfig = {
        applyClass : 'btn-sm btn-success',
        cancelClass : 'btn-sm',
        locale: {
            applyLabel: '确认',
            cancelLabel: '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            firstDay : 1,
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ]
        },
        opens : 'right',    // 日期选择框的弹出位置
        separator : ' 至 ',
        format: 'YYYY-MM-DD'
 
    }
   	// 是否为首页，控制显示右侧边栏
    $rootScope.isIndexPage = false;
	if(sessionStorage.USER){
		$rootScope.USER = JSON.parse(sessionStorage.USER);
	}
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    	$rootScope.isIndexPage = toState.name == 'index.homePage';
    });
    
	$rootScope.settingMod = {
		title: '标题',
		body: '内容',
		timeout: 0,//自动隐藏时间 毫秒
		callback: '',
		show: function(title,body,timeout,callback){
			var set = this;
			set.title = title;
			set.body = body;
			set.timeout = timeout;
			set.callback = callback;
			$('#setting_modal').modal('show');
			if(set.timeout){
				setTimeout(function(){
					$('#setting_modal').modal('hide');
					if(typeof(set.callback)=='function'){
						set.callback();
					}
				},set.timeout);
			}
		},
		hide: function(){
			$('#setting_modal').modal('hide');
			if(typeof(this.callback)=='function'){
				this.callback();
			}
		}
	}

	/**
	 * 图片预览，里层是img直接设置src
	 * @Author   SunXinqiang
	 * @DateTime 2017-08-17
	 * @param    {files }    files         [input this.files]
	 * @param    {string}    id            [外层预览图片id]
	 * @param    {string}    idFrame       [iframe的id]
	 * @param    {string}    idChild       [里层预览图片id]
	 * @return   {[type]}    [description]
	 */
	$rootScope.imgPreview = function(files,id,idFrame,idChild){
	    //判断是否支持FileReader
	    if (window.FileReader) {
	        var reader = new FileReader();
	    } else {
	        //console.log('您的浏览器不支持图片预览功能，如需该功能请升级您的浏览器！');
	    }
	    //获取文件
	    var file = files[0];
	    reader.readAsDataURL(file);

	    //读取完成
	    reader.onload = function(e) {
	        //获取图片dom
	        $('#'+id).attr('src',e.target.result);

        	commonFactory.setWidthHeight(id,e.target.result);
	        var childWindow = document.getElementById(idFrame).contentWindow;
	        childWindow.$('#'+idChild).attr('src',e.target.result);
	    };
	}
	/**
	 * 图片预览,里层设置style='background-image:url({{scope}})'
	 * @Author   SunXinqiang
	 * @DateTime 2017-08-17
	 * @param    {files }    files         [input this.files]
	 * @param    {string}    id            [外层预览图片id]
	 * @param    {string}    idFrame       [iframe的id]
	 * @param    {string}    idChild       [里层预览图片id]
	 * @param    {string}    key       	   [里层scope名]
	 * @return   {[type]}    [description]
	 */
	$rootScope.imgPreview2 = function(files,id,idFrame,idChild,key){
	    //判断是否支持FileReader
	    if (window.FileReader) {
	        var reader = new FileReader();
	    } else {
	        //console.log('您的浏览器不支持图片预览功能，如需该功能请升级您的浏览器！');
	    }

	    //获取文件
	    var file = files[0];
	    reader.readAsDataURL(file);

	    //读取完成
	    reader.onload = function(e) {
	        //获取图片dom
	        $('#'+id).attr('src',e.target.result);

	        commonFactory.setWidthHeight(id,e.target.result);
	        commonFactory.setScopeToChild(idFrame,idChild,key,e.target.result)
	    };
	}
}])