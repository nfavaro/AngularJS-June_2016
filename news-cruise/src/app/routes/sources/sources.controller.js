(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('SourcesController', SourcesController);

  /** @ngInject */
  function SourcesController(newsArticlesApiService, sources, $timeout, $stateParams, $state) {
    var self = this;

    // Timeout to animate on load
    $timeout(fetchSources);

    // State changer
    self.goTo = function (sourceId) {
      $state.go('source.single', { sourceId: sourceId });
    };

    // Private function to fetch sources
    function fetchSources() {
      self.sources = sources;
    }

    function startSpinner() {
      self.showSpinner = true;
    }

    function stopSpinner() {
      self.showSpinner = false;
    }
  }
})();