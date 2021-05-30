tempApp.controller('ctr_addActivityDetail_squared', function($scope,commonFactory,
		$rootScope, $location,
		$state,$timeout,http,$stateParams,EzConfirm,$compile,messageFactory) {
	$scope.detail = '';
	 // $scope.giftTypeList=[{'type':'1','name':"实物礼品（奖券"},{'type':'2','name':"微信红包"}];
	$scope.giftTypeList=[{'type':'1','name':"实物礼品（奖券"}];
    $scope.giftList=[{'id':1,"name":"微信红包100元"},{'id':2,"name":"微信红包1000元"}];
    
    $scope.giftlevelList = [{'code':1,'name':"左上"},{'code':2,'name':"上中"},
                            {'code':3,'name':"右上"},{'code':8,'name':"左中"},
                            {'code':4,'name':"右中"}, {'code':7,'name':"左下"},
                            {'code':6,'name':"中下"},{'code':5,'name':"右下"},];
    
    $scope.dateNow = dateRangeUtil.getCurrentMonth('yyyy-MM-dd');
	$scope.checkedIdx2=0;
	$scope.config = {
		base: {
				name: '幸运九宫格', //活动名称
				time: $scope.dateNow[0]+'至 '+$scope.dateNow[1], 			//活动起止时间
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
			giftStatusTime : $scope.dateNow[0]+'至 '+$scope.dateNow[1],
			mp_start_time:$scope.dateNow[0]+" 00:00:00",
			mp_end_time:$scope.dateNow[1] +" 23:59:59" 
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
	}
	$scope.iFrameSrc = '/main-mobile.html#/squaredPreview?mm_id='+$stateParams.mm_id;
	$scope.titleData = '<span class="tag" contenteditable="false">玩家名称</span>想要你的吻，你不吻一下吗？';
	$scope.shareData = '<span class="tag" contenteditable="false">玩家名称</span>在活动中即将问鼎大奖，你敢挑战Ta吗？丰厚奖品等着你哦！';
	$scope.shareContentData = '<span class="tag" contenteditable="false">玩家名称</span>已经在活动中赢得了奖品，你也快来玩游戏赢大奖吧！';

	$scope.defalut_back = '../../../img/mobile/squared/back.png';

	var PRIZETYPE = ['奖项一','奖项二','奖项三','奖项四','奖项五','奖项六','奖项七'];
	$scope.titleCheck = false;

	var ALL_NAVIGATE = ['游戏环节','领取环节','活动说明','我的奖品'];
	$scope.navigate = ['游戏环节','活动说明','我的奖品','中奖','未中奖'];
	 var day1 = new Date();
     day1.setTime(day1.getTime()-24*60*60*1000);
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
        format: 'YYYY-MM-DD' ,
        startDate: moment($scope.dateNow[0]), //设置开始日期
        endDate: moment($scope.dateNow[1]), 
        // endDate: moment(new Date()), //设置结束器日期
        
        minDate: moment(day1) //设置最小日期
 
    }
    		
    var onePrize = {
		/*gift_title: '奖项一',	//奖项名
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
		*/	
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
		mp_change_notice:'' ,
		mp_prize_num : 1,
		mp_probability : 10 ,
		mp_default : 1,
		mp_sortnum : '' ,
		giftStatusTime : $scope.dateNow[0]+'至 '+$scope.dateNow[1],
		mp_start_time:$scope.dateNow[0]+" 00:00:00",
		mp_end_time:$scope.dateNow[1] +" 23:59:59" 
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
		//console.log($scope.config.gift_setting);
		if(len==7){
			return;
		}
		onePrize.gift_title = PRIZETYPE[len];
		$scope.config.gift_setting.push(angular.copy(onePrize));
		$scope.checkedIdx2=len;
		
		$scope.setPreviewToChild();
		//console.log($scope.config.gift_setting);
	}
	
    $('#activityRange').daterangepicker(dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    	//console.log(start.format('YYYY-MM-DD'))
    	$scope.config.base.time= $('#activityRange').val(); 
    	
    	$scope.setPreviewToChild();
    	$scope.showPreview(1);
    	
    	
    });
    
    $scope.giftSettingFinish = function(){
    	$('input[id^="activityGiftRange"]').daterangepicker(dateRangeConfig, function(start, end, label) { // 格式化日期显示框
    		$scope.config.gift_setting[$scope.checkedIdx2].mp_start_time = start.format('YYYY-MM-DD') + ' 00:00:00';
    		$scope.config.gift_setting[$scope.checkedIdx2].mp_end_time = end.format('YYYY-MM-DD') + ' 23:59:59';
    		$scope.config.gift_setting[$scope.checkedIdx2].giftStatusTime = start.format('YYYY-MM-DD') 
			+ " 至  " + end.format('YYYY-MM-DD');
    		//console.log($scope.config.gift_setting)
    	});
    }

    $scope.showPreview = function(idx){
    	commonFactory.setScopeToChild('iframeId','squaredPreview','showIdx',idx);
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
    		giftArr.push(item.mp_level+'：'+item.mp_name);
    	}
    	var ruleArr = $scope.config.base.rule.split('\n');
    	var data1 = [
 					{title:'活动奖品',content:{text:giftArr,id:'set_actaward_box',idx:2}},
 					{title:'活动时间',content:{text:[$scope.config.base.time],id:'set_acttime_box',idx:0}},
 					{title:'活动规则',content:{text:ruleArr,id:'set_ruletext_box',idx:0}},
 				]
    	commonFactory.setScopeToChild('iframeId','squaredPreview','data1',data1);
    }
    
    /**
     * 插入活动的详情  
     */
    $scope.insertActivitySquared = function(){
    	$scope.vo = {};
    	//活动模板ID	
    	if($stateParams.mt_id){
    		$scope.vo.mm_templateid = $stateParams.mt_id;
    	}
    	//private String mm_templateid;
    	if($stateParams.mm_id){
    		$scope.vo.mm_id = $stateParams.mm_id;
    	}
    	//活动名称	
    	$scope.vo.mm_name = $scope.config.base.name;
    	if(!$scope.config.base.name){
    		messageFactory.showMessage('error',"请输入活动名称！");
    		return;
    	}
    	if(!$scope.config.base.mm_type){
    		messageFactory.showMessage('error',"请选择活动类型！");
    		return;
    	}
    	if(!$scope.config.base.time){
    		messageFactory.showMessage('error',"请选择活动时间！");
    		return;
    	}
    	
    	
    	/*//活动开始时间	
    	$scope.vo.mm_startime = $scope.config.base.time.substring(0,10)+" 00:00:00";
    	//活动结束时间	
    	$scope.vo.mm_endtime = $scope.config.base.time.substring(12)+" 23:59:59";*/
    	
    	//活动开始时间	
    	$scope.vo.mm_startime = $.trim($scope.config.base.time.split("至")[0])+" 00:00:00";
    	//活动结束时间	
    	$scope.vo.mm_endtime = $.trim($scope.config.base.time.split("至")[1])+" 23:59:59";
    	
    	
    	$scope.vo.mm_type = $scope.config.base.mm_type;
    	//参与人数显示(1是 2 否)
    	$scope.vo.mm_show_participant_num = $scope.config.base.join_people.show;
    	//在实际参与人数基础上增加
		$scope.vo.mm_participant_add_num = $scope.config.base.join_people.num;
		$scope.vo.mm_lucky_type = $scope.config.sendprize.mm_lucky_type.disable;
		/*if(!$scope.config.base.join_people){
			$scope.vo.mm_participant_add_num = 0;
		}*/
    	//活动规则	
    	$scope.vo.mm_rule = $scope.config.base.rule;
    	//单人总抽奖机会是否限制	(1 是 2 否）
    	$scope.vo.mm_lucky_rat_people_type = $scope.config.sendprize.single_one_chance.disable;
    	//抽奖门槛（游戏成绩达到 分数）
    	$scope.vo.mm_sill = $scope.config.sendprize.award_point;
    	//单人总抽奖机会	
    	$scope.vo.mm_lucky_rat_people = $scope.config.sendprize.single_one_chance.times;
    	if($scope.vo.mm_lucky_rat_people_type == 1&& 
    			!$scope.config.sendprize.single_one_chance.times){
    		messageFactory.showMessage('error',"请设置没人最多抽奖次数！");
    		return;
    	}
    	
    	if(!$scope.config.sendprize.day_chance){
    		messageFactory.showMessage('error',"请设置每日抽奖机会！");
    		return;
    	}
    	//每日抽奖机会	
    	$scope.vo.mm_lucky_rat_day = $scope.config.sendprize.day_chance;
    	
    	if(!$scope.config.sendprize.total_award_times){
    		messageFactory.showMessage('error',"请设置每人最多中奖次数！");
    		return;
    	}
    	//每人最多中奖次数	
    	$scope.vo.mm_single_people_num = $scope.config.sendprize.total_award_times;
    	//总中奖机会（每人）
    	$scope.vo.mm_lucky_total = $scope.config.sendprize.total_award_times;
    	//1 按总中奖概率； 2 按单个奖项中奖概率	
    	$scope.vo.mm_lucky_model = $scope.config.sendprize.award_chance_type.type;
    	
    	if(!$scope.vo.mm_lucky_model){
    		messageFactory.showMessage('error',"请设置中奖概率模式！");
    		return;
    	}
    	$scope.vo.mm_prizes_zyff = $scope.config.sendprize.mm_prizes_zyff;
    	
    	if(!$scope.vo.mm_prizes_zyff){
    		messageFactory.showMessage('error',"请设置是否均匀发放！");
    		return;
    	}
    	
    	if($scope.vo.mm_lucky_model==1){
    		//总中奖概率：	
        	$scope.vo.mm_probability_total = $scope.config.sendprize.award_chance_type.chance;
    		if(!$scope.vo.mm_probability_total ){
    			messageFactory.showMessage('error',"请设置中奖概率模式！");
        		return;
    		}
    		if(parseInt($scope.vo.mm_probability_total)<=0 || parseInt($scope.vo.mm_probability_total)>100){
    			messageFactory.showMessage('error',"请设置中奖概率应该为1-100之间的整数值");
        		return;
    		}
    		$scope.vo.mm_probability_total = ($scope.config.sendprize.award_chance_type.chance/100).toFixed(2);
    	}
    	//是否开启高级设置	
    	$scope.vo.mm_advanced_settings = 2;
    	$scope.vo.mm_version = 1;
    	$scope.giftList=[];
    	if($scope.config.gift_setting){
    		//console.log($scope.config.gift_setting);
    		for(var i in $scope.config.gift_setting){
    			$scope.giftList[i] = $scope.config.gift_setting[i];
    			if(!$scope.config.gift_setting[i].mp_sortnum
    					){
    				messageFactory.showMessage('error',"请设置奖品的位置");
            		return;
    			}
    			//console.log($scope.giftList[i].giftStatusTime);
    			$scope.giftList[i].mp_start_time=$.trim($scope.giftList[i].giftStatusTime.split("至")[0])+" 00:00:00";
    			$scope.giftList[i].mp_end_time=$.trim($scope.giftList[i].giftStatusTime.split("至")[1])+" 23:59:59";
    			
    			if(!$scope.config.gift_setting[i].mp_level){
    				messageFactory.showMessage('error',"请设置奖品的等级！");
            		return;
    			}
    			if(!$scope.config.gift_setting[i].mp_type){
    				messageFactory.showMessage('error',"请设置奖品的类型！");
            		return;
    			}
    			if(!$scope.config.gift_setting[i].mp_name){
    				messageFactory.showMessage('error',"请设置奖品的名称！");
            		return;
    			}
    			if(!$scope.config.gift_setting[i].mp_prize_num){
    				messageFactory.showMessage('error',"请设置奖品的数量");
            		return;
    			}
    			$scope.config.gift_setting[i].mp_probability = $scope.config.gift_setting[i].mp_probability?$scope.config.gift_setting[i].mp_probability:0;
    			if($scope.config.gift_setting[i].mp_probability<0){
    				messageFactory.showMessage('error',"奖品的中奖概率不能为负数！");
            		return;
    			}
    			
    			if(!$scope.config.gift_setting[i].mp_img ){
    				messageFactory.showMessage('error',"请设置奖品的图片！");
            		return;
    			}
    			if($scope.config.gift_setting[i].mp_default==2 &&
    					!$scope.config.gift_setting[i].mp_winnerscode ){
    				messageFactory.showMessage('error',"请设置内定人的手机号！");
            		return;
    			}
    			
    			if($scope.config.gift_setting[i].mp_prize_num == '' 
    				|| $scope.config.gift_setting[i].mp_prize_num == undefined 
    				|| $scope.config.gift_setting[i].mp_prize_num == 'undefined'
    					){
    				messageFactory.showMessage('error',"请设置奖品的兑奖数量！");
            		return;
    			}
    			if($scope.config.gift_setting[i].mp_prize_num <=0 ){
    				messageFactory.showMessage('error',"奖品的兑奖数量最小为1！");
            		return;
    			}
    			
    			$scope.giftList[i].mp_probability = ($scope.config.gift_setting[i].mp_probability/100).toFixed(2);
    		}
    	}
    	
    	
    	var giftListStr = JSON.stringify($scope.giftList);
    	
    	//高级设置 
    	$scope.advancevo = {};
    	$scope.advancevo = $scope.config.advanced_setting;
    	
    	//奖品概率回显
    	for (i in $scope.config.gift_setting) {
    		$scope.config.gift_setting[i].mp_probability = parseInt($scope.config.gift_setting[i].mp_probability*100);
    	}
    	
    	
		var success = function(result){
			messageFactory.showMessage('success','提交成功');
			$state.go("index.activity.noreleasedList",{'mm_state':2});
			
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
		}
		
		EzConfirm.create({
			heading : '提示',
			text : "您确定提交吗？"
		}).then(function() {
			var url = "/admin/activity/marketingMainControl/insertOrUpdate.action";
			http.post(url,$.extend({'giftListStr':giftListStr},$scope.vo,$scope.advancevo),success,error);
		}, function() {
			messageFactory.activityBtn();
		});
    }
    
    //获取活动的详情信息 
    $scope.getActivityDetail = function(id){
    	messageFactory.showLoading();
    	var success = function(result){
    		messageFactory.closeLoading();
    		$scope.config.base.name = result.data.mm_name;
    		$('#activityRange').val(result.data.mm_startime.substring(0,10) + " 至  " + result.data.mm_endtime.substring(0,10));
    		$scope.config.base.time =result.data.mm_startime.substring(0,10) + " 至  " + result.data.mm_endtime.substring(0,10) ;
    		$scope.config.base.join_people.show = result.data.mm_show_participant_num;
    		$scope.config.base.join_people.num = result.data.mm_participant_add_num;
    		$scope.config.base.rule = result.data.mm_rule;
    		$scope.config.base.mm_type = result.data.mm_type;
    		$scope.config.sendprize.single_one_chance.disable = result.data.mm_lucky_rat_people_type;
    		$scope.config.sendprize.single_one_chance.times = result.data.mm_lucky_rat_people;
    		$scope.config.sendprize.award_point = result.data.mm_sill;
    		$scope.config.sendprize.day_chance = result.data.mm_lucky_rat_day;
    		$scope.config.sendprize.mm_lucky_type.disable = result.data.mm_lucky_type;
    		$scope.config.sendprize.total_award_times = result.data.mm_single_people_num; 
    		$scope.config.sendprize.total_award_times = result.data.mm_lucky_total;
    		$scope.config.sendprize.award_chance_type.type = result.data.mm_lucky_model;
    		$scope.config.sendprize.award_chance_type.chance = result.data.mm_probability_total*100;
    		$scope.config.sendprize.mm_prizes_zyff = result.data.mm_prizes_zyff;
    		$scope.config.gift_setting = [];
    		for(var i in result.data.giftList){
    			result.data.giftList[i].mp_probability = parseInt(result.data.giftList[i].mp_probability*100);
    			$scope.config.gift_setting.push(result.data.giftList[i]);
    			$scope.config.gift_setting[i].gift_title = PRIZETYPE[i];;
    			//console.log(result.data.giftList[i].mp_start_time);
    			//console.log(result.data.giftList[i].mp_end_time);
    			$("#activityGiftRange"+i).val((result.data.giftList[i].mp_start_time).substring(0,10) 
    					+ " 至  " + (result.data.giftList[i].mp_end_time).substring(0,10));
    			$scope.config.gift_setting[i].mp_start_time = (result.data.giftList[i].mp_start_time).substring(0,10);
    			$scope.config.gift_setting[i].mp_end_time = (result.data.giftList[i].mp_end_time).substring(0,10);
    			$scope.config.gift_setting[i].giftStatusTime = (result.data.giftList[i].mp_start_time).substring(0,10) 
				+ " 至  " + (result.data.giftList[i].mp_end_time).substring(0,10);
    		}
    		$scope.config.advanced_setting = result.data.marketingAdvancedSetting;
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
    	var url = "/admin/activity/marketingMainControl/getDetail.action";
		http.post(url,{'mm_id':id},success,error);
    	
    }
    
    if($stateParams.mm_id && $stateParams.mm_id != undefined ){
    	  $scope.getActivityDetail($stateParams.mm_id);
    	  $scope.detail = $stateParams.detail;
    }
    /**
     * 预览 
     */
    $scope.showGiftPreview = function(){
    	
    	//验证是否有重复的位置 
    	for(var i in $scope.config.gift_setting){ 
    		//console.log($scope.config.gift_setting[i].mp_sortnum);
    		if($scope.config.gift_setting[i].mp_sortnum==undefined
    				 || ($scope.config.gift_setting[i].mp_sortnum==''&&$scope.config.gift_setting[i].mp_sortnum != 0)){
    			messageFactory.showMessage('error',"请先设置奖项的显示位置");
    			return;
    		}
    		for(var j in $scope.config.gift_setting){
    			if(i != j && 
    			$scope.config.gift_setting[i].mp_sortnum == $scope.config.gift_setting[j].mp_sortnum){
    				$scope.config.gift_setting[j].mp_sortnum = '';
    				messageFactory.showMessage('error',"显示位置不能重复！");
    				
        			return;
    			}
    		}
    	}
    	
    	$scope.newgiftList=[{},{},{},{},{},{},{},{}];
    	
    	for(var j in $scope.config.gift_setting){
    		
    		$scope.newgiftList[$scope.config.gift_setting[j].mp_sortnum-1]
    		 = $scope.config.gift_setting[j];
		}
    	
		for(var i in $scope.newgiftList){ 
			if(!$scope.newgiftList[i].mp_name){
				$scope.newgiftList[i].mp_name = "谢谢参与";
			}
		}
		commonFactory.setScopeToChild('iframeId','squaredPreview','giftList',$scope.newgiftList);
    	
    }
    
    var isImgEventExist = false;
    /**
	 * 显示图片上传
	 */
	$scope.upImage = function($event,x){
		setX(x);
    	if(!isImgEventExist){
    		isImgEventExist = true;
    		$scope.ue_myeditor.addListener("beforeInsertImage", function(t,arg){
    			var x = getX();
    			var imgs="";
    			
    			if(arg.length>0){
    				imgs = arg[0].src;
    			}
    			var imgsArr = imgs.split(",");
    			x.mp_img = imgsArr[0].split("|")[0].split("static/upload/image")[1];
    			x.mp_img_show = imgsArr[0].split("|")[0];
    			 $scope.showGiftPreview();
    		});
    	}
		var myImage = $scope.ue_myeditor.getDialog("insertimage");
		myImage.open();

	};
	var tempX;
	function setX(x){
		tempX = x;
	}
	function getX(){
		return tempX;
	}
	
	var weixinImageExist = false;
	
	  /**
	 * 显示图片上传
	 */
	$scope.upWeixinImage = function($event,x){
		setX(x);
		if(!weixinImageExist){
			weixinImageExist = true;
			$scope.ue_myeditor.addListener("beforeInsertImage", function (t, arg) {
				var x = getX();
				var imgs="";
				
				if(arg.length>0){
					imgs = arg[0].src;
				}
				uploadWeixinImgCallBack(imgs,x);
			});
		}
		
		
		var myImage = $scope.ue_myeditor.getDialog("insertimage");
		myImage.open();

	};
	
	/**
	 * 图片上传回调
	 */
	var uploadWeixinImgCallBack = function(imgs,x){
		var imgsArr = imgs.split(",");
		x.mas_sharing_imag = imgsArr[0].split("|")[0].split("static/upload/image")[1];
		x.mas_sharing_imag_show = imgsArr[0].split("|")[0];
	}
	
    /**
     * 返回列表
     */
	$scope.returnList = function(){
		$state.go("index.activity.noreleasedList",{'mm_state':2});
	}
	//获取活动类型
	
	$scope.getMmTypeList = function(){
		var success = function(result){
			 $scope.mmtypeList = result.data;
		}
		 var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
    	var url = "/admin/base/baseDataControl/detailItem.action";
		http.post(url,{'codekey':"2137"},success,error);
	}
	$scope.getMmTypeList();
	
//	$scope.timeRange = $scope.dateNow[0]+'至 '+$scope.dateNow[1];
////  $('#activityRange').data('daterangepicker').setStartDate()
////  $('#activityRange').data('daterangepicker').setEndDate($scope.dateNow[1])
//	$('#activityRange').val($scope.timeRange);
    
})