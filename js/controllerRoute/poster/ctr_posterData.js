tempApp.controller('ctr_posterData', ['$scope', '$state', 'EzConfirm'
    , function ($scope, $state, EzConfirm) {

        $scope.pager = { page: 1, rows: '10', sort: 'mr_ts', order: 'desc', pageList: ['10', '20', '30'] };
    }])