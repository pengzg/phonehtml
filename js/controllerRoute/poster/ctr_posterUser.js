tempApp.controller('ctr_posterUser', ['$scope', '$state', 'EzConfirm','$stateParams'
    , function ($scope, $state, EzConfirm,$stateParams) {

        $scope.pager = { page: 1, rows: '10', sort: 'mr_ts', order: 'desc', pageList: ['10', '20', '30'] };
        $scope.tabIdx = $stateParams.tab;
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

        /**
         * 图标趋势
         */
        var dom = document.getElementById("activity_charts");
        var myChart = echarts.init(dom);

        var nodes = [
            {"name":"℡「境界の彼方゜」","value":1,"category":0,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/oibGhDHNqibuvsI2vCchERfQpL8CajVyNx0k1ib7SoGTTkib5SQj76bHVZ3C40wxARMPGBMRcJBGOniczr40axpRwttZoeuSTibT39/64"},
            {"name":"Freestyle_hong","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/oibGhDHNqibuuicX3Sh9ibmxuTib8mcXT1OMuMLUl1AliaickJ06O5G9pb9EiaXicUfDodpBAuDPtQWGSAtyeszYUpBVgMgc9u1ibQNptF/64"},
            {"name":"snailPenG","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/h1dibp9WKYiaP5f58PXoLIB0YW0wI4tJCfVqKSiciaXVPy3QZjn8aYRmRbNUIJ6jmAia4ldKUULhN7MeSlx22yEdUuscjib6HG3ELP/64"},
            {"name":"sunxinqiang","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/PiajxSqBRaEKjA1tKO5zVStdOxyR6zU2ZGhPMfqPqjaMIjqFqE7msEX0np4S7fCz6iaTQppFvvrRXo01pOxP8HuA/64"},
            {"name":"雨田","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/h1dibp9WKYiaP0cmxDd65icOPvnHMudKIUHZb5WyAiaFdoZGWoyemhkjrsM1jraHhR3SQljEkrNdvmzyJGa4IJicVDA/64"},
            {"name":"冀培","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/Q3auHgzwzM7bp8YnyQBBcsL8UNmX7z1Ln59l0QtYhuxFxcSHJUq4Qn7SzVdCo9pibHias2tIpMF2fHyibNhr0ovjA/64"},
            {"name":"海影","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/Qavgu8Gz5KdZLb1z1ms7qT18CxwbQHcLeNiczKGl09ZPDYh4MuCjsrEW7hYcDZFdiayWlicHhvczYWBOvibGHOvDAfe7OYtzHzoY/64"},
            {"name":"社区盒子","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/oibGhDHNqibuvsI2vCchERfVWLDPhDycekHL87v2kWVKLXHy4BUgne6sxGbN8689QYDia4xLZat6Mvaib2FwRVNC4j66WhQ8Df5n/64"},
        ];
        for(var i=0;i<90;i++){
            nodes.push({"name":"社区盒子"+i,"category":1,"draggable":true,"symbol":nodes[Math.floor(Math.random()*7+1)].symbol})
        }
        //source-->target
        var links = [];
        for(var i=1;i<100;i++){
            links.push({"source":i,"target":0})
        }
        var option = {
            color: ['#fff'],
            title: {
                text: '关系图谱',
                subtext: 'Default layout',
                top: 'bottom',
                left: 'right'
            },
            tooltip: {},
            animation: false,
            series : [
                {
                    name: '昵称',
                    type: 'graph',
                    hoverAnimation: true,
                    layout: 'force',
                    data: nodes,
                    links: links,
                    roam: true,
                    label: {
                        normal: {
                            position: 'right'
                        }
                    },
                    edgeSymbol: ['arrow', 'none']
                }
            ]
        };
        myChart.setOption(option);

        var chartCanvas = $('#activity_charts').find('canvas')[0];
        $(chartCanvas).css('background','url(img/poster/bg3.jpg) no-repeat');
        $(chartCanvas).css('background-size','100% 100%');
    }])