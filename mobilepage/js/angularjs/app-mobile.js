'use strict'
var tempApp = angular.module('appIndex', ['ui.router', 'oc.lazyLoad', 'ionic']);
tempApp.config([
    '$provide',
    '$compileProvider',
    '$controllerProvider',
    '$filterProvider',
    '$logProvider',
    function($provide, $compileProvider, $controllerProvider, $filterProvider, $logProvider) {
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
    }
]);

tempApp.constant('Modules_Config', {
    systemId: '1005'
});