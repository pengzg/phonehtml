tempApp.controller('ctr_clearDetail', ['$scope', '$state', 'EzConfirm'
    , function ($scope, $state, EzConfirm) {

        $scope.pager = { page: 1, rows: '10', sort: 'mr_ts', order: 'desc', pageList: ['10', '20', '30'] };

        $scope.datePick = function(start,end){
            console.log(start,end);
        }

        $scope.config = {
            startDate: '2018-01-01',
            endDate: '2018-01-02'
        }
      
    }])