tempApp.controller('ctr_propagationAnalysis', ['$scope', '$state', 'EzConfirm'
    , function ($scope, $state, EzConfirm) {

        $scope.pager = { page: 1, rows: '10', sort: 'mr_ts', order: 'desc', pageList: ['10', '20', '30'] };

    /**
	 * 图标趋势
	 */
        var dom = document.getElementById("spread_charts");
        var myChart = echarts.init(dom);
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                    label: {
                        show: true
                    }
                }
            },
            legend: {
                data: ['海报生成次数', '扫码次数','新增粉丝数']
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: { show: false, readOnly: false },
                    magicType: { show: true, type: ['line', 'bar'] },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            dataZoom: [
                {
                    show: true,
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                }
            ],
            series: [
                {
                    name: '海报生成次数',
                    type: 'line',
                    data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                    markPoint: {
                        data: [
                            { type: 'max', name: '最大值' },
                            { type: 'min', name: '最小值' }
                        ]
                    }
                },
                {
                    name: '扫码次数',
                    type: 'line',
                    data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                    markPoint: {
                        data: [
                            { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                            { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                        ]
                    }
                },
                {
                    name: '新增粉丝数',
                    type: 'line',
                    data: [5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,10],
                    markPoint: {
                        data: [
                            { name: '年最高', value: 182.2, xAxis: 6, yAxis: 183 },
                            { name: '年最低', value: 2.3, xAxis: 10, yAxis: 3 }
                        ]
                    }
                }
            ]
        };
        myChart.setOption(option); 
    }])