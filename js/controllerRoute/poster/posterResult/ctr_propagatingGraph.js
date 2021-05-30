tempApp.controller('ctr_propagatingGraph', ['$scope', '$state', 'EzConfirm'
    , function ($scope, $state, EzConfirm) {

        /**
         * 图标趋势
         */
        var dom = document.getElementById("activity_charts");
        var myChart = echarts.init(dom);

        var nodes = [
            {"name":"℡「境界の彼方゜」","category":0,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/oibGhDHNqibuvsI2vCchERfVWLDPhDycekHL87v2kWVKLXHy4BUgne6sxGbN8689QYDia4xLZat6Mvaib2FwRVNC4j66WhQ8Df5n/64"},
            {"name":"Freestyle_hong","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/oibGhDHNqibuuicX3Sh9ibmxuTib8mcXT1OMuMLUl1AliaickJ06O5G9pb9EiaXicUfDodpBAuDPtQWGSAtyeszYUpBVgMgc9u1ibQNptF/64"},
            {"name":"snailPenG","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/h1dibp9WKYiaP5f58PXoLIB0YW0wI4tJCfVqKSiciaXVPy3QZjn8aYRmRbNUIJ6jmAia4ldKUULhN7MeSlx22yEdUuscjib6HG3ELP/64"},
            {"name":"sunxinqiang","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/PiajxSqBRaEKjA1tKO5zVStdOxyR6zU2ZGhPMfqPqjaMIjqFqE7msEX0np4S7fCz6iaTQppFvvrRXo01pOxP8HuA/64"},
            {"name":"雨田","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/h1dibp9WKYiaP0cmxDd65icOPvnHMudKIUHZb5WyAiaFdoZGWoyemhkjrsM1jraHhR3SQljEkrNdvmzyJGa4IJicVDA/64"},
            {"name":"冀培","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/Q3auHgzwzM7bp8YnyQBBcsL8UNmX7z1Ln59l0QtYhuxFxcSHJUq4Qn7SzVdCo9pibHias2tIpMF2fHyibNhr0ovjA/64"},
            {"name":"海影","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/Qavgu8Gz5KdZLb1z1ms7qT18CxwbQHcLeNiczKGl09ZPDYh4MuCjsrEW7hYcDZFdiayWlicHhvczYWBOvibGHOvDAfe7OYtzHzoY/64"},
            {"name":"社区盒子","category":1,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/oibGhDHNqibuvsI2vCchERfQpL8CajVyNx0k1ib7SoGTTkib5SQj76bHVZ3C40wxARMPGBMRcJBGOniczr40axpRwttZoeuSTibT39/64"},
            {"name":"Freestyle_hong2","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/oibGhDHNqibuuicX3Sh9ibmxuTib8mcXT1OMuMLUl1AliaickJ06O5G9pb9EiaXicUfDodpBAuDPtQWGSAtyeszYUpBVgMgc9u1ibQNptF/64"},
            {"name":"snailPenG2","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/h1dibp9WKYiaP5f58PXoLIB0YW0wI4tJCfVqKSiciaXVPy3QZjn8aYRmRbNUIJ6jmAia4ldKUULhN7MeSlx22yEdUuscjib6HG3ELP/64"},
            {"name":"sunxinqiang2","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/PiajxSqBRaEKjA1tKO5zVStdOxyR6zU2ZGhPMfqPqjaMIjqFqE7msEX0np4S7fCz6iaTQppFvvrRXo01pOxP8HuA/64"},
            {"name":"雨田2","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/h1dibp9WKYiaP0cmxDd65icOPvnHMudKIUHZb5WyAiaFdoZGWoyemhkjrsM1jraHhR3SQljEkrNdvmzyJGa4IJicVDA/64"},
            {"name":"冀培22","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/Q3auHgzwzM7bp8YnyQBBcsL8UNmX7z1Ln59l0QtYhuxFxcSHJUq4Qn7SzVdCo9pibHias2tIpMF2fHyibNhr0ovjA/64"},
            {"name":"海影2","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/Qavgu8Gz5KdZLb1z1ms7qT18CxwbQHcLeNiczKGl09ZPDYh4MuCjsrEW7hYcDZFdiayWlicHhvczYWBOvibGHOvDAfe7OYtzHzoY/64"},
            {"name":"社区盒子2","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/oibGhDHNqibuvsI2vCchERfQpL8CajVyNx0k1ib7SoGTTkib5SQj76bHVZ3C40wxARMPGBMRcJBGOniczr40axpRwttZoeuSTibT39/64"},
            {"name":"Freestyle_hong3","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/oibGhDHNqibuuicX3Sh9ibmxuTib8mcXT1OMuMLUl1AliaickJ06O5G9pb9EiaXicUfDodpBAuDPtQWGSAtyeszYUpBVgMgc9u1ibQNptF/64"},
            {"name":"snailPenG3","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/h1dibp9WKYiaP5f58PXoLIB0YW0wI4tJCfVqKSiciaXVPy3QZjn8aYRmRbNUIJ6jmAia4ldKUULhN7MeSlx22yEdUuscjib6HG3ELP/64"},
            {"name":"sunxinqiang3","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/PiajxSqBRaEKjA1tKO5zVStdOxyR6zU2ZGhPMfqPqjaMIjqFqE7msEX0np4S7fCz6iaTQppFvvrRXo01pOxP8HuA/64"},
            {"name":"雨田3","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/h1dibp9WKYiaP0cmxDd65icOPvnHMudKIUHZb5WyAiaFdoZGWoyemhkjrsM1jraHhR3SQljEkrNdvmzyJGa4IJicVDA/64"},
            {"name":"冀培3","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/Q3auHgzwzM7bp8YnyQBBcsL8UNmX7z1Ln59l0QtYhuxFxcSHJUq4Qn7SzVdCo9pibHias2tIpMF2fHyibNhr0ovjA/64"},
            {"name":"海影3","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/Qavgu8Gz5KdZLb1z1ms7qT18CxwbQHcLeNiczKGl09ZPDYh4MuCjsrEW7hYcDZFdiayWlicHhvczYWBOvibGHOvDAfe7OYtzHzoY/64"},
            {"name":"社区盒子3","category":2,"draggable":true,"symbol":"image://http://wx.qlogo.cn/mmopen/oibGhDHNqibuvsI2vCchERfQpL8CajVyNx0k1ib7SoGTTkib5SQj76bHVZ3C40wxARMPGBMRcJBGOniczr40axpRwttZoeuSTibT39/64"},
        ];
        //source-->target
        var links = [
            {"source":1,"target":0},
            {"source":2,"target":0},
            {"source":3,"target":0},
            {"source":4,"target":0},
            {"source":5,"target":0},
            {"source":6,"target":0},
            {"source":7,"target":0},
            {"source":8,"target":0},
            {"source":9,"target":0},
            {"source":10,"target":1},
            {"source":11,"target":1},
            {"source":12,"target":1},
            {"source":13,"target":1},
            {"source":14,"target":1},
            {"source":15,"target":1},
            {"source":16,"target":1},
            {"source":17,"target":0},
            {"source":18,"target":0},
            {"source":19,"target":0},
            {"source":20,"target":0},
            {"source":21,"target":0},
        ];
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
                    edgeSymbol: ['arrow', 'none'],
                }
            ]
        };
        myChart.setOption(option);

        var chartCanvas = $('#activity_charts').find('canvas')[0];
        $(chartCanvas).css('background','url(img/poster/bg3.jpg) no-repeat');
        $(chartCanvas).css('background-size','100% 100%');
    }])