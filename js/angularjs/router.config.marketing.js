"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

    //营销
    .state("index.marketing",{
        url:"/marketing",
        templateUrl:"views/marketing/marketing.html",
        controller:"ctr_marketing",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_marketing.js"
            			        ]});
            }]
        } 
    })
    //营销-组合促销
    .state("index.marketing.promotionMain",{
        url:"/promotionMain",
        templateUrl:"views/marketing/promotionMain.html",
        controller:"ctr_promotionMain",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionMain.js"
            			        ]});
            }]
        } 
    })
    //营销-组合促销详情
    .state("index.marketing.promotionMainDetail",{
        url:"/promotionMainDetail?ppm_id",
        templateUrl:"views/marketing/promotionMainDetail.html",
        controller:"ctr_promotionMainDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionMainDetail.js"
            			        ]});
            }]
        } 
    })
    //营销-组合促销新增
    .state("index.marketing.promotionMainAdd",{
        url:"/promotionMainAdd",
        templateUrl:"views/marketing/promotionMainAdd.html",
        controller:"ctr_promotionMainAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/ctr_promotionMainAdd.js"
            			        ]});
            }]
        } 
    })
    //营销-商品促销
    .state("index.marketing.promotionGoods",{
        url:"/promotionGoods",
        templateUrl:"views/marketing/promotionGoods.html",
        controller:"ctr_promotionGoods",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionGoods.js"
            			        ]});
            }]
        } 
    })
    //营销-商品促销-添加
    .state("index.marketing.promotionGoodsAdd",{
        url:"/promotionGoodsAdd",
        templateUrl:"views/marketing/promotionGoodsAdd.html",
        controller:"ctr_promotionGoodsAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionGoodsAdd.js"
            			        ]});
            }]
        } 
    })
    
    //营销-商品促销-复制
    .state("index.marketing.promotionGoodsCopy",{
        url:"/promotionGoodsCopy?ppm_id",
        templateUrl:"views/marketing/promotionGoodsCopy.html",
        controller:"ctr_promotionGoodsCopy",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionGoodsCopy.js"
            			        ]});
            }]
        } 
    })

        
    //营销-商品促销-复制
    .state("index.marketing.promotionGoodsEdit",{
        url:"/promotionGoodsEdit?ppm_id",
        templateUrl:"views/marketing/promotionGoodsEdit.html",
        controller:"ctr_promotionGoodsEdit",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionGoodsEdit.js"
            			        ]});
            }]
        } 
    })
    //营销-订单促销
    .state("index.marketing.promotionOrder",{
        url:"/promotionOrder",
        templateUrl:"views/marketing/promotionOrder.html",
        controller:"ctr_promotionOrder",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionOrder.js"
            			        ]});
            }]
        } 
    })
    //营销-订单促销-添加
    .state("index.marketing.promotionOrderAdd",{
        url:"/promotionOrderAdd",
        templateUrl:"views/marketing/promotionOrderAdd.html",
        controller:"ctr_promotionOrderAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionOrderAdd.js"
            			        ]});
            }]
        } 
    })    
     //营销-订单促销--详情
    .state("index.marketing.promotionOrderDetail",{
        url:"/promotionOrderDetail?ppm_id",
        templateUrl:"views/marketing/promotionOrderDetail.html",
        controller:"ctr_promotionMainDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionMainDetail.js"
            			        ]});
            }]
        } 
    })

    
    //营销-套餐促销
    .state("index.marketing.promotionPackage",{
        url:"/promotionPackage",
        templateUrl:"views/marketing/promotionPackage.html",
        controller:"ctr_promotionPackage",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionPackage.js"
            			        ]});
            }]
        } 
    })

    //营销-套餐促销新增
    .state("index.marketing.promotionPackageAdd",{
        url:"/promotionPackageAdd",
        templateUrl:"views/marketing/promotionPackageAdd.html",
        controller:"ctr_promotionPackageAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/ctr_promotionPackageAdd.js"
            			        ]});
            }]
        } 
    })
    
        //营销-套餐促销新增
    .state("index.marketing.promotionPackageCopy",{
        url:"/promotionPackageCopy?ppm_id",
        templateUrl:"views/marketing/promotionPackageCopy.html",
        controller:"ctr_promotionPackageCopy",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/ctr_promotionPackageCopy.js"
            			        ]});
            }]
        } 
    })

            //营销-套餐促销编辑
            .state("index.marketing.promotionPackageEdit",{
                url:"/promotionPackageEdit?ppm_id",
                templateUrl:"views/marketing/promotionPackageEdit.html",
                controller:"ctr_promotionPackageEdit",
                resolve:{
                    deps:["$ocLazyLoad",function($ocLazyLoad){
                        return $ocLazyLoad.load(
                                {files:[
                                        "js/controllerRoute/marketing/ctr_promotionPackageEdit.js"
                                        ]});
                    }]
                } 
            })
    
     //营销-套餐促销详情
    .state("index.marketing.promotionPackageDetail",{
        url:"/promotionPackageDetail?ppm_id",
        templateUrl:"views/marketing/promotionPackageDetail.html",
        controller:"ctr_promotionMainDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionMainDetail.js"
            			        ]});
            }]
        } 
    })
    //营销-套餐促销
    .state("index.marketing.combinationPackage",{
        url:"/combinationPackage",
        templateUrl:"views/marketing/combinationPackage/combinationPackage.html",
        controller:"ctr_combinationPackage",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/combinationPackage/ctr_combinationPackage.js"
            			        ]});
            }]
        } 
    })

    //营销-套餐促销新增
    .state("index.marketing.combinationPackageAdd",{
        url:"/combinationPackageAdd",
        templateUrl:"views/marketing/combinationPackage/combinationPackageAdd.html",
        controller:"ctr_combinationPackageAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/combinationPackage/ctr_combinationPackageAdd.js"
            			        ]});
            }]
        } 
    })
    
        //营销-套餐促销新增
    .state("index.marketing.combinationPackageCopy",{
        url:"/combinationPackageCopy?ppm_id",
        templateUrl:"views/marketing/combinationPackage/combinationPackageCopy.html",
        controller:"ctr_combinationPackageCopy",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/combinationPackage/ctr_combinationPackageCopy.js"
            			        ]});
            }]
        } 
    })

      //营销-套餐全部修改
      .state("index.marketing.combinationPackageEditFull",{
        url:"/combinationPackageEditFull?ppm_id",
        templateUrl:"views/marketing/combinationPackage/combinationPackageEditFull.html",
        controller:"ctr_combinationPackageEditFull",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/combinationPackage/ctr_combinationPackageEditFull.js"
            			        ]});
            }]
        } 
    })
    
     //营销-套餐促销详情
    .state("index.marketing.combinationPackageDetail",{
        url:"/combinationPackageDetail?ppm_id",
        templateUrl:"views/marketing/combinationPackage/combinationPackageDetail.html",
        controller:"ctr_promotionMainDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_promotionMainDetail.js"
            			        ]});
            }]
        } 
    })
    
    
             //营销-套餐促销修改
    .state("index.marketing.combinationPackageEdit",{
        url:"/combinationPackageEdit?ppm_id",
        templateUrl:"views/marketing/combinationPackage/combinationPackageEdit.html",
        controller:"ctr_combinationPackageEdit",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/combinationPackage/ctr_combinationPackageEdit.js"
            			        ]});
            }]
        } 
    })

    // 试用列表
    .state("index.marketing.promotionApplyList",{
        url:"/promotionApplyList",
        templateUrl:"views/marketing/promotionApply/promotionApplyList.html",
        controller:"ctr_promotionApplyList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/promotionApply/ctr_promotionApplyList.js"
            			        ]});
            }]
        } 
    })
    
    // 试用添加
    .state("index.marketing.promotionApplyAdd",{
        url:"/promotionApplyAdd",
        templateUrl:"views/marketing/promotionApply/promotionApplyAdd.html",
        controller:"ctr_promotionApplyAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/promotionApply/ctr_promotionApplyAdd.js"
            			        ]});
            }]
        } 
    })
    
     // 试用详情
    .state("index.marketing.promotionApplyDetail",{
        url:"/promotionApplyDetail?pa_id",
        templateUrl:"views/marketing/promotionApply/promotionApplyDetail.html",
        controller:"ctr_promotionApplyDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/promotionApply/ctr_promotionApplyDetail.js"
            			        ]});
            }]
        } 
    })
    
    // 试用编辑
    .state("index.marketing.promotionApplyEdit",{
        url:"/promotionApplyEdit?pa_id",
        templateUrl:"views/marketing/promotionApply/promotionApplyEdit.html",
        controller:"ctr_promotionApplyEdit",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/promotionApply/ctr_promotionApplyEdit.js"
            			        ]});
            }]
        } 
    })
    
    // 申请列表
    .state("index.marketing.applyMemberList",{
        url:"/applyMemberList?pa_id",
        templateUrl:"views/marketing/promotionApply/applyMemberList.html",
        controller:"ctr_applyMemberList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/marketing/promotionApply/ctr_applyMemberList.js"
            			        ]});
            }]
        } 
    })
    //营销-团购促销
    .state("index.marketing.promotionGroup",{
        url:"/promotionGroup",
        templateUrl:"views/marketing/group/promotionGroup.html",
        controller:"ctr_promotionGroup",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/group/ctr_promotionGroup.js"
            			        ]});
            }]
        } 
    })
    //营销-团购促销-添加
    .state("index.marketing.promotionGroupAdd",{
        url:"/promotionGroupAdd",
        templateUrl:"views/marketing/group/promotionGroupAdd.html",
        controller:"ctr_promotionGroupAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/group/ctr_promotionGroupAdd.js"
            			        ]});
            }]
        } 
    })
    
    //营销-团购促销-复制
    .state("index.marketing.promotionGroupCopy",{
        url:"/promotionGroupCopy?ppm_id",
        templateUrl:"views/marketing/group/promotionGroupCopy.html",
        controller:"ctr_promotionGroupCopy",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/group/ctr_promotionGroupCopy.js"
            			        ]});
            }]
        } 
    })

    // 优惠券列表
    .state("index.marketing.couponlist",{
        url:"/couponlist",
        templateUrl:"views/marketing/coupon/couponList.html",
        controller:"ctr_couponList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "js/controllerRoute/marketing/coupon/ctr_couponList.js"
                                ]});
            }]
        } 
    })
    // 优惠券添加
    .state("index.marketing.couponadd",{
        url:"/couponadd?cb_id",
        templateUrl:"views/marketing/coupon/couponAdd.html",
        controller:"ctr_couponAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "js/controllerRoute/marketing/coupon/ctr_couponAdd.js"
                                ]});
            }]
        } 
    })
    // 优惠码
    .state("index.marketing.couponcodelist",{
        url:"/couponcodelist",
        templateUrl:"views/marketing/couponcode/couponCodeList.html",
        controller:"ctr_couponCodeList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "js/controllerRoute/marketing/couponcode/ctr_couponCodeList.js"
                                ]});
            }]
        } 
    })
    // 优惠码
    .state("index.marketing.couponcodeadd",{
        url:"/couponcodeadd",
        templateUrl:"views/marketing/couponcode/couponCodeAdd.html",
        controller:"ctr_couponCodeAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "js/controllerRoute/marketing/couponcode/ctr_couponCodeAdd.js"
                                ]});
            }]
        } 
    })
     // 优惠码
     .state("index.marketing.couponcodedata",{
        url:"/couponcodedata",
        templateUrl:"views/marketing/couponcode/couponCodeData.html",
        controller:"ctr_couponCodeData",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "js/controllerRoute/marketing/couponcode/ctr_couponCodeData.js"
                                ]});
            }]
        } 
    })

     // 订单类型 活动
    .state("index.marketing.promotionOrdertype",{
        url:"/promotionOrdertype",
        templateUrl:"views/marketing/ordertype/promotionOrdertype.html",
        controller:"ctr_promotionOrdertype",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "js/controllerRoute/marketing/ordertype/ctr_promotionOrdertype.js"
                                ]});
            }]
        } 
    })
    // 订单类型 活动添加
    .state("index.marketing.promotionOrdertypeAdd",{
        url:"/promotionOrdertypeAdd?cb_id",
        templateUrl:"views/marketing/ordertype/promotionOrdertypeAdd.html",
        controller:"ctr_promotionOrdertypeAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/data/data.css",
                                "js/controllerRoute/marketing/ordertype/ctr_promotionOrdertypeAdd.js"
                                ]});
            }]
        } 
    })
    //砍价
    .state("index.marketing.promotioncutlist",{
        url:"/promotioncutlist",
        templateUrl:"views/marketing/cut/promotionCutList.html",
        controller:"ctr_promotionCutList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/cut/ctr_promotionCutList.js"
            			        ]});
            }]
        } 
    })
    //砍价-添加
    .state("index.marketing.promotioncutadd",{
        url:"/promotioncutadd",
        templateUrl:"views/marketing/cut/promotionCutAdd.html",
        controller:"ctr_promotionCutAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/cut/ctr_promotionCutAdd.js"
            			        ]});
            }]
        } 
    })
    //砍价-添加
    .state("index.marketing.promotioncutedit",{
        url:"/promotioncutedit?pc_id",
        templateUrl:"views/marketing/cut/promotionCutEdit.html",
        controller:"ctr_promotionCutEdit",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/cut/ctr_promotionCutEdit.js"
            			        ]});
            }]
        } 
    })
    //砍价-添加
    .state("index.marketing.promotioncutdetail",{
        url:"/promotioncutdetail?pc_id",
        templateUrl:"views/marketing/cut/promotionCutDetail.html",
        controller:"ctr_promotionCutDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/cut/ctr_promotionCutDetail.js"
            			        ]});
            }]
        } 
    })
    //砍价-添加
    .state("index.marketing.cutinitiatorlist",{
        url:"/cutinitiatorlist?cutId",
        templateUrl:"views/marketing/cut/cutInitiatorList.html",
        controller:"ctr_cutInitiatorList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/cut/ctr_cutInitiatorList.js"
            			        ]});
            }]
        } 
    })
    //砍价-添加
    .state("index.marketing.cutparticipantslist",{
        url:"/cutparticipantslist?pciId",
        templateUrl:"views/marketing/cut/cutParticipantsList.html",
        controller:"ctr_cutParticipantsList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/cut/ctr_cutParticipantsList.js"
            			        ]});
            }]
        } 
    })
     //生成二维码
     .state("index.marketing.createminiqrcode",{
        url:"/createminiqrcode",
        templateUrl:"views/marketing/createMiniQrcode.html",
        controller:"ctr_createMiniQrcode",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/ctr_createMiniQrcode.js"
            			        ]});
            }]
        } 
    })
    //关联添加
    .state("index.marketing.promotioncodereladd",{
        url:"/promotioncodereladd?pcr_id",
        templateUrl:"views/marketing/promotioncode/promotionCodeRelAdd.html",
        controller:"ctr_promotionCodeRelAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/promotioncode/ctr_promotionCodeRelAdd.js"
            			        ]});
            }]
        } 
    })
    //
    .state("index.marketing.promotioncoderellist",{
        url:"/promotioncoderellist",
        templateUrl:"views/marketing/promotioncode/promotionCodeRelList.html",
        controller:"ctr_promotionCodeRelList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/promotioncode/ctr_promotionCodeRelList.js"
            			        ]});
            }]
        } 
    })
    //
    .state("index.marketing.promotioncodelist",{
        url:"/promotioncodelist?pcr_id",
        templateUrl:"views/marketing/promotioncode/promotionCodeList.html",
        controller:"ctr_promotionCodeList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/promotioncode/ctr_promotionCodeList.js"
            			        ]});
            }]
        } 
    })
    //
    .state("index.marketing.packagebuy",{
        url:"/packagebuy",
        templateUrl:"views/marketing/packagebuy/packagebuy.html",
        controller:"ctr_packagebuy",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/marketing/packagebuy/ctr_packagebuy.js"
            			        ]});
            }]
        } 
    })
};

