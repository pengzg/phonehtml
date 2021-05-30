tempApp.controller('ctr_cashDetail', ['$scope', '$state', 'EzConfirm'
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
            name: '派发状态'
        },{
            id: 2,
            name: '未派发'
        },{
            id: 3,
            name: '派发中'
        },{
            id: 4,
            name: '派发成功'
        },{
            id: 5,
            name: '派发失败'
        }]

        $scope.selectVal =  1;
    }])