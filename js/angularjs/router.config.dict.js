"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

    //商品
    .state("index.dict",{
        url:"/dict",
        templateUrl:"views/dict/dict.html",
        controller:"ctr_dict",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                            "css/product/product.css",
                            "css/goods/goods.css",
                                "js/controllerRoute/dict/ctr_dict.js"
            			        ]});
            }]
        } 
    })
    
    //手机列表
    .state("index.dict.dictList",{
        url:"/dictList",
        templateUrl:"views/dict/dictList.html",
        controller:"ctr_dictList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/dict/ctr_dictList.js"
            			        ]});
            }]
        } 
    })
    
 //手机添加
 .state("index.dict.dictAdd",{
    url:"/dictAdd?dm_id",
    templateUrl:"views/dict/dictAdd.html",
    controller:"ctr_dictAdd",
    resolve:{
        deps:["$ocLazyLoad",function($ocLazyLoad){
            return $ocLazyLoad.load(
                    {files:[
                           "css/product/product.css",
                           "css/goods/goods.css",
                            "js/controllerRoute/dict/ctr_dictAdd.js"
                            ]});
        }]
    } 
})
        
};

