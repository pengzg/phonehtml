'use strict'
var tempApp = angular.module('appIndex', [ 'ui.router', 'oc.lazyLoad','ng.ueditor','ionic','ui.bootstrap','ez.confirm', 'ez.focus','w5c.validator']);
tempApp.config([
		'$provide',
		'$compileProvider',
		'$controllerProvider',
		'$filterProvider',
		'$logProvider',
		function($provide, $compileProvider, $controllerProvider,$filterProvider,$logProvider) {
			tempApp.controller = $controllerProvider.register;
			tempApp.directive = $compileProvider.directive;
			tempApp.filter = $filterProvider.register;
			tempApp.factory = $provide.factory;
			tempApp.service = $provide.service;
			tempApp.constant = $provide.constant;

			$logProvider.debugEnabled(true);
	        $provide.decorator('$log', function($delegate) {
	            //Original methods
	            var origInfo = $delegate.info;
	            var origLog = $delegate.log;

	            //Override the default behavior
	            $delegate.info = function() {

	                if ($logProvider.debugEnabled())
	                    origInfo.apply(null, arguments)
	            };

	            //Override the default behavior    
	            $delegate.log = function() {

	                if ($logProvider.debugEnabled())
	                    origLog.apply(null, arguments)
	            };

	            return $delegate;
	        });
		} ]);

tempApp.constant('Modules_Config', {
	systemcode : 'yx',
	mobilePath: 'mobilepage',
	dateRangeConfig: {
        applyClass : 'btn-sm btn-success',
        cancelClass : 'btn-sm',
        locale: {
            applyLabel: '确认',
            cancelLabel: '取消',
            fromLabel : '起始时间',
            toLabel : '结束时间',
            firstDay : 1,
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ]
        },
        opens : 'right',    // 日期选择框的弹出位置
        separator : ' 至 ',
        format: 'YYYY-MM-DD'
 
    }
});
tempApp.config(["w5cValidatorProvider", function (w5cValidatorProvider) {

    // 全局配置
    w5cValidatorProvider.config({
        blurTrig   : true,
        showError  : true,
        removeError: true

    });

    w5cValidatorProvider.setRules({
        email         : {
            required: "输入的邮箱地址不能为空",
            email   : "输入邮箱地址格式不正确"
        },
        username      : {
            required      : "输入的用户名不能为空",
            pattern       : "用户名必须输入字母、数字、下划线,以字母开头",
            w5cuniquecheck: "输入用户名已经存在，请重新输入"
        },
        password      : {
            required : "密码不能为空",
            minlength: "密码长度不能小于{minlength}",
            maxlength: "密码长度不能大于{maxlength}"
        },
        repeatPassword: {
            required: "重复密码不能为空",
            repeat  : "两次密码输入不一致"
        },
        number        : {
            required: "数字不能为空"
        },
        customizer    : {
            customizer: "自定义验证数字必须大于上面的数字"
        },
        dynamicName:{
            required: "动态Name不能为空"
        },
        dynamic       : {
            required: "动态元素不能为空"
        }
    });
}]);
