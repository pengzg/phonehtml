tempApp.controller('ctr_glAsset', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    $scope.myChart1 = echarts.init(document.getElementById("chart-box-lines1"));
    $scope.option1 = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['销售金额']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['0','6','12','18','23']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [          
            {
                name:'销售金额',
                type:'line',
                //stack: '总量',
                data:[220, 182, 191, 234, 290,]
            }
        ]
    };
    $scope.myChart1.setOption($scope.option1);
    $scope.myChart2 = echarts.init(document.getElementById("chart-box-lines2"));
    $scope.option2 = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['退款金额']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['0','6','12','18','23']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'退款金额',
                type:'line',
                // stack: '总量',
                data:[120, 132, 101, 134, 90]
            }
           
        ]
    };
    $scope.myChart2.setOption($scope.option2);

})