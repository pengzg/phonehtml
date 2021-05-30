"use strict"
tempApp.config(["$stateProvider","$urlRouterProvider",routeFn]);
function routeFn($stateProvider,$urlRouterProvider){
	$stateProvider
	 //营销
    .state("index.cs",{
        url:"/cs",
        templateUrl:"views/cs/cs.html",
        controller:"ctr_cs",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                               
                                "js/controllerRoute/cs/ctr_cs.js"
            			        ]});
            }]
        } 
    })
	//客户档案
    .state("index.cs.cscustomerList",{
        url:"/customer/cscustomer/cscustomerList",
        templateUrl:"views/cs/customer/cscustomer/cscustomerList.html",
        controller:"ctr_csCustomerList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "js/controllerRoute/cs/customer/cscustomer/ctr_cscustomerList.js"
            			        ]});
            }]
        } 
    }) 
    // 客户类型
     .state("index.cs.cscategoryList",{
        url:"/customer/csCategoryList",
        templateUrl:"views/cs/customer/cscategory/cscategoryList.html",
        controller:"ctr_csCategoryList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "css/product/stockControl.css",
                		        "js/controllerRoute/cs/customer/cscategory/ctr_cscategoryList.js"
            			        ]});
            }]
        } 
    })
    // 渠道类型
         .state("index.cs.cschannelTypeList",{
        url:"/customer/csChannelTypeList",
        templateUrl:"views/cs/customer/cschanneltype/cschanneltypeList.html",
        controller:"ctr_csChannelTypeList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "css/product/stockControl.css",
                		        "js/controllerRoute/cs/customer/cschanneltype/ctr_csChannelTypeList.js"
            			        ]});
            }]
        } 
    })
    .state("index.cs.csCategoryAdd",{
	    url:"/customer/csCategoryAdd?cc_id",
	    templateUrl:"views/cs/customer/cscategory/csCategoryAdd.html",
	    controller:"ctr_csCategoryAdd",
	    resolve:{
	        deps:["$ocLazyLoad",function($ocLazyLoad){
	            return $ocLazyLoad.load(
	            		{files:[
	            		        "css/product/goodsCenter.css",
	            		        "js/controllerRoute/cs/customer/cscategory/ctr_csCategoryAdd.js"
	        			        ]});
	        }]
	    } 
	})
	
	.state("index.csCategoryDetail",{
	    url:"/product/csCategoryDetail?cc_id",
	    templateUrl:"views/cs/customer/cscategory/csCategoryDetail.html",
	    controller:"ctr_csCategoryDetail",
	    resolve:{
	        deps:["$ocLazyLoad",function($ocLazyLoad){
	            return $ocLazyLoad.load(
	            		{files:[
	            		        "css/product/goodsCenter.css",
	            		        "js/controllerRoute/cs/customer/cscategory/ctr_csCategoryDetail.js"
	        			        ]});
	        }]
	    } 
	})
	
	// 拜访明细查询
    .state("index.cs.ctr_csLineCustTaskList",{
        url:"/customer/csLineCustTaskList",
        templateUrl:"views/cs/line/cslinecusttask/csLineCustTaskList.html",
        controller:"ctr_csLineCustTaskList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "css/product/stockControl.css",
                		        "js/controllerRoute/cs/line/cslinecusttask/ctr_csLineCustTaskList.js"
            			        ]});
            }]
        } 
    })
    // 拜访明细查询
    .state("index.cs.ctr_csLineCustTaskList2",{
        url:"/customer/csLineCustTaskList2",
        templateUrl:"views/cs/line/cslinecusttask/csLineCustTaskList2.html",
        controller:"ctr_csLineCustTaskList2",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "css/product/stockControl.css",
                		        "js/controllerRoute/cs/line/cslinecusttask/ctr_csLineCustTaskList2.js"
            			        ]});
            }]
        } 
    })
    // 业务员超期预警提醒
    .state("index.cs.csCustomerAlarm",{
        url:"/customer/csCustomerAlarm",
        templateUrl:"views/cs/customer/csCustomerAlarm/csCustomerAlarm.html",
        controller:"ctr_csCustomerAlarm",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "css/product/stockControl.css",
                		        "js/controllerRoute/cs/customer/csCustomerAlarm/ctr_csCustomerAlarm.js"
            			        ]});
            }]
        } 
    })
    // 业务员行程
    .state("index.cs.csLineTrip",{
        url:"/customer/csLineTrip",
        templateUrl:"views/cs/line/cslinetrip/csLineTrip.html",
        controller:"ctr_csLineTrip",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "css/product/stockControl.css",
                		        "js/controllerRoute/cs/line/cslinetrip/ctr_csLineTrip.js"
            			        ]});
            }]
        } 
    })
    
    //线路客户
    .state("index.cs.lineCsreport",{
        url:"/customer/lineCsReport",
        templateUrl:"views/report/common/salemansReport/lineCsreport.html",
        controller:"ctr_lineCsreport",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "css/product/stockControl.css",
                		        "js/controllerRoute/report/common/salemansReport/ctr_lineCsreport.js"
            			        ]});
            }]
        } 
    })
    
	// 客户反馈
    .state("index.cs.csfeedbacklist",{
        url:"/customer/csfeedback/csfeedbacklist",
        templateUrl:"views/cs/customer/csfeedback/csFeedbackList.html",
        controller:"ctr_csFeedbackList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "js/controllerRoute/cs/customer/csfeedback/ctr_csfeedbackList.js"
            			        ]});
            }]
        } 
    }) 
    
  //供应商管理
    .state("index.cs.supplierList",{
        url:"/customer/supplier/supplierList",
        templateUrl:"views/cs/customer/supplier/supplierList.html",
        controller:"ctr_supplierList",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "js/controllerRoute/cs/customer/supplier/ctr_supplierList.js"
            			        ]});
            }]
        } 
    }) 
    //客户审核
    .state("index.cs.cscustomercheck",{
        url:"/customer/cscustomer/cscustomercheck",
        templateUrl:"views/cs/customer/cscustomer/cscustomercheck.html",
        controller:"ctr_csCustomerCheck",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/order/orderForm.css",
                		        "js/controllerRoute/cs/customer/cscustomer/ctr_cscustomerCheck.js"
            			        ]});
            }]
        } 
    }) 
}