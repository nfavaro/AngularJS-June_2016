(function() {
  'use strict';

  angular
    .module('newsCruise')
    .provider('ncPrefs', ncPrefs);

  /** @ngInject */
  function ncPrefs() {
    var self = this,
        preConfigPrefs = {};

    // Function to allow setting of pre-configured preferences at config stage
    self.setPreConfigPrefs = function (prefs) {
      preConfigPrefs = prefs;
      if (!Object.keys(getPrefs()).length)
        setPrefs(preConfigPrefs);
    }

    // Private functions
    function setPrefs(prefs) {
      localStorage.ncPrefs = angular.toJson(prefs);
    }

    function getPrefs() {
      if (localStorage.ncPrefs === undefined) return {};
      var _prefs = angular.fromJson(localStorage.ncPrefs);
      return (Object.keys(_prefs).length > 0) ? _prefs : {};
    }

    function getUsername() {
      var _prefs = getPrefs();
      return _prefs.name;
    }

    function clearAll() {
      localStorage.clear();
      setPrefs(preConfigPrefs);
    }

    // Return instance
    self.$get = function () {
      return {
        setPrefs: setPrefs,
        getPrefs: getPrefs,
        getUsername: getUsername,
        clearAll: clearAll
      };
    }
  }

})();