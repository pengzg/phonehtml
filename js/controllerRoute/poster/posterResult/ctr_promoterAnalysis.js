tempApp.controller('ctr_promoterAnalysis', ['$scope', '$state', 'EzConfirm'
    , function ($scope, $state, EzConfirm) {

        $scope.pager = { page: 1, rows: '10', sort: 'mr_ts', order: 'desc', pageList: ['10', '20', '30'] };

        $scope.datePick = function(start,end){
            console.log(start,end);
        }

        $scope.config = {
            startDate: '2018-01-01',
            endDate: '2018-01-02'
        }
      
        $scope.selectList = [{
            id: 1,
            name: '奖励类目'
        },{
            id: 2,
            name: '扫码关注奖励'
        },{
            id: 3,
            name: '直接推荐奖励'
        }]

        $scope.selectVal =  1;
    }])