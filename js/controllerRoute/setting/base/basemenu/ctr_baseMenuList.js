tempApp.controller('ctr_baseMenuList', function($scope,$compile,
		$state,http,EzConfirm,messageFactory) {
	
	/**
	 * 查询所有菜单树
	 */
	$scope.queryMenuTree = function(){
		messageFactory.showLoading();
		var success = function(result){
			$scope.allMenuList = result.data;
			messageFactory.closeLoading();
			query($scope.allMenuList);
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url =  '/admin/sys/sysMenuControl/queryAllMenueTree.action';
		http.post(url,{systemId:'1006'},success,error);
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
	 
	// 弹窗里面的菜单下拉设置
    var setting2 = {
        view: {
            showLine: true,
            showIcon: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        callback: {
            onClick: zTreeOnClick
        }
    };
    
 // 里层菜单下拉框点击事件
    function zTreeOnClick(event, treeId, treeNode) {
        $scope.$apply(function() {
        	if(treeNode.level < 1){
        		$scope.vo.sm_pid_nameref = treeNode.name;
        		$scope.vo.sm_pid = treeNode.id;
        		$scope.vo.sm_level = treeNode.level + 1;
            }else{
            	messageFactory.showMessage('error',"二级菜单下不能添加新菜单！");
            }
        });
        $("#dataTreePopDiv").hide();
    };
	
	/**
     * 查询数据
     */
    function query(data) {
        //初始化树
        $.fn.zTree.init($("#dataTree"), setting, data);
        $.fn.zTree.init($("#dataTreePop"), setting2, data);
        //添加表头
        var li_head = ' <li class="head"><a><div class="diy">菜单名称</div><div class="diy">菜单类型</div><div class="diy">序号</div>' +
            '<div class="diy">图标</div><div class="diy">状态</div><div class="diy">路由</div><div class="diy" style="width: 30%; ">操作</div></a></li>';
        var rows = $("#dataTree").find('li');
        if (rows.length > 0) {
            rows.eq(0).before(li_head)
        } else {
            $("#dataTree").append(li_head);
            $("#dataTree").append('<li ><div style="text-align: center;line-height: 30px;" >无符合条件数据</div></li>')
        }
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
        editStr += '<div class="diy">' + (treeNode.sm_typeid_nameref == null ? '&nbsp;' : treeNode.sm_typeid_nameref) + '</div>';
        // var corpCat = '<div title="' + 1 + '">' + treeNode. + '</div>';
        editStr += '<div class="diy">' + (treeNode.sm_seq == null ? '&nbsp;' : treeNode.sm_seq) + '</div>';
        editStr += '<div class="diy">' + (treeNode.sm_iconcls == null ? '&nbsp;' : treeNode.sm_iconcls) + '</div>';
        editStr += '<div class="diy">' + (treeNode.sm_status_nameref == null ? '&nbsp;' : treeNode.sm_status_nameref) + '</div>';
        editStr += '<div class="diy">' + (treeNode.sm_url == null ? '&nbsp;' : treeNode.sm_url) + '</div>';
        editStr += '<div class="diy" style="width:30%">' + formatHandle(treeNode) + '</div>';
        editStr = $compile(editStr)($scope);//使用angular重新编译 使ngClick生效
        aObj.append(editStr);
    }
    
    /**
	 * 保存新增和编辑
	 */
	$scope.createAndSave = function(){
		if( $scope.vo.sm_level == undefined ||  $scope.vo.sm_level == ''){
			 $scope.vo.sm_level = '0';
		}
		var success = function(result){
			$scope.closeDialog();
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.queryAllMenuTree();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var msg = "";
		if($scope.vo.sm_id){
			msg = "您确定修改本条记录吗？";
		}else{
			msg = "您确定添加本条记录吗？";
		}
		var url = "/admin/sys/sysMenuControl/update.action";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, $scope.vo, success, error);
		}, function() {
		});	
	}
    
    
    /**
     * 根据权限展示功能按钮
     * @param treeNode
     * @returns {string}
     */
    function formatHandle(treeNode) {
        var htmlStr = '';
        htmlStr += '<div class="icon_div"><a class="common_btns common_detail" title="查看"  ng-click="showViewDialog(\'' + treeNode.sm_id + '\')"></a></div>';
        htmlStr += '<div class="icon_div"><a class="common_btns common_edit" title="修改" ng-click="toEdit(\'' + treeNode.sm_id + '\')"></a></div>';
        if(treeNode.level < 1){
        	htmlStr += '<div class="icon_div"><a class="common_btns common_add" title="添加子菜单" ng-click="addMenu(\'' + treeNode.sm_id + '\',\''+treeNode.name + '\',\''+treeNode.level +'\')"></a></div>';
        }
        if(treeNode.check_Child_State == -1){
        	 htmlStr += '<div class="icon_div"><a class="common_btns common_delete" title="删除" ng-click="toDelete(\'' + treeNode.id + '\')"></a></div>';	
        }
        return htmlStr;
    }
    
    /**
	 * 显示查看信息框
	 */
	$scope.showViewDialog = function(id){
		$scope.menuInfoPop = true;
		$scope.dialogTitle = "查看详情";
		$scope.getDetail(id);
	}
	
	/**
	 * 查看菜单详情
	 */
	$scope.getDetail = function(id){
		var success = function(result){
			$scope.vo = result.data;
			for(var x in $scope.allMenuList){
				if($scope.allMenuList[x].sm_id == result.data.sm_pid){
					$scope.vo.sm_pid_nameref = $scope.allMenuList[x].name;
				}
			}
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		messageFactory.showLoading();
		var url = '/admin/sys/sysMenuControl/getDetail.action';
		http.post(url,{sm_id:id},success,error);
	}
	
	/**
	 * 关闭查看信息框
	 */
	$scope.closeViewDialog = function(){
		$scope.vo = {};
		$scope.menuInfoPop = false;
	}
	
	/**
	 * 编辑菜单
	 */
	$scope.toEdit = function(id){
		if(id == undefined || id == ''){
			$scope.dialogTitle = "添加菜单";
		}else{
			$scope.dialogTitle = "编辑菜单";
			$scope.getDetail(id);
		}
		$scope.showDialog();
	}
	
	/**
	 * 显示添加和编辑弹框
	 */
	$scope.vo = {};
	$scope.showDialog = function(){
		$scope.popAdd = true;
		$scope.vo.sm_status = 1;
		//$scope.vo.sm_systemid_nameref = '批发商平台';
		$scope.vo.sm_systemid = '1006';	
		$scope.vo.sm_typeid_nameref = '菜单';
		$scope.vo.sm_typeid = '1';
	}
	
	/**
	 * 关闭添加和编辑弹框
	 */
	$scope.closeDialog = function(){
		$scope.vo = {};
		$(".w5c-error").remove();
		$scope.popAdd = false;
	}
	
	/**
	 * 添加子菜单
	 */
	$scope.addMenu = function(id,name,level){
		 $scope.vo.sm_pid_nameref = name;
         $scope.vo.sm_pid = id;
         if(level == 0){
        	 $scope.vo.sm_level = '1';
         }else if(level == 1){
        	 $scope.vo.sm_level = '2';
         }else if(level == 2){
        	 $scope.vo.sm_level = '3';
         }
		$scope.dialogTitle = "添加菜单";
		$scope.showDialog();
	}
	
	/**
	 * 删除菜单
	 */
	$scope.toDelete = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.queryAllMenuTree();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'sm_id':id}
		var url = "/admin/sys/sysMenuControl/remove.action";
		var	msg = '您确定删除本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {
		});
	}
	
	//toggle全部节点
    //是否展开全部节点
    $scope.open = true;
	$scope.toggleAll = function() {
        $scope.open = !$scope.open;
        expandAll(!$scope.open);
    }
    /**
     * 全部展开,或折叠
     * @param type
     * @returns null
     */
    function expandAll(type) {
        var zTree = $.fn.zTree.getZTreeObj("dataTree");
        zTree.expandAll(type);
    }
    
    $scope.queryMenuTree();
})






















