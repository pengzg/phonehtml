tempApp.controller('ctr_dataAnalysis', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

 
    $scope.myChart1 = echarts.init(document.getElementById("echarts-box-1"));
    $scope.option1 = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['昨天','今天']
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
                name:'昨天',
                type:'line',
                // stack: '总量',
                data:[120, 132, 101, 134, 90]
            },
            {
                name:'今天',
                type:'line',
                //stack: '总量',
                data:[220, 182, 191, 234, 290,]
            }
        ]
    };
    $scope.myChart1.setOption($scope.option1);

    
    $scope.myChart = echarts.init(document.getElementById("chart-box-lines"));
    $scope.option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['支付金额','支付订单数','支付客户数','客单价','新增客户数']
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
                data : ['07-14','07-17','07-20','07-23','07-26','07-29','08-01','08-04','08-07','08-10', '08-12']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'支付金额',
                type:'line',
                //stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210, 134, 90, 230, 210]
            },
            {
                name:'支付订单数',
                type:'line',
                //stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310, 234, 290, 330, 310]
            },
            {
                name:'支付客户数',
                type:'line',
               // stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410, 154, 190, 330, 410]
            },
            {
                name:'客单价',
                type:'line',
               // stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320, 334, 390, 330, 320]
            },
            {
                name:'新增客户数',
                type:'line',
                // stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320, 934, 1290, 1330, 1320]
            }
        ]
    };
    $scope.myChart.setOption($scope.option);

})