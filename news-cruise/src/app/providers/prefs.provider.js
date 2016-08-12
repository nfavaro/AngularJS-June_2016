(function() {
  'use strict';

  angular
    .module('newsCruise')
    .provider('ncPrefs', ncPrefs);

  /** @ngInject */
  function ncPrefs() {
    var self = this,
        preConfigPrefs = {};

    // Allows setting of pre-configured preferences at configuration phase
    self.setPreConfigPrefs = function (prefs) {
      preConfigPrefs = prefs;
      // only set if preferences aren't previously set
      if (!Object.keys(getPrefs()).length)
        setPrefs(preConfigPrefs);
    }

    // Save preferences to local storage
    function setPrefs(prefs) {
      localStorage.ncPrefs = angular.toJson(prefs);
    }

    // Retrieve preferences from local storage
    function getPrefs() {
      // if no prefs stored, return empty object
      if (angular.isUndefined(localStorage.ncPrefs)) return {};

      // retrieval
      var _prefs;
      try {
        _prefs = angular.fromJson(localStorage.ncPrefs);
      } catch (e) {
        // return empty object if not valid JSON string
        return {};
      }

      // if object, return it, otherwise return empty object
      return (angular.isObject(_prefs)) ? _prefs : {};
    }

    // Set username
    function setUsername(username) {
      if (angular.isString(username))
        localStorage.ncUsername = username;
    }

    // Get username
    function getUsername() {
      return localStorage.ncUsername;
    }

    // Set email address
    function setEmail(email) {
      if (angular.isString(email))
        localStorage.ncEmail = email;
    }

    // Get email address
    function getEmail() {
      return localStorage.ncEmail;
    }

    // Clear all preferences and reset to default
    function clearAll() {
      localStorage.clear();
      setPrefs(preConfigPrefs);
    }

    // Return instance
    self.$get = function () {
      return {
        setPrefs: setPrefs,
        getPrefs: getPrefs,
        setUsername: setUsername,
        getUsername: getUsername,
        setEmail: setEmail,
        getEmail: getEmail,
        clearAll: clearAll
      };
    }
  }

})();