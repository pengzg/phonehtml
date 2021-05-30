"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider
    
    //  商家
    .state("index.seller",{
        url:"/seller",
        templateUrl:"views/seller/seller.html",
        // controller:"ctr_device",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/seller.css",
                                ]});
            }]
        } 
    })
    //  设备开启
    .state("index.seller.deviceOpen",{
        url:"/deviceOpen",
        templateUrl:"views/seller/deviceOpen.html",
        controller:"ctr_deviceOpen",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/deviceManage.css",
                            "js/controllerRoute/seller/ctr_deviceOpen.js"
                                ]});
            }]
        } 
    })
    
    //  设备激活
    .state("index.seller.deviceActive",{
        url:"/deviceActive",
        templateUrl:"views/seller/deviceActive.html",
        controller:"ctr_deviceActive",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/deviceManage.css",
                            "js/controllerRoute/seller/ctr_deviceActive.js"
                                ]});
            }]
        } 
    })
    //设备添加
    .state("index.seller.deviceManageAdd",{
        url:"/deviceManageAdd",
        templateUrl:"views/seller/deviceManageAdd.html",
        controller:"ctr_deviceManageAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "js/controllerRoute/seller/ctr_deviceManageAdd.js"
                                ]});
            }]
        } 
    })
    //  商家管理
    .state("index.seller.sellerManage",{
        url:"/sellerManage",
        templateUrl:"views/seller/sellerManage.html",
        controller:"ctr_sellerManage",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/sellerManage.css",
                            "js/controllerRoute/seller/ctr_sellerManage.js"
                                ]});
            }]
        } 
    })
        //  商家添加
    .state("index.seller.sellerManageAdd",{
        url:"/sellerManageAdd?ms_id",
        templateUrl:"views/seller/sellerManageAdd.html",
        controller:"ctr_sellerManageAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/sellerManageAdd.css",
                            "js/controllerRoute/seller/ctr_sellerManageAdd.js"
                                ]});
            }]
        } 
    })
    
    //  启动页广告
    .state("index.seller.startPageListAd",{
        url:"/startPageListAd",
        templateUrl:"views/seller/startPageListAd.html",
        controller:"ctr_startPageListAd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/startPageListAd.css",
                            "js/controllerRoute/seller/ctr_startPageListAd.js"
                                ]});
            }]
        } 
    })
    //  新增启动页广告
    .state("index.seller.addStartPageListAd",{
        url:"/addStartPageListAd",
        templateUrl:"views/seller/addStartPageListAd.html",
        controller:"ctr_addStartPageListAd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/addStartPageListAd.css",
                            "js/controllerRoute/seller/ctr_addStartPageListAd.js"
                                ]});
            }]
        } 
    })
    //  微信页面
    .state("index.seller.weixinPage",{
        url:"/weixinPage",
        templateUrl:"views/seller/weixinPage.html",
        controller:"ctr_weixinPage",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/sellerManage.css",
                            "js/controllerRoute/seller/ctr_weixinPage.js"
                                ]});
            }]
        } 
    })
    //  微信页面添加
    .state("index.seller.weixinPageAdd",{
        url:"/weixinPageAdd?wsp_id",
        templateUrl:"views/seller/weixinPageAdd.html",
        controller:"ctr_weixinPageAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/sellerManage.css",
                            "js/controllerRoute/seller/ctr_weixinPageAdd.js"
                                ]});
            }]
        } 
    })
    
    //  商家下工作人员
    .state("index.seller.workList",{
        url:"/sellerWorkList?ms_id&ms_name",
        templateUrl:"views/seller/sellerWorkList.html",
        controller:"ctr_sellerWorkList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/sellerManage.css",
                            "js/controllerRoute/seller/ctr_sellerWorkList.js"
                                ]});
            }]
        } 
    })
    //  店铺与商品类别关联
    .state("index.seller.producttypeauthority",{
        url:"/producttypeauthority",
        templateUrl:"views/seller/producttypeauthority/productTypeAuthority.html",
        controller:"ctr_productTypeAuthority",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/sellerManage.css",
                            "js/controllerRoute/seller/producttypeauthority/ctr_productTypeAuthority.js"
                                ]});
            }]
        } 
    })
    //  店铺与商品类别关联添加
    .state("index.seller.producttypeauthorityadd",{
        url:"/producttypeauthorityadd?shopId",
        templateUrl:"views/seller/producttypeauthority/productTypeAuthorityAdd.html",
        controller:"ctr_productTypeAuthorityAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                            "css/seller/sellerManage.css",
                            "js/controllerRoute/seller/producttypeauthority/ctr_productTypeAuthorityAdd.js"
                                ]});
            }]
        } 
    })
};

