tempApp.controller('ctr_mverification', ['$rootScope', '$scope', '$ionicPopup','$stateParams','http','$timeout',
    function($rootScope, $scope, $ionicPopup,$stateParams,http,$timeout) {

        var myPopup;

        $scope.$on('$stateChangeStart',function(){
            window.wx.hideOptionMenu();
            if(myPopup){
                myPopup.close();
            }
        });
        $rootScope.isBottomTab = true; //显示底部栏
        $rootScope.comLoading.hide(); //隐藏加载页面

        $rootScope.hx_password = ''; //核销密码
        $scope.errorTip = ''; //弹出框错误提示

        $scope.hasShared = false;//是否分享过

        $scope.shareObj = {
            "title": "这是标题",
            "desc": "这是文档",
            "shareLink": "这是链接",
            "shareImg": "图片"
        };

        //下拉刷新
        $scope.onRefresh = function() {
        	$timeout(function() {
            	 $scope.getPrizeInfo();
            }, 1000);
        }
        //密码核销弹窗
        $scope.showPass = function() {
            if(!$scope.hasShared){
                $rootScope.comShare.show();
                return;
            }
            // 一个精心制作的自定义弹窗
            myPopup = $ionicPopup.show({
                template: '<div class="pop-input"><input type="password" ng-model="$root.hx_password"></div><div class="error-tip" ng-bind="errorTip"></div>',
                title: '请输入兑奖密码',
                subTitle: '兑奖功能仅供商家兑奖，请勿擅自使用',
                scope: $scope,
                buttons: [
                    { text: '取消' },
                    {
                        text: '<b>确定</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                        	e.preventDefault();
                            if (!$rootScope.hx_password) {
                                $scope.errorTip = '密码不能为空'
                            } else {
                            	 $scope.checkPrizeByCode($rootScope.hx_password); 
                            }
                        }
                    },
                ]
            });
            // 弹窗隐藏后执行
            myPopup.then(function(res) {
                $scope.errorTip = '';
                $rootScope.hx_password = '';
            });
        }
        /**
         * 获取奖品的信息 
         */
        $scope.getPrizeInfo = function(){
        	
    		var success = function(result){
    			$scope.data = result.data;
    			if($scope.data.mw_isshare==2){
                    $scope.hasShared = false;
                }else{
                    $scope.hasShared = true;
                }
                $scope.getShareInfo();
    			$scope.data.mp_start_time =$scope.data.mp_start_time.substring(0,10);
    			$scope.data.mp_end_time = $scope.data.mp_end_time.substring(0,10);
    			
    			var canvas = document.getElementsByTagName("canvas");
    			if(canvas.length<=0){
    				$('#djQrcode').qrcode({width:180,height:180,correctLevel:0,text:$scope.data.mw_prizecode});
    			}
    			$scope.$broadcast('scroll.refreshComplete');
     			$scope.$broadcast('scroll.infiniteScrollComplete');
    		};
    		var error = function(result){
    			
    		};
    		var url = '/weixin/web/weixinActivityPrizeController/getPrizeInfo.action';
    		http.post(url,$.extend({'mw_id':$stateParams.mw_id},$scope.pager),success,error);
        	
        }
        $scope.getPrizeInfo();
        /**
         * 通过核销密码 进行核销 
         */
        $scope.checkPrizeByCode = function(mmu_pwd){
        	
        	var success = function(result){
        		  $scope.getPrizeInfo();
        		  myPopup.close();
                  $rootScope.showIonicPop('兑奖成功','提示');
    		};
    		var error = function(result){
    			 $scope.errorTip = result.desc;
                 $rootScope.hx_password = '';
    		};
    		var url = '/weixin/web/weixinActivityPrizeController/checkPrizeByCode.action';
    		http.post(url,{'mw_id':$stateParams.mw_id,'mmu_pwd':mmu_pwd},success,error);
        }
        //设置分享标题
        function setShare() {
            // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
            window.wx.checkJsApi({
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'showMenuItems'
                ],
                success: function(res) {
                    // 2:分享到朋友圈
                    window.wx.onMenuShareTimeline({
                        title: $scope.shareObj.title, // 分享标题
                        link: $scope.shareObj.shareLink, // 分享链接
                        imgUrl: $scope.shareObj.shareImg, // 分享图标
                        success: function() {
                            $scope.update_share();

                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    // 3: 分享给朋友
                    window.wx.onMenuShareAppMessage({
                        title: $scope.shareObj.title, // 分享标题
                        desc: $scope.shareObj.desc, // 分享描述
                        link: $scope.shareObj.shareLink, // 分享链接
                        imgUrl: $scope.shareObj.shareImg, // 分享图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function() {
                            // alert($scope.shareObj.shareLink);
                            $scope.update_share();
                        },
                        cancel: function() {
                            // 用户取消分享后执行的回调函数
                        }
                    });

                    // window.wx.showOptionMenu();   // 显示微信菜单 
                    window.wx.showMenuItems({
                        menuList: ['menuItem:share:appMessage','menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
                    });
                }
            });

        }
        /**
         * 更新分享状态 
         */
        $scope.update_share = function() {
            var success = function(result) {
                //messageFactory.showMessage('success',result.desc);
                // 
                $rootScope.comShare.hide()
                $scope.hasShared = true;
            };
            var error = function(result) {
                // messageFactory.showMessage('error',result.desc);
            };
            var data = { "mw_id": $stateParams.mw_id };
            var url = '/weixin/web/weixinIndexController/updateShare.action';
            http.post(url, data, success, error);

        }

        /**
         * 得到分享的信息
         */
        $scope.getShareInfo = function() {
            var success = function(result) {
                if (result.data && result.data.mas_sharing_title) {
                    // $rootScope.comShare.show();
                    $scope.shareObj = {
                        "title": result.data.mas_sharing_title,
                        "desc": result.data.mas_sharing_content,
                        "shareLink": "http://"+window.location.host+'/#/shareEmpty?callback_url='+encodeURIComponent(result.data.mas_sharing_url),
                        "shareImg": result.data.mas_sharing_imag_show
                    };
                    if($rootScope.wxReady){
                        setShare();
                    }else{
                        $rootScope.$watch('wxReady',function(newValue,oldValue){
                            if(newValue){
                                setShare();
                            }
                        });
                    }

                } else {
                     $scope.hasShared = true;
                }
                // 
            };
            var error = function(result) {
                // messageFactory.showMessage('error',result.desc);
                $rootScope.showIonicPop('对不起网络错误，请稍后再试');
            };
            var data = { "mas_mainid": $scope.data.mw_activityid };
            var url = '/weixin/web/weixinIndexController/getDetailByMainid.action';
            http.post(url, data, success, error);
        }

        $scope.showRule = function(){
        	var msg = $scope.data.mw_activity_rule;
        	var desc = msg.split(/[;；]/);
        	var msghtml = '';
        	for(var i in desc){
        		msghtml += '<div class="com-align-left">'+desc[i]+'</div>';
        	}
            $rootScope.showIonicPop(msghtml,'兑换规则')
        }

    }
])