"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider


        //  海报列表
        .state("index.posterList",{
            url:"/posterList",
            templateUrl:"views/poster/posterList.html",
            controller:"ctr_posterList",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(
                            {files:[
                                    "css/gift/gift.css",
                                    "css/poster/poster.css",
                                    "css/activityDetail/activityDetail.css",
                                    "js/controllerRoute/poster/ctr_posterList.js"
                                    ]});
                }]
            } 
        })
         // 海报模板列表
        .state("index.posterTypeList",{
            url:"/posterTypeList",
            params:{"mat_id":null},
            templateUrl:"views/poster/posterTypeList.html",
            controller:"ctr_posterTypeList",
            resolve:{
                deps:["$ocLazyLoad",function($ocLazyLoad){
                    return $ocLazyLoad.load(
                            {files:[
                                    "css/gift/gift.css",
                                    "css/poster/poster.css",
                                    "css/activityAdd/activityAdd.css",
                                    "css/activityDetail/activityDetail.css",
                                    "js/controllerRoute/poster/ctr_posterTypeList.js"
                                    ]});
                }]
            } 
        })


    //  微海报活动添加
    .state("index.addActivityDetail_poster",{
        url:"/addActivityDetail_poster?mm_id&mt_id&detail",
        templateUrl:"views/poster/addActivityDetail_poster.html",
        controller: "ctr_addActivityDetail_poster",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/activityDetail/activityDetail.css",
                                "js/controllerRoute/poster/ctr_addActivityDetail_poster.js"
                                ]});
            }]
        } 
    })
    //  微海报活动数据
    .state("index.posterData",{
        url:"/posterData?mm_id&mt_id&detail",
        templateUrl:"views/poster/posterData.html",
        controller: "ctr_posterData",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css",
                                "js/controllerRoute/poster/ctr_posterData.js"
                                ]});
            }]
        } 
    })
    //  微海报活动数据-成本评估
    .state("index.posterData.costEvaluate",{
        url:"/costEvaluate",
        templateUrl:"views/poster/posterData/costEvaluate.html",
        controller: "ctr_costEvaluate",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css",
                                "js/controllerRoute/poster/posterDaTa/ctr_costEvaluate.js"
                                ]});
            }]
        } 
    })
    //  微海报活动数据-派发奖励明细
    .state("index.posterData.rewardDetail",{
        url:"/rewardDetail",
        templateUrl:"views/poster/posterData/rewardDetail.html",
        controller: "ctr_rewardDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css",
                                "js/controllerRoute/poster/posterDaTa/ctr_rewardDetail.js"
                                ]});
            }]
        } 
    })
    //  微海报活动数据-提现红包明细
    .state("index.posterData.cashDetail",{
        url:"/cashDetail",
        templateUrl:"views/poster/posterData/cashDetail.html",
        controller: "ctr_cashDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css",
                                "js/controllerRoute/poster/posterDaTa/ctr_cashDetail.js"
                                ]});
            }]
        } 
    })
    //  微海报活动数据-清算红包明细
    .state("index.posterData.clearDetail",{
        url:"/clearDetail",
        templateUrl:"views/poster/posterData/clearDetail.html",
        controller: "ctr_clearDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css",
                                "js/controllerRoute/poster/posterDaTa/ctr_clearDetail.js"
                                ]});
            }]
        } 
    })
    //  微海报效果评估
    .state("index.posterResult",{
        url:"/posterResult",
        templateUrl:"views/poster/posterResult.html",
        // controller: "ctr_posterResult",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css"
                                ]});
            }]
        } 
    })
    //  微海报效果评估-传播分析
    .state("index.posterResult.propagationAnalysis",{
        url:"/propagationAnalysis",
        templateUrl:"views/poster/posterResult/propagationAnalysis.html",
        controller: "ctr_propagationAnalysis",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css",
                                "js/controllerRoute/poster/posterResult/ctr_propagationAnalysis.js"
                                ]});
            }]
        } 
    })
    //  微海报效果评估-推广人分析
    .state("index.posterResult.promoterAnalysis",{
        url:"/promoterAnalysis",
        templateUrl:"views/poster/posterResult/promoterAnalysis.html",
        controller: "ctr_promoterAnalysis",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css",
                                "js/controllerRoute/poster/posterResult/ctr_promoterAnalysis.js"
                                ]});
            }]
        } 
    })
    //  微海报效果评估-扫码人分析
    .state("index.posterResult.scavengerAnalysis",{
        url:"/scavengerAnalysis",
        templateUrl:"views/poster/posterResult/scavengerAnalysis.html",
        controller: "ctr_scavengerAnalysis",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css",
                                "js/controllerRoute/poster/posterResult/ctr_scavengerAnalysis.js"
                                ]});
            }]
        } 
    })
    //  微海报效果评估-传播星空图
    .state("index.posterResult.propagatingGraph",{
        url:"/propagatingGraph",
        templateUrl:"views/poster/posterResult/propagatingGraph.html",
        controller: "ctr_propagatingGraph",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css",
                                "js/controllerRoute/poster/posterResult/ctr_propagatingGraph.js"
                                ]});
            }]
        } 
    })
    //  微海报效果评估-扫码人分析
    .state("index.posterUser",{
        url:"/posterUser?tab",
        templateUrl:"views/poster/posterUser.html",
        controller: "ctr_posterUser",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/poster/poster.css",
                                "js/controllerRoute/poster/ctr_posterUser.js"
                                ]});
            }]
        } 
    })

};

