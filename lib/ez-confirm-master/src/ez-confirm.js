angular.module('ez.confirm', [])

  .constant('EzConfirmConfig', {
    heading: 'Confirmation Required',
    text: 'Are you sure you want to proceed?',
    html: null,
    confirmBtn: '确定',
    cancelBtn: '取消',
    hideCloseButton: false,
    cancelBtnCss: 'btnStyle Btncolor2 BtnHover2',
//  cancelIconCss: 'glyphicon glyphicon-remove',
    confirmBtnCss: 'btnStyle Btncolor1 BtnHover1 borderStyleNo',
//  confirmIconCss: 'glyphicon glyphicon-ok',
  })

  .controller('EzConfirmCtrl', [
    '$scope',
    '$sce',
    // '$modalInstance',
    'EzConfirmConfig',
    'config',
    function(
      $scope,
      $sce,
      // $modalInstance,
      EzConfirmConfig,
      config
    ) {

    $scope.options = angular.extend({}, EzConfirmConfig);

    if (angular.isObject(config)) {
      angular.extend($scope.options, config);
    }

    if (null !== $scope.options.html && undefined !== $scope.options.html) {
      $scope.data = {
        html: $sce.trustAsHtml($scope.options.html)
      };
    }

    // $scope.dismiss = $dismiss;

    // $scope.close = $close;

  }])

  .factory('EzConfirm', [
    '$uibModal',
    function(
      $modal
    ) {

    return {
      create: function(config) {
        return $modal.open({
          templateUrl: 'ez-confirm-tpl.html',
          controller: 'EzConfirmCtrl',
          appendTo: angular.element(top.document.body),
          resolve: {
            config: function() {
              return config;
            }
          }
        }).result;
      }
    };
  }]);
