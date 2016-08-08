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

    // Private function to fetch sources
    function fetchSources() {
      self.sources = sources;
    }

    // Private function to fetch preferences
    function fetchPreferences() {
      self.prefs = ncPrefs.getPrefs();
      if (self.prefs.name) {
        self.showOptions = true;
        self.buttonText = 'Update';
      }
    }

    // Private function to save preferences
    function savePreferences() {
      ncPrefs.setPrefs(self.prefs);
      self.showOptions = true;
      self.buttonText = 'Update';
    }

    function startSpinner() {
      self.showSpinner = true;
    }

    function stopSpinner() {
      self.showSpinner = false;
    }
  }
})();