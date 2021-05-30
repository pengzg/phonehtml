tempApp.controller('ctr_addActivityDetail_wheel', function($scope,commonFactory,$timeout) {

	$scope.config = {
		base: {
				name: '幸运大转盘', //活动名称
				time: '', 			//活动起止时间
				join_people: {		//参与人数
					show: false,	//显示隐藏
					num: 1			//人数
				},
				rule: '',			//活动规则
			},
		sendprize: {
			single_one_chance: {	//单人总抽奖机会
				disable: 1,			//是否限制：1:不限,2:限制
				times: 5
			},
			day_chance: 50,			//每日抽奖机会 每人每日有的抽奖机会
			award_point: 30,		//抽奖门槛
			total_award_times: 1,   //总中奖机会
			award_chance_type: {	//中奖概率模式
				type: 1,			//1: 按总中奖概率,2:按单个奖项中奖概率
				chance: 30			//总中奖概率(百分比)
			}

		},
		gift_setting: [{
			gift_title: '奖项一',	//奖项名
			gift_level: '一等奖', 	//奖项等级
			gift_type: '',			//礼品类型
			gift: '',				//选择礼品
			available_time: '',		//兑奖时间
			gift_num: {				//奖品数量
				total: 10,			//奖品数量
				used: 3,			//已领取数量
			},			
			oprate_tip: '',			//操作提示
			generate_num: 1,		//生成券号 1:系统生成,2:手工导入
			sync_to_wechat: 1,		//同步发布至微信卡券 1:是，2: 否
			second_title: '',		//副标题
			get_gift_address: '',	//兑奖地址
			service_phone: '',		//客服电话
			gift_note: ''			//兑奖须知

		}],
		higher_setting: {
			company_info: {
				title: '企业信息',		//标题
				company: '社区快线',	//主办单位
				jump_open: 1,			//主办单位开启跳转 1:开启，2：关闭
				jump_url: '',			//跳转链接
				logo: 1,				//企业logo 1:隐藏，2：显示
				show_right: 1,			//显示版权 1:隐藏，2：显示
				right_setting: 1,		//版权设置 1:隐藏，2：显示
				loading_page: 1,		//加载页面 1:默认，2：自定义
			},
			share_setting: {
				title: '分享设置',		//标题
				share_type: 1,			//分享形式 1:图片分享，2：自定义
				share_logo: 1,			//微信分享图标 1:默认，2：自定义
				share_title: 1,			//微信分享标题 1:默认，2：自定义
				share_content: 1		//微信分享内容 1:默认，2：自定义
			},
			follow_setting: {
				title: '关注设置',		//标题
				account: '',  			//承办活动微信公众号
				gain_url: '',			//引导关注图文链接
				join_restrict: 1,		//参与限制	1:开启，2：关闭
				follow_restrict: 1,		//限制关注后参与	1:开启，2：关闭
			},
			safe_setting: {
				title: '安全设置',
				get_gift_code: 1,		//领奖验证码 1:开启，2：关闭
				black_list: 1,			//开启黑名单 1:开启，2：关闭
				gift_contact: 1,		//联系兑奖 1:开启，2：关闭
				gift_contack_info: 1,	//兑奖 1:姓名，2：手机号，3：地址，4：扩展信息
				safe_level: 1,			//红包安全机制 1:初级，2：中级，3：高级
				verify_type: 1,			//验证方式 1:短信验证，2：语音验证
				voice_count: 10,		//预计语音验证量
				voice_left: 9,			//账户语音余额
			}
		}
	}
	$scope.iFrameSrc = '/main-mobile.html#/wheelPreview';
	$scope.titleData = '<span class="tag" contenteditable="false">玩家名称</span>想要你的吻，你不吻一下吗？';
	$scope.shareData = '<span class="tag" contenteditable="false">玩家名称</span>在活动中即将问鼎大奖，你敢挑战Ta吗？丰厚奖品等着你哦！';
	$scope.shareContentData = '<span class="tag" contenteditable="false">玩家名称</span>已经在活动中赢得了奖品，你也快来玩游戏赢大奖吧！';

	$scope.defalut_back = '../../img/mobile/wheel/bg.png';
	$scope.defalut_banner = '../../img/mobile/wheel/wheel_title.png';

	var PRIZETYPE = ['奖项一','奖项二','奖项三','奖项四','奖项五','奖项六','奖项七'];
	$scope.titleCheck = false;

	var ALL_NAVIGATE = ['游戏环节','领取环节','活动说明','我的奖品'];
	$scope.navigate = ['游戏环节','活动说明','我的奖品','中奖','未中奖','活动结束'];

	var dateRangeConfig = {
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
    var onePrize = {
		gift_title: '奖项一',	//奖项名
		gift_level: '一等奖', 	//奖项等级
		gift_type: '',			//礼品类型
		gift: '',				//选择礼品
		available_time: '',		//兑奖时间
		gift_num: {				//奖品数量
			total: 10,			//奖品数量
			used: 3,			//已领取数量
		},			
		oprate_tip: '',			//操作提示
		generate_num: 1,		//生成券号 1:系统生成,2:手工导入
		sync_to_wechat: 1,		//同步发布至微信卡券 1:是，2: 否
		second_title: '',		//副标题
		get_gift_address: '',	//兑奖地址
		service_phone: '',		//客服电话
		gift_note: ''			//兑奖须知

	}
	$scope.addTitleData = function(){
		$scope.titleData += '<span class="tag" contenteditable="false">玩家名称</span>';
	}
	$scope.addShareData = function(type){
		if(type=='name'){
			$scope.shareData += '<span class="tag" contenteditable="false">玩家名称</span>';
		}
		if(type=='game'){
			$scope.shareData += '<span class="tag" contenteditable="false">游戏成绩</span>';
		}
	}
	$scope.addShareContentData = function(type){
		if(type=='name'){
			$scope.shareContentData += '<span class="tag" contenteditable="false">玩家名称</span>';
		}
		if(type=='game'){
			$scope.shareContentData += '<span class="tag" contenteditable="false">游戏成绩</span>';
		}
		if(type=='level'){
			$scope.shareContentData += '<span class="tag" contenteditable="false">奖项等级</span>';
		}
		if(type=='prize'){
			$scope.shareContentData += '<span class="tag" contenteditable="false">奖品名称</span>';
		}
	}
	$scope.subtrackPrize = function(){
		var len = $scope.config.gift_setting.length;
		if(len==1){
			return;
		}
		$scope.config.gift_setting.pop();
		$scope.setPreviewToChild();
	}
	$scope.addPrize = function(){
		var len = $scope.config.gift_setting.length;
		if(len==7){
			return;
		}
		onePrize.gift_title = PRIZETYPE[len];
		$scope.config.gift_setting.push(angular.copy(onePrize));
		$scope.setPreviewToChild();
	}
	$timeout(function(){
		$('#dateTimeRange').daterangepicker(dateRangeConfig, function(start, end, label) { // 格式化日期显示框
	    	//console.log(start.format('YYYY-MM-DD'))
	    });
	},100)
    $('#activityRange').daterangepicker(dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    	//console.log(start.format('YYYY-MM-DD'))

    	$scope.config.base.time = $('#activityRange').val();
    	$scope.setPreviewToChild();
    });

    $scope.showPreview = function(idx){
    	commonFactory.setScopeToChild('iframeId','wheelPreview','showIdx',idx);
    }
    $scope.changePage = function(direction){
    	if(direction=='left'){
    		if($scope.checkedIdx0==0){
    			$scope.checkedIdx0 = $scope.navigate.length-1;
    		}else{
    			$scope.checkedIdx0--;
    		}
    	}else{
    		if($scope.checkedIdx0==($scope.navigate.length-1)){
    			$scope.checkedIdx0 = 0;
    		}else{
    			$scope.checkedIdx0++;
    		}
    	}
    	$scope.showPreview($scope.checkedIdx0);
    }

    $scope.setPreviewToChild = function(){
    	var giftArr = new Array();
    	for(var i=0,len=$scope.config.gift_setting.length;i<len;i++){
    		var item = $scope.config.gift_setting[i];
    		giftArr.push(item.gift_level+'：'+item.gift);
    	}
    	var ruleArr = $scope.config.base.rule.split('\n');
    	var data1 = [
 					{title:'活动奖品',content:{text:giftArr,id:'set_actaward_box',idx:2}},
 					{title:'活动时间',content:{text:[$scope.config.base.time],id:'set_acttime_box',idx:0}},
 					{title:'活动规则',content:{text:ruleArr,id:'set_ruletext_box',idx:0}},
 				]
    	commonFactory.setScopeToChild('iframeId','wheelPreview','data1',data1);
    }
})