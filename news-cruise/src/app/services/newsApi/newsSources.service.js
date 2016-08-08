(function() {
  'use strict';

  angular
    .module('newsCruise')
    .service('newsApiService', newsApiService);

  /** @ngInject */
  function newsApiService($resource, API_END_POINTS, $timeout) {
    var self = this;
    var sourcesResource = $resource(API_END_POINTS.SOURCES);

    // Return all data about sources
    self.getSources = function (id) {
      return getSourceData().then(function (data) {
        var sources = data.sources;
        if (id) sources = filterSources(sources, id);
        return sources;
      });
    };

    // Gets only the news source images with specified size (default: small) + id
    self.getImages = function (size, id) {
      var _size = (size === 'large' || size === 'medium') ? size : 'small';

      return getSourceData().then(function (data) {
        var sources = data.sources;
        if (id) sources = filterSources(sources, id);
        return sources.map(function (source) { 
          return source.urlsToLogos[_size];
        });
      });
    };

    // Private helper function to make API call
    function getSourceData() {
      return sourcesResource.get({}).$promise;
      // return $timeout(sourcesResource.get, 200, true, {}).then(function (r) { return r.$promise; });
    }

    // Private helper filter function
    function filterSources(sources, id) {
      return sources.filter(function (source) {
        return source.id === id;
      });
    }
  }
})();