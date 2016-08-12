(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(newsApiService, $interval) {
    var self = this;
    
    fetchSources();
    // Rotates source images
    $interval(rotateImg, 300);

    // Fetches sources from service
    function fetchSources() {
      startSpinner();

      newsApiService.getSources()
        .then(function (data) {
          self.sources = data;
        })
        .catch(handleError)
        .finally(stopSpinner);
    }

    // Error handler
    function handleError() {
      self.apiCallFailed = true;
    }

    // Rotates source images
    function rotateImg() {
      var shifted = self.sources.shift();
      self.sources.push(shifted);
    }

    // Start/stop spinner
    function startSpinner() {
      self.showSpinner = true;
    }

    function stopSpinner() {
      self.showSpinner = false;
    }
  }
})();
