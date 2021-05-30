tempApp.run(['$rootScope','$timeout','commonFactory','http','$state','$ionicTabsDelegate','$location','$ionicPopup',
	function($rootScope,$timeout,commonFactory,http,$state,$ionicTabsDelegate,$location,$ionicPopup){
	

	/**
	 * 手机端rem对应像素自适应
	 * @type {[type]}
	 */
	var widthPercent = (document.body.clientWidth/440)*100;
	var heightPercent = (document.body.clientHeight/713)*100;
	$rootScope.fontSize = Math.min(widthPercent,heightPercent)+'%';

	/**
	 * 判断是否微信浏览器打开
	 * @type {[type]}
	 */
	var parentFrame = parent.document.getElementById('iframeId');
	//window!=top说明是嵌套，指定iframe不存在说明是其他网站iframe嵌套
	if(window!=top&&parentFrame){
		// 嵌套 并且iframe是指定id 说明是后台系统 不做处理
	}else{
		//是否为微信浏览器打开判断
		// var ua = navigator.userAgent.toLowerCase();
		// var isWeixin = ua.indexOf('micromessenger') != -1;
		// if(!isWeixin){
		//     location.href = 'views/mobile/weixin/weixin.html';
		// }
	}
	
	//保存微信appid
	if($location.search().wi_appid){
		window.sessionStorage.wi_appid = $location.search().wi_appid;
	}
	/**
	 * fastclick
	 * @Author   SunXinqiang
	 * @DateTime 2017-09-25
	 */
	if ('addEventListener' in document) {
		document.addEventListener('DOMContentLoaded', function() {
			FastClick.attach(document.body);
		}, false);
	}

	//是否显示底部导航栏
	$rootScope.isBottomTab = false;
	$rootScope.tabsCheck = 0;//默认显示第一个
	$rootScope.goGame = function(){
		 if(window.sessionStorage.gameState){
			 var stateTemp = JSON.parse(window.sessionStorage.gameState);
            $state.go(stateTemp.state,stateTemp.params);
        }
	}
	$rootScope.goHome = function(){
		$state.go('sellerPageInfo');
	}
	$rootScope.goMine = function(){
		$state.go('personCenter');
	}

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

    	//活动菜单是否隐藏判断
		if(!$rootScope.hasGame&&window.sessionStorage.hasGame){
			$rootScope.hasGame = true;
		}

    	if(toState.data){
    		$rootScope.isBottomTab = toState.data.hasBottom;
    	}else{
	    	$rootScope.isBottomTab = false;
    	}

    	if(toState.data){
    		$rootScope.tabsCheck = toState.data.tabsCheck;
    	}else{
    		$rootScope.tabsCheck = 0;
    	}
    });
    
	/**
	 * 手机端公共弹窗
	 * @type {Object}
	 */
	$rootScope.compop = {
		isShow: false,
		text: '',
		timer: null,
		show: function(text){
			this.isShow = true;
			if(text&&text.length>22){
				text = text.substring(0,22)+'...';
			}
			this.text = text;
			var that = this;
			this.timer = $timeout(function(){
				that.isShow = false;
			},1500);
		},
		hide: function(){
			$timeout.cancel(this.timer);
			this.isShow = false;
		}

	}
	/**
	 * 手机端中奖弹窗
	 * @type {Object}
	 */
	$rootScope.compopPrize = {
		isShow: false,
		text: '',
		disable: false,
		show: function(text,disableClick){
			this.isShow = true;
			this.text = text;
			this.disable = disableClick;
		},
		hide: function(){
			this.isShow = false;
		}

	}
	/**
	 * 手机端中奖弹窗
	 * @type {Object}
	 */
	$rootScope.compopFail = {
		isShow: false,
		text: '',
		textbtn: '',
		disable: false,
		show: function(text,text2,disableClick){
			this.isShow = true;
			this.text = text;
			this.textbtn = text2;
			this.disable = disableClick;
		},
		hide: function(){
			this.isShow = false;
		}

	}
	/**
	 * 手机端规则弹窗
	 * @type {Object}
	 */
	$rootScope.tabPop = {
		isTabPop: false,
		noteData: [],
		awardData: [],
		disable: false,//是否禁用点击
		isTabTwo: false,//显示第二个tab
		urlObj2:{},
		show: function(urlObj1,urlObj2,disable,isTabTwo){
			var _self = this;
			_self.noteData = urlObj1;
			_self.awardData = urlObj2;
			/*http.get(urlObj1.url,urlObj2.param,function(data){
				_self.noteData = data;
			},function(){});
			http.get(urlObj2.url,urlObj2.param,function(data){
				_self.awardData = data;
			},function(){})*/
			this.urlObj2 = urlObj2;
			this.isTabPop = true;
			this.disable = disable;
			this.isTabTwo = isTabTwo;
		},
		tab2Click: function(){
			var _self = this;
			if(this.disable){
				return;
			}
			this.awardData = [];
			http.get(_self.urlObj2.url,_self.urlObj2.param,function(data){
				_self.awardData = data;
				_self.isTabTwo = true;
			},function(){})
		},
		hide: function(){
			this.isTabPop = false;
			this.disable = false;
			this.isTabTwo = false;
		}

	}
	/**
	 * 手机端规则弹窗(预览)
	 * @type {Object}
	 */
	$rootScope.tabPop2 = {
		isTabPop: false,
		noteData: [],
		awardData: [],
		disable: false,//是否禁用点击
		isTabTwo: false,//显示第二个tab
		show: function(data1,data2,disable,isTabTwo){
			this.isTabPop = true;
			this.noteData = data1;
			this.awardData = data2;
			this.disable = disable;
			this.isTabTwo = isTabTwo;
		},
		hide: function(){
			this.isTabPop = false;
			this.disable = false;
			this.isTabTwo = false;
		},
		setData: function(data1,data2){
			this.noteData = data1;
			this.awardData = data2;
		}

	}

	/**
	 * 手机端规则弹窗(新)
	 * @type {Object}
	 */
	$rootScope.tabPop3 = {
		isTabPop: false,
		noteData: [],
		awardData: [],
		tab1Callback: null,
		tab2Callback: null,
		prizeCallback: function(){},
		isTabTwo: false,//显示第二个tab
		show: function(isTabTwo,tab1Callback,tab2Callback,prizeCallback){

			// 禁用背景滚动
			$('html').addClass('noscroll');
			$.smartScroll($('#scorllContentMain'),'.canscroll');
			$('.compop-background').on('touchstart touchmove',function(event){
				event.preventDefault();
			})

			var that = this;

			if(typeof(tab1Callback)=='function'){
				that.tab1Callback = tab1Callback;
			}
			if(typeof(tab2Callback)=='function'){
				that.tab2Callback = tab2Callback;
			}
			if(typeof(prizeCallback)=='function'){
				that.prizeCallback = prizeCallback;
			}
			if(that.noteData.length==0){
				that.tab1Callback(that);
			}
			if(!isTabTwo){//显示规则弹窗
				that.tab1Callback(that);
				that.isTabPop = true;
				that.isTabTwo = false;
			}
			if(isTabTwo){
				that.showTab2();//显示中奖tab
				return;
			}
		},
		showTab2: function(){
			// 禁用背景滚动
			$('html').addClass('noscroll');
			$.smartScroll($('#scorllContentMain'),'.canscroll');

			var that = this;
			that.awardData = [];
			that.tab2Callback(that);
			that.isTabTwo = true;
			that.isTabPop = true;
		},
		hide: function(){
			//启用滚动
			$('html').removeClass('noscroll');
			this.isTabPop = false;
			this.disable = false;
			this.isTabTwo = false;
		},
		setData: function(data1,data2){
			this.noteData = data1;
			this.awardData = data2;
		}

	}
	/**
	 * 手机端成功弹窗
	 * @type {Object}
	 */
	$rootScope.popSuccess = {
		isShow: false,
		content: '',
		isBig: false,
		show: function(data,isBig){
			this.isShow = true;
			this.content = data;
			this.isBig = isBig;
		},
		hide: function(){
			this.isShow = false;
			this.isBig = false;
			this.content = '';
		}
	}
	/**
	 * 公共加载页面
	 * @type {Object}
	 */
	$rootScope.comLoading = (function(){

		var _def_content = ['社区盒子','正在努力准备','现金红包','请同意获取地理位置，领取福利'];
		var _def_img = '../../img/mobile/loading/black_milk_fan_small.png';
		var _def_timeout = 4;
		var _timeoutId = null;

		var obj = {
			isShow: false,
			img: _def_img,
			content: _def_content,
			time: _def_timeout
		};
		obj.show = function(data){
			obj = angular.extend(obj,data);
			this.isShow = true;
			this.hideTimeout();
		}
		obj.hide = function(){
			this.content =  _def_content;
			this.img = _def_img;
			this.isShow = false;
			this.time = _def_timeout;
			$timeout.cancel(_timeoutId);
		}
		obj.hideTimeout = function(){
			if(obj.time<0){
				obj.hide();
				return;
			}
			$timeout.cancel(_timeoutId);
			_timeoutId = $timeout(function(){
				obj.time--;
				obj.hideTimeout();
			},1000)
		}
		obj.stop = function(){
			$timeout.cancel(_timeoutId);
		}
		return obj;
	})();

	/**
	 * 手机端中奖弹窗
	 * @type {Object}
	 */
	$rootScope.comGetPrize = {
		isShow: false,
		text: '',
		btnText: '确定',
		callback: function(){},
		show: function(text,btnText,callback){
			this.isShow = true;
			this.text = text;
			this.btnText = btnText || '确定';
			this.callback = callback || function(){};
		},
		hide: function(){
			this.isShow = false;
		}

	}
	/**
	 * 手机端未中奖弹窗
	 * @type {Object}
	 */
	$rootScope.comMissPrize = {
		isShow: false,
		text: '未中奖',
		btnText: '再来一次',
		callback: function(){},
		show: function(text,btnText,callback){
			this.isShow = true;
			this.text = text || '未中奖';
			this.btnText = btnText || '再来一次';
			this.callback = callback || function(){};
		},
		hide: function(){
			this.isShow = false;
		}

	}

	/**
	 * 分享引导弹窗
	 * @type {Object}
	 */
	$rootScope.comShare = {
		isShow: false,
		callback: null,
		show: function(callback){
			this.isShow = true;
			this.callback = callback;
		},
		hide: function(){
			this.isShow = false;
			if(typeof(callback)=='function'){
				callback();
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

    /**
     * 微信
     */
 	$rootScope.wxReady = false;
	$rootScope.getWxConfig = function(){
		var wi_appid = $location.search().wi_appid;
		if(!wi_appid){
			wi_appid = window.sessionStorage.wi_appid;
		}
    	var success = function(result){
    		if (result.data) {
    			// window.wx.config(result.data); 
    		     /**
    	         * 微信分享设置
    	         */
    	        window.wx.config({
    	            debug: false,
    	            appId: result.data.appId,
    	            timestamp: result.data.timestamp,
    	            nonceStr: result.data.nonceStr,
    	            signature: result.data.signature,
    	            jsApiList: [
    	              'checkJsApi',
    	              'onMenuShareTimeline',
    	              'onMenuShareAppMessage',
    	              'showMenuItems',
    	              'openLocation',
    	              'getLocation',
    	              'scanQRCode'
    	              ] 
    	          });

    	        window.wx.ready(function(){
			        window.wx.hideOptionMenu();
			        $rootScope.wxReady = true;
			        $rootScope.$broadcast('wxReady');
			  	});

			  	window.wx.error(function(){
			  		//console.log('wx.error');
			  	})
    		}
		};
		var error = function(result){
			//console.log('wx.error');
		};
		var data = {'wi_appid':wi_appid,'url': $location.absUrl().split('#')[0]};
		var url = '/weixin/web/weixinIndexController/queryWxJsSdkConf.action';
		http.post(url,data,success,error);

    }
   
	$rootScope.getWxConfig();
	
    $rootScope.showIonicPop = function(text,title,callback) {
	    var alertPopup = $ionicPopup.alert({
		    title: title,
		    template: text,
		    okText: '确认',
            okType: 'button-positive common-btn-radius' // String (默认: 'button-positive')。OK按钮的类型。
	    });
	    alertPopup.then(function(res) {
	       	if(typeof(callback)=='function'){
	       		callback();
	       	}
	    });
	    $rootScope.$on('$stateChangeStart',function(){
			alertPopup.hide();
		})
	};

	$rootScope.showIonicPop2 = (function(){
		var alertPopup = null;
		var obj = {};
		obj.show = function(text,title,callback){
			alertPopup = $ionicPopup.alert({
			    title: title,
			    template: text,
			    okText: '确认',
	            okType: 'button-positive common-btn-radius' // String (默认: 'button-positive')。OK按钮的类型。
		    });
		}
		obj.hide = function(){
			if(alertPopup!=null){
				alertPopup.close();
			}
		}
		return obj;
	})();

	$rootScope.videoPop = {
		isShow: false,
		title: '',
		show: function(title){
			window.sessionStorage.videoPopViewed = true;
			this.isShow = true;
			this.title = title;
		},
		hide: function(){
			this.isShow = false;
			var videoEle = document.getElementById('videoPop');
			videoEle.pause();
			videoEle.currentTime = 0;
		}
	}

	//错误捕获
	// var errorDebug = true;
	// window.onerror=handleErr
	// var txt=""

	// function handleErr(msg,url,l){
	// 	txt="There was an error on this page.\n\n"
	// 	txt+="Error: " + msg + "\n"
	// 	txt+="URL: " + url + "\n"
	// 	txt+="Line: " + l + "\n\n"
	// 	txt+="Click OK to continue.\n\n"
	// 	if(errorDebug){
	// 		alert(txt)
	// 	}
	// 	return true
	// }
}])