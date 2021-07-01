"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

//  设置列表
    .state("index.setting",{
        url:"/setting",
        templateUrl:"views/setting/settingList.html",
        // controller:"ctr_setting",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
             		        "css/setting/setting.css",
            			        ]});
            }]
        } 
    })
    
//  账户设置
    .state("index.setting.account",{
        url:"/account",
        templateUrl:"views/setting/includeHtml/account.html",
        controller:"ctr_setting_account",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
             		        "css/setting/account.css",
                            "js/controllerRoute/settingList/ctr_account.js"
            			        ]});
            }]
        } 
    })
    
//  微信公众号设置
    .state("index.setting.wechat",{
        url:"/wechat",
        templateUrl:"views/setting/includeHtml/wechat.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/setting/wechat.css",
                                ]});
            }]
        } 
    })

//  微信支付设置
    .state("index.setting.pay",{
        url:"/pay",
        templateUrl:"views/setting/includeHtml/pay.html" 
    })

//  积分商城设置
    .state("index.setting.shop",{
        url:"/shop",
        templateUrl:"views/setting/includeHtml/shopList.html"
    })

//  管理员设置
    .state("index.setting.admin",{
        url:"/admin",
        templateUrl:"views/setting/includeHtml/admin.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/setting/admin.css",
                                ]});
            }]
        } 
    })

//  绑定设置
    .state("index.setting.bind",{
        url:"/bind",
        templateUrl:"views/setting/includeHtml/bind.html" 
    })
    

//  微信二维码
    .state("index.setting.barcode",{
        url:"/barcode",
        templateUrl:"views/setting/includeHtml/bindBarcode.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/setting/barcode.css",
                                ]});
            }]
        } 
    })
//  模板 与模板类型关联
    .state("index.setting.marketingTemplate",{
        url:"/marketingTemplate",
        templateUrl:"views/activity/marketingTemplate/marketingTemplate.html",
        controller: "ctr_marketingTemplate",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/product.css",
                                "js/controllerRoute/activity/marketingTemplate/ctr_marketingTemplate.js"
                                ]});
            }]
        } 
    })
     // 模板类型
     .state("index.setting.marketingActivityType",{
        url:"/marketingActivityType?mt_id",
        templateUrl:"views/activity/marketingTemplate/marketingActivityType.html",
        controller: "ctr_marketingActivityType",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/marketingactivitytype/activitytype.css",
                                "js/controllerRoute/activity/marketingTemplate/ctr_marketingActivityType.js"
                                ]});
            }]
        } 
    })
     // 会员等级
     .state("index.setting.basegrade",{
        url:"/basegrade",
        templateUrl:"views/setting/base/basegrade/baseGradeList.html",
        controller: "ctr_baseGradeList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/marketingactivitytype/activitytype.css",
                                "css/product/product.css",
                                "js/controllerRoute/setting/base/basegrade/ctr_baseGradeList.js"
                                ]});
            }]
        } 
    })
         // 仓库管理
     .state("index.setting.basestorehouse",{
        url:"/baseStorehouse",
        templateUrl:"views/setting/base/basestorehouse/baseStorehouseList.html",
        controller: "ctr_baseStorehouseList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/basestorehouse/ctr_baseStorehouseList.js"
                                ]});
            }]
        } 
    })
    
    // 柜子管理
     .state("index.setting.basestorebox",{
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
    // 格子管理
     .state("index.setting.storeboxlist",{
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
     .state("index.setting.boxoperationlog",{
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
     // 计量单位
     .state("index.setting.baseunit",{
        url:"/baseunit",
        templateUrl:"views/setting/base/baseunit/baseUnitList.html",
        controller: "ctr_baseUnitList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/marketingactivitytype/activitytype.css",
                                "css/product/product.css",
                                "js/controllerRoute/setting/base/baseunit/ctr_baseUnitList.js"
                                ]});
            }]
        } 
    })
    
    .state("index.setting.baseboxsetting",{
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
    .state("index.setting.baseparameter",{
        url:"/baseparameter",
        templateUrl:"views/setting/base/baseparameter/baseParameterList.html",
        controller: "ctr_baseParameterList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "js/controllerRoute/setting/base/baseparameter/ctr_baseParameterList.js"
                                ]});
            }]
        } 
    })
         // 品牌管理
     .state("index.setting.basebrand",{
        url:"/basebrand",
        templateUrl:"views/setting/base/basebrand/baseBrandList.html",
        controller: "ctr_baseBrandList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/marketingactivitytype/activitytype.css",
                                "css/product/product.css",
                                "js/controllerRoute/setting/base/basebrand/ctr_baseBrandList.js"
                                ]});
            }]
        } 
    })
       // 城市管理
     .state("index.setting.basecity",{
        url:"/basecity",
        templateUrl:"views/setting/base/basecity/baseCityList.html",
        controller: "ctr_baseCityList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/marketingactivitytype/activitytype.css",
                                "css/product/product.css",
                                "css/setting/basecity.css",
                                "js/controllerRoute/setting/base/basecity/ctr_baseCityList.js"
                                ]});
            }]
        } 
    })
    .state("index.setting.basemenu",{
        url:"/basemenu",
        templateUrl:"views/setting/base/basemenu/baseMenuList.html",
        controller: "ctr_baseMenuList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/marketingactivitytype/activitytype.css",
                                "css/product/product.css",
                                "css/setting/basecity.css",
                                "js/controllerRoute/setting/base/basemenu/ctr_baseMenuList.js"
                                ]});
            }]
        } 
    })
    //角色管理
    .state("index.setting.baserole",{
        url:"/baserole",
        templateUrl:"views/setting/base/baserole/baseRole.html",
        controller: "ctr_setting_baseRole",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/marketingactivitytype/activitytype.css",
                                "css/product/product.css",
                                "css/setting/basecity.css",
                                "js/controllerRoute/setting/base/baserole/ctr_setting_baseRole.js"
                                ]});
            }]
        } 
    })
    //人员账号管理
    .state("index.setting.sysuser",{
        url:"/sysuser",
        templateUrl:"views/setting/base/sysuser/sysuser.html",
        controller: "ctr_setting_sysuser",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/sysuser/ctr_setting_sysuser.js"
                                ]});
            }]
        } 
    })
    
    //  设置-字典类型
    .state("index.setting.dictType",{
        url:"/dictType",
        templateUrl:"views/setting/base/dict/dictType.html",
        controller:"ctr_dictType",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/setting/baseRole.css",
                                "js/controllerRoute/setting/base/dict/ctr_baseDataType.js"
                                ]});
            }]
        } 
    })
    //  设置-字典管理
    .state("index.setting.dictManage",{
        url:"/dictManage",
        templateUrl:"views/setting/base/dict/dictManage.html",
        controller:"ctr_dictManage",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/setting/baseRole.css",
                                "css/order/orderForm.css",
                                "css/setting/baseMenu.css",
                                "js/controllerRoute/setting/base/dict/ctr_baseData.js"
                                ]});
            }]
        } 
    })
    .state("index.setting.APPversion",{
        url:"/APPversion",
        templateUrl:"views/setting/base/app/APPversion.html",
        controller:"ctr_APPversion",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "js/controllerRoute/setting/base/app/ctr_APPversion.js"
                                ]});
            }]
        } 
    })
    //供应商管理
    .state("index.setting.supplierList",{
        url:"/supplierList",
        templateUrl:"views/cs/customer/supplier/supplierList.html",
        controller:"ctr_supplierList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "js/controllerRoute/cs/customer/supplier/ctr_supplierList.js"
            			        ]});
            }]
        } 
    }) 
    //
    .state("index.setting.focus",{
        url:"/focus",
        templateUrl:"views/setting/base/focus/focus.html",
        controller:"ctr_focus",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "js/controllerRoute/setting/base/focus/ctr_focus.js"
            			        ]});
            }]
        } 
    }) 
    //
    .state("index.setting.focusAdd",{
        url:"/focusAdd?fb_id",
        templateUrl:"views/setting/base/focus/focusAdd.html",
        controller:"ctr_focusAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "js/controllerRoute/setting/base/focus/ctr_focusAdd.js"
            			        ]});
            }]
        } 
    }) 

        

        // 柜子日志
        .state("index.setting.basemonitoringlog",{
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
        // 版本
        .state("index.setting.baseappversion",{
            url:"/baseappversion",
            templateUrl:"views/setting/base/baseappversion/baseAppVersion.html",
            controller: "ctr_baseAppVersion",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(
                            {files:[
                                    "css/user/userdetail.css",
                                    "js/controllerRoute/setting/base/baseappversion/ctr_baseAppVersion.js"
                                    ]});
                }]
            } 
        })
            // 柜子申请记录
        .state("index.setting.storeboxapply",{
            url:"/storeboxapply",
            templateUrl:"views/setting/base/storeboxapply/storeboxApply.html",
            controller: "ctr_storeboxApply",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(
                            {files:[
                                    "css/user/userdetail.css",
                                    "js/controllerRoute/setting/base/storeboxapply/ctr_storeboxApply.js"
                                    ]});
                }]
            } 
        })
         // 警告日志
         .state("index.setting.basealarmlog",{
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

        // 支付账号
        .state("index.setting.payaccount",{
            url:"/payaccount",
            templateUrl:"views/setting/weixin/payaccount/payAccountList.html",
            controller: "ctr_payaccount",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(
                            {files:[
                                    "css/user/userdetail.css",
                                    "js/controllerRoute/setting/weixin/payaccount/ctr_payAccountList.js"
                                    ]});
                }]
            } 
        })
        // 社区管理
     .state("index.setting.basecommunity",{
        url:"/basecommunity",
        templateUrl:"views/setting/base/basecommunity/baseCommunity.html",
        controller: "ctr_baseCommunity",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/basecommunity/ctr_baseCommunity.js"
                                ]});
            }]
        } 
    })
        // 异常
     .state("index.setting.baseappexception",{
        url:"/baseappexception",
        templateUrl:"views/setting/base/baseappexception/baseAppException.html",
        controller: "ctr_baseAppException",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/baseappexception/ctr_baseAppException.js"
                                ]});
            }]
        } 
    })
        // 合伙人列表
     .state("index.setting.baseagent",{
        url:"/baseagent",
        templateUrl:"views/setting/base/baseagent/baseAgent.html",
        controller: "ctr_baseAgent",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/baseagent/ctr_baseAgent.js"
                                ]});
            }]
        } 
    })
      // 工厂管理
      .state("index.setting.basefactory",{
        url:"/basefactory",
        templateUrl:"views/setting/base/basefactory/baseFactory.html",
        controller: "ctr_baseFactory",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/basefactory/ctr_baseFactory.js"
                                ]});
            }]
        } 
    })

      // 合伙人
      .state("index.setting.baseagentapply",{
        url:"/baseagentapply",
        templateUrl:"views/setting/base/baseagent/baseAgentApply.html",
        controller: "ctr_baseAgentApply",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/baseagent/ctr_baseAgentApply.js"
                                ]});
            }]
        } 
    })

     // 银行卡管理
     .state("index.setting.memberbankaccount",{
        url:"/memberbankaccount",
        templateUrl:"views/setting/base/memberbankaccount/memberBankAccount.html",
        controller: "ctr_memberBankAccount",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/memberbankaccount/ctr_memberBankAccount.js"
                                ]});
            }]
        } 
    })
    // 分类管理
    .state("index.setting.basecategory",{
        url:"/basecategory",
        templateUrl:"views/setting/base/basecategory/baseCategory.html",
        controller: "ctr_baseCategory",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/user/userdetail.css",
                                "js/controllerRoute/setting/base/basecategory/ctr_baseCategory.js"
                                ]});
            }]
        } 
    })
};

