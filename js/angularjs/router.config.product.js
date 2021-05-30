"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
    $stateProvider

    //商品
    .state("index.product",{
        url:"/product",
        templateUrl:"views/product/product.html",
        controller:"ctr_product",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
                                "js/controllerRoute/product/ctr_product.js"
            			        ]});
            }]
        } 
    })
    
    //礼品管理
    .state("index.product.productList",{
        url:"/productList",
        templateUrl:"views/product/productList.html",
        controller:"ctr_productList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
                                "js/controllerRoute/product/ctr_productList.js"
            			        ]});
            }]
        } 
    })
    

    
// 选择礼品类型
    .state("index.product.productType",{
        url:"/productType",
        templateUrl:"views/product/productType.html",
       controller:"ctr_productType",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
                		        "js/controllerRoute/product/ctr_productType.js"
            			        ]});
            }]
        } 
    })
    
    //  新建红包模板 自发
    .state("index.product.productAdd",{
        url:"/productAdd?pm_id",
        templateUrl:"views/product/productAdd.html",
        controller:"ctr_productAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/productRedAdd.css",
                                "js/controllerRoute/product/ctr_productAdd.js"
                                ]});
            }]
        } 
    })
    
      // 自发红包 的详情页面
    .state("index.product.productDetail",{
        url:"/productDetail?pm_id",
        templateUrl:"views/product/productDetail.html",
        controller:"ctr_productDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/productRedAdd.css",
                                "js/controllerRoute/product/ctr_productDetail.js"
                                ]});
            }]
        } 
    })
    
//  礼品分组管理
    .state("index.product.productGrouping",{
        url:"/productGrouping",
        templateUrl:"views/product/productGrouping.html",
//      controller:"ctr_productGrouping",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
            			        ]});
            }]
        } 
    })
    
//  新建礼品分组
    .state("index.product.productGroupingAdd",{
        url:"/productGroupingAdd",
        templateUrl:"views/product/productGroupingAdd.html",
//      controller:"ctr_productGroupingAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
            			        ]});
            }]
        } 
    })
    
//  管理组内礼品
    .state("index.product.productGroupingList",{
        url:"/productGroupingList",
        templateUrl:"views/product/productGroupingList.html",
//      controller:"ctr_productGroupingList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
            			        ]});
            }]
        } 
    })
    

//  新建红包模板 代发
    .state("index.product.productRedAdd",{
        url:"/productRedAdd?pm_id",
        templateUrl:"views/product/productRedAdd.html",
        controller:"ctr_productRedAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/productRedAdd.css",
                                "js/controllerRoute/product/ctr_productRedAdd.js"
                                ]});
            }]
        } 
    })
    // 代发红包 的详情页面
    .state("index.product.productRedDetail",{
        url:"/productRedDetail?pm_id",
        templateUrl:"views/product/productRedDetail.html",
        controller:"ctr_productRedDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/productRedAdd.css",
                                "js/controllerRoute/product/ctr_productRedDetail.js"
                                ]});
            }]
        } 
    })
    
    

//  新建代金券
   .state("index.product.moneyCoupon",{
        url:"/moneyCoupon",
        templateUrl:"views/product/moneyCoupon.html",
        controller:"ctr_moneyCoupon",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/moneyCoupon.css",
                                "js/controllerRoute/product/ctr_moneyCoupon.js"
                                ]});
            }]
        } 
    })
    //  代金券明细
   .state("index.product.couponDetail",{
        url:"/couponDetail",
        templateUrl:"views/product/couponDetail.html",
        controller:"ctr_couponDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/moneyCoupon.css",
                                "js/controllerRoute/product/ctr_couponDetail.js"
                                ]});
            }]
        } 
    })
    
    

    //  新建实物礼品
    .state("index.product.productGoodsAdd",{
        url:"/productGoodsAdd?pm_id",
        templateUrl:"views/product/productGoodsAdd.html",
        controller:"ctr_productGoodsAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/product.css",
                                "css/product/productGoodsAdd.css",
                                "js/controllerRoute/product/ctr_productGoodsAdd.js"
                                ]});
            }]
        } 
    })  

    //  新建积分
    .state("index.product.productPointAdd",{
        url:"/productPointAdd?pm_id",
        templateUrl:"views/product/productPointAdd.html",
        controller:"ctr_productPointAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/product.css",
                                "css/product/productPointAdd.css",
                                "js/controllerRoute/product/ctr_productPointAdd.js"
                                ]});
            }]
        } 
    })  

    //  实物礼品详情
    .state("index.product.productGoodsDetail",{
        url:"/productGoodsDetail?pm_id",
        templateUrl:"views/product/productGoodsDetail.html",
        controller:"ctr_productGoodsDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/product.css",
                                "css/product/productGoodsDetail.css",
                                "js/controllerRoute/product/ctr_productGoodsDetail.js"
                                ]});
            }]
        } 
    })  
    //  积分礼品详情
    .state("index.product.productPointDetail",{
        url:"/productPointDetail?pm_id",
        templateUrl:"views/product/productPointDetail.html",
        controller:"ctr_productPointDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/product.css",
                                "css/product/productPointDetail.css",
                                "js/controllerRoute/product/ctr_productPointDetail.js"
                                ]});
            }]
        } 
    })  
    //商品添加
    .state("index.product.goodsAdd",{
        url:"/goodsAdd?pt_id",
        templateUrl:"views/product/goodsAdd.html",
        controller:"ctr_goodsAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/product/ctr_goodsAdd.js"
            			        ]});
            }]
        } 
    })
    //商品添加
    .state("index.product.goodsEdit",{
        url:"/goodsEdit?pm_id",
        templateUrl:"views/product/goodsEdit.html",
        controller:"ctr_goodsEdit",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/product/ctr_goodsEdit.js"
            			        ]});
            }]
        } 
    })
    //商品详情
    .state("index.product.goodsDetail",{
        url:"/goodsDetail?pm_id",
        templateUrl:"views/product/goodsDetail.html",
        controller:"ctr_goodsDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/product/ctr_goodsDetail.js"
            			        ]});
            }]
        } 
    })
    //商品分类管理
    .state("index.product.productCategory",{
        url:"/productCategory",
        templateUrl:"views/product/productCategory.html",
        controller:"ctr_productCategory",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/product/ctr_productCategory.js"
            			        ]});
            }]
        } 
    })
    
    //库存列表
    .state("index.product.productStockList",{
        url:"/productStockList?searchKey",
        templateUrl:"views/product/productStockList.html",
        controller:"ctr_productStockList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
                                "js/controllerRoute/product/ctr_productStockList.js"
            			        ]});
            }]
        } 
    })
    //库存历史列表
    .state("index.product.productStockHistoryList",{
        url:"/productStockHistoryList?searchKey",
        templateUrl:"views/product/productStockHistoryList.html",
        controller:"ctr_productStockHistoryList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
                                "js/controllerRoute/product/ctr_productStockHistoryList.js"
            			        ]});
            }]
        } 
    })
    
        //商品与仓库的关联 
    .state("index.product.productstorerelation",{
        url:"/productstorerelation",
        templateUrl:"views/product/productStoreRelation.html",
        controller:"ctr_productStoreRelation",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
                                "js/controllerRoute/product/ctr_productStoreRelation.js"
            			        ]});
            }]
        } 
    })
    
         //商品与仓库关联添加
    .state("index.product.productStoreRelationAdd",{
        url:"/productStoreRelationAdd?ppm_id",
        templateUrl:"views/product/productStoreRelationAdd.html",
        controller:"ctr_productStoreRelationAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/product/ctr_productStoreRelationAdd.js"
            			        ]});
            }]
        } 
    })
    
    // 选择礼品类型
    .state("index.product.productTypeList",{
        url:"/productTypeList",
        templateUrl:"views/product/productTypeList.html",
       controller:"ctr_productTypeList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
                		        "js/controllerRoute/product/ctr_productTypeList.js"
            			        ]});
            }]
        } 
    })

    //充值卡添加
    .state("index.product.rechargeAdd",{
        url:"/rechargeAdd?pt_id",
        templateUrl:"views/product/recharge/rechargeAdd.html",
        controller:"ctr_rechargeAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/product/recharge/ctr_rechargeAdd.js"
                                ]});
            }]
        } 
    })
    //充值卡编辑
    .state("index.product.rechargeEdit",{
        url:"/rechargeEdit?pm_id",
        templateUrl:"views/product/recharge/rechargeEdit.html",
        controller:"ctr_rechargeEdit",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/product/recharge/ctr_rechargeEdit.js"
                                ]});
            }]
        } 
    })
       //充值卡编辑
    .state("index.product.rechargedetail",{
        url:"/rechargeDetail?pm_id",
        templateUrl:"views/product/recharge/rechargeDetail.html",
        controller:"ctr_rechargeDetail",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/product/product.css",
                                "css/goods/goods.css",
                                "js/controllerRoute/product/recharge/ctr_rechargeDetail.js"
                                ]});
            }]
        } 
    })

    // 实物水票列表
		.state("index.product.materialticketlist",{
		    url:"/materialticketlist?mt_mtp_id",
		    templateUrl:"views/product/materialticket/materialTicketList.html",
		    controller:"ctr_materialTicketList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "js/controllerRoute/product/materialticket/ctr_materialTicketList.js",
		        			        ]});
		        }]
		    } 
		})
		// 实物水票添加
		.state("index.product.materialticketadd",{
		    url:"/materialticketadd?mtc_id",
		    templateUrl:"views/product/materialticket/materialTicketAdd.html",
		    controller:"ctr_materialTicketAdd",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "js/controllerRoute/product/materialticket/ctr_materialTicketAdd.js",
		        			        ]});
		        }]
		    } 
		})
		// 实物水票添加
		.state("index.product.materialcodelist",{
			url:"/materialcodelist",
			templateUrl:"views/product/materialticket/materialCodeList.html",
			controller:"ctr_materialCodeList",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/product/materialticket/ctr_materialCodeList.js",
									]});
				}]
			} 
		})

		// 实物水票关联商品列表
		.state("index.product.materialproductlist",{
			url:"/materialproductlist?mtc_id",
			templateUrl:"views/product/materialticket/materialProductList.html",
			controller:"ctr_materialProductList",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/product/materialticket/ctr_materialProductList.js",
									]});
				}]
			} 
		})
		// 实物水票关联商品添加
		.state("index.product.materialproductadd",{
			url:"/materialproductadd?mtc_id&mtp_id",
			templateUrl:"views/product/materialticket/materialProductAdd.html",
			controller:"ctr_materialProductAdd",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/product/materialticket/ctr_materialProductAdd.js",
									]});
				}]
			} 
        })
        // 统计
		.state("index.product.productstockdetailstat",{
			url:"/productstockdetailstat",
			templateUrl:"views/product/productStockDetailStat.html",
			controller:"ctr_productStockDetailStat",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/product/ctr_productStockDetailStat.js",
									]});
				}]
			} 
        })
        // 库存详情
		.state("index.product.productstockdetail",{
			url:"/productstockdetail?startDate&endDate&psd_productid&psd_storeid&psd_sourcetype&psd_stocktype&searchKey",
			templateUrl:"views/product/productStockDetail.html",
			controller:"ctr_productStockDetail",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/product/ctr_productStockDetail.js",
									]});
				}]
			} 
        })
         // restaurant
		.state("index.product.restaurantShop",{
			url:"/restaurantShop",
			templateUrl:"views/product/restaurant/restaurantShop.html",
			controller:"ctr_restaurantShop",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/product/restaurant/ctr_restaurantShop.js",
									]});
				}]
			} 
        })
        .state("index.product.restaurantShopAdd",{
			url:"/restaurantShopAdd?rs_id",
			templateUrl:"views/product/restaurant/restaurantShopAdd.html",
			controller:"ctr_restaurantShopAdd",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/product/restaurant/ctr_restaurantShopAdd.js",
									]});
				}]
			} 
        })
        .state("index.product.restaurantProduct",{
			url:"/restaurantProduct",
			templateUrl:"views/product/restaurant/restaurantProduct.html",
			controller:"ctr_restaurantProduct",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/product/restaurant/ctr_restaurantProduct.js",
									]});
				}]
			} 
        })
        .state("index.product.restaurantProductAdd",{
			url:"/restaurantProductAdd?rsp_id",
			templateUrl:"views/product/restaurant/restaurantProductAdd.html",
			controller:"ctr_restaurantProductAdd",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/product/restaurant/ctr_restaurantProductAdd.js",
									]});
				}]
			} 
        })
        
};

