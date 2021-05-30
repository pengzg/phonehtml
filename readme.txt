1.活动配置全

config = {

	base: {
			name: '口令红包', 	//活动名称
			time: '', 			//活动起止时间
			join_people: {		//参与人数
				show: false,	//显示隐藏
				num: 1			//人数
			},
			rule: '',			//活动规则
			seller_name: '',	//商家名称
			belss: '',			//祝福语
			tip: ''				//温馨提示
		},

	sendprize: {
		times_original: 1,		//初始游戏次数
		times_day_add: 1,		//每日新增次数
		times_day_max: 10,		//每日参与次数
		times_max: 100,			//累计参与次数
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
		},
		gift_average: false,	//奖品均发
		virtual_gift_count: 10, //总虚拟奖品数量
		with_help: false,		//是否开启助力 true：开启，false：关闭
		help_percent: 10,		//助力成功率
		help_way: {				//助力效果
			type: 1,			//1:增加抽奖次数,2:助力领奖
			times: 1			//被助力者增加的抽奖次数
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