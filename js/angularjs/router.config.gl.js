"use strict"
tempApp.config(["$stateProvider", "$urlRouterProvider", routeFn]);

function routeFn($stateProvider, $urlRouterProvider) {
    $stateProvider


    	//  数据
        .state("index.gl",{
		    url:"/gl",
		    templateUrl:"views/gl/gl.html",
//      	controller:"ctr_orderList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            			"css/gl/gl.css",
		        			        ]});
		        }]
		    } 
		})

    	//  数据概览
        .state("index.gl.glasset",{
		    url:"/glasset",
		    templateUrl:"views/gl/glAsset.html",
			controller:"ctr_glAsset",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gl/gl.css",
									"js/controllerRoute/gl/ctr_glAsset.js"
		        			        ]});
		        }]
		    } 
		})
		//  账单明细
        .state("index.gl.glbill",{
		    url:"/glbill",
		    templateUrl:"views/gl/glBill.html",
			controller:"ctr_glBill",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gl/gl.css",
									"js/controllerRoute/gl/ctr_glBill.js"
		        			        ]});
		        }]
		    } 
		})
	
		//  详情
        .state("index.gl.glbilldetail",{
		    url:"/glbilldetail",
		    templateUrl:"views/gl/glBillDetail.html",
			controller:"ctr_glBillDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gl/gl.css",
									"js/controllerRoute/gl/ctr_glBillDetail.js"
		        			        ]});
		        }]
		    } 
		})

		//  充值列表
		.state("index.gl.rechargelist",{
			url:"/rechargelist?mbd_memberid",
			templateUrl:"views/gl/recharge/rechargeList.html",
			controller:"ctr_rechargeList",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"css/gl/gl.css",
									"js/controllerRoute/gl/recharge/ctr_rechargeList.js"
									]});
				}]
			} 
		})
		//  水滴列表
		.state("index.gl.waterdetaillist",{
			url:"/waterdetaillist",
			templateUrl:"views/gl/recharge/waterDetailList.html",
			controller:"ctr_waterDetailList",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"css/gl/gl.css",
									"js/controllerRoute/gl/recharge/ctr_waterDetailList.js"
									]});
				}]
			} 
		})
		//  账户列表
		.state("index.gl.accountlist",{
			url:"/accountlist?mba_memberid",
			templateUrl:"views/gl/recharge/accountList.html",
			controller:"ctr_accountList",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"css/gl/gl.css",
									"js/controllerRoute/gl/recharge/ctr_accountList.js"
									]});
				}]
			} 
		})
		//  金牌与商品关联
		.state("index.gl.glagentproductrel",{
			url:"/glagentproductrel",
			templateUrl:"views/gl/glagentproductrel/glAgentProductRel.html",
			controller:"ctr_glAgentProductRel",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"css/gl/gl.css",
									"js/controllerRoute/gl/glagentproductrel/ctr_glAgentProductRel.js"
									]});
				}]
			} 
		})
		//  金牌与产品关联添加
		.state("index.gl.glagentproductreladd",{
			url:"/glagentproductreladd",
			templateUrl:"views/gl/glagentproductrel/glAgentProductRelAdd.html",
			controller:"ctr_glAgentProductRelAdd",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"css/gl/gl.css",
									"js/controllerRoute/gl/glagentproductrel/ctr_glAgentProductRelAdd.js"
									]});
				}]
			} 
		})
};
