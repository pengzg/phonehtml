tempApp.controller('ctr_goodsList', function($scope, http, messageFactory, $state, $stateParams, EzConfirm) {
  	$scope.pager = {page:1,rows:'10',sort:'pm_id',order:'desc',pageList:['10','20','30']};
})