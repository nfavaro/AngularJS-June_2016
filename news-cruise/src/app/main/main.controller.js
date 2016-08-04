(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(newsApiService, $interval) {
    var self = this;
    
    fetchSources();
    $interval(rotateImg, 300);

    function fetchSources() {
      startSpinner();

      newsApiService.getSources()
        .then(function (data) {
          self.sources = data;
        })
        .catch(handleError)
        .finally(stopSpinner);
    }

    function handleError() {
      self.apiCallFailed = true;
    }

    function rotateImg() {
      var shifted = self.sources.shift();
      self.sources.push(shifted);
    }

    function startSpinner() {
      self.showSpinner = true;
    }

    function stopSpinner() {
      self.showSpinner = false;
    }
  }
})();
