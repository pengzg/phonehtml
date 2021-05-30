"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

    //商品列表
    .state("index.goods",{
        url:"/goods",
        templateUrl:"views/goods/goods.html",
        controller:"ctr_goods",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/goods/ctr_goods.js"
            			        ]});
            }]
        } 
    })

    //商品列表
    .state("index.goods.goodsList",{
        url:"/goodsList",
        templateUrl:"views/goods/goodsList.html",
        controller:"ctr_goodsList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/goods/ctr_goodsList.js"
            			        ]});
            }]
        } 
    })

    //商品类型
    .state("index.goods.goodsType",{
        url:"/goodsType",
        templateUrl:"views/goods/goodsType.html",
        controller:"ctr_goodsType",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/goods/ctr_goodsType.js"
            			        ]});
            }]
        } 
    })

    //商品添加
    .state("index.goods.goodsAdd",{
        url:"/goodsAdd",
        templateUrl:"views/goods/goodsAdd.html",
        controller:"ctr_goodsAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/goods/ctr_goodsAdd.js"
            			        ]});
            }]
        } 
    })
    //商品详情
    .state("index.goods.goodsDetail",{
        url:"/goodsDetail",
        templateUrl:"views/goods/goodsDetail.html",
        controller:"ctr_goodsDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/goods/ctr_goodsDetail.js"
            			        ]});
            }]
        } 
    })

};

