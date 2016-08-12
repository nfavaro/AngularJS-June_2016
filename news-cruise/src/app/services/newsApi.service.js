(function() {
  'use strict';

  angular
    .module('newsCruise')
    .service('newsApiService', newsApiService);

  /** @ngInject */
  function newsApiService($resource, API_END_POINTS, API_KEY) {
    var self = this,
        sourcesResource = $resource(API_END_POINTS.SOURCES),
        articlesResource = $resource(API_END_POINTS.ARTICLES, {}, {
          getArticles: {
            method: 'GET',
            params: {
              apiKey: API_KEY
            },
            isArray: false
          }
        });

    // Return all data about all sources, or single source if id specified
    self.getSources = function (id) {
      return getSourceData().then(function (data) {
        var sources = data.sources;
        if (id) sources = extractSource(sources, id);
        return sources;
      });
    };

    // Returns all sources as an object
    self.getSourcesObject = function () {
      return getSourceData().then(function (data) {
        return getSourceObjectMap(data);
      });
    }

    // Returns articles given source id, and sortBy if supplied
    self.getArticles = function (source, sortBy) {
      return getArticles(source, sortBy).then(function (data) {
        return attachSourceId(data);
      });
    };

    // Private helper function to make API call for sources
    function getSourceData() {
      return sourcesResource.get({}).$promise;
    }

    // Extracts single source by id
    function extractSource(sources, id) {
      var sourceKey, source;
      for (sourceKey in sources) {
        source = sources[sourceKey];
        if (source.id === id) return source;
      }

      return {};
    }

    // Creates object map from array of sources
    function getSourceObjectMap(sourceData) {
      var key, source,
          sources = sourceData.sources,
          sourceObject = {};
      for (key in sources) {
        source = sources[key];
        sourceObject[source.id] = source;
      }
      return sourceObject;
    }

    // Private helper function to make API call for articles
    function getArticles(source, sortBy) {
      if (!source) return;

      var params = { source: source, apiKey: API_KEY };
      if (sortBy) params.sortBy = sortBy;

      return articlesResource.get(params).$promise;
    }

    // Attaches source id to each article in array of articles
    function attachSourceId(articleData) {
      var _articles = articleData.articles;
      _articles.forEach(function (article) {
        article.sourceId = articleData.source;
      });

      return _articles;
    }
  }
})();