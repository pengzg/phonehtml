tempApp.controller('ctr_login', ['$scope', '$rootScope', '$state', 'http', 'sessionFactory', 'messageFactory', 'sliderFactory','Modules_Config',
    function($scope, $rootScope, $state, http, sessionFactory, messageFactory, sliderFactory,Modules_Config) {
        $scope.loginInfo = { loginName: "", passWord: "" };
        $scope.totalHeight = $(window).height() + 'px';
        //

        $scope.submit = function() {
            sessionFactory.clearSession();
            if ($scope.loginInfo.loginName == "") {
                messageFactory.showMessage('error', "请输入用户名");
                slider.reset();
                return;
            }
            if ($scope.loginInfo.passWord == "") {
                messageFactory.showMessage('error', "请输入密码");
                slider.reset();
                return;
            }
            var success = function(result) {
                messageFactory.closeLoading();
                $scope.getUserInfo();
            };
            var error = function(result) {
                slider.reset();
                slider = new Slider({
                    id: 'slider'
                });
                slider.callback = $scope.submit;
                messageFactory.showMessage('error', result.desc);
                messageFactory.closeLoading();
            };
            //验证登录信息
            messageFactory.showLoading();
            $scope.loginInfo.userType = 2;
            $scope.loginInfo.systemcode = Modules_Config.systemcode;
            var url = "/admin/login/loginControl/doLogin.action";
            http.post(url, $scope.loginInfo, success, error);
        };

        var Slider = sliderFactory.createSlider();

        var slider = new Slider({
            id: 'slider'
        });

        slider.callback = $scope.submit;

        $scope.getUserInfo = function() {
            var url = "/admin/login/loginControl/getSessionInfo.action";
            var success = function(result) {
                $rootScope.USER = result.data;
                sessionStorage.USER = JSON.stringify(result.data);
                $state.go('index.homePage');
            }
            var error = function() {};
            http.post(url, {}, success, error);
        }
    }
])