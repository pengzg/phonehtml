tempApp.controller('ctr_wordenvelope', function($rootScope,$scope,$timeout) {
	window.sessionStorage.gameState = 'wordenvelope';
	
	$rootScope.comLoading.show();
	$scope.word = '';
	$scope.isAward = false;
	$scope.hasDraw = false;
	$scope.bannerHeight = (document.body.clientWidth/1.91)+'px';
 	$scope.draw = function(word){
 		if(!$scope.word){
 			$rootScope.popSuccess.show('请输入口令')
 			return;
 		}
 		if($scope.word=='123'){
 			$scope.isAward = true;
 			$scope.hasDraw = true;
 		}else{
	 		$rootScope.popSuccess.show('口令错误，请跟收银处核对');
	 		$scope.word = '';
 		}
 	}
 	
 	$scope.showTabPop = function(){
		$rootScope.tabPop3.show(false,function(pop){
			$timeout(function(){
				pop.noteData = [
					{"title":"活动奖品","content":["一等奖：价值100元礼品券","二等奖：价值50元礼品券","三等奖：价值10元礼品券"]},
					{"title":"活动时间","content":["2017年08月10日~2017年08月17日"]},
					{"title":"活动规则","content":["1、进入游戏，长按复制红包口令 ","2、点击“红包入口”进入公众号 ；","3、将口令黏贴发送至公众号，公众号将会发送红包链接，点击领取；","4、一个口令对应一个红包，不能重复使用；","5、活动期间奖品数量有限，先到先得，发完即止；","6 、活动期间用户全程免费参与，红包将直接发送到零钱"]}
				]
			},3000);
		},function(pop){
			$timeout(function(){
				pop.awardData = [{"level":"四等奖","content":"黑黑乳2盒","status":"未领取"}];
				for(var i=0;i<10;i++){
					pop.awardData.push({"level":"四等奖"+i,"content":"黑黑乳2盒","status":"未领取"})
				}
			},2000);
		});
 	}
})

