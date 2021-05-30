tempApp.controller('ctr_baseCityList', function($scope,$compile,
		$state,http,EzConfirm,messageFactory) {
	
	/**
	 * 查询所有菜单树
	 */
	$scope.queryMenuTree = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.areaList = result.data;
			messageFactory.closeLoading();
			query($scope.areaList);
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url =  '/admin/base/baseAreaControl/queryBaseAreaTreeNew.action';
		http.post(url,{},success,error);
	}
	
	 var setting = {
        view: {
            showLine: false,
            showIcon: true,
            addDiyDom: addDiyDom
        },
        check: {
			enable: true,
			chkStyle: "checkbox",
			chkboxType: { "Y": "ps", "N": "ps" }
		},
        data: {
            simpleData: {
                enable: true
            }
        }
    };
	
	/**
     * 查询数据
     */
    function query(data) {
        //初始化树
        $.fn.zTree.init($("#dataTree"), setting, data);
        //添加表头
		var li_head = ' <li class="head"><a><div class="diy"  style="width:20%">地区名称</div>' +
		'<div class="diy" style="width:20%">状态</div>'+
		'<div class="diy" style="width:20%">排序</div>'+
		'<div class="diy" style="width:40%">操作</div></a></li>';
        var rows = $("#dataTree").find('li');
        if (rows.length > 0) {
            rows.eq(0).before(li_head)
        } else {
            $("#dataTree").append(li_head);
            $("#dataTree").append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
        }
        // expandAll(true);
    }	
	
    /**
     * 自定义DOM节点
     */
    function addDiyDom(treeId, treeNode) {
        var spaceWidth = 15;
        var liObj = $("#" + treeNode.tId);
        var aObj = $("#" + treeNode.tId + "_a");
        var switchObj = $("#" + treeNode.tId + "_switch");
        var checkObj = $("#" + treeNode.tId + "_check");
        var icoObj = $("#" + treeNode.tId + "_ico");
        var spanObj = $("#" + treeNode.tId + "_span");
        aObj.attr('title', '');
        aObj.append('<div class="diy swich"></div>');
        var div = $(liObj).find('div').eq(0);
        switchObj.remove();
        spanObj.remove();
        icoObj.remove();
        checkObj.remove();
        div.append(checkObj);
        div.append(switchObj);
        div.append(icoObj);
        div.append(spanObj);
        var spaceStr = "<span style='height:1px;display: inline-block;width:" + (spaceWidth * treeNode.level) + "px'></span>";
        checkObj.before(spaceStr);
        var editStr = '';
        editStr += '<div class="diy" style="width:20%;color:'+(treeNode.ba_state == 1 ? 'green' : 'red')+'">' + (treeNode.ba_state == 1 ? '启用' : '禁用') + '</div>';
        editStr += '<div class="diy" style="width:20%;">' + (treeNode.ba_sort==undefined?'':treeNode.ba_sort) + '</div>';
        editStr += '<div class="diy" style="width:40%">' +formatHandle(treeNode)+  '</div>';
        editStr = $compile(editStr)($scope);//使用angular重新编译 使ngClick生效
        aObj.append(editStr);
    }
    
    /**
     * 根据权限展示功能按钮
     * @param treeNode
     * @returns {string}
     */
    function formatHandle(treeNode) {
        var htmlStr = '';
        /*if(treeNode.ba_state != 1){
        	htmlStr += '<a  style="margin-bottom: 16px;font-size:15px;" ng-click="updateStateOn(\'' + treeNode.id + '\',\'' + treeNode.name + '\')" style="display: inline-block;">启用</a>';
        }
        if(treeNode.ba_state == 1){
        	htmlStr += '<a  style="margin-bottom: 16px;font-size:15px;" ng-click="updateStateOff(\'' + treeNode.id + '\',\'' + treeNode.name + '\')" style="display: inline-block;">禁用</a>';
        }*/
        return htmlStr;
    }
    
    $scope.updateStateOn = function(){
    	var treeObj = $.fn.zTree.getZTreeObj("dataTree");
    	var nodes = treeObj.getCheckedNodes(true);
    	var msg = "";
    	var ids = [];
    	msg = "您确定启用勾选的地区吗？";
    	for(i in nodes){
    		if(nodes[i].ba_state!=1){
    			ids.push(nodes[i].id);
    		}
    	}
    	if(ids.length==0){
    		messageFactory.showMessage('success','没有需要启用的城市');
    		return;
    	}
    	var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.queryMenuTree();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var url = "/admin/member/memberShopAreaControl/updateState.action";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {	
			messageFactory.showLoading();
			http.post(url, {ids:ids.join(','),ba_state:1}, success, error);
		}, function() {
			
		});	
    }
    
    $scope.queryBanStore = function(){
    	var treeObj = $.fn.zTree.getZTreeObj("dataTree");
    	var nodes = treeObj.getCheckedNodes(true);
    	var ids = [];
    	var data = {};
    	for(i in nodes){
    		if(!nodes[i].ba_province_gbcode){
    			data[nodes[i].ba_district_gbcode]=true;
    		}else{
    			data[nodes[i].ba_province_gbcode]=true;
    		}
    		if(nodes[i].ba_state==1&&(nodes[i].check_Child_State==2||nodes[i].isParent==false)){
    			ids.push(nodes[i].id);
    		}
    	}
    	if(Object.getOwnPropertyNames(data).length>1){
    		messageFactory.showMessage('success','每次只能操作一个省的数据');
    		return;
    	}
    	if(ids.length==0){
    		messageFactory.showMessage('success','没有需要禁用的城市');
    		return;
    	}
    	var success = function(result){
    		if(result.data==1){
    			EzConfirm.create({
    				heading : '提示',
    				text : result.desc
    			}).then(function() {	
    				messageFactory.showLoading();
    				$scope.updateStateOff(ids);
    			}, function() {
    				
    			});
    		}else if(result.data==0){
    			EzConfirm.create({
    				heading : '提示',
    				text : "您确定禁用勾选的地区吗？"
    			}).then(function() {	
    				messageFactory.showLoading();
    				$scope.updateStateOff(ids);
    			}, function() {
    				
    			});	
    		}
    		console.log(result)
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = "/admin/member/memberShopAreaControl/queryBanStore.action";
		http.post(url, {ids:ids.join(',')}, success, error);
    }
    
    $scope.updateStateOff = function(ids){
    	var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.queryMenuTree();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = "/admin/member/memberShopAreaControl/updateState.action";
		http.post(url, {ids:ids.join(','),ba_state:0}, success, error);
    }
    
    $scope.queryMenuTree();
})






















