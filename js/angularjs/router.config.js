"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $urlRouterProvider.when('', '/login');
    $stateProvider
    .state("login",{
        url:"/login",
        templateUrl:"login.html",
        controller:"ctr_login",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
            	return $ocLazyLoad.load(
            			{files:[
            			        "./css/landing.css",
                                "util/slider/slider.css",
            			        "js/controllerRoute/login/ctr_login.js"
            			        ]});
            }]
        } 
    })
    
	.state("index",{
        url:"/index",
        templateUrl:"index.html",
        controller:"ctr_index",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
            	return $ocLazyLoad.load(
                		{files:[
                		        "js/controllerRoute/index/ctr_index.js"
            			        ]});
            }]
        } 
    })
    .state("index.homePage",{
        url:"/homePage",
        templateUrl:"views/homePage/homePage.html",
        controller:"ctr_homePage",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "js/controllerRoute/home/ctr_homePage.js"
            			        ]});
            }]
        } 
    })
    
    //  添加一物一码活动
        .state("index.activityAddDetail",{
        url:"/activity/activityAddDetail",
        templateUrl:"views/activity/activityAddDetail.html",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/gift/gift.css",
            			        ]});
            }]
        } 
    })
    
    //  页面元素demo页面
        .state("index.demo",{
        url:"/demo/demo",
        templateUrl:"views/demo/demo.html",
        controller:"ctr_demo",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "js/controllerRoute/demo/ctr_demo.js"
            			        ]});
            }]
        } 
    })
    
    
 /*   $urlRouterProvider.otherwise("/index");*/
};

