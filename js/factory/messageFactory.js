"use strict"
!function(){
	tempApp.factory('messageFactory', function($rootScope,$timeout) {
	   var factory = {};
	   //type:success成功弹窗、error失败弹窗、errorCopy带复制的弹窗
	   //msg: 弹窗内容
	   factory.showMessage = function(type,msg) {
	   		// 取消按钮禁用
	   		$rootScope.isBtnActive = true;
	   		// 成功和失败弹窗
		   var msgDivSuccess = top.$("#publicPopDiv");
		   var msgDivError = top.$("#publicPopDiv2");
		   var msgDivErrorSingle = top.$("#publicPopDivSingle");
		   var msgDivErrorAuto = top.$("#publicPopDivAuto");

		   // 成功和失败弹窗内容
		   var i_msg_success = top.$("#i_msg");
		   var i_msg_error = top.$("#i_msg2");
		   var i_msg_error_single = top.$("#i_msg_single");
		   var i_msg_error_auto = top.$("#i_msg_auto");
		   var msgView = msg;
		   if(msg.length>100){
				msgView = msg.substring(0,100)+'...';
				i_msg_success.attr('title',msg);
			    i_msg_error.attr('title',msg);
			    i_msg_error_single.attr('title',msg);
			    i_msg_error_auto.attr('title',msg);
		   }
		   i_msg_success.html(msgView);
		   i_msg_error.html(msgView);
		   i_msg_error_single.html(msgView);
		   i_msg_error_auto.html(msgView);

		   if(type=="success"){
			   msgDivSuccess.show();
			   $timeout(function(){
			   		msgDivSuccess.hide();
			   },1500);
		   }
		   if(type=="error"){
			   msgDivErrorSingle.show();
		   }
		   // if(type=="errorCopy"){
			  //  msgDivError.show();
		   // }
		   if(type=="errorAuto"){
		   	   msgDivErrorAuto.show();
		   	   $timeout(function(){
			   		msgDivErrorAuto.hide();
			   },1500);
		   }

		   //成功关闭按钮
	    	top.$("#publicPopSuccess").click(function(){
	    		msgDivSuccess.hide();
	    	});
	    	//带复制失败关闭按钮
	    	top.$("#publicPopError").click(function(){
	    		msgDivError.hide();
	    	});
	    	//失败关闭按钮
	    	top.$("#publicPopErrorSingle").click(function(){
	    		msgDivErrorSingle.hide();
	    	});
	    	//自动隐藏的错误关闭按钮
	    	top.$("#publicPopErrorAuto").click(function(){
	    		msgDivErrorAuto.hide();
	    	});
	    	//复制按钮
	    	// $("#publicPopCopy").zclip({
	    	// 	path: "/util/jquery-zclip/ZeroClipboard.swf",
	    	// 	copy: function(){
      //                   return i_msg_error.html();
      //           },
      //           /* 按住鼠标时的操作 */
      //           beforeCopy:function(){
      //               // $(this).css("color","orange");
      //           },
      //           /* 复制成功后的操作 */
      //           afterCopy:function(){
      //           	msgDivError.hide();
      //           	$("#publicPopCopy").removeClass("hover");
      //               var $copysuc = $("<div class='copy-tips'><div class='copy-tips-wrap'>☺ 复制成功</div></div>");
      //               $("body").find(".copy-tips").remove().end().append($copysuc);
      //               $(".copy-tips").fadeOut(3000);
      //           }
	    	// });
	          
	   }
	   
	   factory.showLoading = function(){

		    var html = '<div id = "loading">'+
		    '<div id="loading" class="loading">'+
		    '<span class="leftImg"><img src="./img/loading2.gif"></span>'+
		    '<span class="rightText">loading...</span></div></div>';
		    
		    //里层
		    if (self.frameElement && self.frameElement.tagName == "IFRAME") {
		    	var body = $("body", window.parent.document);
		    	var loading = $('#loading', window.parent.document);
		    	//正在显示加载圈
		    	if(loading.length!=0) {
		    		return;
		    	}
		    	body.append(html);
		    }
		    //外层
		    else{
		    	var body = $("body");
		    	var loading = $('#loading');
		    	//正在显示加载圈
		    	if(loading.length!=0) {
		    		return;
		    	}
		    	body.append(html);
		    }
	   }
	   
	   factory.showBakLoading = function(){
		    var html = '<div id = "loading"><div class="dialog-zdc"></div>'+
		    '<div id="loading" class="loading">'+
		    '<span class="leftImg"><img src="./img/loading.gif"></span>'+
		    '<span class="rightText">loading...</span></div></div>';
		
	    	var body = top.$("body");
	    	var loading = top.$('#loading');
	    	//正在显示加载圈
	    	if(loading.length!=0) {
	    		return;
	    	}
	    	body.append(html);
		    
	   }
	   factory.closeLoading = function(){
	   		top.$("#loading").remove();
	   }
// ************************按钮禁用start*****************************
	   //按钮是否可点
	   $rootScope.isBtnActive = true;

	   factory.btnClick = function(clickFun){
	   		if($rootScope.isBtnActive){
	   			$rootScope.isBtnActive = false;
	   			if(typeof(clickFun)=='function'){
	   				clickFun();
	   			}
	   		}
	   }
	   factory.activityBtn = function(){
		   if(!$rootScope.$$phase){
			   $rootScope.$apply(function(){
				   $rootScope.isBtnActive = true;
			   });
		   }else{
			   $rootScope.isBtnActive = true;
		   }
	   }

	   // 调用方法如下：
	   // 点击方法，js
	   /*$scope.searchFun = function(){
			messageFactory.btnClick(function(){
				$timeout(function(){
					messageFactory.activityBtn();
				},2000)
			})
		}*/
		// 页面
		/*<input type="submit" 
				value="{{$root.isBtnActive?'提交':'加载中'}}"
				ng-click="searchFun();" 
				ng-class="{true:'btn_disable',false:''}[!$root.isBtnActive]"/>*/
				
	   // **********************按钮禁用end*************************************
	  

	   return factory;
	}); 
}()
