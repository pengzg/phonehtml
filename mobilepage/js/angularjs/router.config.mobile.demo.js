"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider
    //  幸运九宫格
    .state("squaredDemo",{
        url:"/squaredDemo?wi_appid&openid&me_id",
        templateUrl:"views/mobile/squared/squaredDemo.html",
        controller:"ctr_squaredDemo",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/squared/squared.css",
                                "util/roller/roller.js",
                                "js/controllerRoute/mobile/squared/ctr_squaredDemo.js",
                                ]});
            }]
        } 
    })
     //  幸运大转盘
    .state("wheelDemo",{
        url:"/wheelDemo",
        templateUrl:"views/mobile/wheel/wheelDemo.html",
        controller:"ctr_wheelDemo",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/wheel/wheel.css",
                                "js/controllerRoute/mobile/wheel/ctr_wheelDemo.js",
                                ]});
            }]
        } 
    })
    // 刮刮卡
    .state("scratchCardDemo",{
        url:"/scratchCardDemo",
        templateUrl:"views/mobile/scratchCard/scratchCardDemo.html",
        controller:"ctr_scratchCardDemo",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/scratchCard/scratchCard.css",
                                "js/controllerRoute/mobile/scratchCard/ctr_scratchCardDemo.js",
                                ]});
            }]
        } 
    })
    //  口令红包
    .state("wordenvelopeDemo",{
        url:"/wordenvelopeDemo",
        templateUrl:"views/mobile/wordenvelope/wordenvelopeDemo.html",
        controller:"ctr_wordenvelopeDemo",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/wordenvelope/wordenvelope.css",
                                "js/controllerRoute/mobile/wordenvelope/ctr_wordenvelopeDemo.js",
                                ]});
            }]
        } 
    })
    // 摇一摇
    .state("shakeDemo",{
        url:"/shakeDemo",
        templateUrl:"views/mobile/shake/shakeDemo.html",
        controller:"ctr_shakeDemo",
        data: {
            hasBottom: false,
            tabsCheck: 0
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/shake/shake.css",
                                "js/controllerRoute/mobile/shake/ctr_shakeDemo.js",
                                ]});
            }]
        } 
    })

    // 砸金蛋
    .state("eggDemo",{
        url:"/eggDemo",
        templateUrl:"views/mobile/egg/eggDemo.html",
        controller:"ctr_eggDemo",
        data: {
            hasBottom: false,
            tabsCheck: 0
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/egg/egg.css",
                                "js/controllerRoute/mobile/egg/ctr_eggDemo.js",
                                ]});
            }]
        } 
    })
};

