angular.module('ez.confirm').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ez-confirm-tpl.html',
    "<div style=\"z-index:9999999999\" class=\"dg-xg-zh\">\n" +
    "  <div class=\"zk_dg-xg-js\">\n" +
    "    <a ng-if=\"!options.hideCloseButton\" type=\"button\" class=\"dg-cancle\" ng-click=\"$dismiss()\" aria-hidden=\"true\"></a>\n" +
    "    <h3 class=\"zk_modal-title\">{{ options.heading }}</h3>\n" +
    "  </div>\n" +
    "  <div class=\"zk_dg-content\">\n" +
    "    <p>\n" +
    "      {{ !data.html ? options.text : '' }}\n" +
    "      <span ng-bind-html=\"data.html\" ng-if=\"data.html\"></span>\n" +
    "    </p>\n" +
    "  </div>\n" +
    "  <div class=\"dg-bottom-color\">\n" +
    "    <a ng-click=\"$dismiss()\" class=\"{{ options.cancelBtnCss }}\">\n" +
    "      <i class=\"{{ options.cancelIconCss }}\"></i>\n" +
    "      {{ options.cancelBtn }}\n" +
    "    </a>\n" +
    "    <button ng-click=\"$close()\" class=\"{{ options.confirmBtnCss }}\" ez-focus>\n" +
    "      <i class=\"{{ options.confirmIconCss }}\"></i>\n" +
    "      {{ options.confirmBtn }}\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
