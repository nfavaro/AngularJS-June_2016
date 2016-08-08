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

    checkLoggedIn();

    function checkLoggedIn() {
      var _name = ncPrefs.getUsername();
      self.name = _name || "Sign Up";
      self.loggedIn = !!_name;
    }

    self.logIn = function () {
      ncPrefs.setUsername("Nic");
      checkLoggedIn();
    }

    self.clearPrefs = function () {
      ncPrefs.clearAll();
      checkLoggedIn();
    };
  }

})();
