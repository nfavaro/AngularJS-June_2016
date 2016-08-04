(function() {
  'use strict';

  angular
    .module('newsCruise')
    .directive('ncNavbar', ncNavbar);

  /** @ngInject */
  function ncNavbar() {
    return {
      restrict: 'A',
      templateUrl: 'app/components/navbar-footer/navbar.html'
    };
  }

})();
