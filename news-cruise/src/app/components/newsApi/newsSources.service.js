(function() {
  'use strict';

  angular
    .module('newsCruise')
    .service('newsSources', newsSources);

  /** @ngInject */
  function newsSources($resource, API_END_POINTS) {
    var self = this;
    var sourcesResources = $resource(API_END_POINTS.SOURCES);

    self.getSources = function () {
      return sourcesResources.get({}).$promise;
    };
  }
})();