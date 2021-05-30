"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

    //  卡券
    .state("index.card",{
        url:"/card",
        templateUrl:"views/card/card.html",
    //      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "css/verification/verification.css"
                                ]});
            }]
        } 
    })

    //  卡券列表
    .state("index.card.cardList",{
        url:"/cardList",
        templateUrl:"views/card/cardList.html",
        controller:"ctr_cardList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "js/controllerRoute/card/ctr_cardList.js"
                                ]});
            }]
        } 
    })

    //  添加卡券
    .state("index.card.cardDetail",{
        url:"/cardDetail?coupon_type",
        templateUrl:"views/card/cardDetail.html",
        controller:"ctr_cardDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "css/activityDetail/activityDetail.css",
                                "css/card/cardDetail.css",
                                "js/controllerRoute/card/ctr_cardDetail.js"
                                ]});
            }]
        } 
    })

    //  查看卡券
    .state("index.card.cardView",{
        url:"/cardView",
        templateUrl:"views/card/cardDetail.html",
        controller:"ctr_cardDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "css/activityDetail/activityDetail.css",
                                "css/card/cardDetail.css",
                                "js/controllerRoute/card/ctr_cardDetail.js"
                                ]});
            }]
        } 
    })

    //  卡券明细
    .state("index.card.cardDetailList",{
        url:"/cardDetailList",
        templateUrl:"views/card/cardDetailList.html",
        controller:"ctr_cardDetailList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "css/activityDetail/activityDetail.css",
                                "css/card/cardDetail.css",
                                "js/controllerRoute/card/ctr_cardDetailList.js"
                                ]});
            }]
        } 
    })
    //  卡券核销
    .state("index.card.cardVerify",{
        url:"/cardVerify",
        templateUrl:"views/card/cardVerify.html",
        controller:"ctr_cardVerify",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/data/data.css",
                                "css/activityDetail/activityDetail.css",
                                "css/card/cardDetail.css",
                		        "js/controllerRoute/card/ctr_cardVerify.js"
            			        ]});
            }]
        } 
    })


};

