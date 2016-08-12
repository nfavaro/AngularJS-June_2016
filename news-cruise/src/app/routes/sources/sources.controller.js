(function() {
  'use strict';

  angular
    .module('newsCruise')
    .controller('SourcesController', SourcesController);

  /** @ngInject */
  function SourcesController(sources, $timeout, $state) {
    var self = this;

    // Timeout to animate on load
    $timeout(fetchSources);

    // State changer
    self.goTo = function (sourceId) {
      $state.go('source.single', { sourceId: sourceId });
    };

    // Fetches sources
    function fetchSources() {
      self.sources = sources;
    }
  }
})();