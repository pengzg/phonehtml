"use strict"
tempApp
.config(["$ocLazyLoadProvider",routeFn]);
function routeFn($ocLazyLoadProvider){
    $ocLazyLoadProvider.config({
        debug:false,
        events:false
    });
};