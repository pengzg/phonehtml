"use strict"
!function(){
	tempApp.factory('mobileFactory', function($rootScope) {
	   var factory = {};
	   factory.showPop = function(text) {
		 	$rootScope.compop_text = text;
		    $rootScope.compop = true;
	   }
	   factory.hidePop = function() {
		 	$rootScope.compop_text = text;
		    $rootScope.compop = true;
	   }
	   
	   return factory;
	}); 
}()
