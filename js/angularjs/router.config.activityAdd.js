"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

//  活动添加
    .state("index.activityAdd",{
        url:"/activityAdd",
        templateUrl:"views/activityAdd/activityAdd.html",
        controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
                		        "js/controllerRoute/activity/ctr_activityAdd.js"
            			        ]});
            }]
        } 
    })
    
//  日历
    .state("index.activityAdd.calendarList",{
        url:"/calendarList",
        params:{"mat_id":null},
        templateUrl:"views/activityAdd/includeHtml/calendarList.html",
        controller:"ctr_calendarList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
                		        "js/controllerRoute/activity/ctr_calendarList.js"
            			        ]});
            }]
        } 
    })

//  场景
    .state("index.activityAdd.sceneList",{
        url:"/sceneList",
        templateUrl:"views/activityAdd/includeHtml/sceneList.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
            			        ]});
            }]
        } 
    })
    
    
//  类型
    .state("index.activityAdd.typeList",{
        url:"/typeList",
        templateUrl:"views/activityAdd/includeHtml/typeList.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
            			        ]});
            }]
        } 
    })

//  节日
    .state("index.activityAdd.festivalList",{
        url:"/festivalList",
        templateUrl:"views/activityAdd/includeHtml/festivalList.html",
//      controller:"ctr_activityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
            			        ]});
            }]
        } 
    })    
    
//  一物一码
    .state("index.activityAdd.twoDimensionCode",{
        url:"/twoDimensionCode",
        params:{"mat_id":null},
        templateUrl:"views/activityAdd/includeHtml/twoDimensionCode.html",
        controller:"ctr_twoDimensionCode",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
                		        "js/controllerRoute/twoDimensionCode/ctr_twoDimensionCode.js"
            			        ]});
            }]
        } 
    })
    
//  设置活动
    .state("index.activityEdit",{
        url:"/activityAdd/newActivity/activityEdit",
        templateUrl:"views/activityAdd/newActivity/activityEdit.html",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
            			        ]});
            }]
        } 
    })    
    
//  设置奖项
    .state("index.prizeEdit",{
        url:"/activityAdd/newActivity/prizeEdit",
        templateUrl:"views/activityAdd/newActivity/prizeEdit.html",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
            			        ]});
            }]
        } 
    })    
    
//  设置活动页面
    .state("index.activityPageEdit",{
        url:"/activityAdd/newActivity/activityPageEdit",
        templateUrl:"views/activityAdd/newActivity/activityPageEdit.html",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
            			        ]});
            }]
        } 
    })    

   
//  确认创建活动
    .state("index.activityConfirm",{
        url:"/activityAdd/newActivity/activityConfirm",
        templateUrl:"views/activityAdd/newActivity/activityConfirm.html",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
            			        ]});
            }]
        } 
    })    

   
//  创建完成
    .state("index.activityFinish",{
        url:"/activityAdd/newActivity/activityFinish",
        templateUrl:"views/activityAdd/newActivity/activityFinish.html",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/activityAdd/activityAdd.css",
            			        ]});
            }]
        } 
    })    




};

