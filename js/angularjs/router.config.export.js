"use strict"
tempApp.config(["$stateProvider", "$urlRouterProvider", routeFn]);

function routeFn($stateProvider, $urlRouterProvider) {
    $stateProvider


    	//  订单列表
        .state("index.export",{
		    url:"/export",
		    templateUrl:"views/export/export.html",
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

		//  
        .state("index.export.exportOrder",{
		    url:"/exportOrder",
		    templateUrl:"views/export/exportOrder.html",
			controller:"ctr_exportOrder",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportOrder.js"
		        			        ]});
		        }]
		    } 
		})

		//  
        .state("index.export.exportOrderDetail",{
		    url:"/exportOrderDetail",
		    templateUrl:"views/export/exportOrderDetail.html",
			controller:"ctr_exportOrderDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportOrderDetail.js"
		        			        ]});
		        }]
		    } 
		})
 
		//  
        .state("index.export.exportBox",{
		    url:"/exportBox",
		    templateUrl:"views/export/exportBox.html",
			controller:"ctr_exportBox",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportBox.js"
		        			        ]});
		        }]
		    } 
		})

		//  
        .state("index.export.exportBoxDetail",{
		    url:"/exportBoxDetail",
		    templateUrl:"views/export/exportBoxDetail.html",
			controller:"ctr_exportBoxDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportBoxDetail.js"
		        			        ]});
		        }]
		    } 
		})

		//  
        .state("index.export.exportMember",{
		    url:"/exportMember",
		    templateUrl:"views/export/exportMember.html",
			controller:"ctr_exportMember",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportMember.js"
		        			        ]});
		        }]
		    } 
		})

		//  
        .state("index.export.exportMemberBuyAgain",{
		    url:"/exportMemberBuyAgain",
		    templateUrl:"views/export/exportMemberBuyAgain.html",
			controller:"ctr_exportMemberBuyAgain",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportMemberBuyAgain.js"
		        			        ]});
		        }]
		    } 
		})

		//  
        .state("index.export.exportTicket",{
		    url:"/exportTicket",
		    templateUrl:"views/export/exportTicket.html",
			controller:"ctr_exportTicket",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportTicket.js"
		        			        ]});
		        }]
		    } 
		})
		//  
        .state("index.export.exportTicketAll",{
		    url:"/exportTicketAll",
		    templateUrl:"views/export/exportTicketAll.html",
			controller:"ctr_exportTicketAll",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportTicketAll.js"
		        			        ]});
		        }]
		    } 
		})

		//  
        .state("index.export.exportExchangeTicket",{
		    url:"/exportExchangeTicket",
		    templateUrl:"views/export/exportExchangeTicket.html",
			controller:"ctr_exportExchangeTicket",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportExchangeTicket.js"
		        			        ]});
		        }]
		    } 
		})

		//  
        .state("index.export.exportTicketDetail",{
		    url:"/exportTicketDetail",
		    templateUrl:"views/export/exportTicketDetail.html",
			controller:"ctr_exportTicketDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportTicketDetail.js"
		        			        ]});
		        }]
		    } 
		})
		// 赠送
		.state("index.export.membergiftlist", {
			url: "/membergiftlist",
			templateUrl: "views/user/memberGiftList.html",
			controller:"ctr_memberGiftList",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load({
						files: [
							"css/user/userdetail.css",
							"js/controllerRoute/user/ctr_memberGiftList.js"
						]
					});
				}]
			}
		})
		// 赠送
		.state("index.export.exportMemberGiftList", {
			url: "/exportMemberGiftList",
			templateUrl: "views/export/exportMemberGiftList.html",
			controller:"ctr_exportMemberGiftList",
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load({
						files: [
							"css/user/userdetail.css",
							"js/controllerRoute/export/ctr_exportMemberGiftList.js"
						]
					});
				}]
			}
		})
		  //会员水票
		  .state("index.export.ticketList",{
			url:"/ticketList?startDate&endDate&memberid&tab",
			templateUrl:"views/export/exportTicketList.html",
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
		//会员水票
		.state("index.export.exportTicketList",{
			url:"/exportTicketList?startDate&endDate&memberid&tab",
			templateUrl:"views/export/exportTicketList.html",
			controller:"ctr_exportTicketList",
			resolve:{
				deps:["$ocLazyLoad",function($ocLazyLoad){
					return $ocLazyLoad.load(
							{files:[
									"js/controllerRoute/export/ctr_exportTicketList.js",
									]});
				}]
			} 
		})

		//  
        .state("index.export.exportSaleDetail",{
		    url:"/exportSaleDetail",
		    templateUrl:"views/export/exportSaleDetail.html",
			controller:"ctr_exportSaleDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportSaleDetail.js"
		        			        ]});
		        }]
		    } 
		})

		//  
        .state("index.export.exportAdvances",{
		    url:"/exportAdvances",
		    templateUrl:"views/export/exportAdvances.html",
			controller:"ctr_exportAdvances",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportAdvances.js"
		        			        ]});
		        }]
		    } 
		})
		//  
        .state("index.export.exportOrderAdvances",{
		    url:"/exportOrderAdvances",
		    templateUrl:"views/export/exportOrderAdvances.html",
			controller:"ctr_exportOrderAdvances",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
									"js/controllerRoute/export/ctr_exportOrderAdvances.js"
		        			        ]});
		        }]
		    } 
		})
};
