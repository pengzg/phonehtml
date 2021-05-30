tempApp.controller('ctr_squaredPreview', function($rootScope, $scope,http,$stateParams) {
	$rootScope.isBottomTab = false;
	var mm_id = $stateParams.mm_id;
	//console.log(123)
	//console.log(mm_id);
	$scope.active = -1;
	$scope.btnDisable = false;
	//九宫格的循环list 每次8个 
	$scope.giftList = [{'mp_name':"谢谢参与"},{'mp_name':"谢谢参与"},{'mp_name':"谢谢参与"}
	,{'mp_name':"谢谢参与"},{'mp_name':"谢谢参与"},{'mp_name':"谢谢参与"},{'mp_name':"未中奖"}
	,{'mp_name':"谢谢参与"}];
	
	var prize = {
		index: 5,
		isPrize: true,
		name: 'iphone X'
	};
	//rander函数里使用的setTimeout 会导致$scope失效
	function randerFun(idx){
		if(!$scope.$$phase){
			$scope.$apply(function(){
				$scope.active = idx;
			})
		}else{
			$scope.active = idx;
		}
	}

	function callback(){
		$scope.$apply(function(){
			$scope.btnDisable = false;
			if(prize.isPrize){
				$rootScope.compopPrize.show('恭喜获得'+prize.name);
			}else{
				$rootScope.compopFail.show('您还有一次抽奖机会','再抽一次')
			}
		});
	}

	$scope.start = function(){};

	$scope.showTabPop = function(isTwo){}
 	$scope.data1 = [
 					{title:'活动奖品',content:{text:['一等奖：价值100元礼品券','二等奖：价值50元礼品券','三等奖：价值10元礼品券'],id:'set_actaward_box',idx:2}},
 					{title:'活动时间',content:{text:['2017年08月10日~2017年08月17日'],id:'set_acttime_box',idx:0}},
 					{title:'活动规则',content:{text:['1、进入游戏，长按复制红包口令 ','2、点击“红包入口”进入公众号 ；','3、将口令黏贴发送至公众号，公众号将会发送红包链接，点击领取；','4、一个口令对应一个红包，不能重复使用；','5、活动期间奖品数量有限，先到先得，发完即止；','6 、活动期间用户全程免费参与，红包将直接发送到零钱'],id:'set_ruletext_box',idx:0}},
 				]
 	var data2 = [{level:'一等奖',content:'iphone8s plus 1部',status:'未领取'}];
 	$scope.word_back_img = '../../../img/mobile/squared/back.png';
 	$scope.$watch('showIdx',function(newVal){
		switch(newVal)
			{
			case 0:
			  	  $rootScope.tabPop2.hide();
			  	  $rootScope.compopFail.hide();
			  	  $rootScope.compopPrize.hide();
			  	  break;
			case 1:
				  $rootScope.tabPop2.show($scope.data1,data2,true);
				  break;
			case 2:
				  $rootScope.tabPop2.show($scope.data1,data2,true,true);
				  break;
			case 3:
				  $rootScope.tabPop2.hide();
				  $rootScope.compopFail.hide();
				  $rootScope.compopPrize.show('恭喜获得一等奖',true);
				  break;
		  case 4:
				  $rootScope.tabPop2.hide();
				  $rootScope.compopPrize.hide();
				  $rootScope.compopFail.show('您还有一次抽奖机会','再抽一次',true);
				  break;
			}
	});
 	
 	
 	$scope.getActivityDetail = function(id){
    	var success = function(result){
    		var time =result.data.mm_startime.substring(0,10) + " 至  " + result.data.mm_endtime.substring(0,10) ;
    		
    		var giftArr = new Array();
    		for(var i in result.data.giftList){
    			var item = result.data.giftList[i];
        		giftArr.push(item.mp_level+'：'+item.mp_name);
    		}
    		
    		$scope.newgiftList=[{},{},{},{},{},{},{},{}];
        	
        	for(var j in result.data.giftList){
        		
        		$scope.newgiftList[result.data.giftList[j].mp_sortnum-1]
        		 = result.data.giftList[j];
    		}
        	
    		for(var i in $scope.newgiftList){ 
    			if(!$scope.newgiftList[i].mp_name){
    				$scope.newgiftList[i].mp_name = "谢谢参与";
    			}
    		}
        	var ruleArr = result.data.mm_rule.split('\n');
        	var data1 = [
     					{title:'活动奖品',content:{text:giftArr,id:'set_actaward_box',idx:2}},
     					{title:'活动时间',content:{text:[time],id:'set_acttime_box',idx:0}},
     					{title:'活动规则',content:{text:ruleArr,id:'set_ruletext_box',idx:0}},
     				]
        	$scope.giftList = $scope.newgiftList;
    		
		}
		var error = function(result){
		}
    	var url = "/admin/activity/marketingMainControl/getDetail.action";
		http.post(url,{'mm_id':id},success,error);
    	
    }
 	
 	if(mm_id){
 		$scope.getActivityDetail(mm_id);
 	}
 	
 	//console.log($scope.giftList);
 	
 	
})

