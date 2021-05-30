"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

    //营销
    .state("index.stock",{
        url:"/stock",
        templateUrl:"views/stock/stock.html",
        controller:"ctr_stock",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/stock/ctr_stock.js"
            			        ]});
            }]
        } 
    })
    // 入库单
    .state("index.stock.stockin",{
        url:"/stockIn",
        templateUrl:"views/stock/stockIn/stockIn.html",
        controller:"ctr_stockIn",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "css/gift/gift.css",
                                "js/controllerRoute/stock/stockIn/ctr_stockIn.js"
            			        ]});
            }]
        } 
    })
    //调拨单
    .state("index.stock.stockallot",{
        url:"/stockAllot",
        templateUrl:"views/stock/stockAllot/stockAllot.html",
        controller:"ctr_stockAllot",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "css/gift/gift.css",
                                "js/controllerRoute/stock/stockAllot/ctr_stockAllot.js"
            			        ]});
            }]
        } 
    })

     // 出库单
     .state("index.stock.stockout",{
        url:"/stockOut",
        templateUrl:"views/stock/stockOut/stockOut.html",
        controller:"ctr_stockOut",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "css/gift/gift.css",
                                "js/controllerRoute/stock/stockOut/ctr_stockOut.js"
            			        ]});
            }]
        } 
    })
    // 单据详情
    .state("index.stock.stockdetail",{
        url:"/stockDetail?eim_id",
        templateUrl:"views/stock/stockAllot/stockDetail.html",
        controller:"ctr_stockDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/stock/stockAllot/ctr_stockDetail.js"
            			        ]});
            }]
        } 
    })
    
 
};

