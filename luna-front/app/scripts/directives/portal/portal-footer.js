'use strict';

/**
 * @ngdoc directive
 * @name morningStudioApp.directive:labHeader
 * @description
 * # labHeader
 */
angular.module('luna')
  .directive('portalFooter', function () {
    return {
      templateUrl: 'tpl/portal/block/footer.html',
      restrict: 'E',
      controller: function ($scope, $location) {
        
      }
    };
  });
