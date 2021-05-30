"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

	//柜子列表
	.state("index.box",{
		url:"/box",
		templateUrl:"views/box/box.html",
//      	controller:"ctr_orderList",
		resolve:{
			deps:["$ocLazyLoad",function($ocLazyLoad){
				return $ocLazyLoad.load(
						{files:[
								"css/gift/gift.css",
								]});
			}]
		} 
	})

	// 柜子管理
	.state("index.box.basestorebox",{
        url:"/basestorebox",
        templateUrl:"views/setting/base/basestorehouse/baseStorebox.html",
        controller: "ctr_baseStorebox",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/basestorehouse/ctr_baseStorebox.js"
                                ]});
            }]
        } 
    })
    	// 柜子巡检
	.state("index.box.inspectionrecord",{
        url:"/inspectionrecord",
        templateUrl:"views/setting/base/basestorehouse/inspectionRecordList.html",
        controller: "ctr_inspectionRecordList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/basestorehouse/ctr_inspectionRecordList.js"
                                ]});
            }]
        } 
    })
    // 格子管理
     .state("index.box.storeboxlist",{
        url:"/storeboxlist?bs_id",
        templateUrl:"views/setting/base/basestorehouse/storeboxList.html",
        controller: "ctr_storeboxList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/basestorehouse/ctr_storeboxList.js"
                                ]});
            }]
        } 
    })
    
			// 开箱日志
	.state("index.box.boxoperationlog",{
			url:"/boxoperationlog?bol_box_id&bol_storeid",
			templateUrl:"views/setting/base/basestorehouse/boxOperationLog.html",
			controller: "ctr_boxOperationLog",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"css/user/userdetail.css",
									"js/controllerRoute/setting/base/basestorehouse/ctr_boxOperationLog.js"
									]});
				}]
			} 
		})
			
		.state("index.box.baseboxsetting",{
			url:"/baseboxsetting",
			templateUrl:"views/setting/base/baseboxsetting/baseBoxSettingList.html",
			controller: "ctr_baseBoxSettingList",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/setting/base/baseboxsetting/ctr_baseBoxSettingList.js"
									]});
				}]
			} 
		})

		// 柜子日志
		.state("index.box.basemonitoringlog",{
			url:"/basemonitoringlog",
			templateUrl:"views/setting/base/basemonitoringlog/baseMonitoringLog.html",
			controller: "ctr_baseMonitoringLog",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"css/user/userdetail.css",
									"js/controllerRoute/setting/base/basemonitoringlog/ctr_baseMonitoringLog.js"
									]});
				}]
			} 
		})
			
		// 警告日志
		.state("index.box.basealarmlog",{
		url:"/basealarmlog",
		templateUrl:"views/setting/base/basealarmlog/baseAlarmLog.html",
		controller: "ctr_baseAlarmLog",
		resolve:{
			deps:["$ocLazyLoad",function($ocLazyLoad){
				return $ocLazyLoad.load(
						{files:[
								"css/user/userdetail.css",
								"js/controllerRoute/setting/base/basealarmlog/ctr_baseAlarmLog.js"
									]});
					}]
				} 
		})
		// 取水记录
		.state("index.box.orderWaterRecordList",{
		    url:"/orderWaterRecordList",
		    templateUrl:"views/order/orderWaterRecordList.html",
		    controller:"ctr_orderWaterRecordList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "js/controllerRoute/order/ctr_orderWaterRecordList.js",
		        			        ]});
		        }]
		    } 
		})
		// 格子管理
		.state("index.box.boxtest",{
			url:"/boxtest",
			templateUrl:"views/setting/base/basestorehouse/boxTest.html",
			controller: "ctr_boxTest",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"css/user/userdetail.css",
									"js/controllerRoute/setting/base/basestorehouse/ctr_boxTest.js"
									]});
				}]
			} 
		})
		// 格子管理
		.state("index.box.boxproduct",{
			url:"/boxproduct?bb_id",
			templateUrl:"views/setting/base/basestorehouse/boxProduct.html",
			controller: "ctr_boxProduct",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"css/user/userdetail.css",
									"js/controllerRoute/setting/base/basestorehouse/ctr_boxProduct.js"
									]});
				}]
			} 
		})
};

