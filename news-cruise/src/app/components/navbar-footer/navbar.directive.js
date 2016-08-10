(function() {
  'use strict';

  angular
    .module('newsCruise')
    .directive('ncNavbar', ncNavbar);

  function ncNavbar() {
    return {
      restrict: 'A',
      templateUrl: 'app/components/navbar-footer/navbar.html',
      controller: NavBarController,
      controllerAs: 'nbCtrl'
    };
  }

  /** @ngInject */
  function NavBarController(ncPrefs, $state) {
    var self = this;

    self.checkLoggedIn = checkLoggedIn;

    function checkLoggedIn() {
      var _name = ncPrefs.getUsername();
      self.name = _name || "Sign Up";
      self.loggedIn = !!_name;
      return self.loggedIn;
    }

    self.clearPrefs = function () {
      ncPrefs.clearAll();
      checkLoggedIn();
    };
  }

})();
