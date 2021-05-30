"use strict"
tempApp.config(["$stateProvider", "$urlRouterProvider", routeFn]);

function routeFn($stateProvider, $urlRouterProvider) {
    $stateProvider


    	//  我的账户
        .state("index.myAccount",{
		    url:"/account/myAccount",
		    templateUrl:"views/account/myAccount.html",
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
        
        //  账户明细
        .state("index.accountDetail",{
		    url:"/account/accountDetail",
		    templateUrl:"views/account/accountDetail.html",
//      	controller:"ctr_orderDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
		            		        "css/activityAdd/activityAdd.css",
		        			        ]});
		        }]
		    } 
		})
        
        //  充值
        .state("index.accountRecharge",{
		    url:"/account/accountRecharge",
		    templateUrl:"views/account/accountRecharge.html",
//      	controller:"ctr_orderDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
		            		        "css/activityAdd/activityAdd.css",
		        			        ]});
		        }]
		    } 
		})
                
        //  充值页面
        .state("index.rechargePage",{
		    url:"/account/rechargePage",
		    templateUrl:"views/account/rechargePage.html",
//      	controller:"ctr_orderDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
		            		        "css/activityAdd/activityAdd.css",
		        			        ]});
		        }]
		    } 
		})
        
        //  二维码明细
        .state("index.twoDimension",{
		    url:"/account/twoDimension",
		    templateUrl:"views/account/twoDimension.html",
//      	controller:"ctr_orderDetail",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/gift/gift.css",
		            		        "css/activityAdd/activityAdd.css",
		        			        ]});
		        }]
		    } 
		})

};
