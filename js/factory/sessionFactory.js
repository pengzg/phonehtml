"use strict"
!function(){
	tempApp.factory('sessionFactory', function($q,http,Modules_Config,$location) {
	   var factory = {};
	   factory.getMenu = function(callBackGetMenu) {
		   var url = "/admin/login/loginControl/queryMenuByUser.action";
		   var success = function(data){
			   sessionStorage.menuStr = JSON.stringify(data);
			   callBackGetMenu(data);
		   }
		   var error = function(){};
		   if(sessionStorage.menuStr==undefined){
			  http.post(url, {systemId : 1006,sur_source:2},success,error);
		   }else{
			   callBackGetMenu(JSON.parse(sessionStorage.menuStr));
		   };
		   
		   /*function formatMenu(data){
		   		var obj = {};
		   		var data1 = data.data;
		   		for(var i=0,len=data1.length;i<len;i++){
		   			var data2 = data1[i];
		   			if(data2.childMenus==undefined) continue;
		   			var data2Child = data2.childMenus;
		   			obj['sm_url'] = data2['sm_name'];

		   			for(var j=0,len2=data2Child.length;j<len2;j++){
		   				var data3 = data2Child[j];
		   				var data3Child = data3.childMenus;
		   				if(data3.childMenus==undefined) continue;
		   				obj[data3['sm_url']] = data3['sm_name'];

		   				for(var k=0,len3=data3Child.length;k<len3;k++){
		   					var data4 = data3Child[k];
		   					obj[data4['sm_url']] = data4['sm_name'];
		   				}
		   			}
		   		}
		   		$rootScope.menuObject = obj;
		   		window.localStorage.setItem('menuObject', JSON.stringify(obj));
		   }*/
		 
	   }
	   
	   factory.getUser = function(callBackGetUser) {
		   var url = "/admin/member/sysUserControl/getSessionInfo.action";
		   var success = function(result){
			   sessionStorage.userStr = JSON.stringify(result.data);
			   callBackGetUser(result.data);
		   }
		   var error = function(){};
		   if(sessionStorage.userStr==undefined){
			  http.post(url, {systemId : Modules_Config.systemId},success,error);
		   }else{
			   callBackGetUser(JSON.parse(sessionStorage.userStr));
		   };
		 
	   }
	   
	   factory.clearSession = function() {
		   sessionStorage.clear();
		   //console.log("session clear");
	   }
	   return factory;
	}); 
}()
