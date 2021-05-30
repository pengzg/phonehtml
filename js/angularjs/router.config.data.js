"use strict"
tempApp.config(["$stateProvider", "$urlRouterProvider", routeFn]);

function routeFn($stateProvider, $urlRouterProvider) {
    $stateProvider


    	//  数据
        .state("index.data",{
		    url:"/data",
		    templateUrl:"views/data/data.html",
//      	controller:"ctr_orderList",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            			"css/data/data.css",
		        			        ]});
		        }]
		    } 
		})

    	//  数据概览
        .state("index.data.dataanalysis",{
		    url:"/dataanalysis",
		    templateUrl:"views/data/dataAnalysis.html",
			controller:"ctr_dataAnalysis",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            		        "css/data/data.css",
									"js/controllerRoute/data/ctr_dataAnalysis.js"
		        			        ]});
		        }]
		    } 
		})
		//  交易分析
        .state("index.data.tradeanalysis",{
		    url:"/tradeanalysis",
		    templateUrl:"views/data/tradeAnalysis.html",
			controller:"ctr_tradeAnalysis",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            				"css/data/data.css",
									"js/controllerRoute/data/ctr_tradeAnalysis.js"
		        			        ]});
		        }]
		    } 
		})
		//  客户分析 
        .state("index.data.custanalysis",{
		    url:"/custanalysis",
		    templateUrl:"views/data/custAnalysis.html",
			controller:"ctr_custAnalysis",
		    resolve:{
		        deps:["$ocLazyLoad",function($ocLazyLoad){
		            return $ocLazyLoad.load(
		            		{files:[
		            				"css/data/data.css",
									"js/controllerRoute/data/ctr_custAnalysis.js"
		        			        ]});
		        }]
		    } 
		})
};
