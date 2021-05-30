"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

//  活动列表
    .state("index.activity",{
        url:"/activity",
        templateUrl:"views/activity/activity.html" 
    })
    
/*//  已发布
    .state("index.activity.releasedList",{
        url:"/releasedList",
        templateUrl:"views/activity/includeHtml/releasedList.html",
        controller:"ctr_releasedList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
//              		        "css/activity/activity.css",
								"js/controllerRoute/activity/ctr_releasedList.js"
            			        ]});
            }]
        } 
    })*/

//  未发布
    .state("index.activity.noreleasedList",{
        url:"/noreleasedList?mm_state",
        templateUrl:"views/activity/includeHtml/noreleasedList.html",
        controller:"ctr_noreleasedList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
//              		        "css/activity/activity.css",
								"js/controllerRoute/activity/ctr_noreleasedList.js"
            			        ]});
            }]
        } 
    })
    
//  活动中奖纪录
    .state("index.activity.activityRecordList",{
        url:"/activityRecordList?mm_id",
        templateUrl:"views/activity/activityRecordList.html",
        controller:"ctr_activityRecordList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
//              		        "css/activity/activity.css",
								"css/verification/verification.css",
								"js/controllerRoute/activity/ctr_activityRecordList.js" 
            			        ]});
            }]
        } 
    })
    
    //  一物一码活动
    .state("index.activity.activityList",{
        url:"/activityList",
        templateUrl:"views/activity/includeHtml/activityList.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/gift/gift.css",
            			        ]});
            }]
        } 
    })

    //  兑换记录
    .state("index.recordConversion",{
        url:"/activity/recordConversion",
        templateUrl:"views/activity/recordConversion.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/gift/gift.css",
            			        ]});
            }]
        } 
    })

    
    //  二维码数据
    .state("index.twoDimensionCodeData",{
        url:"/activity/twoDimensionCodeData",
        templateUrl:"views/activity/twoDimensionCodeData.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/gift/gift.css",
            			        ]});
            }]
        } 
    })

     //  添加活动
    .state("index.addActivityDetail",{
        url:"/activityDetail/addActivityDetail",
        templateUrl:"views/activityDetail/addActivityDetail.html",
        controller: "ctr_addActivityDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/activityDetail/activityDetail.css",
                                "js/controllerRoute/activity/ctr_addActivityDetail.js"
                                ]});
            }]
        } 
    })
     //  大转盘活动添加
    .state("index.addActivityDetail_wheel",{
        url:"/activityDetail/addActivityDetail_wheel",
        templateUrl:"views/activityDetail/addActivityDetail_wheel.html",
        controller: "ctr_addActivityDetail_wheel",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/activityDetail/activityDetail.css",
                                "js/controllerRoute/activity/ctr_addActivityDetail_wheel.js"
                                ]});
            }]
        } 
    })
     //  九宫格活动添加
    .state("index.addActivityDetail_squared",{
        url:"/activityDetail/addActivityDetail_squared?mm_id&mt_id&detail",
        templateUrl:"views/activityDetail/addActivityDetail_squared.html",
        controller: "ctr_addActivityDetail_squared",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/activityDetail/activityDetail.css",
                                "js/controllerRoute/activity/ctr_addActivityDetail_squared.js"
                                ]});
            }]
        } 
    })
    
     //  刮刮卡活动添加
    .state("index.addActivityDetail_scratch",{
        url:"/activityDetail/addActivityDetail_scratch",
        templateUrl:"views/activityDetail/addActivityDetail_scratch.html",
        controller: "ctr_addActivityDetail_scratch",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/activityDetail/activityDetail.css",
                                "js/controllerRoute/activity/ctr_addActivityDetail_scratch.js"
                                ]});
            }]
        } 
    })
     //  刮刮卡活动添加
    .state("index.addActivityDetail_bargain",{
        url:"/activityDetail/addActivityDetail_bargain",
        templateUrl:"views/activityDetail/addActivityDetail_bargain.html",
        controller: "ctr_addActivityDetail_bargain",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/activityDetail/activityDetail.css",
                                "js/controllerRoute/activity/ctr_addActivityDetail_bargain.js"
                                ]});
            }]
        } 
    })
     //  摇一摇活动添加
    .state("index.addActivityDetail_shake",{
        url:"/activityDetail/addActivityDetail_shake",
        templateUrl:"views/activityDetail/addActivityDetail_shake.html",
        controller: "ctr_addActivityDetail_shake",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/activityDetail/activityDetail.css",
                                "js/controllerRoute/activity/ctr_addActivityDetail_shake.js"
                                ]});
            }]
        } 
    })
    
     //  九宫格活动添加
    .state("index.addActivityDetail_egg",{
        url:"/activityDetail/addActivityDetail_egg?mm_id&mt_id&detail",
        templateUrl:"views/activityDetail/addActivityDetail_egg.html",
        controller: "ctr_addActivityDetail_egg",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/activityDetail/activityDetail.css",
                                "js/controllerRoute/activity/ctr_addActivityDetail_egg.js"
                                ]});
            }]
        } 
    })

    
    // 模板添加
     .state("index.marketingTemplateAdd",{
        url:"/marketingTemplateAdd?mt_id",
        templateUrl:"views/activity/marketingTemplate/marketingTemplateAdd.html",
        controller: "ctr_marketingTemplateAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/product.css",
                                "css/product/productGoodsAdd.css",
                                "js/controllerRoute/activity/marketingTemplate/ctr_marketingTemplateAdd.js"
                                ]});
            }]
        } 
    })
   
};

