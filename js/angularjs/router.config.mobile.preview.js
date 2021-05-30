"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    var timestamp = new Date().getTime();
    $stateProvider

    //  口令红包预览
    .state("wordenvelopePreview",{
        url:"/wordenvelopePreview",
        templateUrl:"views/mobile/wordenvelope/wordenvelopePreview.html",
        controller:"ctr_wordenvelopePreview",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/wordenvelopePreview.css?v="+timestamp,
                                "js/controllerRoute/mobile/wordenvelope/ctr_wordenvelopePreview.js?v="+timestamp,
                                ]});
            }]
        } 
    })

    //  幸运大转盘预览
    .state("wheelPreview",{
        url:"/wheelPreview",
        templateUrl:"views/mobile/wheel/wheelPreview.html",
        controller:"ctr_wheelPreview",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/mobile/wheel/wheelPreview.css?v="+timestamp,
                		        "js/controllerRoute/mobile/wheel/ctr_wheelPreview.js?v="+timestamp,
            			        ]});
            }]
        } 
    })

    //  幸运九宫格预览
    .state("squaredPreview",{
        url:"/squaredPreview?mm_id",
        templateUrl:"views/mobile/squared/squaredPreview.html",
        controller:"ctr_squaredPreview",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/squared/squaredPreview.css?v="+timestamp,
                                "util/roller/roller.js?v="+timestamp,
                                "js/controllerRoute/mobile/squared/ctr_squaredPreview.js?v="+timestamp,
                                ]});
            }]
        } 
    })

    // 刮刮卡预览
    .state("scratchCardPreview",{
        url:"/scratchCardPreview",
        templateUrl:"views/mobile/scratchCard/scratchCardPreview.html",
        controller:"ctr_scratchCardPreview",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/scratchCard/scratchCard.css?v="+timestamp,
                                "js/controllerRoute/mobile/scratchCard/ctr_scratchCardPreview.js?v="+timestamp,
                                ]});
            }]
        } 
    })

    //  砍价预览
    .state("bargainPreview",{
        url:"/bargainPreview",
        templateUrl:"views/mobile/bargain/bargainPreview.html",
        controller:"ctr_bargainPreview",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/bargain/bargain.css?v="+timestamp,
                                "js/controllerRoute/mobile/bargain/ctr_bargainPreview.js?v="+timestamp,
                                ]});
            }]
        } 
    })

    // 摇一摇
    .state("shakePreview",{
        url:"/shakePreview",
        templateUrl:"views/mobile/shake/shakePreview.html",
        controller:"ctr_shakePreview",
        data: {
            hasBottom: false,
            tabsCheck: 0
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/shake/shake.css?v="+timestamp,
                                "js/controllerRoute/mobile/shake/ctr_shakePreview.js?v="+timestamp,
                                ]});
            }]
        } 
    })
};

