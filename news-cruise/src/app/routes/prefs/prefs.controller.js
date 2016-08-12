(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('PrefsController', PrefsController);

  /** @ngInject */
  function PrefsController(sources, ncPrefs, $timeout) {
    var self = this;

    self.savePreferences = savePreferences;
    self.buttonText = 'Sign Up';

    // Timeout to animate on load
    $timeout(fetchSources);
    fetchPreferences();

    // Fetches sources (from resolved)
    function fetchSources() {
      self.sources = sources;
    }

    // Fetches preferences
    function fetchPreferences() {
      self.prefs = ncPrefs.getPrefs();
      if (fetchDetails()) {
        self.showOptions = true;
        self.buttonText = 'Update';
      }
    }

    // Fetches username and email and returns boolean value of success
    function fetchDetails() {
      return !!((self.username = ncPrefs.getUsername()) && (self.email = ncPrefs.getEmail()));
    }

    // Saves preferences
    function savePreferences() {
      ncPrefs.setUsername(self.username);
      ncPrefs.setEmail(self.email);
      ncPrefs.setPrefs(self.prefs);
      self.showOptions = true;
      self.buttonText = 'Update';
    }

    // for testing
    self.fetchDetails = fetchDetails;
    self.fetchPreferences = fetchPreferences;
  }
})();