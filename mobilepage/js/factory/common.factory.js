tempApp.factory('commonFactory', function() {
	/**
	 * iframe里层操作外层scope数据,运行环境里层
	 * @Author   SunXinqiang
	 * @DateTime 2017-08-17
	 * @param    {string}    id  [外层元素的id，用于获取外层scope]
	 * @param    {string}    key [要操作的scope名字]
	 * @param    {string}    val [要操作的scope值]
	 */
	function setScopeToParent(id,key,val){
	    var ele = parent.document.getElementById(id);
	    var scope = parent.angular.element(ele).scope();
	    scope.$apply(function(){
	        scope[key] = val;
	    })
	}

	/**
	 * 外层操作里层scope,运行环境外层
	 * @Author   SunXinqiang
	 * @DateTime 2017-08-17
	 * @param    {string}    frameId [iframe的id]
	 * @param    {string}    id      [iframe内要操作的元素的id或页面id，用于获取所在作用域scope]
	 * @param    {string}    key     [要操作的scope名字]
	 * @param    {string}    val     [要操作的scope的值]
	 */
	/*function setScopeToChild(frameId, id, key, val) {
	    var childWindow = document.getElementById(frameId).contentWindow;
	    $('#'+frameId).load(function(){
	    	var ele = childWindow.document.getElementById(id);
	    	var scope = childWindow.angular.element(ele).scope();
	    	scope.$apply(function(){
	    		scope[key] = val;
	    	})
	    });
	    
	    
	    
	}*/
	
	
	function setScopeToChild(frameId, id, key, val) {
	    var childWindow = document.getElementById(frameId).contentWindow;
	    if(childWindow.document.readyState=='complete'){
		    var ele = childWindow.document.getElementById(id);
		    var scope = childWindow.angular.element(ele).scope();
		    scope.$apply(function(){
		        scope[key] = val;
		    })
	    }else{
	    	(function(frameId, id, key, val){
		    	childWindow.document.onload = function(){
		    		var ele = childWindow.document.getElementById(id);
				    var scope = childWindow.angular.element(ele).scope();
				    scope.$apply(function(){
				        scope[key] = val;
				    })
		    	}
	    	})(frameId, id, key, val)
	    }
	}
	
	/**
	 * 保持图片原比例显示,外层宽高需要固定
	 * @Author   SunXinqiang
	 * @DateTime 2017-08-17
	 * @param    {string}    id  [img的id]
	 * @param    {[type]}    img [图片对象]
	 */
	function setWidthHeight(id,src){
		var img = new Image();
		img.onload = function(){
			if(img.width>img.height){
				$('#'+id).css('width','95%');
				$('#'+id).css('height','auto');
			}else{
				$('#'+id).css('width','auto');
				$('#'+id).css('height','95%');
			}
		}
		img.src = src;
	}
	/**
	 * 获取n到m的随机整数
	 * @Author   SunXinqiang
	 * @DateTime 2017-08-18
	 * @param    {number}    n [起始]
	 * @param    {number}    m [结束]
	 * @return   {number}      [返回随机数]
	 */
	function getRandom(n,m){
        var range = m-n;
        var num = Math.random()*range + n;
        return Math.round(num);//数字舍入为最接近的整数0.4>0 0.5>1
    }
 	/**
 	 * 字符串替换
 	 * @Author   SunXinqiang
 	 * @DateTime 2017-08-22
 	 * @param    {str}    str 	 原字符串
 	 * @param    {str}    oldVal 要被替换的值
 	 * @param    {str}    newVal 替换值
 	 * @return   {str}           替换后的字符串
 	 */
    function replaceAll(str,oldVal,newVal) {
	    var reg = new RegExp(oldVal, "g");
	    str = str.replace(reg, newVal);
	    return str;
	}
	return {
		setScopeToParent: setScopeToParent,
		setScopeToChild: setScopeToChild,
		setWidthHeight: setWidthHeight,
		getRandom: getRandom,
		replaceAll:replaceAll
	};
});
