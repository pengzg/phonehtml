tempApp.controller('ctr_activityList', function($rootScope, $scope, http, $state) {
	$rootScope.isBottomTab = true;
	$rootScope.comLoading.hide();
    $scope.items = new Array();
    $scope.items.push({id:'giftCard',image:'../../img/mobile/giftCard/pic1.png',name:'礼品卡',note:'迎中秋，庆国庆'});
    $scope.items.push({id:'wordenvelope',image:'../../img/mobile/activitys/wordenvelope.png',name:'口令红包',note:'输口令，领红包'});
    $scope.items.push({id:'wheel',image:'../../img/mobile/activitys/wheel.png',name:'幸运大转盘',note:'幸运转转转，红包领领领'});
    $scope.items.push({id:'squared',image:'../../img/mobile/activitys/squared.png',name:'幸运九宫格',note:'转转转，大奖领到手软'});
    $scope.items.push({id:'scratchCard',image:'../../img/mobile/activitys/scratchCard.png',name:'刮刮乐',note:'刮一刮，红包领不停'});
    $scope.items.push({id:'bargain',image:'../../img/mobile/activitys/bargain.png',name:'砍砍砍',note:'砍砍砍，价格砍到零'});
})