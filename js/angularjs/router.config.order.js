"use strict"
tempApp.config(["$stateProvider", "$urlRouterProvider", routeFn]);

function routeFn($stateProvider, $urlRouterProvider) {
    $stateProvider


    	//  订单列表
        .state("index.order",{
		    url:"/order",
		    templateUrl:"views/order/order.html",
//      	controller:"ctr_orderList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
		        			        ]});
		        }]
		    } 
		})

    	//  订单列表
        .state("index.order.orderList",{
		    url:"/orderList",
		    templateUrl:"views/order/orderList.html",
			controller:"ctr_orderList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_orderList.js"
		        			        ]});
		        }]
		    } 
		})

		.state("index.order.orderWaterList",{
		    url:"/orderWaterList",
		    templateUrl:"views/order/orderWaterList.html",
			controller:"ctr_orderWaterList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_orderWaterList.js"
		        			        ]});
		        }]
		    } 
		})
		.state("index.order.orderBoxList",{
		    url:"/orderBoxList",
		    templateUrl:"views/order/orderBoxList.html",
			controller:"ctr_orderBoxList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_orderBoxList.js"
		        			        ]});
		        }]
		    } 
		})
        .state("index.order.rechargeorderlist",{
		    url:"/rechargeorderlist",
		    templateUrl:"views/order/rechargeOrderList.html",
			controller:"ctr_rechargeOrderList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_rechargeOrderList.js"
		        			        ]});
		        }]
		    } 
		})
        //  订单详情
        .state("index.order.orderDetail",{
		    url:"/orderDetail?om_id&om_order_code",
		    templateUrl:"views/order/orderDetail.html",
		    controller:"ctr_orderDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
		            		        "js/controllerRoute/order/ctr_orderDetail.js",
		        			        ]});
		        }]
		    } 
		})
		.state("index.order.orderWaterDetail",{
		    url:"/orderWaterDetail?om_id&om_order_code",
		    templateUrl:"views/order/orderWaterDetail.html",
		    controller:"ctr_orderWaterDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
		            		        "js/controllerRoute/order/ctr_orderWaterDetail.js",
		        			        ]});
		        }]
		    } 
		})
		//  订单列表
        .state("index.order.orderInvoiceLog",{
		    url:"/orderInvoiceLog",
		    templateUrl:"views/order/orderInvoiceLog.html",
			controller:"ctr_orderInvoiceLog",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_orderInvoiceLog.js"
		        			        ]});
		        }]
		    } 
		})
		//  订单详情
        .state("index.order.orderDetailQy",{
		    url:"/orderDetailQy?om_id&om_order_code",
		    templateUrl:"views/order/orderDetailQy.html",
		    controller:"ctr_orderDetailQy",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
		            		        "js/controllerRoute/order/ctr_orderDetailQy.js",
		        			        ]});
		        }]
		    } 
		})
		//  订单列表
        .state("index.order.orderListQy",{
		    url:"/orderListQy",
		    templateUrl:"views/order/orderListQy.html",
			controller:"ctr_orderListQy",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_orderListQy.js"
		        			        ]});
		        }]
		    } 
		})
		/* .state("index.order.ticketList",{
		    url:"/ticketList",
		    templateUrl:"views/order/ticketList.html",
		    controller:"ctr_ticketList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "js/controllerRoute/order/ctr_ticketList.js",
		        			        ]});
		        }]
		    } 
		})
		.state("index.order.ticketVList",{
		    url:"/ticketVList?tv_ticketid",
		    templateUrl:"views/order/ticketVList.html",
		    controller:"ctr_ticketVList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "js/controllerRoute/order/ctr_ticketVList.js",
		        			        ]});
		        }]
		    } 
		}) 
		.state("index.order.orderWaterRecordList",{
			url:"/orderWaterRecordList",
		    templateUrl:"views/order/orderWaterRecordList.html",
		    controller:"ctr_orderWaterRecordList",
		    resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
						{files:[
							"js/controllerRoute/order/ctr_orderWaterRecordList.js",
						]});
					}]
				} 
			})
		*/
		//  订单列表
        .state("index.order.glcashapply",{
		    url:"/glcashapply",
		    templateUrl:"views/order/glCashApply.html",
			controller:"ctr_glCashApply",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_glCashApply.js"
		        			        ]});
		        }]
		    } 
		})
		//  订单列表
        .state("index.order.glprofit",{
		    url:"/glprofit",
		    templateUrl:"views/order/glProfit.html",
			controller:"ctr_glProfit",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_glProfit.js"
		        			        ]});
		        }]
		    } 
		})
		//  取水临时列表
        .state("index.order.ordertemprecord",{
		    url:"/ordertemprecord",
		    templateUrl:"views/order/orderTempRecord.html",
			controller:"ctr_orderTempRecord",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_orderTempRecord.js"
		        			        ]});
		        }]
		    } 
		})
		// 配送详情
        .state("index.order.orderDeliveryDetail",{
		    url:"/orderDeliveryDetail",
		    templateUrl:"views/order/orderDeliveryDetail.html",
			controller:"ctr_orderDeliveryDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_orderDeliveryDetail.js"
		        			        ]});
		        }]
		    } 
		})
		//  订单列表
        .state("index.order.orderProduct",{
		    url:"/orderProduct",
		    templateUrl:"views/order/orderProduct.html",
			controller:"ctr_orderProduct",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_orderProduct.js"
		        			        ]});
		        }]
		    } 
		})
		 //  订货订单详情
		 .state("index.order.orderProductDetail",{
		    url:"/orderProductDetail?om_id&om_order_code",
		    templateUrl:"views/order/orderProductDetail.html",
		    controller:"ctr_orderProductDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
		            		        "js/controllerRoute/order/ctr_orderProductDetail.js",
		        			        ]});
		        }]
		    } 
		})

		//  送水申请
        .state("index.order.ticketsendapply",{
		    url:"/ticketsendapply",
		    templateUrl:"views/order/ticketSendApply.html",
			controller:"ctr_ticketSendApply",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/order/ctr_ticketSendApply.js"
		        			        ]});
		        }]
		    } 
		})
		
};
