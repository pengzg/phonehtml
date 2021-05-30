tempApp.controller('ctr_setting_baseRole', function($scope, http, messageFactory,EzConfirm,$rootScope) {
	 $scope.pager = {page:1,rows:'20',sort:'sr_order',order:'asc',pageList:['10','20','30']};
	 $scope.pager1 = {page:1,rows:'20',sort:'su_id',order:'desc',pageList:['10','20','30']};
	 $scope.searchParam = {};
	 $scope.searchParam1 = {};
	 
	 /**
	  * 输入验证
	  */
	 $scope.role = {
				rules : {
					sr_code : {
						required:'角色编码不能为空'
					},
					sr_name : {
						required:'角色名称不能为空'
					}
				}
		};
	
    // 菜单表格设置
    var setting = {
        view: {
            showLine: false,
            showIcon: true
        },
        check: {
			enable: true,
			chkStyle: "checkbox"
		},
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    var setting2 = {
        view: {
            showLine: false,
            showIcon: true
        },
        data: {
            simpleData: {
                enable: true
            }
        }
    };
    
   
	$scope.role = new role();
	$scope.roleInfoPop = false;
	$scope.roleAddPop = false;
	$scope.roleAuthPop = false;
	$scope.roleLeftPop = false;
	$scope.roleUserAdd = false;

	function role(){
		this.sn = '';
		this.index = 0;
		this.name = '';
		this.description = '';
		this.status = false;
	}

	$scope.role.save = function(){
		
	}
	/**
	 * 查询角色列表
	 */
	var querySysRole = function(){
		var sr_type_str = '';
		messageFactory.showLoading();
		var success = function(result){
			$scope.roleList = result.data.rows;
			$scope.pager.total=result.data.total;
			$scope.pager.pageTotal = Math.ceil($scope.pager.total/$scope.pager.rows);
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url =  '/admin/sys/sysRoleControl/dataGrid.action';
		http.post(url,$.extend({'sr_isgroup':'Y','sr_type_str':sr_type_str},$scope.pager,$scope.searchParam),success,error);
	}
	
	/**
	 * 监听
	 */
	$scope.$watch(function(){
		var newValue = $scope.pager.page+' '+$scope.pager.rows+' '+$scope.pager.sort+' '+$scope.pager.order+' ';
		for(var x in $scope.searchParam){
			newValue = newValue + x+'='+$scope.searchParam[x]+'&';
		}
		return newValue;
	},querySysRole);
	
	/**
	 * 显示新增弹框
	 */
	$scope.vo = {};
	$scope.showAddDialog = function(){
		$scope.roleAddPop = true;
		$scope.vo.sr_status = 1;
	}
	
	/**
	 * 关闭新增弹框
	 */
	$scope.closeAddDialog = function(){
		$scope.roleAddPop = false;
		$scope.vo = {};
	}
	
	/**
	 * 显示查看弹框
	 */
	$scope.showCheckDialog = function(id){
		$scope.dialogTitle = "查看详情";
		$scope.roleInfoPop = true;
		$scope.getDetail(id);
	}
	
	/**
	 * 关闭查看弹框
	 */
	$scope.closeCheckDialog = function(){
		$scope.roleInfoPop = false;
	}
	
	/**
	 * 新增和编辑角色
	 */
	$scope.toEdit = function(id){
		if(id == undefined || id == ''){
			$scope.vo.sr_type=1;
			$scope.vo.sr_roletype=1;
			$scope.dialogTitle = "添加角色";
		}else{
			$scope.dialogTitle = "编辑角色";
			$scope.getDetail(id);
		}
		$scope.showAddDialog();
	}
	
	/**
	 * 新增和编辑保存
	 */
	$scope.createRole = function(){
		var success = function(result){
			$scope.closeAddDialog();
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			querySysRole();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		$scope.vo.sr_isgroup = 'Y';//集团新增
		var msg = "";
		if($scope.vo.sr_id){
			msg = "您确定修改本条记录吗？";
		}else{
			msg = "您确定添加本条记录吗？";
		}
		var url = "/admin/sys/sysRoleControl/update.action";
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, $scope.vo, success, error);
		}, function() {
		});	
	}
	
	/**
	 * 查看角色详情
	 */
	$scope.getDetail = function(id){
		var success = function(result){
			$scope.vo = result.data;
			messageFactory.closeLoading();
		}
		var error = function(result){
			messageFactory.showMessage('error',result.desc);
			messageFactory.closeLoading();
		}
		messageFactory.showLoading();
		var url = '/admin/sys/sysRoleControl/getDetail.action';
		http.post(url,{sr_id:id},success,error);
	}
	
	/**
	 * 删除角色
	 */
	$scope.toDelete = function(id){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			querySysRole();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		
		var data ={'sr_id':id}
		var url = "/admin/sys/sysRoleControl/remove.action";
		var	msg = '您确定删除本条记录吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {
		});
	}
	
	/**
	 * 排序方法
	 */
	$scope.sortFun = function(name,flag){
		if(!flag){
			return 'colorCenter noSortCss';
		}
		if($scope.pager.sort==name&&$scope.pager.order=='asc'){
			return 'SortAscCss'
		}
		if($scope.pager.sort==name&&$scope.pager.order=='desc'){
			return 'SortDescCss'
		}
	}
	
	/**
	 * 点击切换排序
	 */
	$scope.clickSortFun = function(name){
		if($scope.pager.sort!=name){
			$scope.pager.sort = name;
			$scope.pager.order = 'asc';
		}
		if($scope.pager.sort==name){
			if($scope.pager.order=='asc'){
				$scope.pager.order = 'desc';
			}else{
				$scope.pager.order = 'asc';
			}
		}
	}
	
	/**
	 * 搜索
	 */
	$scope.doSearch = function(){
		//$scope.searchParam.searchKey = $scope.searchKey;
		if($scope.pager.page != 1){
			$scope.pager.page = 1;
		}else{
			querySysRole();
		}
	}
	
	/**
	 * 清空查询条件
	 */
	$scope.clearSearch = function(){
		$scope.searchParam.searchKey = '';
		$scope.searchKey = '';
	}
	
	/**
	 * 显示授权弹框
	 */
	$scope.showAuthDialog = function(id){
		$scope.sr_id = id;//授权的角色id
		$scope.roleAuthPop = true;
		$scope.dialogTitle = "授权";
		$scope.queryAllMenuTree(id,1);
	}
	
	/**
	 * 关闭授权弹框
	 */
	$scope.closeAuthDialog = function(){
		$scope.roleAuthPop = false;
	}
	
	/**
	 * 查询所有菜单树
	 */
	$scope.queryAllMenuTree = function(id,status){
		messageFactory.showLoading();
		var success = function(result){
			$scope.allMenuList = result.data;
			messageFactory.closeLoading();
			for(var i in $scope.allMenuList){
				if($scope.allMenuList[i].sm_ischeck){
					$scope.allMenuList[i].checked = true;
				}else{
					$scope.allMenuList[i].checked = false;
				}
			}
			$showTreeData($scope.allMenuList);
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var data = {'roleId':id,'status':status,'sm_systemid':'1006'};
		var url =  '/admin/sys/sysMenuControl/queryAllMenueTree.action';
		http.post(url,data,success,error);
	}
	
	//授权
	$scope.authIdx = function(){
		var zTree = $.fn.zTree.getZTreeObj("dataTreePop");
		var checkedNodeList = zTree.getCheckedNodes(true);
		
		var menuIds = [];//菜单ids
		for(var x in checkedNodeList){
			menuIds.push(checkedNodeList[x].id);
		}
		var str = menuIds.join(",");
		$scope.enterAuth($scope.sr_id,str);
	}
	
	/**
	 * 绑定授权
	 */
	$scope.enterAuth = function(id,str){
		var success = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('success',result.desc);
			$scope.closeAuthDialog();
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var data ={'roleId':id,'menuStr':str}
		var url = "/admin/sys/sysRoleControl/insertAuth.action";
		var	msg = '您确定授权吗？';
		EzConfirm.create({
			heading : '提示',
			text : msg
		}).then(function() {			
			http.post(url, data, success, error);
		}, function() {
		});
	}
	
	/**
	 * 刷新
	 */
	$scope.refresh = function(){
		window.location.reload();
	}
	
	//双击展开
	$scope.showLeftPop = function(id){
		$scope.roleLeftPop = true;
		$scope.queryRoleUserList(id);
		function bindClickOnBody(){
			$('body').one('click',function(e){
				var target = $(e.target); //e.target获取触发事件的元素  
		        if (target.closest("#roleLeftPop,.dialog,.modal").length == 0) {
		            //进入if则表明点击的不是#treeInput元素中的一个  
		            $scope.$apply(function(){
		            	$scope.roleLeftPop = false
		            })
		        }else{
		        	setTimeout(function(){
		        		bindClickOnBody();
		        	});
		        }

		        e.stopPropagation();
			});
		}
		bindClickOnBody();
	}
	
/**
 *显示菜单树 
 * @param data
 */
	$showTreeData = function(data) {
		$.fn.zTree.init($("#dataTreePop"), setting, data);
		var zTree = $.fn.zTree.getZTreeObj("dataTreePop");
        zTree.expandAll(true);
	}
	
	/**
	 * 已选角色统计
	 */
	$scope.selectedRole = function(){
		$scope.arrRole=[];
		$("input[name='role']:checked").not(":disabled").each(function(){
			var sr_id  = $(this).attr("sr_id");
			var str = {'sr_id':sr_id};
			$scope.arrRole.push(str);
		});
	}
	
	//选中全部客户
	$scope.selectAll = function(){
		if($("#selectAll").is(':checked')){
			$(".checkbox").prop("checked",true);
		}else{
			$(".checkbox").prop("checked",false);
		}
		$scope.selectedRole();
	}
	
	/**
	 * 批量删除
	 */
	$scope.deleteAll = function(){
		$scope.selectedRole();
		if($scope.arrRole == null || $scope.arrRole == ""){
			messageFactory.showMessage('error',"请选择要删除的数据！");
		}else{
			var success = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('success',result.desc);
				querySysRole();
			}
			var error = function(result){
				messageFactory.closeLoading();
				messageFactory.showMessage('error',result.desc);
			}
			var arrRoleIds = [];
			for(var x in $scope.arrRole){
				arrRoleIds.push($scope.arrRole[x].sr_id);
			}
			var roleIdStr = arrRoleIds.join(",");
			var data ={'roleIdStr':roleIdStr}
			var url = "/admin/sys/sysRoleControl/removeMulti.action";
			if(arrRoleIds.length == 1){
				var	msg = '您确定删除这个角色吗？';
			}else{
				var	msg = '您确定删除这些角色吗？';
			}
			
			EzConfirm.create({
				heading : '提示',
				text : msg
			}).then(function() {			
				http.post(url, data, success, error);
			}, function() {
			});
		}
	}
	
	
	
})
