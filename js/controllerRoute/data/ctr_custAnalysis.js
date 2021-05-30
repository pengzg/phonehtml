tempApp.controller('ctr_custAnalysis', function($scope, $rootScope, http, messageFactory, $state, $stateParams, EzConfirm,dateUtil,$rootScope) {

    // 初始化数据
    $scope.tabSelect = '1';

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
    $scope.myChart2.setOption($scope.option2);

    $scope.myChart3 = echarts.init(document.getElementById("chart-box-lines3"));
    $scope.option3 = {
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
    $scope.myChart3.setOption($scope.option3);


    $scope.myChart4 = echarts.init(document.getElementById("chart-box-pie"));
    $scope.option4 = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true, 
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'center',
                            max: 1548
                        }
                    }
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : ['50%', '70%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : true
                        },
                        labelLine : {
                            show : true
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ]
            }
        ]
    };
    $scope.myChart4.setOption($scope.option4);

    $scope.myChart5 = echarts.init(document.getElementById("chart-box-lines5"));
    $scope.myChart5.setOption($scope.option);

})