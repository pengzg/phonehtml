"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

//  核销
    .state("index.verification",{
        url:"/verification",
        templateUrl:"views/verification/verification.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/verification/verification.css",
            			        ]});
            }]
        } 
    })
    
//  奖项核销
    .state("index.verification.verificationPrize",{
        url:"/verificationPrize",
        templateUrl:"views/verification/includeHtml/verificationPrize.html",
         controller:"ctr_verificationPrize",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/verification/ctr_verificationPrize.js",
                		        "css/verification/verification.css",
            			        ]});
            }]
        } 
    })

//  核销记录
    .state("index.verification.verificationList",{
        url:"/verificationList",
        templateUrl:"views/verification/includeHtml/verificationList.html",
        controller:"ctr_verificationList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/verification/verification.css",
                		        "js/controllerRoute/verification/ctr_verificationList.js"
            			        ]});
            }]
        } 
    })
    
//  核销管理员
    .state("index.verification.verificationAdmin",{
        url:"/verificationAdmin",
        templateUrl:"views/verification/includeHtml/verificationAdmin.html",
        controller:"ctr_verificationAdmin",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/verification/verification.css",
                		        "js/controllerRoute/verification/ctr_verificationAdmin.js"
            			        ]});
            }]
        } 
    })
    
//  核销密码
    .state("index.verification.verificationPassword",{
        url:"/verificationPassword",
        templateUrl:"views/verification/includeHtml/verificationPassword.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/verification/verification.css",
            			        ]});
            }]
        } 
    })
    

};

