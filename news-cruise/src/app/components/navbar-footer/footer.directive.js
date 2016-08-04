(function() {
  'use strict';

  angular
    .module('newsCruise')
    .directive('ncFooter', ncFooter);

    /** @ngInject */
    function ncFooter() {
      return {
        restrict: 'A',
        templateUrl: 'app/components/navbar-footer/footer.html'
      };
    }

})();
