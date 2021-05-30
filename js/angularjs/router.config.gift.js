"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

//  礼品管理
    .state("index.giftList",{
        url:"/gift/giftList",
        templateUrl:"views/gift/giftList.html",
        controller:"ctr_giftList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/gift/gift.css",
                                "js/controllerRoute/gift/ctr_giftList.js"
            			        ]});
            }]
        } 
    })
    
//  礼品详情
    .state("index.giftDetail",{
        url:"/gift/giftDetail",
        templateUrl:"views/gift/giftDetail.html",
//      controller:"ctr_giftDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/gift/gift.css",
            			        ]});
            }]
        } 
    })
    
//  选择礼品类型
    .state("index.giftType",{
        url:"/gift/giftType",
        templateUrl:"views/gift/giftType.html",
//      controller:"ctr_giftType",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/gift/gift.css",
            			        ]});
            }]
        } 
    })
    
//  新建礼品
    .state("index.giftAdd",{
        url:"/gift/giftAdd",
        templateUrl:"views/gift/giftAdd.html",
//      controller:"ctr_giftAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/gift/gift.css",
                                ]});
            }]
        } 
    })  
        
//  礼品分组管理
    .state("index.giftGrouping",{
        url:"/gift/giftGrouping",
        templateUrl:"views/gift/giftGrouping.html",
//      controller:"ctr_giftGrouping",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/gift/gift.css",
            			        ]});
            }]
        } 
    })
    
//  新建礼品分组
    .state("index.giftGroupingAdd",{
        url:"/gift/giftGroupingAdd",
        templateUrl:"views/gift/giftGroupingAdd.html",
//      controller:"ctr_giftGroupingAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/gift/gift.css",
            			        ]});
            }]
        } 
    })
    
//  管理组内礼品
    .state("index.giftGroupingList",{
        url:"/gift/giftGroupingList",
        templateUrl:"views/gift/giftGroupingList.html",
//      controller:"ctr_giftGroupingList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/gift/gift.css",
            			        ]});
            }]
        } 
    })
    

//  新建红包模板
    .state("index.giftRedAdd",{
        url:"/gift/giftRedAdd",
        templateUrl:"views/gift/giftRedAdd.html",
        controller:"ctr_giftRedAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/gift/giftRedAdd.css",
                                "js/controllerRoute/gift/ctr_giftRedAdd.js"
                                ]});
            }]
        } 
    })


//  新建代金券
    .state("index.product.moneyCoupon",{
        url:"/gift/moneyCoupon",
        templateUrl:"views/gift/moneyCoupon.html",
        controller:"ctr_moneyCoupon",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/gift/moneyCoupon.css",
                                "js/controllerRoute/gift/ctr_moneyCoupon.js"
                                ]});
            }]
        } 
    })
    //  代金券明细
    .state("index.couponDetail",{
        url:"/gift/couponDetail",
        templateUrl:"views/gift/couponDetail.html",
        controller:"ctr_couponDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/gift/moneyCoupon.css",
                                "js/controllerRoute/gift/ctr_couponDetail.js"
                                ]});
            }]
        } 
    })

    //  新建实物礼品
    .state("index.giftGoodsAdd",{
        url:"/gift/giftGoodsAdd",
        templateUrl:"views/gift/giftGoodsAdd.html",
        controller:"ctr_giftGoodsAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/gift/gift.css",
                                "css/gift/giftGoodsAdd.css",
                                "js/controllerRoute/gift/ctr_giftGoodsAdd.js"
                                ]});
            }]
        } 
    })  

    //  新建积分
    .state("index.giftPointAdd",{
        url:"/gift/giftPointAdd",
        templateUrl:"views/gift/giftPointAdd.html",
        controller:"ctr_giftPointAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/gift/gift.css",
                                "css/gift/giftPointAdd.css",
                                "js/controllerRoute/gift/ctr_giftPointAdd.js"
                                ]});
            }]
        } 
    })  

    //  实物礼品详情
    .state("index.giftGoodsDetail",{
        url:"/gift/giftGoodsDetail",
        templateUrl:"views/gift/giftGoodsDetail.html",
        controller:"ctr_giftGoodsDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/gift/gift.css",
                                "css/gift/giftGoodsDetail.css",
                                "js/controllerRoute/gift/ctr_giftGoodsDetail.js"
                                ]});
            }]
        } 
    })  
    //  积分礼品详情
    .state("index.giftPointDetail",{
        url:"/gift/giftPointDetail",
        templateUrl:"views/gift/giftPointDetail.html",
        controller:"ctr_giftPointDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/gift/gift.css",
                                "css/gift/giftPointDetail.css",
                                "js/controllerRoute/gift/ctr_giftPointDetail.js"
                                ]});
            }]
        } 
    })  

};

