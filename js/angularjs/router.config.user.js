"use strict"
tempApp.config(["$stateProvider", "$urlRouterProvider", routeFn]);

function routeFn($stateProvider, $urlRouterProvider) {
    $stateProvider

    //  用户管理
        .state("index.user", {
            url: "/user",
            templateUrl: "views/user/user.html",
            controller:"ctr_userManage",
            resolve: {
                deps: ["$ocLazyLoad", function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            "css/setting/setting.css",
                            "js/controllerRoute/user/ctr_UserManage.js"
                        ]
                    });
                }]
            }
        })
        
        //  用户详情
        .state("index.user.userdetail", {
            url: "/userdetail?id",
            templateUrl: "views/user/userdetail.html",
            controller:"ctr_userDetail",
            resolve: {
                deps: ["$ocLazyLoad", function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        files: [
                            "css/user/userdetail.css",
                            "js/controllerRoute/user/ctr_UserDetail.js"
                        ]
                    });
                }]
            }
        })

    //  用户列表
    .state("index.user.userList", {
        url: "/userList",
        templateUrl: "views/user/userList.html",
        controller:"ctr_userList",
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                        "css/user/userdetail.css",
                        "js/controllerRoute/user/ctr_UserList.js"
                    ]
                });
            }]
        }
    })
    .state("index.user.memberaccount", {
        url: "/memberaccount",
        templateUrl: "views/user/memberaccount/memberaccount.html",
        controller:"ctr_memberaccount",
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                        "css/user/userdetail.css",
                        "js/controllerRoute/user/memberaccount/ctr_memberaccount.js"
                    ]
                });
            }]
        }
    })
    //人员调整
    .state("index.user.memberbase", {
        url: "/memberbase",
        templateUrl: "views/user/memberaccount/memberbase.html",
        controller:"ctr_memberbase",
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                        "css/user/userdetail.css",
                        "js/controllerRoute/user/memberaccount/ctr_memberbase.js"
                    ]
                });
            }]
        }
    })
    //  用户地址列表
    .state("index.user.memberAddressList", {
        url: "/memberAddressList",
        templateUrl: "views/user/memberaddress/memberAddressList.html",
        controller:"ctr_memberAddressList",
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                        "css/user/userdetail.css",
                        "js/controllerRoute/user/memberaddress/ctr_memberAddressList.js"
                    ]
                });
            }]
        }
    })
    //  工作人员信息列表
    .state("index.user.workUserList", {
        url: "/workUserList",
        templateUrl: "views/user/workUserList.html",
        controller:"ctr_workUserList",
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                        "css/user/userdetail.css",
                        "js/controllerRoute/user/ctr_workUserList.js"
                    ]
                });
            }]
        }
    })

    .state("index.user.baserole",{
        url:"/baserole",
        templateUrl:"views/user/userrole/baseRole.html",
        controller: "ctr_baseRole",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "css/marketingactivitytype/activitytype.css",
                                "css/product/product.css",
                                "css/setting/basecity.css",
                                "js/controllerRoute/user/userrole/ctr_baseRole.js"
                                ]});
            }]
        } 
    })
    
    
     //工作人员与仓库的关联 
    .state("index.user.workStoreRelation",{
        url:"/workStoreRelation",
        templateUrl:"views/user/workStoreAdd/workStoreRelation.html",
        controller:"ctr_workStoreRelation",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                		        "css/product/product.css",
                                "js/controllerRoute/user/workStoreAdd/ctr_workStoreRelation.js"
            			        ]});
            }]
        } 
    })
    
         //工作人员与仓库关联添加	
    .state("index.user.workStoreRelationAdd",{
        url:"/workStoreRelationAdd?workId",
        templateUrl:"views/user/workStoreAdd/workStoreRelationAdd.html",
        controller:"ctr_workStoreRelationAdd",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                		{files:[
                                "js/controllerRoute/user/workStoreAdd/ctr_workStoreRelationAdd.js"
            			        ]});
            }]
        } 
    })
    
        //  黑名单
    .state("index.user.sysblacklist", {
        url: "/sysBlackList",
        templateUrl: "views/user/sysblacklist/sysBlackList.html",
        controller:"ctr_sysBlackList",
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                        "css/user/userdetail.css",
                        "js/controllerRoute/user/sysblacklist/ctr_sysBlackList.js"
                    ]
                });
            }]
        }
    })
    //会员水票
    .state("index.user.ticketList",{
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
    //会员水票统计
    .state("index.user.ticketListStats",{
        url:"/ticketListStats",
        templateUrl:"views/order/ticketListStats.html",
        controller:"ctr_ticketListStats",
        resolve:{
            deps:["$ocLazyLoad",function($ocLazyLoad){
                return $ocLazyLoad.load(
                        {files:[
                                "js/controllerRoute/order/ctr_ticketListStats.js",
                                ]});
            }]
        } 
    })
    //会员水票核销记录
    .state("index.user.ticketVList",{
        url:"/ticketVList?tv_ticketid&startDate&endDate&memberid",
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
    // 赠送
    .state("index.user.membergiftlist", {
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

    //人员调整
    .state("index.user.memberTree", {
        url: "/memberTree",
        templateUrl: "views/user/memberTree.html",
        controller:"ctr_memberTree",
        resolve: {
            deps: ["$ocLazyLoad", function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    files: [
                        "css/user/userdetail.css",
                        "js/controllerRoute/user/ctr_memberTree.js"
                    ]
                });
            }]
        }
    })
};
