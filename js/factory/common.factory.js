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
	function setScopeToChild(frameId, id, key, val) {
	    var childWindow = document.getElementById(frameId).contentWindow;
	    $('#'+frameId).load(function(){
	    	var ele = childWindow.document.getElementById(id);
	    	var scope = childWindow.angular.element(ele).scope();
	    	scope.$apply(function(){
	    		scope[key] = val;
	    	})
	    });
	    
	    
	    
	}
	
	
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
        return Math.round(num);//数字舍入为最接近的整数0.4->0, 0.5->1
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
    /**
     * 生成有padding的base64图片,基于jquery-qrcode
     * @DateTime 2018-01-22
     * @param    {[type]}   oriData [description]
     * @return   {[type]}           [description]
     */
    function getQrcodeBase64(text,width,height,padding){
        var $divTemp = $('<div></div>');
        var innerW = width-padding*2;
        var innerH = height-padding*2;
        //二维码高度=宽度 不然生成的有问题
	    $divTemp.qrcode({width:innerW,height:innerW,correctLevel:0,text:text});

	    //qrcode二维码的canvas
	    var _canvasCode = $divTemp.find('canvas')[0];
	    var _context = _canvasCode.getContext('2d');

	    //新canvas 用于缩放正方形的二维码，并加padding
	    var newCanvas = $('<canvas>').attr('width', width).attr('height', height)[0];
	    var context2 = newCanvas.getContext('2d');
	    context2.fillStyle = '#fff';
	    context2.fillRect(0,0,width,height);
	    context2.scale(1,innerH/innerW);
	    context2.drawImage(_canvasCode,padding,padding*(innerW/innerH));

	    //生成base64图片地址
	    var result = newCanvas.toDataURL('image/png');
	    $divTemp = null;
	    newCanvas = null;
	    return result;

    }
	return {
		setScopeToParent: setScopeToParent,
		setScopeToChild: setScopeToChild,
		setWidthHeight: setWidthHeight,
		getRandom: getRandom,
		replaceAll: replaceAll,
		getQrcodeBase64: getQrcodeBase64
	};
});
