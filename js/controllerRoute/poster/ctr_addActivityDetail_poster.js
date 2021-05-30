tempApp.controller('ctr_addActivityDetail_poster', function($scope,commonFactory,
		$rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,messageFactory,http) {
	
	$scope.vo = {
			mf_id : "",
			mf_orgid :"",
			mf_shopid : "",
			mf_modelid : $stateParams.mt_id,
			mf_wx_type : 1,//1 认证服务号，2 认证订阅号
			mf_name : "",
			mf_starttime : "2018-01-31",
			mf_endtime : "2018-01-31",
			mf_spread_type : 2,//海报推广奖励类型
			mf_spread_amount_money : 0,//海报推广奖励总金额
			mf_spread_amount_point : 0,//海报推广奖励总积分
			mf_card_id : "",//奖励id(优惠券)
			mf_grant_card_num : 0,
			mf_follow_money : 0,//扫码人关注红包奖励
			mf_follow_point : 0,//扫码人关注积分奖励
			mf_recommend_money : 0,//推荐人红包奖励
			mf_recommend_point : 0,//推荐人积分奖励
			mf_money_day_limit : 0,//单人红包奖励日上限
			mf_money_limit : 0,//单人红包奖励总上限
			mf_point_day_limit : 0,//单人积分奖励日上限
			mf_point_limit : 0,//单人积分奖励总上线
			mf_withdraw_cill : 0,//单人提现门槛
			mf_isrecommend_area : "N",//推广人地域限制
			mf_recommend_area : "",//推广人地域限制
			mf_effective_time : "",//海报有效时间
			mf_flyer_num : 500,//海报数量
			mf_grant_num : 0,//已发放海报数量
			mf_ad_type : "1",//手机端开平广告类型（1系统，2自定义）
			mf_ad_url : "",//手机端开屏广告图
			mf_sms_check : "N",//提现短信验证
			mf_rule : "",//规则说明
			mf_content : "",//海报内容
			mf_share_title : "",//分享标题
			mf_share_describe : "",//分享描述
			mf_isuse_headimg : "",//是否使用分享人头像
			mf_share_url : "",//分享图片
			mf_state : "",//状态
			mf_addtime : "",
			mf_updatetime : "",
			mf_dr : "1"
	}
	
	/*$scope.config = {
		base: {
				name: '微海报', //活动名称
				// time: $scope.dateNow[0]+'至 '+$scope.dateNow[1], 			//活动起止时间
				join_people: {		//参与人数
					show: 1,	//显示隐藏
					num: 1			//人数
				},
				rule: '',			//活动规则 
				mm_type : '1' 
			},
		sendprize: {
			single_one_chance: {	//单人总抽奖机会
				disable: 2,			//是否限制：1:限制,2:不限
				times: 2
			},
			mm_lucky_type:{
				disable:1
			},
			day_chance: 3,			//每日抽奖机会 每人每日有的抽奖机会
			award_point: 10,		//抽奖门槛
			total_award_times: 2,   //总中奖机会
			award_chance_type: {	//中奖概率模式
				type: 1,			//1: 按总中奖概率,2:按单个奖项中奖概率
				chance: 15			//总中奖概率(百分比)
			},
			mm_prizes_zyff : 2 

		},
		gift_setting: [{
			gift_title: '奖项一',	//奖项名
			mp_level: "一等奖", 	//奖项等级
			mp_type: '1',			//礼品类型
			gift: '',				//选择礼品
			available_time: '',		//兑奖时间
			oprate_tip: '',			//操作提示
			generate_num: 1,		//生成券号 1:系统生成,2:手工导入
			sync_to_wechat: 1,		//同步发布至微信卡券 1:是，2: 否
			second_title: '',		//副标题
			get_gift_address: '',	//兑奖地址
			service_phone: '',		//客服电话
			gift_note: '',			//兑奖须知
			mp_name : '十元优惠' ,           //奖品名称
			mp_prize_num : '1',
			mp_create_type: 1 ,
			mp_sent_weixin : 1,
			mp_subtitle : '',
			mp_change_address:'',
			mp_service_tel:'',
			mp_change_notice:'',
			mp_prize_num : 1,
			mp_probability : 10 ,
			mp_default : 1 ,
			mp_sortnum : '' ,
			// giftStatusTime : $scope.dateNow[0]+'至 '+$scope.dateNow[1],
			// mp_start_time:$scope.dateNow[0]+" 00:00:00",
			// mp_end_time:$scope.dateNow[1] +" 23:59:59" 
		}],
		advanced_setting: {
			mas_sponsor : '',
			mas_isopenurl:'N',
			mas_url:'',
			mas_isdisplay_copyright:'N',
			mas_display_copyright:'',
			mas_loading_page:'',
			mas_sharing_type:'1',
			mas_sharing_imag:'',
			mas_sharing_title:'',
			mas_sharing_content:'',
			mas_sharing_url:'',
			mas_sponsor_wx:'',
			mas_guide_links:'',
			mas_participation_restriction:'' 
		}
	}*/
	

    $scope.headPic = true;
    $scope.nickName = true;
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    
    var oriData = {
                "headerImg": {
                    "style": {
                        "left": 119,
                        "top": 382,
                        "width": 40,
                        "height": 40
                    },
                    "path": "img/96.jpg",
                    "showState": "1"
                },
                "codeImg": {
                    'style': {
                        "left": 9,
                        "top": 390,
                        "width": 100,
                        "height": 100
                    },
                    "type": 1 ,//1 系统 2自定义
                    "path": "img/qrcode_zhoubao.png",
                    "url": "http://www.baidu.com"
                },
                "bgImg": {
                    style: {
                        "left": 0,
                        "top": 0,
                        "width": 320,
                        "height": 504

                    },
                    "path": "img/bg.jpg",
                    "showState": "1"
                },
                "bannerImg": {
                    style: {
                        "left": 0,
                        "top": 0,
                        "width": 320,
                        "height": 19

                    },
                    "path": "img/laba.png",
                    "showState": "1"
                },
                "posterText": [{
                    style: {
                        "left": 169,
                        "top": 428,
                        "fontSize": 22,
                        "color": "#a87b51",
                        "minWidth": 100

                    },
                    "content": "分享有礼2"
                }, {
                    style: {
                        "left": 165,
                        "top": 455,
                        "fontSize": 16,
                        "color": "#a87b51",
                        "minWidth": 100
                        
                    },
                    "content": "这里是微俱聚"
                }],
                "representText": {
                    style: {
                        "left": 122.391,
                        "top": 473,
                        "fontSize": 16,
                        "color": "#000000",
                        "minWidth": 100

                    },
                    "content": "[nickname]",
                    "showState": "1"
                }
            }

	$scope.templateData = angular.copy(oriData);
    $scope.deleteText = function(index){
        $scope.templateData.posterText.splice(index,1);
    }

    $('#activityRange').daterangepicker($rootScope.dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    	$scope.vo.mf_starttime = start.format('YYYY-MM-DD');
    	$scope.vo.mf_endtime = end.format('YYYY-MM-DD');
    	$scope.vo.time = start.format('YYYY-MM-DD')+" 至 "+end.format('YYYY-MM-DD');
    });

    $scope.returnList = function(){
        $state.go('index.posterTypeList');
    }

    $scope.toggleHead = function(){
        if($scope.templateData.headerImg.showState == 1){
            $scope.templateData.headerImg.showState = 0
        }else{
            $scope.templateData.headerImg.showState = 1;
        }
    }
    $scope.toggleName = function(){
        if($scope.templateData.representText.showState == 1){
            $scope.templateData.representText.showState = 0
        }else{
            $scope.templateData.representText.showState = 1;
        }
    }
    $scope.addText = function(){
        $scope.templateData.posterText.push({
                    style: {
                        "left": 20,
                        "top": 40,
                        "fontSize": 16,
                        "color": "#000",
                        "minWidth": 100

                    },
                    "content": "海报文案"
                })
    }

    $scope.save = function(){
        var newObj = translatePercent($scope.templateData);
        $scope.vo.mf_content = JSON.stringify(newObj);
        $scope.vo.mf_rule = $("#rule_detail").text();
        console.log($scope.vo);
        var success = function(result){
        	messageFactory.showMessage('success',result.desc);
        }
        var error = function(result){
        	messageFactory.showMessage('error',result.desc);
        }
        var url = "/admin/flyer/marketingFlyerControl/update.action";
        http.post(url,$scope.vo,success,error);
    }

    /**
     * 对宽高top left 进行百分百转换
     * @DateTime 2018-01-19
     * @param    {[type]}
     * @return   {[type]}
     */
    function translatePercent(obj){
        var horizontal = ['left','width','minWidth'];
        var postWidth = $('#postContent').width();

        var vertical = ['top','height'];
        var postHeight = $('#postContent').height();

        var newObj = angular.copy(obj);
        objEach(newObj,function(key,innerObj){
            if(horizontal.indexOf(key)>=0){
                innerObj[key] = (innerObj[key]/postWidth)*100 + '%';
            }
            if(vertical.indexOf(key)>=0){
                innerObj[key] = (innerObj[key]/postHeight)*100 + '%';
            }
        });
        return newObj;
    }

    /**
     * 对象遍历
     * @DateTime 2018-01-19
     * @param    {[type]}
     * @param    {Function}
     * @return   {[type]}
     */
    function objEach(obj, callback){
        for (var a in obj) {
            if (typeof (obj[a]) == "object") {
                objEach(obj[a],callback); //递归遍历
            }
            else {
                callback(a, obj);
            }
        }
    }

    var isImgEventExist = false;
    var imgNow = '';
    function getImg(){
        return imgNow;
    }
    function setImg(img){
        imgNow = img;
    }
    /**
     * 显示图片上传
     */
    $scope.upImage = function(img){
        setImg(img);
        if(!isImgEventExist){
            isImgEventExist = true;
            $scope.ue_myeditor.addListener("beforeInsertImage", function(t,arg){
                var imgs="";
                
                if(arg.length>0){
                    imgs = arg[0].src;
                }
                var imgsArr = imgs.split(",");
                var imgName = getImg();
                $scope.templateData[imgName].path = imgsArr[0].split("|")[0];
            });
        }
        var myImage = $scope.ue_myeditor.getDialog("insertimage");
        myImage.open();
    };

    $scope.resetImg = function(){
        $scope.templateData.bgImg.path = oriData.bgImg.path;
    }

    $scope.changeCode = function(){
    	$scope.codeImg = {
    			"type": $scope.templateData.codeImg.type ,//1 系统 2自定义
    			"url": $scope.templateData.codeImg.url
    	};
        $('#myModal2').modal('show');
    }

    $scope.setCode = function(){
        $scope.templateData.codeImg.url = $('#barcodeId').val();
        $('#myModal2').modal('hide');
        $scope.templateData.codeImg.url = $scope.codeImg.url;
        $scope.templateData.codeImg.type = $scope.codeImg.type;
        var _url = $scope.templateData.codeImg.url;
        var _style = $scope.templateData.codeImg.style;
        $scope.templateData.codeImg.path = commonFactory.getQrcodeBase64(_url, _style.width, _style.height, 5);
    }

    $scope.showAddress = function(){
        $('#addressId').modal('show');
    }

    var zNodes = [{"bca_name":"湖北","click":false,"id":"100000171129170644062853742","name":"湖北","open":false,"pId":"0"},{"bca_name":"武汉","click":false,"id":"100000171129170657953838626","name":"武汉","open":false,"pId":"100000171129170644062853742"},{"bca_name":"河北","click":false,"id":"100000171129185316423771509","name":"河北","open":false,"pId":"0"},{"bca_name":"邢台","click":false,"id":"100000171129185325480218661","name":"邢台","open":false,"pId":"100000171129185316423771509"},{"bca_name":"廊坊","click":false,"id":"100000171129185357344435693","name":"廊坊","open":false,"pId":"100000171129185316423771509"},{"bca_name":"燕郊","click":false,"id":"100000171129185423135480292","name":"燕郊","open":false,"pId":"100000171129185316423771509"},{"bca_name":"北京","click":false,"id":"100000171129185429434829685","name":"北京","open":false,"pId":"0"},{"bca_name":"大兴","click":false,"id":"100000171129185437299534955","name":"大兴","open":false,"pId":"100000171129185429434829685"},{"bca_name":"严加","click":false,"id":"100000171211161810428315482","name":"严加","open":false,"pId":"100000171129185423135480292"}];
    var zNodes2 = [];
    var zTreeObj = null;
    var zTreeObj2 = null;
    var setting2 = {
        data: { 
          key: { 
            title: "t"
          }, 
          simpleData: { 
            enable: true
          }
        },
        edit: {
            enable: true,
            showRemoveBtn: true,
            showRenameBtn: false
        },
        callback: {
            onRemove: function(event, treeId, treeNode) {
                //更新ztree1的选中状态
                var node = zTreeObj.getNodesByParam('id',treeNode.id,null)[0];
                zTreeObj.checkNode(node, false, true);
                zNodes2 = angular.copy(zTreeObj.getCheckedNodes(true));
                for(var idx in zNodes2){
                    delete zNodes2[idx].children;
                }
                zTreeObj2 = $.fn.zTree.init($("#addressRight"), setting2, zNodes2);
            }
        }
    }; 
    zTreeObj2 = $.fn.zTree.init($("#addressRight"), setting2, zNodes2);
    //弹窗里面的城市菜单下拉设置
    var setting = {
        data: { 
          key: { 
            title: "t"
          }, 
          simpleData: { 
            enable: true
          }
        }, 
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: { "Y": "ps", "N": "ps" }
        },
        callback: { 
          onCheck: function(event, treeId, treeNode){
            zNodes2 = angular.copy(zTreeObj.getCheckedNodes(true));
            for(var idx in zNodes2){
                delete zNodes2[idx].children;
            }
            zTreeObj2 = $.fn.zTree.init($("#addressRight"), setting2, zNodes2);
          }
        }
       };

    zTreeObj = $.fn.zTree.init($("#addressLeft"), setting, zNodes);

    $scope.setAddress = function(){
        var checkedNodes = zTreeObj.getCheckedNodes(true);
        var ids = [];
        for(var idx in checkedNodes){
           ids.push(checkedNodes[idx].id);
        }
        console.log(ids);
        $('#addressId').modal('hide');
    }
})