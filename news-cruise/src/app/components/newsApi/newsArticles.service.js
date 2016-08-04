(function() {
  'use strict';

  angular
    .module('newsCruise')
    .service('newsArticlesApiService', newsArticlesApiService);

  /** @ngInject */
  function newsArticlesApiService($resource, API_END_POINTS, API_KEY) {
    var self = this;
    var articlesResource = $resource(API_END_POINTS.ARTICLES, {}, {
      getArticles: {
        method: 'GET',
        params: {
          apiKey: API_KEY
        },
        isArray: false
      }
    });

    self.getArticles = function (source, sortBy) {
      return getArticles(source, sortBy).then(function (data) {
        return data;
      });
    };

    function getArticles(source, sortBy) {
      if (!source) return;

      var params = { source: source, apiKey: API_KEY };
      if (sortBy) params.sortBy = sortBy;

      return articlesResource.get(params).$promise;
    }
  }

})();
