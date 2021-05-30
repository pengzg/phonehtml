tempApp.controller('ctr_tradeAnalysis', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {


    
    $scope.myChart = echarts.init(document.getElementById("chart-box-lines"));
    $scope.option = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['支付金额','支付订单数','支付客户数','客单价','成功退款金额']
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
                //stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410, 154, 190, 330, 410]
            },
            {
                name:'客单价',
                type:'line',
                //stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320, 334, 390, 330, 320]
            },
            {
                name:'成功退款金额',
                type:'line',
                //stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320, 934, 1290, 1330, 1320]
            }
        ]
    };
    $scope.myChart.setOption($scope.option);

    $scope.myChart2 = echarts.init(document.getElementById("chart-box-lines2"));
    $scope.option2 = {
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['成功退款金额','退款笔数','退款率','申请退款平均时长']
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
                name:'成功退款金额',
                type:'line',
                //stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210, 134, 90, 230, 210]
            },
            {
                name:'退款笔数',
                type:'line',
                //stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310, 234, 290, 330, 310]
            },
            {
                name:'退款率',
                type:'line',
                //stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410, 154, 190, 330, 410]
            },
            {
                name:'申请退款平均时长',
                type:'line',
                //stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320, 334, 390, 330, 320]
            }
        ]
    };
    $scope.myChart2.setOption($scope.option2);
})