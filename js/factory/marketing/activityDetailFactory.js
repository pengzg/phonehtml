tempApp.factory('activityDetailFactory', function($state,messageFactory,EzConfirm,http,$stateParams) {
	var factory = {};
	var treeScope;
	
	factory.getGoods = function($scope){
    	var success = function(result){
    		$scope.goodsList = result.data.rows;
    		console.log($scope.goodsList);
			$scope.pager1.total=result.data.total;
			$scope.pager1.pageTotal = Math.ceil($scope.pager1.total/$scope.pager1.rows);
    	}
    	var error = function(result){
    		
    	}
    	
    	var url = "/admin/product/productSkuControl/dataGridSku.action";
    	http.post(url,$.extend({}, $scope.searchParam , $scope.pager1),success,error);
	}

	factory.getCouponList = function($scope){
    	var success = function(result){
    		$scope.couponList = result.data.rows;
    		
			$scope.couponPager.total=result.data.total;
			$scope.couponPager.pageTotal = Math.ceil($scope.couponPager.total/$scope.couponPager.rows);
    	}
    	var error = function(result){
    		
    	}
    	var url = "/admin/coupon/couponBaseControl/dataGrid.action";
    	http.post(url,$.extend({"cb_coupon_type":3,"cb_dr":1,"cb_state_str":"1,2"}, $scope.searchParam , $scope.couponPager),success,error);
	}
	
	factory.prevPage = function($scope,pager,fun){
		if(pager.page==1){
			return;
		}
		pager.page --;
		fun();
	}
	
	factory.nextPage = function($scope,pager,fun){
		if(pager.page >= pager.pageTotal){
			return;
		}
		pager.page ++;
		fun();
	}
	
	
	 /**
	 * 显示图片上传
	 */
	factory.upImage = function($scope,$event){
		$scope.ue_myeditor.addListener("beforeInsertImage", function (t, arg) {
			var imgs="";
			for(var i=0;i<arg.length;i++){
				imgs += arg[i].src;
				if(i<arg.length-1){
					imgs +=",";
				}
			}
			factory.uploadImgCallBack($scope,imgs);
		});
		var myImage = $scope.ue_myeditor.getDialog("insertimage");
		myImage.open();
	}
	
	
	/**
	 * 图片上传回调
	 */
	factory.uploadImgCallBack = function($scope,imgs){
		var imgsArr = imgs.split(",");
		$scope.vo.pa_cover = imgsArr[0].split("static/upload/image")[1];
		$scope.vo.pa_cover_show = imgsArr[0];
	}
	

	
	/**
	 * 查询树
	 */
	factory.getBaseArea = function($scope,setting){
		treeScope = $scope;
		
		var success = function(result){
			$.fn.zTree.init($("#treeDemo"), setting, result.data);
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
		}
		var url = '/admin/base/baseAreaControl/queryBaseAreaTree.action';
		http.post(url,null,success,error);
	}
	
	factory.showDroplist = function($scope,event,fun,type){	
		if(type == 1){
			if( $("#start_time").val()==""){
				messageFactory.showMessage('error','请先选择活动时间');
				return;
			}
			if( $("#end_time").val()==""){
				messageFactory.showMessage('error','请先选择活动时间');
				return;
			}
		}
		$scope.pager1.searchKey = "";
		$scope.searchParam.from = type;
		$('.droplistWrap2').hide();
		$(event.target).parent().find('.droplistWrap2').toggle();
		fun();

    };
	
	
    factory.getDetail = function($scope,pa_id,setting,type){
    	var success = function(result){
			$scope.vo = result.data;
			//type 1 详情 2 复制 3查看
			if(type==2){
				$scope.vo.pa_id = '';
				$scope.vo.pa_publish_stats = 2;
				$scope.vo.pa_activity_start = '';
				$scope.vo.pa_activity_end='';
				$scope.vo.pa_add_time='';
				$scope.vo.pa_update_time='';
				$scope.vo.pa_operaterid='';
				if($scope.vo.activityGoodsList){
					for(var goods in $scope.vo.activityGoodsList){
						$scope.vo.activityGoodsList[goods].pag_promotion_id = '';
						$scope.vo.activityGoodsList[goods].pag_sale_num = 0;
						$scope.vo.activityGoodsList[goods].pag_add_time ='';
						$scope.vo.activityGoodsList[goods].pag_update_time ='';
					}
				}
				if($scope.vo.promotionGiftList){
					for(var gift in $scope.vo.promotionGiftList){
						$scope.vo.promotionGiftList[gift].pg_promotionid = '';
						$scope.vo.promotionGiftList[gift].pg_sale_num = 0;
					}
				}
			}
			$scope.publish_stat = $scope.vo.pa_publish_stats;
			
			$scope.dataList = $scope.vo.activityGoodsList;
			
			$scope.dataList2 = $scope.vo.promotionGiftList;
			if ($scope.dataList2.length<1 &&(type==2||type==1)) {
				$scope.dataList2.push({});
			}
			$scope.areaList = $scope.vo.treeList;
			$("#start_time").val($scope.vo.pa_activity_start);
			$("#end_time").val($scope.vo.pa_activity_end);
			if($stateParams.type==3){
				setting.check.enable = false;//不显示CheckBox
				var treeObj = $.fn.zTree.init($("#treeDemo"), setting, $scope.vo.treeList);
				treeObj.expandAll(true);
				factory.hideUnChecked(treeObj);
			}else{
				$.fn.zTree.init($("#treeDemo"), setting, $scope.vo.treeList);
			}
			var v =[];
			if($scope.areaList){
				for(var i=0;i<$scope.areaList.length;i++){
		         	 v.push($scope.areaList[i].id);
		         }
			}
	         $scope.checkedAreas = v.join(",");
			
		}
		var error = function(result){
			messageFactory.closeLoading();
			messageFactory.showMessage('error',result.desc);
			
		}
		var data = {"pa_id":pa_id};
		var url = '/admin/base/promotionActivityControl/getDetail.action';
		http.post(url,data,success,error);
	}
    
    
    /**
	 *隐藏未选中节点
	 * @param treeObj
	 * @returns
	 */
    factory.hideUnChecked=function(treeObj){
		var nodes = treeObj.getNodesByFilter(function(node){
			return node.checked == false;
		});
		treeObj.hideNodes(nodes);
	}
    
	
	/**
	 * 加减数目
	 */
    factory.changeNum = function($scope,x,name,opt,type) {
		if (type =="max") {
			if (opt == "minus") {
				x[name] = parseInt(x[name]) - 1;
			} else {
				x[name] = parseInt(x[name]) + 1;
			}
		} else if (type == "min"){
			if (opt == "minus") {
				x[name] = parseInt(x[name]) - 1;
			} else {
				x[name] = parseInt(x[name]) + 1;
			}
		}
	}
    
    
	
	return factory;
});