"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    var timestamp = new Date().getTime();
    $stateProvider

//  口令红包
    .state("wordenvelope",{
        url:"/wordenvelope",
        templateUrl:"views/mobile/wordenvelope/wordenvelope.html",
        controller:"ctr_wordenvelope",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/wordenvelope/wordenvelope.css?v="+timestamp,
                                "js/controllerRoute/mobile/wordenvelope/ctr_wordenvelope.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    //  幸运大转盘
    .state("wheel",{
        url:"/wheel",
        templateUrl:"views/mobile/wheel/wheel.html",
        controller:"ctr_wheel",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/wheel/wheel.css?v="+timestamp,
                                "js/controllerRoute/mobile/wheel/ctr_wheel.js?v="+timestamp,
                                ]});
            }]
        } 
    })

    //  幸运九宫格
    .state("squared",{
        url:"/squared?wi_appid&openid&me_id",
        templateUrl:"views/mobile/squared/squared.html",
        controller:"ctr_squared",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/squared/squared.css?v="+timestamp,
                                "util/roller/roller.js?v="+timestamp,
                                "js/controllerRoute/mobile/squared/ctr_squared.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    //  活动结束
    .state("gameEnd",{
        url:"/gameEnd",
        templateUrl:"views/mobile/common/gameEnd.html",
        data: {
            hasBottom: true,
            tabsCheck: 1
        }
    })
    //  红包提现
    .state("getCash",{
        url:"/getCash",
        templateUrl:"views/mobile/getCash/getCash.html",
        controller:"ctr_getCash",
        data: {
            hasBottom: true,
            tabsCheck: 2,
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/getCash/getCash.css?v="+timestamp,
                                "js/controllerRoute/mobile/personCenter/ctr_getCash.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 红包明细
    .state("cashList",{
        url:"/cashList",
        templateUrl:"views/mobile/cashList/cashList.html",
        controller:"ctr_cashList",
        data: {
            hasBottom: true,
            tabsCheck: 2
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/cashList/cashList.css?v="+timestamp,
                                "js/controllerRoute/mobile/personCenter/ctr_cashList.js?v="+timestamp,
                                ]});
            }]
        } 
    })

    //  积分余额
    .state("pointLeft",{
        url:"/pointLeft",
        templateUrl:"views/mobile/pointLeft/pointLeft.html",
        controller:"ctr_pointLeft",
        data: {
            hasBottom: true,
            tabsCheck: 2
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/pointLeft/pointLeft.css?v="+timestamp,
                                "js/controllerRoute/mobile/personCenter/ctr_pointLeft.js?v="+timestamp,
                                ]});
            }]
        } 
    })

    // 个人中心
    .state("personCenter",{
        url:"/personCenter",
        templateUrl:"views/mobile/personCenter/personCenter.html",
        controller:"ctr_personCenter",
        data: {
            hasBottom: true,
            tabsCheck: 2
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/personCenter/personCenter.css?v="+timestamp,
                                "js/controllerRoute/mobile/personCenter/ctr_personCenter.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 我的奖品
    .state("prizeList",{
        url:"/prizeList",
        templateUrl:"views/mobile/prizeList/prizeList.html",
        controller:"ctr_prizeList",
        data: {
            hasBottom: true,
            tabsCheck: 2
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/prizeList/prizeList.css?v="+timestamp,
                                "js/controllerRoute/mobile/personCenter/ctr_prizeList.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 我的优惠券
    .state("couponList",{
        url:"/couponList",
        templateUrl:"views/mobile/couponList/couponList.html",
        controller:"ctr_couponList",
        data: {
            hasBottom: true,
            tabsCheck: 2
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/couponList/couponList.css?v="+timestamp,
                                "js/controllerRoute/mobile/personCenter/ctr_couponList.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 刮刮卡
    .state("scratchCard",{
        url:"/scratchCard",
        templateUrl:"views/mobile/scratchCard/scratchCard.html",
        controller:"ctr_scratchCard",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/scratchCard/scratchCard.css?v="+timestamp,
                                "js/controllerRoute/mobile/scratchCard/ctr_scratchCard.js?v="+timestamp,
                                ]});
            }]
        } 
    })

    //  砍价
    .state("bargain",{
        url:"/bargain",
        templateUrl:"views/mobile/bargain/bargain.html",
        controller:"ctr_bargain",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/bargain/bargain.css?v="+timestamp,
                                "js/controllerRoute/mobile/bargain/ctr_bargain.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 活动预览列表
    .state("activityList",{
        url:"/activityList",
        templateUrl:"views/mobile/activityList/activityList.html",
        controller:"ctr_activityList",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/activityList/activityList.css?v="+timestamp,
                                "js/controllerRoute/mobile/activityList/ctr_activityList.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 个人资料
    .state("personalData",{
        url:"/personalData",
        templateUrl:"views/mobile/personalData/personalData.html",
        controller:"ctr_personalData",
        data: {
            hasBottom: true,
            tabsCheck: 2
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/personalData/personalData.css?v="+timestamp,
                                "js/controllerRoute/mobile/personalData/ctr_personalData.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 商家首页
    .state("sellerPage",{
        url:"/sellerPage",
        templateUrl:"views/mobile/sellerPage/sellerPage.html",
        controller:"ctr_sellerPage",
        data: {
            hasBottom: true,
            tabsCheck: 0
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/sellerPage/sellerPage.css?v="+timestamp,
                                "js/controllerRoute/mobile/sellerPage/ctr_sellerPage.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 商家首页2
    .state("sellerPageInfo",{
        url:"/sellerPageInfo",
        templateUrl:"views/mobile/sellerPage/sellerPageInfo.html",
        data: {
            hasBottom: true,
            tabsCheck: 0
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/sellerPage/sellerPageInfo.css?v="+timestamp
                                ]});
            }]
        } 
    })
    // 礼品卡
    .state("giftCard",{
        url:"/giftCard",
        templateUrl:"views/mobile/giftCard/giftCard.html",
        controller:"ctr_giftCard",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/giftCard/giftCard.css?v="+timestamp,
                                "js/controllerRoute/mobile/giftCard/ctr_giftCard.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 礼品卡-购买
    .state("giftBuy",{
        url:"/giftBuy",
        templateUrl:"views/mobile/giftCard/giftBuy.html",
        controller:"ctr_giftBuy",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/giftCard/giftBuy.css?v="+timestamp,
                                "js/controllerRoute/mobile/giftCard/ctr_giftBuy.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 礼品卡-赠送
    .state("giftSend",{
        url:"/giftSend",
        templateUrl:"views/mobile/giftCard/giftSend.html",
        controller:"ctr_giftSend",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/giftCard/giftSend.css?v="+timestamp,
                                "js/controllerRoute/mobile/giftCard/ctr_giftSend.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 礼品卡-购买历史
    .state("giftHistory",{
        url:"/giftHistory",
        templateUrl:"views/mobile/giftCard/giftHistory.html",
        controller:"ctr_giftHistory",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/giftCard/giftHistory.css?v="+timestamp,
                                "js/controllerRoute/mobile/giftCard/ctr_giftHistory.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 礼品卡详情
    .state("cardDetail",{
        url:"/cardDetail",
        templateUrl:"views/mobile/giftCard/cardDetail.html",
        controller:"ctr_cardDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/giftCard/cardDetail.css?v="+timestamp,
                                "js/controllerRoute/mobile/giftCard/ctr_cardDetail.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 礼品卡核销
    .state("cardCode",{
        url:"/cardCode",
        templateUrl:"views/mobile/giftCard/cardCode.html",
        controller:"ctr_cardCode",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/giftCard/cardCode.css?v="+timestamp,
                                "js/controllerRoute/mobile/giftCard/ctr_cardCode.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 礼品卡信息
    .state("cardInfo",{
        url:"/cardInfo",
        templateUrl:"views/mobile/giftCard/cardInfo.html",
        controller:"ctr_cardInfo",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/giftCard/cardInfo.css?v="+timestamp,
                                "js/controllerRoute/mobile/giftCard/ctr_cardInfo.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 老虎机
    .state("tigerMachine",{
        url:"/tigerMachine",
        templateUrl:"views/mobile/tigerMachine/tigerMachine.html",
        controller:"ctr_tigerMachine",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/tigerMachine/tigerMachine.css?v="+timestamp,
                                "js/controllerRoute/mobile/tigerMachine/ctr_tigerMachine.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 核销页面
    .state("mverification",{
        url:"/mverification?mw_id",
        templateUrl:"views/mobile/mverification/mverification.html",
        controller:"ctr_mverification",
        data: {
            hasBottom: true,
            tabsCheck: 2
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/mverification/mverification.css?v="+timestamp,
                                "js/controllerRoute/mobile/mverification/ctr_mverification.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 分享临时页面 用于跳转实际分享页面
    .state("shareEmpty",{
        url:"/shareEmpty?callback_url",
        templateUrl:"views/mobile/common/shareEmpty.html",
        controller:"ctr_shareEmpty",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "js/controllerRoute/mobile/common/ctr_shareEmpty.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 加载页面
    .state("comloading",{
        url:"/comloading?ticket&wi_appid",
        templateUrl:"views/mobile/common/comloading.html",
        controller:"ctr_comloading",
        data: {
            hasBottom: false,
            tabsCheck: 1
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "js/controllerRoute/mobile/common/ctr_comloading.js?v="+timestamp,
                                ]});
            }]
        } 
    })

     // 商家首页3
    .state("sellerPageVideo",{
        url:"/sellerPageVideo",
        templateUrl:"views/mobile/sellerPage/sellerPageVideo.html",
        controller:"ctr_sellerPageVideo",
        data: {
            hasBottom: true,
            tabsCheck: 0
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/sellerPage/sellerPageVideo.css?v="+timestamp,
                                "js/controllerRoute/mobile/sellerPage/ctr_sellerPageVideo.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 摇一摇
    .state("shake",{
        url:"/shake",
        templateUrl:"views/mobile/shake/shake.html",
        controller:"ctr_shake",
        data: {
            hasBottom: false,
            tabsCheck: 0
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/shake/shake.css?v="+timestamp,
                                "js/controllerRoute/mobile/shake/ctr_shake.js?v="+timestamp,
                                ]});
            }]
        } 
    })
    // 砸金蛋
    .state("egg",{
        url:"/egg",
        templateUrl:"views/mobile/egg/egg.html",
        controller:"ctr_egg",
        data: {
            hasBottom: false,
            tabsCheck: 0
        },
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/mobile/egg/egg.css?v="+timestamp,
                                "js/controllerRoute/mobile/egg/ctr_egg.js?v="+timestamp,
                                ]});
            }]
        } 
    })
};

