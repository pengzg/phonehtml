"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

    //商品
    .state("index.house",{
        url:"/house",
        templateUrl:"views/house/house.html",
        controller:"ctr_house",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                            "css/product/product.css",
                            "css/goods/goods.css",
                                "js/controllerRoute/house/ctr_house.js"
            			        ]});
            }]
        } 
    })
    
    //手机列表
    .state("index.house.houseList",{
        url:"/houseList",
        templateUrl:"views/house/houseList.html",
        controller:"ctr_houseList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/house/ctr_houseList.js"
            			        ]});
            }]
        } 
    })
    
 //手机添加
 .state("index.house.houseAdd",{
    url:"/houseAdd?cb_id",
    templateUrl:"views/house/houseAdd.html",
    controller:"ctr_houseAdd",
    resolve:{
        deps:["$ocLazyLoad",function($ocLazyLoad){
            return $ocLazyLoad.load(
                    {files:[
                           "css/product/product.css",
                           "css/goods/goods.css",
                            "js/controllerRoute/house/ctr_houseAdd.js"
                            ]});
        }]
    } 
})
        
};

