"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

    //商品
    .state("index.phone",{
        url:"/phone",
        templateUrl:"views/phone/phone.html",
        controller:"ctr_phone",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/phone/ctr_phone.js"
            			        ]});
            }]
        } 
    })
    
    //手机列表
    .state("index.phone.phoneList",{
        url:"/phoneList",
        templateUrl:"views/phone/phoneList.html",
        controller:"ctr_phoneList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/phone/ctr_phoneList.js"
            			        ]});
            }]
        } 
    })
    

        
};

